export default function useAppInfo() {
  const { locale } = useI18n();
  const appDir = computed(() => (locale.value?.includes('ar') ? 'rtl' : 'ltr'));

  return {
    appDir,
  };
}
