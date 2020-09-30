import axios from 'axios';

const service = axios.create({
  baseURL: 'https://dev.api.ihms.solutionplus.net/',
});

export default service;
