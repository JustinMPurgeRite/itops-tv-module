// Injected by TizenBrew into the ITOps board page on the TV.
// Keeps the wall display healthy without anyone touching the remote.
(function () {
  var BOARD_URL = 'http://192.168.99.201:8080/';
  var HEALTH_URL = BOARD_URL + 'healthz';
  var FULL_RELOAD_MS = 6 * 60 * 60 * 1000; // fresh page every 6 hours (clears memory leaks)
  var HEALTH_CHECK_MS = 60 * 1000;

  // Hide the mouse pointer some Samsung remotes show.
  var style = document.createElement('style');
  style.textContent = 'html, body, * { cursor: none !important; }';
  (document.head || document.documentElement).appendChild(style);

  // Retry the background video if the TV blocked autoplay.
  function kickVideos() {
    var vids = document.getElementsByTagName('video');
    for (var i = 0; i < vids.length; i++) {
      vids[i].muted = true;
      if (vids[i].paused) { try { vids[i].play(); } catch (e) {} }
    }
  }
  setInterval(kickVideos, 15000);

  // If the board server was down and comes back, reload so data resumes.
  var wasDown = false;
  setInterval(function () {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', HEALTH_URL + '?t=' + Date.now(), true);
    xhr.timeout = 10000;
    xhr.onload = function () {
      if (xhr.status === 200 && wasDown) location.replace(BOARD_URL);
      wasDown = xhr.status !== 200;
    };
    xhr.onerror = xhr.ontimeout = function () { wasDown = true; };
    xhr.send();
  }, HEALTH_CHECK_MS);

  setTimeout(function () { location.replace(BOARD_URL); }, FULL_RELOAD_MS);
})();
