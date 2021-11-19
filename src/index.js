import ExchangeService from "./exchangeService";

async function storeCodes() {
  if (!sessionStorage.getItem('codes')) {
    await ExchangeService.getCodes().then((response) => {
      if (response.supported_codes) {
        sessionStorage.setItem('codes', JSON.stringify(response.supported_codes));
      } else {
        $('#error-display').html(`<p>Error: ${response.message}</p>`)
      }
    });
  }
}