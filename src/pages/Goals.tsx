import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Goal } from '../types';
import { Plus, CheckCircle, Circle } from 'lucide-react';

const initialGoals: Goal[] = [
  {
    id: '1',
    title: 'Complete JavaScript Course',
    description: 'Finish all modules of the JavaScript Fundamentals course',
    deadline: new Date('2024-06-30'),
    completed: false,
    category: 'Learning'
  },
  {
    id: '2',
    title: 'Build Portfolio Project',
    description: 'Create a full-stack web application for my portfolio',
    deadline: new Date('2024-08-15'),
    completed: false,
    category: 'Project'
  },
  {
    id: '3',
    title: 'Learn TypeScript',
    description: 'Master TypeScript fundamentals and advanced concepts',
    deadline: new Date('2024-07-01'),
    completed: true,
    category: 'Learning'
  }
];

export default function Goals() {
  const [goals, setGoals] = useState<Goal[]>(initialGoals);
  const [showAddGoal, setShowAddGoal] = useState(false);

  const toggleGoalCompletion = (goalId: string) => {
    setGoals(goals.map(goal =>
      goal.id === goalId ? { ...goal, completed: !goal.completed } : goal
    ));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Learning Goals</h1>
        <button
          onClick={() => setShowAddGoal(true)}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          <Plus className="h-5 w-5 mr-2" />
          Add New Goal
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {goals.map((goal, index) => (
          <motion.div
            key={goal.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`bg-white rounded-xl shadow-sm p-6 ${
              goal.completed ? 'border-l-4 border-green-500' : ''
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-4">
                <button
                  onClick={() => toggleGoalCompletion(goal.id)}
                  className="mt-1"
                >
                  {goal.completed ? (
                    <CheckCircle className="h-6 w-6 text-green-500" />
                  ) : (
                    <Circle className="h-6 w-6 text-gray-400" />
                  )}
                </button>
                <div>
                  <h3 className={`text-lg font-semibold ${
                    goal.completed ? 'text-gray-500 line-through' : 'text-gray-900'
                  }`}>
                    {goal.title}
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">{goal.description}</p>
                  <div className="mt-2 flex items-center space-x-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {goal.category}
                    </span>
                    <span className="text-sm text-gray-500">
                      Due {goal.deadline.toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {showAddGoal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">Add New Goal</h2>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Title</label>
                <input
                  type="text"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <textarea
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  rows={3}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Category</label>
                <select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
                  <option>Learning</option>
                  <option>Project</option>
                  <option>Career</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Deadline</label>
                <input
                  type="date"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setShowAddGoal(false)}
                  className="px-4 py-2 text-gray-700 hover:text-gray-900"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Add Goal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}