const express = require("express")
const {Activity, Exercise} = require("../models/activities")
const { requireAuthenticatedUser } = require("../middleware/security");
const User = require("../models/user");
const { json } = require("express");
const router = express.Router();

router.get("/activity", requireAuthenticatedUser, async (req, res, next) => {
    try {
        const { email } = res.locals.user;
        const user = await User.fetchUserByEmail(email)
        const stats = await Activity.fetchStatsForUser({user})
        return res.status(200).json({stats})
    } catch(err) {
        next(err)
    }
})

router.get("/exercises", requireAuthenticatedUser, async (req, res, next) => {
    try {
        const { email } = res.locals.user;
        const user = await User.fetchUserByEmail(email)
        const exercises = await Exercise.fetchExercisesForUser({user})
        return res.status(200).json({exercises})
    } catch(err) {
        next(err)
    }
})

router.post("/exercises", requireAuthenticatedUser, async (req, res, next) => {
    try {
        const { email } = res.locals.user;
        const user = await User.fetchUserByEmail(email)
        const exercise = await Exercise.logNewExercise({ exercise: req.body, user })
        return res.status(201).json({exercise})
    } catch(err) {
        next(err)
    }
})

module.exports = router;