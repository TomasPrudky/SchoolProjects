import { useLocalState } from "./useLocalStorage";

function checkAuth(){
    const jwt = localStorage.getItem("jwt");
    console.log("CHECK OUT FUNCTION WAS CALLED");
    if(jwt) console.log("DSDSDD");
}

export { checkAuth };