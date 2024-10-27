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

/*
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
*/

chrome.webNavigation.onCompleted.addListener( (details) => {
    // chrome.storage.local.clear();
    chrome.tabs.get(details.tabId, async (tab) => {
        if (tab.url) {
            //console.log("Page loaded with URL:", tab.url);
            //console.log(hgdb);
            const url = new URL(tab.url);
            const domain = url.hostname;

            // Check if the user has chosen to proceed
            chrome.storage.local.get(['bypassWarning'], async (result) => {
                if (!result.bypassWarning) {
                    //const isSuspicious = true;
                    const isSuspicious = homograph.isIDNAttacker(domain, domains, hgdb);
                    console.log("Is suspicious:", isSuspicious);
                    if (isSuspicious) {
                        const report = await safetyReport.gen(tab.url);
                        const fishyUrl = chrome.runtime.getURL('fishy.html');
                        const redirectUrl = `${fishyUrl}?url=${encodeURIComponent(tab.url)}&report=${encodeURIComponent(report)}`;
                        chrome.tabs.update(details.tabId, { url: redirectUrl });
                    }
                } else {
                    chrome.storage.local.set({ bypassWarning: false });
                }
            });
        }
    });
}, { url: [{ schemes: ["http", "https"] }] });

chrome.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
    if (message.type === 'GENERATE_SAFETY_REPORT') {
        const tabId = sender.tab ? sender.tab.id : null;
        if (tabId) {
            chrome.tabs.get(tabId, async (tab) => {
                if (tab.url) {
                    console.log("Generating safety report for URL:", tab.url);
                    const report = await safetyReport.gen(tab.url);
                    const userTriggeredUrl = chrome.runtime.getURL('user-triggered.html');
                    const redirectUrl = `${userTriggeredUrl}?url=${encodeURIComponent(tab.url)}&report=${encodeURIComponent(report)}`;
                    chrome.tabs.update(tabId, { url: redirectUrl });
                }
            });
        } else {
            // Fallback: Get the current active tab and update its URL
            chrome.tabs.query({ active: true, currentWindow: true }, async (tabs) => {
                if (tabs.length > 0) {
                    const tab = tabs[0];
                    if (tab.url) {
                        console.log("Generating safety report for URL:", tab.url);
                        const report = await safetyReport.gen(tab.url);
                        const userTriggeredUrl = chrome.runtime.getURL('user-triggered.html');
                        const redirectUrl = `${userTriggeredUrl}?url=${encodeURIComponent(tab.url)}&report=${encodeURIComponent(report)}`;
                        chrome.tabs.update(tab.id, { url: redirectUrl });
                    }
                }
            });
        }
    }
});