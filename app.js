// app.js: nav toggle, year, custom cursor
document.addEventListener('DOMContentLoaded', function(){
  // year
  const yearEl = document.getElementById('year');
  if(yearEl) yearEl.textContent = new Date().getFullYear();

  // nav toggle for small screens
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.nav');
  if(toggle && nav){
    toggle.addEventListener('click', ()=>{
      const expanded = nav.style.display === 'flex';
      nav.style.display = expanded ? 'none' : 'flex';
      nav.style.flexDirection = 'column';
    });
  }

  // custom cursor
  const cursorInner = document.getElementById('cursor-inner');
  const cursorOuter = document.getElementById('cursor-outer');
  let mouseX = window.innerWidth/2, mouseY = window.innerHeight/2;
  let outerX = mouseX, outerY = mouseY;

  document.addEventListener('mousemove', (e)=>{
    mouseX = e.clientX; mouseY = e.clientY;
    if(cursorInner){
      cursorInner.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
    }
  });

  // outer tag follows with slight lag
  function animateOuter(){
    outerX += (mouseX - outerX) * 0.12;
    outerY += (mouseY - outerY) * 0.12;
    if(cursorOuter){
      cursorOuter.style.transform = `translate(${outerX}px, ${outerY}px)`;
    }
    requestAnimationFrame(animateOuter);
  }
  animateOuter();

  // enlarge cursor on interactive elements
  const hoverables = document.querySelectorAll('a, button, .btn');
  hoverables.forEach(el=>{
    el.addEventListener('mouseenter', ()=>{
      if(cursorOuter) cursorOuter.style.transform += ' scale(1.15)';
      if(cursorInner) cursorInner.style.transform += ' scale(0.85)';
      cursorOuter.style.borderColor = 'rgba(244,114,182,0.5)';
    });
    el.addEventListener('mouseleave', ()=>{
      // reset (quick and robust way)
      cursorOuter.style.borderColor = 'rgba(244,114,182,0.25)';
    });
  });

});
