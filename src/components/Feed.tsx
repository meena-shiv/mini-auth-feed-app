import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import PostEditor from './PostEditor';
import PostCard from './PostCard';
import initialPostsData from '../initialPosts.json';
import AuthModal from './AuthModal';

interface Post {
  id: number;
  name: string;
  avatar: string;
  time: string;
  content: string;
  emoji?: string;
}

const Feed: React.FC = () => {
  const { isAuthenticated, user } = useAuth();
  const [posts, setPosts] = useState<Post[]>(initialPostsData as Post[]);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');

  const handleRequireAuth = (mode: 'signin' | 'signup' = 'signin') => {
    setAuthMode(mode);
    setAuthModalOpen(true);
  };

  const handlePublish = (content: string, emoji?: string) => {
    if (!isAuthenticated) {
      handleRequireAuth('signin');
      return;
    }
    const newPost: Post = {
      id: Date.now(),
      name: user?.email || 'Anonymous',
      avatar: 'https://randomuser.me/api/portraits/lego/1.jpg',
      time: 'just now',
      content,
      emoji,
    };
    setPosts([newPost, ...posts]);
  };

  return (
    <div className="w-full max-w-xl sm:max-w-lg md:max-w-xl mx-auto mt-4 sm:mt-8 flex flex-col gap-4 sm:gap-6 px-2 sm:px-0">
      <PostEditor
        onPublish={handlePublish}
        onRequireAuth={() => handleRequireAuth('signin')}
      />
      <div className="flex flex-col gap-4">
        {posts.map(post => (
          <PostCard key={post.id} {...post} onRequireAuth={() => handleRequireAuth('signin')} />
        ))}
      </div>
      <AuthModal
        open={authModalOpen}
        mode={authMode}
        onClose={() => setAuthModalOpen(false)}
        switchMode={setAuthMode}
      />
    </div>
  );
};

export default Feed; 