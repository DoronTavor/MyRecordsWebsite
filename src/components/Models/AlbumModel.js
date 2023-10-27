function MusicAlbum(data){
    return{
        _id:data["id"],
        Name:data["title"],
        Artist:data["artists"][0].name,
        Format:data["formats"][0].name,
        Year:data["year"],
        TrackList:data["tracklist"],
        Image:data["images"][0].resource_url,
        uri:data["uri"],
        label:data["labels"][0].name,
        descriptions:data["formats"][0].descriptions,
        country:data["country"]
    };

}

module.exports = MusicAlbum; // Export the class










