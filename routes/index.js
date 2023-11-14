const authMW = require('../middleware/user/authMW');
const renderMW = require('../middleware/user/renderMW');
const checkLoginMW = require('../middleware/user/checkLoginMW');
const getSajatadatokMW = require('../middleware/user/getSajatadatokMW');
const getAdatokMW = require('../middleware/csoki/getAdatokMW');
const saveCsokiMW = require('../middleware/csoki/saveCsokiMW');
const getCsokiMW = require('../middleware/csoki/getCsokiMW');
const delCsokiMW = require('../middleware/csoki/delCsokiMW');
const regUserMW = require('../middleware/user/regUserMW');
const getCsokikMW = require('../middleware/csoki/getCsokikMW');
const getNemSajatCsokikMW=require('../middleware/csoki/getNemSajatCsokikMW');
const inverseAuthMW=require('../middleware/user/inverseAuthMW');
const redirectMW=require('../middleware/user/redirectMW');
const logoutMW=require('../middleware/user/logoutMW');


const UserModel = require('../models/user');
const CsokiModel = require('../models/csoki');
module.exports = function (app) {
    const objRepo = {
		UserModel: UserModel,
		CsokiModel: CsokiModel		
	};	
	
	app.use('/registration',
		inverseAuthMW(objRepo),
		regUserMW(objRepo),
		renderMW(objRepo, 'index'));
		
	app.use('/login',
		inverseAuthMW(objRepo),
        checkLoginMW(objRepo),
        renderMW(objRepo, 'bejelentkezes'));
	
	app.use('/logout',
		logoutMW(objRepo)
	);
		
    app.use('/:felhaszid/new',
        authMW(objRepo),
		getSajatadatokMW(objRepo),
        saveCsokiMW(objRepo),
        renderMW(objRepo, 'hozzaad'));	
		
	app.get('/:felhaszid/edit/del/:csokiid',
        authMW(objRepo),
		getSajatadatokMW(objRepo),
		getCsokiMW(objRepo),
        delCsokiMW(objRepo));
		
	app.use('/:felhaszid/edit/:csokiid',
        authMW(objRepo),
		getSajatadatokMW(objRepo),
        getCsokiMW(objRepo),
		saveCsokiMW(objRepo),
        renderMW(objRepo, 'hozzaad'))
	
	app.use('/:felhaszid/edit',
        authMW(objRepo),
		getSajatadatokMW(objRepo),
        getCsokikMW(objRepo),
        renderMW(objRepo, 'torol'));	

	app.get('/:felhaszid',
        authMW(objRepo),
        getSajatadatokMW(objRepo),
		getCsokikMW(objRepo),
        getAdatokMW(objRepo),
		getNemSajatCsokikMW(objRepo),
        renderMW(objRepo, 'fooldal'));
			
	app.get('/',
		redirectMW(objRepo));
};