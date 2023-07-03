import HttpClient from './utils/HttpClient';

class DesenvovedoresService {
  constructor() {
    this.httpClient = new HttpClient('http://localhost:5000');
  }

  listDesenvolvedores(orderBy = 'asc') {
    return this.httpClient.get(`/desenvolvedores?orderBy=${orderBy}`);
  }

  getDesenvolvedoresById(id) {
    return this.httpClient.get(`/desenvolvedores/${id}`);
  }

  createDesenvolvedores(desenvolvedor) {
    console.log('createDesenvolvedores Services', desenvolvedor);
    return this.httpClient.post('/desenvolvedores', { body: desenvolvedor });
  }

  updateDesenvolvedores(id, desenvolvedor) {
    console.log('services', desenvolvedor);
    return this.httpClient.put(`/desenvolvedores/${id}`, { body: desenvolvedor });
  }

  deleteDesenvolvedores(id) {
    return this.httpClient.delete(`/desenvolvedores/${id}`);
  }
}

export default new DesenvovedoresService();
