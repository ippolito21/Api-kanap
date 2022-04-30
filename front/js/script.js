//Créer, exécuter une requete http avec la fonction fetch
//api pour liste des produits
const url = 'http://localhost:3000/api/products'


//utiliser fetch , on passe l url, et l'options comme paramètres
// la première fetch pour récupere la liste de produits
async function getData(url){
    // Requete GET ver API
   const response =  await fetch(url)
   // Parse JSON
   const data = await response.json()
   // On passe le JSON a la fonction appendData
   appendData(data)
}

getData(url)


function appendData(data) {
   // Ajoute les données relatives à chaque Kanap dans le HTML
    const mainContainer = document.getElementById("items");
    console.log(data)
    data.forEach(kanap => {
        mainContainer.innerHTML += `
        <a href="./product.html?id=${kanap._id}">
      <article>
        <img src=${kanap.imageUrl} alt=${kanap.altTxt}>
        <h3 class="productName">${kanap.name}</h3>
        <p class="productDescription">${kanap.description}</p>
      </article>
      </a>
        `
    })
    console.log(data)
}






