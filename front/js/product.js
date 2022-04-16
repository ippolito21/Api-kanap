//api pour avoir un seul produit 
const urlProduit = 'http://localhost:3000/api/products/:id'
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
// la deuxième fetch pour récuperer qu'un seul produit 
fetch(urlProduit, options)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        appendSingleData(data)
    })
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


function appendSingleData(data) {


}