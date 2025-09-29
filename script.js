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