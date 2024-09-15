document.addEventListener('DOMContentLoaded', () => {
    fetch('/api/tickers')
      .then(response => response.json())
      .then(data => {
        const tbody = document.getElementById('ticker-data');
        data.forEach((ticker, index) => {
          const tr = document.createElement('tr');
          const difference = ((ticker.buy - ticker.sell) / ticker.sell) * 100;
          const savings = ticker.buy - ticker.sell;
  
          tr.innerHTML = `
            <td>${index + 1}</td>
            <td>${ticker.name}</td>
            <td>₹${ticker.last.toLocaleString()}</td>
            <td>₹${ticker.buy.toLocaleString()} / ₹${ticker.sell.toLocaleString()}</td>
            <td>${difference.toFixed(2)}%</td>
            <td style="color: ${savings > -1 ? 'green' : 'red'};">₹${savings.toLocaleString()}</td>
          `;
          tbody.appendChild(tr);
        });
      })
      .catch(error => console.error('Error fetching data:', error));
  });
  