import fetchAPI from '../data/api.js';
import cacheAPI from '../data/cache.js';

//call class
const api = new fetchAPI();
const cache = new cacheAPI();

//detail competition loader for competition page
const getTeamInfo = () => {
    cache.teamData()
        .then(data => {
            if (data !== undefined) {
                displayInfo(data);
                displaySquad(data.squad);
            }
        });
    api.teamData()
        .then(data => {
            displayInfo(data);
            displaySquad(data.squad);
        });
}

//display team info
const displayInfo = (data) => {
    let teamInfoHTML = "";
    teamInfoHTML += `
    <div class="card">
        <div class="card-content black-text">
            <table class="responsive-table highlight" id="team-info">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Shortname</th>
                        <th>TLA</th>
                        <th>Founded</th>
                        <th>Address</th>
                        <th>Phone</th>
                        <th>Website</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>${data.name}</td>
                        <td>${data.shortName}</td>
                        <td>${data.tla}</td>
                        <td>${data.founded}</td>
                        <td>${data.address}</td>
                        <td>${data.phone}</td>
                        <td>${data.website}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
    `;
    // Sisipkan komponen ke dalam elemen dengan id #team-data jika ditemukan
    let teamInfoElem = document.getElementById("team-data");
    if (teamInfoElem !== null) {
        document.getElementById("team-data").innerHTML = teamInfoHTML;
    }

    let teamCompetitionsHTML = "";
    data.activeCompetitions.forEach(function(competitions) {
        teamCompetitionsHTML += `
        <tr>
            <td>${competitions.name}</td>
        </tr>
        `;
    });
    // Sisipkan komponen card ke dalam elemen dengan id #competitions-list jika ditemukan
    let teamCompetitionsElem = document.getElementById("competitions-list");
    if (teamCompetitionsElem !== null) {
        document.getElementById("competitions-list").innerHTML = teamCompetitionsHTML;
    }
}

const displaySquad = (data) => {
    let squadsHTML = "";
    data.forEach(function(squad) {
        squadsHTML += `
        <div class="col s6 m4 l3">
            <div class="card-squad waves-effect hoverable" style="background-image: url(${squad.role === "PLAYER" & squad.position === "Goalkeeper" ? '../src/images/GK.jpg' : squad.role === "PLAYER" ? '../src/images/PLAYER.jpg' : '../src/images/COACH.jpg' });">
                <div class="squad-stats">
                    <div class="squad-number left left-align">${squad.shirtNumber === null ? " " : squad.shirtNumber}</div>
                    <div class="squad-name left-align truncate">${squad.name}</div>
                    <div class="squad-position left-align truncate">${squad.role === "PLAYER" ? squad.position : squad.role}</div>
                </div>
            </div>
        </div>
        `;
    });
    // Sisipkan komponen ke dalam elemen dengan id #squad-data jika ditemukan
    let squadElem = document.getElementById("squad-data");
    if (squadElem !== null) {
        document.getElementById("squad-data").innerHTML = squadsHTML;
    }
}

export default getTeamInfo;