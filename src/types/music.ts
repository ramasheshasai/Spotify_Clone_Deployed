export interface Song {
  id: string;
  title: string;
  artist: string;
  album: string;
  duration: string;
  coverUrl: string;
  audioUrl: string;
  genre: string;
  year: number;
  isLiked: boolean;
}

export interface Album {
  id: string;
  title: string;
  artist: string;
  coverUrl: string;
  year: number;
  genre: string;
  songs: Song[];
  totalDuration: string;
}

export interface Playlist {
  id: string;
  name: string;
  description: string;
  coverUrl: string;
  songs: Song[];
  isPublic: boolean;
  createdAt: string;
  totalDuration: string;
}

export interface Genre {
  id: string;
  name: string;
  color: string;
  coverUrl: string;
}

export interface PlayerState {
  currentSong: Song | null;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  isShuffled: boolean;
  isRepeating: boolean;
  queue: Song[];
  currentIndex: number;
}