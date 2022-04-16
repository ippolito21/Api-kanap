//Créer, exécuter une requete http avec la fonction fetch
//api pour liste des produits
const url = 'http://localhost:3000/api/products'
//fournir des options à la requete 
const options = {
    //le type de requete, récupéré la liste
    method: 'GET',
    //validation du contenu, donne des info sur le contenu recu json
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'appplication/json;charset=UTF-8'
    },
}
//utiliser fetch , on passe l url, et l'options comme paramètres
// la première fetch pour récupere la liste de produits
fetch(url, options)
    //si la requete est valide 
    .then(function (response) {
        // on retourne la réponse en json 
        return response.json();
    })
    //on appelle append data si la réponse est 200
    .then(function (data) {
        appendData(data)
    })
    // si la requete n'est pas valide
    .catch(error => {
        //la requete est faite mais ça passe pas et on a pas le code 400 d'erreurs
        if (error.response) {
            console.log(error.response.data)
        }
        else if (error.request) {
            //la requete est faite mais pas de reponse
            console.log(error.request)
        }
        else {
            //déclenchement d'erreur avant d'envoyer la requete
            console.log("Error", error.message)
        }

    })



function appendData(data) {
    //obtenez l'élement div du corps  avec getElementById
    var mainContainer = document.getElementById("items");
    console.log(data.length)
    //parcourir chaque object de notre objet JSON
    for (let i = 0; i < data.length; i++) {
        //ajouter le produit à notre page
        //nous allons créer un nouvel élement div
        //avk createElement

        var div = document.createElement("div");
        div.innerHTML =
            '<a href="./product.html?id=42">' +
            '<article>' +
            ' <img src={data.img} alt=`${data[i].alt}`>' +
            ' <h3 class="productName">' + data[i].name + '</h3>' +
            '<p class="productDescription" > ' + data[i].description + '</p > '
            + '</article>' +
            '</a>'
        //ajouter cette div à notre section items 
        mainContainer.appendChild(div);
    }
}






