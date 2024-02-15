const mysql = require('mysql');
let connection;
// Create MySQL connection
// if(process.env.PORT === 3005){
//      connection = mysql.createConnection({
//         host: "localhost",
//         user: "root",
//         password: "Tavor20043!",
//         database: "records_app"
//     });
// }
// else{
//      connection = mysql.createConnection({
//         host: process.env.DB_HOST,
//         user: process.env.DB_USER,
//         password: process.env.DB_PASSWORD,
//         database: process.env.DB_NAME
//     });
// }
connection = mysql.createConnection({
       host: "localhost",
       port: 3307,
       user: "root",
       password: "Tavor20043!",
       database: "records_app"
   });
// Connect to MySQL

connection.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL: ' + err.stack);
        return;
    }
    console.log('Connected to MySQL as id ' + connection.threadId);
});

const vinylCreator = `
    CREATE TABLE IF NOT EXISTS vinyls (
        _id INT NOT NULL,
        Name VARCHAR(45) NOT NULL,
        Artist VARCHAR(45) NOT NULL,
        Format VARCHAR(45) NOT NULL,
        Year YEAR ,
        TrackList JSON NOT NULL,
        Image LONGTEXT NOT NULL,
        uri LONGTEXT NOT NULL,
        country VARCHAR(45) NOT NULL,
        type VARCHAR(45) NOT NULL,
        genres VARCHAR(45) NOT NULL,
        PRIMARY KEY (_id)
    )
`;

const cdCreator = `
    CREATE TABLE IF NOT EXISTS cds (
        _id INT NOT NULL,
        Name VARCHAR(45) NOT NULL,
        Artist VARCHAR(45) NOT NULL,
        Format VARCHAR(45) NOT NULL,
        Year YEAR ,
        TrackList JSON NOT NULL,
        Image LONGTEXT NOT NULL,
        uri LONGTEXT NOT NULL,
        country VARCHAR(45) NOT NULL,
        type VARCHAR(45) NOT NULL,
        genres VARCHAR(45) NOT NULL,
        PRIMARY KEY (_id)
    )
`;

function createTables() {
    connection.query(vinylCreator, (err) => {
        if (err) throw err;
        console.log('Vinyls table created');
    });
    connection.query(cdCreator, (err) => {
        if (err) throw err;
        console.log('CDs table created');
    });

}

function insertCD(cd) {
    const query = `
        INSERT INTO cds(_id,Name, Artist, Format, Year, TrackList, Image, uri, country, type, genres) 
        VALUES (?,?,?,?,?,?,?,?,?,?,?)
    `;
    const values = Object.values(cd);



    connection.query(query, values, (err, result) => {
        if (err) {
            console.error('Error inserting data:', err);
        } else {
            console.log('New row inserted. ID:', result.insertId);
            console.log('ADD'); // Log "ADD" here
        }
    });
}

function insertVinyl(vinyl) {
    const query = `
        INSERT INTO vinyls(_id,Name, Artist, Format, Year, TrackList, Image, uri, country, type, genres) 
        VALUES (?,?,?,?,?,?,?,?,?,?,?)
    `;
    // console.log(typeof(vinyl.Format));

    const values = Object.values(vinyl);
    console.log(typeof(values));


    // console.log("THE VALUES");
    // console.log(values);


    connection.query(query, values, (err, result) => {
        if (err) {
            console.error('Error inserting data:', err);
        } else {
            console.log('New row inserted. ID:', result.insertId);
            console.log('ADD'); // Log "ADD" here
        }
    });
}

// Add other functions...
function fetchCDs(callback){
    const cdQuery='SELECT * FROM cds';
    connection.query(cdQuery,(err,cdRows)=>{
        if (err) {
            console.error('Error fetching favorite records from cds table:', err);
            callback([]);

        }
        callback(cdRows);
    });
}
function fetchVinyls(callback){
    const vinylQuery='SELECT * FROM vinyls';
    connection.query(vinylQuery,(err,vinylRows)=>{
        if (err) {
            console.error('Error fetching favorite records from vinyl table:', err);
            callback([]);

        }
        callback(vinylRows);
    });
}
function fetchFavorites(keys,callback) {
    const cdsQuery = 'SELECT * FROM cds WHERE _id IN (?)';
    const vinylsQuery = 'SELECT * FROM vinyls WHERE _id IN (?)';

    const cdsParams = [keys];
    const vinylsParams = [keys];

    connection.query(cdsQuery, cdsParams, (err, cdsRows) => {
        if (err) {
            console.error('Error fetching records from cds table:', err);
            callback([]);
            return;
        }

        connection.query(vinylsQuery, vinylsParams, (err, vinylsRows) => {
            if (err) {
                console.error('Error fetching records from vinyls table:', err);
                callback([]);
                return;
            }

            const allRecords = [...cdsRows, ...vinylsRows];
            callback(allRecords);
        });
    });
}
function fetchByArtist(artist,callback) {
    const cdsQuery = 'SELECT * FROM cds WHERE Artist = ?';
    const vinylsQuery = 'SELECT * FROM vinyls WHERE Artist = ?';



    connection.query(cdsQuery, artist, (err, cdsRows) => {
        if (err) {
            console.error('Error fetching records from cds table:', err);
            callback([]);
            return;
        }

        connection.query(vinylsQuery, artist, (err, vinylsRows) => {
            if (err) {
                console.error('Error fetching records from vinyls table:', err);
                callback([]);
                return;
            }

            const allRecords = [...cdsRows, ...vinylsRows];
            callback(allRecords);
        });
    });
}

function fetchRecordById(recordId, callback) {
    const cdsQuery = 'SELECT * FROM cds WHERE _id = ?';
    const vinylsQuery = 'SELECT * FROM vinyls WHERE _id = ?';

    connection.query(cdsQuery, [recordId], (err, cdsRows) => {
        if (err) {
            console.error('Error fetching record with ID ' + recordId + ' from cds table:', err);
            callback(null);
            return;
        }
        if (cdsRows.length > 0) {
            callback(cdsRows[0]);
            return;
        }

        // If record is not found in the cds table, try fetching from vinyls table
        connection.query(vinylsQuery, [recordId], (err, vinylsRows) => {
            if (err) {
                console.error('Error fetching record with ID ' + recordId + ' from vinyls table:', err);
                callback(null);
                return;
            }
            if (vinylsRows.length > 0) {
                callback(vinylsRows[0]);
                return;
            }

            // If record is not found in either table
            console.log('Record with ID ' + recordId + ' not found');
            callback(null);
        });
    });
}


function checkRecordExists(recordId, callback) {
    const cdsQuery = 'SELECT EXISTS(SELECT 1 FROM cds WHERE _id = ?) AS recordExists';
    const vinylsQuery = 'SELECT EXISTS(SELECT 1 FROM vinyls WHERE _id = ?) AS recordExists';

    connection.query(cdsQuery, [recordId], (err, cdsRows) => {
        if (err) {
            console.error('Error checking if record exists in cds table:', err);
            callback(false);
            return;
        }
        const cdsRecordExists = cdsRows[0].recordExists === 1;

        connection.query(vinylsQuery, [recordId], (err, vinylsRows) => {
            if (err) {
                console.error('Error checking if record exists in vinyls table:', err);
                callback(false);
                return;
            }
            const vinylsRecordExists = vinylsRows[0].recordExists === 1;

            // Combine the results from both tables
            const recordExists = cdsRecordExists || vinylsRecordExists;

            callback(recordExists);
        });
    });
}

module.exports = {
    insertVinyl, insertCD,createTables,fetchFavorites,checkRecordExists,fetchRecordById,fetchVinyls,fetchCDs,fetchByArtist
};
