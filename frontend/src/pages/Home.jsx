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
      <div className="bg-white shadow-sm px-6 py-4 flex justify-between items-center">
        <h1 className="text-lg font-bold text-gray-800">TaskFlow</h1>
        <button
          onClick={handleLogout}
          className="text-sm text-gray-400 hover:text-gray-700 transition"
        >
          Logout
        </button>
      </div>

      {/* Main content */}
      <div className="max-w-2xl mx-auto px-4 py-8">

        {/* Header */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-800">My Tasks</h2>
          <p className="text-gray-400 text-sm mt-1">
            {pending === 0 ? 'All done! Great work 🎉' : `${pending} task${pending > 1 ? 's' : ''} pending`}
          </p>
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
          <p className="text-center text-gray-400 text-sm mt-10">No tasks yet. Add one above!</p>
        ) : (
          <div className="space-y-3">
            {tasks.map(task => (
              <TaskCard
                key={task._id}
                task={task}
                onDelete={handleDelete}
                onToggle={handleToggle}
                onEdit={handleEdit}
              />
            ))}
          </div>
        )}

      </div>
    </div>
  );
}

export default Home;