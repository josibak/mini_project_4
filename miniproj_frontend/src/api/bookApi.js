// src/api/bookApi.js
import axiosInstance from './axios';

// 도서 전체 조회
export const fetchBooks = async () => {
  try {
    const response = await axiosInstance.get('/books');
    return response.data;
  } catch (error) {
    console.error('도서 목록 조회 오류:', error);
    throw error;
  }
};

// ID로 도서 조회
export const fetchBookById = async (id) => {
  try {
    const response = await axiosInstance.get(`/books/${id}`);
    return response.data;
  } catch (error) {
    console.error(`도서 상세 조회 오류 (id: ${id})`, error);
    throw error;
  }
};

// 도서 등록
export const createBook = async (bookData) => {
  try {
    console.log('[요청 데이터]', bookData);  // 🔍 디버깅용
    const response = await axiosInstance.post('/books', bookData);
    return response.data;
  } catch (error) {
    console.error('도서 등록 오류:', error.response?.data || error.message);
    throw error;
  }
};


// 도서 수정
export const updateBook = async (id, bookData) => {
  try {
    const response = await axiosInstance.put(`/books/${id}`, bookData);
    return response.data;
  } catch (error) {
    console.error(`도서 수정 오류 (id: ${id})`, error);
    throw error;
  }
};

// 도서 삭제
export const deleteBook = async (id) => {
  try {
    await axiosInstance.delete(`/books/${id}`);
  } catch (error) {
    console.error(`도서 삭제 오류 (id: ${id})`, error);
    throw error;
  }
};
