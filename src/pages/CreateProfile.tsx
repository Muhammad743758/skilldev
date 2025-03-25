import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Upload, Save } from 'lucide-react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export default function CreateProfile() {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    avatar: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=400',
    bio: '',
    location: '',
    github: '',
    linkedin: '',
    skills: [],
    level: 1,
    totalXP: 0,
    coursesProgress: {},
    badges: []
  });

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfile({
          ...profile,
          avatar: reader.result as string
        });
        toast.success('Profile picture uploaded successfully!');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required fields
    if (!profile.name || !profile.email) {
      toast.error('Please fill in all required fields');
      return;
    }

    // In a real app, this would make an API call to create the profile
    // For now, we'll simulate saving and store in localStorage
    localStorage.setItem('userProfile', JSON.stringify({
      ...profile,
      createdAt: new Date(),
      coursesProgress: {},
      badges: [],
      enrolledCourses: []
    }));

    toast.success('Profile created successfully!');
    navigate('/profile'); // Redirect to profile page
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto p-6"
    >
      <div className="bg-white rounded-xl shadow-sm p-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Create Your Profile</h1>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Profile Picture */}
          <div className="flex items-center space-x-6">
            <div className="relative">
              <img
                src={profile.avatar}
                alt="Profile"
                className="h-24 w-24 rounded-full object-cover"
              />
              <div className="absolute bottom-0 right-0">
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleImageUpload}
                  accept="image/*"
                  className="hidden"
                />
                <button 
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition-colors"
                >
                  <Upload className="h-4 w-4" />
                </button>
              </div>
            </div>
            <div className="flex-1">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Name *</label>
                  <input
                    type="text"
                    value={profile.name}
                    onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                    className="mt-1 w-full bg-gray-50 border rounded px-3 py-2"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Email *</label>
                  <input
                    type="email"
                    value={profile.email}
                    onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                    className="mt-1 w-full bg-gray-50 border rounded px-3 py-2"
                    required
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Bio */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Bio</label>
            <textarea
              value={profile.bio}
              onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
              className="mt-1 w-full bg-gray-50 border rounded px-3 py-2"
              rows={3}
              placeholder="Tell us about yourself..."
            />
          </div>

          {/* Location and Social Links */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Location</label>
              <input
                type="text"
                value={profile.location}
                onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                className="mt-1 w-full bg-gray-50 border rounded px-3 py-2"
                placeholder="City, Country"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">GitHub Username</label>
              <input
                type="text"
                value={profile.github}
                onChange={(e) => setProfile({ ...profile, github: e.target.value })}
                className="mt-1 w-full bg-gray-50 border rounded px-3 py-2"
                placeholder="username"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">LinkedIn Username</label>
              <input
                type="text"
                value={profile.linkedin}
                onChange={(e) => setProfile({ ...profile, linkedin: e.target.value })}
                className="mt-1 w-full bg-gray-50 border rounded px-3 py-2"
                placeholder="username"
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              <Save className="h-4 w-4 mr-2" />
              Create Profile
            </button>
          </div>
        </form>
      </div>
    </motion.div>
  );
} 