import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ArrowRightEndOnRectangleIcon, ArrowRightStartOnRectangleIcon } from '@heroicons/react/24/outline';

const Navbar: React.FC = () => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleAuthClick = () => {
    if (isAuthenticated) {
      logout();
      navigate('/');
    } else {
      navigate('/signin');
    }
  };

  const isAuthPage = location.pathname === '/signin' || location.pathname === '/signup';

  return (
    <nav className="w-full flex items-center justify-between p-8 bg-white animate-fade-in">
      <Link to="/" className="text-xl font-bold flex items-center gap-2 group relative overflow-hidden">
        <span className="rounded-full border-2 border-black w-6 h-6 flex items-center justify-center mr-2">
          <span className="block w-3 h-3 bg-black rounded-full"></span>
        </span>
        foo-rum
        <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-black transition-all duration-300 group-hover:w-full"></span>
      </Link>
      {isAuthPage ? (
        <button
          onClick={() => navigate('/')}
          className="text-black text-base font-medium hover:underline"
        >
          Back to home
        </button>
      ) : (
        <button
          onClick={handleAuthClick}
          className="flex items-center gap-2 text-black hover:underline group relative overflow-hidden transition-transform duration-150 hover:scale-105"
        >
          <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-black transition-all duration-300 group-hover:w-full"></span>
          {isAuthenticated ? (
            <>
              Logout
              <ArrowRightStartOnRectangleIcon className="w-5 h-5" />
            </>
          ) : (
            <>
              Login
              <ArrowRightEndOnRectangleIcon className="w-5 h-5" />
            </>
          )}
        </button>
      )}
    </nav>
  );
};

export default Navbar; 