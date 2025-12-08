self.addEventListener("install", () => {
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener("push", (event) => {
  const msg = event.data ? event.data.text() : "내용 없음";
  event.waitUntil(
    self.registration.showNotification("키워드 알림", {
      body: msg,
      icon: "/favicon-192x192.png"
    })
  );
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  event.waitUntil(self.clients.openWindow(self.location.origin + "/notices"));
});

self.addEventListener("fetch", () => {});
