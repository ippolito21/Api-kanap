function confirmationData() {
    // on recupere la commande contenant notamment le numero de commande  
    const commandeStorage = JSON.parse(localStorage.getItem('commande'))
    // on recupere l'element HTML orderId
    const orderIdHTML = document.querySelector("#orderId");
    // On ajoute l'ID de la commande dans le HTML
    orderIdHTML.innerText = commandeStorage.orderId
    // Supprimer le numéro de commande au niveau du localStorage
    localStorage.removeItem("commande")

    // redirection apres 10 secondes vers la page principale
    setTimeout(() => {
        window.location.href = "index.html"
    }, 10_000)
}

// Appel à la fonction 
confirmationData()
