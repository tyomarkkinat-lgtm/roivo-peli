// ROIVO Business Survival · 03 OPTIMIZE (putoavat IT-palikat, omat muodot)
{
const R=window.RBS,{SAVE,eur,SFX,DIFF,$}=R;
const BW=10,BH=18,C=32,PW=5; // ruudukko, ruudun koko, sivupaneelin leveys ruutuina
const TYPES={
  dev:{name:'Laite',cells:[[0,0],[1,0]],col:'#8b6fb3',cost:40},
  lic:{name:'Lisenssi',cells:[[0,0],[1,0],[2,0]],col:'#E5B65D',cost:60},
  cloud:{name:'Pilvipalvelu',cells:[[0,0],[1,0],[0,1]],col:'#6fa58a',cost:80},
  db:{name:'Tietokanta',cells:[[0,0],[1,0],[0,1],[1,1],[0,2]],col:'#5f8fb0',cost:120},
  team:{name:'Tiimisovellus',cells:[[0,0],[2,0],[0,1],[1,1],[2,1]],col:'#c06a5a',cost:100},
  contract:{name:'Jäykkä 5 v sopimus',cells:[[0,0],[1,0],[2,0],[3,0],[4,0]],col:'#7d7480',cost:150,rigid:true}
};
const ROUNDS=[
  {name:'Ensimmäiset hankinnat',goal:5,grav:.85,debt:0,price:0,budget:2400,contract:0,
   news:['Putoavat palikat ovat yrityksen IT-hankintoja. Täysi rivi poistaa päällekkäisiä kustannuksia ja vapauttaa rahaa.','Jokainen hankinta kasvattaa kuukausikustannuksia. Pidä ne budjetissa.','Kilpailuta: vaihda nykyinen hankinta toiseen.']},
  {name:'Sopimukset kasautuvat',goal:6,grav:.74,debt:30,price:0,budget:2600,contract:.1,
   news:['Jäykät viiden vuoden sopimukset eivät käänny. Niille pitää tehdä tilaa.','Tekninen velka nostaa kentän pohjalle esteitä.']},
  {name:'Pilvihinnat nousevat',goal:7,grav:.64,debt:25,price:18,budget:2800,contract:.12,
   news:['Hintojen nousu pudottaa kentälle ylimääräisiä palikoita.']},
  {name:'Hajautunut IT',goal:8,grav:.55,debt:20,price:14,budget:3000,contract:.14,
   news:['Hankintoja tulee nopeammin ja velka kasvaa tiheämmin.']},
  {name:'Budjettileikkaus',goal:9,grav:.47,debt:16,price:11,budget:2300,contract:.16,
   news:['IT-budjettia leikataan, vaikka järjestelmiä tulee lisää.','Budjetin ylitys puolittaa säästöt.']}
];
const UPG=[
  {id:'comp',name:'Kilpailutus',max:3,price:[300,500,750],desc:l=>`Voit kilpailuttaa ${l+2} hankintaa kierroksessa.`},
  {id:'arch',name:'Arkkitehtuuri',max:2,price:[300,550],desc:l=>`Näet ${l+2} tulevaa hankintaa etukäteen.`},
  {id:'debt',name:'Teknisen velan purku',max:2,price:[400,700],desc:l=>`Tekninen velka kasvaa ${(l+1)*30} % hitaammin.`},
  {id:'cloud',name:'Pilvisopimusten hallinta',max:2,price:[350,600],desc:l=>`Hinnannousuja tulee ${(l+1)*35} % harvemmin.`},
  {id:'auto',name:'Automaatio',max:3,price:[300,500,800],desc:l=>`Rivien säästöt kasvavat ${(l+1)*20} %.`}
];
const HUMOR=['Lisenssi löytyi henkilöltä, joka lähti 2021.',...R.C.humor];
let api,G=null,raf=0,last=0,running=false;
const W3=()=>SAVE.w3,lv=id=>W3().up[id]||0;

function start(){
  api=R.mkScreen('w-optimize','OPTIMIZE','optimize');
  api.stats([{k:'cash',label:'Kassa'},{k:'rows',label:'Rivit',bar:1},{k:'cost',label:'IT-kustannukset'},{k:'save',label:'Säästöt'}]);
  api.el.querySelector('.pz').onclick=()=>running&&pause();
  R.show('w-optimize');requestAnimationFrame(intro);
}
function stop(){running=false;cancelAnimationFrame(raf)}
function intro(){
  const r=W3().round,RD=ROUNDS[r];
  R.showPanel(`<div class="kick">OPTIMIZE · Kierros ${r+1}/5</div><h2>${RD.name}</h2><ul>${RD.news.map(n=>`<li>${n}</li>`).join('')}</ul>
  <div class="tip"><b>Roivon havainto</b>${['Pk-yrityksen IT-kulut kasvavat usein huomaamatta: yksi lisenssi kerrallaan, eri yksiköissä, eri korteilla.','Pitkä sopimus voi olla halpa ensimmäisenä vuonna ja kallis viidentenä. Sopimuksen joustavuus on osa hintaa.','Pilvipalveluiden hinnat muuttuvat. Ilman seurantaa korotus näkyy vasta kirjanpidossa.','Päällekkäiset järjestelmät syntyvät, kun hankintoja tehdään ilman kokonaiskuvaa.','Kun budjetti kiristyy, säästöt löytyvät nopeimmin sieltä, missä on päällekkäisyyttä. Roivo kilpailuttaa IT-toimittajat ja karsii päällekkäisyydet.'][r]}</div>
  <p class="small">Tavoite: ${RD.goal} täyttä riviä. Budjetti ${eur(RD.budget)}/kk. Ohjaus: nuolet, ylös kääntää, välilyönti pudottaa, C kilpailuttaa. Puhelimessa painikkeet tai pyyhkäisy.</p>
  <div class="row"><button class="btn" id="go">Aloita kierros</button><button class="btn ghost" id="toHub">Päävalikkoon</button></div>`);
  $('#go').onclick=()=>{R.hidePanel();newRound()};$('#toHub').onclick=R.toHub;
}
function rnd(n){return Math.floor(Math.random()*n)}
function pickType(){const RD=G.RD;if(Math.random()<RD.contract)return'contract';const t=['dev','lic','cloud','db','team'],w=[.22,.24,.24,.16,.14];let a=Math.random();for(let i=0;i<t.length;i++){a-=w[i];if(a<=0)return t[i]}return'lic'}
function norm(cells){const mx=Math.min(...cells.map(c=>c[0])),my=Math.min(...cells.map(c=>c[1]));return cells.map(([x,y])=>[x-mx,y-my])}
function mkPiece(t){const cells=norm(TYPES[t].cells);const w=Math.max(...cells.map(c=>c[0]))+1;return{t,cells,x:Math.floor((BW-w)/2),y:0}}
function newRound(){
  const r=W3().round,RD=ROUNDS[r],D=DIFF[SAVE.diff];
  const fc=R.fitCanvas(api,(BW+PW)*C,BH*C);
  G={r,RD,D,x:fc.x,sc:fc.sc,t:0,cash0:SAVE.cash,board:Array.from({length:BH},()=>Array(BW).fill(null)),
    next:[],cur:null,acc:0,grav:RD.grav/D.speed,rows:0,cost:0,saved:0,swaps:1+lv('comp'),
    nextDebt:RD.debt?RD.debt*(1+lv('debt')*.3):1e9,nextPrice:RD.price?RD.price*(1+lv('cloud')*.35):1e9,flash:[],floats:[],lockDelay:0,
    stats:W3().stats||{fails:0,over:[],swapsUsed:0}};
  for(let i=0;i<4;i++)G.next.push(pickType());
  spawn();api.clearLog();api.log('info',`Budjetti ${eur(RD.budget)}/kk. Tavoite ${RD.goal} riviä.`);
  api.round(`Kierros ${r+1}/5<span class="rn"> · ${RD.name}</span>`);ctrls();
  running=true;last=performance.now();cancelAnimationFrame(raf);raf=requestAnimationFrame(loop);
}
function ctrls(){
  const c=api.ctrl(`<button data-a="L" aria-label="Vasen">◀</button><button data-a="rot" aria-label="Käännä">⟳</button><button data-a="R" aria-label="Oikea">▶</button><button data-a="soft" aria-label="Alas">▼</button><button data-a="hard" aria-label="Pudota">⤓</button><button data-a="swap">Kilpailuta (${G.swaps})</button>`);
  c.querySelectorAll('button').forEach(b=>b.addEventListener('pointerdown',e=>{e.preventDefault();act(b.dataset.a)}));
  const fc=R.fitCanvas(api,(BW+PW)*C,BH*C);G.x=fc.x;G.sc=fc.sc;
}
function fits(p,dx=0,dy=0,cells=p.cells){return cells.every(([cx,cy])=>{const x=p.x+cx+dx,y=p.y+cy+dy;return x>=0&&x<BW&&y<BH&&(y<0||!G.board[y][x])})}
function spawn(){
  G.cur=mkPiece(G.next.shift());G.next.push(pickType());G.lockDelay=0;
  if(!fits(G.cur))return fail();
}
function rotate(){
  const p=G.cur;if(TYPES[p.t].rigid){api.log('warn','Jäykkää sopimusta ei voi muuttaa kesken kauden.');SFX.warn();return}
  const rc=norm(p.cells.map(([x,y])=>[-y,x]));
  for(const k of[0,-1,1,-2,2])if(fits(p,k,0,rc)){p.cells=rc;p.x+=k;return}
}
function act(a){
  if(!G||!running||!G.cur)return;
  if(a==='L'&&fits(G.cur,-1))G.cur.x--;
  if(a==='R'&&fits(G.cur,1))G.cur.x++;
  if(a==='rot')rotate();
  if(a==='soft'){if(fits(G.cur,0,1)){G.cur.y++;G.acc=0}}
  if(a==='hard'){while(fits(G.cur,0,1))G.cur.y++;lock()}
  if(a==='swap')swap();
}
function swap(){
  if(G.swaps<=0){api.log('warn','Kilpailutuksia ei ole jäljellä tällä kierroksella.');return}
  const old=G.cur.t;let t;do{t=pickType()}while(t===old||t==='contract');
  const np=mkPiece(t);np.y=G.cur.y;np.x=Math.min(G.cur.x,BW-(Math.max(...np.cells.map(c=>c[0]))+1));
  if(!fits(np))return;G.cur=np;G.swaps--;G.stats.swapsUsed++;SFX.buy();
  api.log('ok',`Kilpailutettu: ${TYPES[old].name} vaihtui, ${TYPES[t].name} tilalle.`);ctrls();
}
function lock(){
  const p=G.cur,T=TYPES[p.t];
  p.cells.forEach(([cx,cy],i)=>{const y=p.y+cy;if(y>=0)G.board[y][p.x+cx]={t:p.t,icon:i===0}});
  G.cost+=T.cost;SFX.coin();
  const full=[];for(let y=0;y<BH;y++)if(G.board[y].every(c=>c))full.push(y);
  if(full.length){
    const over=G.cost>G.RD.budget;
    const mult=[0,1,2.5,4.5,7][Math.min(4,full.length)];
    const v=Math.round(120*mult*(1+G.r*.2)*(1+lv('auto')*.2)*G.D.cash*(over?.5:1));
    const cut=Math.round(full.length*T.cost*.9+full.length*60);
    G.cost=Math.max(0,G.cost-cut);SAVE.cash+=v;G.saved+=v;G.rows+=full.length;
    for(const y of full){G.board.splice(y,1);G.board.unshift(Array(BW).fill(null))}
    G.flash.push({ys:full,l:.35});G.floats.push({t:'+'+eur(v),l:1.1,y:full[0]});
    api.log('ok',`${full.length>1?full.length+' riviä':'Rivi'} purettu. Päällekkäisiä kustannuksia −${eur(cut)}/kk.`);if(over)api.log('warn',R.C.log.budgetOver+' Säästö puolittui.');
    if(full.length>1)SFX.win();
    if(G.rows>=G.RD.goal)return roundDone();
  }
  spawn();
}
function riseDebt(){
  for(let x=0;x<BW;x++)if(G.board[0][x])return fail();
  const gap=rnd(BW);G.board.shift();G.board.push(Array.from({length:BW},(_,x)=>x===gap?null:{t:'debt'}));
  if(!fits(G.cur))G.cur.y--;
  api.log('warn',R.C.log.techDebt+' Pohjalle nousi uusi kerros.');SFX.warn();
}
function dropPrice(){
  const col=rnd(BW);let y=0;while(y<BH&&!G.board[y][col])y++;y--;
  if(y<1)return;if(G.cur.cells.some(([cx,cy])=>G.cur.x+cx===col&&G.cur.y+cy>=y-1))return;
  G.board[y][col]={t:'price'};G.cost+=50;api.log('warn',R.C.log.priceHike+' Kustannukset +50 €/kk.');SFX.warn();
}
function fail(){
  running=false;G.stats.fails++;W3().stats=G.stats;SAVE.cash=G.cash0;R.persist();SFX.hit();R.track('round_fail',{world:3,round:G.r+1});draw();
  R.showPanel(`<div class="kick">OPTIMIZE · Kierros ${G.r+1}/5</div><h2>IT-kokonaisuus kaatui</h2><p>Hankintoja kertyi enemmän kuin niitä ehdittiin järjestää. Kassa palautuu kierroksen alun tilanteeseen.</p><p class="small">Vinkki: jätä yksi sarake auki täysille riveille ja kilpailuta hankinta, joka ei mahdu.</p><div class="row"><button class="btn" id="again">Yritä uudelleen</button><button class="btn ghost" id="hbx">Päävalikkoon</button></div>`);
  $('#again').onclick=()=>{R.hidePanel();newRound()};$('#hbx').onclick=R.toHub;
}
function roundDone(){
  running=false;const over=G.cost>G.RD.budget;G.stats.over.push(over?1:0);
  const bonus=over?0:Math.round((G.RD.budget-G.cost)*.3*G.D.cash);SAVE.cash+=bonus;
  const w=W3();w.score+=Math.max(100,Math.round(G.saved*2+bonus+(over?0:500)));w.stats=G.stats;w.round=G.r+1;w.time=(w.time||0)+G.t;
  R.track('round_complete',{world:3,round:G.r+1,secs:Math.round(G.t)});R.persist();SFX.win();draw();
  if(w.round>=5)return finish();
  R.shop2({wk:'w3',kick:`Kierros ${w.round}/5 läpäisty · ${over?'Budjetti ylittyi':'Budjetissa, bonus +'+eur(bonus)}`,title:`Investoi ennen kierrosta ${w.round+1}`,text:'Parannukset ovat pysyviä koko Optimize-maailman ajan.',
    upg:UPG,lv,buy:id=>{w.up[id]=lv(id)+1},next:`Kierros ${w.round+1}: ${ROUNDS[w.round].name}`,onNext:intro});
}
function finish(){
  const w=W3();w.done=true;w.best=Math.max(w.best||0,w.score);R.track('world_complete',{world:3,score:w.score,mins:Math.round((w.time||0)/60)});R.persist();
  const s=w.stats,inB=s.over.length?1-s.over.reduce((a,b)=>a+b,0)/s.over.length:.5;
  const upTot=UPG.reduce((a,u)=>a+lv(u.id)/u.max,0)/UPG.length;
  const v=inB*100*.45+Math.max(0,100-s.fails*15)*.3+upTot*100*.25,idx=v<35?0:v<50?1:v<65?2:v<80?3:4;
  const [pName,pText]=s.swapsUsed>=8?['Kilpailuttaja','Et hyväksynyt ensimmäistä tarjousta, vaan hait sopivamman.']:inB>=.8?['Säästäjä','Pidit kustannukset budjetissa kierros toisensa jälkeen.']:lv('debt')+lv('arch')>=3?['Arkkitehti','Panostit kokonaiskuvaan ja teknisen velan purkuun.']:['Tasapainoinen IT-johtaja','Hallitsit hankinnat ja kustannukset samaan aikaan.'];
  R.worldEnd({key:'w3',num:'03',world:'Optimize',title:'Cost Controller',img:'optimize',score:w.score,idx,pName,pText,next:'Defend & Grow',
    dims:{cost:inB*100,sec:100-s.fails*15-(lv('debt')?0:15),prod:40+lv('auto')*15+lv('arch')*7},
    line:'Karsin päällekkäiset IT-kustannukset ja pysyin budjetissa.',levelNote:'Taso lasketaan budjetissa pysymisestä, epäonnistumisista ja investoinneista.',
    real:[`<b>Budjetti.</b> Pysyit budjetissa ${Math.round(inB*100)} % kierroksista. Oikeassa yrityksessä IT-kulut ovat usein hajallaan eri yksiköissä, eikä kukaan näe kokonaissummaa.`,
      `<b>Kilpailutus.</b> Kilpailutit pelissä ${s.swapsUsed} hankintaa. Roivo kilpailuttaa IT-toimittajat ja varmistaa, että sopimus vastaa tarvetta eikä toimittajan vakiotarjousta.`,
      `<b>Jäykät sopimukset.</b> Viiden vuoden sopimus ei kääntynyt pelissäkään. Roivo tekee sopimukset, irtisanomisajat ja uusimispäivät näkyviksi ennen kuin ne sitovat.`]});
}
function pause(){running=false;R.showPanel(`<div class="kick">Tauko</div><h2>Hankintapäätösten aika</h2><p>Peli on pysäytetty. Mieti rauhassa, mihin seuraava hankinta sijoitetaan.</p>${R.note('w3')}<div class="row"><button class="btn" id="res">Jatka</button><button class="btn ghost" id="rst">Aloita kierros alusta</button><button class="btn ghost" id="hb">Päävalikkoon</button></div>`);
  $('#res').onclick=()=>{R.hidePanel();running=true;last=performance.now();raf=requestAnimationFrame(loop)};$('#rst').onclick=()=>{SAVE.cash=G.cash0;R.hidePanel();newRound()};$('#hb').onclick=()=>{SAVE.cash=G.cash0;R.persist();R.toHub()}}

function loop(now){if(!running)return;const dt=Math.min(.05,(now-last)/1000);last=now;update(dt);if(running){draw();raf=requestAnimationFrame(loop)}}
function update(dt){
  G.t+=dt;G.flash=G.flash.filter(f=>(f.l-=dt)>0);G.floats=G.floats.filter(f=>(f.l-=dt)>0);
  G.acc+=dt;
  if(G.acc>=G.grav){G.acc=0;if(fits(G.cur,0,1))G.cur.y++;else{lock();if(!running)return}}
  if(G.t>G.nextDebt){G.nextDebt=G.t+G.RD.debt*(1+lv('debt')*.3);riseDebt();if(!running)return}
  if(G.t>G.nextPrice){G.nextPrice=G.t+G.RD.price*(1+lv('cloud')*.35);dropPrice()}
  if(Math.random()<dt/28)api.log('info',HUMOR[rnd(HUMOR.length)]);
  api.set('cash',eur(SAVE.cash));api.set('rows',`${G.rows}/${G.RD.goal}`,G.rows/G.RD.goal*100);
  const over=G.cost>G.RD.budget;api.set('cost',eur(G.cost)+'/kk');const ce=api.el.querySelector('[data-k="cost"]');ce.style.color=over?'var(--terra)':'';
  api.set('save',eur(G.saved));
}
// ---------- syöte ----------
addEventListener('keydown',e=>{if(!api||!api.el.classList.contains('on')||$('#ov').classList.contains('on'))return;
  const m={ArrowLeft:'L',ArrowRight:'R',ArrowUp:'rot',x:'rot',X:'rot',ArrowDown:'soft',' ':'hard',c:'swap',C:'swap',a:'L',d:'R',w:'rot',s:'soft'}[e.key];
  if(m){e.preventDefault();act(m)}if((e.key==='p'||e.key==='Escape')&&running)pause()});
let sw=null;
addEventListener('pointerdown',e=>{if(G&&api&&e.target===api.cv)sw={x:e.clientX,y:e.clientY,moved:false,t:performance.now()}});
addEventListener('pointermove',e=>{if(!sw)return;const step=C*G.sc;const dx=e.clientX-sw.x;if(Math.abs(dx)>=step*.9){act(dx>0?'R':'L');sw.x=e.clientX;sw.moved=true}
  if(e.clientY-sw.y>step*3&&!sw.moved){act('hard');sw=null}});
addEventListener('pointerup',()=>{if(sw&&!sw.moved&&performance.now()-sw.t<300)act('rot');sw=null});
addEventListener('resize',()=>{if(G&&api&&api.el.classList.contains('on')){const fc=R.fitCanvas(api,(BW+PW)*C,BH*C);G.x=fc.x;G.sc=fc.sc;if(!running)draw()}});
document.addEventListener('visibilitychange',()=>{if(document.hidden&&running&&api.el.classList.contains('on'))pause()});

// ---------- piirto ----------
function cell(x,px,py,col,icon,t,a=1){
  x.globalAlpha=a;x.fillStyle=col;R.rr(x,px+1.5,py+1.5,C-3,C-3,5);x.fill();
  x.fillStyle='rgba(255,255,255,.18)';x.fillRect(px+4,py+3,C-8,3);
  x.strokeStyle='rgba(11,6,40,.45)';x.lineWidth=1;R.rr(x,px+1.5,py+1.5,C-3,C-3,5);x.stroke();
  if(icon)drawIcon(x,t,px+C/2,py+C/2);x.globalAlpha=1;
}
function drawIcon(x,t,cx,cy){
  x.strokeStyle='rgba(11,6,40,.75)';x.fillStyle='rgba(11,6,40,.75)';x.lineWidth=1.8;x.beginPath();
  if(t==='cloud'){x.arc(cx-4,cy+2,4,0,7);x.arc(cx+2,cy-1,5,0,7);x.arc(cx+6,cy+3,3.5,0,7);x.fill()}
  else if(t==='db'){x.ellipse(cx,cy-5,6,2.5,0,0,7);x.moveTo(cx-6,cy-5);x.lineTo(cx-6,cy+5);x.moveTo(cx+6,cy-5);x.lineTo(cx+6,cy+5);x.stroke();x.beginPath();x.ellipse(cx,cy+5,6,2.5,0,0,Math.PI);x.stroke()}
  else if(t==='team'){x.arc(cx-4,cy-3,3,0,7);x.arc(cx+4,cy-3,3,0,7);x.fill();x.fillRect(cx-8,cy+2,7,5);x.fillRect(cx+1,cy+2,7,5)}
  else if(t==='dev'){x.strokeRect(cx-7,cy-5,14,9);x.moveTo(cx-9,cy+6);x.lineTo(cx+9,cy+6);x.stroke()}
  else if(t==='lic'){x.arc(cx-3,cy,4,0,7);x.moveTo(cx+1,cy);x.lineTo(cx+8,cy);x.moveTo(cx+6,cy);x.lineTo(cx+6,cy+4);x.stroke()}
  else if(t==='contract'){x.font='800 11px Figtree';x.textAlign='center';x.textBaseline='middle';x.fillText('5 v',cx,cy+1);x.textBaseline='alphabetic'}
}
function draw(){
  const x=G.x;x.clearRect(0,0,(BW+PW)*C,BH*C);
  x.fillStyle='rgba(11,6,40,.86)';x.fillRect(0,0,BW*C,BH*C);
  x.strokeStyle='rgba(255,201,156,.06)';x.beginPath();for(let i=1;i<BW;i++){x.moveTo(i*C,0);x.lineTo(i*C,BH*C)}for(let j=1;j<BH;j++){x.moveTo(0,j*C);x.lineTo(BW*C,j*C)}x.stroke();
  for(let y=0;y<BH;y++)for(let c=0;c<BW;c++){const b=G.board[y][c];if(!b)continue;
    if(b.t==='debt'){x.fillStyle='#3a2a3a';x.fillRect(c*C+1,y*C+1,C-2,C-2);x.strokeStyle='#DC7B60';x.setLineDash([3,3]);x.strokeRect(c*C+3,y*C+3,C-6,C-6);x.setLineDash([])}
    else if(b.t==='price'){cell(x,c*C,y*C,'#DC7B60',false);x.fillStyle='#1b0f22';x.font='800 12px Figtree';x.textAlign='center';x.fillText('€↑',c*C+C/2,y*C+C/2+4)}
    else cell(x,c*C,y*C,TYPES[b.t].col,b.icon,b.t)}
  for(const f of G.flash)for(const y of f.ys){x.fillStyle=`rgba(229,182,93,${f.l*2})`;x.fillRect(0,y*C,BW*C,C)}
  if(G.cur&&running){const p=G.cur,T=TYPES[p.t];let gy=0;while(fits(p,0,gy+1))gy++;
    x.strokeStyle=T.col;x.globalAlpha=.5;p.cells.forEach(([cx,cy])=>{x.setLineDash([3,3]);x.strokeRect((p.x+cx)*C+3,(p.y+cy+gy)*C+3,C-6,C-6)});x.setLineDash([]);x.globalAlpha=1;
    p.cells.forEach(([cx,cy],i)=>{if(p.y+cy>=0)cell(x,(p.x+cx)*C,(p.y+cy)*C,T.col,i===0,p.t)})}
  // budjettiviiva: korkeus kertoo kustannusten suhteen
  const ratio=Math.min(1.2,G.cost/G.RD.budget);x.fillStyle=ratio>1?'rgba(220,123,96,.5)':'rgba(143,201,174,.35)';x.fillRect(BW*C-4,BH*C*(1-ratio/1.2),4,BH*C*ratio/1.2);
  x.strokeStyle='#DC7B60';x.beginPath();x.moveTo(BW*C-10,BH*C*(1-1/1.2));x.lineTo(BW*C,BH*C*(1-1/1.2));x.stroke();
  x.textAlign='center';for(const f of G.floats){x.globalAlpha=Math.min(1,f.l*1.5);x.fillStyle='#E5B65D';x.font='800 20px Figtree';x.fillText(f.t,BW*C/2,f.y*C-(1.1-f.l)*30)}x.globalAlpha=1;
  // sivupaneeli
  const ox=BW*C+10,pw=PW*C-14;x.fillStyle='rgba(7,3,28,.9)';R.rr(x,ox-4,0,pw+8,BH*C,10);x.fill();
  x.textAlign='left';x.fillStyle='#E5B65D';x.font='700 13px Figtree';x.fillText('SEURAAVA',ox+6,22);
  const show=1+lv('arch');let y=32;
  for(let i=0;i<show;i++){const t=G.next[i],T=TYPES[t],cs=norm(T.cells),s=i===0?.8:.6;const w=(Math.max(...cs.map(c=>c[0]))+1)*C*s,h=(Math.max(...cs.map(c=>c[1]))+1)*C*s;
    x.save();x.translate(ox+(pw-w)/2,y);x.scale(s,s);cs.forEach(([cx,cy],j)=>cell(x,cx*C,cy*C,T.col,j===0,t));x.restore();
    x.fillStyle='#b9a3a0';x.font='400 11px Figtree';x.textAlign='center';x.fillText(T.name,ox+pw/2,y+h+13);x.textAlign='left';y+=h+30}
  const line=(l,v,c,yy)=>{x.fillStyle='#b9a3a0';x.font='400 12px Figtree';x.fillText(l,ox+6,yy);x.fillStyle=c;x.font='800 17px Figtree';x.fillText(v,ox+6,yy+19)};
  const by=Math.max(y+10,BH*C-170);
  line('IT-kustannukset',eur(G.cost)+'/kk',G.cost>G.RD.budget?'#DC7B60':'#f6e7da',by);
  line('Budjetti',eur(G.RD.budget)+'/kk','#f6e7da',by+46);
  line('Säästöt',eur(G.saved),'#8FC9AE',by+92);
  if(G.cur){x.fillStyle='#b9a3a0';x.font='400 11px Figtree';x.fillText('Nyt: '+TYPES[G.cur.t].name,ox+6,by+140);x.fillText(TYPES[G.cur.t].cost+' €/kk',ox+6,by+154)}
}
R.worlds.w3={start,stop};
}
