/*const UserModel=require('./models/user');
const CsokiModel = require('./models/csoki');

let egyuser = new UserModel();
egyuser.name='pannika';
egyuser.email='valami@valami.hu';
egyuser.password='pankulusz';
egyuser.save((err)=>{
		console.log(err);
});

let egycsoki = new CsokiModel();
egycsoki.name= 'epres';
egycsoki.status='keres';
egycsoki._tulajdonos=egyuser;
egycsoki.save((err)=>{});
*/


const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const session = require('express-session');


app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }))
app.use(bodyParser.json());

app.use(express.static('static'));

app.use(
    session({
        secret: 'secret'
    })
);

require('./routes/index')(app);

app.use((err, req, res, next) => {
	res.end('Problem..');
	console.log(err);
});

app.listen(3000, function () {
	console.log("On :3000");
});

require('./routes/index')(app);
