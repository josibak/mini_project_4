// src/dto/BookRequestDto.java
package com.example.miniprj.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class BookRequestDto {
    // 서비스에서 사용자 입력이 필요한 title, description, coverImageUrl만 DTO
    private String title;
    private String description;
    private String coverImageUrl;

    // 수정: 사용자 ID도 프론트에서 받기 위해 추가
    private Long userId;
}
