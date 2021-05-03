function main(){
    const queryString = window.location.search
    const urlParams = new URLSearchParams(queryString);

    if(!urlParams.has("d"))
        return
    const destination = urlParams.get("d")

    const fullDestination = destinationRouter(destination)

    window.open(fullDestination, "_self", false)
}

function destinationRouter(destination){
    if(destination.endsWith("-checklist"))
        return `https://helagro.github.io/dynamic-checklist/?filename=${destination}`

    switch(destination){
        default: return destination;
    }
}



main()
