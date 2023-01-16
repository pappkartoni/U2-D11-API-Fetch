const searchAndFill = (searchQuery, rowId) => {
    fetch("https://striveschool-api.herokuapp.com/api/deezer/search?q=" + searchQuery, {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': '',
          'X-RapidAPI-Host': 'deezerdevs-deezer.p.rapidapi.com'
        }
    })
    .then(query => query.json())
	.then(json => {
        let row = document.getElementById(rowId);
        for (let d of json.data) {
            row.innerHTML += `<div class="col">
                                <div class="card my-2">
                                    <img src="${d.album.cover}" class="card-img-top" alt="...">
                                    <div class="card-body d-flex flex-column">
                                        <h5 class="card-title text-truncate">${d.title}</h5>
                                        <h6 class="card-subtitle text-truncate text-secondary mb-3">${d.artist.name}</h6>
                                    </div>
                                </div>
                            </div>`
        }
    })
	.catch(err => console.error('error:' + err));
};

const countAlbums = function() {
    let albums = document.querySelectorAll(".card img");
    let uniqueAlbums = [];
    for (let a of albums) {
        if (!uniqueAlbums.includes(a.src)) {
            uniqueAlbums.push(a.src);
        }
    }
    console.log(`There are ${uniqueAlbums.length} unique albums on this page.`);
}

const createSongList = function() {
    let tbody = document.querySelector(".modal-body tbody");
    let songs = document.querySelectorAll(".card .card-body");
    for (let i=0; i<songs.length; i++) {
        tbody.innerHTML += `<tr>
                                <th scope="row">${i+1}</th>
                                <td>${songs[i].firstElementChild.innerText}</td>
                                <td>${songs[i].lastElementChild.innerText}</td>
                            </tr>`
    }
}

window.addEventListener("DOMContentLoaded", function() {
    searchAndFill("mf doom", "row1");
    searchAndFill("devin the dude", "row2");
    searchAndFill("masta ace", "row3");
});
