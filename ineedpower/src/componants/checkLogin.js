//import React from "react";


function checkLogin(user) {
        for(var key in user) {
            if(user.hasOwnProperty(key))
                return false;
        }
        return true;
}

export default checkLogin;