import loadPage from './loadPages.js';
import pathHandler from '../handler/pathHandler.js';

function loadNav() {
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState === 4) {
            if (this.status !== 200) return;

            // Muat daftar tautan menu
            document.querySelectorAll(".topnav, .sidenav").forEach(function(elm) {
                elm.innerHTML = xhttp.responseText;
            });

            // Daftarkan event listener untuk setiap tautan menu
            document.querySelectorAll('.sidenav a, .topnav a')
                .forEach(function(elm) {
                    elm.addEventListener('click', function(event) {
                        // Tutup sidenav
                        let sidenav = document.querySelector('.sidenav');
                        M.Sidenav.getInstance(sidenav).close();

                        // Muat konten halaman yang dipanggil 
                        const urlHash = event.target.getAttribute("href");
                        const path = pathHandler(urlHash.substr(1));
                        loadPage(path);
                    });
                });
        }
    };
    xhttp.open("GET", "nav-menu.html", true);
    xhttp.send();
}

export default loadNav;