<script setup lang="ts">
import { ref, type Ref } from 'vue'
import ChatMessageBubble from './ChatMessageBubble.vue'

export interface ChatMessage {
  username: String
  message: String
  id: number
}

const CURRENT_USER_NAME = 'Alice'

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
const third_message: ChatMessage = {
  username: 'Alice',
  message: 'Another example message',
  id: 4,
}

const messages: Ref<Array<ChatMessage>> = ref([first_message])

messages.value.push(second_message, third_message)
</script>

<template>
  <ul>
    <ChatMessageBubble
      v-for="message in messages"
      :key="message.id"
      :message="message"
      :is_current_user="message.username == CURRENT_USER_NAME"
    />
  </ul>
</template>

<style scoped>
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}
</style>
