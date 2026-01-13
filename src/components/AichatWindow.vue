<template>
  <div class="chat-window-popup">
    <div class="chat-header">
      <span>AI Chat 助手</span>
      <button class="close-btn" @click="$emit('close')">×</button>
    </div>
    <div class="chat-body"></div>
    <div class="chat-input"></div>
  </div>
</template>

<script setup lang="ts">
import { marked } from "marked";
import { ref, onMounted } from "vue";
const messages = ref<{ question: string; answer: string }[]>([]);

const saveMessages = () => {
  sessionStorage.setItem("chatMessages", JSON.stringify(messages.value));
};

const renderMarkdown = (text: string) => {
  return marked.parse(text);
};

onMounted(() => {
  const save = sessionStorage.getItem("chatMessages");
  if (save) {
    messages.value = JSON.parse(save);
  }
});
</script>

<style scoped>
.chat-window-popup {
  position: fixed;
  right: 30px;
  bottom: 80px;
  z-index: 9999;
  background: #f9f9f9;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.2);
  border-radius: 12px;
  width: 370px;
  max-height: 80vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  font-family: "Segoe UI", "PingFang SC", "Arial", sans-serif;
}

.chat-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 18px;
  background: #42b983;
  color: #fff;
  font-size: 18px;
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
}

.close-btn {
  background: transparent;
  border: none;
  color: #fff;
  font-size: 22px;
  cursor: pointer;
  padding: 0 4px;
}

.chat-body {
  flex: 1;
  padding: 16px 12px;
  overflow-y: auto;
  background: #f5f5f5;
}

.chat-msg-row {
  margin-bottom: 10px;
}

.chat-msg {
  display: flex;
  align-items: flex-end;
  margin-bottom: 2px;
  text-align: left;
}

.user {
  flex-direction: row-reverse;
}

.ai {
  flex-direction: row;
}

.avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-size: cover;
  margin: 0 8px;
}

.user-avatar {
  background: url("https://static.thenounproject.com/png/4038189-200.png")
    center/cover no-repeat;
  background-color: #e0e0e0;
}

.ai-avatar {
  background: url("https://cdn-icons-png.flaticon.com/512/4712/4712027.png")
    center/cover no-repeat;
  background-color: #d0f5e8;
}

.bubble {
  max-width: 70%;
  padding: 8px 14px;
  border-radius: 18px;
  font-size: 15px;
  line-height: 1.5;
  word-break: break-word;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.04);
}

.user-bubble {
  background: #9eea6a;
  color: #333;
  border-bottom-right-radius: 4px;
  font-size: 13px; /* 字体缩小 */
  text-align: left; /* 靠左对齐 */
}

.ai-bubble {
  background: #fff;
  color: #222;
  border-bottom-left-radius: 4px;
  border: 1px solid #e0e0e0;
  font-size: 13px; /* 字体缩小 */
  text-align: left; /* 靠左对齐 */
}

.chat-input {
  display: flex;
  align-items: center;
  padding: 10px 12px;
  background: #fafafa;
  border-bottom-left-radius: 12px;
  border-bottom-right-radius: 12px;
  border-top: 1px solid #eee;
}

.chat-input textarea {
  flex: 1;
  resize: none;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 6px 10px;
  font-size: 15px;
  margin-right: 8px;
  background: #fff;
}

.chat-input button {
  padding: 7px 18px;
  background-color: #42b983;
  border: none;
  color: white;
  border-radius: 8px;
  font-size: 15px;
  cursor: pointer;
  transition: background 0.2s;
}

.chat-input button:disabled {
  background-color: #a5d6a7;
  cursor: not-allowed;
}
</style>
