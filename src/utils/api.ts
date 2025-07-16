import axios from 'axios';
import { Link, Tag } from '../types';

const API_URL = 'http://localhost:5000/api';

// Create axios instance with base URL
const api = axios.create({
  baseURL: API_URL,
});

// Add request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (user && user.token) {
      config.headers.Authorization = `Bearer ${user.token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Link API calls
export const fetchTitleFromUrl = async (url: string) => {
  try {
    const response = await api.post('/links/fetch-title', { url });
    return { success: true, data: response.data };
  } catch (error: any) {
    return { 
      success: false, 
      error: error.response?.data?.message || 'Failed to fetch title' 
    };
  }
};

export const createLink = async (linkData: Partial<Link>) => {
  try {
    const response = await api.post('/links', linkData);
    return { success: true, data: response.data };
  } catch (error: any) {
    return { 
      success: false, 
      error: error.response?.data?.message || 'Failed to create link' 
    };
  }
};

export const getLinks = async () => {
  try {
    const response = await api.get('/links');
    return { success: true, data: response.data };
  } catch (error: any) {
    return { 
      success: false, 
      error: error.response?.data?.message || 'Failed to fetch links' 
    };
  }
};

export const updateLink = async (id: string, linkData: Partial<Link>) => {
  try {
    const response = await api.put(`/links/${id}`, linkData);
    return { success: true, data: response.data };
  } catch (error: any) {
    return { 
      success: false, 
      error: error.response?.data?.message || 'Failed to update link' 
    };
  }
};

export const deleteLink = async (id: string) => {
  try {
    const response = await api.delete(`/links/${id}`);
    return { success: true, data: response.data };
  } catch (error: any) {
    return { 
      success: false, 
      error: error.response?.data?.message || 'Failed to delete link' 
    };
  }
};

// Tag API calls
export const createTag = async (name: string) => {
  try {
    const response = await api.post('/tags', { name });
    return { success: true, data: response.data };
  } catch (error: any) {
    return { 
      success: false, 
      error: error.response?.data?.message || 'Failed to create tag' 
    };
  }
};

export const getTags = async () => {
  try {
    const response = await api.get('/tags');
    return { success: true, data: response.data };
  } catch (error: any) {
    return { 
      success: false, 
      error: error.response?.data?.message || 'Failed to fetch tags' 
    };
  }
};

export const deleteTag = async (id: string) => {
  try {
    const response = await api.delete(`/tags/${id}`);
    return { success: true, data: response.data };
  } catch (error: any) {
    return { 
      success: false, 
      error: error.response?.data?.message || 'Failed to delete tag' 
    };
  }
};
