
// Register Service Worker, if available.
if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('/sw.js')
    .then(function () {
      console.log('Service worker registered!');
    });
}

// PWA Features.
////////////////

// Installation.
////////////////

// Initialize deferredPrompt for use later to show browser install prompt.
let deferredPrompt;

// This event is fired when the apps become "installable".
// https://developers.google.com/web/fundamentals/app-install-banners/
window.addEventListener('beforeinstallprompt', (e) => {
  // Prevent the mini-infobar from appearing on mobile
  e.preventDefault();
  // Stash the event so it can be triggered later.
  deferredPrompt = e;
  // Update UI notify the user they can install the PWA
  // showInstallPromotion();
  // Optionally, send analytics event that PWA install promo was shown.
  console.log(`'beforeinstallprompt' event was fired.`);
});

let buttonInstall = document.getElementById('install');

buttonInstall.addEventListener('click', async () => {

  // Cannot install yet.
  if (!deferredPrompt) return;

  // Show the install prompt
  deferredPrompt.prompt();
  // Wait for the user to respond to the prompt
  const { outcome } = await deferredPrompt.userChoice;
  // Optionally, send analytics event with outcome of user choice
  console.log(`User response to the install prompt: ${outcome}`);
  // We've used the prompt, and can't use it again, throw it away
  deferredPrompt = null;
});


window.addEventListener('appinstalled', () => {
  // Hide the app-provided install promotion
  toggleInstallPromotion(false);
  // Clear the deferredPrompt so it can be garbage collected
  deferredPrompt = null;
  // Optionally, send analytics event to indicate successful install
  console.log('PWA was installed');
});

function toggleInstallPromotion(value) {
  buttonInstall.style.display = value ? '' : 'none';
};

function isPWAInstalled() {
  // For iOS.
  if (window.navigator.standalone) return true
  // For Android.
  if (window.matchMedia('(display-mode: standalone)').matches) return true
  return false
}

// Notifications.
/////////////////

let msgs = [
  'You successfully subscribed to our Notification service!',
  'Still subscribed',
  'You don\'t believe me?',
  'OK, let me repeat.'
];


if ('Notification' in window) {
  let btn = document.getElementById('notification');
  btn.addEventListener('click', showNotification);
}

let counter = 0;
function showNotification() {
  Notification.requestPermission(function (result) {
    if (result === 'granted') {
      navigator.serviceWorker.ready.then(function (registration) {
        let idx = counter++ % msgs.length;
        let body = msgs[idx];
        // Avoiding the same ID twice, otherwise it is not displayed.
        registration.showNotification(`You are subscribed! (${idx + 1})`, {
          body: body,
          icon: 'img/smile.png',
          vibrate: [200, 100, 200, 100, 200, 100, 200],
          tag: 'vibration-sample',
          renotify: true
        });
      });
    }
  });
}

// The user has clicked on the notification ...
window.addEventListener('notificationclick', function (event) {
  // Android doesn't close the notification when you click on it
  // See: http://crbug.com/463146
  event.notification.close();
});