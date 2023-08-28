// musicplayer.js

// Create a self-contained <style> tag for the music player's CSS
const styleElement = document.createElement("style");
styleElement.innerHTML = `
  @import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.14.0/css/all.min.css');
  * {
    box-sizing: border-box;
  }
  
  .audio-player {
    background-color: rgba(255, 255, 255, 0.4);
    border-radius: 15px;
    box-shadow: 0 3px 10px 0 rgba(186, 184, 184, 0.6);
    display: flex;
    padding: 10px;
    position: fixed;
    bottom: 5px;
    right: 5px;
    z-index: 10;
  }
  
  .control-button {
    background: none;
    border: 0;
    color: #8d91fe;
    font-size: 20px;
    cursor: pointer;
    padding: 10px;
    margin: 0 10px;
  }
  
  .control-button:focus {
    outline: none;
  }
  
  .control-button:hover {
    color: #490349;
  }
  
  #volume {
    appearance: none;
    width: 100px;
    margin-left: 10px;
    background-color: #8d91fe;
    height: 4px;
    border-radius: 2px;
    outline: none;
  }
  
  #volume::-webkit-slider-thumb {
    appearance: none;
    width: 16px;
    height: 16px;
    background-color: #490349;
    border-radius: 50%;
    cursor: pointer;
  }
  
  #song-info {
    display: flex;
    align-items: center;
    margin-left: 10px;
  }
  
  #song-title {
    font-weight: bold;
    margin: 0;
    margin-right: 5px;
    padding-left: 10px;
  }
  
  #album-art {
    width: 40px;
    height: 40px;
    object-fit: cover;
    border-radius: 50%;
  }
  
`;

// Create the container for the music player
const musicContainer = document.createElement("div");
musicContainer.className = "music-container";

// Create the HTML structure for the music player
musicContainer.innerHTML = `
  <div class="audio-player">
    <audio id="audio">
      Your browser does not support the audio element.
    </audio>
    <div class="player-controls">
      <div id="song-info">
        <img id="album-art" src="https://asiadreamradio.torontocast.stream/stations/images/stations/jrockpowerplay-1.png" alt="Album Art">
        <div id="song-title">Song Title</div>
      </div>
      <button id="play-pause" class="control-button" aria-label="Play">
        <i class="fas fa-play"></i>
      </button>
      <button id="next" class="control-button" aria-label="Next">
        <i class="fas fa-forward"></i>
      </button>
      <input id="volume" type="range" min="0" max="1" step="0.1" value="0.5" aria-label="Volume">
    </div>
  </div>
`;

// Append the <style> and music player container to the document
document.head.appendChild(styleElement);
document.body.appendChild(musicContainer);

// Event listener for document load
document.addEventListener("DOMContentLoaded", function() {
  const audio = document.getElementById('audio');
  const playPauseButton = document.getElementById('play-pause');
  const nextButton = document.getElementById('next');
  const volumeSlider = document.getElementById('volume');
  const songTitleElement = document.getElementById('song-title');
  const albumArtElement = document.getElementById('album-art');

  const tracks = [
    'https://kathy.torontocast.com:3340/stream',
    'https://cast1.torontocast.com:2120/stream',
    'https://cast1.torontocast.com:2170/stream'
  ];

  const trackInfo = [
    { title: 'J-Rock Powerplay', image: 'https://asiadreamradio.torontocast.stream/stations/images/stations/jrockpowerplay-1.png' },
    { title: 'Japan Hits', image: 'https://asiadreamradio.torontocast.stream/stations/images/stations/japanhits.png' },
    { title: 'J-Pop Sakura 懐かしい', image: 'https://asiadreamradio.torontocast.stream/stations/images/stations/natsukashii.png' }
  ];

  let currentTrackIndex = 0;

  // Event listener for Play/Pause button
  playPauseButton.addEventListener('click', () => {
    if (audio.paused) {
      audio.play();
      playPauseButton.innerHTML = '<i class="fas fa-pause"></i>';
    } else {
      audio.pause();
      playPauseButton.innerHTML = '<i class="fas fa-play"></i>';
    }
  });

  // Event listener for Next button
  nextButton.addEventListener('click', () => {
    currentTrackIndex = (currentTrackIndex + 1) % tracks.length;
    audio.src = tracks[currentTrackIndex];
    audio.play();
    playPauseButton.innerHTML = '<i class="fas fa-pause"></i>';
    updateSongInfo();
  });

  // Event listener for Volume slider
  volumeSlider.addEventListener('input', () => {
    audio.volume = volumeSlider.value;
  });

  // Function to update song information
  function updateSongInfo() {
    songTitleElement.textContent = trackInfo[currentTrackIndex].title;
    albumArtElement.src = trackInfo[currentTrackIndex].image;
  }

  // Initialize audio player settings
  audio.volume = 0.5;
  audio.src = tracks[currentTrackIndex];
  audio.play();
  updateSongInfo();
  playPauseButton.innerHTML = '<i class="fas fa-pause"></i>';
});
