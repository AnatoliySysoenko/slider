class Carousel {
  constructor(p) {
    const s = ({
      ...{
        containerID: '#carousel',
        interval: 2000,
        isPlaying: false
      }, ...p
    });
    this.container = document.querySelector('#carousel');
    this.isPlaying = s.isPlaying;
    this.interval = s.interval;
  }

  _initProps() {
    this.currentSlide = 0;

    this.SLIDES_LENGTH = 5;
    this.FA_PAUSE = '<i class="fas fa-pause-circle"></i>';
    this.FA_PLAY = '<i class="fas fa-play-circle"></i>';
    this.FA_PREV = '<i class="fas fa-angle-left"></i>';
    this.FA_NEXT = '<i class="fas fa-angle-right"></i>';
    this.CODE_ARROW_LEFT = 'ArrowLeft';
    this.CODE_ARROW_RIGHT = 'ArrowRight';
    this.CODE_SPACE = 'Space';
  }

  _initSlider() {
    const list = document.createElement('ul');
    list.setAttribute('class', 'slides');

    for (let i = 0; i < this.SLIDES_LENGTH; i++) {
      const item = document.createElement('li');
      item.setAttribute('class', i !== 0 ? 'slide' : 'slide active');

      list.append(item);
    }

    this.container.append(list);
    this.slides = this.container.querySelectorAll('.slide');
  }

  _initControls() {
    const controls = document.createElement('div');
    controls.setAttribute('class', 'controls');

    const PAUSE = `<span id="pause" class="control control-pause">
                     <span id="fa-pause-icon" class="pause-icon">${this.FA_PAUSE}</span>
                     <span id="fa-play-icon" class="play-icon">${this.FA_PLAY}</span>
                   </span>`;
    const PREV = `<span id="prev" class="control control-prev">${this.FA_PREV}</span>`;
    const NEXT = `<span id="next" class="control control-next">${this.FA_NEXT}</span>`;

    controls.innerHTML = PREV + PAUSE + NEXT;

    this.container.append(controls);

    this.pauseBtn = this.container.querySelector('#pause');
    this.prevBtn = this.container.querySelector('#prev');
    this.nextBtn = this.container.querySelector('#next');
    this.pauseIcon = this.container.querySelector('#fa-pause-icon');
    this.playIcon = this.container.querySelector('#fa-play-icon');

    this.isPlaying ? this._pauseVisible() : this._playVisible();
  }

  _initIndicators() {
    const indicators = document.createElement('div');
    indicators.setAttribute('class', 'indicators');

    for (let i = 0; i < this.SLIDES_LENGTH; i++) {
      const indicator = document.createElement('div');
      indicator.setAttribute('class', i !== 0 ? 'indicator' : 'indicator active');
      indicator.dataset.slideTo = `${i}`;

      indicators.append(indicator);
    }

    this.container.append(indicators);

    this.indicatorsContainer = this.container.querySelector('.indicators');
    this.indicators = this.container.querySelectorAll('.indicator');
  }

  _pause() {
    clearInterval(this.timerID);
    this.isPlaying = false;
    this._playVisible();
  }

  _play() {
    this.isPlaying = true;
    this._pauseVisible();
    this._tick();
  }

  _goToNth(n) {
    this.slides[this.currentSlide].classList.toggle('active');
    this.indicators[this.currentSlide].classList.toggle('active');
    this.currentSlide = (n + this.SLIDES_LENGTH) % this.SLIDES_LENGTH;
    this.slides[this.currentSlide].classList.toggle('active');
    this.indicators[this.currentSlide].classList.toggle('active');
  }

  _goToNext() {
    this._goToNth(this.currentSlide + 1);
  }

  _goToPrev() {
    this._goToNth(this.currentSlide - 1);
  }

  _pauseVisible(isVisible = true) {
    this.pauseIcon.style.display = isVisible ? 'flex' : 'none';
    this.playIcon.style.display = !isVisible ? 'flex' : 'none';
  }

  _playVisible() {
    this._pauseVisible(false);
  }

  _indicate(e) {
    const target = e.target;
    if (target && target.classList.contains('indicator')) {
      this._goToNth(+target.dataset.slideTo);
      this._pause();
    }
  }

  _pressKey(e) {
    if (e.code === this.CODE_ARROW_LEFT) this.prev();
    if (e.code === this.CODE_ARROW_RIGHT) this.next();
    if (e.code === this.CODE_SPACE) this.pausePlay();
  }

  _tick(flag = true) {
    if (!flag) return;
    this.timerID = setInterval(() => this._goToNext(), this.interval);
  }

  _initListeners() {
    this.pauseBtn.addEventListener('click', this.pausePlay.bind(this));
    this.prevBtn.addEventListener('click', this.prev.bind(this));
    this.nextBtn.addEventListener('click', this.next.bind(this));
    this.indicatorsContainer.addEventListener('click', this._indicate.bind(this));
    document.addEventListener('keydown', this._pressKey.bind(this));
    // this.container.addEventListener('mouseenter', this._pause.bind(this));
    // this.container.addEventListener('mouseleave', this._play.bind(this));
  }

  next() {
    this._goToNext();
    this._pause();
  }

  prev() {
    this._goToPrev();
    this._pause();
  }

  pausePlay() {
    this.isPlaying ? this._pause() : this._play();
  }

  init() {
    this._initProps();
    this._initSlider();
    this._initControls();
    this._initIndicators();
    this._tick(this.isPlaying);
    this._initListeners();
  }
}

export default Carousel;