const LINK_CONTAINER = document.getElementById("JSRedirectLinks")

const LAMP_SERVER_PREFIX = "http://192.168.0.198:8000/deviceControl.html?jsonUrl=itemContainerJson"
const ROUTES = [
    new Route("eveninglight", `${LAMP_SERVER_PREFIX}&device={"id":65541,"name":"bedroom bulb"}&action=setColor&payload=da5d41`),
]


function main(){
    openDestination()
    displayRoutes()
}


//========== REDIRECT ==========

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


//========== DISPLAY POSSIBLE REDIRECTS ==========

function displayRoutes(){
    for(const route of ROUTES){
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