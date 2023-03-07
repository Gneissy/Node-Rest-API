const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Player = require("../models/player");

// There is actually http://localhost:3000/players at home route.

// Getting all players
router.get("/", async function(req, res){
    try{
        const allPlayers = await Player.find({});
        res.json(allPlayers);
    } catch(err){
        // status 500 is due to our server
        res.status(500).json({message : err.message});
    }
});



// Getting one player
router.get("/:id", getPlayer, async function(req, res){
    res.json(res.player);
});



// Creating a player
router.post("/", async function(req, res){
    const player = new Player ({
        name: req.body.name,
        nickname: req.body.nickname,
        age: req.body.age
    });
    try{
        const newPlayer = await player.save();
        // status 201 is specific for successful creation.
        res.status(201).json(newPlayer);
    } catch(err){
        // status 400 is user error, not related to server. Bad Request.
        res.status(400).json({ message: err.message });
    }
});



// Updating a player
router.patch("/:id", async function(req, res){
    // console.log(req.body);
    try{
        const updatedPlayer = await Player.findOneAndUpdate({ _id: req.params.id }, {
            $set: req.body
        });
        res.json(updatedPlayer);
    } catch(err){
        // status 500 is server related error.
        res.status(500).json({ message: err.message });
  }
});



// Deleting a player
router.delete("/:id", async function(req, res){
    try{
        await Player.deleteOne({ _id: req.params.id });
        res.json({message: "The player is deleted"});
    } catch(err){
        res.status(500).json({ message: err.message });
    }
});



// Function of getting one player
async function getPlayer(req, res, next){
    let player;
    try{
        player = await Player.find({ _id : req.params.id });
        if(player == null){
          return res.status(404).json({ message: err.message });
        }
    } catch (err){
        return res.status(500).json({ message: err.message });
    }
    res.player = player;
    next(); // To use it in getting one player route. thanks to next, we continue to callback.
}

module.exports = router;
