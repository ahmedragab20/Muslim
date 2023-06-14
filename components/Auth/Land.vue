<template>
  <!-- this is shared space for the auth modules -->
  <UCard>
    <template #header>
      <div v-text="landTitle" class="text-lg sm:text-xl font-headline"></div>
    </template>

    <!-- content -->
    <div>
      <component :is="landComponent" @done="loginSuccess" />
    </div>
  </UCard>
</template>
<script setup lang="ts">
  import { AuthLand } from '@/types';

  const { target = 'login' } = defineProps<{
    target?: AuthLand;
  }>();
  const toast = useToast();

  const landTitle = computed(() => {
    switch (target) {
      case 'login':
        return 'Login';
      case 'register':
        return 'Register';
      case 'forgot':
        return 'Forgot Password';
      case 'reset':
        return 'Reset Password';
      case 'verify':
        return 'Verify Email';
      default:
        return '';
    }
  });

  const landComponent = computed(() => {
    switch (target) {
      case 'login':
        return resolveComponent('AuthLogin');
      case 'register':
        return resolveComponent('AuthRegistration');
      // TODO:: add the rest of the auth components
      // case 'forgot':
      //   return resolveComponent('AuthForgot');
      // case 'reset':
      //   return resolveComponent('AuthReset');
      // case 'verify':
      //   return resolveComponent('AuthVerify');
      default:
        return resolveComponent('<div></div>');
    }
  });

  const loginSuccess = (done: boolean) => {
    if (done) {
      toast.add({
        title: 'Login Success',
        description: 'You have successfully logged in!',
        type: 'success',
      });
    }
  };

  /**
   * TODO:: add shortcuts to toggle the [login/register]
   */
</script>
