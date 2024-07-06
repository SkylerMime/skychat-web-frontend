<script setup lang="ts">
import { onMounted, ref, type Ref } from 'vue'
import ChatMessageBubble from './ChatMessageBubble.vue'
import {
  postMessageToApi,
  getMessagesFromApi,
  CURRENT_USER_NAME,
  type ChatMessage,
} from '../api_helpers'

await postMessageToApi({
  username: 'Alice',
  message: 'First example message',
  datetime: 'Tue Aug 19 1975 23:15:30 GMT+0200 (PDT)',
})
await postMessageToApi({
  username: 'Bob',
  message: 'Second example message',
  datetime: 'Wed Aug 20 1975 23:15:30 GMT+0200 (PDT)',
})
await postMessageToApi({
  username: 'Alice',
  message: 'Another example message',
  datetime: 'Thu Aug 21 1975 23:15:30 GMT+0200 (PDT)',
})

// TODO: Rework to use Web Sockets instead of Suspense and async Fetch
const messages: Ref<Array<ChatMessage>> = ref([])
const retrievedMessages = await getMessagesFromApi()
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
  const lastElement = messageRefs.value[messageRefs.value.length - 1]
  console.log(lastElement)
  lastElement.scrollIntoView()
})
</script>

<template>
  <ul>
    <li v-for="message in messages" ref="messageRefs" :key="message.datetime">
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
