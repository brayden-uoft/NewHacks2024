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

chrome.webNavigation.onCompleted.addListener( (details) => {
    chrome.tabs.get(details.tabId, async (tab) => {
        if (tab.url) {
            console.log("Page loaded with URL:", tab.url);
            const url = new URL(tab.url);
            const domain = url.hostname;
            const proceed = url.searchParams.get('proceed');
            console.log("Domain:", domain);
            console.log("Proceed flag:", proceed);

            // Check if the user has chosen to proceed
            if (proceed !== 'true') {
                //const isSuspicious = true;
                const isSuspicious = homograph.isIDNAttacker(domain, domains, hgdb);
                console.log("Is suspicious:", isSuspicious);
                if (isSuspicious) {
                    const report = await safetyReport.gen(tab.url);
                    const fishyUrl = chrome.runtime.getURL('fishy.html');
                    const redirectUrl = `${fishyUrl}?url=${encodeURIComponent(tab.url)}&report=${encodeURIComponent(report)}`;
                    chrome.tabs.update(details.tabId, { url: redirectUrl });
                }
            }
        }
    });
}, { url: [{ schemes: ["http", "https"] }] });