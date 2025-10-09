const dataReturn = document.getElementById('dataReturn');
const btnSelect = document.getElementById('endpoint');
const btnSereach = document.getElementById('search');
const resetBtn = document.getElementById('reset');
const searchName = document.getElementById('searchInput');

btnSereach.addEventListener('click', rechercheAnime);

resetBtn.addEventListener('click', function() {
    searchName.value = ''; // CORRECTION 1: c'était btnSereach.value au lieu de searchName.value
    dataReturn.innerHTML = ''; // CORRECTION 2: vider l'affichage
});

function rechercheAnime() {
    const valeur = btnSelect.value;
    const searchByname = searchName.value.trim();
    
    console.log('Valeur sélectionnée:', valeur);
    
    // Validation
    if (valeur === '') {
        dataReturn.innerHTML = '<span style="color: red;">Aucune option sélectionnée</span>';
        return; // CORRECTION 3: ajout du return
    }
    
    if (!searchByname) {
        dataReturn.innerHTML = '<span style="color: red;">Tu dois entrer un nom d\'anime</span>';
        return;
    }
    
    btnSereach.disabled = true;
    dataReturn.innerHTML = '<p>Chargement...</p>'; // CORRECTION 4: feedback visuel
    
    // CORRECTION 5: utiliser des backticks pour l'interpolation
    const url = `https://anime-db.p.rapidapi.com/anime?page=1&size=10&search=${searchByname}`;
    
    fetch(url, {
        method: 'GET',
        headers: {
            'x-rapidapi-key': '5d68fd2638msh597e47dcf3f541dp1e02f6jsn745472b3b753',
            'x-rapidapi-host': 'anime-db.p.rapidapi.com'
        }
    })
    .then(function(response) {
        if (!response.ok) { // CORRECTION 6: response.ok au lieu de !response
            throw new Error('Réponse non trouvée: ' + response.status);
        }
        console.log('Reponse récupérée', response);
        return response.json();
    })
    .then(function(data) {
        console.log('Données reçues:', data);
        btnSereach.disabled = false;
        
        if (!data.data || data.data.length === 0) {
            dataReturn.innerHTML = '<span style="color: orange;">Aucun anime trouvé. Essaie un autre nom!</span>';
            return;
        }
        
        affiche(data); // CORRECTION 7: passer data, pas data.data
    })
    .catch(function(error) {
        console.error('Erreur:', error);
        btnSereach.disabled = false;
        dataReturn.innerHTML = '<span style="color: red;">Erreur: ' + error.message + '</span>';
    });
}

function affiche(donnee) {
    dataReturn.innerHTML = ''; // CORRECTION 8: vider avant d'afficher
    
    const animeArray = donnee.data || donnee.results || donnee;
    
    if (Array.isArray(animeArray)) {
        animeArray.forEach(function(anime) { // CORRECTION 9: anime au lieu de user
            let div = document.createElement("div");
            div.style.border = "1px solid #ccc";
            div.style.padding = "10px";
            div.style.margin = "10px 0";
            div.style.borderRadius = "5px";
            
            div.innerHTML = `
                <h3>${anime.title || 'Titre non disponible'}</h3>
                <p><strong>Genres:</strong> ${anime.genres ? anime.genres.join(', ') : 'N/A'}</p>
                ${anime.image ? `<img src="${anime.image}" alt="${anime.title}" style="max-width: 200px; border-radius: 5px;"/>` : ''}
                <p><strong>Status:</strong> ${anime.status || 'N/A'}</p>
                <p><strong>Episodes:</strong> ${anime.episodes || 'N/A'}</p>
            `;
            
            dataReturn.appendChild(div);
        });
    } else {
        console.error("Les données ne sont pas un tableau", donnee);
        dataReturn.innerHTML = '<span style="color: red;">Format de données incorrect</span>';
    }
}