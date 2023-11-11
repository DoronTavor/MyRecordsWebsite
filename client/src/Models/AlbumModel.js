function MusicAlbum(data){
    return {
        _id: data["id"],
        Name: data["title"],
        Artist:data["artists"][0].name,
        Format:data["formats"][0].name,
        Year:data["year"],
        TrackList:data["tracklist"],
        Image:data["images"][0].resource_url,
        uri:data["uri"],
        label:data["labels"][0].name,
        country:data["country"],
        type:setType(data["formats"][0].descriptions),
        genres:data["genres"][0]
    };

}
function setType(array){
    if(array.length>=2){
        return array[(array.length-2)]+" "+array[(array.length-1)];
    }
    return array[(array.length)-1];

}
module.exports = MusicAlbum; // Export the class










