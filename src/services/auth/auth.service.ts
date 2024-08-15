import axios from 'axios';

// const API_URL = 'http://10.38.210.18:8080';

class AuthService {
  login(user: any) {
    return axios.post('login', {
        email: user.email,
        senha: user.senha
      })
      .then(response => {
        // console.log(response);
        if (response && response.data) {
          localStorage.setItem('user', JSON.stringify(response.data));
        }
        return response.data;
      })
  }

  async resetPassword(form: any){
    return await axios.get(`esqueciMinhaSenha?email=${form.email}&numeroDocumento=${form.numeroDocumento}&tipoDocumento=${form.selectedOption}&dataNascimento=${form.dataNascimento}`);
  }

  async changePassword(form: any){
    return  await axios.post(`resetSenha?codigo=${form.codigo}&novaSenha=${form.novaSenha}`);
  }

  logout() {
    localStorage.removeItem('user');
  }

  register(user: any) {
    return axios.post('signup', {
      username: user.username,
      email: user.email,
      password: user.password
    });
  }
}

export default new AuthService();