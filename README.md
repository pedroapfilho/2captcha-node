# 2Captcha Node Wrapper

Just a lightweight 2Captcha Node Wrapper

<p align="center">
  <a href="https://www.npmjs.com/package/2captcha-node"><img alt="NPM version" src="https://badge.fury.io/js/2captcha-node.svg"></a>
  <a href="https://travis-ci.com/pedroapfilho/2captcha-node"><img alt="TRAVIS version" src="https://travis-ci.com/pedroapfilho/2captcha-node.svg?branch=master"></a> 
  <a href="https://snyk.io/test/github/pedroapfilho/2captcha-node"><img alt="SNYK tests" src="https://snyk.io/test/github/pedroapfilho/2captcha-node/badge.svg"></a> 
</p>

## Prerequisites:

You will need a `2Captcha API key`

## Installation:

```
yarn add 2captcha-node
```

## Usage:

Set up your api key:

```js
import captchaSolver from "2captcha-node";

const captcha = captchaSolver("your-api-key");
```

It'll return a function, and you'll be able to use the "solve" inside of it

```js
const solvedCaptcha = await captcha.solve("base64-image");
```

And this solvedCaptcha will be the string of your resolved captcha

And ya, that's it
