(function () {
  const amountRange = document.getElementById('amountRange');
  const daysRange = document.getElementById('daysRange');
  const amountValue = document.getElementById('amountValue');
  const daysValue = document.getElementById('daysValue');
  const totalValue = document.getElementById('totalValue');
  const rateValue = document.getElementById('rateValue');
  const navToggle = document.getElementById('navToggle');
  const mainNav = document.getElementById('mainNav');

  function formatRub(num) {
    return new Intl.NumberFormat('ru-RU').format(num) + ' ₽';
  }

  function recalc() {
    const amount = Number(amountRange.value || 0);
    const days = Number(daysRange.value || 0);
    // Simple illustrative estimate (not an offer): ~0.8% per day, capped visually by ranges
    const dailyRate = 0.008;
    const total = Math.round(amount + amount * dailyRate * days);
    amountValue.textContent = formatRub(amount);
    daysValue.textContent = days + (days === 1 ? ' день' : (days >= 2 && days <= 4 ? ' дня' : ' дней'));
    totalValue.textContent = formatRub(total);
    rateValue.textContent = '0.8% в день (ориентир)';
  }

  if (amountRange && daysRange) {
    amountRange.addEventListener('input', recalc);
    daysRange.addEventListener('input', recalc);
    recalc();
  }

  if (navToggle && mainNav) {
    navToggle.addEventListener('click', function () {
      mainNav.classList.toggle('open');
      const icon = navToggle.querySelector('i');
      if (icon) {
        icon.className = mainNav.classList.contains('open') ? 'fa-solid fa-xmark' : 'fa-solid fa-bars';
      }
    });
    mainNav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        mainNav.classList.remove('open');
        const icon = navToggle.querySelector('i');
        if (icon) icon.className = 'fa-solid fa-bars';
      });
    });
  }

  document.querySelectorAll('.offer-btn').forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      const name = btn.getAttribute('data-offer') || 'предложение';
      alert('Демо: переход к партнёру («' + name + '»). Подключите реальную ссылку партнёра.');
    });
  });
})();