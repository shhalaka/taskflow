import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getTasks, createTask, deleteTask, updateTask } from '../services/api';
import TaskCard from '../components/TaskCard';
import AddTask from '../components/AddTask';

function Home() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const navigate = useNavigate();

  // Fetch tasks when page loads
  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const res = await getTasks();
      setTasks(res.data);
    } catch (err) {
      // Token expired or invalid — send to login
      navigate('/login');
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = async (taskData) => {
    try {
      const res = await createTask(taskData);
      setTasks([res.data, ...tasks]);
      setShowForm(false);
    } catch (err) {
      console.error('Failed to add task', err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteTask(id);
      setTasks(tasks.filter(t => t._id !== id));
    } catch (err) {
      console.error('Failed to delete task', err);
    }
  };

  const handleToggle = async (id, isCompleted) => {
      try {
        const task = tasks.find(t => t._id === id);
        const res = await updateTask(id, {
          title: task.title,
          description: task.description,
          priority: task.priority,
          isCompleted: isCompleted
        });
        setTasks(tasks.map(t => t._id === id ? res.data : t));
      } catch (err) {
        console.error('Failed to update task', err);
      }
    };

  const handleEdit = async (id, updatedData) => {
    try {
      const res = await updateTask(id, updatedData);
      setTasks(tasks.map(t => t._id === id ? res.data : t));
    } catch (err) {
      console.error('Failed to edit task', err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const pending = tasks.filter(t => !t.isCompleted).length;

  return (
    <div className="min-h-screen bg-gray-100">

      {/* Navbar */}
      <div className="bg-white shadow-sm px-6 py-4 flex justify-between items-center sticky top-0 z-10">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 bg-gray-800 rounded-lg flex items-center justify-center">
            <span className="text-white text-xs font-bold">T</span>
          </div>
          <h1 className="text-lg font-bold text-gray-800">TaskFlow</h1>
      </div>
      <div className="flex items-center gap-4">
        <span className="text-sm text-gray-400 hidden sm:block">
          {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
        </span>
        <button
          onClick={handleLogout}
          className="text-sm text-gray-400 hover:text-red-400 border border-gray-200 px-3 py-1.5 rounded-lg transition"
        >
          Logout
        </button>
      </div>
    </div>

      {/* Main content */}
      <div className="max-w-2xl mx-auto px-4 py-8">

        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">My Tasks</h2>
            <p className="text-gray-400 text-sm mt-1">
              {pending === 0 ? 'All done! Great work 🎉' : `${pending} task${pending > 1 ? 's' : ''} pending`}
            </p>
          </div>
          <div className="flex gap-2">
            <div className="bg-white rounded-xl px-4 py-2 shadow-sm border border-gray-100 text-center">
              <p className="text-2xl font-bold text-gray-800">{tasks.length}</p>
              <p className="text-xs text-gray-400">Total</p>
            </div>
          <div className="bg-white rounded-xl px-4 py-2 shadow-sm border border-gray-100 text-center">
            <p className="text-2xl font-bold text-gray-800">{pending}</p>
            <p className="text-xs text-gray-400">Pending</p>
          </div>
          <div className="bg-white rounded-xl px-4 py-2 shadow-sm border border-gray-100 text-center">
            <p className="text-2xl font-bold text-gray-800">{tasks.length - pending}</p>
            <p className="text-xs text-gray-400">Done</p>
          </div>
        </div>
      </div>

        {/* Add task toggle button */}
        {!showForm && (
          <button
            onClick={() => setShowForm(true)}
            className="w-full border-2 border-dashed border-gray-200 rounded-xl py-3 text-sm text-gray-400 hover:border-gray-400 hover:text-gray-600 transition mb-4"
          >
            + Add a new task
          </button>
        )}

        {/* Add task form */}
        {showForm && (
          <div className="mb-4">
            <AddTask onAdd={handleAdd} />
            <button
              onClick={() => setShowForm(false)}
              className="text-xs text-gray-400 mt-2 hover:text-gray-600"
            >
              Cancel
            </button>
          </div>
        )}

        {/* Task list */}
        {loading ? (
          <p className="text-center text-gray-400 text-sm mt-10">Loading tasks...</p>
        ) : tasks.length === 0 ? (
          <div className="text-center mt-16">
            <div className="text-5xl mb-4">📋</div>
            <p className="text-gray-500 font-medium">No tasks yet</p>
            <p className="text-gray-400 text-sm mt-1">Add your first task above to get started</p>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Pending tasks */}
            {tasks.filter(t => !t.isCompleted).length > 0 && (
              <div>
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
                  Pending
                </p>
              <div className="space-y-3">
                {tasks.filter(t => !t.isCompleted).map(task => (
                  <TaskCard
                    key={task._id}
                    task={task}
                    onDelete={handleDelete}
                    onToggle={handleToggle}
                    onEdit={handleEdit}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Completed tasks */}
          {tasks.filter(t => t.isCompleted).length > 0 && (
            <div>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
                Completed
              </p>
              <div className="space-y-3">
                {tasks.filter(t => t.isCompleted).map(task => (
                  <TaskCard
                    key={task._id}
                    task={task}
                    onDelete={handleDelete}
                    onToggle={handleToggle}
                    onEdit={handleEdit}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
)}

      </div>
    </div>
  );
}

export default Home;