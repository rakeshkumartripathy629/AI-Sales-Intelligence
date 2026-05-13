// import axios from 'axios'

// const BASE_URL = 'http://localhost:5000'

// const api = axios.create({
//   baseURL: BASE_URL,
//   timeout: 60000,
//   headers: {
//     'Content-Type': 'application/json',
//   },
// })

// // Response interceptor for consistent error handling
// api.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     const message =
//       error?.response?.data?.message ||
//       error?.response?.data?.error ||
//       error?.message ||
//       'Something went wrong. Please try again.'
//     return Promise.reject(new Error(message))
//   }
// )

// export const checkHealth = async () => {
//   const response = await api.get('/')
//   return response.data
// }

// export const analyzeSingleLead = async (url) => {
//   const response = await api.post('/api/leads/analyze', { lead: url })
//   return response.data
// }

// export const analyzeBulkLeads = async (leads) => {
//   const response = await api.post('/api/leads/bulk-analyze', { leads })
//   return response.data
// }

// export const getAllLeads = async () => {
//   const response = await api.get('/api/leads')
//   return response.data
// }


import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000"
});

// Analyze single lead
export const analyzeSingleLead =
  async (lead) => {
    const response = await API.post(
      "/api/leads/analyze",
      { lead }
    );

    return response.data;
  };

// Bulk analyze
export const analyzeBulkLeads =
  async (leads) => {
    const response = await API.post(
      "/api/leads/bulk-analyze",
      { leads }
    );

    return response.data;
  };

// Get all leads
export const getAllLeads =
  async () => {
    const response =
      await API.get("/api/leads");

    return response.data;
  };

// DELETE LEAD
export const deleteLeadById =
  async (id) => {
    const response =
      await API.delete(
        `/api/leads/${id}`
      );

    return response.data;
  };