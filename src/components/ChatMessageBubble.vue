<script setup lang="ts">
import { type ChatMessage } from '../api_helpers'

defineProps<{
  message: ChatMessage
  is_current_user: boolean
}>()
</script>

<template>
  <li>
    <p class="name" :class="{ right_side: is_current_user }">{{ message.username }}</p>
    <p class="text" :class="{ green: is_current_user }">{{ message.message }}</p>
  </li>
</template>

<style scoped>
li {
  display: list-item;
  clear: both;
  padding: 5px;
  font-family: Helvetica, Arial, sans-serif;
}

.name {
  float: left;
}

.right_side {
  float: right;
}

.text {
  clear: both;
  padding: 10px;
  border-radius: 30px;
  margin-bottom: 2px;
  background: #eee;
  float: left;
  color: #000;
}

.text.green {
  float: right;
  background: #0084ff;
  color: #fff;
}
</style>
