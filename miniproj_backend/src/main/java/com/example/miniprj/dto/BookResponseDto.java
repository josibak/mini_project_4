package com.example.miniprj.dto;

import com.example.miniprj.entity.Book;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
public class BookResponseDto {
    private Long id;
    private String title;
    private String description;
    private String coverImageUrl;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    // 수정된 부분: userId 필드 추가
    private Long userId;
    private String username;

    public BookResponseDto(Book book) {
        this.id = book.getId();
        this.title = book.getTitle();
        this.description = book.getDescription();
        this.coverImageUrl = book.getCoverImageUrl();
        this.createdAt = book.getCreatedAt();
        this.updatedAt = book.getUpdatedAt();

        // 수정된 부분: 유저 정보가 있다면 userId 설정
        if (book.getUser() != null) {
            this.userId = book.getUser().getUserId();
            this.username = book.getUser().getUsername();
        }
    }
}
