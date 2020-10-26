const express = require('express');
const path = require('path');
const cors = require('cors'); 

const app = express();
app.use(cors())
app.use(express.static(__dirname + '/dist/Petner-Angular'));

app.get('/*', function (req, res) {

    res.sendFile(path.join(__dirname + '/dist/Petner-Angular/index.html'));
});

app.listen(process.env.PORT || 8020);
