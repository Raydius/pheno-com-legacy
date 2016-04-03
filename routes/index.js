var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;

// cookie parsing
var cookieParser = require('cookie-parser');

// stuff for upload form
var cors = require('cors');
var querystring = require('querystring');
//var https = require('https');
var multer = require('multer');
var upload = multer({ dest: '../uploads/' })

var fs = require('fs');
var request = require('request');

// CORS config
var whitelist = [
	'http://localhost:3500',
	'http://tech.phenomenonstaging.com:3500'
];
var corsOptions = {
	origin: function(origin, callback){
		var originIsWhitelisted = whitelist.indexOf(origin) !== -1;
		callback(null, originIsWhitelisted);
	}
};

// store copy as JSON
var copy = require('./../app/copy.json');


// welcome page
router.get('/', function(req, res, next) {

	// if user has been here within the last 15 days, they will have the visited cookie set
	if(req.cookies.visited) {

		// skip the welcome screen and go straight to case studies
		res.redirect('/case-studies/#/wilson-anthem');
	}
	else {

		// show welcome page
		res.render('welcome', {title: 'Index', copy: copy});
	}
});


// main route to initiate Angular app
router.get('/case-studies/', function(req, res, next) {
	res.render('index', { title: 'Case Studies', copy: copy });
});


router.get('/views/contact', function(req, res, next) {
	res.render('contact', { title: 'Contact', copy: copy });
});


// route to render Jade components
router.get('/views/components/:component', function(req, res) {
	var jadefile = req.params.component;

	try {
		res.render('../views/components/' + jadefile, {copy: copy});
	}
	catch(e) {
		console.log(e);
		res.end();
	}
});


// route to render page content
router.get('/views/:page', function(req, res, next) {

	// get URL var for page
	var jadefile = req.params.page;

	// convert URL component into camel case
	var camelCased = jadefile.replace(/-([a-z])/g, function (g) { return g[1].toUpperCase(); });

	var pageData = copy.content[camelCased];
	var pageTitle = pageData.description;
	var bodyClass = pageData.className;

	res.render('../views/components/content-template', { copy: copy, pageData: pageData, pageTitle: pageTitle, bodyClass: bodyClass });

});


// send transactional email with Rackspace MailGun
router.post('/sendMail', upload.fields([
		{ name: 'resume', maxCount: 1 },
		{ name: 'coverletter', maxCount: 1 }
	]), function(req, res) {


	try {
		//console.log('POST.body: ' + JSON.stringify(req.body));

		var bodyData = JSON.parse(req.body.data);

		var message = bodyData.message;
		var subject_line = '['+bodyData.type+'] '+ bodyData.subject;

		// MailGun endpoint for mg.phenomenon.com
		var url = 'https://api.mailgun.net/v3/mg.phenomenon.com/messages';

		// MailGun authentication
		var auth = {
			'user': 'api',
			'pass': 'key-3df9b168d6497df522c24b25bd159fa1'
		};

		var formData = {
			from: "Phenomenon <postmaster@mg.phenomenon.com>",
			to: 'recruiting@phenomenon.com',
			bcc: 'rdollete@phenomenon.com',
			subject: subject_line,
			text: message+"\n_"
		};

		var file_array = [];

		// extract file data if it exists
		if(req.files) {

			if(req.files['resume']) {
				file_array.push(req.files['resume'][0]);
			}

			if(req.files['coverletter']) {
				file_array.push(req.files['coverletter'][0]);
			}
		}

		// if there were valid files attached, add as 'attachment' data
		if(file_array.length > 0) {

			var attachment_array = [];

			for(var f=0; f< file_array.length; f++) {
				var file = file_array[f];

				attachment_array.push({
					value: fs.createReadStream(file.path),
					options: {
						filename: file.originalname
					}
				});

			}

			formData.attachment = attachment_array;
		}


		request.post({
			url: url,
			formData: formData,
			auth: auth
		}, function(err, httpResponse, body) {

			if (err) {
				return console.error('upload failed: ', err);
			}

			//console.log('Upload successful! Server responded with: ', body);
		});

	}
	catch (e) {
		console.log(e);
	}

	res.end();
});

module.exports = router;

>>>>>>> master
