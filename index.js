require('dotenv').config()
const http = require('http')
const {WEATHER_API_KEY, BASE_URL} = require('./config')
const city = process.argv[2]

if (!city) {
    console.log('Укажите название города. Например: node index.js Moscow')
    process.exit
}

const url = `${BASE_URL}?access_key=${WEATHER_API_KEY}&query=${city}`

http.get(url, (res) => {
    const {statusCode} = res

    if (statusCode !== 200) {
        console.error(`Ошибка ${statusCode}`)
        res.resume()
        return
    }


res.setEncoding('utf8')
let rawData = ''

res.on('data', (chunk) => {
    rawData += chunk
})

res.on('end', () => {
    try {
    const parsedData = JSON.parse(rawData)

    console.log(`Погода в ${parsedData.location.name} : `)
    console.log(`Температура: ${parsedData.current.temperature} °C`)
    console.log(`Ощущается как: ${parsedData.current.feelslike} °C`)
} catch (e) {
    console.error('Ошибка при разборе данных:', e.message)
} 

})

}).on('error', (e) => {
    console.error(`Проблема с запросом: ${e.message}`)
})