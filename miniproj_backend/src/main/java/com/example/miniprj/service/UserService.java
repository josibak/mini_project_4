package com.example.miniprj.service;

import com.example.miniprj.dto.UserRequestDto;
import com.example.miniprj.dto.UserResponseDto;
import com.example.miniprj.dto.UserLoginResponseDto; // ✅ 추가

import java.util.List;

public interface UserService {
    UserResponseDto createUser(UserRequestDto dto);
    List<UserResponseDto> getAllUsers();
    UserResponseDto getUser(Long userId);
    void deleteUser(Long userId);

    // ✅ 로그인 기능 추가
    UserLoginResponseDto login(UserRequestDto dto);
}
