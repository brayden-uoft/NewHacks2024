// Get the URL parameters
const urlParams = new URLSearchParams(window.location.search);
const originalUrl = urlParams.get('url');
const safetyReport = urlParams.get('report');

// Update the safety report
document.getElementById('safety-report').innerText = safetyReport;

// Update the proceed link
const proceedLink = document.getElementById('proceed-link');
proceedLink.href = originalUrl;

// Store a flag in chrome.storage when the user clicks the "Proceed" link
proceedLink.addEventListener('click', () => {
    chrome.storage.local.set({ bypassWarning: true });
});
