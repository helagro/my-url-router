const PREFIX_CONTAINER = document.getElementById("JSPrefixes")
const DESTINATIONS_CONTAINER = document.getElementById("JSRedirectDestinations")

const PREFIXES = {
    "lampServer": "http://192.168.0.198:8000/",
    "lampServerDeviceControl": `http://192.168.0.198:8000/deviceControl.html?jsonUrl=itemContainerJson`
}
const DESTINATIONS = {
    "eveninglight": `${PREFIXES["lampServerDeviceControl"]}&device={"id":65541,"name":"bedroom bulb"}&action=setColor&payload=da5d41`
}


function main(){
    openDestination()
    displayPrefixes()
    displayRoutes()
}


//========== REDIRECT ==========

function openDestination(){
    const queryString = window.location.search
    const urlParams = new URLSearchParams(queryString)

    const hasD = urlParams.has("d")
    const hasPFX = urlParams.has("pfx")
    if(!hasD){
        console.log("Won't redirect, no 'd' parameter")
        return
    }

    const d = urlParams.get("d")
    const pfx = urlParams.get("pfx")
    const prefix = hasPFX ? pfxRouter(pfx) : ""
    const destination = dRouter(d)
    const fullDestination = prefix + destination

    window.open(fullDestination, "_self", false)
}

function pfxRouter(pfx){
    if(pfx in PREFIXES)
        return PREFIXES[pfx]
    return pfx
}

function dRouter(d){
    if(d in DESTINATIONS)
        return DESTINATIONS[d]
    return d
}


//========== DISPLAY POSSIBLE REDIRECTS ==========

function displayPrefixes(){
    for(const prefixName in PREFIXES){
        appendPrefix(prefixName)
    }
}
function appendPrefix(prefixName){
    const li = document.createElement("li")

    const link = document.createElement("a")
    link.innerText = prefixName
    link.href = `?pfx=${prefixName}`

    li.appendChild(link)
    PREFIX_CONTAINER.appendChild(li)
}


function displayRoutes(){
    for(const destinationName in DESTINATIONS){
        appendDestination(destinationName)
    }
}
function appendDestination(destinationName){
    const li = document.createElement("li")

    const link = document.createElement("a")
    link.innerText = destinationName
    link.href = `?d=${destinationName}`

    li.appendChild(link)
    DESTINATIONS_CONTAINER.appendChild(li)
}



main()