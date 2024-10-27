document.getElementById('generate-report').addEventListener('click', () => {
    const currentUrl = window.location.href;
    chrome.runtime.sendMessage({ type: 'GENERATE_SAFETY_REPORT', url: currentUrl });
});