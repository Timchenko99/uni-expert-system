//const http = require('http');
const express = require('express');
const fileUtils = require('./file')
const {check, validationResult} = require('express-validator');

const DATA_FILE = 'heart.csv'
const DELIMITER = ','

const app = express();
const port = 5055;

app.set('view engine', 'ejs')

app.use(express.urlencoded({extended: false}))
app.use('/public', express.static('public'))

//app.get('/', (req, res) => res.sendFile(__dirname + '/index.html'))
app.get('/', (req, res) => res.render('index'))

app.get('/about', (req, res) => {
    const fileData = fileUtils.getDataFromFile(DATA_FILE, DELIMITER).slice(0, 10)
    res.render('about', {data:  fileData, dataKeys: ['age', 'sex', 'cp', 'trestbps', 'chol', 'fbs', 'restecg', 'thalach', 'exang', 'oldpeak', 'slope', 'ca', 'thal', 'target']})
})

app.get('/test', (req, res) => res.render('test'))

app.get('/data', (req, res) => {
    res.send(fileUtils.getDataFromFile(DATA_FILE, DELIMITER))
})

app.get('/data/:column', (req,res)=>{
    //res.send(req.params.column)
    res.send(fileUtils.getColumnFromJSONMatrix(fileUtils.getDataFromFile(DATA_FILE,DELIMITER), req.params.column))
})

app.post('/test',[check('oldpeak').isFloat()],
    (req, res)=>{
        const err = validationResult(req)
        if(!err.isEmpty()){
            return res.status(422).json({ errors: errors.array() });
        }
        const fileData = fileUtils.getDataFromFile(DATA_FILE, DELIMITER)
        const result = require('./index').predict(req.body, fileData)
        //console.log(`result: ${result}`);
        res.render('results', {data: req.body, fd: fileData, hasDisease: result})
    }
)

app.listen(port, () => console.log(`The server is running on http://localhost:${port}`))