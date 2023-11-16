
const path = require('path')
const { MongoClient, ServerApiVersion } = require('mongodb');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const express= require('express');
require('dotenv').config();


const {allCds,allVinyls,asked, recommend, findAsked}= require('./readers/DiscogsReader');

const app = express();


app.use(express.json());

const buildFolderPath = path.join(__dirname,'client','build');
app.use(express.static(buildFolderPath));

app.use(cors());

const port=  process.env.PORT || 3005;
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(process.env.uri, {
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
async function setAllFalse() {
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


        // Iterate over the keys of "Music" (e.g., "CDs", "Vinyls")
        Object.keys(records[0].Music).forEach(type => {
            // Check if the value under the current type is an object
            if (typeof records[0].Music[type] === 'object' && records[0].Music[type] !== null) {
                // Set "isRecommend" to false for all properties in the current type
                Object.keys(records[0].Music[type]).forEach(itemKey => {
                    records[0].Music[type][itemKey].isRecommend = false;
                });
            }
        });




        // Update the documents in the collection with the modified data
        await collection.updateMany({}, { $set: { "Music": records[0].Music } });

        // Log the updated music data
        console.log("Updated music data:", records[0].Music);

        return records[0].Music;
    } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
    }
}
async function setOneRecommendTrue(itemId,currentValue,type) {
    try {
        // Connect to MongoDB
        await client.connect();
        console.log('Connected to the database');

        console.log(type,currentValue);

        const db = client.db('RecordsDB');
        const collection = db.collection('RecordsDB');

        // Update the specific item with _id equal to itemId
        if(type==="Music.CDs._id"){
            const result = await collection.updateOne(
                { ['Music.CDs.' + itemId]: { $exists: true } },
                { $set: { ['Music.CDs.' + itemId + '.isRecommend']: !currentValue } }
            );
            // await collection.updateOne(
            //     { [`Music.CDs._id`]: itemId },
            //     { $set: { [`Music.CDs.$.isRecommend`]: !currentValue } }
            // );
        }
        else if(type==="Music.Vinyls._id"){
            const result = await collection.updateOne(
                { ['Music.Vinyls.' + itemId]: { $exists: true } },
                { $set: { ['Music.Vinyls.' + itemId + '.isRecommend']: !currentValue } }
            );
            /*await collection.updateOne(
                { [`Music.Vinyls._id`]: itemId },
                { $set: { [`Music.Vinyls.$.isRecommend`]: !currentValue } }
            );*/
        }


        console.log(`Updated item with _id ${itemId} to have isRecommend:${!currentValue}`);

    } finally {
        // Close the MongoDB connection
        await client.close();
    }
}
app.get('/api/setFalse',(req, res)=>{
    const run=setAllFalse().then((records)=>{
            res.send(records);
        }
    );
});

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
// app.get('/api/isrecommend/:type/:id',(req, res)=>{
//     const type=req.params.type;
//     const id=req.params.id;
//     const result= run().then((records)=>{
//         const music=records;
//         let musics={};
//         if(type==="CD"){
//             musics=music.CDs;
//         }
//         else {
//             musics=music.Vinyls;
//         }
//         res.send(musics[id].isRecommend);
//     });
// });
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
        const keys=returnRecomended(Cds,Vinyls);
        recommend(keys).then((result)=>{
            res.send(result);
        });

        //res.send(rets);
    });
});

app.post('/api/setIsRecommend/:id',(req, res)=>{
    const id=req.params.id;
    const result= run().then((records) => {
        const Cds = records.CDs;
        const Vinyls = records.Vinyls;
        if (Cds.hasOwnProperty(id)) {
            res.send(setOneRecommendTrue(id,Cds[id].isRecommend,"Music.CDs._id"));
        } else if (Vinyls.hasOwnProperty(id)) {
            res.send(setOneRecommendTrue(id,Vinyls[id].isRecommend,"Music.Vinyls._id"));
        }
    });
});
app.get('/api/isRecommend/:id',(req, res)=>{
    const id=req.params.id;
    const result= run().then((records) => {
        const Cds = records.CDs;
        const Vinyls = records.Vinyls;
        if (Cds.hasOwnProperty(id)) {
            res.send({isRecommend: Cds[id].isRecommend}) ;
        } else if (Vinyls.hasOwnProperty(id)) {
            res.send({isRecommend: Vinyls[id].isRecommend}) ;
        }
    });
})

app.post('/api/users/login',(req, res)=>{
    const {email,password}=req.body
    // validate email and password

    const token = jwt.sign({email},'tavor')
    console.log(token)

});

app.get("/api/getAskedFromUser/:musicObject",(req, res)=>{
    const object=queryStringToObject(req.params.musicObject);
    //console.log(object);
    findAsked(object).then((result)=>{
        console.log("The res: "+result);
        res.send(result);
    });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
function merge(arr1,arr2){
    for(let i=0;i<arr2.length;i++){
        arr1.push(arr2[i]);
    }
    return arr1;
}
function queryStringToObject(queryString) {
    const params = new URLSearchParams(queryString);
    const obj = {};

    for (const [key, value] of params.entries()) {
        obj[key] = value;
    }

    return obj;
}

function returnRecomended(cds,vinyls){
    let ret=[];
    for(const id in cds){
        if(cds[id].isRecommend){
            ret.push(id);
        }
    }
    for(const id in vinyls){
        if(vinyls[id].isRecommend){
            ret.push(id);
        }
    }
    return ret;
}


