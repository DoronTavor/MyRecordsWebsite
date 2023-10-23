// this part is only for trying, delete after
// const MongoReader=require('./MongoReader');
//const records=global.records;
//const Cds=records.CDs;

//not trying
const MusicAlbum = require("../Models/AlbumModel");
const bigInt = require("big-integer");
var ret=[];

const authorizationHeader= require("../../config").authorizationHeader;
function allCds(keys){
    const fetchPromises = keys.map(key => {
        return fetch(`https://api.discogs.com/releases/${bigInt(key)}`, {
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
        return fetch(`https://api.discogs.com/releases/${bigInt(key)}`, {
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
    return fetch(`https://api.discogs.com/releases/${bigInt(key)}`, {
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
// function asked(key){
//     let keys=[key];
//     const fetchPromises = keys.map(key => {
//         return fetch(`https://api.discogs.com/releases/${bigInt(key)}`, {
//             method: "GET",
//             headers: {
//                 'Authorization': authorizationHeader,
//             }
//         })
//             .then((res) => res.json())
//             .then((data) => MusicAlbum(data));
//     });
//
//     return Promise.all(fetchPromises)
//         .then((results) => {
//             // 'results' will be an array of MusicAlbum objects for each key
//             const resultObject = {};
//             keys.forEach((key, index) => {
//                 resultObject[key] = results[index];
//             });
//             return resultObject;
//         })
//         .catch((error) => {
//             console.error("Error fetching data:", error);
//             return {};
//         });
// }



function recommend(keys){
    const fetchPromises = keys.map(key => {
        return fetch(`https://api.discogs.com/releases/${bigInt(key)}`, {
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
    allCds,allVinyls,asked,recommend
};
