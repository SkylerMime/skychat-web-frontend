<script setup lang="ts">
import { type ChatMessage } from './ChatFrame.vue'

defineProps<{
  message: ChatMessage
}>()
</script>

<template>
  <p>{{ message.username }}</p>
  <p>{{ message.message }}</p>
</template>
