import React from 'react';
import { mockSongs, mockAlbums, mockPlaylists } from '../../data/mockData';
import { Song, Album, Playlist } from '../../types/music';
import { AlbumCard } from '../AlbumCard';
import { PlaylistCard } from '../PlaylistCard';
import { SongCard } from '../SongCard';

interface HomeViewProps {
  currentSong: Song | null;
  isPlaying: boolean;
  onPlaySong: (song: Song) => void;
  onTogglePlay: () => void;
  onPlayAlbum: (album: Album) => void;
  onPlayPlaylist: (playlist: Playlist) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  currentSong,
  isPlaying,
  onPlaySong,
  onTogglePlay,
  onPlayAlbum,
  onPlayPlaylist
}) => {
  const recentlyPlayed = mockSongs.slice(0, 4);
  const featuredAlbums = mockAlbums.slice(0, 6);
  const recommendedPlaylists = mockPlaylists;

  const currentTime = new Date().getHours();
  const greeting = currentTime < 12 ? 'Good morning' : currentTime < 18 ? 'Good afternoon' : 'Good evening';

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-white mb-2">{greeting}</h1>
        <p className="text-gray-400">Welcome back to your music journey</p>
      </div>

      {/* Quick Access Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {recentlyPlayed.map((song) => (
          <div
            key={song.id}
            className="group bg-gray-800 bg-opacity-50 backdrop-blur-sm rounded-lg p-4 flex items-center space-x-4 hover:bg-opacity-70 transition-all cursor-pointer"
            onClick={() => onPlaySong(song)}
          >
            <img
              src={song.coverUrl}
              alt={song.title}
              className="w-16 h-16 rounded-lg object-cover"
            />
            <div className="flex-1 min-w-0">
              <h3 className="text-white font-medium truncate">{song.title}</h3>
              <p className="text-gray-400 text-sm truncate">{song.artist}</p>
            </div>
            <div className="opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="w-10 h-10 bg-green-500 hover:bg-green-400 rounded-full flex items-center justify-center text-white">
                <svg className="w-4 h-4 ml-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M8 5v10l8-5-8-5z" />
                </svg>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recently Played */}
      <section>
        <h2 className="text-2xl font-bold text-white mb-6">Recently Played</h2>
        <div className="space-y-2">
          {recentlyPlayed.map((song, index) => (
            <SongCard
              key={song.id}
              song={song}
              isPlaying={currentSong?.id === song.id && isPlaying}
              onPlay={onPlaySong}
              onTogglePlay={onTogglePlay}
              showIndex={true}
              index={index + 1}
            />
          ))}
        </div>
      </section>

      {/* Featured Albums */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">Featured Albums</h2>
          <button className="text-gray-400 hover:text-white text-sm font-medium transition-colors">
            Show all
          </button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
          {featuredAlbums.map((album) => (
            <AlbumCard
              key={album.id}
              album={album}
              onClick={() => {}}
              onPlay={onPlayAlbum}
            />
          ))}
        </div>
      </section>

      {/* Recommended Playlists */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">Made for You</h2>
          <button className="text-gray-400 hover:text-white text-sm font-medium transition-colors">
            Show all
          </button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {recommendedPlaylists.map((playlist) => (
            <PlaylistCard
              key={playlist.id}
              playlist={playlist}
              onClick={() => {}}
              onPlay={onPlayPlaylist}
            />
          ))}
        </div>
      </section>
    </div>
  );
};