<template>
  <div>
    <!-- TODOs: -->
    <!-- 1. add next pray info -->
    <!-- 2. add Date in Hijry -->
    <!-- 3. add today's allah name -->

    <!-- app story -->
    <div class="flex min-h-[75dvh] flex-col items-center justify-center">
      <!-- Hijri time -->
      <div class="mb-10">
        <div class="text-gray-600 dark:text-gray-400 font-mono">
          {{ hijriDateFormatted }}
        </div>
      </div>

      <div
        dir="rtl"
        class="relative flex h-32 w-32 rounded-full bg-gray-100 dark:bg-gray-900 shadow shadow-red-200 duration-300 hover:blur-lg"
      >
        <div class="absolute inset-0 flex items-center justify-center text-xl"></div>
        <div
          class="absolute right-0 h-full w-1/2 rounded-s-full bg-gray-400 dark:bg-gray-600 shadow-2xl shadow-primary-600 backdrop- duration-300 hover:opacity-50"
        ></div>
        <div
          id="target-circle"
          class="absolute right-0 h-full w-1/2 rounded-e-full bg-gray-600 dark:bg-gray-900 shadow-2xl shadow-red-700 dark:shadow-red-500 backdrop-blur-lg duration-100 hover:opacity-50"
        ></div>
      </div>

      <div class="flex justify-center items-center flex-col">
        <h2 class="mt-16 font-mono text-4xl opacity-30">
          {{ $t('base.appTitle') }}
        </h2>
        <p class="max-w-2xl p-5 text-center font-mono">
          {{ $t('base.introAyah') }}
        </p>
        <p class="font-mono opacity-30">
          {{ $t('base.introAyahNumber') }}
        </p>
      </div>

      <div class="mt-10">
        <div class="shadow-2xl shadow-primary-500 duration-300 hover:scale-105">
          <UButton @click="toggleSectionsModal" icon="i-heroicons-rectangle-stack">
            {{ `${$t('explore')} ${$t('sections')}` }}
          </UButton>
        </div>
      </div>
    </div>
  </div>

  <!-- Sections Modal -->
  <UModal v-model="sectionsModal">
    <UCard>
      <Sections />
    </UCard>
  </UModal>
</template>
<script setup lang="ts">
  type lang = 'en' | 'ar';
  const { locale } = useI18n();
  const sectionsModal = ref(false);

  const toggleSectionsModal = () => {
    sectionsModal.value = !sectionsModal.value;
  };

  const getHijriDate = () => {
    const { fetchHijriDate } = useFetchApis();

    try {
      const hijriDate = fetchHijriDate();

      return hijriDate;
    } catch (error) {
      Debug.error({
        message: 'Error while fetching hijri date',
        data: error,
      });

      throw createError({
        statusCode: 500,
        statusMessage: 'Error while fetching hijri date',
      });
    }
  };

  const hijriDateFormatted = computed(() => {
    if (hijriDate.value) {
      const { day, month, year } = hijriDate.value;
      const lng = locale.value as lang;

      return `${day[lng]}, ${month.number} ${month[lng]} ${year}`;
    }

    return '';
  });

  onMounted(() => {
    // Get the target circle element
    const targetCircle = ref<HTMLElement>(document.getElementById('target-circle')!);

    // Check if the element was found
    if (targetCircle.value) {
      // Track mouse movement
      document.addEventListener('mousemove', (e) => {
        // Get the center coordinates of the target circle
        const circleRect = targetCircle.value.getBoundingClientRect();
        const circleCenterX = circleRect.left + circleRect.width / 2;
        const circleCenterY = circleRect.top + circleRect.height / 2;

        // Calculate the angle between the cursor position and the center of the circle
        const angle = Math.atan2(e.clientY - circleCenterY, e.clientX - circleCenterX);

        // Convert the angle to degrees
        const degrees = angle * (180 / Math.PI);

        // Rotate the target circle based on the cursor direction
        targetCircle.value.style.transform = `rotate(${
          degrees + `${locale.value === 'en' ? 180 : 0}`
        }deg)`;
      });
    }
  });

  // get page data
  const [hijriDate] = await Promise.all([getHijriDate()]);

  // shortcuts
  defineShortcuts({
    s: {
      usingInput: true,
      handler: () => toggleSectionsModal(),
    },
  });
</script>
