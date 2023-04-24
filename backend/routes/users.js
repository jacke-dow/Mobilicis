const express=require('express')
const router=express.Router()
const User=require('../models/user')

// to get all users data
router.get('/', async (req,res)=>{
    try {
        const users=await User.find()
        res.json(users)
    }
    catch(err){
        res.status(500).json({message:err.message})
    }
})

// 1. Users which have income lower than $5 USD and have a car of brand “BMW” or “Mercedes”.
router.get('/bmw-mercedes-users', async (req, res) => {
    try {
        const users = await User.find({
            $and: [
                { income: { $lt: 5 } },
                { $or: [ { car: 'BMW' }, { car: 'Mercedes' } ] }
            ]
        });
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// 2. Male Users which have phone price greater than 10,000.
router.get('/high-price-male-users', async (req, res) => {
    try {
        const users = await User.find({
            $and: [
                { gender: 'Male' },
                { phone_price: { $gt: 10000 } }
            ]
        });
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// 3. Users whose last name starts with “M” and has a quote character length greater than 15 and email includes his/her last name.
router.get('/quote-users', async (req, res) => {
    try {
        const users = await User.find({
            $and: [
                { last_name: /^M/ },
                { quote: { $exists: true, $gt: 15 } },
                { email: { $regex: new RegExp(`^.*${lastName}.*$`, "i") } }
            ]
        });
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// 4. Users which have a car of brand “BMW”, “Mercedes” or “Audi” and whose email does not include any digit.
router.get('/luxury-car-users', async (req, res) => {
    try {
        const users = await User.find({
            $and: [
                { car: { $in: ['BMW', 'Mercedes', 'Audi'] } },
                { email: { $not: /\d/ } }
            ]
        });
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// 5. Show the data of top 10 cities which have the highest number of users and their average income.
router.get('/top-cities', async (req, res) => {
    try {
        const cities = await User.aggregate([
            { $group: { _id: '$city', total_income: { $sum: '$income' }, count: { $sum: 1 } } },
            { $sort: { count: -1 } },
            { $limit: 10 },
            { $project: { _id: 0, city: '$_id', avg_income: { $divide: ['$total_income', '$count'] } } }
        ]);
        res.json(cities);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});



module.exports=router