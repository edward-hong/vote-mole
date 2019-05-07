const path = require('path')
const express = require('express')

require('dotenv').config({ path: path.resolve(__dirname, '..', '.env') })

const app = express()

app.use(express.json())

app.get('/', (req, res) => {
	res.send('hello')
})

const port = process.env.PORT || 5000

app.listen(port, () => {
	console.log(`Server started on port ${port}`)
})
