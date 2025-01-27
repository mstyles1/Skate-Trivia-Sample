import express from 'express'
import db from '../dbConnection.js'

const Router = express.Router()

Router.get("/", (req, res)=> {
    db.query ("SELECT * FROM skaters_stats", (err,result)=> {
        if (err)
            console.log("Error displaying skaters' stats:", err)
        else
            res.json (result)
    })
})

export default Router;
