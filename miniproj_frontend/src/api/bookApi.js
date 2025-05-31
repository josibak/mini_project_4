import axiosInstance from './axios';

// 전체 도서 조회
export const fetchBooks = async (title = '') => {
  try {
    const response = await axiosInstance.get('', {
      params: title ? { title } : {},
    });
    console.log('📦 백엔드 응답:', response);
    return response.data;
  } catch (error) {
    console.error('Error fetching books:', error);
    console.error('❌ Axios 요청 실패');
    console.error('🔻 message:', error.message);
    console.error('🔻 code:', error.code);
    console.error('🔻 response:', error.response);
    throw error;
  }
};

// ID로 도서 조회
export const fetchBookById = async (id) => {
  try {
    const response = await axiosInstance.get(`/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching book with id ${id}:`, error);
    throw error;
  }
};

// 도서 생성
export const createBook = async (bookData) => {
  try {
    const response = await axiosInstance.post('', bookData);
    return response.data;
  } catch (error) {
    console.error('Error creating book:', error);
    throw error;
  }
};

// 도서 수정
export const updateBook = async (id, bookData) => {
  try {
    const response = await axiosInstance.put(`/${id}`, bookData);
    return response.data;
  } catch (error) {
    console.error(`Error updating book with id ${id}:`, error);
    throw error;
  }
};

// 도서 삭제
export const deleteBook = async (id) => {
  try {
    await axiosInstance.delete(`/${id}`);
  } catch (error) {
    console.error(`Error deleting book with id ${id}:`, error);
    throw error;
  }
};
