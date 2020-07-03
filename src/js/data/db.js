import idb from "../library/idb.js";

const dbPromised = idb.open("real-madrid", 1, function(upgradeDb) {
    let matchObjectStore = upgradeDb.createObjectStore("match", {
        keyPath: "id"
    });
    matchObjectStore.createIndex("competition.name", "competition.name", { unique: false });
});

//Fungsi untuk menyimpan match data ke indexedDB dengan nama database match
const saveForLater = (data) => {
    dbPromised
        .then((db) => {
            let tx = db.transaction("match", "readwrite");
            let store = tx.objectStore("match");
            store.put(data);
            return tx.complete;
        })
        .then(() => {
            console.log("Match data berhasil di simpan.");
            // Toast notification jika FAB save di klik
            M.toast({
                html: 'Match data has been saved!'
            })
        })
        .catch((e) => {
            M.toast({
                html: `Match data cannot be saved!`,
            });
        });
}

//Fungsi untuk mengambil seluruh match data dari indexedDB dengan nama database match
const getAll = () => {
    return new Promise((resolve, reject) => {
        dbPromised
            .then((db) => {
                let tx = db.transaction("match", "readonly");
                let store = tx.objectStore("match");
                return store.getAll();
            })
            .then((matches) => {
                resolve(matches);
            });
    });
}

//Fungsi untuk mengambil match data berdasarkan id dari indexedDB dengan nama database match
const getById = (id) => {
    return new Promise((resolve, reject) => {
        dbPromised
            .then((db) => {
                let tx = db.transaction("match", "readonly");
                let store = tx.objectStore("match");
                return store.get(Number(id));

            })
            .then((match) => {
                resolve(match);
            });
    });
}

//Fungsi untuk menghapus match data berdasarkan id dari indexedDB dengan nama database match
const deleteSaved = (data) => {
    dbPromised
        .then((db) => {
            let tx = db.transaction("match", "readwrite");
            let store = tx.objectStore("match");
            store.delete(data.id);
            return tx.complete;
        })
        .then(() => {
            console.log("Match data berhasil di hapus.");
            // Toast notification jika FAB remove di klik dan akan reload kembali ke halaman saved jika data sudah berhasil dihapus
            M.toast({
                html: 'Match data has been deleted!',
                completeCallback: function() {
                    location.href = './index.html#saved'
                }
            })
        })
        .catch((e) => {
            M.toast({
                html: `Match data cannot be deleted!`,
            });
        });
}

export default { saveForLater, getAll, getById, deleteSaved };