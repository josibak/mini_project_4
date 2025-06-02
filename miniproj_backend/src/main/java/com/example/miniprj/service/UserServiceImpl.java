package com.example.miniprj.service;

import com.example.miniprj.dto.UserLoginResponseDto;
import com.example.miniprj.dto.UserRequestDto;
import com.example.miniprj.dto.UserResponseDto;
import com.example.miniprj.entity.Users;
import com.example.miniprj.exception.LoginFailedException;
import com.example.miniprj.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserResponseDto createUser(UserRequestDto dto) {
        Users user = Users.builder()
                .username(dto.getUsername())
                .email(dto.getEmail())
                .password(dto.getPassword())
                .build();
        return new UserResponseDto(userRepository.save(user));
    }

    @Override
    public List<UserResponseDto> getAllUsers() {
        return userRepository.findAll().stream()
                .map(UserResponseDto::new)
                .collect(Collectors.toList());
    }

    @Override
    public UserResponseDto getUser(Long userId) {
        return userRepository.findById(userId)
                .map(UserResponseDto::new)
                .orElseThrow(() -> new RuntimeException("사용자를 찾을 수 없습니다. ID=" + userId));
    }

    @Override
    public void deleteUser(Long userId) {
        userRepository.deleteById(userId);
    }

    // ✅ 로그인 기능
    @Override
    public UserLoginResponseDto login(UserRequestDto dto) {
        System.out.println("[로그인 시도] 이메일: " + dto.getEmail());

        Users user = userRepository.findByEmail(dto.getEmail())
                .orElseThrow(() -> {
                    System.out.println("[로그인 실패] 이메일 없음");
                    return new LoginFailedException("이메일을 찾을 수 없습니다.");
                });

        if (!user.getPassword().equals(dto.getPassword())) {
            System.out.println("[로그인 실패] 비밀번호 불일치");
            throw new LoginFailedException("비밀번호가 일치하지 않습니다.");
        }

        System.out.println("[로그인 성공] 유저 ID: " + user.getUserId());

        String token = "mocked-jwt-token"; // JWT 적용 전 임시 토큰

        return new UserLoginResponseDto(token, new UserResponseDto(user));
    }
}
