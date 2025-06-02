package com.example.miniprj.service;

import com.example.miniprj.dto.BookRequestDto;
import com.example.miniprj.dto.BookResponseDto;
import com.example.miniprj.entity.Book;
import com.example.miniprj.entity.Users;
import com.example.miniprj.repository.BookRepository;
import com.example.miniprj.repository.UserRepository;
import com.example.miniprj.exception.BookCreateException;
import com.example.miniprj.exception.BookNotFoundException;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class BookServiceImpl implements BookService {

    private final BookRepository bookRepository;
    private final UserRepository userRepository;

    public BookServiceImpl(BookRepository bookRepository, UserRepository userRepository) {
        this.bookRepository = bookRepository;
        this.userRepository = userRepository;
    }

    // 도서 등록
    @Override
    public BookResponseDto createBook(BookRequestDto dto) {
        System.out.println("📌 도서 등록 요청 - title: " + dto.getTitle() +
                ", description: " + dto.getDescription() +
                ", userId: " + dto.getUserId());

        if (dto.getTitle() == null || dto.getTitle().isEmpty()) {
            System.err.println("❌ 도서 제목 누락");
            throw new BookCreateException("값이 누락되었거나 유효하지 않습니다.");
        }

        if (dto.getUserId() == null) {
            System.err.println("❌ 사용자 ID 누락");
            throw new BookCreateException("사용자 ID가 전달되지 않았습니다.");
        }

        try {
            // 사용자 조회
            Users user = userRepository.findById(dto.getUserId())
                    .orElseThrow(() -> new IllegalArgumentException("사용자를 찾을 수 없습니다. ID = " + dto.getUserId()));
            System.out.println("✅ 사용자 조회 성공: " + user.getUsername());

            Book book = Book.builder()
                    .title(dto.getTitle())
                    .description(dto.getDescription())
                    .coverImageUrl(dto.getCoverImageUrl())
                    .user(user)
                    .createdAt(LocalDateTime.now())
                    .updatedAt(LocalDateTime.now())
                    .build();

            Book saved = bookRepository.save(book);
            System.out.println("✅ 도서 저장 성공. ID: " + saved.getId());

            return new BookResponseDto(saved);

        } catch (Exception e) {
            System.err.println("❗ 예외 발생: " + e.getClass().getSimpleName() + " - " + e.getMessage());
            e.printStackTrace();
            throw new BookCreateException("도서 등록 중 서버 오류 발생: " + e.getMessage());
        }
    }

    @Override
    public List<BookResponseDto> getAllBooks() {
        return bookRepository.findAll()
                .stream()
                .map(BookResponseDto::new)
                .collect(Collectors.toList());
    }

    @Override
    public BookResponseDto getBook(Long id) {
        return bookRepository.findById(id)
                .map(BookResponseDto::new)
                .orElseThrow(() -> new BookNotFoundException("해당 책을 찾을 수 없습니다."));
    }

    @Override
    public BookResponseDto updateBook(Long id, BookRequestDto dto) {
        return bookRepository.findById(id).map(book -> {
            if (dto.getTitle() != null) book.setTitle(dto.getTitle());
            if (dto.getDescription() != null) book.setDescription(dto.getDescription());
            if (dto.getCoverImageUrl() != null) book.setCoverImageUrl(dto.getCoverImageUrl());
            book.setUpdatedAt(LocalDateTime.now());
            return new BookResponseDto(bookRepository.save(book));
        }).orElseThrow(() -> new BookNotFoundException("해당 책을 찾을 수 없습니다."));
    }

    @Override
    public void deleteBook(Long id) {
        if (!bookRepository.existsById(id)) {
            throw new BookNotFoundException("해당 책을 찾을 수 없습니다.");
        }
        bookRepository.deleteById(id);
    }
}
