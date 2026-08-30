const CACHE='arabic-structure-lab-v0.4.18';
const CORE=['./','./index.html','./manifest.webmanifest','./icon.svg'];

self.addEventListener('install',event=>{
  self.skipWaiting();
  event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(CORE)));
});

self.addEventListener('activate',event=>{
  event.waitUntil((async()=>{
    const keys=await caches.keys();
    await Promise.all(keys.filter(key=>key!==CACHE).map(key=>caches.delete(key)));
    await self.clients.claim();
  })());
});

self.addEventListener('fetch',event=>{
  const req=event.request;
  if(req.method!=='GET')return;
  const url=new URL(req.url);
  if(url.origin!==self.location.origin)return;
  const isFreshCritical=req.mode==='navigate'||/\/arabic\/(?:index\.html|course-mode\.js|course-lexicon-pack\.js|course-lexicon-bridge\.js|audio-service\.js|audio-voice-selector\.js|word-audio\.js|sentence-pager\.js|custom-corpus\.js|ai-corpus-normalizer\.js|ai-corpus-word-panel\.js|language-mode\.js|cefr-curriculum\.js|deep-analysis[^/]*\.js|deep-audit[^/]*\.js|nominal[^/]*\.js|word-declension\.js|verb-conjugation-full\.js|verb-conjugation-corpus-pack\.js|course-word-depth\.js|a1-[^/]*\.js)(?:\?.*)?$/.test(url.pathname+url.search);
  if(isFreshCritical){
    event.respondWith((async()=>{
      try{const fresh=await fetch(req,{cache:'no-store'});if(fresh&&fresh.ok){const cache=await caches.open(CACHE);cache.put(req,fresh.clone())}return fresh}
      catch(err){const cached=await caches.match(req);if(cached)return cached;if(req.mode==='navigate')return caches.match('./index.html');throw err}
    })());return;
  }
  event.respondWith((async()=>{
    const cached=await caches.match(req);if(cached)return cached;
    try{const fresh=await fetch(req);if(fresh&&fresh.ok){const cache=await caches.open(CACHE);cache.put(req,fresh.clone())}return fresh}
    catch(err){if(req.mode==='navigate')return caches.match('./index.html');throw err}
  })());
});
