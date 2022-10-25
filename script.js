function main(){
    const queryString = window.location.search
    const urlParams = new URLSearchParams(queryString);

    if(!urlParams.has("d")) return
    const destination = urlParams.get("d")

    const fullDestination = destinationRouter(destination)

    window.open(fullDestination, "_self", false)
}

function destinationRouter(destination){
    switch(destination){
        case "eveninglight":
            return 'http://192.168.0.198:8000/deviceControl.html?jsonUrl=itemContainerJson'
                + '&device={"id":65541,"name":"bedroom bulb"}'
                +'&action=setColor'
                + '&payload=da5d41'
        default: return destination;
    }
}



main()
