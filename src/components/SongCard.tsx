import React from 'react';
import { Play, Pause, Heart, MoreHorizontal } from 'lucide-react';
import { Song } from '../types/music';

interface SongCardProps {
  song: Song;
  isPlaying: boolean;
  onPlay: (song: Song) => void;
  onTogglePlay: () => void;
  onToggleLike?: (songId: string) => void;
  showIndex?: boolean;
  index?: number;
}

export const SongCard: React.FC<SongCardProps> = ({
  song,
  isPlaying,
  onPlay,
  onTogglePlay,
  onToggleLike,
  showIndex = false,
  index
}) => {
  const handlePlayClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isPlaying) {
      onTogglePlay();
    } else {
      onPlay(song);
    }
  };

  const handleLikeClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleLike?.(song.id);
  };

  return (
    <div
      className="group flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-800 hover:bg-opacity-50 transition-all cursor-pointer"
      onClick={() => onPlay(song)}
    >
      {/* Index or Play Button */}
      <div className="w-8 flex items-center justify-center">
        {showIndex && !isPlaying ? (
          <span className="text-gray-400 text-sm group-hover:hidden">{index}</span>
        ) : null}
        <button
          onClick={handlePlayClick}
          className={`${showIndex ? 'hidden group-hover:block' : ''} ${
            isPlaying ? 'block' : ''
          } w-8 h-8 flex items-center justify-center rounded-full bg-green-500 hover:bg-green-400 text-white transition-all hover:scale-105`}
        >
          {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
        </button>
      </div>

      {/* Song Image */}
      <div className="relative">
        <img
          src={song.coverUrl}
          alt={song.title}
          className="w-12 h-12 rounded-lg object-cover"
        />
        {isPlaying && (
          <div className="absolute inset-0 bg-black bg-opacity-50 rounded-lg flex items-center justify-center">
            <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
          </div>
        )}
      </div>

      {/* Song Info */}
      <div className="flex-1 min-w-0">
        <h3 className={`font-medium truncate ${isPlaying ? 'text-green-400' : 'text-white'}`}>
          {song.title}
        </h3>
        <p className="text-gray-400 text-sm truncate">{song.artist}</p>
      </div>

      {/* Album */}
      <div className="hidden md:block flex-1 min-w-0">
        <p className="text-gray-400 text-sm truncate">{song.album}</p>
      </div>

      {/* Actions */}
      <div className="flex items-center space-x-2">
        <button
          onClick={handleLikeClick}
          className={`p-2 rounded-full transition-colors ${
            song.isLiked ? 'text-green-400' : 'text-gray-400 hover:text-white'
          }`}
        >
          <Heart className={`w-4 h-4 ${song.isLiked ? 'fill-current' : ''}`} />
        </button>
        
        <span className="text-gray-400 text-sm w-12 text-right">{song.duration}</span>
        
        <button className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-white transition-all p-2">
          <MoreHorizontal className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};