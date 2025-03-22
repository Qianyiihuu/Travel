package com.example.demo;

import jakarta.persistence.*;
//实体类 entity

@Entity
@Table(name="destinationinfo")
public class Spot {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Integer id;
  private String name;
  private String location;
  private String imgURL;

  public Spot(){
    
  }

  public Spot(String name,String location, String imgURL){
    this.name=name;
    this.location=location;
    this.imgURL=imgURL;
  }

  //GETTERS AND SETTERS
  public Integer getId() {
    return id;
}

public void setId(Integer id) {
    this.id = id;
}

public String getName() {
    return name;
}

public void setName(String name) {
    this.name = name;
}

public String getLocation() {
    return location;
}

public void setLocation(String location) {
    this.location = location;
}

public String getImgURL() {
    return imgURL;
}

public void setImgURL(String imgURL) {
    this.imgURL = imgURL;
}

}


