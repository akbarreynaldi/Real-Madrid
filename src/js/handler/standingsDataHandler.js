import fetchAPI from '../data/api.js';
import cacheAPI from '../data/cache.js';

//call class
const api = new fetchAPI();
const cache = new cacheAPI();

//detail competition loader for competition page
const getStandings = () => {
    cache.standingsData()
        .then(data => {
            if (data !== undefined) {
                displayStandings(data.standings[0]);
            }
        });
    api.standingsData()
        .then(data => {
            displayStandings(data.standings[0]);
        });
}

//display team info
const displayStandings = (data) => {
    let standingsHTML = "";
    data.table.forEach(function(standing) {
        let url = standing.team.crestUrl;
        let newUrl = url.replace(/^http:\/\//i, 'https://');
        standingsHTML += `
        <tr>
            <td>${standing.position}</td>
            <td><img src="${newUrl}" width="10px" class="circle"> ${standing.team.name}</td>
            <td>${standing.playedGames}</td>
            <td>${standing.won}</td>
            <td>${standing.draw}</td>
            <td>${standing.lost}</td>
            <td>${standing.goalsFor}</td>
            <td>${standing.goalsAgainst}</td>
            <td>${standing.goalDifference}</td>
            <td>${standing.points}</td>
        </tr>
        `;
    });
    // Sisipkan komponen card ke dalam elemen dengan id #standings jika ditemukan
    let standingsElem = document.getElementById("standings");
    if (standingsElem !== null) {
        document.getElementById("standings").innerHTML = standingsHTML;
    }
}

export default getStandings;