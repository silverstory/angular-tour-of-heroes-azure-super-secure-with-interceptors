const express = require('express');
const router = express.Router();
const passport = require('passport');
const Hero = require('../models/hero.model');

// heroes
// GET http://localhost:3000/api/heroes/
router.get('/heroes', passport.authenticate('jwt',{session:false}), async (req, res, next) => {
    await Hero.find({})
    .then( async (heroes) => {
      // res.send(heroes);
      return await res.json( heroes );
    }); // d  ne                              
});

// GET http://localhost:3000/api/hero/5abe2bd2897fa433900edb60
router.get('/hero/:id', passport.authenticate('jwt',{session:false}), async (req, res, next) => {
    await Hero.findById({_id: req.params.id})
    .then( async (hero) => {
      // res.send(hero);
      return await res.json( hero );
    });
});

// POST http://localhost:3000/api/hero/
// Content-Type application/json
// {
//     "name": "eprel ultraman"
// }
router.post('/hero', passport.authenticate('jwt',{session:false}), async (req, res, next) => {
    await Hero.create(req.body)
    .then( async (hero) => {
      // res.send(hero);
      return await res.json( hero );
    }).catch(next);
});

// PUT http://localhost:3000/api/hero/5abe2bdf897fa433900edb61
// Content-Type application/json
// {
//     "name": "eprel super human"
// }
router.put('/hero/:id', passport.authenticate('jwt',{session:false}), async (req, res, next) => {
    await Hero.findByIdAndUpdate({_id: req.params.id}, req.body)
    .then( async () => {
      await Hero.findById({_id: req.params.id})
      .then( async (hero) => {
        // res.send(hero);
        return await res.json( hero );
      });
    });
});

// DELETE http://localhost:3000/api/hero/5abe2bdf897fa433900edb61
router.delete('/hero/:id', passport.authenticate('jwt',{session:false}), async (req, res, next) => {
    await Hero.findByIdAndRemove({_id: req.params.id})
    .then( async (hero) => {
      // res.send(hero);
      return await res.json( hero );
    });
});

// heroes

module.exports = router;