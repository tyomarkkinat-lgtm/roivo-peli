// ROIVO Business Survival · 02 CONNECT (putkipeli: tieto liikkeelle järjestelmästä toiseen)
{
const R=window.RBS,{SAVE,eur,SFX,DIFF,LEVELS,$}=R;
const N=1,E=2,S=4,W=8,OPP={1:4,2:8,4:1,8:2},DXY={1:[0,-1],2:[1,0],4:[0,1],8:[-1,0]};
const PIECES={H:E|W,V:N|S,NE:N|E,NW:N|W,SE:S|E,SW:S|W,X:15};
const PAIRS=[['CRM','Laskutus'],['Verkkokauppa','ERP'],['Tuotanto','Varasto'],['Myynti','Laskutus'],['Vanha CRM','ERP'],['Ostetun yhtiön kirjanpito','Talous'],['HR','Palkat']];
const PCOL=['#8FC9AE','#E5B65D','#FFC99C'];
const ROUNDS=[
  {name:'Yhdistä myynti ja laskutus',pairs:[[0,'CRM','Laskutus']],blocks:0,t0:28,cell:2.3,
   news:['Rakenna putkisto lähdejärjestelmästä kohteeseen ennen kuin data lähtee liikkeelle.','Napauta ruutua: seuraava pala asettuu siihen. Valmiin palan voi korvata, mutta se maksaa.','Jos tieto vuotaa putken päästä, se muuttuu käsityöksi ja prosessi epäonnistuu.']},
  {name:'Poista manuaaliset tiedonsiirrot',pairs:[[1,'Verkkokauppa','ERP']],blocks:4,t0:25,cell:2.1,
   news:['Kentällä on manuaalisia Excel-siirtoja. Niiden läpi putkea ei voi rakentaa.','Tehokkuus laskee jokaisesta palasta, jonka läpi tieto ei kulje.']},
  {name:'Yhdistä tuotanto ja varastonhallinta',pairs:[[2,'Tuotanto','Varasto'],[3,'Myynti','Laskutus']],blocks:3,t0:30,cell:2.0,
   news:['Kaksi tietovirtaa käynnistyy yhtä aikaa. Kumpikin pitää ohjata omaan kohteeseensa.','Risteyspala päästää kaksi virtaa toistensa läpi.']},
  {name:'Automatisoi useita prosesseja',pairs:[[1,'Verkkokauppa','ERP'],[6,'HR','Palkat']],blocks:5,t0:27,cell:1.75,
   news:['Virtaus on nopeampi ja esteitä on enemmän.','Väärään järjestelmään päätyvä tieto lasketaan vuodoksi.']},
  {name:'Yritysoston järjestelmät',pairs:[[4,'Vanha CRM','ERP'],[5,'Ostettu kirjanpito','Talous'],[3,'Myynti','Laskutus']],blocks:5,t0:34,cell:1.6,
   news:['Yritysoston mukana tuli kolme järjestelmää, jotka pitää liittää omiin.','Vanhat järjestelmät ja Excel-siirrot täyttävät kenttää.']}
];
const UPG=[
  {id:'auto',name:'Automaatio',max:3,price:[300,500,750],desc:l=>`Virtaus alkaa ${(l+1)*4} sekuntia myöhemmin.`},
  {id:'map',name:'Prosessikartoitus',max:2,price:[400,700],desc:l=>`Purkaa ${l+1} manuaalista siirtoa ennen prosessin alkua.`},
  {id:'lib',name:'Integraatiokirjasto',max:3,price:[250,450,650],desc:l=>`Voit ohittaa ${l+1} palaa prosessin aikana.`},
  {id:'buf',name:'Puskurointi',max:2,price:[350,600],desc:l=>`Tieto liikkuu ${(l+1)*12} % hitaammin.`},
  {id:'api',name:'Rajapintastandardi',max:1,price:[450],desc:()=>'Risteyspaloja tulee useammin ja palan korvaaminen maksaa puolet vähemmän.'}
];
const HUMOR=['Integraatio toimii, kunhan kukaan ei avaa Exceliä.','Tieto kulkee. Kukaan ei tiedä mihin.',...R.C.humor];
const S_=64; // logiikan ruutukoko
let api,G=null,raf=0,last=0,running=false;
const W2=()=>SAVE.w2,lv=id=>W2().up[id]||0;

function start(){
  api=R.mkScreen('w-connect','CONNECT','connect');
  api.stats([{k:'cash',label:'Kassa'},{k:'cd',label:'Virtaus alkaa'},{k:'eff',label:'Tehokkuus',bar:1},{k:'proc',label:'Käsitellyt'}]);
  api.el.querySelector('.pz').onclick=()=>running&&pause();
  R.show('w-connect');requestAnimationFrame(intro);
}
function stop(){running=false;cancelAnimationFrame(raf)}
function intro(){
  const r=W2().round,RD=ROUNDS[r];
  R.showPanel(`<div class="kick">CONNECT · Prosessi ${r+1}/5</div><h2>${RD.name}</h2><ul>${RD.news.map(n=>`<li>${n}</li>`).join('')}</ul>
  <div class="tip"><b>Roivon havainto</b>${['Kun järjestelmät eivät keskustele keskenään, tieto kulkee ihmisten kautta: kopioimalla, liittämällä ja sähköpostilla.','Jokainen manuaalinen tiedonsiirto on piilokustannus ja virheen paikka. Ne löytyvät, kun prosessi kartoitetaan.','Integraatio ilman omistajaa toimii, kunnes jokin muuttuu. Sen jälkeen kukaan ei tiedä, kenen asia korjaus on.','Automaatio kannattaa rakentaa vasta, kun prosessi on selvä. Muuten automatisoidaan sekava tapa toimia.','Yritysostossa järjestelmien yhteensopivuus selviää usein vasta kaupan jälkeen. Roivon IT360-kartoitus tekee sen näkyväksi etukäteen.'][r]}</div>
  <p class="small">Napauta tai klikkaa ruutua asettaaksesi seuraavan palan. Kun putki on valmis, käynnistä virtaus itse ja saat bonuksen jäljellä olevasta ajasta.</p>
  <div class="row"><button class="btn" id="go">Aloita prosessi</button><button class="btn ghost" id="toHub">Päävalikkoon</button></div>`);
  $('#go').onclick=()=>{R.hidePanel();newRound()};$('#toHub').onclick=R.toHub;
}
function rnd(n){return Math.floor(Math.random()*n)}
function newPiece(){const x=lv('api')?.16:.08,r=Math.random();if(r<x)return'X';const t=['H','V','NE','NW','SE','SW'],w=[1.25,1.25,1,1,1,1];let a=Math.random()*w.reduce((p,q)=>p+q);for(let i=0;i<t.length;i++){a-=w[i];if(a<=0)return t[i]}return'H'}
function layout(){
  const st=api.stage,land=st.clientWidth>=st.clientHeight*.9;
  const COLS=land?10:7,ROWS=land?6:8;
  const qW=land?S_*1.7:0,qH=land?0:S_*1.5;
  return{COLS,ROWS,land,qW,qH,W:COLS*S_+qW,H:ROWS*S_+qH};
}
function newRound(){
  const r=W2().round,RD=ROUNDS[r],D=DIFF[SAVE.diff],L=layout();
  const fc=R.fitCanvas(api,L.W,L.H);
  G={r,RD,D,L,x:fc.x,sc:fc.sc,t:0,cash0:SAVE.cash,grid:[],srcs:[],tgts:[],flows:[],queue:[],phase:'build',
    cd:RD.t0+lv('auto')*4,cellT:RD.cell/D.speed*(1+lv('buf')*.12),skips:lv('lib'),placed:0,used:0,proc:0,fast:false,hover:null,floats:[],
    stats:W2().stats||{fails:0,eff:[],replaced:0,cdBonus:0}};
  for(let y=0;y<L.ROWS;y++){G.grid.push([]);for(let x=0;x<L.COLS;x++)G.grid[y].push(null)}
  // lähteet ja kohteet
  const rows=a=>{const s=new Set();while(s.size<a)s.add(rnd(L.ROWS));return[...s]};
  let ok=false,tries=0;
  while(!ok&&tries++<60){
    const sr=rows(RD.pairs.length),tr=rows(RD.pairs.length);
    G.srcs=RD.pairs.map((p,i)=>({x:0,y:sr[i],label:p[1],pair:i}));G.tgts=RD.pairs.map((p,i)=>({x:L.COLS-1,y:tr[i],label:p[2],pair:i}));
    for(let y=0;y<L.ROWS;y++)for(let x=0;x<L.COLS;x++)G.grid[y][x]=null;
    let b=RD.blocks;while(b>0){const x=1+rnd(L.COLS-2),y=rnd(L.ROWS);if(!G.grid[y][x]&&!(x===1&&G.srcs.some(s=>s.y===y))&&!(x===L.COLS-2&&G.tgts.some(t=>t.y===y))){G.grid[y][x]={block:true,legacy:r>=4&&Math.random()<.5};b--}}
    ok=G.srcs.every((s,i)=>reach(s.y,G.tgts[i].y));
  }
  // prosessikartoitus purkaa esteitä
  let m=lv('map');for(let y=0;y<L.ROWS&&m>0;y++)for(let x=0;x<L.COLS&&m>0;x++)if(G.grid[y][x]&&G.grid[y][x].block){G.grid[y][x]=null;m--}
  for(let i=0;i<6;i++)G.queue.push(newPiece());
  api.clearLog();
  if(lv('map'))api.log('ok',`Prosessikartoitus purki ${Math.min(lv('map'),RD.blocks)} manuaalista siirtoa.`);
  if(RD.blocks-lv('map')>0)api.log('warn',R.C.log.excel);
  api.log('info',`Rakenna yhteys: ${RD.pairs.map(p=>p[1]+' → '+p[2]).join(', ')}.`);
  api.round(`Prosessi ${r+1}/5<span class="rn"> · ${RD.name}</span>`);
  ctrls();running=true;last=performance.now();cancelAnimationFrame(raf);raf=requestAnimationFrame(loop);
}
function reach(sy,ty){ // onko polku olemassa esteiden ohi
  const L=G.L,seen=new Set([1+','+sy]),q=[[1,sy]];
  while(q.length){const [x,y]=q.shift();if(G.grid[y][x]&&G.grid[y][x].block)continue;if(x===L.COLS-2&&y===ty)return true;
    for(const d of[1,2,4,8]){const nx=x+DXY[d][0],ny=y+DXY[d][1];if(nx<1||nx>L.COLS-2||ny<0||ny>=L.ROWS||seen.has(nx+','+ny))continue;seen.add(nx+','+ny);q.push([nx,ny])}}
  return false;
}
function ctrls(){
  const c=api.ctrl(`<button id="cGo">${G.phase==='build'?'Käynnistä virtaus':'Kiihdytä'}</button><button id="cSkip" ${G.skips?'':'disabled'}>Ohita pala (${G.skips})</button>`);
  c.querySelector('#cGo').onclick=()=>{if(G.phase==='build')startFlow(true);else{G.fast=!G.fast;c.querySelector('#cGo').classList.toggle('on',G.fast)}};
  c.querySelector('#cSkip').onclick=skip;
  const fc=R.fitCanvas(api,G.L.W,G.L.H);G.x=fc.x;G.sc=fc.sc;
}
function skip(){if(!G||G.skips<=0||!running)return;G.skips--;G.queue.shift();G.queue.push(newPiece());SFX.buy();api.log('info','Integraatiokirjastosta valittiin toinen ratkaisu.');ctrls()}
function startFlow(manual){
  if(G.phase!=='build')return;G.phase='flow';
  if(manual&&G.cd>0){const b=Math.round(G.cd*10*G.D.cash);SAVE.cash+=b;G.stats.cdBonus+=b;api.log('ok',`Virtaus käynnistetty etuajassa. Bonus ${eur(b)}.`)}
  G.cd=0;G.flows=G.srcs.map(s=>({pair:s.pair,x:0,y:s.y,entry:W,exit:E,prog:0,done:false}));
  api.log('warn','Data liikkuu. Työjono purkautuu putkiston kautta.');SFX.warn();ctrls();
}
function exitOf(type,entry){if(type==='X')return OPP[entry];const m=PIECES[type]&~entry;return m}
function loop(now){
  if(!running)return;const dt=Math.min(.05,(now-last)/1000);last=now;update(dt);if(running){draw();raf=requestAnimationFrame(loop)}
}
function update(dt){
  G.t+=dt;G.floats=G.floats.filter(f=>(f.l-=dt)>0);
  if(G.phase==='build'){G.cd-=dt;if(G.cd<=0)startFlow(false)}
  else{
    const sp=G.fast?3.2:1;
    for(const f of G.flows){if(f.done)continue;f.prog+=dt*sp/G.cellT;
      if(f.prog>=1){f.prog=0;advance(f);if(!running)return}}
    if(G.flows.every(f=>f.done))return roundDone();
  }
  if(Math.random()<dt/25)api.log('info',HUMOR[rnd(HUMOR.length)]);
  hud();
}
function advance(f){
  const L=G.L,[dx,dy]=DXY[f.exit],nx=f.x+dx,ny=f.y+dy,ent=OPP[f.exit];
  const tg=G.tgts.find(t=>t.x===nx&&t.y===ny);
  if(tg){if(tg.pair===f.pair&&ent===W){f.done=true;f.x=nx;f.y=ny;const b=Math.round(250*(1+G.r*.2)*G.D.cash);SAVE.cash+=b;api.log('ok',`${R.C.log.integrationOk} ${G.RD.pairs[f.pair][1]} → ${G.RD.pairs[f.pair][2]}, bonus ${eur(b)}.`);SFX.win();return}
    return leak(`Tieto päätyi väärään järjestelmään (${tg.label})`)}
  if(nx<1||ny<0||ny>=L.ROWS||nx>L.COLS-2)return leak('Putki päättyi kentän reunaan');
  const c=G.grid[ny][nx];
  if(!c)return leak('Putki päättyi tyhjään');
  if(c.block)return leak('Tieto törmäsi manuaaliseen Excel-siirtoon');
  if(!(PIECES[c.type]&ent))return leak('Palat eivät sovi yhteen');
  if(c.type==='X'){const ax=(ent===E||ent===W)?'h':'v';c.ax=c.ax||{};if(c.ax[ax])return leak('Risteys oli jo käytössä');c.ax[ax]=f.pair+1}
  else{if(c.fill)return leak('Kaksi virtaa samassa putkessa');}
  if(!c.fill){G.used++}
  c.fill=c.fill||[];c.fill.push({pair:f.pair,entry:ent,exit:exitOf(c.type,ent)});
  f.x=nx;f.y=ny;f.entry=ent;f.exit=exitOf(c.type,ent);
  const v=Math.round(30*(1+G.r*.15)*G.D.cash);SAVE.cash+=v;G.proc++;G.floats.push({x:(nx+.5)*S_+G.L.qW,y:ny*S_+G.L.qH+10,t:'+'+v+' €',l:.9});SFX.coin();
}
function leak(why){
  running=false;G.stats.fails++;W2().stats=G.stats;SAVE.cash=G.cash0;R.persist();SFX.hit();R.track('round_fail',{world:2,round:G.r+1});
  draw();
  R.showPanel(`<div class="kick">CONNECT · Prosessi ${G.r+1}/5</div><h2>Tieto vuoti käsityöksi</h2><p>${why}. Joku joutuu nyt siirtämään tiedot käsin. Kassa palautuu prosessin alun tilanteeseen.</p><p class="small">Vinkki: rakenna putki ensin valmiiksi ja käynnistä virtaus vasta sitten. Ohita sopimattomat palat integraatiokirjastolla.</p><div class="row"><button class="btn" id="again">Yritä uudelleen</button><button class="btn ghost" id="hbx">Päävalikkoon</button></div>`);
  $('#again').onclick=()=>{R.hidePanel();newRound()};$('#hbx').onclick=R.toHub;
}
function eff(){return G.placed?Math.round(G.used/G.placed*100):100}
function hud(){
  api.set('cash',eur(SAVE.cash));
  api.set('cd',G.phase==='build'?Math.ceil(G.cd)+' s':'Käynnissä');
  const e=eff();api.set('eff',e+' %',e,e<50?'var(--terra)':e<75?'var(--gold)':'var(--green)');
  api.set('proc',G.proc+' tilausta');
}
function roundDone(){
  running=false;const e=eff();G.stats.eff.push(e);
  const bonus=Math.round(e*5*G.D.cash);SAVE.cash+=bonus;
  const w=W2();w.score+=Math.max(100,Math.round(G.proc*60+e*25+G.stats.cdBonus/4));w.stats=G.stats;w.round=G.r+1;w.time=(w.time||0)+G.t;
  R.track('round_complete',{world:2,round:G.r+1,secs:Math.round(G.t)});R.persist();draw();
  if(w.round>=5)return finish();
  R.shop2({wk:'w2',kick:`Prosessi ${w.round}/5 valmis · Tehokkuusbonus +${eur(bonus)}`,title:`Investoi ennen prosessia ${w.round+1}`,text:'Parannukset ovat pysyviä koko Connect-maailman ajan.',
    upg:UPG,lv,buy:id=>{w.up[id]=lv(id)+1},next:`Prosessi ${w.round+1}: ${ROUNDS[w.round].name}`,onNext:intro});
}
function finish(){
  const w=W2();w.done=true;w.best=Math.max(w.best||0,w.score);R.track('world_complete',{world:2,score:w.score,mins:Math.round((w.time||0)/60)});R.persist();
  const s=w.stats,avgE=s.eff.length?s.eff.reduce((a,b)=>a+b,0)/s.eff.length:60;
  const upTot=UPG.reduce((a,u)=>a+lv(u.id)/u.max,0)/UPG.length;
  const v=avgE*.5+Math.max(0,100-s.fails*15)*.3+upTot*100*.2,idx=v<35?0:v<50?1:v<65?2:v<80?3:4;
  const [pName,pText]=avgE>=80?['Integraattori','Rakensit lyhyitä ja siistejä yhteyksiä ilman turhia paloja.']:s.fails>=3?['Kokeilija','Opit virheistä. Jokainen vuoto näytti, missä tieto pysähtyy.']:lv('map')+lv('auto')>=3?['Prosessikehittäjä','Selvitit ensin prosessin ja automatisoit vasta sitten.']:['Tasapainoinen IT-johtaja','Yhdistit järjestelmät ja pidit työjonon hallinnassa.'];
  R.worldEnd({key:'w2',num:'02',world:'Connect',title:'Data Connector',img:'connect',score:w.score,idx,pName,pText,next:'Optimize',
    dims:{prod:avgE,sec:100-s.fails*15,cost:100-(s.replaced||0)*6},
    line:'Sain tiedon liikkumaan ilman manuaalisia siirtoja.',levelNote:'Taso lasketaan tehokkuudesta, vuodoista ja investoinneista.',
    real:[`<b>Manuaaliset siirrot.</b> Keskimääräinen tehokkuutesi oli ${Math.round(avgE)} %. Oikeassa yrityksessä jokainen kopioi ja liitä -vaihe on työtä, jota kukaan ei laske kustannukseksi.`,
      `<b>Prosessikartoitus.</b> ${lv('map')?'Purit esteitä ennen rakentamista.':'Rakensit esteiden ympäri ilman kartoitusta.'} Roivon IT360-kartoitus näyttää, missä tieto pysähtyy ja mitkä järjestelmät eivät keskustele keskenään.`,
      `<b>Omistajuus.</b> Pelissä yksi vuoto pysäytti koko prosessin. Roivo määrittää jokaiselle integraatiolle omistajan, jotta vika korjataan ennen kuin työjono kasvaa.`]});
}
function pause(){running=false;R.showPanel(`<div class="kick">Tauko</div><h2>Prosessi pysäytetty</h2>${R.note('w2')}<div class="row"><button class="btn" id="res">Jatka</button><button class="btn ghost" id="rst">Aloita prosessi alusta</button><button class="btn ghost" id="hb">Päävalikkoon</button></div>`);
  $('#res').onclick=()=>{R.hidePanel();running=true;last=performance.now();raf=requestAnimationFrame(loop)};$('#rst').onclick=()=>{SAVE.cash=G.cash0;R.hidePanel();newRound()};$('#hb').onclick=()=>{SAVE.cash=G.cash0;R.persist();R.toHub()}}

// ---------- syöte ----------
function cellAt(e){const r=api.cv.getBoundingClientRect(),lx=(e.clientX-r.left)/G.sc-G.L.qW,ly=(e.clientY-r.top)/G.sc-G.L.qH;return[Math.floor(lx/S_),Math.floor(ly/S_)]}
function place(x,y){
  const L=G.L;if(x<1||x>L.COLS-2||y<0||y>=L.ROWS)return;
  const c=G.grid[y][x];if(c&&(c.block||c.fill))return;
  if(G.flows.some(f=>!f.done&&f.x===x&&f.y===y))return;
  if(c){const cost=Math.round((lv('api')?20:40)/G.D.cash);SAVE.cash=Math.max(0,SAVE.cash-cost);G.stats.replaced++;G.placed--;api.log('warn',`Rakennettiin uudelleen. Kustannus ${eur(cost)}.`)}
  G.grid[y][x]={type:G.queue.shift()};G.queue.push(newPiece());G.placed++;SFX.buy();
}
addEventListener('pointerdown',e=>{if(!G||!running||e.target!==api.cv)return;const [x,y]=cellAt(e);place(x,y)});
addEventListener('pointermove',e=>{if(!G||e.target!==api.cv)return;G.hover=cellAt(e)});
addEventListener('keydown',e=>{if(!api||!api.el.classList.contains('on')||$('#ov').classList.contains('on'))return;
  if(e.key==='p'||e.key==='Escape'){running&&pause()}
  if(e.key===' '&&running){e.preventDefault();G.phase==='build'?startFlow(true):(G.fast=!G.fast)}
  if((e.key==='s'||e.key==='S')&&running)skip()});
addEventListener('resize',()=>{if(G&&running&&api.el.classList.contains('on')){const L=layout();if(L.land!==G.L.land){running=false;SAVE.cash=G.cash0;intro()}else{const fc=R.fitCanvas(api,G.L.W,G.L.H);G.x=fc.x;G.sc=fc.sc}}});
document.addEventListener('visibilitychange',()=>{if(document.hidden&&running&&api.el.classList.contains('on'))pause()});

// ---------- piirto ----------
const MID={1:[.5,0],2:[1,.5],4:[.5,1],8:[0,.5]};
function bez(p0,c,p2,t){const u=1-t;return[u*u*p0[0]+2*u*t*c[0]+t*t*p2[0],u*u*p0[1]+2*u*t*c[1]+t*t*p2[1]]}
function seg(x,px,py,a,b,w,col,t1=1){ // a,b sivut
  const p0=[px+MID[a][0]*S_,py+MID[a][1]*S_],p2=[px+MID[b][0]*S_,py+MID[b][1]*S_],c=[px+S_/2,py+S_/2];
  x.strokeStyle=col;x.lineWidth=w;x.beginPath();x.moveTo(...p0);const n=12;for(let i=1;i<=n*t1;i++)x.lineTo(...bez(p0,c,p2,i/n));if(t1<1)x.lineTo(...bez(p0,c,p2,t1));x.stroke();
}
function sides(m){return[1,2,4,8].filter(d=>m&d)}
function drawPiece(x,type,px,py,alpha=1){
  x.globalAlpha=alpha;x.lineCap='round';
  const pairs=type==='X'?[[N,S],[E,W]]:[sides(PIECES[type])];
  for(const [a,b] of pairs){seg(x,px,py,a,b,S_*.38,'#5a2c24');seg(x,px,py,a,b,S_*.28,'#b8613f');seg(x,px,py,a,b,S_*.08,'rgba(255,201,156,.45)')}
  // laipat
  for(const d of sides(PIECES[type])){const [mx,my]=MID[d];x.fillStyle='#DC7B60';const hor=d===E||d===W;x.fillRect(px+mx*S_-(hor?3:S_*.22),py+my*S_-(hor?S_*.22:3),hor?6:S_*.44,hor?S_*.44:6)}
  x.globalAlpha=1;
}
function draw(){
  const x=G.x,L=G.L,ox=L.qW,oy=L.qH;
  x.clearRect(0,0,L.W,L.H);
  // jono
  x.fillStyle='rgba(7,3,28,.88)';x.fillRect(0,0,L.land?L.qW:L.W,L.land?L.H:L.qH);
  x.fillStyle='#E5B65D';x.font='700 13px Figtree';x.textAlign='left';x.fillText('SEURAAVA',L.land?12:10,L.land?24:18);
  const qn=L.land?5:6;
  for(let i=0;i<qn;i++){const sc=i===0?.95:.62,sz=S_*sc;let px,py;
    if(L.land){px=(L.qW-sz)/2;py=34+(i===0?0:S_*.95+(i-1)*S_*.72)}else{px=10+(i===0?0:S_*1.05+(i-1)*S_*.75);py=24}
    x.save();x.translate(px,py);x.scale(sc,sc);if(i===0){x.strokeStyle='#E5B65D';x.lineWidth=2/sc;x.strokeRect(2,2,S_-4,S_-4)}drawPiece(x,G.queue[i],0,0,i===0?1:.7);x.restore()}
  x.save();x.translate(ox,oy);
  x.fillStyle='rgba(11,6,40,.82)';x.fillRect(0,0,L.COLS*S_,L.ROWS*S_);
  x.fillStyle='rgba(255,201,156,.04)';for(let y=0;y<L.ROWS;y++)for(let c=1;c<L.COLS-1;c++)if((y+c)%2)x.fillRect(c*S_,y*S_,S_,S_);
  x.strokeStyle='rgba(255,201,156,.08)';x.lineWidth=1;x.beginPath();for(let c=1;c<L.COLS;c++){x.moveTo(c*S_,0);x.lineTo(c*S_,L.ROWS*S_)}for(let y=1;y<L.ROWS;y++){x.moveTo(S_,y*S_);x.lineTo((L.COLS-1)*S_,y*S_)}x.stroke();
  // hover
  if(G.hover&&G.phase&&running){const [hx,hy]=G.hover;if(hx>=1&&hx<=L.COLS-2&&hy>=0&&hy<L.ROWS){const c=G.grid[hy][hx];if(!c||(!c.block&&!c.fill)){drawPiece(x,G.queue[0],hx*S_,hy*S_,.35);x.strokeStyle='rgba(229,182,93,.6)';x.strokeRect(hx*S_+1,hy*S_+1,S_-2,S_-2)}}}
  for(let y=0;y<L.ROWS;y++)for(let c=0;c<L.COLS;c++){const cell=G.grid[y][c];if(!cell)continue;const px=c*S_,py=y*S_;
    if(cell.block){x.fillStyle=cell.legacy?'rgba(120,100,90,.35)':'rgba(220,123,96,.16)';x.fillRect(px+6,py+6,S_-12,S_-12);x.strokeStyle=cell.legacy?'#8a7a70':'#DC7B60';x.setLineDash([4,3]);x.strokeRect(px+6,py+6,S_-12,S_-12);x.setLineDash([]);
      x.fillStyle=cell.legacy?'#b9a3a0':'#DC7B60';x.font='700 11px Figtree';x.textAlign='center';x.fillText(cell.legacy?'VANHA':'EXCEL',px+S_/2,py+S_/2-2);x.font='400 10px Figtree';x.fillText(cell.legacy?'järjestelmä':'käsin',px+S_/2,py+S_/2+11);continue}
    drawPiece(x,cell.type,px,py);
    if(cell.fill)for(const f of cell.fill){const fl=G.flows.find(q=>q.pair===f.pair&&q.x===c&&q.y===y&&!q.done&&q.entry===f.entry);x.shadowColor=PCOL[f.pair];x.shadowBlur=10;seg(x,px,py,f.entry,f.exit,S_*.16,PCOL[f.pair],fl?fl.prog:1);x.shadowBlur=0}
  }
  // lähteet ja kohteet
  const box=(o,isSrc)=>{const px=o.x*S_,py=o.y*S_,col=PCOL[o.pair];
    x.fillStyle='rgba(22,15,58,.95)';x.strokeStyle=col;x.lineWidth=2;R.rr(x,px+4,py+8,S_-8,S_-16,8);x.fill();x.stroke();
    x.fillStyle=col;x.fillRect(isSrc?px+S_-6:px,py+S_/2-7,6,14);
    x.font='800 11px Figtree';x.textAlign='center';x.fillStyle='#f6e7da';const words=o.label.split(' ');words.forEach((w,i)=>x.fillText(w,px+S_/2,py+S_/2+4+(i-(words.length-1)/2)*12));
    if(isSrc&&G.phase==='build'){x.globalAlpha=.4+.4*Math.sin(G.t*6);x.strokeStyle=col;x.strokeRect(px+1,py+4,S_-2,S_-8);x.globalAlpha=1}};
  G.srcs.forEach(s=>box(s,true));G.tgts.forEach(t=>box(t,false));
  // lähdön virta
  for(const f of G.flows)if(f.x===0&&!f.done){x.strokeStyle=PCOL[f.pair];x.lineWidth=S_*.16;x.beginPath();x.moveTo(S_-6,f.y*S_+S_/2);x.lineTo(S_-6+6*f.prog,f.y*S_+S_/2);x.stroke()}
  if(G.phase==='build'){const tx=`Virtaus alkaa ${Math.ceil(G.cd)} s`;x.font='800 15px Figtree';const tw=x.measureText(tx).width+24;x.fillStyle='rgba(7,3,28,.85)';R.rr(x,L.COLS*S_/2-tw/2,-2,tw,24,8);x.fill();x.fillStyle='#E5B65D';x.textAlign='center';x.fillText(tx,L.COLS*S_/2,15)}
  x.textAlign='center';x.font='800 14px Figtree';for(const f of G.floats){x.globalAlpha=Math.min(1,f.l*1.6);x.fillStyle='#E5B65D';x.fillText(f.t,f.x-ox,f.y-oy-(0.9-f.l)*24)}x.globalAlpha=1;
  x.restore();
}
R.worlds.w2={start,stop};
}
