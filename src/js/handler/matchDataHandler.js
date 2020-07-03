import fetchAPI from '../data/api.js';
import cacheAPI from '../data/cache.js';
import db from '../data/db.js';

//call class
const api = new fetchAPI();
const cache = new cacheAPI();

//detail competition loader for competition page
const getMatches = () => {
    cache.matchData()
        .then(data => {
            if (data !== undefined) {
                displayMatches(data.matches);
            }
        });
    api.matchData()
        .then(data => {
            displayMatches(data.matches);
        });
}

const getMatchById = (id) => {

    cache.matchInfo(id)
        .then(data => {
            if (data !== undefined) detailMatch(data);
        });
    api.matchInfo(id)
        .then(data => detailMatch(data));
}

//get all saved match from index db
const getSavedMatches = () => {
    db.getAll()
        .then(data => displaySavedMatches(data));
}

//get saved match from index db
const getSavedMatchById = () => {
    let urlParams = new URLSearchParams(window.location.search);
    let idParam = urlParams.get("id");
    db.getById(idParam)
        .then(data => detailSavedMatch(data));
}

//get team info
const displayMatches = (data) => {
    let matchesDataHTML = "";
    data.forEach(function(match) {
        let matchFinish = `<i class="tiny material-icons">check</i>`;
        let matchSchedule = `<i class="tiny material-icons">schedule</i>`;
        let json = `\"${match.utcDate}\"`;
        let dateStr = JSON.parse(json);
        let date = new Date(dateStr);
        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

        function appendLeadingZeroes(n) {
            if (n <= 9) {
                return "0" + n;
            }
            return n
        }
        let formatted_date = date.getDate() + " " + months[date.getMonth()] + " " + date.getFullYear() + "<br>" + appendLeadingZeroes(date.getHours()) + ":" + appendLeadingZeroes(date.getMinutes()) + " WIB";
        matchesDataHTML += `
        <div class="col s12 m6">
        <div class="card-match waves-effect hoverable">
            <a href="./match-detail.html?id=${match.id}">
                <div class="card-content black-text">
                    <h4>Matchday ${match.matchday === null ? "" : match.matchday} - ${match.competition.name} ${match.status === "FINISHED" ? matchFinish : matchSchedule} </h4>
                    <p>${formatted_date}</p>
                    <ul class="collection">
                        <li class="collection-item">
                            <span class="title">${match.homeTeam.name}</span>
                            <p class="secondary-content">${match.score.fullTime.homeTeam === null ? "-" : match.score.fullTime.homeTeam}</p>
                        </li>
                        <li class="collection-item">
                            <span class="title">${match.awayTeam.name}</span>
                            <p class="secondary-content">${match.score.fullTime.awayTeam === null ? "-" : match.score.fullTime.awayTeam}</p>
                        </li>
                    </ul>
                </div>
            </a>
        </div>
        </div>
        `;
    });
    // Sisipkan komponen ke dalam elemen dengan id #match-data jika ditemukan
    let matchElem = document.getElementById("match-data");
    if (matchElem !== null) {
        document.getElementById("match-data").innerHTML = matchesDataHTML;
    }
}

const detailMatch = (data) => {
    let json = `\"${data.match.utcDate}\"`;
    let dateStr = JSON.parse(json);
    let date = new Date(dateStr);
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    function appendLeadingZeroes(n) {
        if (n <= 9) {
            return "0" + n;
        }
        return n
    }
    let formatted_date = date.getDate() + " " + months[date.getMonth()] + " " + date.getFullYear() + "<br>" + appendLeadingZeroes(date.getHours()) + ":" + appendLeadingZeroes(date.getMinutes()) + " WIB";
    let matchDetailHTML = `
    <div class="col s12 stats-match-detail left-align">
        <div class="card-content black-text">
            <h2>Matchday ${data.match.matchday === null ? "" : data.match.matchday} - ${data.match.competition.name}</h2>
            <p>${data.match.stage}</p>
            <p>${formatted_date}</p>
            <h3>Full Time</h3>
            <ul class="collection">
                <li class="collection-item">
                    <span class="title">${data.match.homeTeam.name}</span>
                    <p class="secondary-content">${data.match.score.fullTime.homeTeam === null ? "-" : data.match.score.fullTime.homeTeam}</p>
                </li>
                <li class="collection-item">
                    <span class="title">${data.match.awayTeam.name}</span>
                    <p class="secondary-content">${data.match.score.fullTime.awayTeam === null ? "-" : data.match.score.fullTime.awayTeam}</p>
                </li>
            </ul>
            <h3>Half Time</h3>
            <ul class="collection">
                <li class="collection-item">
                    <span class="title">${data.match.homeTeam.name}</span>
                    <p class="secondary-content">${data.match.score.fullTime.homeTeam === null ? "-" : data.match.score.fullTime.homeTeam}</p>
                </li>
                <li class="collection-item">
                    <span class="title">${data.match.awayTeam.name}</span>
                    <p class="secondary-content">${data.match.score.fullTime.awayTeam === null ? "-" : data.match.score.fullTime.awayTeam}</p>
                </li>
            </ul>
        </div>
    </div>
    `;
    // Sisipkan komponen ke dalam elemen dengan id #match-details jika ditemukan
    let detailElem = document.getElementById("match-details");
    if (detailElem !== null) {
        document.getElementById("match-details").innerHTML = matchDetailHTML;
    }
    let save = document.getElementById("save");
    if (save) {
        save.onclick = function() {
            db.saveForLater(data.match);
        }
    }
}

const displaySavedMatches = (data) => {
    let matchSavedHTML = "";
    if (data.length !== 0) {
        data.forEach(function(matches) {
            let matchFinish = `<i class="tiny material-icons">check</i>`;
            let matchSchedule = `<i class="tiny material-icons">schedule</i>`;
            let json = `\"${matches.utcDate}\"`;
            let dateStr = JSON.parse(json);
            let date = new Date(dateStr);
            const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

            function appendLeadingZeroes(n) {
                if (n <= 9) {
                    return "0" + n;
                }
                return n
            }
            let formatted_date = date.getDate() + " " + months[date.getMonth()] + " " + date.getFullYear() + "<br>" + appendLeadingZeroes(date.getHours()) + ":" + appendLeadingZeroes(date.getMinutes()) + " WIB";
            matchSavedHTML += `
            <div class="col s12 m6">
                <div class="card-match waves-effect hoverable">
                    <a href="./match-detail.html?id=${matches.id}&saved=true">
                        <div class="card-content black-text">
                            <h4>Matchday ${matches.matchday} - ${matches.competition.name} ${matches.status === "FINISHED" ? matchFinish : matchSchedule} </h4>
                            <p>${formatted_date}</p>
                            <ul class="collection">
                            <li class="collection-item">
                                <span class="title">${matches.homeTeam.name}</span>
                                <p class="secondary-content">${matches.score.fullTime.homeTeam === null ? "-" : matches.score.fullTime.homeTeam}</p>
                            </li>
                            <li class="collection-item">
                                <span class="title">${matches.awayTeam.name}</span>
                                <p class="secondary-content">${matches.score.fullTime.awayTeam === null ? "-" : matches.score.fullTime.awayTeam}</p>
                            </li>
                        </ul>
                        </div>
                    </a>
                </div>
            </div>
            `;
        });
    } else {
        matchSavedHTML += `
        <div class="col s12 center-align section-match-data" id="no-data">
            <p>No match data has been saved yet</p>
        </div>
        `;
    }

    // Sisipkan komponen ke dalam elemen dengan id #saved-match jika ditemukan
    let savedElem = document.getElementById("saved-match");
    if (savedElem !== null) {
        document.getElementById("saved-match").innerHTML = matchSavedHTML;
    }
    let remove = document.getElementById("remove");
    if (remove) {
        remove.onclick = function() {
            db.deleteSaved(data);
        }
    }
}

const detailSavedMatch = (data) => {
    let matchSavedByIdHTML = '';
    let json = `\"${data.utcDate}\"`;
    let dateStr = JSON.parse(json);
    let date = new Date(dateStr);
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    function appendLeadingZeroes(n) {
        if (n <= 9) {
            return "0" + n;
        }
        return n
    }
    let formatted_date = date.getDate() + " " + months[date.getMonth()] + " " + date.getFullYear() + "<br>" + appendLeadingZeroes(date.getHours()) + ":" + appendLeadingZeroes(date.getMinutes()) + " WIB";
    matchSavedByIdHTML = `
    <div class="col s12 stats-match-detail left-align">
        <div class="card-content black-text">
            <h2>Matchday ${data.matchday} - ${data.competition.name}</h2>
            <p>${data.stage}</p>
            <p>${formatted_date}</p>
            <h3>Full Time</h3>
            <ul class="collection">
                <li class="collection-item">
                    <span class="title">${data.homeTeam.name}</span>
                    <p class="secondary-content">${data.score.fullTime.homeTeam === null ? "-" : data.score.fullTime.homeTeam}</p>
                </li>
                <li class="collection-item">
                    <span class="title">${data.awayTeam.name}</span>
                    <p class="secondary-content">${data.score.fullTime.awayTeam === null ? "-" : data.score.fullTime.awayTeam}</p>
                </li>
            </ul>
            <h3>Half Time</h3>
            <ul class="collection">
                <li class="collection-item">
                    <span class="title">${data.homeTeam.name}</span>
                    <p class="secondary-content">${data.score.fullTime.homeTeam === null ? "-" : data.score.fullTime.homeTeam}</p>
                </li>
                <li class="collection-item">
                    <span class="title">${data.awayTeam.name}</span>
                    <p class="secondary-content">${data.score.fullTime.awayTeam === null ? "-" : data.score.fullTime.awayTeam}</p>
                </li>
            </ul>
        </div>
    </div>
    `;
    // Sisipkan komponen card ke dalam elemen dengan id #match-details jika ditemukan
    let detailSavedElem = document.getElementById("match-details");
    if (detailSavedElem !== null) {
        document.getElementById("match-details").innerHTML = matchSavedByIdHTML;
    }
    let remove = document.getElementById("remove");
    if (remove) {
        remove.onclick = function() {
            db.deleteSaved(data);
        }
    }
}

export { getMatches, getMatchById, getSavedMatches, getSavedMatchById };