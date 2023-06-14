<template>
  <div>
    <UDropdown :items="links" :popper="{ placement: 'bottom-start' }" :ui="dropdownPreset">
      <UButton color="white" label="" trailing-icon="i-heroicons-chevron-down-20-solid" />
    </UDropdown>

    <!-- About Developer Dialog -->
    <UModal v-model="aboutDeveloperDialog">
      <About />
    </UModal>
    <!-- Pro tips modal -->
    <UModal v-model="proTipsDialog">
      <ProTips />
    </UModal>
  </div>
</template>
<script setup lang="ts">
  const { t } = useI18n();

  const links = [
    [
      {
        label: t('links.login'),
        icon: 'i-heroicons-user-circle',
        shortcuts: ['L'],
        click: () => {
          Debug.log({
            message: 'Login',
          });
        },
      },
      {
        label: t('links.register'),
        icon: 'i-heroicons-at-symbol',
        shortcuts: ['R'],
        click: () => {
          Debug.log({
            message: 'Register',
          });
        },
      },
    ],
    [
      {
        label: t('links.aboutTheDeveloper'),
        icon: 'i-heroicons-question-mark-circle',
        shortcuts: ['I'],
        click: () => {
          toggleAboutDeveloperDialog();
        },
      },
      {
        label: t('links.proTips'),
        icon: 'i-heroicons-light-bulb',
        shortcuts: ['/'],
        click: () => {
          toggleProTipsDialog();
        },
      },
    ],
    [
      {
        label: t('links.logout'),
        icon: 'i-heroicons-arrow-left-on-rectangle',
        shortcuts: ['O'],
        click: () => {
          Debug.log({
            message: 'Logout',
          });
        },
      },
    ],
  ];

  const dropdownPreset = {
    item: {
      base: 'group flex items-center gap-2 w-full cursor-pointer',
    },
    // resource:: https://github.com/nuxtlabs/ui/blob/dev/src/runtime/components/elements/Dropdown.vue
  };
  const aboutDeveloperDialog = ref(false);
  const toggleAboutDeveloperDialog = () => {
    aboutDeveloperDialog.value = !aboutDeveloperDialog.value;
  };

  const proTipsDialog = ref(false);
  const toggleProTipsDialog = () => {
    proTipsDialog.value = !proTipsDialog.value;
  };

  // shortcuts
  defineShortcuts({
    I: {
      usingInput: false,
      handler: () => toggleAboutDeveloperDialog(),
    },
  });
  defineShortcuts({
    '/': {
      usingInput: false,
      handler: () => toggleProTipsDialog(),
    },
  });
</script>
