import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { Trophy, Target, Brain, Award } from 'lucide-react';
import { motion } from 'framer-motion';
import { UserProfile } from '../types';

const mockProfile: UserProfile = {
  name: "John Developer",
  email: "john@example.com",
  avatar: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=400",
  level: 15,
  totalXP: 2500,
  skills: [
    { id: "1", name: "React", currentLevel: 7, targetLevel: 10, progress: 70, category: "Frontend" },
    { id: "2", name: "Node.js", currentLevel: 6, targetLevel: 9, progress: 65, category: "Backend" },
    { id: "3", name: "TypeScript", currentLevel: 8, targetLevel: 10, progress: 80, category: "Languages" }
  ],
  badges: [
    {
      id: "1",
      name: "React Master",
      description: "Completed 10 React projects",
      imageUrl: "/badges/react-master.png",
      earned: true,
      earnedDate: new Date()
    }
  ],
  goals: [
    {
      id: "1",
      skillId: "1",
      targetLevel: 10,
      deadline: new Date('2024-12-31'),
      completed: false
    }
  ]
};

const progressData = [
  { month: 'Jan', progress: 30 },
  { month: 'Feb', progress: 45 },
  { month: 'Mar', progress: 70 },
];

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-1"
          >
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center space-x-4">
                <img 
                  src={mockProfile.avatar} 
                  alt="Profile" 
                  className="w-20 h-20 rounded-full"
                />
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">{mockProfile.name}</h2>
                  <p className="text-gray-600">Level {mockProfile.level}</p>
                </div>
              </div>
              
              <div className="mt-8">
                <h3 className="text-lg font-semibold text-gray-700 mb-4">Current Skills</h3>
                {mockProfile.skills.map((skill) => (
                  <div key={skill.id} className="mb-4">
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-700">{skill.name}</span>
                      <span className="text-gray-600">Level {skill.currentLevel}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 rounded-full h-2" 
                        style={{ width: `${skill.progress}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Progress & Goals Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2"
          >
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Progress Overview</h2>
              
              <div className="h-64 mb-8">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={progressData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line 
                      type="monotone" 
                      dataKey="progress" 
                      stroke="#3B82F6" 
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-blue-50 rounded-xl p-4">
                  <Trophy className="w-8 h-8 text-blue-600 mb-2" />
                  <h3 className="text-lg font-semibold text-gray-800">15</h3>
                  <p className="text-sm text-gray-600">Achievements</p>
                </div>
                <div className="bg-green-50 rounded-xl p-4">
                  <Target className="w-8 h-8 text-green-600 mb-2" />
                  <h3 className="text-lg font-semibold text-gray-800">8</h3>
                  <p className="text-sm text-gray-600">Goals Set</p>
                </div>
                <div className="bg-purple-50 rounded-xl p-4">
                  <Brain className="w-8 h-8 text-purple-600 mb-2" />
                  <h3 className="text-lg font-semibold text-gray-800">3</h3>
                  <p className="text-sm text-gray-600">Skills Mastered</p>
                </div>
                <div className="bg-yellow-50 rounded-xl p-4">
                  <Award className="w-8 h-8 text-yellow-600 mb-2" />
                  <h3 className="text-lg font-semibold text-gray-800">12</h3>
                  <p className="text-sm text-gray-600">Badges Earned</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}