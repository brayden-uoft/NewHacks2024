// import './loadlistener.js';
import * as homograph from './homograph.js';
import * as safetyReport from './safety-report.js';

const GOOGLE_ORIGIN = 'https://www.google.com';
let hgdb;
let domains;

homograph.loadHomographs().then(hg => {
    hgdb = hg;
});

homograph.loadDomains().then(d => {
    domains = d;
});

//Allows users to open the side panel by clicking on the action toolbar icon
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
            let domain = tab.url.match(/^(?:https?:)?(?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n]+)/im)[1];
            console.log(homograph.isIDNAttacker(domain, domains, hgdb));
            console.log(safetyReport.gen(tab.url));
        }
    });
}, { url: [{ schemes: ["http", "https"] }] });