importScripts(
  "https://www.gstatic.com/firebasejs/11.1.0/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/11.1.0/firebase-messaging-compat.js"
);

firebase.initializeApp({
  apiKey: "AIzaSyBFso7xda7jEaPhEiNg_n2J_F66Qfltx9I",
  authDomain: "sauravmart-9a13a.firebaseapp.com",
  projectId: "sauravmart-9a13a",
  storageBucket: "sauravmart-9a13a.firebasestorage.app",
  messagingSenderId: "202882851585",
  appId: "1:202882851585:web:dfff7f4f4c901f275c3100",
  measurementId: "G-CZE2Z8L0E8",
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  const notificationTitle = payload.data.title;
  const notificationOptions = {
    body: payload.data.body,
    icon: payload.data.icon,
  };
  self.registration.showNotification(notificationTitle, notificationOptions);
});
