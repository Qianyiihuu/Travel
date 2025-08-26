package com.example.demo.controller;

import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.util.*;

@RestController
@RequestMapping("/api/chat")
public class ChatController {

    private final RestTemplate restTemplate = new RestTemplate();
    private final String baseUrl = "http://localhost:11434/v1/chat/completions";

    @PostMapping
    public Map<String, Object> chat(@RequestBody String message) {
        // 构造 Ollama API 请求体
        Map<String, Object> body = new HashMap<>();
        body.put("model", "deepseek-r1:1.5b");
        body.put("messages", List.of(Map.of("role", "user", "content", message)));

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        HttpEntity<Map<String, Object>> request = new HttpEntity<>(body, headers);

        // 调用 Ollama API
        ResponseEntity<Map> response = restTemplate.postForEntity(baseUrl, request, Map.class);

        // 返回原始 JSON 给前端
        return response.getBody();
    }
}
