export default function authHeader() {
    const dado: any = localStorage.getItem('user')

    let user:any = JSON.parse(dado);
  
    if (user && user.token) {
      return { Authorization: 'Bearer ' + user.token };
    } else {
      return {};
    }
  }