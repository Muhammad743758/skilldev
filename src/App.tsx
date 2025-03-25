import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Courses from './pages/Courses';
import Goals from './pages/Goals';
import Resources from './pages/Resources';
import Profile from './pages/Profile';
import Practice from './pages/Practice';
import CreateProfile from './pages/CreateProfile';
import { Toaster } from 'react-hot-toast';

// Add this function to check if user has a profile
const hasProfile = () => {
  return localStorage.getItem('userProfile') !== null;
};

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 flex">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <Navbar />
          <main className="flex-1 p-8">
            <div className="max-w-7xl mx-auto">
              <div className="card p-6">
                <Routes>
                  <Route
                    path="/"
                    element={
                      <div className="home-page">
                        <Dashboard />
                        <div className="auth-buttons mt-6 text-center">
                          <button
                            className="btn-primary mx-2"
                            onClick={() => (window.location.href = '/login')}
                          >
                            Login
                          </button>
                          <button
                            className="btn-secondary mx-2"
                            onClick={() => (window.location.href = '/signup')}
                          >
                            Sign Up
                          </button>
                        </div>
                      </div>
                    }
                  />
                  <Route path="/courses" element={<Courses />} />
                  <Route path="/goals" element={<Goals />} />
                  <Route path="/resources" element={<Resources />} />
                  <Route
                    path="/profile"
                    element={hasProfile() ? <Profile /> : <Navigate to="/create-profile" />}
                  />
                  <Route path="/create-profile" element={<CreateProfile />} />
                  <Route path="/practice" element={<Practice />} />
                </Routes>
              </div>
            </div>
          </main>
        </div>
        <Toaster
          position="top-right"
          toastOptions={{
            className: 'bg-white text-gray-800 shadow-lg border border-gray-100',
            duration: 3000,
            style: {
              borderRadius: '0.75rem',
            },
          }}
        />
      </div>
    </Router>
  );
}

export default App;