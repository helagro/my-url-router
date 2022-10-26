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
    if(!hasD && !hasPFX){
        console.log("Won't redirect, missing 'd' or 'pfx'")
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
    const plus = document.createElement("span")
    const dInput = document.createElement("input")
    const equals = document.createElement("span")
    const resultLink = document.createElement("a")

    link.innerText = prefixName
    link.href = `?pfx=${prefixName}&d=`

    plus.innerText = " + d="

    dInput.type = "text"
    dInput.addEventListener("input", (event) => {
        updateResultLink(event, resultLink, prefixName)
    })

    equals.innerText = " = "

    li.appendChild(link)
    li.appendChild(plus)
    li.appendChild(dInput)
    li.appendChild(equals)
    li.appendChild(resultLink)
    PREFIX_CONTAINER.appendChild(li)
}

function updateResultLink(event, resultLink, prefixName){
    const inputText = event.target.value
    const linkText = `?pfx=${prefixName}&d=${inputText}`
    resultLink.innerText = linkText
    resultLink.href = linkText
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