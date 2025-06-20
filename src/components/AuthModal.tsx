import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { ArrowRightEndOnRectangleIcon } from '@heroicons/react/24/outline';


type AuthMode = 'signin' | 'signup';

interface AuthModalProps {
  open: boolean;
  mode: AuthMode;
  onClose: () => void;
  switchMode: (mode: AuthMode) => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ open, mode, onClose, switchMode }) => {
  const { login, register } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const passwordsMatch = mode === 'signup' ? password === repeatPassword : true;

  if (!open) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    if (mode === 'signin') {
      const success = await login(email, password);
      setLoading(false);
      if (!success) setError('Invalid credentials');
      else onClose();
    } else {
      if (!passwordsMatch) {
        setError('Passwords do not match');
        setLoading(false);
        return;
      }
      await register(email, password);
      setLoading(false);
      onClose();
    }
  };

  return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 transition-opacity animate-fade-in">
        <div className="bg-gray-100 p-2 sm:p-4 rounded-2xl w-full max-w-md animate-modal-in">
          <div className="bg-white rounded-2xl shadow-xl p-4 sm:p-8 w-full max-w-xl relative">
            <div className="flex flex-col items-center mb-6">
              <span className="text-3xl mb-2 bg-gray-100 rounded-full p-2 animate-pop"><ArrowRightEndOnRectangleIcon className="w-8 h-8" /></span>
              <h2 className="text-xl sm:text-2xl font-bold mb-1 animate-fade-in [animation-delay:100ms]">{mode === 'signin' ? 'Sign in to continue' : 'Create an account to continue'}</h2>
              <p className="text-gray-500 text-sm sm:text-base mb-4 animate-fade-in [animation-delay:200ms]">{mode === 'signin' ? 'Sign in to access all the features on this app' : 'Create an account to access all the features on this app'}</p>
            </div>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 animate-fade-in [animation-delay:300ms]">
              <div>
                <label className="block text-sm font-medium mb-1">Email or username</label>
                <input type="text" className="w-full border-none bg-gray-100 rounded-xl px-4 py-3 text-base focus:ring-2 focus:ring-blue-200 outline-none" value={email} onChange={e => setEmail(e.target.value)} required placeholder="Enter your email or username" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Password</label>
                <input type="password" className="w-full border-none bg-gray-100 rounded-xl px-4 py-3 text-base focus:ring-2 focus:ring-blue-200 outline-none" value={password} onChange={e => setPassword(e.target.value)} required placeholder="Enter your password" />
              </div>
              {mode === 'signup' && (
                <div>
                  <label className="block text-sm font-medium mb-1">Repeat password</label>
                  <input type="password" className="w-full border-none bg-gray-100 rounded-xl px-4 py-3 text-base focus:ring-2 focus:ring-blue-200 outline-none" value={repeatPassword} onChange={e => setRepeatPassword(e.target.value)} required placeholder="Repeat your password" />
                </div>
              )}
              {error && <div className="text-red-500 text-sm">{error}</div>}
              {mode === 'signup' && password && repeatPassword && !passwordsMatch && (
                <div className="flex items-center gap-2 mb-2 p-2 border border-red-300 bg-red-50 text-red-600 rounded-md text-sm">
                  <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z" /></svg>
                  Passwords do not match
                </div>
              )}
              <button type="submit" className="bg-indigo-600 text-white rounded-lg py-2 font-semibold text-lg hover:bg-indigo-700 transition disabled:opacity-50 transition-transform duration-150 hover:scale-105" disabled={loading || (mode === 'signup' && !passwordsMatch)}>{mode === 'signin' ? 'Sign In' : 'Sign Up'}</button>
            </form>
          </div>
          <div className="p-4 text-center text-sm text-gray-600 animate-fade-in [animation-delay:500ms]">
            {mode === 'signin' ? (
              <>
                Do not have an account?{' '}
                <button className="text-indigo-600 hover:underline transition-transform duration-150 hover:scale-105" onClick={() => switchMode('signup')}>Sign Up</button>
              </>
            ) : (
              <>
                Already have an account?{' '}
                <button className="text-indigo-600 hover:underline transition-transform duration-150 hover:scale-105" onClick={() => switchMode('signin')}>Sign In</button>
              </>
            )}
          </div>
        </div>
      </div>
  );
};

export default AuthModal; 