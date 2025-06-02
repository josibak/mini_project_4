package com.example.miniprj.controller;

import com.example.miniprj.dto.UserLoginResponseDto; // ✅ 추가
import com.example.miniprj.dto.UserRequestDto;
import com.example.miniprj.dto.UserResponseDto;
import com.example.miniprj.exception.LoginFailedException; // ✅ 추가
import com.example.miniprj.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    // 사용자 생성
    @PostMapping
    public ResponseEntity<UserResponseDto> createUser(@RequestBody UserRequestDto dto) {
        UserResponseDto createdUser = userService.createUser(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdUser);
    }

    // 사용자 전체 조회
    @GetMapping
    public ResponseEntity<List<UserResponseDto>> getAllUsers() {
        return ResponseEntity.ok(userService.getAllUsers());
    }

    // ✅ 사용자 로그인
    @PostMapping("/login")
    public ResponseEntity<UserLoginResponseDto> login(@RequestBody UserRequestDto dto) {
        try {
            UserLoginResponseDto response = userService.login(dto);
            return ResponseEntity.ok(response);
        } catch (LoginFailedException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build(); // 로그인 실패 시 401 반환
        }
    }
}
