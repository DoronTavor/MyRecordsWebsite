
const path = require('path')
const { MongoClient, ServerApiVersion, ObjectId} = require('mongodb');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const express= require('express');
const MySQLReader= require("./MySQLReader.js");
const GoogleStrategy = require('passport-google-oauth20').Strategy;

require('dotenv').config();


const {allCds,allVinyls,asked, recommend, findAsked}= require('./readers/DiscogsReader');
const passport = require("express/lib/router");

const app = express();


app.use(express.json());
MySQLReader.createTables();
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
async function returnAmount() {
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
        // const cdCount=(Object.keys(Cds)).length;
        // const vinylCount=(Object.keys(Vinyls)).length;
        const vinylsKeys = Object.keys(Vinyls);
        const amountOfVinyls = vinylsKeys.length;
        const CdsKeys = Object.keys(Cds);
        const amountOfCds = CdsKeys.length;
        console.log("HEY METHOD");
        console.log("CDS: "+amountOfCds);
        console.log("Vinyls: "+amountOfVinyls);
        return {
            Cds:{amountOfCds},
            Vinyls:{amountOfVinyls}
        };

    } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
    }
}
async function addUser(obj){
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();
        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
        const db = client.db('RecordsDB');
        const collection = db.collection('RecordsDB');
        console.log(obj);



        const filter = {}; // Assuming you want to update the entire document
        const key = `Users.${obj.email.replaceAll(".","").replace("@","")}`;

        // const update = {
        //     $set: {
        //         [key]: obj,
        //     },
        // };
        //
        // // Use updateOne to update the specified field
        // const result = await collection.updateOne(filter, update);
        const update = { $set: { [key]: obj } };
        console.log(key);
        const res=await collection.updateOne({ [key]: { $exists: false } }, // Filter criteria
            { $set: { [key]: obj } }// Update operation
            ,{upsert:true}, (insertErr, result) => {
            if (insertErr) {
                console.log('Error inserting new user:', insertErr);
                return false;
            } else {
                console.log('New user added:');
                return true;
            }

        });
        if (res.modifiedCount > 0 || res.upsertedCount > 0) {
            console.log('User added:', obj);
            return true;
        } else {
            console.log('User not added.');
            return false;
        }

        // console.log(`Document updated successfully. Matched ${result.matchedCount} document(s) and modified ${result.modifiedCount} document(s).`);
        //
       // return true;
    } catch (err) {
        console.error('Error updating document', err);
        return false;
    }

    finally {
        // Ensures that the client will close when you finish/error
        await client.close();
    }
}
async function addVinylByID(obj){
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();
        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
        const db = client.db('RecordsDB');
        const collection = db.collection('RecordsDB');
        console.log("the obj add: ");
        console.log(obj);
        console.log(obj._id);
        const newVinyl = {
            _id: obj.id,  // Set a unique ID for the new object
            Name: obj.release_title,
            Artist: obj.artist,
            Format: obj.format,
            isRecommend: false,
        };
        console.log(newVinyl);


        const filter = {}; // Assuming you want to update the entire document
        const key = `Music.Vinyls.${obj._id}`;
        console.log("The key: "+key);
        const update = {
            $set: {
                [key]: obj,
            },
        };

        // Use updateOne to update the specified field
        const result = await collection.updateOne(filter, update);
        console.log(result);

        console.log(`Document updated successfully. Matched ${result.matchedCount} document(s) and modified ${result.modifiedCount} document(s).`);

        return true;
    } catch (err) {
        console.error('Error updating document', err);
        return false;
    }

    finally {
        // Ensures that the client will close when you finish/error
        await client.close();
    }
}
async function add(obj){
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();
        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
        const db = client.db('RecordsDB');
        const collection = db.collection('RecordsDB');
        console.log("the obj add: ");
        console.log(obj);
        console.log(obj._id);
        const newVinyl = {
            _id: obj.id,  // Set a unique ID for the new object
            Name: obj.release_title,
            Artist: obj.artist,
            Format: obj.format,
            isRecommend: false,
        };
        console.log(newVinyl);


        const filter = {}; // Assuming you want to update the entire document
        const key = `Music.Vinyls.${obj._id}`;
        console.log("The key: "+key);
        const update = {
            $set: {
                [key]: newVinyl,
            },
        };

        // Use updateOne to update the specified field
        const result = await collection.updateOne(filter, update);
        console.log(result);

        console.log(`Document updated successfully. Matched ${result.matchedCount} document(s) and modified ${result.modifiedCount} document(s).`);

        return true;
    } catch (err) {
        console.error('Error updating document', err);
        return false;
    }

    finally {
        // Ensures that the client will close when you finish/error
        await client.close();
    }
}
async function addCDByID(obj){
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();
        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
        const db = client.db('RecordsDB');
        const collection = db.collection('RecordsDB');
        console.log(obj);
        console.log(obj.id);

        let newVinyl = {
            _id: obj.id,  // Set a unique ID for the new object
            Name: obj.release_title,
            Artist: obj.artist,
            Format: obj.format,
            isRecommend: false,
        };
        newVinyl=makeWorkForHebrew(newVinyl);
        console.log(newVinyl);


        const filter = {}; // Assuming you want to update the entire document
        const key = `Music.CDs.${obj._id}`;
        const update = {
            $set: {
                [key]: obj,
            },
        };

        // Use updateOne to update the specified field
        const result = await collection.updateOne(filter, update);

        console.log(`Document updated successfully. Matched ${result.matchedCount} document(s) and modified ${result.modifiedCount} document(s).`);

        return true;
    } catch (err) {
        console.error('Error updating document', err);
        return false;
    }

    finally {
        // Ensures that the client will close when you finish/error
        await client.close();
    }
}
async function addCD(obj){
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();
        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
        const db = client.db('RecordsDB');
        const collection = db.collection('RecordsDB');
        console.log(obj);
        console.log(obj.id);

        let newVinyl = {
            _id: obj.id,  // Set a unique ID for the new object
            Name: obj.release_title,
            Artist: obj.artist,
            Format: obj.format,
            isRecommend: false,
        };
        newVinyl=makeWorkForHebrew(newVinyl);
        console.log(newVinyl);


        const filter = {}; // Assuming you want to update the entire document
        const key = `Music.CDs.${obj.id}`;
        const update = {
            $set: {
                [key]: newVinyl,
            },
        };

        // Use updateOne to update the specified field
        const result = await collection.updateOne(filter, update);

        console.log(`Document updated successfully. Matched ${result.matchedCount} document(s) and modified ${result.modifiedCount} document(s).`);

        return true;
    } catch (err) {
        console.error('Error updating document', err);
        return false;
    }

    finally {
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
async function checkCredentials(email, password) {
    console.log(email,password);

    try {
        await client.connect();
        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
        const database = client.db('RecordsDB');
        const usersCollection = database.collection('RecordsDB');


        let users = await usersCollection.find().toArray();
        users=users[0].Users;
        console.log(users);
        console.log("HEY");
        for(const userID in users){
            let user=users[userID];

            if (user.email === email && user.password === password) {
                console.log('User exists!');
                await client.close();
                return {
                    found:true,
                    name:user.Name,
                    email:user.email
                };
            } else {
                console.log('User does not exist, or the password isnt correct, try again');
                await client.close();

            }
        }



    } finally {
        await client.close();
    }
}
async function findName(email) {

    try {
        await client.connect();
        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
        const database = client.db('RecordsDB');
        const usersCollection = database.collection('RecordsDB');


        let users = await usersCollection.find().toArray();
        users=users[0].Users;
        console.log(users);
        console.log("HEY");
        for(const userID in users){
            let user=users[userID];

            if (user.email === email ) {
                return user.Name;

            }
        }



    } finally {
        await client.close();
    }
}

app.get("/api/returnAmount",(req,res)=>{
    const result=returnAmount().then((amount)=>{
        console.log("HEY");
        res.send(amount);
    });
});
app.get("/api/users/getName/:email",(req, res)=>{
    let email=req.params.email;
    const run=findName(email).then((name)=>{
        console.log(name);
        res.send({Name:name});
    })
});
app.post("/api/users/addUser",(req, res)=>{

    const run=addUser(req.body).then((resp)=>{
        if(resp){
            res.status(200).json({ status: 'success'});
        }
        else{
            res.status(500).json({ status: 'fail'});
        }
    });
});
// passport.use(new GoogleStrategy({
//         clientID: process.env.CLIENT_ID,
//         clientSecret: process.env.CLIENT_SECRET,
//         callbackURL: "https://myrecordswebsitebackend.onrender.com/AddVinyl"
//     },
//     function(accessToken, refreshToken, profile, cb) {
//         User.findOrCreate({ googleId: profile.id }, function (err, user) {
//             return cb(err, user);
//         });
//     }
// ));
app.post("/api/addVinylByID",(req, res)=>{
    console.log("the body ");
    console.log(req.body);
    const run=addVinylByID(req.body).then((resp)=>{
        if(resp){
            res.status(200).json({ status: 'success'});
        }
        else{
            res.status(500).json({ status: 'fail'});
        }
    });
});

app.post("/api/addVinyl",(req, res)=>{
    console.log("the body ");
    console.log(req.body);
    const run=add(req.body).then((resp)=>{
        if(resp){
            res.status(200).json({ status: 'success'});
        }
        else{
            res.status(500).json({ status: 'fail'});
        }
    });
});
app.post("/api/addCD",(req, res)=>{
    console.log(req.body.id);
    const run=addCD(req.body).then((resp)=>{
        if(resp){
            res.status(200).json({ status: 'success'});
        }
        else{
            res.status(500).json({ status: 'fail'});
        }
    });
});
app.post("/api/addCDByID",(req, res)=>{
    console.log(req.body.id);
    const run=addCDByID(req.body).then((resp)=>{
        if(resp){
            res.status(200).json({ status: 'success'});
        }
        else{
            res.status(500).json({ status: 'fail'});
        }
    });
});
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
        const keys= Object.keys(Cds);
        keys.forEach((key)=>{
            MySQLReader.checkRecordExists(key,(exist)=>{
                if(!exist){
                    asked(key).then((cd)=>{
                        MySQLReader.insertCD(cd);
                    });
                }
            });
        })
        MySQLReader.fetchCDs((cds)=>{
            res.send(cds);
        });
        // allCds(Object.keys(Cds)).then((data)=>{
        //     res.send(data);
        // })

    });

});
app.get('/api/vinyl/all',(req, res)=>{
    const result= run().then((records)=>{
        const music=records;
        const Vinyls=music.Vinyls;
        const keys= Object.keys(Vinyls);
        keys.forEach((key)=>{
            MySQLReader.checkRecordExists(key,(exist)=>{
                if(!exist){
                    asked(key).then((vinyl)=>{
                        MySQLReader.insertVinyl(vinyl);
                    });
                }
            });
        })
        MySQLReader.fetchVinyls((vinyls)=>{
            res.send(vinyls);
        });

        // allVinyls(Object.keys(Vinyls)).then((data)=>{
        //     res.send(data);
        // })
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
    // asked(key).then((result)=>{
    //     res.send(result);
    // });
    MySQLReader.fetchRecordById(key,(result)=>{
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
        console.log(keys);
        keys.forEach(key=>{
            MySQLReader.checkRecordExists(key,(exist)=>{
                if (!exist){
                    // console.log(key);
                    asked(key).then((card)=>{
                        console.log(card);
                        if (card.Format.includes("Vinyl") ||card.Format.includes("LP")  ) {
                            MySQLReader.insertVinyl(card); // Call insertVinyl without checking its return value


                            // No need to check the return value here
                        }
                        if (card.Format.includes("CD")) {
                            MySQLReader.insertCD(card); // Call insertVinyl without checking its return value

                            // No need to check the return value here
                        }
                    });

                }
            });
        });

        // MySQLReader.fetchRecordById(keys[1],(value)=>{
        //     console.log(value);
        // });

        MySQLReader.fetchFavorites(keys,(result)=>{
            console.log(result);
            res.send(result);
        })


        // recommend(keys).then((result)=>{
        //     Object.values(result).map((card, key) => {
        //         if (card.Format==="Vinyl"){
        //             MySQLReader.returnIfExist(key,(exist)=>{
        //                 if (exist !== "NONE"){
        //                     MySQLReader.insertVinyl(card);
        //                     console.log("ADD");
        //                 }
        //             });
        //         }
        //         if (card.Format==="CD"){
        //             MySQLReader.returnIfExist(key,(exist)=>{
        //                 if (exist !== "NONE"){
        //                     MySQLReader.insertCD(card);
        //                 }
        //             });
        //
        //         }
        //     });
        //
        //     res.send(result);
        //
        // });

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
    const details=req.body;
    console.log(details);
    const result=checkCredentials(details["email"],details["password"]).then((resp)=>{
        if(resp.found){
            res.status(200).json(resp);
        }
        else{
            res.status(500).json({ status: 'failed login'});
        }
    });

});
app.get("/api/byArtist/:artist",(req,res)=>{
    const artist= req.params.artist;
    MySQLReader.fetchByArtist((artist),(result)=>{
        res.send(result);
    });
});
app.get("/api/byYear/:year",(req,res)=>{
    const year= req.params.year;
    MySQLReader.fetchByYear((year),(result)=>{
        res.send(result);
    });
});


app.get("/api/getAskedFromUser/:musicString",(req, res)=>{
    // const string=decodeURIComponent((req.params.musicString));
    const string= req.params.musicString.replaceAll("%20","");
    console.log(string);
    //console.log(object);
    findAsked(string).then((result)=>{
        console.log(result);
        res.send(result);

        // console.log("THE RES: "+ result["id"]);
        // console.log("Release Title: " + result.release_title +
        //     "\nArtist: " + result.artist +
        //     "\nCountry: " + result.country +
        //     "\nLabel: " + result.label +
        //     "\nYear: " + result.year +
        //     "\nFormat: " + result.format
        //     +"\nID: "+result.id
        //
        // );
        console.log("The res: "+result);
        // res.send(result);
        // if(result["results"].length>1){
        //
        //     res.send(result["results"][0]);
        // }
        // else{
        //     res.send(result);
        // }

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

