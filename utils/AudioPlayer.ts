export default class AudioPlayer {
  public readonly audio: HTMLAudioElement;
  private isPlaying: boolean;
  public readonly verseKey: string;

  constructor(url: string, verseKey?: string) {
    this.audio = new Audio(url);
    this.isPlaying = false;
    this.verseKey = verseKey || '';
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
    this.audio.currentTime = 0;
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

  public setVolume(volume: number): void {
    this.audio.volume = volume;
  }

  public setPlaybackRate(rate: number): void {
    this.audio.playbackRate = rate;
  }

  public setCurrentTime(time: number): void {
    this.audio.currentTime = time;
  }
}
