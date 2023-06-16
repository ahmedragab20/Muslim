<template>
  <!-- Credit goes to: https://www.youtube.com/watch?v=gvO3JTCevKc ❤️ - the inspire of the idea -->

  <div :id="wrapperId" class="cardWrapper">
    <div :id="cardId" class="card">
      <slot />
      <div :id="highlightId" class="highlight"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
  const wrapperId = Generics.uuid();
  const cardId = Generics.uuid();
  const highlightId = Generics.uuid();

  onMounted(() => {
    // DOM Element selections
    const cardWrapper = document.getElementById(wrapperId!) as HTMLElement;
    const card = document.getElementById(cardId!) as HTMLElement;
    const highlight = document.getElementById(highlightId!) as HTMLElement;

    // highest values for angle
    const mostX = 10; // 10 or -10
    const mostY = 10; // 10 or -10

    cardWrapper.addEventListener('mousemove', (e: MouseEvent) => {
      // remove transition
      card.style.transition = 'none';
      highlight.style.transition = 'none';

      const x = e.offsetX;
      const y = e.offsetY;
      const { width, height } = cardWrapper.getBoundingClientRect();
      const halfWidth = width / 2;
      const halfHeight = height / 2;

      // calculate angle
      const rotationY = ((x - halfWidth) / halfWidth) * mostX;
      const rotationX = ((y - halfHeight) / halfHeight) * mostY;

      // set rotation
      card.style.transform = `rotateY(${rotationY}deg) rotateX(${rotationX}deg)`;
      highlight.style.left = `${(rotationY / mostX) * 30 * -1}%`;
      highlight.style.top = `${(rotationX / mostY) * 30 * -1}%`;
    });

    cardWrapper.addEventListener('mouseleave', () => {
      // add transition back
      card.style.transition = 'transform 0.5s ease-in-out';
      card.style.transform = `rotateY(0) rotateX(0)`;
      highlight.style.transition = 'left 0.5s ease-in-out, top 0.5s ease-in-out';

      // add default position back to highlight
      highlight.style.left = `-20%`;
      highlight.style.top = `-13%`;
    });
  });
</script>
<style scoped>
  .cardWrapper {
    perspective: 1000px;
    @apply max-w-full;
  }
  .card {
    @apply w-full h-full rounded-lg border border-gray-50 dark:border-gray-800;
    position: relative;
    overflow: hidden;
  }
  .cardWrapper * {
    pointer-events: none;
  }
  .highlight {
    position: absolute;
    width: 250%;
    height: 250%;
    border-radius: 50%;
    background-color: rgba(245, 245, 245, 0.2);
    filter: brightness(50%) blur(80px);
    left: -20%;
    top: -13%;
  }
</style>
