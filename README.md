<h1 align="center">Welcome to 2captcha-node 👋</h1>

<p align="center">
  <a href="https://www.npmjs.com/package/2captcha-node"><img alt="NPM version" src="https://badge.fury.io/js/2captcha-node.svg"></a>
  <a href="https://travis-ci.com/pedroapfilho/2captcha-node"><img alt="TRAVIS version" src="https://travis-ci.com/pedroapfilho/2captcha-node.svg?branch=master"></a>
</p>

> A NodeJS wrapper to solve image captchas with 2captcha

### 🏠 [Homepage](https://github.com/pedroapfilho/2captcha-node#readme)

## Prerequisites:

You will need a `2Captcha API key`

## Install

```sh
npm install
```

## Usage

### Solve image captchas

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

### Solve reCaptcha

```js
import captchaSolver from "2captcha-node";

const reCaptchaToken = captchaSolver("your-api-key");
const solvedCaptcha = await captcha.solveReCaptcha({
  googlekey: 'googlekey', // Value of k or data-sitekey parameter you found on page
  pageurl:  'pageurl' // Full URL of the page where you see the ReCaptcha
})

// Use reCaptchaToken as a value inside "#g-recaptcha-response"
// which is an invisible textarea

// So in client side you can do something like
document.getElementById("g-recaptcha-response").innerHTML = reCaptchaToken;
```

### View balance

You can use the `balance` function too, to see your balance at 2Captcha

```js
const balance = await captcha.balance();
```

## Author

👤 **Pedro Filho <pedro@filho.me>**

- Twitter: [@pedrofilhome](https://twitter.com/pedrofilhome)
- Github: [@pedroapfilho](https://github.com/pedroapfilho)

## 🤝 Contributing

Contributions, issues and feature requests are welcome!<br />Feel free to check [issues page](https://github.com/pedroapfilho/2captcha-node/issues).

To start developing for this project you can follow [CONTRIBUTING.md](https://github.com/pedroapfilho/2captcha-node/blob/master/CONTRIBUTING.md)

## Show your support

Give a ⭐️ if this project helped you!

<a href="https://www.buymeacoffee.com/khcUAVF" target="_blank"><img src="https://bmc-cdn.nyc3.digitaloceanspaces.com/BMC-button-images/custom_images/orange_img.png" alt="Buy Me A Coffee" style="height: auto !important;width: auto !important;" ></a>
