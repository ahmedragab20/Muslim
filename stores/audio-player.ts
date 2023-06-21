export const useAudioPlayerStore = defineStore('audio-player', () => {
  const audio = ref();
  const playerInfo = ref([]);
  const status = ref(false);
  const currentTime = ref(0);
  const setAudio = (newAudio: any) => {
    audio.value = newAudio;
  };
  const setPlayerInfo = (newPlayerInfo: any) => {
    playerInfo.value = newPlayerInfo;
  };
  const setStatus = (newStatus: boolean) => {
    status.value = newStatus;
  };
  const setCurrentTime = (newCurrentTime: number) => {
    currentTime.value = newCurrentTime;
  };

  return {
    audio,
    playerInfo,
    currentTime,
    setAudio,
    setStatus,
    setCurrentTime,
    setPlayerInfo,
  };
});
