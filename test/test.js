const { handler } = require('../index');
const fs = require('fs');

const html_base64 = Buffer.from('<body><p>Hello world<p><p style="page-break-before: always;">Goodbye World</p></body>').toString('base64');
const footer_base64 = Buffer.from(fs.readFileSync(`${__dirname}/footer.html`)).toString('base64');
const header_base64 = Buffer.from(fs.readFileSync(`${__dirname}/header.html`)).toString('base64');

const out = `${__dirname}/out`;

if (!fs.existsSync(out)) fs.mkdirSync(out);

handler({ html_base64, header_base64 }, { done: (err, result) => { 
    if (err) throw new Error(err);

    fs.writeFileSync(`${out}/with-header.pdf`, new Buffer(result.pdf_base64, 'base64'));
}});

handler({ html_base64, footer_base64 }, { done: (err, result) => { 
    if (err) throw new Error(err);

    fs.writeFileSync(`${out}/with-footer.pdf`, new Buffer(result.pdf_base64, 'base64'));
}});

handler({ html_base64, header_base64, footer_base64 }, { done: (err, result) => { 
    if (err) throw new Error(err);

    fs.writeFileSync(`${out}/with-header-and-footer.pdf`, new Buffer(result.pdf_base64, 'base64'));
}});