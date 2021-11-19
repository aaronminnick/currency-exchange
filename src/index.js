import $ from 'jquery';
import ExchangeService from "./exchangeService";

async function storeCodes() {
  if (!sessionStorage.getItem('codes')) {
    await ExchangeService.getCodes()
      .then((response) => {
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
  let currFromSelect = $('#curr-from-select');
  let currToSelect = $('#curr-to-select');
  for (let i in codes) {
    let optionString = `<option value=${codes[i][0]}>${codes[i][0]} - ${codes[i][1]}</option>`;
    currFromSelect.append(optionString);
    currToSelect.append(optionString);
  }
}

function displayExchange(amtFrom, currFrom, amtTo, currTo, rate) {
  $('#exchange-display').html(`
    <p>${amtFrom} ${currFrom} is equal to ${amtTo} ${currTo}.</p>
    <p>Exchange rate: ${rate}</p>
    `);
}

storeCodes()
  .then(() => {
    populateSelects();
  });

$('#exchange-form').on('submit', (event) => {
  event.preventDefault();
  let amtFrom = $('#amount').val();
  let currFrom = $('#curr-from-select').val();
  let currTo = $('#curr-to-select').val();

  ExchangeService.getRate(currFrom, currTo, amtFrom)
    .then((response) => {
      if (response.conversion_result) {
        let amtTo = response.conversion_result;
        let rate = response.conversion_rate;
        displayExchange(amtFrom, currFrom, amtTo, currTo, rate);
      } else {
        $('#error-display').html(`<p>Error: ${response.message}</p>`);
      }
    });
});