const create_Username_url=(username)=>{
    console.log( username?.split(' ')?.length)
    if(username === null || username === undefined || username ==="" || username.length<=0){
        return false
    }
    else{
        if(username.split(' ')?.length<2){
            return username
        }
        else if(username?.split(' ')?.length>=2){
            let usernameInUrl="";
            for(var i=0; i<username?.split(' ')?.length; i++){
                usernameInUrl = usernameInUrl + '-' + username?.split(' ')[i];

            }

            if(usernameInUrl !==""){
                return usernameInUrl?.trim()?.slice(1, usernameInUrl?.trim()?.length)?.toLowerCase();
            }
        }
    }
}

module.exports = create_Username_url;