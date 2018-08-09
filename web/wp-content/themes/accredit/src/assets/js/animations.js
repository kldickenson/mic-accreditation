import $ from 'jquery';

window.$ = $;


$(document).ready(function() {

  var animCompass = {
    container: document.getElementById('compass'),
    renderer: 'svg',
    loop: true,
    autoplay: false,
    path: 'wp-content/themes/ms-toolkit/dist/assets/data/compass.json'
  };
  var compass = bodymovin.loadAnimation(animCompass);
  var card = document.getElementById('compass-card');
  if (card) {
    card.addEventListener('mouseover', (event) => {
      compass.play();
    });
    card.addEventListener('mouseleave', (event) => {
      compass.stop();
    });
    card.addEventListener('touchstart', (event) => {
      compass.play();
    });
    card.addEventListener('touchend', (event) => {
      compass.stop();
    });
  }

  var animBattery = {
    container: document.getElementById('battery'),
    renderer: 'svg',
    loop: true,
    autoplay: false,
    path: 'wp-content/themes/ms-toolkit/dist/assets/data/charging.json'
  };
  var battery = bodymovin.loadAnimation(animBattery);
  var card02 = document.getElementById('battery-card');
  if (card02) {
    card02.addEventListener('mouseover', (event) => {
      battery.play();
    });
    card02.addEventListener('mouseleave', (event) => {
      battery.stop();
    });
    card02.addEventListener('touchstart', (event) => {
      battery.play();
    });
    card02.addEventListener('touchend', (event) => {
      battery.stop();
    });
  }

  var animChat = {
    container: document.getElementById('chatty-chat'),
    renderer: 'svg',
    loop: true,
    autoplay: false,
    path: 'wp-content/themes/ms-toolkit/dist/assets/data/chatty-chat.json'
  };
  var chat = bodymovin.loadAnimation(animChat);
  var card03 = document.getElementById('chatty-chat-card');
  if (card03) {
    card03.addEventListener('mouseover', (event) => {
      chat.play();
    });
    card03.addEventListener('mouseleave', (event) => {
      chat.stop();
    });
    card03.addEventListener('touchstart', (event) => {
      chat.play();
    });
    card03.addEventListener('touchend', (event) => {
      chat.stop();
    });
  }

  var animHeart = {
    container: document.getElementById('heart'),
    renderer: 'svg',
    loop: true,
    autoplay: false,
    path: 'wp-content/themes/ms-toolkit/dist/assets/data/heart.json'
  };
  var heart = bodymovin.loadAnimation(animHeart);
  var card04 = document.getElementById('heart-card');
  if (card04) {
    card04.addEventListener('mouseover', (event) => {
      heart.play();
    });
    card04.addEventListener('mouseleave', (event) => {
      heart.stop();
    });
    card04.addEventListener('touchstart', (event) => {
      heart.play();
    });
    card04.addEventListener('touchend', (event) => {
      heart.stop();
    });
  }

  var animHuman = {
    container: document.getElementById('human'),
    renderer: 'svg',
    loop: true,
    autoplay: false,
    path: 'wp-content/themes/ms-toolkit/dist/assets/data/human.json'
  };
  var human = bodymovin.loadAnimation(animHuman);
  var card05 = document.getElementById('human-card');
  if (card05) {
    card05.addEventListener('mouseover', (event) => {
      human.play();
    });
    card05.addEventListener('mouseleave', (event) => {
      human.stop();
    });
    card05.addEventListener('touchstart', (event) => {
      human.play();
    });
    card05.addEventListener('touchend', (event) => {
      human.stop();
    });
  }

  var animMoon = {
    container: document.getElementById('moon'),
    renderer: 'svg',
    loop: true,
    autoplay: false,
    path: 'wp-content/themes/ms-toolkit/dist/assets/data/moon.json'
  };
  var moon = bodymovin.loadAnimation(animMoon);
  var card06 = document.getElementById('moon-card');
  if (card06) {
    card06.addEventListener('mouseover', (event) => {
      moon.play();
    });
    card06.addEventListener('mouseleave', (event) => {
      moon.stop();
    });
    card06.addEventListener('touchstart', (event) => {
      moon.play();
    });
    card06.addEventListener('touchend', (event) => {
      moon.stop();
    });
  }

  var animSun = {
    container: document.getElementById('sun'),
    renderer: 'svg',
    loop: true,
    autoplay: false,
    path: 'wp-content/themes/ms-toolkit/dist/assets/data/sun.json'
  };
  var sun = bodymovin.loadAnimation(animSun);
  var card07 = document.getElementById('sun-card');
  if (card07) {
    card07.addEventListener('mouseover', (event) => {
      sun.play();
    });
    card07.addEventListener('mouseleave', (event) => {
      sun.stop();
    });
    card07.addEventListener('touchstart', (event) => {
      sun.play();
    });
    card07.addEventListener('touchend', (event) => {
      sun.stop();
    });
  }

  var animTarget = {
    container: document.getElementById('target'),
    renderer: 'svg',
    loop: true,
    autoplay: false,
    path: 'wp-content/themes/ms-toolkit/dist/assets/data/target.json'
  };
  var target = bodymovin.loadAnimation(animTarget);
  var card08 = document.getElementById('target-card');
  if (card08) {
    card08.addEventListener('mouseover', (event) => {
      target.play();
    });
    card08.addEventListener('mouseleave', (event) => {
      target.stop();
    });
    card08.addEventListener('touchstart', (event) => {
      target.play();
    });
    card08.addEventListener('touchend', (event) => {
      target.stop();
    });
  }

  var animThought = {
    container: document.getElementById('thought'),
    renderer: 'svg',
    loop: true,
    autoplay: false,
    path: 'wp-content/themes/ms-toolkit/dist/assets/data/thoughts.json'
  };
  var thought = bodymovin.loadAnimation(animThought);
  var card09 = document.getElementById('thoughts-card');
  if (card09) {
    card09.addEventListener('mouseenter', (event) => {
      thought.play();
    });
    card09.addEventListener('mouseleave', (event) => {
      thought.stop();
    });
    card09.addEventListener('touchstart', (event) => {
      thought.play();
    });
    card09.addEventListener('touchend', (event) => {
      thought.stop();
    });
  }
});
