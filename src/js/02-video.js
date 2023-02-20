import Player from '@vimeo/player';
import { throttle } from 'throttle-debounce';

const iframe = document.querySelector('#vimeo-player');

const player = new Player(iframe);

player.on('timeupdate', throttle(1000, onCurrentTime));
function onCurrentTime(data) {
  localStorage.setItem('videoplayer-current-time', data.seconds);
}

const currentTime = localStorage.getItem('videoplayer-current-time');

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
