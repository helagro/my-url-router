const LAMP_SERVER_PREFIX = "http://192.168.0.198:8000/deviceControl.html?jsonUrl=itemContainerJson"
const SET_WIRELESS_CHARGER_STATE = `${LAMP_SERVER_PREFIX}&device={"id":65539,"name":"wireless charger"}&action=setState`

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
            return `${LAMP_SERVER_PREFIX}&device={"id":65541,"name":"bedroom bulb"}&action=setColor&payload=da5d41`
        case "turnOnWirelessCharger":
            return `${SET_WIRELESS_CHARGER_STATE}&payload=1`
        case "turnOffWirelessCharger":
            return `${SET_WIRELESS_CHARGER_STATE}&payload=0`
        default: return destination;
    }
}



main()
