// Get the URL parameters
const urlParams = new URLSearchParams(window.location.search);
const originalUrl = urlParams.get('url');
const safetyReport = urlParams.get('report');

// Update the safety report
document.getElementById('safety-report').innerText = safetyReport;

// Update the proceed link to include the proceed flag
document.getElementById('proceed-link').href = `${originalUrl}`;