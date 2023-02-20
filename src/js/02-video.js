import Player from '@vimeo/player';
import { throttle } from 'throttle-debounce';

const iframe = document.querySelector('#vimeo-player');

const player = new Player(iframe);
let currentTime;

player.on('timeupdate', throttle(1000, onCurrentTime));
function onCurrentTime(data) {
  try {
    localStorage.setItem('videoplayer-current-time', data.seconds);
  } catch (error) {
    console.error('Set state error: ', error.message);
  }
}

try {
  currentTime = localStorage.getItem('videoplayer-current-time');
} catch (error) {
  console.error('Set state error: ', error.message);
}

if (currentTime) {
  player.setCurrentTime(currentTime).catch(function (error) {
    switch (error.name) {
      case 'RangeError':
        alert(error.name);
        break;

      default:
        alert(error.name);
        break;
    }
  });
}
