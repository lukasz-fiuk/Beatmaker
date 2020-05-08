class Tiles {
  constructor() {
    this.tile = document.querySelectorAll(".tile");
    this.playBtn = document.querySelector(".container__playbtn");
    this.kickAudio = document.querySelector(".kick-sound");
    this.snareAudio = document.querySelector(".snare-sound");
    this.hihatAudio = document.querySelector(".hihat-sound");
    this.index = 0;
    this.bpm = 200;
    this.isPlaying = null;
  }
  activeTile() {
    this.classList.toggle("active");
  }
  repeat() {
    let step = this.index % 8;
    const activeTiles = document.querySelectorAll(`.b${step}`);
    this.index++;

    activeTiles.forEach((tile) => {
      tile.style.animation = `play 0.4s ease`;

      if (tile.classList.contains("active")) {
        if (tile.classList.contains("tile--kick")) {
          this.kickAudio.currentTime = 0;
          this.kickAudio.play();
        }
        if (tile.classList.contains("tile--snare")) {
          this.snareAudio.currentTime = 0;
          this.snareAudio.play();
        }
        if (tile.classList.contains("tile--hihat")) {
          this.hihatAudio.currentTime = 0;
          this.hihatAudio.play();
        }
      }
    });
  }

  start() {
    const interval = (60 / this.bpm) * 1000;
    if (!this.isPlaying) {
      this.isPlaying = setInterval(() => {
        this.repeat();
        this.playBtn.innerText = "Pause"
      }, interval);
    } else {
      clearInterval(this.isPlaying);
      this.isPlaying = null;
      this.playBtn.innerText = "Resume"
    }
  }
}

const consoleTiles = new Tiles();

consoleTiles.tile.forEach((tile) => {
  tile.addEventListener("click", consoleTiles.activeTile);
  tile.addEventListener("animationend", function () {
    this.style.animation = "";
  });
});

consoleTiles.playBtn.addEventListener("click", function () {
  consoleTiles.start();
});
