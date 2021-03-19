require('firebase/firestore')
const fs = require('fs')
const { initializeApp, firestore } = require('firebase/app')

const UID = 'amcrud-11478' // UID of the user you are migrating

initializeApp({
    apiKey: process.env.API_KEY,
    projectId: process.env.PROJECT_ID
})

// db.json is the downloaded copy from my firebasedatabase
fs.readFile('db.json', (err, data) => {
    if (err) throw err
    const json = JSON.parse(data)
    const readings = json.readings[UID]
    const result = Object.values(readings)
    result.forEach(({ book, chapter, date }) =>
        // In my case the migration was easy, I just wanted to move user's readings to their own collection
        firestore().collection(`users/${UID}/readings`)
            .add({ date: firestore.Timestamp.fromDate(new Date(date)), chapter, book })
            .catch(console.error)
    )
    console.log('SUCCESS!')
})
