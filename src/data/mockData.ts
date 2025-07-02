import { Song, Album, Playlist, Genre } from '../types/music';

export const mockSongs: Song[] = [
  {
    id: '1',
    title: 'Midnight Dreams',
    artist: 'Luna Echo',
    album: 'Neon Nights',
    duration: '3:42',
    coverUrl: 'https://images.pexels.com/photos/1626481/pexels-photo-1626481.jpeg?auto=compress&cs=tinysrgb&w=300',
    audioUrl: '#',
    genre: 'Electronic',
    year: 2024,
    isLiked: true
  },
  {
    id: '2',
    title: 'Ocean Waves',
    artist: 'Coastal Vibes',
    album: 'Summer Breeze',
    duration: '4:15',
    coverUrl: 'https://images.pexels.com/photos/1619563/pexels-photo-1619563.jpeg?auto=compress&cs=tinysrgb&w=300',
    audioUrl: '#',
    genre: 'Chill',
    year: 2024,
    isLiked: false
  },
  {
    id: '3',
    title: 'Urban Pulse',
    artist: 'City Lights',
    album: 'Metropolitan',
    duration: '3:28',
    coverUrl: 'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=300',
    audioUrl: '#',
    genre: 'Hip Hop',
    year: 2023,
    isLiked: true
  },
  {
    id: '4',
    title: 'Starlight Serenade',
    artist: 'Midnight Jazz',
    album: 'After Hours',
    duration: '5:12',
    coverUrl: 'https://images.pexels.com/photos/1616470/pexels-photo-1616470.jpeg?auto=compress&cs=tinysrgb&w=300',
    audioUrl: '#',
    genre: 'Jazz',
    year: 2024,
    isLiked: false
  },
  {
    id: '5',
    title: 'Electric Storm',
    artist: 'Thunder Bay',
    album: 'Lightning Strikes',
    duration: '4:33',
    coverUrl: 'https://images.pexels.com/photos/1407322/pexels-photo-1407322.jpeg?auto=compress&cs=tinysrgb&w=300',
    audioUrl: '#',
    genre: 'Rock',
    year: 2023,
    isLiked: true
  },
  {
    id: '6',
    title: 'Golden Hour',
    artist: 'Sunrise Collective',
    album: 'Dawn',
    duration: '3:55',
    coverUrl: 'https://images.pexels.com/photos/1624496/pexels-photo-1624496.jpeg?auto=compress&cs=tinysrgb&w=300',
    audioUrl: '#',
    genre: 'Indie',
    year: 2024,
    isLiked: false
  }
];

export const mockAlbums: Album[] = [
  {
    id: '1',
    title: 'Neon Nights',
    artist: 'Luna Echo',
    coverUrl: 'https://images.pexels.com/photos/1626481/pexels-photo-1626481.jpeg?auto=compress&cs=tinysrgb&w=400',
    year: 2024,
    genre: 'Electronic',
    songs: [mockSongs[0]],
    totalDuration: '45:32'
  },
  {
    id: '2',
    title: 'Summer Breeze',
    artist: 'Coastal Vibes',
    coverUrl: 'https://images.pexels.com/photos/1619563/pexels-photo-1619563.jpeg?auto=compress&cs=tinysrgb&w=400',
    year: 2024,
    genre: 'Chill',
    songs: [mockSongs[1]],
    totalDuration: '38:42'
  },
  {
    id: '3',
    title: 'Metropolitan',
    artist: 'City Lights',
    coverUrl: 'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=400',
    year: 2023,
    genre: 'Hip Hop',
    songs: [mockSongs[2]],
    totalDuration: '52:18'
  }
];

export const mockPlaylists: Playlist[] = [
  {
    id: '1',
    name: 'My Favorites',
    description: 'Your most loved tracks',
    coverUrl: 'https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg?auto=compress&cs=tinysrgb&w=400',
    songs: mockSongs.filter(song => song.isLiked),
    isPublic: false,
    createdAt: '2024-01-15',
    totalDuration: '1:23:45'
  },
  {
    id: '2',
    name: 'Chill Vibes',
    description: 'Perfect for relaxing moments',
    coverUrl: 'https://images.pexels.com/photos/1212600/pexels-photo-1212600.jpeg?auto=compress&cs=tinysrgb&w=400',
    songs: [mockSongs[1], mockSongs[3], mockSongs[5]],
    isPublic: true,
    createdAt: '2024-02-10',
    totalDuration: '56:32'
  }
];

export const mockGenres: Genre[] = [
  {
    id: '1',
    name: 'Electronic',
    color: 'from-purple-500 to-pink-500',
    coverUrl: 'https://images.pexels.com/photos/1626481/pexels-photo-1626481.jpeg?auto=compress&cs=tinysrgb&w=300'
  },
  {
    id: '2',
    name: 'Hip Hop',
    color: 'from-orange-500 to-red-500',
    coverUrl: 'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=300'
  },
  {
    id: '3',
    name: 'Jazz',
    color: 'from-blue-500 to-cyan-500',
    coverUrl: 'https://images.pexels.com/photos/1616470/pexels-photo-1616470.jpeg?auto=compress&cs=tinysrgb&w=300'
  },
  {
    id: '4',
    name: 'Rock',
    color: 'from-red-500 to-pink-500',
    coverUrl: 'https://images.pexels.com/photos/1407322/pexels-photo-1407322.jpeg?auto=compress&cs=tinysrgb&w=300'
  },
  {
    id: '5',
    name: 'Indie',
    color: 'from-green-500 to-teal-500',
    coverUrl: 'https://images.pexels.com/photos/1624496/pexels-photo-1624496.jpeg?auto=compress&cs=tinysrgb&w=300'
  },
  {
    id: '6',
    name: 'Chill',
    color: 'from-teal-500 to-blue-500',
    coverUrl: 'https://images.pexels.com/photos/1619563/pexels-photo-1619563.jpeg?auto=compress&cs=tinysrgb&w=300'
  }
];