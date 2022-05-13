function confirmationData() {
      
    
    // on recupere l'element HTML orderId
    const orderIdHTML = document.querySelector("#orderId");
    // On ajoute l'ID de la commande dans le HTML
    const params = new URLSearchParams(location.search)
    // Récupère ID  de l'url en cours
    const id = params.get("id")

    orderIdHTML.innerText = id
    // Supprimer le numéro de commande au niveau du localStorage
    localStorage.removeItem("commande")

   // redirection apres 10 secondes vers la page principale
    // setTimeout(() => {
    //     window.location.href = "index.html"
    // }, 10_000)
}

// Appel à la fonction 
confirmationData()
