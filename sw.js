/* YEVROPA OLAMI MILLIONER service worker. Network-first: new versions reach players at once; cache is only for offline. */
const CACHE='yom-v228';
const SHELL=['./','index.html','questions.js','questions-extra.js','questions-din.js','manifest.webmanifest','icon-192.png','icon-512.png','favicon.png','apple-touch-icon.png','icon-maskable-512.png','privacy.html'];
self.addEventListener('install',e=>{self.skipWaiting();e.waitUntil(caches.open(CACHE).then(c=>Promise.all(SHELL.map(u=>fetch(u,{cache:'reload'}).then(r=>r.ok&&c.put(u,r)).catch(()=>{})))))});
self.addEventListener('activate',e=>{e.waitUntil((async()=>{
  const keys=await caches.keys();const old=keys.filter(x=>x!==CACHE);
  await Promise.all(old.map(x=>caches.delete(x)));
  await self.clients.claim();
  if(old.length){const cs=await self.clients.matchAll({type:'window'});cs.forEach(c=>{try{c.navigate(c.url)}catch(_){}})}
})())});
self.addEventListener('message',e=>{if(e.data==='skip')self.skipWaiting()});
self.addEventListener('fetch',e=>{
  const r=e.request; if(r.method!=='GET')return;
  const u=new URL(r.url); if(u.origin!==location.origin)return;
  const nav=r.mode==='navigate'||/\.html?$|\/$/.test(u.pathname)||/\.js$/.test(u.pathname)||u.pathname.endsWith('.webmanifest');
  e.respondWith(fetch(r,{cache:nav?'no-store':'no-cache'}).then(res=>{if(res&&res.ok){const cp=res.clone();caches.open(CACHE).then(c=>c.put(r,cp))}return res})
    .catch(()=>caches.match(r,{ignoreSearch:true}).then(hit=>hit||(r.mode==='navigate'?caches.match('index.html'):Response.error()))));
});
