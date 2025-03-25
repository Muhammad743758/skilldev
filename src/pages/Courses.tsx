import React from 'react';
import { motion } from 'framer-motion';
import { Course } from '../types';

const courses: Course[] = [
  {
    id: '1',
    title: 'JavaScript Fundamentals',
    description: 'Learn the basics of JavaScript programming language',
    imageUrl: 'https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=400',
    category: 'Frontend',
    level: 'Beginner',
    duration: '8 weeks',
    enrolled: false
  },
  {
    id: '2',
    title: 'React Development',
    description: 'Master React.js and build modern web applications',
    imageUrl: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400',
    category: 'Frontend',
    level: 'Intermediate',
    duration: '10 weeks',
    enrolled: true
  },
  {
    id: '3',
    title: 'Node.js Backend',
    description: 'Build scalable backend services with Node.js',
    imageUrl: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=400',
    category: 'Backend',
    level: 'Advanced',
    duration: '12 weeks',
    enrolled: false
  },
  {
    id: '4',
    title: 'Python for Data Science',
    description: 'Learn Python programming and data analysis fundamentals',
    imageUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400',
    category: 'Data Science',
    level: 'Beginner',
    duration: '10 weeks',
    enrolled: false
  },
  {
    id: '5',
    title: 'TypeScript Mastery',
    description: 'Advanced TypeScript concepts and best practices',
    imageUrl: 'https://images.unsplash.com/photo-1614741118887-7a4ee193a5fa?w=400',
    category: 'Frontend',
    level: 'Intermediate',
    duration: '8 weeks',
    enrolled: false
  },
  {
    id: '6',
    title: 'AWS Cloud Computing',
    description: 'Cloud infrastructure and services with AWS',
    imageUrl: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=400',
    category: 'DevOps',
    level: 'Advanced',
    duration: '12 weeks',
    enrolled: false
  },
  {
    id: '7',
    title: 'UI/UX Design Fundamentals',
    description: 'Learn the principles of modern UI/UX design',
    imageUrl: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400',
    category: 'Design',
    level: 'Beginner',
    duration: '8 weeks',
    enrolled: false
  },
  {
    id: '8',
    title: 'Docker & Kubernetes',
    description: 'Containerization and orchestration technologies',
    imageUrl: 'https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?w=400',
    category: 'DevOps',
    level: 'Intermediate',
    duration: '10 weeks',
    enrolled: false
  },
  {
    id: '9',
    title: 'Machine Learning Basics',
    description: 'Introduction to ML algorithms and applications',
    imageUrl: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=400',
    category: 'Data Science',
    level: 'Intermediate',
    duration: '12 weeks',
    enrolled: false
  },
  {
    id: '11',
    title: 'Mobile App Development',
    description: 'Build cross-platform apps with React Native',
    imageUrl: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400',
    category: 'Mobile',
    level: 'Intermediate',
    duration: '10 weeks',
    enrolled: false
  },
  {
    id: '12',
    title: 'Cybersecurity Fundamentals',
    description: 'Learn the basics of web security and best practices',
    imageUrl: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=400',
    category: 'Security',
    level: 'Beginner',
    duration: '8 weeks',
    enrolled: false
  }
];

export default function Courses() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Available Courses</h1>
        <div className="flex space-x-4">
          <select className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
            <option>All Categories</option>
            <option>Frontend</option>
            <option>Backend</option>
            <option>DevOps</option>
          </select>
          <select className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
            <option>All Levels</option>
            <option>Beginner</option>
            <option>Intermediate</option>
            <option>Advanced</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course, index) => (
          <motion.div
            key={course.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-xl shadow-sm overflow-hidden"
          >
            <img
              src={course.imageUrl}
              alt={course.title}
              className="h-48 w-full object-cover"
            />
            <div className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{course.title}</h3>
                  <p className="text-sm text-gray-500 mt-1">{course.description}</p>
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between">
                <div className="flex space-x-4">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    {course.level}
                  </span>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                    {course.duration}
                  </span>
                </div>
              </div>
              <button
                className={`mt-4 w-full px-4 py-2 rounded-md ${
                  course.enrolled
                    ? 'bg-green-50 text-green-700 border border-green-700'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
              >
                {course.enrolled ? 'Enrolled' : 'Enroll Now'}
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}