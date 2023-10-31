const MusicAlbum = require("../client/src/Models/AlbumModel");

const { authorizationHeader } = require("../config");
function allCds(keys){
    const fetchPromises = keys.map(key => {
        return fetch(`https://api.discogs.com/releases/${key}`, {
            method: "GET",
            headers: {
                'Authorization': authorizationHeader,
            }
        })
            .then((res) => res.json())
            .then((data) => MusicAlbum(data));
    });

    return Promise.all(fetchPromises)
        .then((results) => {
            // 'results' will be an array of MusicAlbum objects for each key
            const resultObject = {};
            keys.forEach((key, index) => {
                resultObject[key] = results[index];
            });
            return resultObject;
        })
        .catch((error) => {
            console.error("Error fetching data:", error);
            return {};
        });
}
function allVinyls(keys){
    const fetchPromises = keys.map(key => {
        return fetch(`https://api.discogs.com/releases/${key}`, {
            method: "GET",
            headers: {
                'Authorization': authorizationHeader,
            }
        })
            .then((res) => res.json())
            .then((data) => MusicAlbum(data));
    });

    return Promise.all(fetchPromises)
        .then((results) => {
            // 'results' will be an array of MusicAlbum objects for each key
            const resultObject = {};
            keys.forEach((key, index) => {
                resultObject[key] = results[index];
            });
            return resultObject;
        })
        .catch((error) => {
            console.error("Error fetching data:", error);
            return {};
        });
}
function asked(key){
    return fetch(`https://api.discogs.com/releases/${key}`, {
        method: 'GET',
        headers: {
            'Authorization': authorizationHeader,
        }
    })
        .then((res) => {
            if (!res.ok) {
                throw new Error(`HTTP error! Status: ${res.status}`);
            }
            return res.json();
        })
        .then((data) => MusicAlbum(data))
        .catch((error) => {
            console.error("Error fetching data:", error);
            return {};
        });
}
function findAsked(object){

    return fetch(`https://api.discogs.com/database/search
    ?title=${object.title}&artist=${object.artist}&label=${object.label}
    &country=${object.country}&year=${object.year}&format=${object.format}&per_page=${3}&pages=${1}`, {
        method: 'GET',
        headers: {
            'Authorization': authorizationHeader,
        }
    })
        .then((res) => {
            if (!res.ok) {
                throw new Error(`HTTP error! Status: ${res.status}`);
            }
            console.log(res.json());
            return res.json();
        })
        .then((data) => setObjectForAsked(data))
        .catch((error) => {
            console.error("Error fetching data:", error);
            return {};
        });
}

function setObjectForAsked(data){
    let title= ["results"][0].title.split(" - ")[1];
    let artist=["results"][0].title.split(" - ")[0];
    return{
        title:title,
        artist:artist,
        country:data["results"][0].country,
        label:data["results"][0].label[0],
        year:data["results"][0].year,
        format:data["results"][0].formats[0]

    };
}

function recommend(keys){
    const fetchPromises = keys.map(key => {
        return fetch(`https://api.discogs.com/releases/${key}`, {
            method: "GET",
            headers: {
                'Authorization': authorizationHeader,
            }
        })
            .then((res) => res.json())
            .then((data) => MusicAlbum(data));
    });

    return Promise.all(fetchPromises)
        .then((results) => {
            // 'results' will be an array of MusicAlbum objects for each key
            const resultObject = {};
            keys.forEach((key, index) => {
                resultObject[key] = results[index];
            });
            return resultObject;
        })
        .catch((error) => {
            console.error("Error fetching data:", error);
            return {};
        });
}


module.exports={
    allCds,allVinyls,asked,recommend,findAsked
};
