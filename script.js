function convertCurrency() {
    // Fetch user inputs
    const amount = parseFloat(document.getElementById('amount').value);
    const sourceCurrency = document.getElementById('sourceCurrency').value.toUpperCase();
    const targetCurrency = document.getElementById('targetCurrency').value.toUpperCase();

    // Check if inputs are valid
    if (isNaN(amount) || sourceCurrency === '' || targetCurrency === '') {
        alert('Please enter valid input values.');
        return;
    }

    // Fetch exchange rates from Exchange Rates API
    const apiKey = 'f25b11321c6a03e3208ebb52fdb252be';
    const apiUrl = `https://open.er-api.com/v6/latest/${sourceCurrency}?apikey=${apiKey}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const exchangeRates = data.rates;
            if (targetCurrency in exchangeRates) {
                const convertedAmount = amount * exchangeRates[targetCurrency];
                document.getElementById('result').innerText = `${amount} ${sourceCurrency} is equal to ${convertedAmount.toFixed(2)} ${targetCurrency}`;
            } else {
                alert('Invalid target currency code.');
            }
        })
        .catch(error => {
            console.error('Error fetching exchange rates:', error);
            alert('Error fetching exchange rates. Please try again.');
        });
}
