const MusicAlbum = require("../client/src/Models/AlbumModel");
if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config();
}
const { AUTHORIZATIONHEADER} = process.env.AUTHORIZATIONHEADER;
function allCds(keys){
    const fetchPromises = keys.map(key => {
        return fetch(`https://api.discogs.com/releases/${key}`, {
            method: "GET",
            headers: {
                'Authorization':  process.env.AUTHORIZATIONHEADER,
            }
        })
            .then((res) => res.json())
            .then((data) => MusicAlbum(data)).catch((error)=>{
                console.log(error);
            });
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
                'Authorization':  process.env.AUTHORIZATIONHEADER,
            }
        })
            .then((res) => res.json())
            .then((data) => MusicAlbum(data)).catch((error)=>{
                console.log(error);
            });
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
            'Authorization': process.env.AUTHORIZATIONHEADER,
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
function findAsked(string){
    // console.log(string.replaceAll("+","&"));
    let object= parseQueryString(string.replaceAll("+","&").replace(/\s+/g, ' '));
    console.log("The obj");
    object=makeWorkForHebrew(object);
    console.log(object);



    return fetch(`https://api.discogs.com/database/search?q=${object.q}&type=${object.type}&release_title=${object.release_title}
    &artist=${object.artist}&label=${object.label}&country=${object.country}&year=${object.year}&format=${object.format}&per_page=${object.per_page}&pages=${object.pages}`, {
        method: 'GET',
        headers: {
            'Authorization':  process.env.AUTHORIZATIONHEADER,
        }
    })
        .then((res) => {
            if (!res.ok) {
                throw new Error(`HTTP error! Status: ${res.status}`);
            }
            // console.log(res.json());
            return res.json();
        })
        .then((data) =>
        {

            setObjectForAsked(data);
            console.log("the data ");
            console.log(data);
        }
    )
        .catch((error) => {
            console.error("Error fetching data:", error);
            return {};
        });
}

function isHebrewString(str) {
    // Use a regular expression to check if the string contains Hebrew characters
    const hebrewRegex = /[\u0590-\u05FF]/;
    return hebrewRegex.test(str);
}

function reverseHebrewString(str) {
    // Reverse the string if it contains Hebrew characters
    if (isHebrewString(str)) {
        return str.split('').reverse().join('');
    }
    return str;
}

function makeWorkForHebrew(obj){
    for(const key in obj){
        const hebrewRegex = /[\u0590-\u05FF\s]/;

        if(isHebrewString(obj[key])){
            obj[key]=reverseHebrewString(obj[key]);
        }
    }
    return obj;
}
function parseQueryString(queryString) {
    // Remove the leading '?' if present
    if (queryString.charAt(0) === '?') {
        queryString = queryString.slice(1);
    }

    // Split the string into key-value pairs
    const pairs = queryString.split('&');

    // Create an object to store the key-value pairs
    const result = {};

    // Iterate over the pairs and populate the object
    pairs.forEach(pair => {
        const [key, value] = pair.split('=');
        result[key.trim()] = decodeURIComponent(value.trim());
    });

    return result;
}

function setObjectForAsked(data){
    return{
        id:data["results"][0].id,
        release_title:data["results"][0].title,
        artist:data["results"][0]["title"].split("-")[0],
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
                'Authorization':  process.env.AUTHORIZATIONHEADER,
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
