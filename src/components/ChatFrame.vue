<script setup lang="ts">
import { ref, type Ref } from 'vue'
import ChatMessageBubble from './ChatMessageBubble.vue'

export interface ChatMessage {
  username: String
  message: String
  id: number
}

const first_message: ChatMessage = {
  username: 'Alice',
  message: 'First example message',
  id: 2,
}
const second_message: ChatMessage = {
  username: 'Bob',
  message: 'Second example message',
  id: 3,
}

const messages: Ref<Array<ChatMessage>> = ref([first_message])

messages.value.push(second_message)
</script>

<template>
  <div>
    <ChatMessageBubble v-for="message in messages" :key="message.id" :message="message" />
  </div>
</template>
