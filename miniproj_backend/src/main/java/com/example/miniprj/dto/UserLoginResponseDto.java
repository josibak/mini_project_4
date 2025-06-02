package com.example.miniprj.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class UserLoginResponseDto {
    private String token;              // JWT 또는 임시 토큰
    private UserResponseDto user;      // 사용자 정보 DTO
}
