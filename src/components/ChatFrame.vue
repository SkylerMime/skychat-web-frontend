<script setup lang="ts">
import { onMounted, watch, ref, type Ref } from 'vue'
import ChatMessageBubble from './ChatMessageBubble.vue'
import { API_URL, getAllPastMessagesFromApi, type ChatMessage } from '../api_helpers'

defineProps({ currentUsername: String })

const emit = defineEmits<{
  scrollSuggestion: [newMessage: HTMLInputElement, forceScroll?: boolean]
}>()

const messages: Ref<Array<ChatMessage>> = ref([])
const retrievedMessages = await getAllPastMessagesFromApi()
messages.value = retrievedMessages
const messageRefs = ref<Array<HTMLInputElement>>([])

// Set up socket to receive additional messages from server
const messagesStream = new WebSocket(`${API_URL}/messages-stream`)
messagesStream.onmessage = (newMessageEvent) => {
  const newMessage = JSON.parse(newMessageEvent.data)
  messages.value.push(newMessage)
}

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

function getLastElement() {
  if (messageRefs.value.length > 0) {
    return messageRefs.value[messageRefs.value.length - 1]
  }
}

onMounted(() => {
  orderMessagesByDate()
  const lastElement = getLastElement()
  if (lastElement) {
    emit('scrollSuggestion', lastElement, true)
  } else {
    console.log('ERROR: Could not getLastElement in ChatFrame.vue')
  }
})

watch(messageRefs.value, () => {
  console.log('Observed messageRefs update')
  const lastElement = getLastElement()
  if (lastElement) {
    emit('scrollSuggestion', lastElement)
  }
})
</script>

<template>
  <ul>
    <li v-for="message in messages" ref="messageRefs" :key="message.datetime.toString">
      <ChatMessageBubble
        :message="message"
        :is_current_user="message.username == currentUsername"
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
