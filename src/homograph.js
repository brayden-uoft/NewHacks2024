async function loadHomographs()
{
    const response = await fetch(chrome.runtime.getURL('src/homographs.json'));
    const hgdb =  response.json();
    return hgdb;
}

async function loadDomains()
{
    const response = await fetch(chrome.runtime.getURL('src/common_domains.txt'));
    const text =  await response.text() + '';
    const domains = await text.split('\n');
    //console.log(domains);
    return domains;
}
// Checks whether two individual characters are equivalent
function isCharHomoglyphic(letter1, letter2, hgdb) {
    if (letter1 === letter2) {
        return true;
    }
    if (hgdb[letter1] && hgdb[letter1]['similar_char']) {
        return hgdb[letter1]['similar_char'].some(entry => entry['char'] === letter2);
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

    for (let i = 0; i < domain1.length; i++) {
        const letter1 = domain1[i];
        const letter2 = domain2[i];

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
    let i = 0;
    while (i < domains.length)
    {
        if (looksSimilar(website, domains[i], hgdb))
        {
            return true;
        }
        i++
    }
    return false;
}

export { isIDNAttacker, loadHomographs, loadDomains };