import express from 'express';
import skatersRoutes from './Routes/Skaters.js'
import skatersStatsRoutes from './Routes/skatersStats.js'
import cors from 'cors'

const app = express();

app.use (cors({ origin: "http://localhost:3001"}))
app.use ('/skaters', skatersRoutes);
app.use ('/skatersStats', skatersStatsRoutes)

app.get ('/', (req, res ) => {
    res.send('This is Main Page')
})

app.listen('3002', ()=> {
    console.log('Server is running on port 3002');
})