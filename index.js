var wkhtmltopdf = require('wkhtmltopdf');
var MemoryStream = require('memorystream');
var fs = require('fs');

process.env['PATH'] = process.env['PATH'] + ':' + process.env['LAMBDA_TASK_ROOT'];

exports.handler = function(event, context) {
	var memStream = new MemoryStream();
	var html_utf8 = new Buffer(event.html_base64, 'base64').toString('utf8');

	var overwriteOptions = {};

	if (event.header_base64) {
		var headerFn = '__header.html';
		fs.writeFileSync(headerFn, new Buffer(event.header_base64, 'base64'));;
		overwriteOptions.header_html = headerFn;
	}

	var options = Object.assign({}, event.options, {});

	wkhtmltopdf(html_utf8, options, function(code, signal) { console.log('signal', signal, 'code', code); context.done(null, { pdf_base64: memStream.read().toString('base64') }); }).pipe(memStream);	
};