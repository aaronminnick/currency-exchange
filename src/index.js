import $ from 'jquery';
import ExchangeService from "./exchangeService";

async function storeCodes() {
  if (!sessionStorage.getItem('codes')) {
    await ExchangeService.getCodes().then((response) => {
      if (response.supported_codes) {
        sessionStorage.setItem('codes', JSON.stringify(response.supported_codes));
      } else {
        $('#error-display').html(`<p>Error: ${response.message}</p>`);
      }
    });
  }
}

function populateSelects() {
  let codes = JSON.parse(sessionStorage.getItem('codes'));
  console.log(codes);
  let currFromSelect = $('#curr-from-select');
  let currToSelect = $('#curr-to-select');
  for (let i in codes) {
    let optionString = `<option value=${codes[i][0]}>${codes[i][1]}</option>`;
    currFromSelect.append(optionString);
    currToSelect.append(optionString);
  }
}

storeCodes().then(() => {
  populateSelects();
});
