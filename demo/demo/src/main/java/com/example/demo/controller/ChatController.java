// package com.example.demo.controller;

// import org.springframework.http.HttpEntity;
// import org.springframework.http.HttpHeaders;
// import org.springframework.http.MediaType;
// import org.springframework.http.ResponseEntity;
// import org.springframework.web.bind.annotation.*;
// import org.springframework.web.client.RestTemplate;

// import java.util.*;

// @RestController
// @RequestMapping("/api/chat")
// public class ChatController {

//     private final RestTemplate restTemplate = new RestTemplate();
//     private final String baseUrl = "http://localhost:11434/v1/chat/completions";

//     @PostMapping
//     public Map<String, Object> chat(@RequestBody String message) {
//         // 构造 Ollama API 请求体
//         Map<String, Object> body = new HashMap<>();
//         body.put("model", "deepseek-r1:1.5b");
//         body.put("messages", List.of(Map.of("role", "user", "content", message)));

//         HttpHeaders headers = new HttpHeaders();
//         headers.setContentType(MediaType.APPLICATION_JSON);

//         HttpEntity<Map<String, Object>> request = new HttpEntity<>(body, headers);

//         // 调用 Ollama API
//         ResponseEntity<Map> response = restTemplate.postForEntity(baseUrl, request, Map.class);

//         // 返回原始 JSON 给前端
//         return response.getBody();
//     }
// }

package com.example.demo.controller;

import org.springframework.http.MediaType;
import org.springframework.http.HttpHeaders;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/chat")
public class ChatController {

    private final WebClient client = WebClient.builder()
            .baseUrl("http://localhost:11434")
            .defaultHeader(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
            .build();

   @GetMapping(value = "/stream", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
@CrossOrigin(origins = "http://localhost:5173")
public Flux<String> streamChat(@RequestParam String message) {
    return client.post()
            .uri("/v1/chat/completions")
            .bodyValue(Map.of(
                    "model", "deepseek-r1:1.5b",
                    "messages", List.of(Map.of("role", "user", "content", message)),
                    "stream", true
            ))
            .retrieve()
            .bodyToFlux(String.class)
            .map(data -> "data:" + data.replaceAll("</?think>", "") + "\n\n")
            .takeUntil(chunk -> chunk.contains("[DONE]")) // 收到 [DONE] 后结束
            .doFinally(signal -> System.out.println("SSE 流结束：" + signal)) // 可以确认流结束
            .onErrorResume(e -> Flux.just("data:[ERROR] " + e.getMessage() + "\n\n"));
}

}

