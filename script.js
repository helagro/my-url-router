const LINK_CONTAINER = document.getElementById("JSRedirectLinks")

const PREFIXES = {
    "lampServerDeviceControl": "http://192.168.0.198:8000/deviceControl.html?jsonUrl=itemContainerJson"
}
const DESTINATIONS = {
    "eveninglight": `${PREFIXES["lampServerDeviceControl"]}&device={"id":65541,"name":"bedroom bulb"}&action=setColor&payload=da5d41`
}


function main(){
    openDestination()
    displayRoutes()
}


//========== REDIRECT ==========

function openDestination(){
    const queryString = window.location.search
    const urlParams = new URLSearchParams(queryString)

    const hasD = urlParams.has("d")
    const hasPFX = urlParams.has("pfx")
    if(!hasD) return

    const d = urlParams.get("d")
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

function displayRoutes(){
    for(const route of DESTINATIONS){
        appendLink(route)
    }
}

function appendLink(route){
    const li = document.createElement("li")

    const link = document.createElement("a")
    link.innerText = route.name
    link.href = `?d=${route.name}`

    li.appendChild(link)
    LINK_CONTAINER.appendChild(li)
}



main()