import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, BookOpen, Target, Library, User, Code } from 'lucide-react';

export default function Sidebar() {
  const navigation = [
    { name: 'Dashboard', icon: LayoutDashboard, path: '/' },
    { name: 'Courses', icon: BookOpen, path: '/courses' },
    { name: 'Practice', icon: Code, path: '/practice' },
    { name: 'Goals', icon: Target, path: '/goals' },
    { name: 'Resources', icon: Library, path: '/resources' },
    { name: 'Profile', icon: User, path: '/profile' }
  ];

  return (
    <div className="hidden lg:flex lg:flex-shrink-0">
      <div className="flex flex-col w-64">
        <div className="flex flex-col flex-grow bg-white pt-5 pb-4 overflow-y-auto">
          <div className="flex items-center flex-shrink-0 px-4">
            <h1 className="text-2xl font-bold text-blue-600">Programming Hub</h1>
          </div>
          <nav className="mt-8 flex-1 px-2 space-y-1">
            {navigation.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) =>
                  `group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                    isActive
                      ? 'bg-blue-50 text-blue-600'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`
                }
              >
                <item.icon className="mr-3 h-6 w-6 flex-shrink-0" />
                {item.name}
              </NavLink>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
}