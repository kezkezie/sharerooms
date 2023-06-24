const express = require("express");
const router = express.Router();
const axios = require("axios");

const User = require('../models/user')

router.post("/register", async (req, res) => {

    const newuser = new User(
        {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
        }
    )
    // this is the shortcut version
    //const newuser = new User(req.body)

    try {
        const user = await newuser.save()
        res.send('User Registered Successfully')
    } catch (error) {
        return res.status(400).json({ message: error });
    }
});

router.post("/login", async (req, res) => {
    const { email, password } = req.body


    try {
        const user = await User.findOne({ email: email, password: password })
        if (user) {
            const temp = {
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                _id: user._id,
            }
            res.send(temp)
        } else {
            return res.status(400).json({ message: 'Login failed' });
        }
    } catch (error) {
        return res.status(400).json({ error });
    }
});

router.post("/authenticate", async (req, res) => {
    const { username } = req.body;
    // Get or create user on Chat Engine!
    try {
        const r = await axios.put(
            "https://api.chatengine.io/users/",
            { username: username, secret: username, first_name: username },
            { headers: { "Private-Key": "aaf1f31b-daab-46db-b1b1-ce1425403e77" } }
        );
        return res.status(200).json(r.data);
    } catch (error) {
        console.log(`error is ${error}`)
        return res.status(400).json({ error });
    }
});

router.get("/getuser/:id", async (req, res) => {

    const { id } = req.params

    try {
        const roomowner = await User.findById(id)
        return res.json((roomowner));
    } catch (error) {
        console.log(error)
        return res.status(400).json({ message: error });

    }
});

router.get("/allusers", async (req, res) => {
    try {
        const users = await User.find()
        res.send(users)
    } catch (error) {
        return res.status(400).json({ error });
    }
});

module.exports = router; 