<script setup lang="ts">
import ChatFrame from './components/ChatFrame.vue'
import { ref } from 'vue'
import { postMessageToApi, type ChatMessage } from './api_helpers'

const message = ref('')
const username = ref('Alice')

async function sendMessage() {
  const new_message: ChatMessage = {
    username: username.value,
    message: message.value,
    datetime: new Date(),
  }
  message.value = ''
  // TODO: I think there's some way to disable the button until processing completes
  const response = await postMessageToApi(new_message)
  console.log(response.body)
}
</script>

<template>
  <header>
    <h1>Skychat</h1>
  </header>

  <main>
    <input v-model="username" type="text" name="Your Username" maxLength="20" />

    <div class="scrollable">
      <Suspense>
        <ChatFrame :current-username="username" />
      </Suspense>
    </div>
    <textarea v-model="message"></textarea>
    <button @click.prevent="sendMessage">Send Message</button>
  </main>
</template>

<style scoped>
.scrollable {
  overflow: auto;
  max-height: 300px;
  margin: 20px;
}

textarea {
  width: 1000px;
  height: 100px;
  margin: 20px;
}

button {
  background: purple;
  color: white;
}
</style>
