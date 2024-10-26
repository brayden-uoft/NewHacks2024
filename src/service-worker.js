// import './loadlistener.js';
import * as homograph from './homograph.js';
// import './safety-report.js';

const GOOGLE_ORIGIN = 'https://www.google.com';
const hgdb = homograph.loadHomographs();
const domains = homograph.loadDomains();

// Allows users to open the side panel by clicking on the action toolbar icon
chrome.sidePanel
    .setPanelBehavior({ openPanelOnActionClick: true })
    .catch((error) => console.error(error));

chrome.tabs.onUpdated.addListener(async (tabId, info, tab) => {
    if (!tab.url) return;
    const url = new URL(tab.url);

    // Enables the side panel
    await chrome.sidePanel.setOptions({
        tabId,
        path: 'sidepanel.html',
        enabled: true
    });

});

chrome.webNavigation.onCompleted.addListener((details) => {
    chrome.tabs.get(details.tabId, (tab) => {
        if (tab.url) {
            console.log("Page loaded with URL:", tab.url);
            console.log(homograph.isIDNAttacker(tab.url, domains, hgdb));
        }
    });
}, { url: [{ schemes: ["http", "https"] }] });