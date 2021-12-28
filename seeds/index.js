const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers')
const Spot = require('../models/spot');

mongoose.connect('mongodb://localhost:27017/da-spot', {
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];


const seedDB = async () => {
    await Spot.deleteMany({});
    for(let i = 0; i < 50; i++){
        const random1000 = Math.floor(Math.random() * 1000);
        funds = Math.floor(Math.random() * 30) + 10;
        const makeSpot = new Spot({
            author: '61b52d0199e1d047d36c9370', //MY USER ID
            locationCityProv: `${cities[random1000].city}, ${cities[random1000].state}`,
            locationAddress: '3 Guytoi crt',
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'lorem ipsum solor sit amet consector integregrus ipi dium color.',
            funds,
            geometry: {
                type: "Point",
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude
                ]
            },
            images: [
                {
                  url: 'https://res.cloudinary.com/difdkfeiw/image/upload/v1638550580/DaSpot/p7dt9hbl9uey5bh2jc9b.jpg',
                  filename: 'DaSpot/p7dt9hbl9uey5bh2jc9b',
                },
                {
                  url: 'https://res.cloudinary.com/difdkfeiw/image/upload/v1638550580/DaSpot/uhmwzqahvmlubjt7qm7y.jpg',
                  filename: 'DaSpot/uhmwzqahvmlubjt7qm7y',
                }
            ]
        });
        await makeSpot.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
});