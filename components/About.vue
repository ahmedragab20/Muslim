<template>
  <UCard>
    <template #header>
      <div>
        <h3 class="font-headline text-start">
          {{ $t('links.thisIsTheGuy') }}
        </h3>
      </div>
    </template>
    <div class="flex flex-col items-center justify-center">
      <div class="flex flex-col items-center justify-center">
        <img
          src="https://avatars.githubusercontent.com/u/71534456?v=4"
          alt="avatar"
          class="w-32 h-32 rounded-full"
        />
        <h3 class="mt-2 text-xl font-semibold font-headline">Ahmed Ragab</h3>
        <p class="mt-1 text-sm text-gray-500">Frontend Developer</p>
        <div>
          <!-- linkedin & github -->
          <div class="flex gap-1 mt-2">
            <UButton
              to="https://github.com/ahmedragab20"
              color="black"
              target="_blank"
              size="sm"
              :ui="{
                rounded: 'rounded-full',
              }"
            >
              Github
            </UButton>
            <UButton
              to="https://www.linkedin.com/in/ahmed-ragab-bb75541b3/"
              color="blue"
              size="sm"
              target="_blank"
              :ui="{
                rounded: 'rounded-full',
              }"
            >
              LinkedIn
            </UButton>
          </div>
        </div>
      </div>
    </div>
  </UCard>
</template>
<script setup lang="ts">
  //
</script>
