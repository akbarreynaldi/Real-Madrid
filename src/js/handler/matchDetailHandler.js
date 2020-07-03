import { getMatchById, getSavedMatchById } from '../handler/matchDataHandler.js';

document.addEventListener("DOMContentLoaded", function() {
    //mengambil query dari url
    let urlParams = new URLSearchParams(window.location.search);
    let isFromSaved = urlParams.get("saved");

    //mengambil id elemen untuk mengatur penampilan button
    let btnBackMatch = document.getElementById("backToMatch");
    let btnBackSaved = document.getElementById("backToSaved");
    let btnSave = document.getElementById("save");
    let btnRemove = document.getElementById("remove");

    //pengecekan kondisi berdasarkan query url halaman
    if (isFromSaved) {
        // Hide fab save jika dimuat dari halaman saved
        btnSave.style.display = 'none';
        btnBackMatch.style.display = 'none';

        // ambil match data by id dari indexedDB lalu tampilkan
        getSavedMatchById();
    } else {
        // Hide fab remove jika dimuat dari halaman match
        btnRemove.style.display = 'none';
        btnBackSaved.style.display = 'none';

        // ambil match data by id dari cache jika ada atau melakukan fetch request lalu tampilkan
        getMatchById();
    }
});