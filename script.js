const serverIp = "http://192.168.10.128"

function main(){
    const queryString = window.location.search
    const urlParams = new URLSearchParams(queryString);

    if(!urlParams.has("d"))
        return
    const destination = urlParams.get("d")

    const fullDestination = destinationRouter(destination)

    window.open(fullDestination, "_blank")
}

function destinationRouter(destination){
    switch(destination){
        case "counter" :
            return serverIp + ":9992"
        default:
            return serverIp + ":9991/" + destination
    }
}



main()
