// Mobile menu
document.getElementById('menuBtn').onclick = () => {
  document.getElementById('mobileMenu').classList.toggle('show');
};

// Property filter
const btns = document.querySelectorAll('#propFilters button');
const cards = document.querySelectorAll('#propGrid .card');
btns.forEach(b => b.onclick = () => {
  btns.forEach(x => x.classList.remove('active'));
  b.classList.add('active');
  const f = b.dataset.f;
  cards.forEach(c => {
    c.style.display = (f === 'all' || c.dataset.tags.includes(f)) ? '' : 'none';
  });
});

// Reveal on scroll + counters
const io = new IntersectionObserver(es => es.forEach(e => {
  if (e.isIntersecting) {
    e.target.classList.add('visible');
    e.target.querySelectorAll('[data-count]').forEach(runCounter);
    if (e.target.hasAttribute('data-count')) runCounter(e.target);
  }
}), {threshold: .15});
document.querySelectorAll('.reveal, [data-count]').forEach(el => io.observe(el));
function runCounter(el) {
  if (el.dataset.done) return; el.dataset.done = 1;
  const target = +el.dataset.count; let cur = 0;
  const t = setInterval(() => {
    cur += Math.max(1, Math.round(target / 30));
    if (cur >= target) { cur = target; clearInterval(t); }
    el.textContent = (target === 0 ? '0' : cur) + (target === 100 ? '+' : target === 8 ? '%' : target === 10 ? '+' : '');
  }, 50);
}
// Lead forms -> WhatsApp
const WA_NUMBER = '971500000000';
function handleLead(formId, successId, summaryId) {
  const form = document.getElementById(formId);
  if (!form) return;
  form.addEventListener('submit', e => {
    e.preventDefault();
    const d = Object.fromEntries(new FormData(form).entries());
    const msg = `New Gulf Lead: ${d.name} | ${d.phone} | ${d.budget||''} | ${d.goal||''} | ${d.type||''} | ${d.pref||''}`;
    if (summaryId) document.getElementById(summaryId).textContent = `${d.budget||''} • ${d.goal||''} • ${d.type||''}`;
    document.getElementById(successId).classList.remove('hidden');
    form.style.display = 'none';
    // Open WhatsApp to you with lead details
    window.open(`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`, '_blank');
    // TODO: also POST to Google Sheet / CRM webhook here
    // fetch('YOUR_WEBHOOK_URL', {method:'POST', body: JSON.stringify(d)})
  });
}
handleLead('leadForm', 'formSuccess', 'summary');
handleLead('leadForm2', 'formSuccess2');
