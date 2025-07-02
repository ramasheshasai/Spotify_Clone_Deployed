import React from 'react';
import { Play } from 'lucide-react';
import { Album } from '../types/music';

interface AlbumCardProps {
  album: Album;
  onClick: (album: Album) => void;
  onPlay: (album: Album) => void;
}

export const AlbumCard: React.FC<AlbumCardProps> = ({ album, onClick, onPlay }) => {
  const handlePlayClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onPlay(album);
  };

  return (
    <div
      onClick={() => onClick(album)}
      className="group bg-gray-900 bg-opacity-40 backdrop-blur-sm p-4 rounded-xl hover:bg-opacity-60 transition-all cursor-pointer border border-gray-800 hover:border-gray-700"
    >
      <div className="relative mb-4">
        <img
          src={album.coverUrl}
          alt={album.title}
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
        <h3 className="text-white font-semibold truncate mb-1">{album.title}</h3>
        <p className="text-gray-400 text-sm truncate">{album.artist}</p>
        <p className="text-gray-500 text-xs mt-1">{album.year}</p>
      </div>
    </div>
  );
};