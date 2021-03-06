# Zoho REST API Wrapper
[![npm version](https://badge.fury.io/js/zoho.svg)](http://badge.fury.io/js/zoho)
[![Build Status](https://travis-ci.org/4yopping/zoho.svg)](https://travis-ci.org/4yopping/zoho)
[![Join the chat at https://gitter.im/4yopping/zoho](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/4yopping/zoho?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)
[![Inline docs](http://inch-ci.org/github/4yopping/zoho.svg?branch=master)](http://inch-ci.org/github/4yopping/zoho)
Just a easy to use Zoho API integration for NodeJS, Object Oriented and REST API wrappers.

## Installation

```bash
$ npm install zoho
```

## Example

```js
var Zoho = require('zoho');
```

Using Zoho CRM:

```js
var crm = new Zoho.CRM({
  authtoken: 'bad18eba1ff45jk7858b8ae88a77fa30'
});

crm.getRecords('leads', function (err, data) {
  if (err) {
    return console.log(err);
  }

  console.log(data);
});
```

Using Zoho Invoice:

```js
var invoice = new Zoho.Invoice({
  authtoken: 'bad18eba1ff45jk7858b8ae88a77fa30'
});

invoice.getRecords('contacts', function (err, data) {
  if (err) {
    return console.log(err);
  }

  console.log(data);
});
```

Using Zoho Support:

```js
var support = new Zoho.Support({
  authtoken: 'bad18eba1ff45jk7858b8ae88a77fa30'
});

support.getRecords('contacts', function (err, data) {
  if (err) {
    return console.log(err);
  }

  console.log(data);
});
```

## Supports

* Zoho CRM
* Zoho Invoice
* Zoho Support

## Reference

* [Zoho CRM API](https://www.zoho.com/crm/help/api)
* [Zoho Invoice API](https://www.zoho.com/invoice/api/v3)
* [Zoho Support API Guide](https://www.zoho.com/support/help/api-guide.html)



##Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style.
Add unit tests for any new or changed functionality. Lint and test your code.


##Licence
The MIT License (MIT)

Copyright (c) 2015 Andrés González Aragón, 4yopping and all the related trademarks

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
