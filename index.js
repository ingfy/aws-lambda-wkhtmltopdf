var wkhtmltopdf = require('wkhtmltopdf');
var MemoryStream = require('memorystream');
var fs = require('fs');
var path = require('path');

process.env['PATH'] = process.env['PATH'] + ':' + process.env['LAMBDA_TASK_ROOT'];

function tmp(filename) {
	return path.join('/tmp', filename);
}

function saveBase64(filename, base64) {
	fs.writeFileSync(filename, new Buffer(base64, 'base64'));
} 

exports.handler = function(event, context) {
	var memStream = new MemoryStream();
	var html_utf8 = new Buffer(event.html_base64, 'base64').toString('utf8');

	var overwriteOptions = {};

	if (event.header_base64) {
		var headerFn = tmp('header.html');
		saveBase64(headerFn, event.header_base64);
		overwriteOptions.headerHtml = headerFn;
	}

	if (event.footer_base64) {
		var footerFn = tmp('footer.html');
		saveBase64(footerFn, event.footer_base64);
		overwriteOptions.footerHtml = footerFn;
	}

	var options = Object.assign({}, event.options, overwriteOptions);

	wkhtmltopdf(html_utf8, options, function(code, signal) { 
		context.done(null, { 
			pdf_base64: memStream.read().toString('base64') 
		}); 
	}).pipe(memStream);	
};