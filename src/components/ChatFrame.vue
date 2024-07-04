<script setup lang="ts">
import { ref, type Ref } from 'vue'
import ChatMessageBubble from './ChatMessageBubble.vue'

const API_URL = 'http://127.0.0.1:8000'

export interface ChatMessage {
  username: String
  message: String
  id: number
}

// TODO: Implement CORS rather than ignoring

async function postMessageToApi(message: ChatMessage) {
  return fetch(`${API_URL}/messages-handler`, {
    method: 'POST',
    body: JSON.stringify(message),
    mode: 'cors',
  })
}

async function getMessagesFromApi() {
  const response = await fetch(`${API_URL}/messages-handler`, {
    mode: 'cors',
  })
  return response.json()
}

const CURRENT_USER_NAME = 'Alice'

await postMessageToApi({
  username: 'Alice',
  message: 'First example message',
  id: 2,
})
await postMessageToApi({
  username: 'Bob',
  message: 'Second example message',
  id: 3,
})
await postMessageToApi({
  username: 'Alice',
  message: 'Another example message',
  id: 4,
})

// TODO: Rework to use Web Sockets instead of Suspense and async Fetch
const messages: Ref<Array<ChatMessage>> = ref([])
const retrievedMessages = await getMessagesFromApi()
messages.value = retrievedMessages
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
