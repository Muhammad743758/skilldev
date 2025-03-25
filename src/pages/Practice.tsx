import React, { useState } from 'react';
import Editor from "@monaco-editor/react";
import { motion } from 'framer-motion';
import { Play, Save, Download } from 'lucide-react';
import toast from 'react-hot-toast';

const defaultCode = `// Welcome to the Code Practice Editor!
// Try solving this challenge:

function fibonacci(n) {
  // Implement the Fibonacci sequence
  // Return the nth number in the sequence
}

// Test your solution:
console.log(fibonacci(10)); // Should output: 55
`;

export default function Practice() {
  const [code, setCode] = useState(defaultCode);
  const [output, setOutput] = useState('');
  const [theme, setTheme] = useState('vs-dark');

  const runCode = () => {
    try {
      // In a real app, this would be handled securely on the backend
      const result = eval(code);
      setOutput(String(result));
      toast.success('Code executed successfully!');
    } catch (error) {
      setOutput(`Error: ${error.message}`);
      toast.error('Error executing code');
    }
  };

  const saveCode = () => {
    // In a real app, this would save to a backend
    localStorage.setItem('savedCode', code);
    toast.success('Code saved successfully!');
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Code Practice</h1>
        <div className="flex space-x-4">
          <select
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
            className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="vs-dark">Dark Theme</option>
            <option value="light">Light Theme</option>
          </select>
          <button
            onClick={saveCode}
            className="inline-flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200"
          >
            <Save className="h-4 w-4 mr-2" />
            Save
          </button>
          <button
            onClick={runCode}
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            <Play className="h-4 w-4 mr-2" />
            Run Code
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-2"
        >
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <Editor
              height="600px"
              defaultLanguage="javascript"
              theme={theme}
              value={code}
              onChange={(value) => setCode(value || '')}
              options={{
                minimap: { enabled: false },
                fontSize: 14,
                lineNumbers: 'on',
                automaticLayout: true,
              }}
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-1"
        >
          <div className="bg-white rounded-xl shadow-sm h-full">
            <div className="p-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Output</h2>
            </div>
            <div className="p-4 font-mono text-sm">
              <pre className="whitespace-pre-wrap">{output}</pre>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-xl shadow-sm p-6"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Coding Challenges</h3>
          <ul className="space-y-3">
            <li className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span>Fibonacci Sequence</span>
              <span className="text-green-600">Easy</span>
            </li>
            <li className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span>Binary Search</span>
              <span className="text-yellow-600">Medium</span>
            </li>
            <li className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span>Graph Traversal</span>
              <span className="text-red-600">Hard</span>
            </li>
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl shadow-sm p-6"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Learning Resources</h3>
          <ul className="space-y-3">
            <li>
              <a href="#" className="block p-3 bg-gray-50 rounded-lg hover:bg-gray-100">
                <h4 className="font-medium">JavaScript Fundamentals</h4>
                <p className="text-sm text-gray-500">Master the basics of JS</p>
              </a>
            </li>
            <li>
              <a href="#" className="block p-3 bg-gray-50 rounded-lg hover:bg-gray-100">
                <h4 className="font-medium">Data Structures</h4>
                <p className="text-sm text-gray-500">Essential DS concepts</p>
              </a>
            </li>
            <li>
              <a href="#" className="block p-3 bg-gray-50 rounded-lg hover:bg-gray-100">
                <h4 className="font-medium">Algorithms</h4>
                <p className="text-sm text-gray-500">Common algorithmic patterns</p>
              </a>
            </li>
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-xl shadow-sm p-6"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Progress</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span>Challenges Completed</span>
              <span className="font-semibold">12/30</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-blue-600 rounded-full h-2" style={{ width: '40%' }} />
            </div>
            <div className="mt-6">
              <h4 className="text-sm font-medium text-gray-700 mb-2">Recent Achievements</h4>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <span className="text-yellow-500">⭐</span>
                  <span className="text-sm">Completed 10 Easy Challenges</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-yellow-500">⭐</span>
                  <span className="text-sm">First Medium Challenge Solved</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}