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

  const headerPlayerOpened = ref(false);
  const setHeaderPlayerOpened = (newHeaderPlayerOpened?: boolean) => {
    if (!newHeaderPlayerOpened) {
      headerPlayerOpened.value = !headerPlayerOpened.value;

      return;
    }

    headerPlayerOpened.value = newHeaderPlayerOpened;
  };

  watch(
    () => audio.value,
    (newAudio, oldAudio) => {
      if (!newAudio) return;
      if (oldAudio) {
        const oldAudioStateId = oldAudio?.info?.[0]?.chapterId;
        const oldAudioState = useState<any>(`audio-${oldAudioStateId}`);
        const mediaProgressFormatted = useState<any>(
          `mediaProgressFormatted-${oldAudioStateId}`,
          () => '00:00/00:00'
        );
        const mediaProgressPercentage = useState<any>(`mediaProgressPercentage-${oldAudioStateId}`);
        const mediaProgressInSeconds = useState<any>(`mediaProgressInSeconds-${oldAudioStateId}`);

        if (oldAudioState.value) {
          oldAudioState.value?.stop();

          oldAudioState.value = null;
        }

        if (mediaProgressFormatted.value) {
          mediaProgressFormatted.value = '00:00/00:00';
        }

        if (mediaProgressPercentage.value) {
          mediaProgressPercentage.value = 0;
        }

        if (mediaProgressInSeconds.value) {
          mediaProgressInSeconds.value = 0;
        }
      }
    }
  );

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
    headerPlayerOpened,
    setHeaderPlayerOpened,
  };
});
