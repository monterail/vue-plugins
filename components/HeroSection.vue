<template>
  <div class="relative text-center overflow-hidden min-h-[400px] flex flex-col justify-center">
    <!-- Background Animation -->
    <div class="absolute inset-0 z-0">
      <!-- Floating particles -->
      <div class="absolute inset-0">
        <div 
          v-for="(particle, i) in particles" 
          :key="i"
          class="absolute animate-float particle-diamond"
          :class="[
            `animate-float-${particle.pattern}`,
            particle.size === 3 ? 'w-3 h-3' : 
            particle.size === 4 ? 'w-4 h-4' : 
            particle.size === 5 ? 'w-5 h-5' : 'w-6 h-6'
          ]"
          :style="{
            left: particle.left + '%',
            top: particle.top + '%',
            animationDelay: particle.delay + 's',
            animationDuration: particle.duration + 's',
            '--rotation-offset': particle.rotationOffset + 'deg'
          }"
        />
      </div>
    </div>
    
    <h1 class="relative text-5xl font-bold text-[#2c3e50] dark:text-slate-100 mb-6 z-20">
      Vue.js Plugins Collection
    </h1>
    <p class="relative text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed z-20">
      Discover and explore the best Vue.js plugins to supercharge your applications. 
      Curated by the community, maintained by developers.
    </p>
    <div class="relative mt-8 z-20">
      <a 
        href="https://github.com/monterail/vue-plugin-template" 
        target="_blank" 
        rel="noopener noreferrer"
        class="inline-flex items-center gap-2 px-6 py-3 bg-[#42b883] hover:bg-[#35a372] text-white font-semibold rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
      >
        <Icon name="mdi:package-variant" class="w-5 h-5" />
        <span>Create Your Own Plugin</span>
        <Icon name="mdi:arrow-right" class="w-5 h-5" />
      </a>
      <p class="text-sm text-slate-500 dark:text-slate-400 mt-3">
        Use our Vue Plugin Template to kickstart your plugin development
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
// Generate particles for animation (to avoid hydration mismatch)
// Using multiple prime numbers and offsets to create truly scattered distribution
const particles = ref(
  Array.from({ length: 60 }, (_, i) => {
    // Multiple mathematical sequences to break any linear patterns
    const leftBase = (i * 37) % 100;
    const leftOffset = (i * 73) % 20;
    const topBase = (i * 41) % 100;
    const topOffset = (i * 67) % 25;
    
    return {
      left: Math.max(1, Math.min(99, leftBase + (leftOffset - 10))), // Random scatter with bounds
      top: Math.max(1, Math.min(99, topBase + (topOffset - 12))), // Random scatter with bounds
      delay: (i * 0.13) % 18, // Extended delay range
      duration: 4 + (i % 12), // Longer duration variety
      size: 3 + (i % 4), // Size range: 3-6
      pattern: i % 4, // 4 different patterns
      rotationOffset: (i * 31) % 360 // Random initial rotation
    }
  })
)
</script>

<style scoped>
/* Animation keyframes - Multiple patterns for varied movement */
@keyframes float {
  0%, 100% { 
    transform: rotate(45deg) translateY(0px) translateX(0px);
    opacity: 0.3;
  }
  25% {
    transform: rotate(135deg) translateY(-30px) translateX(10px);
    opacity: 0.6;
  }
  50% { 
    transform: rotate(225deg) translateY(-50px) translateX(-10px);
    opacity: 0.4;
  }
  75% {
    transform: rotate(315deg) translateY(-20px) translateX(-15px);
    opacity: 0.5;
  }
}

@keyframes float-0 {
  0%, 100% { 
    transform: rotate(0deg) translateY(0px) translateX(0px);
    opacity: 0.25;
  }
  33% {
    transform: rotate(120deg) translateY(-40px) translateX(20px);
    opacity: 0.5;
  }
  66% { 
    transform: rotate(240deg) translateY(-25px) translateX(-25px);
    opacity: 0.35;
  }
}

@keyframes float-1 {
  0%, 100% { 
    transform: rotate(90deg) translateY(0px) translateX(0px);
    opacity: 0.3;
  }
  25% {
    transform: rotate(180deg) translateY(-35px) translateX(-15px);
    opacity: 0.6;
  }
  50% { 
    transform: rotate(270deg) translateY(-60px) translateX(5px);
    opacity: 0.4;
  }
  75% {
    transform: rotate(360deg) translateY(-15px) translateX(20px);
    opacity: 0.55;
  }
}

@keyframes float-2 {
  0%, 100% { 
    transform: rotate(calc(30deg + var(--rotation-offset, 0deg))) translateY(0px) translateX(0px);
    opacity: 0.35;
  }
  20% {
    transform: rotate(calc(90deg + var(--rotation-offset, 0deg))) translateY(-20px) translateX(30px);
    opacity: 0.5;
  }
  40% { 
    transform: rotate(calc(150deg + var(--rotation-offset, 0deg))) translateY(-45px) translateX(-10px);
    opacity: 0.25;
  }
  60% {
    transform: rotate(calc(210deg + var(--rotation-offset, 0deg))) translateY(-30px) translateX(-20px);
    opacity: 0.45;
  }
  80% {
    transform: rotate(calc(270deg + var(--rotation-offset, 0deg))) translateY(-10px) translateX(15px);
    opacity: 0.6;
  }
}

@keyframes float-3 {
  0%, 100% { 
    transform: rotate(calc(60deg + var(--rotation-offset, 0deg))) translateY(0px) translateX(0px) scale(1);
    opacity: 0.3;
  }
  25% {
    transform: rotate(calc(150deg + var(--rotation-offset, 0deg))) translateY(-35px) translateX(25px) scale(1.1);
    opacity: 0.55;
  }
  50% { 
    transform: rotate(calc(240deg + var(--rotation-offset, 0deg))) translateY(-55px) translateX(-15px) scale(0.9);
    opacity: 0.4;
  }
  75% {
    transform: rotate(calc(330deg + var(--rotation-offset, 0deg))) translateY(-25px) translateX(-30px) scale(1.05);
    opacity: 0.5;
  }
}

@keyframes pulse-slow {
  0%, 100% { 
    transform: scale(1);
    opacity: 0.8;
  }
  50% { 
    transform: scale(1.15);
    opacity: 1;
  }
}

@keyframes pulse-slower {
  0%, 100% { 
    transform: scale(1) rotate(0deg);
    opacity: 0.6;
  }
  33% {
    transform: scale(1.08) rotate(120deg);
    opacity: 0.9;
  }
  66% {
    transform: scale(0.95) rotate(240deg);
    opacity: 0.7;
  }
}

/* Floating particle animation classes */
.animate-float {
  animation-name: float;
  animation-timing-function: ease-in-out;
  animation-iteration-count: infinite;
}

.animate-float-0 {
  animation-name: float-0;
  animation-timing-function: ease-in-out;
  animation-iteration-count: infinite;
}

.animate-float-1 {
  animation-name: float-1;
  animation-timing-function: ease-in-out;
  animation-iteration-count: infinite;
}

.animate-float-2 {
  animation-name: float-2;
  animation-timing-function: ease-in-out;
  animation-iteration-count: infinite;
}

.animate-float-3 {
  animation-name: float-3;
  animation-timing-function: ease-in-out;
  animation-iteration-count: infinite;
}

/* Futuristic diamond particle shape */
.particle-diamond {
  transform: rotate(45deg);
  border-radius: 3px;
  position: relative;
  background: linear-gradient(135deg, #4fc08d, #42b883);
  opacity: 0.4;
  box-shadow: 
    0 0 6px rgba(79, 192, 141, 0.2),
    0 0 12px rgba(79, 192, 141, 0.1);
  flex-shrink: 0;
  overflow: hidden;
  max-width: 24px;
  max-height: 24px;
}

.particle-diamond::before {
  content: '';
  position: absolute;
  top: -1px;
  left: -1px;
  right: -1px;
  bottom: -1px;
  background: linear-gradient(135deg, #4fc08d, #42b883, #4fc08d);
  border-radius: 4px;
  z-index: -1;
  opacity: 0.3;
  filter: blur(1px);
}

.animate-pulse-slow {
  animation-name: pulse-slow;
  animation-duration: 4s;
  animation-timing-function: ease-in-out;
  animation-iteration-count: infinite;
}

.animate-pulse-slower {
  animation-name: pulse-slower;
  animation-duration: 8s;
  animation-timing-function: ease-in-out;
  animation-iteration-count: infinite;
}
</style>
