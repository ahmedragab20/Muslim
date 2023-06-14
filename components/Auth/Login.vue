<template>
  <div>
    <!-- form -->
    <form @submit.prevent="submitLogin">
      <div>
        <div>
          <UInput
            v-model="form.email"
            placeholder="you@example.com"
            name="login-email"
            icon="i-heroicons-envelope"
            type="email"
            class="mb-1"
            :required="true"
          />
          <!-- email validator -->
          <div v-if="form.email.length && !validateEmail(form.email)">
            <small class="text-red-600"> not valid email </small>
          </div>
        </div>
        <div>
          <div class="relative">
            <UInput
              v-model="form.password"
              placeholder="Password"
              name="login-password"
              icon="i-heroicons-lock-closed"
              :type="showPassword ? 'text' : 'password'"
            />
            <div
              class="absolute right-0 top-0 bottom-0 flex items-center cursor-pointer"
              @click="showPassword = !showPassword"
            >
              <UButton
                :icon="showPassword ? 'i-heroicons-eye' : 'i-heroicons-eye-slash'"
                variant="ghost"
                color="white"
                class="hover:bg-transparent hover:dark:bg-transparent"
              />
            </div>
          </div>
          <!-- password validator -->
          <div v-if="form.password.length && !validatePassword(form.password)">
            <small class="text-red-600">
              at least 8 characters long, contain one uppercase letter, one lowercase, one number
              and one special character
            </small>
          </div>
        </div>

        <div>
          <UButton
            type="submit"
            class="mt-4"
            color="primary"
            :loading="loading"
            :disabled="formValid"
          >
            Login
          </UButton>
        </div>
        <template v-if="errorMsg?.length">
          <div class="mt-3">
            <UBadge color="red" icon="i-heroicons-exclamation-circle" class="mb-1">
              {{ errorMsg }}
            </UBadge>
          </div>
        </template>
      </div>
    </form>
  </div>
</template>
<script setup lang="ts">
  import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
  import { useAuthStore } from '~/stores/auth';
  interface Form {
    email: string;
    password: string;
  }

  const authStore = useAuthStore();
  const toast = useToast();

  const auth = getAuth();

  const showPassword = ref<boolean>(false);

  const form = ref<Form>({
    email: '',
    password: '',
  });

  const formValid = computed<boolean>(() => {
    return !validateEmail?.(form.value.email) || !validatePassword?.(form.value.password);
  });

  const errorMsg = ref<string>();
  const loading = ref<boolean>(false);

  const submitLogin = async () => {
    loading.value = true;
    const { email, password } = form.value;
    await signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        authStore.toggleAuthLanded(false);
        toast.add({
          title: 'Login Success',
          description: 'You have successfully logged in',
        });
        if (process.client) window.location.reload();
      })
      .catch((error) => {
        errorMsg.value = error.message;
      })
      .finally(() => {
        loading.value = false;
      });
  };
</script>
