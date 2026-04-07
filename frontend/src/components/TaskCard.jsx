import { useState } from 'react';

function TaskCard({ task, onDelete, onToggle, onEdit }) {
  const [editMode, setEditMode] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description || '');
  const [priority, setPriority] = useState(task.priority);

  const priorityColors = {
    high: 'bg-red-100 text-red-600',
    medium: 'bg-yellow-100 text-yellow-600',
    low: 'bg-green-100 text-green-600'
  };

  const priorityDot = {
    high: 'bg-red-400',
    medium: 'bg-yellow-400',
    low: 'bg-green-400'
  };

  const handleSave = async () => {
    await onEdit(task._id, { title, description, priority, isCompleted: task.isCompleted });
    setEditMode(false);
  };

  const handleCancel = () => {
    setTitle(task.title);
    setDescription(task.description || '');
    setPriority(task.priority);
    setEditMode(false);
  };

  if (editMode) {
    return (
      <div className="bg-white rounded-xl p-4 shadow-sm border-2 border-gray-300 space-y-3 transition-all">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
          placeholder="Task title"
        />
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
          placeholder="Description (optional)"
        />
        <div className="flex gap-3 items-center">
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-400 text-gray-600"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
          <div className="ml-auto flex gap-2">
            <button
              onClick={handleCancel}
              className="px-4 py-2 text-sm text-gray-400 hover:text-gray-600 transition"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-gray-800 text-white rounded-lg text-sm hover:bg-gray-700 transition"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-white rounded-xl p-4 shadow-sm border border-gray-100 flex items-start justify-between gap-4 hover:shadow-md hover:border-gray-200 transition-all duration-200 ${task.isCompleted ? 'opacity-60' : ''}`}>

      <div className="flex items-start gap-3 flex-1 min-w-0">
        <input
          type="checkbox"
          checked={task.isCompleted}
          onChange={() => onToggle(task._id, !task.isCompleted)}
          className="mt-1 cursor-pointer w-4 h-4 accent-gray-700 shrink-0"
        />
        <div className="flex-1 min-w-0">
          <p className={`text-sm font-medium text-gray-800 truncate ${task.isCompleted ? 'line-through text-gray-400' : ''}`}>
            {task.title}
          </p>
          {task.description && (
            <p className="text-xs text-gray-400 mt-0.5 truncate">{task.description}</p>
          )}
          <div className="flex items-center gap-2 mt-1.5">
            <div className={`w-1.5 h-1.5 rounded-full ${priorityDot[task.priority]}`} />
            <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${priorityColors[task.priority] || 'bg-gray-100 text-gray-500'}`}>
              {task.priority}
            </span>
            {task.dueDate && (
              <span className="text-xs text-gray-400">
                Due {new Date(task.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="flex gap-2 items-center shrink-0">
        <button
          onClick={() => setEditMode(true)}
          className="text-xs text-gray-400 hover:text-gray-700 border border-gray-200 px-2.5 py-1 rounded-lg transition hover:border-gray-400"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(task._id)}
          className="text-gray-300 hover:text-red-400 transition text-lg leading-none"
        >
          ✕
        </button>
      </div>

    </div>
  );
}

export default TaskCard;