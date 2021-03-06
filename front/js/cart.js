
const cartItemHTML = document.querySelector('#cart__items')
const formHTML = document.querySelector('.cart__order__form')
const url = "http://localhost:3000/api/products"
async function getData(url){
  try {
    const response = await fetch(url)
    const data = await response.json()
    return data
  } catch (error) {
      console.error(error)
  }
}

getData(url).then(products => {
  displayCart(products)
  .then(() => {
    deleteKanap()
    updateKanap()
    displayTotalPriceAndQuantity()
  })
})

async function displayCart(products) {
  console.log(products)
  // On execute le code seulement si le panier est defini au niveau du LocalStorage 
  if (localStorage.getItem('panier')) {
    // On recupere le panier depuis le LocalStorage et on le parse pour recuperer un tableau
    const panier = JSON.parse(localStorage.getItem('panier'))
    // Pour chaque Kanap dans le panier on genere le html ci-dessous tout en injectant le données
    // pour chaque kanap
    panier.forEach(kanap => {
      const {price} = products.find(product => product._id === kanap.id)
      cartItemHTML.innerHTML += `
            <article class="cart__item" data-price=${price} data-id=${kanap.id} data-color=${kanap.color}>
            <div class="cart__item__img">
              <img src=${kanap.image.src} alt=${kanap.image.alt}>
            </div>
            <div class="cart__item__content">
              <div class="cart__item__content__description">
                <h2>${kanap.name}</h2>
                <p>${kanap.color}</p>
                <p>${price}€</p>
              </div>
              <div class="cart__item__content__settings">
                <div class="cart__item__content__settings__quantity">
                  <p>Qté : </p>
                  <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value=${kanap.quantity}>
                </div>
                <div class="cart__item__content__settings__delete">
                  <p class="deleteItem">Supprimer</p>
                </div>
              </div>
            </div>
          </article>
            `
    })
  }
  displayTotalPriceAndQuantity()
}



function deleteKanap() {

  // On recupere tout les elements HTML qui ont la classe CSS deleteItem dans un tableaux
  const deleteItems = [...document.querySelectorAll('.deleteItem')]

  // Pour chaque bouton de suppression 
  deleteItems.forEach(deleteItem => {

    let panier = []
    // On grefe un gestionnaire d'evenement de type click
    deleteItem.addEventListener('click', (event) => {
      // On recupere le panier depuis le LocalStorage et on le parse pour recuperer un tableau
      const panierStorage = JSON.parse(localStorage.getItem('panier'))
      // On recupere l'id de chaque Kanap depuis le dataset
      const id = event.target.closest(".cart__item").dataset.id
      // On supprime l'element HTML cart__item ainsi que tout son contenu
      event.target.closest(".cart__item").remove()
      // On filtre pour extraire tout les Kanap sauf le Kanap courrant (Celui qu'on essaie de supprimer)
      const filterdPanier = panierStorage.filter(item => item.id !== id)
      // on ajoute les Kanap contenu dans la variable filterdPanier
      panier.push(filterdPanier)
      // On Sauvegarde le panier dans le LocalStorage
      localStorage.setItem('panier', JSON.stringify(filterdPanier))
      panier = []
      displayTotalPriceAndQuantity()
    })
  })
}

function updateKanap() {
  let panier = []
  // On recupere tous les elelemnts HTML qui ont la classe itemQuantity
  const itemQuantities = [...document.querySelectorAll('.itemQuantity')]

  // On recupere le contenu de la clé panier depuis le localStorage
  // Et on la parse pour recuperer un tableau contenant des objets
  const panierStorage = JSON.parse(localStorage.getItem('panier'))


  itemQuantities.forEach(itemQuantity => {
    // On ecoute sur l'evenement change
    itemQuantity.addEventListener('change', (event) => {
      // On recupere pour chaque Kanap son id depuis le HTML
      const id = itemQuantity.closest('.cart__item').dataset.id
      // On sauvegarde la quantité issu des input  
      const quantity = +event.target.value
      // On recupere le Kanap à modifier
      const kanapToUpdate = panierStorage.find(kanap => kanap.id === id)
      // On recupere les Autres Kanaps 
      const otherKanap = panierStorage.filter(kanap => kanap.id !== id)
      if(quantity <= 0){
        itemQuantity.value = kanapToUpdate.quantity
        return alert("La quantité doit etre au minimum de 1 😁")
      }

      // On met à jour la quantity pour le Kanap à modifier
      kanapToUpdate.quantity = quantity
      // On met à jour le prix total pour le Kanap à modifier
      kanapToUpdate.totalPrice = quantity * kanapToUpdate.price
      // On ajoute au panier les Kanap modifié ainsi que les autres Kanap non modifié
      panier.push(...otherKanap, kanapToUpdate)
      // On met à jour dans le localStorage
      localStorage.setItem('panier', JSON.stringify(panier))
      // On vide la variable Panier
      panier = []
      // Appel à la fonction
      displayTotalPriceAndQuantity()
    })
  })
}

function displayTotalPriceAndQuantity() {
  const cartItem =[ ...document.querySelectorAll(".cart__item")]

  const totalQuantityHTML = document.querySelector('#totalQuantity')
  const totalPriceHTML = document.querySelector('#totalPrice')
  const panierStorage = JSON.parse(localStorage.getItem('panier'))

  // On vide le contenu des elements HTML
  totalQuantityHTML.textContent = ""
  totalPriceHTML.textContent = ""

  let totalQuantity = 0
  let totalPricePerKanap = 0
  let totalPrice = 0

  const kanapQuantity = panierStorage.map(kanap => {
    // On sauvegarde la quantité total ainsi que le prix total du panier
      totalQuantity += kanap.quantity 
      return  kanap.quantity
  })

     cartItem.forEach((item, index) => {
       totalPricePerKanap = +item.dataset.price * kanapQuantity[index]
       totalPrice += totalPricePerKanap 
       totalPricePerKanap = 0
     })
    // Affiche la quantité total ainsi que le prix total du panier 
     totalQuantityHTML.innerText = totalQuantity
     totalPriceHTML.innerText = totalPrice
}



//passer la commande via le formulaire

formHTML.addEventListener('submit', async (event) => {

  // On empeche le navigateur de soumettre le formulaire
  event.preventDefault()

  const panierStorage = JSON.parse(localStorage.getItem('panier'))
  if(panierStorage.length === 0){
    return alert("Votre panier est vide")
  }
  // Tableaux pour sauvegarder les ID des Kanap
  const products = []
  const cartItems = [...document.querySelectorAll('.cart__item')]
  // Pour chaque cartItem on recupere l'ID et on l'ajoute au tableau products
  cartItems.forEach(cart => {
    products.push(cart.dataset.id)
  })


  const firstNameHTML = document.querySelector("#firstName")
  const lastNameHTML = document.querySelector("#lastName")
  const addressHTML = document.querySelector("#address")
  const cityHTML = document.querySelector("#city")
  const emailHTML = document.querySelector("#email")
  // Valider les inputs
  // REGEX
  const alphaNumericalRegex = /^[\w_-\s]*$/
  const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
  const alphabeticalRegex = /^[a-zA-Z ]+$/
  const cityRegex = /^[a-zA-Z -]+$/


/// Test des valeurs des inputs avec les regex 
  const regexResultFirstName = alphabeticalRegex.test(firstNameHTML.value)
  const regexResultLastName = alphabeticalRegex.test(lastNameHTML.value)
  const regexResultAddress = alphaNumericalRegex.test(addressHTML.value)
  const regexResultCity = cityRegex.test(cityHTML.value)
  const regexResultEmail = emailRegex.test(emailHTML.value)


// Si le champs est incorrect on affiche un message d'erreur
  if (!regexResultFirstName) {
    return document.querySelector('#firstNameErrorMsg').innerText = "Veuillez rentrer un prénom valide"
  }
  // sinon on affiche rien
  else {
    document.querySelector('#firstNameErrorMsg').innerText = ""
  }

  if (!regexResultLastName) {
    return document.querySelector('#lastNameErrorMsg').innerText = "Veuillez rentrer un nom valide"
  }
  else {
    document.querySelector('#lastNameErrorMsg').innerText = ""
  }

  if (!regexResultAddress) {
    return document.querySelector('#addressErrorMsg').innerText = "Veuillez rentrer une addresse valide"
  }
  else {
    document.querySelector('#addressErrorMsg').innerText = ""
  }

  if (!regexResultCity) {
    return document.querySelector('#cityErrorMsg').innerText = "Veuillez rentrer une ville valide"
  }
  else {
    document.querySelector('#cityErrorMsg').innerText = ""
  }

  if (!regexResultEmail) {
    return document.querySelector('#emailErrorMsg').innerText = "Veuillez rentrer un email valide"
  }
  else {
    document.querySelector('#emailErrorMsg').innerText = ""
  }




  // L'objet Contact
  const contact = {
    firstName: firstNameHTML.value,
    lastName: lastNameHTML.value,
    address: addressHTML.value,
    city: cityHTML.value,
    email: emailHTML.value
  }
  // Envoie des données à l'api
  try {
    const response = await fetch("http://localhost:3000/api/products/order", {
      // Methede POST
      method: "POST",
      // entete pour prevenir l'api de la nature du contenu
      headers: {
        "Content-Type": "application/json"
      },
      // Le contenu sous format JSON
      body: JSON.stringify({ contact, products })
    })
    // On recupere l'id unique de la commande
    const data = await response.json()
    
    // On vide le panier
    localStorage.setItem("panier", JSON.stringify([]))
    // Redirection vers la page de confirmation
    window.location.href = "confirmation.html?id="+data.orderId
  } catch (error) {
    // Si erreur on affiche l'erreur au niveau de la console
    console.log(error)
  }
})



