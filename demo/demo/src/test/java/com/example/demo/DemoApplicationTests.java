package com.example.demo;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.ai.chat.client.ChatClient;

@SpringBootTest
class DemoApplicationTests {

    // 给 ChatClient 创建一个 Mock Bean，避免 Spring 上下文启动失败
    @MockBean
    private ChatClient chatClient;

    @Test
    void contextLoads() {
        // 测试上下文能否成功启动
    }
}

