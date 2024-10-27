import * as punycode from './punycode.js';

async function loadHomographs()
{
    const response = await fetch(chrome.runtime.getURL('src/homographs.json'));
    const text =  await response.text();
    const hgdb =  JSON.parse(text);
    return hgdb;
}

async function loadDomains()
{
    // fetch(chrome.runtime.getURL('src/common_domains.txt')).then(response => response.text()).then(names => {names.split('\n')}).then(domains => {
    //     return domains;
    // })
    const response = await fetch(chrome.runtime.getURL('src/common_domains.txt'));
    const text =  await response.text();
    const domains =  text.split('\n');
    return domains;
}
// Checks whether two individual characters are equivalent
function isCharHomoglyphic(letter1, letter2, hgdb) {
    if (letter1 == letter2) {
        console.log('same firsts letters');
        return true;
    }

    if (hgdb[letter1] && hgdb[letter1]['similar_char']) {
        console.log('lookalike character');
        return hgdb[letter1]['similar_char'].some(entry => entry['char'] == letter2);

    }
    return false;
}



function looksSimilar(domain1, domain2, hgdb) {
    /**
     * Determine whether two domains are homographic (visually equivalent or nearly so)
     */
    domain1 = domain1.toLowerCase();
    domain2 = domain2.toLowerCase();

    if (domain1.length !== domain2.length) {
        return false;
    }

    for (let i = 0; i < domain2.length; i++) {
        // console.log('testing on character number ');
        // console.log(i);
        // console.log(domain1);
        // console.log(domain2);
        let letter1 = domain1[i];
        let letter2 = domain2[i];
        console.log(domain1, domain2);

        if (!isCharHomoglyphic(letter1, letter2, hgdb)) {
            return false;
        }
    }
    return true;
}

function isIDNAttacker(website, domains, hgdb) {
    /**
     * Determines whether a domain is likely to be an IDN attacker
     */
    let domain = website.match(/^(?:https?:)?(?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n]+)/im)[1];
    if (domain.includes('xn--')) {
        // website=website.slice(4);
        domain = punycode.toUnicode(domain);
    }

    let i = 0;
    console.log('testing with apple.com');
    console.log('domain name is ');
    console.log(domain);
    console.log(looksSimilar('apple.com', domain, hgdb));
    console.log('\n');
    console.log('completed initial test');
    while (i < 500)
    {
        console.log("Iteration: " + i + "");
        if (looksSimilar(domains[i], domain, hgdb))
        {

            return true;

        }
        i++
    }
    return false;
}

export { isIDNAttacker, loadHomographs, loadDomains };