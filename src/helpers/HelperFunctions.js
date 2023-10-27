function extractHebrewCharacters(inputString) {
    return inputString.split('').filter(char => char >= '\u0590' && char <= '\u05FF').join('');
}
function returnOnlyHebrew(obj){
    for(const key in obj){
        if(obj[key].include("=")){
            obj[key]=extractHebrewCharacters(obj[key]);
        }
    }
    return obj;
}

module.exports={extractHebrewCharacters,returnOnlyHebrew};