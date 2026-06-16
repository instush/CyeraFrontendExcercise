import axios from 'axios';

// Configurable via the VITE_API_BASE_URL env var (set it in Netlify to the
// deployed backend URL). Falls back to the local dev server.
const instance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:3000',
});

export default instance;
