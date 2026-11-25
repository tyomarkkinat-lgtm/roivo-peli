// ROIVO Business Survival · 04 DEFEND & GROW (kaistapuolustus, kaikki aiemmat opit yhdessä)
{
const R=window.RBS,{SAVE,eur,SFX,DIFF,LEVELS,$}=R;
const LANES=['Tuotanto','Myynti','Talous','Henkilöstö'];
const SLOTS=[.07,.19,.31,.43,.55,.67];
const TW={
  sec:{name:'Tietoturva',cost:600,hp:70,dps:16,range:.42,col:'#8FC9AE',desc:'Torjuu hyökkäyksiä kaistalla.'},
  auto:{name:'Automaatio',cost:800,hp:45,income:70,every:6,col:'#E5B65D',desc:'Tuottaa rahaa koko ajan.'},
  bak:{name:'Varmistus',cost:500,hp:240,regen:5,col:'#5f8fb0',desc:'Kestää iskuja ja palautuu.'},
  edu:{name:'Koulutus',cost:400,hp:55,slow:.4,range:.36,dps:5,col:'#cfe9dd',desc:'Hidastaa uhkia ja pysäyttää kalastelun.'},
  lead:{name:'IT-johtaminen',cost:900,hp:70,buff:.3,col:'#FFC99C',desc:'Koko kaistan ratkaisut +30 %.'},
  comp:{name:'Kilpailutus',cost:450,hp:90,col:'#c9a0dc',desc:'Pysäyttää hinnannousut ja muuttaa ne säästöiksi.'}
};
const EN={
  kyber:{name:'Kyberhyökkäys',hp:42,sp:.075,dmg:12,hit:9,rew:40,col:'#e0604a'},
  vika:{name:'Järjestelmävika',hp:120,sp:.042,dmg:20,hit:13,rew:70,col:'#c98a5a'},
  phish:{name:'Tietojenkalastelu',hp:24,sp:.115,dmg:7,hit:6,rew:25,col:'#e8a0b0'},
  price:{name:'Hinnannousu',hp:1,sp:.06,dmg:0,hit:0,rew:0,col:'#DC7B60',cost:260},
  boss:{name:'Laaja kyberhäiriö',hp:480,sp:.03,dmg:35,hit:25,rew:320,col:'#ff4f3a'}
};
const WAVES=[
  {name:'Arki alkaa',mix:{kyber:5},every:2.6},
  {name:'Kalasteluviestit',mix:{kyber:4,phish:6},every:2},
  {name:'Kustannuspaine',mix:{kyber:5,price:4,phish:3},every:1.9},
  {name:'Järjestelmät vanhenevat',mix:{vika:4,kyber:6,phish:4},every:1.7},
  {name:'Kasvun kipuja',mix:{vika:5,kyber:7,price:5,phish:5},every:1.45},
  {name:'Kohdistettu hyökkäys',mix:{kyber:12,phish:8,vika:4},every:1.2},
  {name:'Toimittaja nostaa hintoja',mix:{price:9,vika:6,kyber:8,phish:6},every:1.1},
  {name:'Kriisi ja kysyntäpiikki',mix:{boss:1,kyber:12,vika:7,price:6,phish:8},every:.9,demand:true}
];
const HUMOR=['Henkilöstö kävi tietoturvakoulutuksen. Klikkausprosentti putosi.',...R.C.humor];
let api,G=null,raf=0,last=0,running=false;
const W4=()=>SAVE.w4;

function start(){
  api=R.mkScreen('w-defend','DEFEND & GROW','town');
  api.stats([{k:'cash',label:'Kassa'},{k:'hp',label:'Toimintakyky',bar:1},{k:'wave',label:'Aalto'},{k:'value',label:'Yrityksen arvo'}]);
  api.el.querySelector('.pz').onclick=()=>running&&pause();
  R.show('w-defend');requestAnimationFrame(()=>W4().round>0&&W4().snap?resumeWorld():intro());
}
function stop(){running=false;cancelAnimationFrame(raf)}
function legacy(){ // aiempien maailmojen vaikutus
  const w1=SAVE.w1,b={secMul:1+(w1.up.sec||0)*.1,autoMul:SAVE.w2.done?1.2:1,priceMul:SAVE.w3.done?.9:1,lines:[]};
  b.lines.push(w1.done?`Survive läpäisty: tietoturvainvestoinnit (${w1.up.sec||0} tasoa) tehostavat Tietoturvaa ${Math.round((b.secMul-1)*100)} %.`:'Survive kesken: ei tietoturvabonusta.');
  b.lines.push(SAVE.w2.done?'Connect läpäisty: integraatiot nostavat Automaation tuottoa 20 %.':'Connect kesken: ei automaatiobonusta.');
  b.lines.push(SAVE.w3.done?'Optimize läpäisty: kilpailutetut sopimukset laskevat kaikkia hintoja 10 %.':'Optimize kesken: ei hintaetua.');
  return b;
}
function intro(){
  const L=legacy(),D=DIFF[SAVE.diff];const min=Math.round(2600*D.cash);
  R.showPanel(`<div class="kick">DEFEND & GROW · 8 aaltoa</div><h2>Rakenna kestävä yritys</h2>
  <ul><li>Yrityksellä on neljä toimintoa. Uhat tulevat kaistoja pitkin kohti yritystä.</li><li>Valitse ratkaisu alapalkista ja napauta paikkaa kaistalla. Kaistalla oleva ratkaisu pysäyttää uhat, kunnes se hajoaa.</li><li>Hinnannousut kulkevat suojausten läpi. Vain kilpailutus pysäyttää ne.</li><li>Säästäminen auttaa alussa, mutta tekemättömät investoinnit näkyvät viimeisissä aalloissa.</li></ul>
  <div class="tip"><b>Aiempien maailmojen vaikutus</b>${L.lines.join('<br>')}</div>
  ${R.note('w4')}
  <p class="small">Aloituskassa vähintään ${eur(min)}, vaikka aiemmat maailmat olisivat kesken.</p>
  <div class="row"><button class="btn" id="go">Aloita</button><button class="btn ghost" id="toHub">Päävalikkoon</button></div>`);
  $('#go').onclick=()=>{R.hidePanel();newGame()};$('#toHub').onclick=R.toHub;
}
function layout(){const st=api.stage,land=st.clientWidth>=st.clientHeight*.85;return land?{land,W:980,H:560}:{land,W:540,H:900}}
function pos(i,p){const L=G.L;
  if(L.land){const x0=150,x1=960,top=36,lh=(L.H-top-14)/4;return[x0+p*(x1-x0),top+lh*i+lh/2]}
  const y0=780,y1=40,lw=(L.W-20)/4;return[10+lw*i+lw/2,y0-p*(y0-y1)]}
function laneSize(){return G.L.land?(G.L.H-50)/4:(G.L.W-20)/4}
function newGame(){
  const D=DIFF[SAVE.diff],min=Math.round(2600*D.cash);
  if(SAVE.cash<min)SAVE.cash=min;
  init();G.wave=0;snapshot();buildPhase();
}
function init(){
  const L=layout(),fc=R.fitCanvas(api,L.W,L.H);
  G={L,x:fc.x,sc:fc.sc,D:DIFF[SAVE.diff],B:legacy(),t:0,hp:100,towers:[],en:[],shots:[],floats:[],queue:[],spawnT:0,phase:'build',sel:'sec',pick:null,wave:0,
    stats:W4().stats||{fails:0,lost:0,built:{},waves:[]},income:0,companyHit:0};
}
function snapshot(){W4().snap={cash:SAVE.cash,hp:G.hp,wave:G.wave,towers:G.towers.map(t=>({k:t.k,lane:t.lane,slot:t.slot}))};W4().round=G.wave;R.persist()}
function resumeWorld(){init();const s=W4().snap;SAVE.cash=s.cash;G.hp=s.hp;G.wave=s.wave;s.towers.forEach(t=>addTower(t.k,t.lane,t.slot,true));buildPhase()}
function price(k){return Math.round(TW[k].cost*G.B.priceMul)}
function addTower(k,lane,slot,free){const T=TW[k];G.towers.push({k,lane,slot,p:SLOTS[slot],hp:T.hp,max:T.hp,cd:0,acc:0,flash:0});if(!free){G.stats.built[k]=(G.stats.built[k]||0)+1}}
function buildPhase(){
  G.phase='build';api.round(`Aalto ${G.wave+1}/8<span class="rn"> · ${WAVES[G.wave].name}</span>`);
  api.clearLog();api.log('info',`Rakennusvaihe. Seuraava aalto: ${WAVES[G.wave].name}.`);
  if(WAVES[G.wave].demand)api.log('warn','Viimeinen aalto: kyberhäiriö, kustannusten nousu ja kysyntäpiikki yhtä aikaa.');
  ctrls();running=true;last=performance.now();cancelAnimationFrame(raf);raf=requestAnimationFrame(loop);
}
function ctrls(){
  const sel=G.pick!=null?G.towers[G.pick]:null;
  const c=api.ctrl((sel?`<button id="sell">Myy ${TW[sel.k].name} (+${eur(price(sel.k)*.5)})</button><button id="cx">Peruuta</button>`:
    Object.keys(TW).map(k=>`<button data-k="${k}" class="${G.sel===k?'on':''}" ${SAVE.cash<price(k)?'style="opacity:.5"':''}>${TW[k].name}<br><small>${eur(price(k))}</small></button>`).join(''))+
    (G.phase==='build'?`<button id="wv">Aloita aalto ${G.wave+1}</button>`:''));
  c.querySelectorAll('[data-k]').forEach(b=>b.onclick=()=>{G.sel=b.dataset.k;api.log('info',`${TW[G.sel].name}: ${TW[G.sel].desc} Roivo: ${R.C.svc.w4[G.sel]}.`);ctrls()});
  const wv=c.querySelector('#wv');if(wv)wv.onclick=startWave;
  const fc=R.fitCanvas(api,G.L.W,G.L.H);G.x=fc.x;G.sc=fc.sc;
  const s=c.querySelector('#sell');if(s){s.onclick=()=>{const t=G.towers[G.pick];SAVE.cash+=Math.round(price(t.k)*.5);G.towers.splice(G.pick,1);G.pick=null;SFX.buy();ctrls()};c.querySelector('#cx').onclick=()=>{G.pick=null;ctrls()}}
}
function startWave(){
  if(G.phase!=='build')return;const Wv=WAVES[G.wave],D=G.D;
  G.queue=[];for(const k in Wv.mix){const n=Math.round(Wv.mix[k]*(k==='boss'?1:D.speed));for(let i=0;i<n;i++)G.queue.push(k)}
  G.queue.sort(()=>Math.random()-.5);if(Wv.mix.boss){G.queue=G.queue.filter(k=>k!=='boss');G.queue.splice(Math.floor(G.queue.length*.6),0,'boss')}
  G.phase='wave';G.spawnT=1;G.waveStart=G.t;G.income=0;api.log('warn',`Aalto ${G.wave+1} alkoi: ${Wv.name}.`);SFX.warn();ctrls();
}
function lead(lane){return G.towers.some(t=>t.k==='lead'&&t.lane===lane)?1+TW.lead.buff:1}
function loop(now){if(!running)return;const dt=Math.min(.05,(now-last)/1000);last=now;update(dt);if(running){draw();raf=requestAnimationFrame(loop)}}
function update(dt){
  G.t+=dt;G.shots=G.shots.filter(s=>(s.l-=dt)>0);G.floats=G.floats.filter(f=>(f.l-=dt)>0);
  const Wv=WAVES[G.wave];
  // tulot
  for(const t of G.towers){t.flash=Math.max(0,t.flash-dt);
    if(t.k==='auto'&&G.phase==='wave'){t.acc+=dt;if(t.acc>=TW.auto.every){t.acc=0;const v=Math.round(TW.auto.income*G.B.autoMul*lead(t.lane)*G.D.cash*(Wv.demand&&G.phase==='wave'?2:1));SAVE.cash+=v;G.income+=v;const [x,y]=pos(t.lane,t.p);G.floats.push({x,y:y-20,t:'+'+v+' €',c:'#E5B65D',l:1})}}
    if(t.k==='bak')t.hp=Math.min(t.max,t.hp+TW.bak.regen*dt*lead(t.lane));
    else if(G.towers.some(o=>o.k==='lead'&&o.lane===t.lane))t.hp=Math.min(t.max,t.hp+1*dt);
  }
  if(G.phase==='wave'){
    G.spawnT-=dt;
    if(G.spawnT<=0&&G.queue.length){G.spawnT=Wv.every*(0.7+Math.random()*.6);const k=G.queue.shift(),E=EN[k];
      const hpMul=1+G.wave*.12;G.en.push({k,lane:Math.floor(Math.random()*4),p:1.03,hp:E.hp*hpMul,max:E.hp*hpMul,slow:0,wob:Math.random()*6})}
    // viholliset
    for(const e of G.en){const E=EN[e.k];
      let slow=1;for(const t of G.towers)if(t.k==='edu'&&t.lane===e.lane&&e.p>t.p&&e.p-t.p<TW.edu.range)slow=1-TW.edu.slow;
      const block=G.towers.filter(t=>t.lane===e.lane&&t.p<e.p&&e.p-t.p<.04&&(e.k!=='price'||t.k==='comp')).sort((a,b)=>b.p-a.p)[0];
      if(block){
        if(e.k==='price'&&block.k==='comp'){e.hp=0;const v=Math.round(EN.price.cost*.6);SAVE.cash+=v;G.floats.push({x:pos(e.lane,e.p)[0],y:pos(e.lane,e.p)[1]-18,t:'Säästö +'+v+' €',c:'#8FC9AE',l:1.2});api.log('ok','Kilpailutus pysäytti hinnannousun.');continue}
        block.hp-=E.dmg*dt;block.flash=.15;if(block.hp<=0){const [x,y]=pos(block.lane,block.p);G.floats.push({x,y,t:TW[block.k].name+' hajosi',c:'#DC7B60',l:1.4});G.stats.lost++;G.towers.splice(G.towers.indexOf(block),1);SFX.hit();G.pick=null;ctrls()}
      }else e.p-=E.sp*slow*dt;
      if(e.p<=0){e.hp=0;
        if(e.k==='price'){SAVE.cash=Math.max(0,SAVE.cash-Math.round(EN.price.cost/G.D.cash));api.log('warn',`${R.C.log.priceHike} Kassa −${eur(EN.price.cost/G.D.cash)}.`);SFX.warn()}
        else{G.hp-=E.hit*G.D.dmg;G.companyHit=.3;api.log('warn',`${E.name} osui toimintoon ${LANES[e.lane]}.`);SFX.hit()}}
    }
    // tornit ampuvat
    for(const t of G.towers){const T=TW[t.k];if(!T.dps)continue;t.cd-=dt;if(t.cd>0)continue;
      const tgt=G.en.filter(e=>e.lane===t.lane&&e.hp>0&&e.p>t.p&&e.p-t.p<T.range&&e.k!=='price'&&(t.k!=='edu'||true)).sort((a,b)=>a.p-b.p)[0];
      if(!tgt)continue;t.cd=.35;
      let d=T.dps*.35*lead(t.lane);if(t.k==='sec')d*=G.B.secMul*(tgt.k==='kyber'||tgt.k==='boss'?1.3:1);if(t.k==='edu')d*=tgt.k==='phish'?4:1;
      tgt.hp-=d;G.shots.push({a:pos(t.lane,t.p),b:pos(tgt.lane,tgt.p),c:T.col,l:.12});
      if(tgt.hp<=0){const v=Math.round(EN[tgt.k].rew*G.D.cash);SAVE.cash+=v;G.floats.push({x:pos(tgt.lane,tgt.p)[0],y:pos(tgt.lane,tgt.p)[1]-16,t:'+'+v,c:'#E5B65D',l:.8});SFX.coin()}}
    G.en=G.en.filter(e=>e.hp>0);
    if(G.hp<=0)return fail();
    if(!G.queue.length&&!G.en.length)return waveDone();
  }
  G.companyHit=Math.max(0,G.companyHit-dt);
  if(Math.random()<dt/30)api.log('info',HUMOR[Math.floor(Math.random()*HUMOR.length)]);
  hud();
}
function value(){return Math.round(100000+SAVE.cash*4+G.towers.reduce((a,t)=>a+price(t.k),0)*6+G.hp*400)}
function hud(){api.set('cash',eur(SAVE.cash));api.set('hp',Math.round(G.hp)+' %',G.hp,G.hp<35?'var(--terra)':G.hp<65?'var(--gold)':'var(--green)');api.set('wave',`${G.wave+1}/8`);api.set('value',eur(value()))}
function waveDone(){
  const b=Math.round((200+G.wave*60)*G.D.cash);SAVE.cash+=b;
  G.stats.waves.push(Math.round(G.hp));const w=W4();
  let pts=Math.round(300+G.wave*120+G.hp*15);
  if(WAVES[G.wave].demand){const dem=G.hp>=60?Math.round(1500*G.D.cash):0;SAVE.cash+=dem;pts+=dem;api.log(dem?'ok':'warn',dem?`Kysyntäpiikki hoidettiin. Lisämyynti ${eur(dem)}.`:'Kysyntäpiikki jäi hyödyntämättä, koska toimintakyky oli alle 60 %.')}
  w.score+=pts;w.time=(w.time||0)+(G.t-G.waveStart);R.track('round_complete',{world:4,round:G.wave+1,secs:Math.round(G.t-G.waveStart)});
  SFX.win();api.log('ok',`Aalto ${G.wave+1} torjuttu. Bonus ${eur(b)}.`);
  G.wave++;G.en=[];
  if(G.wave>=8){running=false;w.snap=null;w.round=8;R.persist();return finish()}
  snapshot();buildPhase();
}
function fail(){
  running=false;G.stats.fails++;W4().stats=G.stats;R.track('round_fail',{world:4,round:G.wave+1});SFX.hit();draw();
  R.showPanel(`<div class="kick">DEFEND & GROW · Aalto ${G.wave+1}/8</div><h2>Toimintakyky loppui</h2><p>Yritys ei kestänyt aallon uhkia. Palataan aallon alkuun: kassa, ratkaisut ja toimintakyky palautuvat.</p><p class="small">Vinkki: rakenna Varmistus kaistan alkuun ja Tietoturva sen taakse. IT-johtaminen vahvistaa koko kaistaa.</p><div class="row"><button class="btn" id="again">Yritä aaltoa uudelleen</button><button class="btn ghost" id="hbx">Päävalikkoon</button></div>`);
  $('#again').onclick=()=>{R.hidePanel();resumeWorld()};$('#hbx').onclick=R.toHub;
}
function finish(){
  const w=W4();w.done=true;w.best=Math.max(w.best||0,w.score);w.stats=G.stats;R.track('world_complete',{world:4,score:w.score,mins:Math.round((w.time||0)/60)});
  const all=['w1','w2','w3','w4'].every(k=>SAVE[k].done);if(all)R.track('game_complete');R.persist();
  const s=G.stats,avg=s.waves.length?s.waves.reduce((a,b)=>a+b,0)/s.waves.length:50;
  const kinds=Object.keys(s.built).length;
  const v=avg*.45+Math.max(0,100-s.fails*12)*.25+Math.min(6,kinds)/6*100*.3,idx=v<35?0:v<50?1:v<65?2:v<80?3:4;
  const sb=s.built,sec=(sb.sec||0)+(sb.bak||0),grow=(sb.auto||0)+(sb.lead||0);
  const [pName,pText]=kinds>=5&&avg>=70?['Strateginen IT-johtaja','Käytit kaikkia keinoja ja pidit yrityksen toimintakykyisenä.']:sec>grow*2?['Riskienhallitsija','Rakensit vahvat suojaukset ennen kasvua.']:grow>sec?['Kasvattaja','Investoit tuottavuuteen ja johtamiseen.']:['Tasapainoinen IT-johtaja','Jaoit investoinnit suojausten ja kasvun kesken.'];
  const total=['w1','w2','w3','w4'].reduce((a,k)=>a+(SAVE[k].best||0),0),val=value();
  R.worldEnd({key:'w4',num:'04',world:'Defend & Grow',title:all?'CIO Legend':'Business Builder',img:'town',score:w.score,idx,pName,pText,next:null,hp:G.hp,
    dims:{sec:avg,cost:40+(sb.comp||0)*12,prod:30+((sb.auto||0)+(sb.lead||0))*10},
    line:`Yrityksen arvo kasvoi 100 000 eurosta ${eur(val)}.`,extra:all?`Kaikki neljä maailmaa läpäisty · ${total.toLocaleString('fi-FI').replace(/ /g,' ')} pistettä yhteensä`:'Pystytkö parempaan?',
    levelNote:'Taso lasketaan toimintakyvystä aaltojen jälkeen, epäonnistumisista ja siitä, kuinka monipuolisesti investoit.',
    real:[`<b>Investoinnit yhdessä.</b> Rakensit ${Object.values(sb).reduce((a,b)=>a+b,0)} ratkaisua ${kinds} eri tyypistä. Oikeassa yrityksessä tietoturva, varmistukset, automaatio ja osaaminen toimivat vasta yhdessä.`,
      `<b>IT-johtaminen.</b> ${sb.lead?'Johtaminen vahvisti kaistojen kaikkia ratkaisuja.':'Et rakentanut IT-johtamista, joten ratkaisut toimivat erillään.'} Roivon IT-johtaja palveluna tuo saman yritykseen: rahat ja työ kohdistuvat sinne, missä riski tai hyöty on suurin.`,
      `<b>Aiemmat päätökset.</b> ${G.B.lines.filter(l=>!l.includes('kesken')).length} aiemman maailman investoinnit vaikuttivat tähän maailmaan. IT-päätökset kasautuvat, hyvässä ja huonossa.`]});
}
function pause(){running=false;R.showPanel(`<div class="kick">Tauko</div><h2>Peli pysäytetty</h2>${R.note('w4')}<div class="row"><button class="btn" id="res">Jatka</button><button class="btn ghost" id="hb">Tallenna ja poistu</button></div>`);
  $('#res').onclick=()=>{R.hidePanel();running=true;last=performance.now();raf=requestAnimationFrame(loop)};$('#hb').onclick=()=>{if(G.phase==='wave'){const s=W4().snap;if(s)SAVE.cash=s.cash}R.persist();R.toHub()}}

// ---------- syöte ----------
addEventListener('pointerdown',e=>{if(!G||!running||!api||e.target!==api.cv)return;
  const r=api.cv.getBoundingClientRect(),mx=(e.clientX-r.left)/G.sc,my=(e.clientY-r.top)/G.sc;
  let best=null,bd=1e9;for(let l=0;l<4;l++)SLOTS.forEach((p,s)=>{const [x,y]=pos(l,p),d=Math.hypot(mx-x,my-y);if(d<bd){bd=d;best=[l,s]}});
  if(!best||bd>48)return;const [l,s]=best;
  const ex=G.towers.findIndex(t=>t.lane===l&&t.slot===s);
  if(ex>=0){G.pick=ex;ctrls();return}
  G.pick=null;const k=G.sel,pr=price(k);
  if(k==='lead'&&G.towers.some(t=>t.k==='lead'&&t.lane===l)){api.log('warn','Kaistalla on jo IT-johtaminen.');ctrls();return}
  if(SAVE.cash<pr){api.log('warn',`Kassa ei riitä: ${TW[k].name} maksaa ${eur(pr)}.`);SFX.warn();return}
  if(G.en.some(en=>en.lane===l&&Math.abs(en.p-SLOTS[s])<.05)){api.log('warn','Paikka on uhan alla. Valitse toinen.');return}
  SAVE.cash-=pr;addTower(k,l,s);SFX.buy();if(k==='auto'&&!G.towers.some(t=>t.k==='lead'&&t.lane===l))api.log('warn',R.C.log.aiTool+' Kaistalta puuttuu IT-johtaminen.');if(k==='bak')api.log('ok',R.C.log.backupOk);R.track('build',{k});ctrls();
});
addEventListener('keydown',e=>{if(!api||!api.el.classList.contains('on')||$('#ov').classList.contains('on'))return;
  if((e.key==='p'||e.key==='Escape')&&running)pause();if(e.key===' '&&running&&G.phase==='build'){e.preventDefault();startWave()}
  const n=+e.key;if(n>=1&&n<=6){G.sel=Object.keys(TW)[n-1];G.pick=null;ctrls()}});
addEventListener('resize',()=>{if(G&&api&&api.el.classList.contains('on')){const L=layout();if(L.land!==G.L.land){G.L=L}const fc=R.fitCanvas(api,G.L.W,G.L.H);G.x=fc.x;G.sc=fc.sc;if(!running)draw()}});
document.addEventListener('visibilitychange',()=>{if(document.hidden&&running&&api.el.classList.contains('on'))pause()});

// ---------- piirto ----------
function icon(x,k,cx,cy,s){x.save();x.translate(cx,cy);x.strokeStyle='#0B0628';x.fillStyle='#0B0628';x.lineWidth=2;x.beginPath();
  if(k==='sec'){R.shieldPath(x,0,0,s*1.2);x.stroke()}
  else if(k==='auto'){for(let i=0;i<8;i++){const a=i/8*6.283;x.moveTo(Math.cos(a)*s*.35,Math.sin(a)*s*.35);x.lineTo(Math.cos(a)*s*.55,Math.sin(a)*s*.55)}x.stroke();x.beginPath();x.arc(0,0,s*.3,0,7);x.stroke()}
  else if(k==='bak'){x.strokeRect(-s*.45,-s*.45,s*.9,s*.9);x.fillRect(-s*.25,-s*.45,s*.5,s*.3)}
  else if(k==='edu'){x.moveTo(-s*.5,-s*.3);x.lineTo(0,-s*.1);x.lineTo(s*.5,-s*.3);x.moveTo(-s*.5,s*.35);x.lineTo(0,s*.5);x.lineTo(s*.5,s*.35);x.moveTo(-s*.5,-s*.3);x.lineTo(-s*.5,s*.35);x.moveTo(s*.5,-s*.3);x.lineTo(s*.5,s*.35);x.moveTo(0,-s*.1);x.lineTo(0,s*.5);x.stroke()}
  else if(k==='lead'){for(let i=0;i<5;i++){const a=-Math.PI/2+i*2*Math.PI/5,b=a+Math.PI/5;x.lineTo(Math.cos(a)*s*.5,Math.sin(a)*s*.5);x.lineTo(Math.cos(b)*s*.2,Math.sin(b)*s*.2)}x.closePath();x.fill()}
  else if(k==='comp'){x.moveTo(0,-s*.45);x.lineTo(0,s*.4);x.moveTo(-s*.45,-s*.25);x.lineTo(s*.45,-s*.25);x.moveTo(-s*.5,s*.1);x.arc(-s*.32,s*.05,s*.18,0,Math.PI);x.moveTo(s*.14,s*.05);x.arc(s*.32,s*.05,s*.18,0,Math.PI);x.moveTo(-s*.3,s*.42);x.lineTo(s*.3,s*.42);x.stroke()}
  x.restore()}
function draw(){
  const x=G.x,L=G.L,ls=laneSize();x.clearRect(0,0,L.W,L.H);
  // kaistat
  for(let l=0;l<4;l++){const [ax,ay]=pos(l,0),[bx,by]=pos(l,1);
    x.fillStyle='rgba(11,6,40,.78)';if(L.land)R.rr(x,ax,ay-ls*.42,bx-ax,ls*.84,10);else R.rr(x,ax-ls*.42,by,ls*.84,ay-by,10);x.fill();
    x.strokeStyle='rgba(255,201,156,.12)';x.setLineDash([10,10]);x.beginPath();x.moveTo(ax,ay);x.lineTo(bx,by);x.stroke();x.setLineDash([]);
    for(const p of SLOTS){const [sx,sy]=pos(l,p);x.strokeStyle='rgba(255,201,156,.22)';R.rr(x,sx-20,sy-20,40,40,8);x.stroke()}
    // toiminnon nimi
    x.fillStyle='#FFC99C';x.font='700 13px Figtree';x.textAlign='center';
    if(L.land){x.fillStyle='rgba(22,15,58,.95)';R.rr(x,10,ay-ls*.38,130,ls*.76,10);x.fill();x.strokeStyle=G.companyHit>0?'#DC7B60':'rgba(255,201,156,.4)';x.stroke();
      drawBuilding(x,40,ay+ls*.2,l);x.fillStyle='#FFC99C';x.fillText(LANES[l],95,ay+4)}
    else{x.fillStyle='rgba(22,15,58,.95)';R.rr(x,ax-ls*.44,795,ls*.88,90,10);x.fill();x.strokeStyle=G.companyHit>0?'#DC7B60':'rgba(255,201,156,.4)';x.stroke();drawBuilding(x,ax-10,860,l);x.fillStyle='#FFC99C';x.fillText(LANES[l],ax,815)}
  }
  // tornit
  G.towers.forEach((t,i)=>{const [cx,cy]=pos(t.lane,t.p),T=TW[t.k];
    x.shadowColor=T.col;x.shadowBlur=t.flash?18:8;x.fillStyle=t.flash?'#fff':T.col;R.rr(x,cx-18,cy-18,36,36,9);x.fill();x.shadowBlur=0;icon(x,t.k,cx,cy,22);
    x.fillStyle='rgba(0,0,0,.5)';x.fillRect(cx-18,cy+21,36,4);x.fillStyle=t.hp/t.max<.35?'#DC7B60':'#8FC9AE';x.fillRect(cx-18,cy+21,36*t.hp/t.max,4);
    if(i===G.pick){x.strokeStyle='#E5B65D';x.lineWidth=2;R.rr(x,cx-22,cy-22,44,44,10);x.stroke()}});
  // viholliset
  for(const e of G.en){const [cx,cy]=pos(e.lane,e.p),E=EN[e.k],wob=Math.sin(G.t*6+e.wob)*2;
    x.save();x.translate(cx+(L.land?0:wob),cy+(L.land?wob:0));
    if(e.k==='price'){x.fillStyle='rgba(220,123,96,.3)';x.strokeStyle=E.col;x.lineWidth=2;R.rr(x,-17,-12,34,24,6);x.fill();x.stroke();x.fillStyle='#FFC99C';x.font='800 13px Figtree';x.textAlign='center';x.fillText('€↑',0,5)}
    else{const s=e.k==='boss'?24:e.k==='vika'?16:e.k==='phish'?10:13;x.rotate(G.t*(e.k==='vika'?.6:1.5));x.strokeStyle=E.col;x.fillStyle=E.col;x.lineWidth=2;x.shadowColor=E.col;x.shadowBlur=10;
      if(e.k==='vika'){for(let i=0;i<7;i++){const a=i/7*6.283;x.fillRect(Math.cos(a)*s-3,Math.sin(a)*s-3,6,6)}x.beginPath();x.arc(0,0,s*.8,0,7);x.fill();x.fillStyle='#0B0628';x.beginPath();x.arc(0,0,s*.3,0,7);x.fill()}
      else if(e.k==='phish'){x.rotate(-G.t*1.5);x.beginPath();x.moveTo(-s,-s*.7);x.lineTo(s,-s*.7);x.lineTo(s,s*.7);x.lineTo(-s,s*.7);x.closePath();x.fill();x.strokeStyle='#0B0628';x.beginPath();x.moveTo(-s,-s*.7);x.lineTo(0,s*.1);x.lineTo(s,-s*.7);x.stroke()}
      else{for(let i=0;i<8;i++){const a=i/8*6.283;x.beginPath();x.moveTo(Math.cos(a)*s*.6,Math.sin(a)*s*.6);x.lineTo(Math.cos(a)*s,Math.sin(a)*s);x.stroke()}x.beginPath();x.arc(0,0,s*.65,0,7);x.fill()}
      x.shadowBlur=0}
    x.restore();
    if(e.k!=='price'){x.fillStyle='rgba(0,0,0,.5)';x.fillRect(cx-14,cy-26,28,3);x.fillStyle=EN[e.k].col;x.fillRect(cx-14,cy-26,28*e.hp/e.max,3)}}
  for(const s of G.shots){x.strokeStyle=s.c;x.globalAlpha=s.l/.12;x.lineWidth=2;x.beginPath();x.moveTo(...s.a);x.lineTo(...s.b);x.stroke()}x.globalAlpha=1;
  x.textAlign='center';x.font='800 13px Figtree';for(const f of G.floats){x.globalAlpha=Math.min(1,f.l*1.5);x.fillStyle=f.c;x.fillText(f.t,f.x,f.y-(1.2-f.l)*20)}x.globalAlpha=1;
  if(G.phase==='build'){x.fillStyle='rgba(229,182,93,.95)';x.font='800 15px Figtree';x.fillText(`Rakennusvaihe · valittu: ${TW[G.sel].name} (${eur(price(G.sel))})`,L.land?560:L.W/2,L.land?22:28)}
}
function drawBuilding(x,bx,by,l){x.fillStyle='#3a2547';x.strokeStyle='#DC7B60';x.lineWidth=1;const h=[34,26,40,30][l];x.fillRect(bx-14,by-h,28,h);x.strokeRect(bx-14,by-h,28,h);
  x.fillStyle='rgba(229,182,93,.8)';for(let i=0;i<3;i++)for(let j=0;j<Math.floor(h/10);j++)if((i+j+l)%3)x.fillRect(bx-10+i*8,by-h+4+j*10,4,5)}
R.worlds.w4={start,stop};
}
