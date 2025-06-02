# 📖 프론트엔드 & 이미지 생성 기능 요약 (React + OpenAI)

## 📂 프로젝트 구조 요약

```
📆 src
 ├ 📁 components       // 재사용 가능한 UI contribute
 ├ 📁 pages            // 라우트와 매핑되는 주요 페이지
 ├ 📁 routes           // React Router 설정
 ├ 📁 services         // API 통신 및 외부 서비스
 └ 🗾 App.jsx          // 루트 contribute

```

---

## 🌐 Router 구조 요약 (`Router.jsx`)

React Router를 사용한 SPA(Single Page Application) 라우트입니다.

### 📌 주요 라우트

| 건데 | 설명 |
| --- | --- |
| `/` → `/login` | 접근 시 로그인 페이지로 redirection |
| `/home` | 메인 홈 페이지 |
| `/books` | 전체 도서 목록 |
| `/books/:id` | 특정 도서 상세 |
| `/create` | 도서 생성 |
| `/edit/:id` | 도서 편집 |
| `/my` | 사용자가 등록한 도서 |
| `/ai-cover` | AI 커버 이미지 생성 페이지 |

📌 `Navigate`를 사용하여 `/`로 접근 시 `/login`으로 redirection 처리

---

## 🎨 AI 이미지 생성 기능 (`services/imageGenerator.js`)

OpenAI의 DALL·E 모델을 사용해 **텍스트 프롬프트로 커버 이미지를 생성**합니다.

### 🔧 주요 함수

```
export async function generateImageFromPrompt(apiKey, prompt, model, quality, style, size)

```

| 파라미터 | 설명 |
| --- | --- |
| `apiKey` | OpenAI API 키 |
| `prompt` | 이미지 생성 프론프트 |
| `model` | 사용 모델 (`dall-e-3`, `dall-e-2`) |
| `quality` | `standard` or `hd` (dall-e-3 전용) |
| `style` | `vivid` or `natural` (dall-e-3 전용) |
| `size` | 이미지 크기 (기본: 1024x1024) |

### ✅ 주요 특징

- `dall-e-3`과 `dall-e-2`의 API 스텝 차이를 반영하여 옵션 동적 설정
- 응답 데이터가 없거나 오류 시 예외 처리
- 유효하지 않은 사이즈 요청 시 기본값으로 자동 변경

### 💡 사용 예시

```
const url = await generateImageFromPrompt(
  OPENAI_API_KEY,
  'A fantasy-style magical book cover with dragons and castles'
);

```

---

## 🔄 전체 데이터 Process 예시

```
📆 사용자
   └── [로그인]
       └── /home → /create
            └── [프론프트 입력 + generateImageFromPrompt 호출]
                └── OpenAI API 호출
                    └── 이미지 URL 반환
                        └── 커버 이미지 미리보기 및 저장

```

---

## 🧪 예외 처리 및 보완사항

- 이미지 응답 오류 시 `throw new Error(...)`로 예외 발생 → 프롬프트에서 Toast Notification 등 처리 필요
- API Key는 `.env` 등을 통해 보안 관리 권장

---

## ✅ 향후 계정 아이디어

- 프론프트 추천 기능 추가 (장르 기반 자동 제안)
- 사용자 생성 이미지 저장 이력 조회 기능
- 생성 이미지 수정 옵션 (re-roll, 업스케일 등)

---

## 🚀 의존 기술

| 기술 | 설명 |
| --- | --- |
| `React` | UI 프레임워크 |
| `React Router DOM` | SPA 라우트 관리 |
| `fetch API` | 이미지 생성용 OpenAI API 요청 |
| `OpenAI DALL·E` | 텍스트-이미지 생성 모델 |

---

## **BackEnd**

### 🚦 Controller & Config 요약

### 🔧 `WebConfig.java`

Spring MVC 설정 클래스.

**주요 역할**:

- CORS 설정을 통해 **React 프론트엔드(포트 3000)**에서의 요청 허용

```
📌 허용 도메인: <http://localhost:3000>
📌 허용 메서드: GET, POST, PUT, PATCH, DELETE, OPTIONS
📌 allowCredentials: true

```

---

### 📚 `BookController.java`

`/api/books` 경로로 도서 관련 API 제공.

| HTTP | URL | 기능 |
| --- | --- | --- |
| POST | `/api/books` | 도서 등록 |
| GET | `/api/books` | 전체 도서 목록 조회 |
| GET | `/api/books/{id}` | 특정 도서 상세 조회 |
| PUT | `/api/books/{id}` | 도서 정보 수정 |
| DELETE | `/api/books/{id}` | 도서 삭제 |

**기타 특징**:

- `@CrossOrigin`으로 CORS 허용 (`localhost:3000`)
- `BookService`에 실제 로직 위임

---

### 👤 `UserController.java`

`/api/users` 경로로 사용자 관련 API 제공.

| HTTP | URL | 기능 |
| --- | --- | --- |
| POST | `/api/users` | 사용자 등록 |
| GET | `/api/users` | 전체 사용자 조회 |
| POST | `/api/users/login` | 사용자 로그인 (이메일/비밀번호 기반) |

**기타 특징**:

- `LoginFailedException` 예외 발생 시 401 응답 처리
- `UserService`를 통해 사용자 로직 처리
- 응답 시 `UserResponseDto`, `UserLoginResponseDto` 사용

✅ DTO 설명 (Data Transfer Object)

도서 및 사용자 관련 데이터를 요청하거나 응답할 때 사용하는 객체입니다. Controller ↔ Service ↔ Entity 간 데이터 전달에 사용됩니다.

---

### 📘 **User 관련 DTO**

- **`UserRequestDto`**
    
    사용자 등록 요청에 사용.
    
    **필드**: `username`, `email`, `password`
    
- **`UserResponseDto`**
    
    사용자 정보 응답에 사용.
    
    **필드**: `userId`, `username`, `email`
    
- **`UserLoginResponseDto`**
    
    로그인 응답 시 사용.
    
    **필드**: `token` (JWT 등), `user` (UserResponseDto)
    

---

### 📘 **Book 관련 DTO**

- **`BookRequestDto`**
    
    도서 등록/수정 요청에 사용.
    
    **필드**: `title`, `description`, `coverImageUrl`, `userId`
    
- **`BookResponseDto`**
    
    도서 정보 응답에 사용.
    
    **필드**: `id`, `title`, `description`, `coverImageUrl`, `createdAt`, `updatedAt`, `userId`, `username`
    

---

### ⚠️ **Error DTO**

- **`ErrorResponse`**
    
    에러 응답 포맷.
    
    **필드**: `code` (HTTP 상태 코드), `status` (`error` 등), `message` (에러 메시지)
    

## 🧩 서비스 레이어 구조 요약 (`Service Layer Structure Summary`)

### 📁 `BookService.java`

- **역할**: 도서 관련 비즈니스 로직 처리
- **주요 메서드**:
    - `createBook(BookRequestDto dto)`: 도서 등록 (userId를 받아 `Users`와 연관 지음)
    - `getAllBooks()`: 모든 도서 조회
    - `getBook(Long id)`: 단일 도서 상세 조회
    - `updateBook(Long id, BookRequestDto dto)`: 도서 수정
    - `deleteBook(Long id)`: 도서 삭제
- **특징**:
    - `BookRepository`와 `UserRepository`를 활용
    - DTO ↔ Entity 변환
    - `Users`와 `Book` 간의 연관 관계 매핑 사용

---

### 📁 `UserService.java`

- **역할**: 사용자 관련 비즈니스 로직 처리
- **주요 메서드**:
    - `createUser(UserRequestDto dto)`: 사용자 회원가입
    - `getAllUsers()`: 전체 사용자 목록 조회
    - `login(UserRequestDto dto)`: 사용자 로그인 (단순 로그인 로직 / JWT 미포함)
- **특징**:
    - 사용자 인증 처리 (실패 시 `LoginFailedException` 발생)
    - 사용자 정보 응답 시 `UserResponseDto` 사용

---

## 🧩 엔티티 관계 요약 (Entities)

### 📘 `Book`

- `@ManyToOne` → `Users` (도서를 작성한 사용자)
- 필드: `title`, `description`, `coverImageUrl`, `createdAt`, `updatedAt`

### 👤 `Users`

- `@OneToMany(mappedBy = "user")` → `List<Book>`
- 필드: `username`, `email`, `password`, `book(도서 목록)`

---

## 🔗 레이어 간 연결 흐름 예시

```
📦 Controller
   └── BookController
         └── BookService
               ├── BookRepository
               └── UserRepository (userId → Users 조회)

```

```
📦 Controller
   └── UserController
         └── UserService
               └── UserRepository

```

---

## 🗂 Repository Layer 구조 요약

Spring Data JPA를 활용하여 데이터베이스 접근을 추상화한 **Repository 계층**입니다. 복잡한 SQL 작성 없이 메서드 네이밍만으로 쿼리를 자동 생성할 수 있습니다.

---

### ✅ 1. `BookRepository`

- 도서 정보를 관리하는 JPA Repository
- `JpaRepository<Book, Long>` 상속 → 기본적인 CRUD 제공

```java
public interface BookRepository extends JpaRepository<Book, Long> {
    // 필요시 커스텀 쿼리 추가 가능
}

```

---

### ✅ 2. `UserRepository`

- 사용자 정보를 관리하는 JPA Repository
- 이메일 기반 조회 기능을 위한 커스텀 메서드 추가

```java
public interface UserRepository extends JpaRepository<Users, Long> {
    Optional<Users> findByEmail(String email);
}

```

📌 **기능 요약**

| 메서드 | 설명 |
| --- | --- |
| `findByEmail(String email)` | 사용자의 이메일을 기반으로 Optional로 조회 |
| 기본 제공 메서드 | `findById`, `findAll`, `save`, `deleteById` 등 |

---

### 📌 장점 요약

- 비즈니스 로직과 DB 로직 분리
- SQL 작성 없이 빠른 개발 가능
- 필요시 `@Query` 또는 Querydsl로 확장 가능

## 🧩 Service Layer 구조 요약

비즈니스 로직을 처리하는 핵심 계층입니다. DTO를 통해 컨트롤러와의 데이터 흐름을 관리하고, DB 접근은 Repository를 통해 수행합니다.

---

### ✅ `BookService`, `BookServiceImpl`

📘 **책 CRUD + 유저 연동**

| 메서드 | 설명 |
| --- | --- |
| `createBook(BookRequestDto dto)` | 책 생성 (제목, 설명, 이미지 URL, 유저 ID 필요) |
| `getAllBooks()` | 전체 책 목록 조회 |
| `getBook(Long id)` | ID로 책 조회 |
| `updateBook(Long id, BookRequestDto dto)` | 책 정보 수정 |
| `deleteBook(Long id)` | 책 삭제 |

🔧 주요 특징:

- `BookRequestDto` → 엔티티 → 저장 → `BookResponseDto` 변환
- 책 저장 시 유저 존재 여부 확인
- `LocalDateTime.now()`으로 `createdAt`, `updatedAt` 자동 설정
- 예외 처리:
    - `BookCreateException`: 입력 값 유효성 실패
    - `BookNotFoundException`: 해당 ID의 책이 없는 경우

---

### ✅ `UserService`, `UserServiceImpl`

👤 **유저 조회 + 로그인 (회원가입 없음)**

| 메서드 | 설명 |
| --- | --- |
| `getAllUsers()` | 전체 유저 목록 조회 |
| `getUser(Long userId)` | ID로 유저 조회 |
| `deleteUser(Long userId)` | 유저 삭제 |
| `login(UserRequestDto dto)` | 이메일 & 패스워드 기반 로그인, 임시 토큰 발급 |

🔐 로그인 상세:

- 이메일로 유저 조회 (`findByEmail`)
- 비밀번호 일치 여부 확인
- 성공 시 `UserLoginResponseDto` 반환 (`토큰 + 유저 정보`)
- 실패 시 `LoginFailedException` 예외 발생

⚠️ **주의: 회원가입 기능은 구현되어 있지 않으며**,

로그인은 **사전에 DB에 저장된 유저 정보만을 기반으로 작동**합니다.

---

### ✨ 구조적 이점

- DTO ↔ Entity 명확 분리
- 예외 처리로 사용자 경험 개선
- 추후 확장 용이 (예: JWT 토큰 발급, 회원가입 추가 가능)

### ✅ 1. `application.yml` 설정

```yaml
spring:
  datasource:
    url: jdbc:h2:file:~/librarytestdb
    driver-class-name: org.h2.Driver
    username: sa
    password: 1234

  jpa:
    hibernate:
      ddl-auto: create
    show-sql: true
    properties:
      hibernate:
        format_sql: true
    defer-datasource-initialization: true

  h2:
    console:
      enabled: true
      path: /h2-console

  sql:
    init:
      mode: always

server:
  port: 8081

```

- **H2 DB**: 파일 모드 (`~/librarytestdb`)
- **웹 콘솔 URL**: http://localhost:8081/h2-console
- **접속 정보**:
    - JDBC URL: `jdbc:h2:file:~/librarytestdb`
    - 사용자명: `sa`
    - 비밀번호: `1234`
- **JPA ddl-auto**: `create` → 서버 실행 시 매번 테이블 새로 생성
- **서버 포트**: `8081`

---

### ✅ 2. 로그인 기능 관련 주의사항

> ⚠️ 회원가입 페이지는 제공하지 않으며,
> 
> 
> **H2 DB에 미리 등록된 유저 정보로만 로그인이 가능합니다.**
> 
- 로그인 테스트를 위해 `resources/data.sql`에 사용자 정보와 책 데이터를 사전 삽입해야 합니다.
- 직접 H2 콘솔에서 삽입해도 가능하지만, 초기화 자동화를 위해 `data.sql` 사용을 권장합니다.

---

### ✅ 3. `src/main/resources/data.sql` 내용

```sql
-- 유저 데이터 삽입
INSERT INTO users (user_id, username, email, password) VALUES
(1, 'testuser', 'test@example.com', 'password123'),
(2, 'anotheruser', 'another@example.com', 'password456');

-- 도서 데이터 삽입
INSERT INTO book (title, description, cover_image_url, created_at, updated_at, user_id) VALUES
('Spring Boot in Action', 'Spring Boot 설명서', '<https://example.com/spring.jpg>', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 1),
('JPA with Hibernate', 'JPA를 활용한 ORM 설명서', '<https://example.com/jpa.jpg>', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 1),
('React for Beginners', '프론트엔드 입문서', '<https://example.com/react.jpg>', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 2);

```

- `users` 테이블의 `user_id`는 직접 지정
- `book` 테이블의 `id`는 auto-increment라 생략
- 각 도서의 `user_id`는 등록된 사용자와 연관

## ⚠️ 예외 처리 구조 (Exception Handling)

본 프로젝트는 예외 상황을 명확히 분리하고, 사용자에게 의미 있는 응답을 제공하기 위해 **커스텀 예외 클래스**와 **전역 예외 처리기(GlobalExceptionHandler)**를 사용합니다.

---

### ✅ 1. 커스텀 예외 클래스 목록

| 예외 클래스명 | 설명 |
| --- | --- |
| `BookNotFoundException` | 요청한 도서를 찾을 수 없을 때 발생 (`404`) |
| `BookCreateException` | 도서 생성 중 오류가 발생했을 때 |
| `CoverNotFoundException` | 도서 표지 이미지가 존재하지 않을 때 |
| `CoverGenerateException` | 도서 표지 생성 중 오류가 발생했을 때 |
| `LoginFailedException` | 로그인 정보가 일치하지 않을 때 (`401`) |
| `UserNotFoundException` | 특정 사용자를 찾을 수 없을 때 발생 (`404`) |

### 예시 코드 (LoginFailedException)

```java
public class LoginFailedException extends RuntimeException {
    public LoginFailedException(String message) {
        super(message);
    }
}

```

---

### ✅ 2. 전역 예외 처리기: `GlobalExceptionHandler`

`@RestControllerAdvice`를 통해 모든 컨트롤러에서 발생하는 예외를 일괄 처리합니다.

### 주요 처리 항목

| 예외 타입 | HTTP 상태코드 | 응답 메시지 예시 |
| --- | --- | --- |
| `BookNotFoundException`, `UserNotFoundException` | `404 Not Found` | `해당 리소스가 존재하지 않습니다: [message]` |
| `LoginFailedException` | `401 Unauthorized` | `로그인 실패: [message]` *(직접 핸들링 가능)* |
| `IllegalArgumentException` | `400 Bad Request` | `잘못된 요청입니다: [message]` |
| 그 외 모든 예외 | `500 Internal Server Error` | `서버 내부 오류가 발생했습니다.` |

```java
@ExceptionHandler(UserNotFoundException.class)
public ResponseEntity<String> handleUserNotFound(UserNotFoundException ex) {
    return ResponseEntity
            .status(HttpStatus.NOT_FOUND)
            .body("해당 사용자가 존재하지 않습니다: " + ex.getMessage());
}

```

> 🔸 Note: LoginFailedException은 UserController 내부에서 try-catch로 처리되어 있으며, 추후 전역 예외 처리기로 이동시킬 수 있습니다.
> 

---

### 📌 장점 요약

- 예외별 메시지 및 상태코드 명확하게 관리
- 코드 중복 제거 및 유지보수 용이
- 사용자 중심의 응답 제공으로 UX 향상
