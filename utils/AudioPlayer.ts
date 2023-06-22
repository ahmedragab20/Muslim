export default class AudioPlayer {
  public readonly audio: HTMLAudioElement;
  private isPlaying: boolean;
  public readonly info: any[]; // some data you might need to store in the audio player instance to use later for any purpose
  public readonly url: string;

  constructor(url: string, info?: any[]) {
    this.url = url;
    this.audio = new Audio(url);
    this.isPlaying = false;
    this.info = info || [];
  }

  public toggle(): void {
    if (this.isPlaying) {
      this.audio.pause();
    } else {
      this.audio.play();
    }

    this.isPlaying = !this.isPlaying;
  }

  public play(): void {
    this.audio.play();
    this.isPlaying = true;
  }

  public stop(): void {
    this.audio.pause();
    this.setCurrentTime(0);
    this.isPlaying = false;
  }

  public pause(): void {
    this.audio.pause();
    this.isPlaying = false;
  }

  public onEnded(callback?: () => void): void {
    this.audio.addEventListener('ended', () => {
      this.isPlaying = false;
      callback?.();
    });
  }
  // on time update
  public onTimeUpdate(callback?: (time: number) => void): void {
    this.audio.addEventListener('timeupdate', () => {
      callback?.(this.audio.currentTime);
    });
  }

  //onBuffering
  public onBuffering(callback?: () => void): void {
    this.audio.addEventListener('waiting', () => {
      callback?.();
    });
  }
  // on buffering end
  public onPlaying(callback?: () => void): void {
    this.audio.addEventListener('playing', () => {
      callback?.();
    });
  }
  setIsPlaying(isPlaying: boolean): void {
    this.isPlaying = isPlaying;
  }

  public setVolume(volume: number): void {
    this.audio.volume = volume;
  }

  public setPlaybackRate(rate: number): void {
    this.audio.playbackRate = rate;
  }

  public setCurrentTime(time: number): void {
    if (!time || time === Infinity) return;
    if (time < 0) {
      time = 0;
    }

    this.audio.currentTime = time;
  }
  get duration(): number {
    return this.audio.duration;
  }
}
