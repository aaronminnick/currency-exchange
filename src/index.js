import $ from 'jquery';
import ExchangeService from "./exchangeService";

async function storeCodes() {
  if (!sessionStorage.getItem('codes')) {
    await ExchangeService.getCodes()
      .then((response) => {
        if (response.supported_codes) {
          sessionStorage.setItem('codes', JSON.stringify(response.supported_codes));
        } else if (response.error_type) {
          $('#error-display').html(`<p>Error: ${response.error_type}</p>`);
        }
      })
      .catch((error) => {
        $('#error-display').html(`<p>${error}</p>`);
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

function clearOutput() {
  $('#exchange-display').html('');
  $('#error-display').html('');
}

storeCodes()
  .then(() => {
    populateSelects();
  });

$('#exchange-form').on('submit', (event) => {
  event.preventDefault();
  clearOutput();
  let amtFrom = $('#amount').val();
  let currFrom = 'XXX';
  let currTo = 'XXX';
  if ($('#curr-from-select').val() !== '') {
    currFrom = $('#curr-from-select').val();
  }
  if ($('#curr-to-select').val() !== '') {
    currTo = $('#curr-to-select').val();
  }
  ExchangeService.getRate(currFrom, currTo, amtFrom)
    .then((response) => {
      console.log(response);
      if (response instanceof Error) {
        throw (response);
      }
      if (response.conversion_result) {
        let amtTo = response.conversion_result;
        let rate = response.conversion_rate;
        displayExchange(amtFrom, currFrom, amtTo, currTo, rate);
      } else if (response.error_type === 'unsupported-code') {
        $('#error-display').html(`<p>Error: Currency code is not supported.</p>`);
      } else if (response.error_type) {
        $('#error-display').html(`<p>Error: ${response.error_type}</p>`);
      }
    })
    .catch((error) => {
      if (error.message === 'Not Found') {
        $('#error-display').html(`<p>Error: Currency code not selected, or currency code is not supported.</p>`);
      } else {
        $('#error-display').html(`<p>${error}</p>`);
      }
    });
});