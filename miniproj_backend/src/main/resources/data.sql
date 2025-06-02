-- 유저 데이터 삽입 (user_id는 수동 입력 가능)
INSERT INTO users (user_id, username, email, password) VALUES
(1, 'testuser', 'test@example.com', 'password123'),
(2, 'anotheruser', 'another@example.com', 'password456');

-- 도서 데이터 삽입 (id는 자동 증가 → 생략)
INSERT INTO book (title, description, cover_image_url, created_at, updated_at, user_id) VALUES
('Spring Boot in Action', 'Spring Boot 설명서', 'https://example.com/spring.jpg', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 1),
('JPA with Hibernate', 'JPA를 활용한 ORM 설명서', 'https://example.com/jpa.jpg', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 1),
('React for Beginners', '프론트엔드 입문서', 'https://example.com/react.jpg', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 2);
