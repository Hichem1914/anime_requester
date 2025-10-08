const dataReturn = document.getElementById('dataReturn');
const btnSelect  = document.getElementById('endpoint');
const btnSereach = document.getElementById('search');
const resetBtn = document.getElementById('reset');
const searchName = document.getElementById('searchInput');

btnSereach.addEventListener('click', rechercheAnime);

resetBtn.addEventListener('click',function(){
    btnSereach.value = '';
    affiche('');
})

function rechercheAnime(){
    const valeur = btnSelect.value;
    const searchByname = searchName.value.trim();
    console.log('Valeur selectiionnée:',valeur);
    if(valeur ===''){
       dataReturn.innerHTML =  '<span style="color: red;"> Aucune option sélectionnée</span>';
    }
    if(!searchByname){
        dataReturn.innerHTML =  '<span style="color: red;">Tu dois entrer un nom d\'anime', 'error','</span>';
        return;
    }
    btnSereach.disabled = true;
     const url = 'https://anime-db.p.rapidapi.com/anime?page=1&size=10&search=${searchByname}';
        
    fetch(url, {
        method: 'GET',
        headers: {
            'x-rapidapi-key': '5d68fd2638msh597e47dcf3f541dp1e02f6jsn745472b3b753',
            'x-rapidapi-host': 'anime-db.p.rapidapi.com'
        }
    })

    .then(function(response){

        if(!response){
            throw new error('Réponse non trouvée');
        }
        console.log('Reponse recupere', response);
        return response.json();
    })

    .then(function(data){
        
        console.log(data);
        btnSereach.disabled = false;
        if(!data.data || data.data.length === 0){
            affiche('Aucun anime trouvé. Essaie un autre nom!','error');
            return;
        }
        affiche(data.data);
    })

    .catch (function(error){
        console.error(error);
    });
}


    function affiche(donnee){
       const animeArray = donnee.data || donnee.results || donnee;
       if(Array.isArray(animeArray)){
            animeArray.forEach(function(user){
            let div = document.createElement("div");
            div.innerHTML = 
            `   <p> ${user.title} </p><br>
                <p> ${user.genre} </p><br>
                <img src="${user.image}"/>

            `
            dataReturn.appendChild(div);
        });
       }else{
            console.error("Les données ne sont pas un tableau", donnee);
       }
       
       
    }






/*
async function request() {
    const url = 'https://anime-db.p.rapidapi.com/anime/by-ranking/1';
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': '5d68fd2638msh597e47dcf3f541dp1e02f6jsn745472b3b753',
            'x-rapidapi-host': 'anime-db.p.rapidapi.com'
        }
    };
    
    try {
        const response = await fetch(url, options);
        const result = await response.text();
        const json = JSON.parse(result)

        const dataReturn = document.getElementById('dataReturn');
        console.log(dataReturn);
        let div = document.createElement("div");
        div.innerHTML = 
        `
            ${json['title']}<br>
            ${json['genres'].join(" ")}<br>
            <img src="${json['image']}"/>
        `
        dataReturn.appendChild(div);
    } catch (error) {
        console.error(error);
    }
}
    */