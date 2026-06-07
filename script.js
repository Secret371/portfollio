// ═══ SPARKS ═══
(function(){
  const wrap = document.getElementById('sparks');
  for(let i = 0; i < 36; i++){
    const s = document.createElement('div');
    const angle = (i / 36) * 360;
    const len = 18 + Math.random() * 90;
    const w = 1.5 + Math.random() * 2;
    s.style.cssText = `
      position:absolute;
      width:${len}px;height:${w}px;
      background:linear-gradient(90deg,rgba(0,245,212,0.9),transparent);
      border-radius:2px;
      transform:rotate(${angle}deg);
      transform-origin:0 50%;
      opacity:${0.4 + Math.random() * 0.6};
    `;
    wrap.appendChild(s);
  }
})();

// ═══ CRUSHER EXIT ═══
setTimeout(() => {
  const el = document.getElementById('crusher');
  el.style.display = 'none';
}, 3400);

// ═══ CUSTOM CURSOR ═══
const cur = document.getElementById('cur');
const curR = document.getElementById('curRing');
let mx = 0, my = 0, rx = 0, ry = 0;
document.addEventListener('mousemove', e => {
  mx = e.clientX; my = e.clientY;
  cur.style.left = mx - 5 + 'px';
  cur.style.top = my - 5 + 'px';
});
(function animR(){
  rx += (mx - rx) * 0.13;
  ry += (my - ry) * 0.13;
  curR.style.left = rx - 18 + 'px';
  curR.style.top = ry - 18 + 'px';
  requestAnimationFrame(animR);
})();
document.querySelectorAll('a,button,.sk,.proj,.cert,.ach,.soc-a,.chip').forEach(el => {
  el.addEventListener('mouseenter', () => { curR.style.transform = 'scale(1.6)'; curR.style.borderColor = 'var(--c)'; });
  el.addEventListener('mouseleave', () => { curR.style.transform = 'scale(1)'; curR.style.borderColor = 'rgba(0,245,212,0.5)'; });
});

// ═══ TYPEWRITER ═══
const roles = ['Java Developer','Spring Boot Dev','Backend Developer','Open Source Contributor','Future SDE'];
let ri = 0, ci = 0, del = false;
function type(){
  const el = document.getElementById('typewriter');
  const cur = roles[ri];
  if(!del){ el.textContent = cur.slice(0, ci+1); ci++; if(ci === cur.length){ del = true; setTimeout(type, 1900); return; }}
  else { el.textContent = cur.slice(0, ci-1); ci--; if(ci === 0){ del = false; ri = (ri+1) % roles.length; }}
  setTimeout(type, del ? 42 : 88);
}
type();

// ═══ COUNTER ═══
const obs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if(e.isIntersecting){
      const el = e.target, target = +el.dataset.target;
      let n = 0, step = target / 60;
      const t = setInterval(() => {
        n = Math.min(n + step, target);
        el.textContent = Math.round(n) + '+';
        if(n >= target) clearInterval(t);
      }, 28);
      obs.unobserve(el);
    }
  });
});
document.querySelectorAll('[data-target]').forEach(c => obs.observe(c));

// ═══ SCROLL ═══
window.addEventListener('scroll', () => {
  document.getElementById('scrollTop').classList.toggle('show', window.scrollY > 400);
  document.getElementById('nav').classList.toggle('scrolled', window.scrollY > 60);
});

// ═══ REVEAL ═══
const revObs = new IntersectionObserver(entries => {
  entries.forEach(e => { if(e.isIntersecting){ e.target.classList.add('in'); revObs.unobserve(e.target); }});
}, { threshold: 0.1 });
document.querySelectorAll('.reveal').forEach(el => revObs.observe(el));
