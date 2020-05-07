
function playAudio() {
  const audio = new Audio("../img/audio/Come-Along.mp3");
  const playBtn = $(".audio-player__play");
  playBtn.click(() => {
    if($(".pause").length === 0) {
      audio.play();
      range.attr('max', audio.duration);
      playBtn.addClass('pause');
    }else {
      audio.pause();
      playBtn.removeClass('pause');
    }
  })
  
  const range = $('.audio-player__range');
  const rangeDecor = $('.audio-player__range-decor');

  range.bind("change", function() {
		audio.currentTime = $(this).val();
  });

  audio.addEventListener('timeupdate',function (){
    let curtime = parseInt(audio.currentTime, 10);
    if(curtime + 1 > audio.duration) {
      rangeDecor.width('100%');
    }else {
      rangeDecor.width(`${curtime / audio.duration * 100 + 0.5}%`);
    }
    range.val(audio.currentTime);
  });
}

$(document).ready(() => {
  playAudio();
});

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

var dotsSwiper = new Swiper ('.dots-slider', {
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
