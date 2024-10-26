const fs = require('fs');
const path = require('path');

const libdir = path.resolve(__dirname);
const hgdbFile = fs.readFileSync(path.join(libdir, 'homographs.json'), 'utf-8');
const hgdb = JSON.parse(hgdbFile);

// Checks whether two individual characters are equivalent
function isCharHomoglyphic(letter1, letter2) {
    if (letter1 === letter2) {
        return true;
    }
    return hgdb[letter1]['similar_char'].some(entry => entry['char'] === letter2);
}

function looksSimilar(domain1, domain2) {
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

        if (!isCharHomoglyphic(letter1, letter2)) {
            return false;
        }
    }

    return true;
}

