import axios from 'axios';

// Production Next.js API URL
const BASE_URL = 'https://app-jeffben.vercel.app/api'; 

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const busApi = {
  getBuses: () => api.get('/buses'),
  getBusById: (id: string) => api.get(`/buses/${id}`),
};

export const bookingApi = {
  createBooking: (data: any) => api.post('/bookings', data),
  getBookingsByPhone: (phone: string) => api.post('/bookings/by-phone', { phone }),
};

export default api;
