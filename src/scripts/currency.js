async function fetchRates(base = 'USD') {
  const response = await fetch(`https://open.er-api.com/v6/latest/${base}`);
  if (!response.ok) throw new Error('Ошибка при загрузке курсов');
  const data = await response.json();
  if (data.result !== 'success') throw new Error('Ошибка API');
  return data.rates;
}

async function initCurrencyConverter() {
  const fromSelect = document.getElementById('from-currency');
  const toSelect = document.getElementById('to-currency');
  const convertBtn = document.getElementById('convert-btn');
  const resultBox = document.getElementById('result');

  let rates = await fetchRates('USD');
  const currencies = Object.keys(rates).sort();

  currencies.forEach(cur => {
    const opt1 = document.createElement('option');
    const opt2 = document.createElement('option');
    opt1.value = opt2.value = cur;
    opt1.textContent = opt2.textContent = cur;
    fromSelect.appendChild(opt1);
    toSelect.appendChild(opt2);
  });

  fromSelect.value = 'USD';
  toSelect.value = 'EUR';

  convertBtn.addEventListener('click', async () => {
    const amount = parseFloat(document.getElementById('amount').value);
    const from = fromSelect.value;
    const to = toSelect.value;

    if (isNaN(amount) || amount <= 0) {
      resultBox.textContent = 'Введите корректную сумму';
      return;
    }

    resultBox.textContent = '⏳ Загрузка...';

    try {
      rates = await fetchRates(from);
      const rate = rates[to];
      const converted = (amount * rate).toFixed(2);
      resultBox.innerHTML = `
        <div class="conversion-result">
          ${amount} ${from} = <strong>${converted} ${to}</strong>
        </div>
        <div class="rate-info">Курс: 1 ${from} = ${rate.toFixed(4)} ${to}</div>
      `;
    } catch (err) {
      resultBox.textContent = 'Ошибка при получении данных 😢';
      console.error(err);
    }
  });
}

document.addEventListener('DOMContentLoaded', initCurrencyConverter);
