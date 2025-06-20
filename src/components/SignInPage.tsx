import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRightEndOnRectangleIcon } from '@heroicons/react/24/outline';
import { useAuth } from '../context/AuthContext';

const SignInPage: React.FC = () => {
  const navigate = useNavigate();
  const { login, register } = useAuth();
  const [mode, setMode] = useState<'signin' | 'signup'>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const passwordsMatch = mode === 'signup' ? password === repeatPassword : true;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    if (mode === 'signin') {
      const success = await login(email, password);
      setLoading(false);
      if (!success) setError('Invalid credentials');
      else navigate('/');
    } else {
      if (!passwordsMatch) {
        setError('Passwords do not match');
        setLoading(false);
        return;
      }
      await register(email, password);
      setLoading(false);
      navigate('/');
    }
  };

  return (
    <div className="w-full max-w-xl sm:max-w-lg md:max-w-xl mx-auto mt-4 sm:mt-8 flex flex-col gap-4 sm:gap-6 px-2 sm:px-0">
      <div className="w-full max-w-xl sm:max-w-lg md:max-w-xl mx-auto bg-gray-100 rounded-2xl p-2 sm:p-4">
        <div className="rounded-2xl bg-white shadow px-4 sm:px-10 py-8 sm:py-12 flex flex-col items-center">
          <span className="mb-6 flex items-center justify-center bg-gray-100 rounded-full w-12 h-12 sm:w-16 sm:h-16 animate-pop">
            <ArrowRightEndOnRectangleIcon className="w-7 h-7 sm:w-8 sm:h-8 text-black" />
          </span>
          <h2 className="text-xl sm:text-2xl font-bold mb-1 text-center animate-fade-in [animation-delay:100ms]">
            {mode === 'signin' ? 'Sign in to continue' : 'Create an account to continue'}
          </h2>
          <p className="text-gray-500 text-sm sm:text-base mb-6 sm:mb-8 text-center animate-fade-in [animation-delay:200ms]">
            {mode === 'signin'
              ? 'Sign in to access all the features on this app'
              : 'Create an account to access all the features on this app'}
          </p>
          <form onSubmit={handleSubmit} className="w-full flex flex-col gap-3 sm:gap-4 animate-fade-in [animation-delay:300ms]">
            <div>
              <label className="block text-sm font-medium mb-1">Email or username</label>
              <input
                type="text"
                className="w-full border-none bg-gray-100 rounded-xl px-4 py-3 text-base focus:ring-2 focus:ring-blue-200 outline-none"
                placeholder="Enter your email or username"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Password</label>
              <input
                type="password"
                className="w-full border-none bg-gray-100 rounded-xl px-4 py-3 text-base focus:ring-2 focus:ring-blue-200 outline-none"
                placeholder="Enter your password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
              />
            </div>
            {mode === 'signup' && (
              <div>
                <label className="block text-sm font-medium mb-1">Repeat password</label>
                <input
                  type="password"
                  className="w-full border-none bg-gray-100 rounded-xl px-4 py-3 text-base focus:ring-2 focus:ring-blue-200 outline-none"
                  placeholder="Repeat your password"
                  value={repeatPassword}
                  onChange={e => setRepeatPassword(e.target.value)}
                  required
                />
              </div>
            )}
            {error && <div className="text-red-500 text-sm text-center">{error}</div>}
            {mode === 'signup' && password && repeatPassword && !passwordsMatch && (
              <div className="flex items-center gap-2 mb-2 p-2 border border-red-300 bg-red-50 text-red-600 rounded-md text-sm">
                <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z" /></svg>
                Passwords do not match
              </div>
            )}
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-xl py-3 font-semibold text-lg transition disabled:opacity-50 transition-transform duration-150 hover:scale-105"
              disabled={loading || (mode === 'signup' && !passwordsMatch)}
            >
              {mode === 'signin' ? 'Sign In' : 'Sign Up'}
            </button>
          </form>
        </div>
        <div className="text-center text-gray-600 text-sm sm:text-base p-4 animate-fade-in [animation-delay:500ms]">
            {mode === 'signin' ? (
              <>
                Do not have an account?{' '}
                <button
                  className="text-blue-600 hover:underline font-semibold transition-transform duration-150 hover:scale-105"
                  onClick={() => {
                    setMode('signup');
                    setError('');
                  }}
                >
                  Sign Up
                </button>
              </>
            ) : (
              <>
                Already have an account?{' '}
                <button
                  className="text-blue-600 hover:underline font-semibold transition-transform duration-150 hover:scale-105"
                  onClick={() => {
                    setMode('signin');
                    setError('');
                  }}
                >
                  Sign In
                </button>
              </>
            )}
        </div>
      </div>
    </div>
  );
};

export default SignInPage; 