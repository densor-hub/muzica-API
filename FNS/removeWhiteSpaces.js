 const removeWhiteSpaces =(phrase)=>{
    if(phrase?.length ===0 || phrase === undefined || phrase === null || phrase ===""){
        return phrase;
    }
    else{
        if(phrase.split(" ")?.length<2){
            return phrase?.trim();
        }
        else {
            let newPhrase='new';
            for(var i =0; i<= phrase?.split(" ")?.length ; i++){
                
                if(i!==phrase?.split(' ')?.length){
                   newPhrase= newPhrase + phrase?.split(" ")[i]?.trim();
                }
                else{
                    return newPhrase.split('new')[1];
                }
            }
        }
    }
}

module.exports = removeWhiteSpaces;