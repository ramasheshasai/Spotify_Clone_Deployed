import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { Player } from './components/Player';
import { HomeView } from './components/views/HomeView';
import { SearchView } from './components/views/SearchView';
import { LibraryView } from './components/views/LibraryView';
import { usePlayer } from './hooks/usePlayer';
import { Song, Album, Playlist } from './types/music';

function App() {
  const [activeTab, setActiveTab] = useState('home');
  const {
    playerState,
    playSong,
    togglePlay,
    nextSong,
    previousSong,
    setVolume,
    toggleShuffle,
    toggleRepeat,
    setCurrentTime
  } = usePlayer();

  const handlePlaySong = (song: Song, queue: Song[] = []) => {
    playSong(song, queue);
  };

  const handlePlayAlbum = (album: Album) => {
    if (album.songs.length > 0) {
      playSong(album.songs[0], album.songs);
    }
  };

  const handlePlayPlaylist = (playlist: Playlist) => {
    if (playlist.songs.length > 0) {
      playSong(playlist.songs[0], playlist.songs);
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'search':
        return (
          <SearchView
            currentSong={playerState.currentSong}
            isPlaying={playerState.isPlaying}
            onPlaySong={handlePlaySong}
            onTogglePlay={togglePlay}
            onPlayAlbum={handlePlayAlbum}
          />
        );
      case 'library':
        return (
          <LibraryView
            currentSong={playerState.currentSong}
            isPlaying={playerState.isPlaying}
            onPlaySong={handlePlaySong}
            onTogglePlay={togglePlay}
            onPlayAlbum={handlePlayAlbum}
            onPlayPlaylist={handlePlayPlaylist}
          />
        );
      default:
        return (
          <HomeView
            currentSong={playerState.currentSong}
            isPlaying={playerState.isPlaying}
            onPlaySong={handlePlaySong}
            onTogglePlay={togglePlay}
            onPlayAlbum={handlePlayAlbum}
            onPlayPlaylist={handlePlayPlaylist}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white flex flex-col">
      {/* Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse" />
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-pink-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse animation-delay-2000" />
        <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse animation-delay-4000" />
      </div>

      {/* Main Layout */}
      <div className="flex flex-1 relative">
        {/* Sidebar */}
        <div className="hidden lg:block">
          <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          {/* Content Area */}
          <main className="flex-1 overflow-y-auto p-6 pb-32">
            <div className="max-w-7xl mx-auto">
              {renderContent()}
            </div>
          </main>
        </div>
      </div>

      {/* Player */}
      <div className="fixed bottom-0 left-0 right-0 z-50">
        <Player
          playerState={playerState}
          onTogglePlay={togglePlay}
          onNextSong={nextSong}
          onPreviousSong={previousSong}
          onToggleShuffle={toggleShuffle}
          onToggleRepeat={toggleRepeat}
          onVolumeChange={setVolume}
          onSeek={setCurrentTime}
        />
      </div>

      {/* Mobile Navigation */}
      <div className="lg:hidden fixed bottom-24 left-0 right-0 bg-black bg-opacity-95 backdrop-blur-lg border-t border-gray-800 px-4 py-2">
        <div className="flex justify-around">
          {['home', 'search', 'library'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex flex-col items-center space-y-1 p-2 ${
                activeTab === tab ? 'text-white' : 'text-gray-400'
              }`}
            >
              <div className="w-6 h-6">
                {tab === 'home' && (
                  <svg fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                  </svg>
                )}
                {tab === 'search' && (
                  <svg fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                  </svg>
                )}
                {tab === 'library' && (
                  <svg fill="currentColor" viewBox="0 0 20 20">
                    <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z" />
                  </svg>
                )}
              </div>
              <span className="text-xs capitalize">{tab}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;