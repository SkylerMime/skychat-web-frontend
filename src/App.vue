<script setup lang="ts">
import ChatFrame from './components/ChatFrame.vue'
import { ref } from 'vue'
import { postMessageToApi, type ChatMessage } from './api_helpers'

const message = ref('')
const username = ref('Alice')
const scrollableChat = ref<HTMLDivElement>()
const sendMessageDisabled = ref(false)

// scrollBottom on my test screen is "75", so this is a good threshold
const AUTO_SCROLL_THRESHOLD = 150

async function sendMessage() {
  if (message.value && username.value) {
    const new_message: ChatMessage = {
      username: username.value,
      message: message.value,
      datetime: new Date(),
    }
    sendMessageDisabled.value = true
    message.value = ''
    const response = await postMessageToApi(new_message)
    sendMessageDisabled.value = false
    console.log(response.body)
  }
}

function scrollIfCloseToBottom(element: HTMLInputElement) {
  function getScrollBottom(scrollHeight: number, clientHeight: number, scrollTop: number) {
    return scrollHeight - (clientHeight + scrollTop)
  }
  if (
    scrollableChat.value &&
    getScrollBottom(
      scrollableChat.value.scrollHeight,
      scrollableChat.value.clientHeight,
      scrollableChat.value.scrollTop
    ) <= AUTO_SCROLL_THRESHOLD
  ) {
    element.scrollIntoView()
  }
}

function checkScroll(element: HTMLInputElement, forceScroll?: boolean) {
  if (forceScroll) {
    element.scrollIntoView()
  } else {
    scrollIfCloseToBottom(element)
  }
}
</script>

<template>
  <div class="autosize">
    <header>
      <h1 class="green">Skychat</h1>
    </header>

    <input v-model="username" type="text" name="Your Username" maxLength="20" />

    <div class="scrollable" ref="scrollableChat">
      <Suspense>
        <ChatFrame :current-username="username" @scrollSuggestion="checkScroll" />
      </Suspense>
    </div>
    <div class="sendMessageSection">
      <textarea v-model="message" minlength="1" maxlength="300"></textarea>
      <button @click.prevent="sendMessage" :disabled="sendMessageDisabled">Send Message</button>
    </div>
  </div>
</template>

<style scoped>
.autosize {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100vh;
}

.scrollable {
  overflow-y: auto;
  margin: 20px;
}

input {
  width: 20%;
  padding-inline: 1rem;
  text-align: right;
}

.sendMessageSection {
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin-bottom: 1rem;
}

textarea {
  width: 90%;
  resize: none;
  min-height: 3rem;
  max-height: 8rem;
}

button {
  border-radius: 7px;
  background: darkgreen;
  color: #fff;
  color: white;
  border: none;
  height: 75%;
}

.green {
  border-radius: 10px;
  background: darkgreen;
  color: white;
  text-align: center;
  margin-bottom: 1em;
}
</style>
