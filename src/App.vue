<script setup lang="ts">
import ChatFrame from './components/ChatFrame.vue'
</script>

<template>
  <header><h1>Skychat</h1></header>

  <main>
    <Suspense>
      <ChatFrame />
    </Suspense>
  </main>
</template>
