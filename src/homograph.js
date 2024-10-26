fetch('JSONFilePath').then().then().catch();


function is_char_homoglyphic(char1, char2) {
    if (char1 == char2) {
        return true
    }
    //function in python
    //return letter2 in [entry['char'] for entry in hgdb[letter1]['similar_char']]
    console.log(hgdb[letter1]['similar_char'].some(entry => entry['char'] == letter2));
    return hgdb[letter1]['similar_char'].some(entry => entry['char'] == letter2);
}