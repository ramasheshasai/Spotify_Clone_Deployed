import React, { useState, useMemo } from 'react';
import { SearchBar } from '../SearchBar';
import { GenreCard } from '../GenreCard';
import { SongCard } from '../SongCard';
import { AlbumCard } from '../AlbumCard';
import { mockSongs, mockAlbums, mockGenres } from '../../data/mockData';
import { Song, Album, Genre } from '../../types/music';

interface SearchViewProps {
  currentSong: Song | null;
  isPlaying: boolean;
  onPlaySong: (song: Song) => void;
  onTogglePlay: () => void;
  onPlayAlbum: (album: Album) => void;
}

export const SearchView: React.FC<SearchViewProps> = ({
  currentSong,
  isPlaying,
  onPlaySong,
  onTogglePlay,
  onPlayAlbum
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState<Genre | null>(null);

  const filteredSongs = useMemo(() => {
    if (!searchQuery && !selectedGenre) return [];
    
    let filtered = mockSongs;
    
    if (selectedGenre) {
      filtered = filtered.filter(song => song.genre === selectedGenre.name);
    }
    
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(song =>
        song.title.toLowerCase().includes(query) ||
        song.artist.toLowerCase().includes(query) ||
        song.album.toLowerCase().includes(query) ||
        song.genre.toLowerCase().includes(query)
      );
    }
    
    return filtered;
  }, [searchQuery, selectedGenre]);

  const filteredAlbums = useMemo(() => {
    if (!searchQuery && !selectedGenre) return [];
    
    let filtered = mockAlbums;
    
    if (selectedGenre) {
      filtered = filtered.filter(album => album.genre === selectedGenre.name);
    }
    
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(album =>
        album.title.toLowerCase().includes(query) ||
        album.artist.toLowerCase().includes(query) ||
        album.genre.toLowerCase().includes(query)
      );
    }
    
    return filtered;
  }, [searchQuery, selectedGenre]);

  const handleGenreClick = (genre: Genre) => {
    setSelectedGenre(selectedGenre?.id === genre.id ? null : genre);
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedGenre(null);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-white mb-6">Search</h1>
        <SearchBar onSearch={setSearchQuery} />
      </div>

      {/* Active Filters */}
      {(selectedGenre || searchQuery) && (
        <div className="flex items-center space-x-4 mb-6">
          <span className="text-gray-400 text-sm">Active filters:</span>
          {selectedGenre && (
            <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm">
              {selectedGenre.name}
            </span>
          )}
          {searchQuery && (
            <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm">
              "{searchQuery}"
            </span>
          )}
          <button
            onClick={clearFilters}
            className="text-gray-400 hover:text-white text-sm underline"
          >
            Clear all
          </button>
        </div>
      )}

      {/* Search Results */}
      {(searchQuery || selectedGenre) && (
        <div className="space-y-8">
          {/* Songs Results */}
          {filteredSongs.length > 0 && (
            <section>
              <h2 className="text-2xl font-bold text-white mb-6">Songs</h2>
              <div className="space-y-2">
                {filteredSongs.map((song, index) => (
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

          {/* Albums Results */}
          {filteredAlbums.length > 0 && (
            <section>
              <h2 className="text-2xl font-bold text-white mb-6">Albums</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
                {filteredAlbums.map((album) => (
                  <AlbumCard
                    key={album.id}
                    album={album}
                    onClick={() => {}}
                    onPlay={onPlayAlbum}
                  />
                ))}
              </div>
            </section>
          )}

          {/* No Results */}
          {filteredSongs.length === 0 && filteredAlbums.length === 0 && (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold text-white mb-2">No results found</h3>
              <p className="text-gray-400">Try searching for something else or browse by genre</p>
            </div>
          )}
        </div>
      )}

      {/* Browse by Genre */}
      {!searchQuery && !selectedGenre && (
        <section>
          <h2 className="text-2xl font-bold text-white mb-6">Browse all</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {mockGenres.map((genre) => (
              <GenreCard
                key={genre.id}
                genre={genre}
                onClick={handleGenreClick}
              />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};