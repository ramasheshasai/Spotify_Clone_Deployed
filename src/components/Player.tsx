import React from 'react';
import { Play, Pause, SkipBack, SkipForward, Repeat, Shuffle, Volume2, Heart, MoreHorizontal } from 'lucide-react';
import { PlayerState } from '../types/music';

interface PlayerProps {
  playerState: PlayerState;
  onTogglePlay: () => void;
  onNextSong: () => void;
  onPreviousSong: () => void;
  onToggleShuffle: () => void;
  onToggleRepeat: () => void;
  onVolumeChange: (volume: number) => void;
  onSeek: (time: number) => void;
}

export const Player: React.FC<PlayerProps> = ({
  playerState,
  onTogglePlay,
  onNextSong,
  onPreviousSong,
  onToggleShuffle,
  onToggleRepeat,
  onVolumeChange,
  onSeek
}) => {
  const { currentSong, isPlaying, currentTime, duration, volume, isShuffled, isRepeating } = playerState;

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const progressPercentage = duration > 0 ? (currentTime / duration) * 100 : 0;

  if (!currentSong) {
    return (
      <div className="h-24 bg-black bg-opacity-95 backdrop-blur-lg border-t border-gray-800 flex items-center justify-center">
        <div className="text-gray-400 text-sm">Select a song to start playing</div>
      </div>
    );
  }

  return (
    <div className="h-24 bg-black bg-opacity-95 backdrop-blur-lg border-t border-gray-800 flex items-center px-4">
      {/* Song Info */}
      <div className="flex items-center space-x-4 flex-1 min-w-0">
        <img
          src={currentSong.coverUrl}
          alt={currentSong.title}
          className="w-14 h-14 rounded-lg object-cover"
        />
        <div className="min-w-0 flex-1">
          <h3 className="text-white font-medium truncate">{currentSong.title}</h3>
          <p className="text-gray-400 text-sm truncate">{currentSong.artist}</p>
        </div>
        <button className="text-gray-400 hover:text-white transition-colors p-2">
          <Heart className="w-5 h-5" />
        </button>
      </div>

      {/* Player Controls */}
      <div className="flex flex-col items-center space-y-2 flex-1 max-w-md">
        <div className="flex items-center space-x-4">
          <button
            onClick={onToggleShuffle}
            className={`p-2 rounded-full transition-colors ${
              isShuffled ? 'text-green-400' : 'text-gray-400 hover:text-white'
            }`}
          >
            <Shuffle className="w-4 h-4" />
          </button>
          
          <button
            onClick={onPreviousSong}
            className="text-gray-400 hover:text-white transition-colors p-2"
          >
            <SkipBack className="w-5 h-5" />
          </button>
          
          <button
            onClick={onTogglePlay}
            className="bg-white hover:bg-gray-200 text-black rounded-full p-3 transition-all hover:scale-105"
          >
            {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
          </button>
          
          <button
            onClick={onNextSong}
            className="text-gray-400 hover:text-white transition-colors p-2"
          >
            <SkipForward className="w-5 h-5" />
          </button>
          
          <button
            onClick={onToggleRepeat}
            className={`p-2 rounded-full transition-colors ${
              isRepeating ? 'text-green-400' : 'text-gray-400 hover:text-white'
            }`}
          >
            <Repeat className="w-4 h-4" />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="flex items-center space-x-2 w-full">
          <span className="text-xs text-gray-400 w-10">{formatTime(currentTime)}</span>
          <div className="flex-1 bg-gray-600 h-1 rounded-full cursor-pointer group">
            <div
              className="bg-white h-1 rounded-full relative transition-all group-hover:bg-green-400"
              style={{ width: `${progressPercentage}%` }}
            >
              <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-3 h-3 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          </div>
          <span className="text-xs text-gray-400 w-10">{currentSong.duration}</span>
        </div>
      </div>

      {/* Volume & Options */}
      <div className="flex items-center space-x-4 flex-1 justify-end">
        <div className="flex items-center space-x-2">
          <Volume2 className="w-4 h-4 text-gray-400" />
          <div className="w-20 bg-gray-600 h-1 rounded-full cursor-pointer group">
            <div
              className="bg-white h-1 rounded-full relative transition-all group-hover:bg-green-400"
              style={{ width: `${volume * 100}%` }}
            >
              <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-3 h-3 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          </div>
        </div>
        <button className="text-gray-400 hover:text-white transition-colors p-2">
          <MoreHorizontal className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};