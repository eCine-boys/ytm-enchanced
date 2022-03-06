chrome.browserAction.onClicked.addListener(function (tab) {
  const youTubeIdFromLink = (url) =>
    url.match(
      /(?:https?:\/\/)?(?:www\.)?youtu(?:be)?\.(?:com|be)(?:\/watch\/?\?v=|\/embed\/|\/)([^\s&]+)/
    )[1];

  let apiUrl =
    "http://kore.zapto.org/api/youtube/" + youTubeIdFromLink(tab.url);

  window.open(apiUrl);
});

const sendUrlRequest = (x) => window.postMessage('request-intercept', x)

chrome.browserAction.onBeforeRequest.addListener(sendUrlRequest, 
  {urls: ["<all_urls>"]}); 