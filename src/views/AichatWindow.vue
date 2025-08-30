<template>
  <div class="chat-window-popup">
    <div class="chat-header">
      <span>AI Chat 助手</span>
      <button class="close-btn" @click="$emit('close')">×</button>
    </div>
    <div class="chat-body">
      <div v-for="(msg, idx) in messages" :key="idx" class="chat-msg-row">
        <!-- 用户消息 -->
        <div v-if="msg.question" class="chat-msg user">
          <div class="avatar user-avatar"></div>
          <div class="bubble user-bubble">{{ msg.question }}</div>
        </div>
        <!-- AI消息 -->
        <div v-if="msg.answer" class="chat-msg ai">
          <div class="avatar ai-avatar"></div>
          <div class="bubble ai-bubble">
            <span v-html="renderMarkdown(msg.answer)"></span>
          </div>
        </div>
      </div>
    </div>
    <div class="chat-input">
      <textarea
        v-model="userMessage"
        placeholder="请输入问题..."
        rows="2"
      ></textarea>
      <button @click="sendMessage" :disabled="loading || !userMessage">
        {{ loading ? "等待中..." : "发送" }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { marked } from "marked";
const userMessage = ref("");
const loading = ref(false);
const messages = ref<{ question: string; answer: string }[]>([]);

const saveMessages = () => {
  sessionStorage.setItem("chatMessages", JSON.stringify(messages.value));
};
const renderMarkdown = (text: string) => {
  return marked.parse(text);
};
onMounted(() => {
  const saved = sessionStorage.getItem("chatMessages");
  if (saved) {
    messages.value = JSON.parse(saved);
  }
});

const sendMessage = () => {
  if (!userMessage.value) return;

  const question = userMessage.value;
  messages.value.push({ question, answer: "" });
  saveMessages();

  userMessage.value = "";
  loading.value = true;

  const url = `http://localhost:8080/api/chat/stream?message=${encodeURIComponent(
    question
  )}`;

  let aiReply = "";

  const eventSource = new EventSource(url);

  eventSource.onmessage = (event) => {
    let data = event.data;

    if (!data || data === "[DONE]") {
      eventSource.close();
      loading.value = false;
      messages.value[messages.value.length - 1].answer = aiReply;
      saveMessages();
      return;
    }

    if (data.startsWith("data:")) data = data.slice(5).trim();
    if (!data) return;

    try {
      const json = JSON.parse(data);
      const content = json.choices?.[0]?.delta?.content;
      if (content) {
        aiReply += content.replace(/<\/?think>/g, "");
        messages.value[messages.value.length - 1].answer = aiReply;
        saveMessages();
      }
    } catch {
      // 忽略非 JSON 数据，不要报错
    }
  };
  eventSource.onerror = () => {
    eventSource.close();
    loading.value = false;
  };
};
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
