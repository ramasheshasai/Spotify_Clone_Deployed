import React, { useState } from 'react';
import { Plus, Search, Grid3X3, List, SortAsc } from 'lucide-react';
import { mockPlaylists, mockAlbums, mockSongs } from '../../data/mockData';
import { Song, Album, Playlist } from '../../types/music';
import { PlaylistCard } from '../PlaylistCard';
import { AlbumCard } from '../AlbumCard';
import { SongCard } from '../SongCard';

interface LibraryViewProps {
  currentSong: Song | null;
  isPlaying: boolean;
  onPlaySong: (song: Song) => void;
  onTogglePlay: () => void;
  onPlayAlbum: (album: Album) => void;
  onPlayPlaylist: (playlist: Playlist) => void;
}

export const LibraryView: React.FC<LibraryViewProps> = ({
  currentSong,
  isPlaying,
  onPlaySong,
  onTogglePlay,
  onPlayAlbum,
  onPlayPlaylist
}) => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [activeTab, setActiveTab] = useState<'all' | 'playlists' | 'albums' | 'songs'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const tabs = [
    { id: 'all', label: 'All' },
    { id: 'playlists', label: 'Playlists' },
    { id: 'albums', label: 'Albums' },
    { id: 'songs', label: 'Songs' }
  ];

  const likedSongs = mockSongs.filter(song => song.isLiked);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-4xl font-bold text-white">Your Library</h1>
        <button className="bg-gray-800 hover:bg-gray-700 text-white p-2 rounded-full transition-colors">
          <Plus className="w-5 h-5" />
        </button>
      </div>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
        <div className="flex items-center space-x-2">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? 'bg-white text-black'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="flex items-center space-x-4">
          {/* View Mode Toggle */}
          <div className="flex items-center space-x-1 bg-gray-800 rounded-lg p-1">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-md transition-colors ${
                viewMode === 'grid' ? 'bg-gray-700' : 'hover:bg-gray-700'
              }`}
            >
              <Grid3X3 className="w-4 h-4 text-gray-300" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-md transition-colors ${
                viewMode === 'list' ? 'bg-gray-700' : 'hover:bg-gray-700'
              }`}
            >
              <List className="w-4 h-4 text-gray-300" />
            </button>
          </div>

          {/* Sort Button */}
          <button className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors">
            <SortAsc className="w-4 h-4" />
            <span className="text-sm">Recently added</span>
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="space-y-8">
        {/* Liked Songs */}
        {(activeTab === 'all' || activeTab === 'songs') && likedSongs.length > 0 && (
          <section>
            <div className="flex items-center space-x-4 mb-6 p-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-pink-400 rounded-lg flex items-center justify-center">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <h3 className="text-white font-bold text-xl">Liked Songs</h3>
                <p className="text-purple-100">{likedSongs.length} songs</p>
              </div>
            </div>
          </section>
        )}

        {/* Playlists */}
        {(activeTab === 'all' || activeTab === 'playlists') && (
          <section>
            <h2 className="text-xl font-bold text-white mb-4">Playlists</h2>
            <div className={viewMode === 'grid' 
              ? 'grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6'
              : 'space-y-2'
            }>
              {mockPlaylists.map((playlist) => (
                viewMode === 'grid' ? (
                  <PlaylistCard
                    key={playlist.id}
                    playlist={playlist}
                    onClick={() => {}}
                    onPlay={onPlayPlaylist}
                  />
                ) : (
                  <div
                    key={playlist.id}
                    className="flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-800 hover:bg-opacity-50 transition-all cursor-pointer"
                  >
                    <img
                      src={playlist.coverUrl}
                      alt={playlist.name}
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="text-white font-medium truncate">{playlist.name}</h3>
                      <p className="text-gray-400 text-sm truncate">
                        Playlist • {playlist.songs.length} songs
                      </p>
                    </div>
                  </div>
                )
              ))}
            </div>
          </section>
        )}

        {/* Albums */}
        {(activeTab === 'all' || activeTab === 'albums') && (
          <section>
            <h2 className="text-xl font-bold text-white mb-4">Albums</h2>
            <div className={viewMode === 'grid' 
              ? 'grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6'
              : 'space-y-2'
            }>
              {mockAlbums.map((album) => (
                viewMode === 'grid' ? (
                  <AlbumCard
                    key={album.id}
                    album={album}
                    onClick={() => {}}
                    onPlay={onPlayAlbum}
                  />
                ) : (
                  <div
                    key={album.id}
                    className="flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-800 hover:bg-opacity-50 transition-all cursor-pointer"
                  >
                    <img
                      src={album.coverUrl}
                      alt={album.title}
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="text-white font-medium truncate">{album.title}</h3>
                      <p className="text-gray-400 text-sm truncate">
                        Album • {album.artist}
                      </p>
                    </div>
                  </div>
                )
              ))}
            </div>
          </section>
        )}

        {/* Recent Songs */}
        {activeTab === 'songs' && (
          <section>
            <h2 className="text-xl font-bold text-white mb-4">Recently Played</h2>
            <div className="space-y-2">
              {mockSongs.slice(0, 10).map((song, index) => (
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
        )}
      </div>
    </div>
  );
};