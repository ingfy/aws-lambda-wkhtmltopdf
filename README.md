# aws-lambda-wkhtmltopdf
Convert HTML to PDF using Webkit (QtWebKit) on AWS Lambda

## Creating function under your AWS account

1. Log into your AWS account
2. Under Lambda, click **Create a Lambda function** button
3. When being asked to select blueprint, do not select any and click **Skip** button instead
4. Do not configure any triggers and simply click **Next** button
5. Enter name of your function (e.g. "html-to-pdf"), then select runtime **Node.js 4.3**
6. In **Code entry type** change **Edit code inline** to **Upload a .ZIP file**
7. Click **Upload** button to upload [this project as zip archive](https://github.com/lubos/aws-lambda-wkhtmltopdf/releases/download/0.1/wkhtmltopdf.zip).
8. Select **lambda_basic_execution** role (this function doesn't need access to any part of your AWS account)
9. Increase timeout from 3 seconds to 10 seconds or more.
10. Click **Next** button
11. Review your configuration and click **Create function** button

## Testing function

Click **Actions** button, then click **Configure test event** and paste following json input:

```json
{
    "html_base64" : "PGJvZHk+SGVsbG8gd29ybGQ8L2JvZHk+"
}
```

`html_base64` parameter represents encoded `<body>Hello world</body>`

Then click **Save and test** button. If your function is working correctly, you should receive following output:

```json
{
  "pdf_base64": "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ZWYKL0NNYXBOYW1lIC9BZG9iZS1JZGVudGl0eS1VQ1MgZGVmCi9DTWFwVHlwZSAyIGRlZgoxIGJlZ2luY29kZXNwYWNlcmFuZ2UKPDAwMDA+IDxGRkZGPgplbmRjb2Rlc3BhY2VyYW5nZQoyIGJlZ2luYmZyYW5nZQo8MDAwMD4gPDAwMDA+IDwwMDAwPgo8MDAwMT4gPDAwMDg+IFs8MDA0OD4gPDAwNjU+IDwwMDZDPiA8MDA2Rj4gPDAwMjA+IDwwMDc3PiA8MDA3Mj4gPDAwNjQ+IF0KZW5kYmZyYW5nZQplbmRjbWFwCkNNYXBOYW1lIGN1cnJlbnRkaWN0IC9DTWFwIGRlZmluZXJlc291cmNlIHBvcAplbmQKZW5kCgplbmRzdHJlYW0KZW5kb2JqCjYgMCBvYmoKPDwgL1R5cGUgL0ZvbnQKL1N1YnR5cGUgL1R5cGUwCi9CYXNlRm9udCAvTmltYnVzU2FuTC1SZWd1Ci9FbmNvZGluZyAvSWRlbnRpdHktSAovRGVzY2VuZGFudEZvbnRzIFsxNCAwIFJdCi9Ub1VuaWNvZGUgMTUgMCBSPj4KZW5kb2JqCjIgMCBvYmoKPDwKL1R5cGUgL1BhZ2VzCi9LaWRzIApbCjUgMCBSCl0KL0NvdW50IDEKL1Byb2NTZXQgWy9QREYgL1RleHQgL0ltYWdlQiAvSW1hZ2VDXQo+PgplbmRvYmoKeHJlZgowIDE3CjAwMDAwMDAwMDAgNjU1MzUgZiAKMDAwMDAwMDAwOSAwMDAwMCBuIAowMDAwMDAzMTQ4IDAwMDAwIG4gCjAwMDAwMDAxODEgMDAwMDAgbiAKMDAwMDAwMDI3NiAwMDAwMCBuIAowMDAwMDAwMzYyIDAwMDAwIG4gCjAwMDAwMDMwMDcgMDAwMDAgbiAKMDAwMDAwMDMxMyAwMDAwMCBuIAowMDAwMDAwNjY4IDAwMDAwIG4gCjAwMDAwMDA5OTQgMDAwMDAgbiAKMDAwMDAwMDQ4MiAwMDAwMCBuIAowMDAwMDAwNjQ4IDAwMDAwIG4gCjAwMDAwMDEwMTMgMDAwMDAgbiAKMDAwMDAwMTIyMiAwMDAwMCBuIAowMDAwMDAyMjg0IDAwMDAwIG4gCjAwMDAwMDI1MzUgMDAwMDAgbiAKMDAwMDAwMjI2NCAwMDAwMCBuIAp0cmFpbGVyCjw8Ci9TaXplIDE3Ci9JbmZvIDEgMCBSCi9Sb290IDcgMCBSCj4+CnN0YXJ0eHJlZgozMjQ2CiUlRU9GCg=="
}
```

The function will respond with PDF encoded in Base64

## Options

There are many options available to [wkhtmltopdf](http://wkhtmltopdf.org/docs.html). All of the command line options are supported as documented on the page linked to above. The options are camelCased instead-of-dashed as in the command line tool. Note that options that do not have values, must be specified as a boolean, e.g. debugJavascript: true

```json
{
    "html_base64" : "PGJvZHk+SGVsbG8gd29ybGQ8L2JvZHk+",
    "options":
    {
        "pageSize": "letter"
    }
}
```

## Running the tests

Remember to make `wkhtmltopdf` executable:

`chmod +x wkhtmltopdf`

Then run the tests:

`PATH=$PATH:$(pwd) node test/test.js`

This command will produce output PDFs in `./test/out`. These need to be
verified manually.