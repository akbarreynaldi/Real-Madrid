import getTeamInfo from '../handler/teamDataHandler.js';
import getStandings from '../handler/standingsDataHandler.js';
import { getMatches, getSavedMatches } from '../handler/matchDataHandler.js';

// Load page content
function loadPage(path = {}) {
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState === 4) {
            const content = document.querySelector("#body-content");

            if (path.target === "home") {
                getTeamInfo();
            } else if (path.target === "standings") {
                getStandings();
            } else if (path.target === "match") {
                getMatches();
            } else if (path.target === "saved") {
                getSavedMatches();
            }

            if (this.status === 200) {
                content.innerHTML = xhttp.responseText;
            } else if (this.status === 404) {
                content.innerHTML = "<p>Halaman tidak ditemukan.</p>";
            } else {
                content.innerHTML = "<p>Ups.. halaman tidak dapat diakses.</p>";
            }
        }
    };
    xhttp.open("GET", "pages/" + path.target + ".html", true);
    xhttp.send();
}

export default loadPage;