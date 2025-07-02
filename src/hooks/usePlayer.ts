import { useState, useCallback, useRef } from 'react';
import { PlayerState, Song } from '../types/music';

const initialPlayerState: PlayerState = {
  currentSong: null,
  isPlaying: false,
  currentTime: 0,
  duration: 0,
  volume: 0.7,
  isShuffled: false,
  isRepeating: false,
  queue: [],
  currentIndex: 0
};

export const usePlayer = () => {
  const [playerState, setPlayerState] = useState<PlayerState>(initialPlayerState);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const playSong = useCallback((song: Song, queue: Song[] = []) => {
    setPlayerState(prev => ({
      ...prev,
      currentSong: song,
      isPlaying: true,
      queue: queue.length > 0 ? queue : [song],
      currentIndex: queue.findIndex(s => s.id === song.id) || 0
    }));
  }, []);

  const togglePlay = useCallback(() => {
    setPlayerState(prev => ({
      ...prev,
      isPlaying: !prev.isPlaying
    }));
  }, []);

  const nextSong = useCallback(() => {
    setPlayerState(prev => {
      if (prev.queue.length === 0) return prev;
      
      let nextIndex = prev.currentIndex + 1;
      if (nextIndex >= prev.queue.length) {
        nextIndex = prev.isRepeating ? 0 : prev.currentIndex;
      }
      
      return {
        ...prev,
        currentIndex: nextIndex,
        currentSong: prev.queue[nextIndex] || prev.currentSong
      };
    });
  }, []);

  const previousSong = useCallback(() => {
    setPlayerState(prev => {
      if (prev.queue.length === 0) return prev;
      
      let prevIndex = prev.currentIndex - 1;
      if (prevIndex < 0) {
        prevIndex = prev.isRepeating ? prev.queue.length - 1 : 0;
      }
      
      return {
        ...prev,
        currentIndex: prevIndex,
        currentSong: prev.queue[prevIndex] || prev.currentSong
      };
    });
  }, []);

  const setVolume = useCallback((volume: number) => {
    setPlayerState(prev => ({
      ...prev,
      volume: Math.max(0, Math.min(1, volume))
    }));
  }, []);

  const toggleShuffle = useCallback(() => {
    setPlayerState(prev => ({
      ...prev,
      isShuffled: !prev.isShuffled
    }));
  }, []);

  const toggleRepeat = useCallback(() => {
    setPlayerState(prev => ({
      ...prev,
      isRepeating: !prev.isRepeating
    }));
  }, []);

  const setCurrentTime = useCallback((time: number) => {
    setPlayerState(prev => ({
      ...prev,
      currentTime: time
    }));
  }, []);

  return {
    playerState,
    playSong,
    togglePlay,
    nextSong,
    previousSong,
    setVolume,
    toggleShuffle,
    toggleRepeat,
    setCurrentTime,
    audioRef
  };
};