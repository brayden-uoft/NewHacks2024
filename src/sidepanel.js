const port = chrome.runtime.connect({ name: "sidepanel" });

// Listen for messages from the service worker
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === 'SUSPICIOUS_SITE') {
        document.getElementById('status').innerText = 'Possibly dangerous site';
    }
});