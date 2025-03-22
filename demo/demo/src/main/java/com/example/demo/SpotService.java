package com.example.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class SpotService {
    @Autowired
    private SpotRepository spotRepository;

    // 获取所有景点
    public List<Spot> getAllSpots() {
        return spotRepository.findAll();
    }

    // 根据 ID 获取景点
    public Optional<Spot> getSpotById(Integer id) {
        return spotRepository.findById(id);
    }

    // 添加新景点
    public Spot addSpot(Spot spot) {
        return spotRepository.save(spot);
    }

    // 删除景点
    public void deleteSpot(Integer id) {
        spotRepository.deleteById(id);
    }
}
