const clientId = '530cffde5dba437584bb3f1947fe86b1';
const redirectURL = 'http://localhost:3000/';

let accessToken = '';
let expiresIn = '';




const Spotify = {
  // Checks for authorization & redirects if needed
  getAccessToken() {
    if(accessToken) {
      return accessToken;
    }
    const url = window.location.href;
    if(url.match(/access_token=([^&]*)/) && url.match(/expires_in=([^&]*)/)) {
      accessToken = url.match(/access_token=([^&]*)/);
      expiresIn =  url.match(/expires_in=([^&]*)/);

      window.setTimeout(() => accessToken = '', expiresIn * 1000);
      window.history.pushState('Access Token', null, '/');

      return accessToken;
    }
    else {
      window.location = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURL}`;
    }
  },

  // Searches spotify
  search(term) {
    return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`,
    {
      headers: {Authorization: `Bearer ${accessToken}`}
    }).then(response => {
        if(response.ok) {
          return response.json();
        }
     }).then(jsonResponse.tracks => {
       if(jsonResponse.tracks) {
         return jsonResponse.tracks.items.map(track => ({
           id: track.id,
           name: track.name,
           artist: track.artists[0].name,
           album: track.album.name,
           url: track.uri
         }));
       }
     });
   },

   // Save user's playlist
   savePlaylist(playlistName, trackURIs) {
     let accessToken = Spotify.getAccessToken();
     const headers = { Authorization: `Bearer ${accessToken}` };
     let userID = '';
     let playlistID = '';

     if (!playlistName || !trackURIs) {
       return;
     }

     return fetch(`https://api.spotify.com/v1/me`, {headers: headers}).then(response => {
       if (response.ok) {
         return response.json();
       }
     }).then(jsonResponse => {
       userID = jsonResponse.id;

       return fetch(`/v1/users/${userID}/playlists`, {
         headers: {Authorization: `Bearer ${accessToken}`,'Content-type': 'application/json'},
         method: 'POST',
         body: JSON.stringify({name: playlistName})
       }).then(response => {
         if (response.ok) {
           return response.json();
         }
       }).then(jsonResponse => {
            playlistID = jsonResponse.id;

            return fetch(`/v1/users/${userID}/playlists/${playlistID}/tracks`, {
              headers: {Authorization: `Bearer ${accessToken}`,'Content-type': 'application/json'},
              method: 'POST',
              body JSON.stringify({uris: trackURIs})
            }).then(response => {
              if (response.ok) {
                return response.json();
              }
            }).then(jsonResponse => {
                 playlistID = jsonResponse.id;
         });
       });
     });
   }
}

export default Spotify;
