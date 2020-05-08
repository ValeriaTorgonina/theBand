document.addEventListener("DOMContentLoaded", function() {
  class Player {
    constructor() {
      this.playBtn = document.querySelector(".audio-player__play");
      this.range = document.querySelector('.audio-player__range');
      this.rangeDecor = document.querySelector('.audio-player__range-decor');
      this.playlist = document.querySelector(".player__playlist");
      this.trackTitle = document.querySelector('.player__titles .player__track');
      this.nextBtn = document.querySelector('.audio-player__next');
      this.prevBtn = document.querySelector('.audio-player__prev');
      this.tracks = this.getAllTracks();
      this.renderPlaylist();
      this.audio = new Audio(`../img/audio/come-along.mp3`);
      this.activeTrack = this.getActiveTrack();
      this.playlistBtns = document.querySelectorAll(".player__play-btn");
      this.addHandlerForPlayButton();
      this.addHandlerForPlaylist();
      this.addHandlerForAudioRange();
      this.addHandlerForNextButton();
      this.addHandlerForPrevButton();
    }

    buildListItemHTML(dataName, trackText, trackTime, i, isActive) {
      return (
      `<li class="player__playlist-item" data-name="${dataName}">
        <button class="player__play-btn ${isActive ? 'active' : ''}"></button>
        <span class="player__track">${this.padZero(i)}. ${trackText}</span>
        <span class="player__track-time">${trackTime}</span>
      </li>`
      )
    }

    padZero(num) {
      return num < 10 ? `0${num}` : num;
    }

    getAllTracks() {
      return [
        {
          "name": "come-along",
          "text": "come along",
          "active": true
        },
        {
          "name": "put-it-on-me",
          "text": "Put it on me"
        },
        {
          "name": "cold-cold-cold",
          "text": "cold cold cold"
        },
        {
          "name": "darkside",
          "text": "darkside"
        },
        {
          "name": "out-of-black",
          "text": "out of black"
        },
        {
          "name": "overdose",
          "text": "overdose"
        },
        {
          "name": "feeling-good",
          "text": "feeling good"
        },
        {
          "name": "everything-black",
          "text": "everything black"
        },
        {
          "name": "blood-water",
          "text": "blood // water"
        }
      ];
    }

    renderPlaylist() {
      this.playlist.innerHTML = this.tracks.map((item, i) => {
        return this.buildListItemHTML(
          item.name, 
          item.text, 
          `${Math.floor(Math.random() * 3 + 2)}:${this.padZero(Math.floor(Math.random() * 60))}`,
          i+1,
          item.active,
        )
      }).join('');
    }

    getActiveTrack() {
      return this.tracks.find(item => item.active);
    }

    addHandlerForNextButton() {
      this.nextBtn.onclick = () => {
        const activeTrackIndex = this.tracks.findIndex(item => {
          return item.name == this.activeTrack.name;
        })
        if(activeTrackIndex + 1 === this.tracks.length) {
          this.changeActiveTrack(this.tracks[0].name);
        }else{
          this.changeActiveTrack(this.tracks[activeTrackIndex + 1].name);
        }

        this.reloadAudio();
        this.changeTrack();
      }
    }

    addHandlerForPrevButton() {
      this.prevBtn.onclick = () => {
        const activeTrackIndex = this.tracks.findIndex(item => {
          return item.name == this.activeTrack.name;
        })
        if(activeTrackIndex === 0) {
          this.changeActiveTrack(this.tracks[this.tracks.length - 1].name);
        }else{
          this.changeActiveTrack(this.tracks[activeTrackIndex - 1].name);
        }

        this.reloadAudio();
        this.changeTrack();
      }
    }

    reloadAudio() {
      this.playBtn.classList.remove('pause');
      this.rangeDecor.style.width = '0%';
      this.audio.load();
    }

    addHandlerForPlayButton() {
      this.playBtn.onclick = () => {
        const pauseBtn = document.querySelector(".pause");
        if(!pauseBtn) {
          this.audio.play();
          this.range.setAttribute('max', this.audio.duration);
          this.playBtn.classList.add('pause');
        }else {
          this.audio.pause();
          this.playBtn.classList.remove('pause');
        }
      }
    };

    changeActiveTrack(name) {
      this.tracks = this.tracks.map(item => {
        return {
          ...item, 
          active: item.name === name,
        }
      });
      this.activeTrack = this.getActiveTrack();
      this.reloadAudio();
      this.changeTrack();
    }

    addHandlerForPlaylist() {
      this.playlist.onclick = e => {
        // change active button
        const trackItem = e.target.closest('.player__playlist-item');
        this.playlistBtns.forEach(item => item.classList.remove('active'));
        trackItem.querySelector('.player__play-btn').classList.add('active');
        // add track to player
        const name = trackItem.dataset.name;
        this.changeActiveTrack(name)
      }
    };

    changeTrack() {
      this.audio.pause();
      this.trackTitle.textContent = this.activeTrack.text;
      this.audio.setAttribute('src', `../img/audio/${this.activeTrack.name}.mp3`);
    }

    addHandlerForAudioRange() {
      this.range.onchange = () => {
        this.audio.currentTime = this.range.value;
      };
    
      this.audio.addEventListener('timeupdate', () => {
        let curtime = parseInt(this.audio.currentTime, 10);
        if(curtime + 1 > this.audio.duration) {
          this.rangeDecor.slyle.width = '100%';
        }else {
          this.rangeDecor.style.width = `${curtime / this.audio.duration * 100 + 0.5}%`;
        }
        this.range.value = this.audio.currentTime;
      });
    }
  }

  new Player();

  const rellax = new Rellax('.rellax');

  const aboutSwiper = new Swiper ('.about__swiper', {
    loop: true,
    speed: 1500,
    parallax: true,

    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    }
  })

  const dotsSwiper = new Swiper ('.dots-slider', {
    loop: false,
    speed: 500,

    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },

    breakpoints: {
      0: {
        slidesPerView: 3,
        spaceBetween: 40,
        initialSlide: 5,
      },
      500: {
        slidesPerView: 5,
        spaceBetween: 40,
        initialSlide: 3,
      },
      770: {
        slidesPerView: 7,
        spaceBetween: 32,
        initialSlide: 3,
      },
      1100: {
        slidesPerView: 7,
        spaceBetween: 10,
        initialSlide: 1,
      },
      1600: {
        slidesPerView: 10,
        spaceBetween: 10,
        initialSlide: 1,
      }
    }
  })
});




