import React, { useState } from 'react';
import {
  TrashIcon,
  PlusIcon,
  MicrophoneIcon,
  CameraIcon,
  BoldIcon,
  ItalicIcon,
  UnderlineIcon,
  ListBulletIcon,
  NumberedListIcon,
  CodeBracketIcon,
  FaceSmileIcon
} from '@heroicons/react/24/outline';
import { PaperAirplaneIcon } from '@heroicons/react/24/solid';
import { useAuth } from '../context/AuthContext';


interface PostEditorProps {
  onPublish: (content: string, emoji?: string) => void;
  onRequireAuth?: () => void;
}

const EMOJIS = ['😊', '👍', '🐼', '😂', '🔥', '❤️', '🎉', '😎', '🙏', '🥳'];

const PostEditor: React.FC<PostEditorProps> = ({ onPublish, onRequireAuth }) => {
  const [content, setContent] = useState('');
  const [paragraphType, setParagraphType] = useState('Paragraph');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [selectedEmoji, setSelectedEmoji] = useState<string | undefined>(undefined);
  const { isAuthenticated } = useAuth();

  const handleNotImplemented = () => {
    if (!isAuthenticated && onRequireAuth) {
      onRequireAuth();
    } else if (isAuthenticated) {
      alert('This feature is not implemented in the demo.');
    }
  };

  const handlePublish = () => {
    if (!content.trim()) return;
    onPublish(content, selectedEmoji);
    setContent('');
    setSelectedEmoji(undefined);
  };

  const handleEmojiSelect = (emoji: string) => {
    setSelectedEmoji(emoji);
    setShowEmojiPicker(false);
  };

  return (
    <div className="bg-gray-100 p-2 sm:p-4 rounded-2xl animate-fade-in">
    <div className="bg-white rounded-2xl shadow w-full max-w-2xl sm:max-w-xl md:max-w-2xl mx-auto border border-gray-100">
      {/* Toolbar */}
      <div className="flex justify-between items-center p-2">
      <div className="flex items-center gap-1 p-1 rounded bg-gray-100">
        <select
          className="rounded px-2 py-1 text-sm border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-200"
          value={paragraphType}
          onChange={e => setParagraphType(e.target.value)}
        >
          <option>Paragraph</option>
          <option>Heading</option>
          <option>Subheading</option>
        </select>
        <button onClick={handleNotImplemented} className="px-2 text-gray-500 hover:text-black transition-transform duration-150 hover:scale-110" aria-label="Bold"><BoldIcon className="w-5 h-5" /></button>
        <button onClick={handleNotImplemented} className="px-2 text-gray-500 hover:text-black transition-transform duration-150 hover:scale-110" aria-label="Italic"><ItalicIcon className="w-5 h-5" /></button>
        <button onClick={handleNotImplemented} className="px-2 text-gray-500 hover:text-black transition-transform duration-150 hover:scale-110" aria-label="Underline"><UnderlineIcon className="w-5 h-5" /></button>
        {/* divider */}
        <div className="h-5 w-px bg-gray-200 mx-2" />
        <button onClick={handleNotImplemented} className="px-2 text-gray-500 hover:text-black transition-transform duration-150 hover:scale-110" aria-label="Bulleted List"><ListBulletIcon className="w-5 h-5" /></button>
        <button onClick={handleNotImplemented} className="px-2 text-gray-500 hover:text-black transition-transform duration-150 hover:scale-110" aria-label="Numbered List"><NumberedListIcon className="w-5 h-5" /></button>
        {/* divider */}
        <div className="h-5 w-px bg-gray-200 mx-2" />
        <button onClick={handleNotImplemented} className="px-2 text-gray-500 hover:text-black transition-transform duration-150 hover:scale-110" aria-label="Code">99</button>
        <button onClick={handleNotImplemented} className="px-2 text-gray-500 hover:text-black transition-transform duration-150 hover:scale-110" aria-label="Code"><CodeBracketIcon className="w-5 h-5" /></button>
      </div>
      <div className="flex justify-center items-center p-1"><button onClick={handleNotImplemented} className="p-2 bg-red-100 hover:bg-red-200 text-red-500 rounded transition-transform duration-150 hover:scale-110" aria-label="Delete"><TrashIcon className="w-5 h-5" /></button>
      </div>
      </div>
      {/* Textarea */}
      <div className="flex flex-row gap-2 p-2 sm:p-3 relative">
        <div className="relative flex">
          <button
            onClick={() => {
              if (!isAuthenticated && onRequireAuth) {
                onRequireAuth();
              }else{
                setShowEmojiPicker(v => !v)
              }
            }}
            className={`hover:text-gray-600 text-gray-500 rounded flex-shrink-0 flex transition-transform duration-150 hover:scale-110 ${selectedEmoji ? '' : 'p-1'} `}
            aria-label="Smile"
            type="button"
          >
            {selectedEmoji ? <span className="text-2xl">{selectedEmoji}</span> : <FaceSmileIcon className="w-5 h-5" />}
          </button>
          {showEmojiPicker && (
            <div className="absolute z-10 left-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-lg p-2 flex flex-wrap gap-2 w-56 animate-pop">
              {EMOJIS.map(emoji => (
                <button
                  key={emoji}
                  className="text-2xl p-1 hover:bg-gray-100 rounded transition-transform duration-150 hover:scale-125"
                  onClick={() => handleEmojiSelect(emoji)}
                  type="button"
                >
                  {emoji}
                </button>
              ))}
            </div>
          )}
        </div>
        <div className="w-full flex items-center">
          <textarea
            className="w-full resize-none border-none outline-none bg-transparent text-base sm:text-lg placeholder-gray-400 min-h-[40px] flex items-center"
            placeholder="How are you feeling today?"
            value={content}
            onChange={e => setContent(e.target.value)}
            rows={3}
            style={{ display: 'flex', alignItems: 'center' }}
            onFocus={() => {
              if (!isAuthenticated && onRequireAuth) {
                onRequireAuth();
              }
            }}
          />
        </div>
      </div>
      {/*horizontal line*/}
      <div className="h-px bg-gray-200 my-2" />
      {/* Bottom Row */}
      <div className="flex items-center justify-between mb-2 p-2">
        <div className="flex gap-2">
          <button onClick={handleNotImplemented} className="p-1 text-gray-500 hover:text-black transition-transform duration-150 hover:scale-110" aria-label="Add"><PlusIcon className="w-5 h-5" /></button>
          <button onClick={handleNotImplemented} className="p-1 text-gray-500 hover:text-black transition-transform duration-150 hover:scale-110" aria-label="Microphone"><MicrophoneIcon className="w-5 h-5" /></button>
          <button onClick={handleNotImplemented} className="p-1 text-gray-500 hover:text-black transition-transform duration-150 hover:scale-110" aria-label="camera"><CameraIcon className="w-5 h-5" /></button>
        </div>
        <button
          onClick={handlePublish}
          className="p-1 sm:p-2 rounded-full bg-blue-600 text-white shadow-md hover:bg-blue-700 transition-all duration-150 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-offset-2 hover:scale-105"
          disabled={!content.trim()}
          aria-label="Send"
        >
          <PaperAirplaneIcon className="w-5 h-5" />
        </button>
      </div>
    </div>
    </div>
  );
};

export default PostEditor; 