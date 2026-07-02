import express from 'express'
import cors from 'cors'
import router from './Routes/authRoutes.js'
import dashRouter from './Routes/dashboardRoute.js'

const app = express()

app.use(express.json()) // Parse JSON bodies from incoming requests
app.use(cors())   // acess backend from frontend

app.get('/', (req, res) => {
    res.send('Hello World!')
})


app.get('/api/health', (req, res) => {
    res.send("Server is healthy")
})

app.use('/api/auth',router)
app.use('/api/user',dashRouter)


const PORT = process.env.PORT || 5000

app.listen(PORT, () =>{
    console.log(`Server is running on : http://localhost:${PORT}`)
})