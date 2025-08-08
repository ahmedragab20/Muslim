import { AuthLand, Errors } from '@/types';
export const useAuthStore = defineStore('auth', () => {
  const Errors = ref<Partial<Errors>>({});

  const setErrors = (errors: Partial<Errors>) => {
    Errors.value = errors;
  };

  const authLanded = ref<boolean>(false);
  const toggleAuthLanded = (payload?: boolean) => {
    if (payload && [true, false].includes(payload)) {
      authLanded.value = payload;
      return;
    }

    authLanded.value = !authLanded.value;
  };

  const chosenAuthLand = ref<AuthLand>('login'); // fallback to login
  const chooseAuthLand = (land: AuthLand): void => {
    if (!land) return;

    chosenAuthLand.value = land;
  };

  return {
    authLanded,
    toggleAuthLanded,
    Errors,
    chosenAuthLand,
    setErrors,
    chooseAuthLand,
  };
});
