let COURSES=[];
const byDate=(a,b)=>`${a.date} ${a.time}`.localeCompare(`${b.date} ${b.time}`);
const esc=s=>(s||'').replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const fmt=c=>`${c.day} ${c.date.replace('2026-','').replace('-','/')} ${c.time}`;
async function loadCourses(){
  const res=await fetch('data/courses.json');
  COURSES=(await res.json()).sort(byDate);
  initCommon();
  if(document.querySelector('#todayCourses')) initHome();
  if(document.querySelector('#courseList')) initCourses();
  if(document.querySelector('#speakerList')) initSpeakers();
}
function initCommon(){
  const speakers=[...new Set(COURSES.flatMap(c=>c.speakers))].filter(Boolean);
  const cc=document.querySelector('#courseCount'); if(cc) cc.textContent=COURSES.length;
  const sc=document.querySelector('#speakerCount'); if(sc) sc.textContent=speakers.length;
}
function card(c){return `<div class="col-md-6 col-xl-4"><article class="course-card"><span class="badge badge-series mb-2">${esc(c.series)} ${esc(c.no)}</span><h3>${esc(c.title)}</h3><p class="meta mb-2">${fmt(c)}</p><p class="mb-2"><strong>負責：</strong>${esc(c.speakers.join('、'))}</p><p class="mb-0">${esc(c.summary)}</p></article></div>`}
function initHome(){
  const date=document.querySelector('#todayDate');
  const wrap=document.querySelector('#todayCourses');
  function renderToday(){
    const rows=COURSES.filter(c=>c.date===date.value);
    wrap.innerHTML=rows.length?rows.map(card).join(''):`<div class="col-12"><div class="empty">這天沒有課程資料</div></div>`;
  }
  date.addEventListener('change',renderToday); renderToday();
  const groups=COURSES.reduce((m,c)=>(m[c.series]=(m[c.series]||0)+1,m),{});
  document.querySelector('#seriesGrid').innerHTML=Object.entries(groups).map(([k,v])=>`<div class="col-6 col-lg-3"><div class="series-card"><div class="eyebrow">${v} 堂</div><h3 class="h5 fw-bold mb-0">${esc(k)}</h3></div></div>`).join('');
}
function initCourses(){
  const list=document.querySelector('#courseList'), q=document.querySelector('#courseSearch'), f=document.querySelector('#seriesFilter');
  [...new Set(COURSES.map(c=>c.series))].forEach(s=>f.insertAdjacentHTML('beforeend',`<option>${esc(s)}</option>`));
  function render(){
    const term=q.value.trim().toLowerCase(), series=f.value;
    const rows=COURSES.filter(c=>(!series||c.series===series)&&JSON.stringify(c).toLowerCase().includes(term));
    list.innerHTML=rows.length?rows.map((c,i)=>`<div class="accordion-item"><h2 class="accordion-header"><button class="accordion-button ${i?'collapsed':''}" type="button" data-bs-toggle="collapse" data-bs-target="#c${i}"><span class="me-2 badge badge-series">${esc(c.series)} ${esc(c.no)}</span>${esc(c.title)}<span class="ms-auto me-3 d-none d-md-inline meta">${fmt(c)}</span></button></h2><div id="c${i}" class="accordion-collapse collapse ${i?'':'show'}" data-bs-parent="#courseList"><div class="accordion-body"><p class="meta">${fmt(c)}｜負責：${esc(c.speakers.join('、'))}</p>${c.hymn?`<p><strong>詩歌：</strong>${esc(c.hymn)}</p>`:''}${c.verses.length?`<p><strong>主要經節：</strong>${esc(c.verses.join('、'))}</p>`:''}<p>${esc(c.summary)}</p><ul class="point-list">${c.points.map(p=>`<li>${esc(p)}</li>`).join('')}</ul></div></div></div>`).join(''):`<div class="empty">找不到符合條件的課程</div>`;
  }
  q.addEventListener('input',render); f.addEventListener('change',render); render();
}
function initSpeakers(){
  const list=document.querySelector('#speakerList'), q=document.querySelector('#speakerSearch');
  const names=[...new Set(COURSES.flatMap(c=>c.speakers))].filter(Boolean).sort((a,b)=>a.localeCompare(b,'zh-Hant'));
  function render(){
    const term=q.value.trim();
    const shown=names.filter(n=>!term||n.includes(term));
    list.innerHTML=shown.map(n=>{const cs=COURSES.filter(c=>c.speakers.includes(n));return `<div class="col-md-6 col-xl-4"><article class="speaker-card"><h3>${esc(n)}</h3>${cs.map(c=>`<div class="border-top pt-2 mt-2"><span class="badge badge-series">${esc(c.series)} ${esc(c.no)}</span><div class="fw-bold mt-1">${esc(c.title)}</div><div class="meta">${fmt(c)}</div></div>`).join('')}</article></div>`}).join('')||`<div class="col-12"><div class="empty">找不到講員</div></div>`;
  }
  q.addEventListener('input',render); render();
}
loadCourses();
