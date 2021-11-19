export default class ExchangeService {
  static getCodes() {
    return fetch(`https://v6.exchangerate-api.com/v6/${process.env.API_KEY}/codes`)
      .then((response) => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response.json();
      })
      .catch((error) => {
        return error;
      });
  }

  static getRate(currFrom, currTo, amount) {
    return fetch(`https://v6.exchangerate-api.com/v6/${process.env.API_KEY}/pair/${currFrom}/${currTo}/${amount}`)
      .then((response) =>{
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response.json();
      })
      .catch((error) => {
        return error;
      });
  }
}