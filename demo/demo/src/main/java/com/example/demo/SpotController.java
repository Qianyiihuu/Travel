package com.example.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/spots")
public class SpotController {
    @Autowired
    private SpotService spotService;

    // 获取所有景点信息
    @GetMapping
    public List<Spot> getAllSpots() {
        return spotService.getAllSpots();
    }

    // 根据 ID 获取景点信息
    @GetMapping("/{id}")
    public Optional<Spot> getSpotById(@PathVariable Integer id) {
        return spotService.getSpotById(id);
    }

    // 添加新景点
    @PostMapping
    public Spot addSpot(@RequestBody Spot spot) {
        return spotService.addSpot(spot);
    }

    // 删除景点
    @DeleteMapping("/{id}")
    public void deleteSpot(@PathVariable Integer id) {
        spotService.deleteSpot(id);
    }
}
