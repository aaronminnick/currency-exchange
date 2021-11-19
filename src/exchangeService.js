export default class ExchangeService {
  static getCodes() {
    return fetch(`https://v6.exchangerate-api.com/v6/${process.env.API_KEY}/codes`)
      .then((response) => {
        if (!response.ok) {
          throw (response.statusText);
        }
        return response.json();
      })
      .catch((error) => {
        return Error(error);
      });
  }

  static getRate(currFrom, currTo, amount) {
    return fetch(`https://v6.exchangerate-api.com/v6/${process.env.API_KEY}/pair/${currFrom}/${currTo}/${amount}`)
      .then((response) => {
        if (!response.ok) {
          throw (response.statusText);
        }
        return response.json();
      })
      .catch((error) => {
        return Error(error);
      });
  }
}