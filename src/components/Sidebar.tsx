import React from 'react';
import { Home, Search, Library, Plus, Heart, Music, Users, TrendingUp } from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, onTabChange }) => {
  const menuItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'search', label: 'Search', icon: Search },
    { id: 'library', label: 'Your Library', icon: Library }
  ];

  const libraryItems = [
    { id: 'create-playlist', label: 'Create Playlist', icon: Plus },
    { id: 'liked-songs', label: 'Liked Songs', icon: Heart },
    { id: 'recently-played', label: 'Recently Played', icon: Music },
    { id: 'albums', label: 'Albums', icon: Library },
    { id: 'artists', label: 'Artists', icon: Users },
    { id: 'trending', label: 'Trending', icon: TrendingUp }
  ];

  return (
    <div className="w-64 bg-black bg-opacity-90 backdrop-blur-lg border-r border-gray-800 flex flex-col h-full">
      {/* Logo */}
      <div className="p-6 border-b border-gray-800">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center">
            <Music className="w-5 h-5 text-white" />
          </div>
          <span className="text-white font-bold text-xl">Spotify 2.0</span>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="p-4 space-y-2">
        {menuItems.map(item => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 hover:bg-gray-800 ${
                activeTab === item.id ? 'bg-gray-800 text-white' : 'text-gray-400 hover:text-white'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </button>
          );
        })}
      </div>

      {/* Library Section */}
      <div className="flex-1 p-4">
        <div className="space-y-2">
          {libraryItems.map(item => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => onTabChange(item.id)}
                className={`w-full flex items-center space-x-3 px-4 py-2 rounded-lg transition-all duration-200 hover:bg-gray-800 ${
                  activeTab === item.id ? 'bg-gray-800 text-white' : 'text-gray-400 hover:text-white'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="text-sm">{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Gradient Footer */}
      <div className="p-4">
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg p-4 text-white">
          <h3 className="font-semibold mb-1">Premium Experience</h3>
          <p className="text-xs opacity-90">Unlock unlimited music streaming</p>
          <button className="mt-3 bg-white text-black px-4 py-2 rounded-full text-sm font-semibold hover:scale-105 transition-transform">
            Upgrade Now
          </button>
        </div>
      </div>
    </div>
  );
};