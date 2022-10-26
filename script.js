const LINK_CONTAINER = document.getElementById("linkContainer")
const VERSION = "1.1"

const LAMP_SERVER_PREFIX = "http://192.168.0.198:8000/deviceControl.html?jsonUrl=itemContainerJson"
const SET_WIRELESS_CHARGER_STATE = `${LAMP_SERVER_PREFIX}&device={"id":65539,"name":"wireless charger"}&action=setState`
const ROUTES = [
    new Route("eveninglight", `${LAMP_SERVER_PREFIX}&device={"id":65541,"name":"bedroom bulb"}&action=setColor&payload=da5d41`),
    new Route("turnOnWirelessCharger", `${SET_WIRELESS_CHARGER_STATE}&payload=1`),
    new Route("turnOffWirelessCharger", `${SET_WIRELESS_CHARGER_STATE}&payload=0`)
]


function main(){
    console.log(`Version: ${VERSION}`)
    openDestination()
    displayRoutes()
}

function openDestination(){
    const queryString = window.location.search
    const urlParams = new URLSearchParams(queryString)

    if(!urlParams.has("d")) return
    const destination = urlParams.get("d")

    const fullDestination = destinationRouter(destination)
    window.open(fullDestination, "_self", false)
}

function destinationRouter(destination){
    for(const route of ROUTES){
        if(route.name === destination){
            return route.destination
        }
    }
    return destination
}

function displayRoutes(){
    for(const route of ROUTES){
        appendLink(route)
    }
}

function appendLink(route){
    const li = document.createElement("li")

    const link = document.createElement("a")
    link.innerText = route.name
    link.href = route.destination

    li.appendChild(link)
    LINK_CONTAINER.appendChild(li)
}



main()
