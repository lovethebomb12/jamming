import React from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar.js';
import SearchResults from '../SearchResults/SearchResults.js';
import Playlist from '../Playlist/Playlist.js';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);

    this.state = {
      searchResults: [
        {name: "Name1", artist: "Artist1", album: "album1", id: 1},
        {name: "Name2", artist: "Artist2", album: "album2", id: 2},
        {name: "Name3", artist: "Artist3", album: "album3", id: 3},
      ],
      playlistName: "My Playlist",
      playlistTracks: [
        {name: "Name4", artist: "Artist4", album: "album4", id: 4},
        {name: "Name5", artist: "Artist5", album: "album5", id: 5},
        {name: "Name6", artist: "Artist6", album: "album6", id: 6},
      ]
    };
  }

// Adds song to playlist if not already on playlist
  addTrack(track) {
    if (this.state.playlistTracks.find(savedTrack => savedTrack.id === track.id)) {
      return;
    }
    this.state.playlistTracks.push(track);
    // this.setState({playlistTracks: this.state.playlistTracks});
  }

  // Removes song from playlist
    removeTrack(track) {
      const newPlaylist = this.state.playlistTracks.filter(savedTrack => savedTrack.id !== track.id);
      this.setState({playlistTracks: newPlaylist});
    }

  // Allows user to rename playlistTracks
    updatePlaylistName(name) {
      this.setState({playlistName: name});
    }

  // Save playlist to Spotify Account
    savePlaylist() {
      let trackURIs = this.state.playlistTracks.map(track => track.uri);
    }

    search(term) {
      console.log(term);
    }

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar
            onSearch={this.search}/>
          <div className="App-playlist">
            <SearchResults
              searchResults={this.state.searchResults}
              onAdd={this.addTrack}/>
            <Playlist
              playlistName={this.state.playlistName}
              playlistTracks={this.state.playlistTracks}
              onRemove={this.removeTrack}
              onNameChange={this.updatePlaylistName}
              onSave={this.savePlaylist}/>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
