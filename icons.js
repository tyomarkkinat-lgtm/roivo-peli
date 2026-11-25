// ROIVO Business Survival – sääntöjen kuvakkeet. Piirretään samalla tyylillä kuin pelikenttä.
{
const cache={},S=96,EN=(window.RBS_LANG||(location.hash==='#en'?'en':'fi'))==='en';
function rr(x,a,b,w,h,r){x.beginPath();x.roundRect?x.roundRect(a,b,w,h,r):x.rect(a,b,w,h)}
function shield(x,cx,cy,s){x.beginPath();x.moveTo(cx,cy-s*.5);x.quadraticCurveTo(cx+s*.42,cy-s*.42,cx+s*.4,cy-s*.32);x.quadraticCurveTo(cx+s*.4,cy+s*.2,cx,cy+s*.5);x.quadraticCurveTo(cx-s*.4,cy+s*.2,cx-s*.4,cy-s*.32);x.quadraticCurveTo(cx-s*.42,cy-s*.42,cx,cy-s*.5);x.closePath()}
function virus(x,s,col,spikes=8){x.strokeStyle=col;x.fillStyle=col;x.lineWidth=3;x.shadowColor=col;x.shadowBlur=10;
  for(let i=0;i<spikes;i++){const a=i/spikes*6.283;x.beginPath();x.moveTo(Math.cos(a)*s*.6,Math.sin(a)*s*.6);x.lineTo(Math.cos(a)*s,Math.sin(a)*s);x.stroke();x.beginPath();x.arc(Math.cos(a)*s*1.05,Math.sin(a)*s*1.05,s*.11,0,7);x.fill()}
  x.beginPath();x.arc(0,0,s*.66,0,7);x.fill();x.shadowBlur=0;x.fillStyle='#2a0b14';x.beginPath();x.arc(-s*.22,-s*.08,s*.11,0,7);x.arc(s*.22,-s*.08,s*.11,0,7);x.fill()}
function pipe(x,pairs){const M={N:[0,-1],E:[1,0],S:[0,1],W:[-1,0]},h=S*.42;
  for(const [a,b] of pairs){for(const [w,c] of[[S*.3,'#5a2c24'],[S*.22,'#b8613f'],[S*.06,'rgba(255,201,156,.5)']]){x.strokeStyle=c;x.lineWidth=w;x.lineCap='round';x.beginPath();x.moveTo(M[a][0]*h,M[a][1]*h);x.quadraticCurveTo(0,0,M[b][0]*h,M[b][1]*h);x.stroke()}}}
function block(x,cells,col,icon){const c=S/4.2,w=Math.max(...cells.map(p=>p[0]))+1,hh=Math.max(...cells.map(p=>p[1]))+1;x.translate(-w*c/2,-hh*c/2);
  for(const [cx,cy] of cells){x.fillStyle=col;rr(x,cx*c+1.5,cy*c+1.5,c-3,c-3,4);x.fill();x.fillStyle='rgba(255,255,255,.2)';x.fillRect(cx*c+4,cy*c+3,c-8,3)}}
function tower(x,col,draw){x.shadowColor=col;x.shadowBlur=12;x.fillStyle=col;rr(x,-S*.36,-S*.36,S*.72,S*.72,14);x.fill();x.shadowBlur=0;x.strokeStyle='#0B0628';x.fillStyle='#0B0628';x.lineWidth=4;x.beginPath();draw()}
const D={
  coin:x=>{x.shadowColor='#E5B65D';x.shadowBlur=14;x.fillStyle='#E5B65D';x.beginPath();x.arc(0,0,S*.34,0,7);x.fill();x.shadowBlur=0;x.strokeStyle='#9c6b1e';x.lineWidth=3;x.beginPath();x.arc(0,0,S*.25,0,7);x.stroke();x.fillStyle='#5b3a0e';x.font=`800 ${S*.36}px Figtree,sans-serif`;x.textAlign='center';x.textBaseline='middle';x.fillText('€',0,2)},
  shield:x=>{x.shadowColor='#8FC9AE';x.shadowBlur=14;shield(x,0,0,S*.72);x.fillStyle='rgba(143,201,174,.25)';x.fill();x.lineWidth=3;x.strokeStyle='#8FC9AE';x.stroke()},
  bolt:x=>{const s=S*.36;x.shadowColor='#FFC99C';x.shadowBlur=14;x.fillStyle='#FFC99C';x.beginPath();x.moveTo(s*.2,-s);x.lineTo(-s*.55,s*.12);x.lineTo(-s*.02,s*.12);x.lineTo(-s*.25,s);x.lineTo(s*.6,-s*.18);x.lineTo(s*.05,-s*.18);x.closePath();x.fill()},
  backup:x=>{const s=S*.32;x.fillStyle='#2f5a4b';x.strokeStyle='#8FC9AE';x.lineWidth=3;rr(x,-s,-s,2*s,2*s,5);x.fill();x.stroke();x.fillStyle='#8FC9AE';x.fillRect(-s*.55,-s,s*1.1,s*.7);x.fillStyle='#0B0628';x.fillRect(s*.15,-s*.9,s*.25,s*.5);x.fillStyle='#cfe9dd';x.fillRect(-s*.62,s*.06,s*1.24,s*.75)},
  skill:x=>{const s=S*.34;x.fillStyle='#cfe9dd';x.beginPath();x.arc(0,-s*.18,s*.55,0,7);x.fill();x.fillStyle='#8FC9AE';x.fillRect(-s*.28,s*.3,s*.56,s*.42);x.fillStyle='#0B0628';x.font=`800 ${s*.7}px Figtree,sans-serif`;x.textAlign='center';x.textBaseline='middle';x.fillText('i',0,-s*.15)},
  contract:x=>{const s=S*.3;x.fillStyle='#f3dcc4';x.beginPath();x.moveTo(-s*.65,-s*.85);x.lineTo(s*.35,-s*.85);x.lineTo(s*.65,-s*.55);x.lineTo(s*.65,s*.85);x.lineTo(-s*.65,s*.85);x.closePath();x.fill();x.strokeStyle='#8a5a48';x.lineWidth=2;for(let i=0;i<3;i++){x.beginPath();x.moveTo(-s*.42,-s*.35+i*s*.32);x.lineTo(s*.42,-s*.35+i*s*.32);x.stroke()}x.strokeStyle='#E5B65D';x.lineWidth=4;x.beginPath();x.arc(0,0,s*1.35,-Math.PI/2,Math.PI*.9);x.stroke()},
  block:x=>{const s=S*.3;x.strokeStyle='#DC7B60';x.setLineDash([5,4]);x.lineWidth=2.5;rr(x,-s,-s,2*s,2*s,4);x.stroke();x.setLineDash([]);x.fillStyle='rgba(220,123,96,.4)';x.fillRect(-s,0,2*s,s)},
  debt:x=>{const s=S*.32;x.fillStyle='rgba(220,123,96,.2)';x.strokeStyle='#DC7B60';x.lineWidth=3;x.beginPath();x.moveTo(0,-s);x.lineTo(s,s*.8);x.lineTo(-s,s*.8);x.closePath();x.fill();x.stroke();x.fillStyle='#DC7B60';x.font=`800 ${s*1.05}px Figtree,sans-serif`;x.textAlign='center';x.textBaseline='middle';x.fillText('!',0,s*.18)},
  price:x=>{const s=S*.3;x.fillStyle='rgba(220,123,96,.25)';x.strokeStyle='#DC7B60';x.lineWidth=3;rr(x,-s*1.1,-s*.8,s*2.2,s*1.6,8);x.fill();x.stroke();x.fillStyle='#FFC99C';x.font=`800 ${s*.9}px Figtree,sans-serif`;x.textAlign='center';x.textBaseline='middle';x.fillText('€↑',0,2)},
  virus:x=>virus(x,S*.3,'#e0604a'),
  outage:x=>{const s=S*.36;x.fillStyle='rgba(220,123,96,.25)';x.fillRect(-s,-s,2*s,2*s);x.strokeStyle='#DC7B60';x.setLineDash([6,5]);x.lineWidth=3;x.strokeRect(-s,-s,2*s,2*s);x.setLineDash([]);x.fillStyle='#DC7B60';x.font=`800 ${S*.17}px Figtree,sans-serif`;x.textAlign='center';x.textBaseline='middle';x.fillText(EN?'DOWN':'KATKO',0,0)},
  src:x=>{x.fillStyle='rgba(22,15,58,.95)';x.strokeStyle='#8FC9AE';x.lineWidth=3;rr(x,-S*.4,-S*.26,S*.8,S*.52,10);x.fill();x.stroke();x.fillStyle='#8FC9AE';x.fillRect(S*.36,-S*.08,S*.08,S*.16);x.fillStyle='#f6e7da';x.font=`800 ${S*.17}px Figtree,sans-serif`;x.textAlign='center';x.textBaseline='middle';x.fillText('CRM',0,1)},
  tgt:x=>{x.fillStyle='rgba(22,15,58,.95)';x.strokeStyle='#8FC9AE';x.lineWidth=3;rr(x,-S*.4,-S*.26,S*.8,S*.52,10);x.fill();x.stroke();x.fillStyle='#8FC9AE';x.fillRect(-S*.44,-S*.08,S*.08,S*.16);x.fillStyle='#f6e7da';x.font=`800 ${S*.14}px Figtree,sans-serif`;x.textAlign='center';x.textBaseline='middle';x.fillText(EN?'Billing':'Laskutus',0,1)},
  pipeH:x=>pipe(x,[['W','E']]),
  pipeC:x=>pipe(x,[['N','E']]),
  pipeX:x=>pipe(x,[['W','E'],['N','S']]),
  flow:x=>{pipe(x,[['W','E']]);x.strokeStyle='#8FC9AE';x.shadowColor='#8FC9AE';x.shadowBlur=10;x.lineWidth=S*.12;x.lineCap='round';x.beginPath();x.moveTo(-S*.42,0);x.lineTo(S*.05,0);x.stroke()},
  excel:x=>{const s=S*.36;x.fillStyle='rgba(220,123,96,.16)';x.fillRect(-s,-s,2*s,2*s);x.strokeStyle='#DC7B60';x.setLineDash([5,4]);x.lineWidth=2.5;x.strokeRect(-s,-s,2*s,2*s);x.setLineDash([]);x.fillStyle='#DC7B60';x.font=`800 ${S*.17}px Figtree,sans-serif`;x.textAlign='center';x.textBaseline='middle';x.fillText('EXCEL',0,0)},
  legacy:x=>{const s=S*.36;x.fillStyle='rgba(120,100,90,.35)';x.fillRect(-s,-s,2*s,2*s);x.strokeStyle='#8a7a70';x.setLineDash([5,4]);x.lineWidth=2.5;x.strokeRect(-s,-s,2*s,2*s);x.setLineDash([]);x.fillStyle='#b9a3a0';x.font=`800 ${S*.17}px Figtree,sans-serif`;x.textAlign='center';x.textBaseline='middle';x.fillText(EN?'LEGACY':'VANHA',0,0)},
  p_dev:x=>block(x,[[0,0],[1,0]],'#8b6fb3'),
  p_lic:x=>block(x,[[0,0],[1,0],[2,0]],'#E5B65D'),
  p_cloud:x=>block(x,[[0,0],[1,0],[0,1]],'#6fa58a'),
  p_db:x=>block(x,[[0,0],[1,0],[0,1],[1,1],[0,2]],'#5f8fb0'),
  p_team:x=>block(x,[[0,0],[2,0],[0,1],[1,1],[2,1]],'#c06a5a'),
  p_contract:x=>{x.scale(.78,.78);block(x,[[0,0],[1,0],[2,0],[3,0],[4,0]],'#7d7480')},
  p_debt:x=>{const c=S/4.2;x.translate(-2*c,-c/2);for(let i=0;i<4;i++){if(i===2)continue;x.fillStyle='#3a2a3a';x.fillRect(i*c+1,1,c-2,c-2);x.strokeStyle='#DC7B60';x.setLineDash([3,3]);x.lineWidth=1.5;x.strokeRect(i*c+3,3,c-6,c-6);x.setLineDash([])}},
  p_price:x=>{const c=S/4.2;x.fillStyle='#DC7B60';rr(x,-c/2,-c/2,c,c,4);x.fill();x.fillStyle='#1b0f22';x.font=`800 ${c*.5}px Figtree,sans-serif`;x.textAlign='center';x.textBaseline='middle';x.fillText('€↑',0,1)},
  t_sec:x=>tower(x,'#8FC9AE',()=>{shield(x,0,0,S*.42);x.stroke()}),
  t_auto:x=>tower(x,'#E5B65D',()=>{const s=S*.26;for(let i=0;i<8;i++){const a=i/8*6.283;x.moveTo(Math.cos(a)*s*.6,Math.sin(a)*s*.6);x.lineTo(Math.cos(a)*s,Math.sin(a)*s)}x.stroke();x.beginPath();x.arc(0,0,s*.5,0,7);x.stroke()}),
  t_bak:x=>tower(x,'#5f8fb0',()=>{const s=S*.2;x.strokeRect(-s,-s,2*s,2*s);x.fillRect(-s*.5,-s,s,s*.6)}),
  t_edu:x=>tower(x,'#cfe9dd',()=>{const s=S*.2;x.moveTo(-s,-s*.6);x.lineTo(0,-s*.2);x.lineTo(s,-s*.6);x.lineTo(s,s*.7);x.lineTo(0,s);x.lineTo(-s,s*.7);x.closePath();x.moveTo(0,-s*.2);x.lineTo(0,s);x.stroke()}),
  t_lead:x=>tower(x,'#FFC99C',()=>{const s=S*.22;for(let i=0;i<5;i++){const a=-Math.PI/2+i*2*Math.PI/5,b=a+Math.PI/5;x.lineTo(Math.cos(a)*s,Math.sin(a)*s);x.lineTo(Math.cos(b)*s*.42,Math.sin(b)*s*.42)}x.closePath();x.fill()}),
  t_comp:x=>tower(x,'#c9a0dc',()=>{const s=S*.2;x.moveTo(0,-s);x.lineTo(0,s*.9);x.moveTo(-s,-s*.55);x.lineTo(s,-s*.55);x.moveTo(-s*1.05,s*.15);x.arc(-s*.7,s*.15,s*.35,Math.PI,0,true);x.moveTo(s*.35,s*.15);x.arc(s*.7,s*.15,s*.35,Math.PI,0,true);x.moveTo(-s*.6,s*.9);x.lineTo(s*.6,s*.9);x.stroke()}),
  e_kyber:x=>virus(x,S*.26,'#e0604a'),
  e_phish:x=>{const s=S*.26;x.fillStyle='#e8a0b0';x.shadowColor='#e8a0b0';x.shadowBlur=10;x.fillRect(-s,-s*.7,2*s,1.4*s);x.shadowBlur=0;x.strokeStyle='#0B0628';x.lineWidth=3;x.beginPath();x.moveTo(-s,-s*.7);x.lineTo(0,s*.1);x.lineTo(s,-s*.7);x.stroke()},
  e_vika:x=>{const s=S*.28;x.fillStyle='#c98a5a';x.shadowColor='#c98a5a';x.shadowBlur=10;for(let i=0;i<7;i++){const a=i/7*6.283;x.fillRect(Math.cos(a)*s-5,Math.sin(a)*s-5,10,10)}x.beginPath();x.arc(0,0,s*.8,0,7);x.fill();x.shadowBlur=0;x.fillStyle='#0B0628';x.beginPath();x.arc(0,0,s*.3,0,7);x.fill()},
  e_boss:x=>virus(x,S*.36,'#ff4f3a',10)
};
window.RBS_ICON=function(key){
  if(cache[key])return cache[key];
  const c=document.createElement('canvas');c.width=c.height=S;const x=c.getContext('2d');
  x.fillStyle='#0e0830';rr(x,0,0,S,S,16);x.fill();x.save();x.translate(S/2,S/2);
  try{(D[key]||(()=>{}))(x)}catch(e){}
  x.restore();return cache[key]=c.toDataURL('image/png');
};
}
