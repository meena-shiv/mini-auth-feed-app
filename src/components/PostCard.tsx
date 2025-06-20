import React from 'react';
import {
  HeartIcon,
  ChatBubbleBottomCenterIcon,
  PaperAirplaneIcon,
} from '@heroicons/react/24/outline';
import { useAuth } from '../context/AuthContext';

interface PostCardProps {
  name: string;
  avatar: string;
  time: string;
  content: string;
  emoji?: string;
  onRequireAuth?: () => void;
}

const PostCard: React.FC<PostCardProps> = ({ name, avatar, time, content, emoji, onRequireAuth }) => {
  const { isAuthenticated } = useAuth();
  const handleNotImplemented = () => {
    if (!isAuthenticated && onRequireAuth) onRequireAuth();
    else {
      alert('function not implemented');
    }
  };
  return (
    <div className="bg-gray-100 p-2 sm:p-3 rounded-2xl animate-slide-in-up">
    <div className="bg-white rounded-2xl shadow p-3 sm:p-4 border border-gray-100 w-full max-w-2xl sm:max-w-xl md:max-w-2xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-2 sm:gap-3 mb-2">
        <img src={avatar} alt={name} className="w-10 h-10 rounded object-cover" />
        <div>
          <div className="font-semibold text-gray-900 leading-tight">{name}</div>
          <div className="text-xs text-gray-400">{time}</div>
        </div>
      </div>
      {/* Content */}
      <div className="flex items-center gap-2 sm:gap-3 mb-3">
        {emoji && <span className="text-xl mt-1 bg-gray-100 rounded-full p-1">{emoji}</span>}
        <div className="text-gray-800 text-base sm:text-base text-sm leading-relaxed">{content}</div>
      </div>
    </div>
    {/* Footer (actions) */}
    <div className="flex items-center gap-4 pt-2 pl-1">
        <button className="relative overflow-hidden p-1 rounded hover:bg-blue-50 text-gray-500 hover:text-blue-600 transition transition-transform duration-150 hover:scale-110 focus:outline-none group" aria-label="Like" onClick={handleNotImplemented}>
          <HeartIcon className="w-5 h-5 relative z-10" />
        </button>
        <button className="relative overflow-hidden p-1 rounded hover:bg-blue-50 text-gray-500 hover:text-blue-600 transition transition-transform duration-150 hover:scale-110 focus:outline-none group" aria-label="Comment" onClick={handleNotImplemented}>
          <ChatBubbleBottomCenterIcon className="w-5 h-5 relative z-10" />
        </button>
        <button className="relative overflow-hidden p-1 rounded hover:bg-blue-50 text-gray-500 hover:text-blue-600 transition transition-transform duration-150 hover:scale-110 focus:outline-none group" aria-label="Send" onClick={handleNotImplemented}>
          <PaperAirplaneIcon className="w-5 h-5 relative z-10" />
        </button>
      </div>
    </div>
  );
};

export default PostCard; 