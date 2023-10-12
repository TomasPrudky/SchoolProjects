async function ajax(url,requestMethod, jwt, requestBody){

    const fetchData = {
        headers: {
            "Content-Type": "application/json",
            'Access-Control-Allow-Origin':'*',
        },
        method: requestMethod
    }

    if(jwt){
        fetchData.headers.Authorization = jwt;
    }

    if(requestBody){
        fetchData.body = JSON.stringify(requestBody);
    }

    const response = await fetch(url, fetchData);
    if (response.status === 200)
        return response.json();
    if (response.status === 401){
        localStorage.clear();
        window.location.replace("/login");
    }
    else
        return alert("Some was wong!");
}

export default ajax;