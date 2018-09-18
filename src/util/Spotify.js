const clientId = '530cffde5dba437584bb3f1947fe86b1';


let accessToken = '';
let expiresIn = '';




const Spotify = {

  getAccessToken() {
    if(accssToken) {
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


  }
};

export default Spotify;
