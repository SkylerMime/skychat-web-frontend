<script setup lang="ts">
import { onMounted, ref, type Ref } from 'vue'
import ChatMessageBubble from './ChatMessageBubble.vue'
import {
  API_URL,
  getAllPastMessagesFromApi,
  CURRENT_USER_NAME,
  type ChatMessage,
} from '../api_helpers'

// TODO: Rework to use Web Sockets instead of Suspense and async Fetch
const messages: Ref<Array<ChatMessage>> = ref([])
const retrievedMessages = await getAllPastMessagesFromApi()
messages.value = retrievedMessages

function orderMessagesByDate() {
  function compareDateStrings(a: ChatMessage, b: ChatMessage) {
    const first_date = new Date(a.datetime)
    const second_date = new Date(b.datetime)
    if (first_date < second_date) {
      return -1
    } else if (first_date == second_date) {
      return 0
    } else {
      return 1
    }
  }
  messages.value.sort(compareDateStrings)
}

const messageRefs = ref<Array<HTMLInputElement>>([])
onMounted(async () => {
  orderMessagesByDate()
  if (messageRefs.value.length > 0) {
    const lastElement = messageRefs.value[messageRefs.value.length - 1]
    lastElement.scrollIntoView()
  }
})

// Set up socket to receive additional messages
const messagesStream = new WebSocket(`${API_URL}/messages-stream`)
messagesStream.onmessage = (newMessageEvent) => {
  const newMessage = JSON.parse(newMessageEvent.data)
  messages.value.push(newMessage)
}
</script>

<template>
  <ul>
    <li v-for="message in messages" ref="messageRefs" :key="message.datetime.toString">
      <ChatMessageBubble
        :message="message"
        :is_current_user="message.username == CURRENT_USER_NAME"
      />
    </li>
  </ul>
</template>

<style scoped>
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

li {
  display: list-item;
  clear: both;
  padding: 5px;
  font-family: Helvetica, Arial, sans-serif;
}
</style>
