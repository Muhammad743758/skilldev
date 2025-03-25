import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { UserProfile } from '../types';
import { Pencil, Save, X, Plus, Upload } from 'lucide-react';
import toast from 'react-hot-toast';

const profile: UserProfile = {
  name: "Muhammad Ali Haider",
  email: "maliahider616@gmail.com",
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
  enrolledCourses: ["2"],
  bio: "Passionate full-stack developer with a love for learning new technologies",
  location: "Pakistan",
  github: "maliahider",
  linkedin: "muhammad-ali-haider"
};

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState(() => {
    const savedProfile = localStorage.getItem('userProfile');
    return savedProfile ? JSON.parse(savedProfile) : profile;
  });
  const [newSkill, setNewSkill] = useState({ name: '', currentLevel: 1, targetLevel: 5, category: 'Frontend' });
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditedProfile({
          ...editedProfile,
          avatar: reader.result as string
        });
        toast.success('Profile picture updated successfully!');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    localStorage.setItem('userProfile', JSON.stringify(editedProfile));
    setIsEditing(false);
    toast.success('Profile updated successfully!');
  };

  const handleAddSkill = () => {
    if (newSkill.name) {
      setEditedProfile({
        ...editedProfile,
        skills: [...editedProfile.skills, { ...newSkill, id: Date.now().toString(), progress: 0 }]
      });
      setNewSkill({ name: '', currentLevel: 1, targetLevel: 5, category: 'Frontend' });
      toast.success('New skill added!');
    }
  };

  const calculateProgress = () => {
    const totalCourses = Object.keys(editedProfile.coursesProgress || {}).length;
    const completedCourses = Object.values(editedProfile.coursesProgress || {}).filter(progress => progress === 100).length;
    return totalCourses > 0 ? (completedCourses / totalCourses) * 100 : 0;
  };

  return (
    <div className="space-y-8">
      {/* Profile Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl shadow-sm"
      >
        <div className="p-8">
          <div className="flex justify-between">
            <div className="flex items-center space-x-6">
              <div className="relative">
                <img
                  src={editedProfile.avatar}
                  alt={editedProfile.name}
                  className="h-24 w-24 rounded-full object-cover"
                />
                {isEditing && (
                  <div className="absolute bottom-0 right-0">
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleImageUpload}
                      accept="image/*"
                      className="hidden"
                    />
                    <button 
                      onClick={() => fileInputRef.current?.click()}
                      className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition-colors"
                    >
                      <Upload className="h-4 w-4" />
                    </button>
                  </div>
                )}
              </div>
              <div>
                {isEditing ? (
                  <input
                    type="text"
                    value={editedProfile.name}
                    onChange={(e) => setEditedProfile({ ...editedProfile, name: e.target.value })}
                    className="text-2xl font-bold text-gray-900 bg-gray-50 border rounded px-2 py-1"
                  />
                ) : (
                  <h2 className="text-2xl font-bold text-gray-900">{editedProfile.name}</h2>
                )}
                <p className="text-gray-500">{editedProfile.email}</p>
                <div className="mt-2 flex items-center space-x-4">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                    Level {editedProfile.level}
                  </span>
                  <span className="text-gray-500">{editedProfile.totalXP} XP</span>
                </div>
              </div>
            </div>
            <div>
              {isEditing ? (
                <div className="space-x-2">
                  <button
                    onClick={handleSave}
                    className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  >
                    <Save className="h-4 w-4 mr-2" />
                    Save
                  </button>
                  <button
                    onClick={() => setIsEditing(false)}
                    className="inline-flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200"
                  >
                    <X className="h-4 w-4 mr-2" />
                    Cancel
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setIsEditing(true)}
                  className="inline-flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200"
                >
                  <Pencil className="h-4 w-4 mr-2" />
                  Edit Profile
                </button>
              )}
            </div>
          </div>

          {/* Additional Profile Info */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-sm font-medium text-gray-500">Bio</h3>
              {isEditing ? (
                <textarea
                  value={editedProfile.bio}
                  onChange={(e) => setEditedProfile({ ...editedProfile, bio: e.target.value })}
                  className="mt-1 w-full bg-gray-50 border rounded px-3 py-2"
                  rows={3}
                />
              ) : (
                <p className="mt-1 text-gray-900">{editedProfile.bio}</p>
              )}
            </div>
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500">Location</h3>
                {isEditing ? (
                  <input
                    type="text"
                    value={editedProfile.location}
                    onChange={(e) => setEditedProfile({ ...editedProfile, location: e.target.value })}
                    className="mt-1 w-full bg-gray-50 border rounded px-3 py-2"
                  />
                ) : (
                  <p className="mt-1 text-gray-900">{editedProfile.location}</p>
                )}
              </div>
              <div className="flex space-x-4">
                <a href={`https://github.com/${editedProfile.github}`} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-gray-900">
                  GitHub
                </a>
                <a href={`https://linkedin.com/in/${editedProfile.linkedin}`} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-gray-900">
                  LinkedIn
                </a>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Skills and Achievements */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-xl shadow-sm p-6"
        >
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Skills Progress</h3>
            {isEditing && (
              <button
                onClick={handleAddSkill}
                className="inline-flex items-center px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                <Plus className="h-4 w-4 mr-1" />
                Add Skill
              </button>
            )}
          </div>
          <div className="space-y-6">
            {editedProfile.skills.map((skill) => (
              <div key={skill.id}>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-700">{skill.name}</span>
                  <span className="text-gray-600">Level {skill.currentLevel}/{skill.targetLevel}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 rounded-full h-2"
                    style={{ width: `${skill.progress}%` }}
                  />
                </div>
              </div>
            ))}
            {isEditing && (
              <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                <h4 className="text-sm font-medium text-gray-700 mb-3">Add New Skill</h4>
                <div className="space-y-3">
                  <input
                    type="text"
                    placeholder="Skill name"
                    value={newSkill.name}
                    onChange={(e) => setNewSkill({ ...newSkill, name: e.target.value })}
                    className="w-full bg-white border rounded px-3 py-2"
                  />
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-sm text-gray-600">Current Level</label>
                      <input
                        type="number"
                        value={newSkill.currentLevel}
                        onChange={(e) => setNewSkill({ ...newSkill, currentLevel: parseInt(e.target.value) })}
                        className="w-full bg-white border rounded px-3 py-2"
                        min="1"
                        max="10"
                      />
                    </div>
                    <div>
                      <label className="text-sm text-gray-600">Target Level</label>
                      <input
                        type="number"
                        value={newSkill.targetLevel}
                        onChange={(e) => setNewSkill({ ...newSkill, targetLevel: parseInt(e.target.value) })}
                        className="w-full bg-white border rounded px-3 py-2"
                        min="1"
                        max="10"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl shadow-sm p-6"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Achievements</h3>
          <div className="grid grid-cols-2 gap-4">
            {editedProfile.badges.map((badge) => (
              <div key={badge.id} className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="flex-shrink-0">
                    <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-2xl">🏆</span>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">{badge.name}</h4>
                    <p className="text-xs text-gray-500">{badge.description}</p>
                    {badge.earnedDate && (
                      <p className="text-xs text-gray-400 mt-1">
                        Earned {badge.earnedDate.toLocaleDateString()}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}