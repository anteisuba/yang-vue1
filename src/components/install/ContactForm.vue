<template>
  <div class="contact-container">
    <div class="contact-title">GET IN TOUCH</div>
    <div class="contact-info">
      <b>Mark Johnson</b> | 500 Terry Francine St, San Francisco, CA 94158 | info@mysite.com
    </div>
    <form class="contact-form" @submit.prevent="onSubmit">
      <input v-model="name" type="text" placeholder="Name" required />
      <input v-model="email" type="email" placeholder="Email" required />
      <textarea v-model="message" placeholder="Type your message here..." required></textarea>
      <button type="submit">Submit</button>
    </form>
    <div v-if="successMsg" class="success-msg">{{ successMsg }}</div>
    <div v-if="errorMsg" class="error-msg">{{ errorMsg }}</div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const name = ref('')
const email = ref('')
const message = ref('')
const successMsg = ref('')
const errorMsg = ref('')

const onSubmit = async () => {
  successMsg.value = ''
  errorMsg.value = ''
  // 这里可以集成 emailjs 或后端API
  try {
    // await sendEmail(name.value, email.value, message.value)
    successMsg.value = 'Your message has been sent!'
    name.value = ''
    email.value = ''
    message.value = ''
  } catch (e) {
    errorMsg.value = 'Failed to send. Please try again later.'
  }
}
</script>

<style scoped>
.contact-container {
  max-width: 100%;
  max-height: 100%;
  margin: 40px auto 0 auto;
  background: #fff;
  
  display: flex;
  flex-direction: column;
  align-items: center;
}
.contact-title {
  font-size: 2rem;
  letter-spacing: 0.2em;
  margin-bottom: 16px;
  color: #444;
  text-align: center;
}
.contact-info {
  font-size: 1rem;
  color: #222;
  margin-bottom: 24px;
  text-align: center;
}
.contact-form {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.contact-form input,
.contact-form textarea {
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #bbb;
  border-radius: 4px;
  font-size: 1rem;
  background: #fafafa;
  resize: none;
}
.contact-form textarea {
  min-height: 80px;
  max-height: 200px;
}
.contact-form button {
  width: 120px;
  align-self: flex-end;
  padding: 8px 0;
  background: #222;
  color: #fff;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.2s;
}
.contact-form button:hover {
  background: #444;
}
.success-msg {
  color: #2b5aed;
  margin-top: 12px;
}
.error-msg {
  color: #e74c3c;
  margin-top: 12px;
}
</style> 