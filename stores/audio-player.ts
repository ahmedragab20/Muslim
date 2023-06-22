export const useAudioPlayerStore = defineStore('audio-player', () => {
  const audio = ref();
  const playerInfo = ref([]);
  const status = ref(false);
  const currentTime = ref(0);
  const playerProgress = ref({});
  const setAudio = (newAudio: any) => {
    audio.value = newAudio;
  };
  const setPlayerInfo = (newPlayerInfo: any) => {
    playerInfo.value = newPlayerInfo;
  };
  const setStatus = (newStatus: boolean) => {
    status.value = newStatus;
    audio.value.isPlaying = newStatus;
  };
  const setCurrentTime = (newCurrentTime: number) => {
    currentTime.value = newCurrentTime;
    audio.value.isPlaying = true;
  };
  const toggle = () => {
    if (status.value) {
      audio.value.pause();
    } else {
      audio.value.play();
    }
    setStatus(!status.value);
  };
  const setPlayerProgress = (newPlayerProgress: any) => {
    playerProgress.value = newPlayerProgress;
  };

  return {
    audio,
    playerInfo,
    currentTime,
    setAudio,
    setStatus,
    setCurrentTime,
    setPlayerInfo,
    toggle,
    playerProgress,
    setPlayerProgress,
  };
});
