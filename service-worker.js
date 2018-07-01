var dataCacheName = 'weatherData-v1';
var DBOpenRequest = indexedDB.open("CurrenciesDatabase", 1);

// Create the schema
DBOpenRequest.onupgradeneeded = function() {
    var db = DBOpenRequest.result;
    var store = db.createObjectStore("currenciesStore", {keyPath: "currencies"});
    //var index = store.createIndex("NameIndex", ["name.last", "name.first"]);
};

var dataCacheName = 'mycach1-v1';
var cacheName = 'mycach-v1';

var filesToCache = [
  '/',
  '/index.html',
  '/scripts.js',
  '/style.css',
  '/logo.png',
  '/down-arrow.png'
];

self.addEventListener('install', function(e) {
  console.log('[ServiceWorker] Install');
  e.waitUntil(
    caches.open(cacheName).then(function(cache) {
      console.log('[ServiceWorker] Caching app shell');
      return cache.addAll(filesToCache);
    })
  );
});

self.addEventListener('activate', function(e) {
  console.log('[ServiceWorker] Activate');
  
  e.waitUntil(
	
    caches.keys().then(function(keyList) {
      return Promise.all(keyList.map(function(key) {
        if (key !== cacheName && key !== dataCacheName) {
          console.log('[ServiceWorker] Removing old cache', key);
          return caches.delete(key);
        }
      }));
    })
  );
  return self.clients.claim();
});

self.addEventListener('fetch', function(e) {
  console.log('[ServiceWorker] Fetch', e.request.url);

  if (e.request.url == "https://free.currencyconverterapi.com/api/v5/convert?q=USD_PHP&compact=y")
  {
	 
	//////////////
  var db = DBOpenRequest.result;
			var tx = db.transaction("currenciesStore", "readwrite");
			var store = tx.objectStore("currenciesStore");
			//var index = store.index("NameIndex");
			store.put({currencies: e.request.url, valeur: {"USD_PHP":{"val":53.480016}} });  
	/////
	  
  }
	 
  
  e.respondWith(
    caches.match(e.request).then(function(response) {
	  return response || fetch(e.request);
    })
  );
});
