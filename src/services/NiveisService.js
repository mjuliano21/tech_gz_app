import HttpClient from './utils/HttpClient';

class NiveisService {
  constructor() {
    this.httpClient = new HttpClient('http://localhost:5000');
  }

  getNivelById(id) {
    return this.httpClient.get(`/niveis/${id}`);
  }

  listNiveis() {
    return this.httpClient.get('/niveis');
  }

  createNivel(nivel) {
    return this.httpClient.post('/niveis', { body: nivel });
  }

  updateNivel(id, nivel) {
    return this.httpClient.put(`/niveis/${id}`, { body: nivel });
  }

  deleteNiveis(id) {
    return this.httpClient.delete(`/niveis/${id}`);
  }
}

export default new NiveisService();
