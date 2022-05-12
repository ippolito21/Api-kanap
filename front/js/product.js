
// elements HTML

const image = document.querySelector('.item__img img')
const title = document.querySelector('#title')
const price = document.querySelector('#price')
const description = document.querySelector("#description")
const colorsHTMLElement = document.querySelector('#colors')
const quantityHTMLElement = document.querySelector("#quantity")

const addToCartBtn = document.querySelector('#addToCart')
const kanapsPrice = []

//faire le lien entre un produit de la page d'acceuil et la page produit
// un nouvel objet params 
const params = new URLSearchParams(location.search)
// Récupère ID  de l'url en cours
const id = params.get("id")

// URL API pour un seule ressource avec un ID unique
const url = `http://localhost:3000/api/products/${id}`

async function getData(url) {
    try {
        const response = await fetch(url)
        const data = await response.json()
        appendSingleData(data)
    } catch (error) {
        console.error(error)
    }
}

//Inserer un produit et ses détails dans la page produit

// Ajoute les données relatives à un Kanap dans le HTML
function appendSingleData(data) {
    // ajoute l'url de l'image à la balise img
    image.src = data.imageUrl
    // ajoute le texte alternatif de l'image à la balise img
    image.alt = data.altTxt
    // ajoute le nom du Kanap
    title.innerText = data.name
    // ajoute le prix du Kanap
    price.innerText = data.price
    // ajoute la description du Kanap
    description.innerText = data.description

    // Recupere chaque couleur dans le tableau colors
    data.colors.forEach(color => {
        // Pour chaque couleur, génère un element html option tout en injectant la couleur comme valeur et comme contenu
        colorsHTMLElement.innerHTML += `
        <option value="${color}">${color}</option>
        `
    })

}
getData(url)

//ajouter des produits dans le panier
// fonction ajouter dans le panier
function addToCart() {
    if(+quantityHTMLElement.value <= 0){
        return alert("La quantité doit etre au minimum de 1 😁")
    }
    if(!colorsHTMLElement.value){
        return alert("Veuillez choisir une couleur 😁")
    }
    // ** Objet KANAP
    const kanap = {
        quantity: +quantityHTMLElement.value,
        color: colorsHTMLElement.value,
        name: title.textContent,
        id: id,
        image: {
            src: image.src,
            alt: image.alt
        }
    }
    
    kanapsPrice.push(kanap)
    
    //afficher  un tableau  des achats dans la page panier
    // ** Tableau a mettre dans le localStorage
    const panier = []
    // Si panier existe dans le LocalStorage
    if (localStorage.getItem('panier')) {
        // ** On recupere le panier 
        const panierStorage = JSON.parse(localStorage.getItem('panier'))
        // On filtre pour extraire tout les Kanap sauf le Kanap courrant (Celui qu'on essaie de modifier)
        const panierFilter = panierStorage.filter(item => item.id !== kanap.id)
        // Ajoute les anciens Kanap ainsi que le nouveau Kanap
        panier.push(...panierFilter, kanap)
        // On Sauvegarde le panier dans le LocalStorage
        localStorage.setItem("panier", JSON.stringify(panier))
    }
    else {
        // // Si le  panier n'existe pas  dans le LocalStorage

        // Ajoute le premier Kanap
        panier.push(kanap)
        // On Sauvegarde le panier dans le LocalStorage
        localStorage.setItem("panier", JSON.stringify(panier))
    }

    alert("Produit ajouté au panier")
}


// ecoute l'evenement click, sur le button ajouter au panier et lance la fonction addToCart
addToCartBtn.addEventListener("click", addToCart)

