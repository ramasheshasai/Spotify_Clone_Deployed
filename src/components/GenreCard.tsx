import React from 'react';
import { Genre } from '../types/music';

interface GenreCardProps {
  genre: Genre;
  onClick: (genre: Genre) => void;
}

export const GenreCard: React.FC<GenreCardProps> = ({ genre, onClick }) => {
  return (
    <div
      onClick={() => onClick(genre)}
      className="relative overflow-hidden rounded-xl cursor-pointer group transition-all duration-300 hover:scale-105"
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${genre.color} opacity-90`} />
      <div className="relative p-6 h-32 flex flex-col justify-between">
        <h3 className="text-white font-bold text-xl">{genre.name}</h3>
        <div className="self-end transform rotate-12 group-hover:rotate-6 transition-transform">
          <div className="w-16 h-16 bg-black bg-opacity-20 rounded-lg" />
        </div>
      </div>
      <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity" />
    </div>
  );
};