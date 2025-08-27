<template>
  <div class="chat">
    <h2>AI Chat 助手</h2>
    <textarea
      v-model="userMessage"
      placeholder="请输入问题..."
      rows="4"
    ></textarea>
    <button @click="sendMessage">发送</button>

    <div v-if="aiReply" class="reply">
      <h3>AI 回复：</h3>
      <p>{{ aiReply }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import axios from "axios";

const userMessage = ref("");
const aiReply = ref("");

// 简单 Markdown 转文本函数
const markdownToText = (md: string) => {
  return md
    .replace(/###\s*/g, "") // 去掉三级标题
    .replace(/##\s*/g, "") // 去掉二级标题
    .replace(/#\s*/g, "") // 去掉一级标题
    .replace(/[-*]\s*/g, "") // 去掉列表符号
    .replace(/`{1,3}.*?`{1,3}/g, "") // 去掉行内或块代码
    .replace(/\n+/g, "\n") // 合并多余换行
    .trim();
};

const sendMessage = async () => {
  if (!userMessage.value) return console.log("没有问题");
  try {
    const response = await axios.post("http://localhost:8080/api/chat", {
      message: userMessage.value,
    });

    const markdown = response.data.choices[0].message.content;
    console.log(markdown);
    aiReply.value = markdownToText(markdown); // 转换成普通文本
  } catch (error) {
    console.error("请求失败", error);
  }
};
</script>

<style scoped>
.chat {
  max-width: 600px;
  margin: auto;
  padding: 20px;
}
textarea {
  width: 100%;
  margin-bottom: 10px;
}
button {
  padding: 8px 16px;
  background-color: #42b983;
  border: none;
  color: white;
  cursor: pointer;
}
.reply {
  margin-top: 20px;
  background: #f4f4f4;
  padding: 10px;
  white-space: pre-wrap; /* 保持换行格式 */
}

.reply p {
  text-align: left;
  font-size: small;
}
</style>
