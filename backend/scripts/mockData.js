/* mySeedScript.js */

// require the necessary libraries
const { faker } = require("@faker-js/faker");
const MongoClient = require("mongodb").MongoClient;

function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min);
}

async function seedDB() {
    // Connection URL
    const uri = "mongodb://localhost:27017/";

    const client = new MongoClient(uri, {
        useNewUrlParser: true,
        // useUnifiedTopology: true,
    });

    try {
        await client.connect();
        console.log("Connected correctly to server");

        const collection = client.db("vpsa").collection("users");

        // The drop() command destroys all data from a collection.
        // Make sure you run it against proper database and collection.
        collection.drop();

        // make a bunch of time series data
        const userData = [];

        for (let i = 1; i < 100000; i++) {
            const email = faker.internet.email();
            const username = faker.internet.userName();
            const tag = Math.floor(1000 + Math.random() * 9000).toString(36)
            const PUUID = faker.string.uuid();
            const password = faker.internet.password();
            const certificateLevel = 1;
            const certificateNumber = i;
            let user = {
                email,
                username,
                tag,
                PUUID,
                password,
                certificateLevel,
                certificateNumber
            };
            userData.push(user);
        }
        console.log(userData);
        await collection.insertMany(userData);

        console.log("Database seeded! :)");
    } catch (err) {
        console.log(err.stack);
    }
}

seedDB();