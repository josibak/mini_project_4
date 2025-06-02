import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8081",
  headers: { "Content-Type": "application/json" },
});

// 도서 전체 조회
export const fetchBooks = async () => {
  const response = await axiosInstance.get("/api/books");
  return response.data;
};

// 도서 상세 조회
export const fetchBookById = async (id) => {
  const response = await axiosInstance.get(`/api/books/${id}`);
  return response.data;
};

// 도서 등록 (새 책 추가)
export const createBook = async (bookData) => {
  const response = await axiosInstance.post("/api/books", bookData);
  return response.data;
};

// 도서 수정 (기존 책 표지/내용 변경)
export const updateBook = async (id, bookData) => {
  const response = await axiosInstance.put(`/api/books/${id}`, bookData);
  return response.data;
};

// 도서 삭제
export const deleteBook = async (id) => {
  await axiosInstance.delete(`/api/books/${id}`);
};
