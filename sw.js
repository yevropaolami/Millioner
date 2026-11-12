/* YEVROPA OLAMI MILLIONER service worker. Bump CACHE when you upload a new version. */
const CACHE='yom-v182';
const SHELL=['./','index.html','questions.js','questions-extra.js','manifest.webmanifest','icon-192.png','icon-512.png','favicon.png','apple-touch-icon.png','icon-maskable-512.png','privacy.html'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(SHELL)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==CACHE).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{
  const r=e.request; if(r.method!=='GET')return;
  const u=new URL(r.url); if(u.origin!==location.origin)return;
  e.respondWith(caches.match(r,{ignoreSearch:true}).then(hit=>{
    const net=fetch(r).then(res=>{if(res&&res.ok){const cp=res.clone();caches.open(CACHE).then(c=>c.put(r,cp))}return res}).catch(()=>hit||(r.mode==='navigate'?caches.match('index.html'):Response.error()));
    return hit||net;
  }));
});
