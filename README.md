# maskemail

A simple e-mail address masking utility for JavaScript. It replaces parts of e-mail addresses with a masking character, but keeping the overall format of the address recognisable. Useful for secure display, for situations when you want to tell users where you sent password reset instructions or some other sensitive information, without giving away too much data.

`example@test.com` => `e******@t***.com`


* No dependencies
* Compatible with Node and most browsers
* Simple, unit-tested, production-ready


## Install using NPM

```
npm install maskemail -S
```

## Usage

Call with a single argument to get the default mask, using `*` for replacement:

```
const maskemail = require('maskemail')
console.log(maskemail('testme@some.domain.gov'))

=> t*****@s***.d*****.gov
```

Call with options in the second argument to customise the process. Available options are:

* `replacement`: (`string`) the character to use for masking, the default value is `*`
* `allowed`: (`RegExp`) matcher for characters delimit groups (the default value is `/@\."+/`)

```

const maskemail = require('maskemail')

console.log(maskemail('example@test.com', {replacement: '#'}))

=> 'e######@t###.com'

console.log(maskemail('firstname-lastname@domain-one.com', {allowed: /@\.-/}))

=> 'f********-l*******@d*****-o**.com'
```
