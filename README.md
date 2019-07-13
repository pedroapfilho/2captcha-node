# 2Captcha Node

Just a lightweight captcha solver using 2Captcha

<p align="center">
  <a href="https://www.npmjs.com/package/2captcha-node"><img alt="NPM version" src="https://badge.fury.io/js/2captcha-node.svg"></a>
  <a href="https://travis-ci.com/pedroapfilho/2captcha-node"><img alt="TRAVIS version" src="https://travis-ci.com/pedroapfilho/2captcha-node.svg?branch=master"></a>
</p>

## Prerequisites:

You will need a `2Captcha API key`

## Installation:

```
npm i 2captcha-node
```

## Usage:

Set up your api key:

```js
import captchaSolver from "2captcha-node";

const captcha = captchaSolver("your-api-key");
```

It'll return an object with the `solve` function, and you'll be able to use it inside of your script

```js
const solvedCaptcha = await captcha.solve("base64-image");
```

And this solvedCaptcha will be the string of your resolved captcha

And ya, that's it
