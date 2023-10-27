

const { MongoClient, ServerApiVersion } = require('mongodb');
const jwt = require('jsonwebtoken')
const uri = require("../../config").uri;
 const MusicAlbum= require("../Models/AlbumModel");
//const {Client: Discogs} = require("disconnect");
const bigInt = require('big-integer');
const express= require('express');
const {allCds,allVinyls,asked, recommend}= require('./DiscogsReader');
const {all} = require("express/lib/application");
const app = express();
const cors = require('cors');


app.use(express.json())

app.use(cors());

const port= 3005;
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();
        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
        const db = client.db('RecordsDB');
        const collection = db.collection('RecordsDB');

        // Query the collection and fetch all documents
        const records = await collection.find().toArray();
        const music=records[0].Music;
        const Cds=music.CDs;
        const Vinyls=music.Vinyls;
        return music;

    } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
    }
}

app.get('/api/cd/all',(req,res)=>{
    const result= run().then((records)=>{
        const music=records;
        const Cds=music.CDs;
        allCds(Object.keys(Cds)).then((data)=>{
            res.send(data);
        })

    });

});
app.get('/api/vinyl/all',(req, res)=>{
    const result= run().then((records)=>{
        const music=records;
        const Vinyls=music.Vinyls;
        allVinyls(Object.keys(Vinyls)).then((data)=>{
            res.send(data);
        })
    });
});
app.get('/api/all',(req, res)=>{
    const result= run().then((records)=>{
        const music=records;
        const Vinyls=music.Vinyls;
        const Cds=music.CDs;
        const albums= merge(allVinyls(Vinyls),allCds(Cds));
        res.send(albums);
    });
});
app.get('/api/asked/:id',(req, res)=>{
    // the key is passed int the request
    const key= req.params.id;
    asked(key).then((result)=>{
        res.send(result);
    });
});
app.get('/api/recommend',(req, res)=>{

    const result= run().then((records)=>{
        const Vinyls=records.Vinyls;
        const Cds=records.CDs;
        console.log(records);
        var rets= {};
        let count=0;
        rets={
            26924756:Cds[26924756],
            27747453:Cds[27747453],
            1562548:Vinyls[1562548],
            5882830:Vinyls[5882830]
        }
        const keys=[26924756,27747453,1562548,5882830];
        recommend(keys).then((result)=>{
            res.send(result);
        });

        //res.send(rets);
    });
});

app.post('/api/users/login',(req, res)=>{
    const {email,password}=req.body
    // validate email and password

    const token = jwt.sign({email},'tavor')
    console.log(token)

})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
function merge(arr1,arr2){
    for(let i=0;i<arr2.length;i++){
        arr1.push(arr2[i]);
    }
    return arr1;
}


// fetch(' https://api.discogs.com/releases/${bigInt(key)}',{
//     method:"GET",
//     headers:{
//         token:"gfEAjkxaciUXSQumtUKdNrwGOqHCdTMgRQrYwLL"
//     }
//
// }).then((res)=>{
//     let data= res.json();
//     var album= MusicAlbum(data);
//     res.send(album);
// });
