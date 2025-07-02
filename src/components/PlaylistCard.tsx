import React from 'react';
import { Play, Lock } from 'lucide-react';
import { Playlist } from '../types/music';

interface PlaylistCardProps {
  playlist: Playlist;
  onClick: (playlist: Playlist) => void;
  onPlay: (playlist: Playlist) => void;
}

export const PlaylistCard: React.FC<PlaylistCardProps> = ({ playlist, onClick, onPlay }) => {
  const handlePlayClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onPlay(playlist);
  };

  return (
    <div
      onClick={() => onClick(playlist)}
      className="group bg-gray-900 bg-opacity-40 backdrop-blur-sm p-4 rounded-xl hover:bg-opacity-60 transition-all cursor-pointer border border-gray-800 hover:border-gray-700"
    >
      <div className="relative mb-4">
        <img
          src={playlist.coverUrl}
          alt={playlist.name}
          className="w-full aspect-square object-cover rounded-lg shadow-lg group-hover:shadow-xl transition-shadow"
        />
        <button
          onClick={handlePlayClick}
          className="absolute bottom-2 right-2 w-12 h-12 bg-green-500 hover:bg-green-400 rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all"
        >
          <Play className="w-5 h-5 ml-0.5" />
        </button>
      </div>
      
      <div>
        <div className="flex items-center space-x-2 mb-1">
          <h3 className="text-white font-semibold truncate flex-1">{playlist.name}</h3>
          {!playlist.isPublic && <Lock className="w-4 h-4 text-gray-400" />}
        </div>
        <p className="text-gray-400 text-sm truncate mb-1">{playlist.description}</p>
        <p className="text-gray-500 text-xs">{playlist.songs.length} songs • {playlist.totalDuration}</p>
      </div>
    </div>
  );
};