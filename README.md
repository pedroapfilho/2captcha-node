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

## Show your support

Give a ⭐️ if this project helped you!

<style>.bmc-button img{width: 27px !important;margin-bottom: 1px !important;box-shadow: none !important;border: none !important;vertical-align: middle !important;}.bmc-button{line-height: 36px !important;height:37px !important;text-decoration: none !important;display:inline-flex !important;color:#FFFFFF !important;background-color:#FF813F !important;border-radius: 3px !important;border: 1px solid transparent !important;padding: 1px 9px !important;font-size: 22px !important;letter-spacing: 0.6px !important;box-shadow: 0px 1px 2px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 1px 2px 2px rgba(190, 190, 190, 0.5) !important;margin: 0 auto !important;font-family:'Cookie', cursive !important;-webkit-box-sizing: border-box !important;box-sizing: border-box !important;-o-transition: 0.3s all linear !important;-webkit-transition: 0.3s all linear !important;-moz-transition: 0.3s all linear !important;-ms-transition: 0.3s all linear !important;transition: 0.3s all linear !important;}.bmc-button:hover, .bmc-button:active, .bmc-button:focus {-webkit-box-shadow: 0px 1px 2px 2px rgba(190, 190, 190, 0.5) !important;text-decoration: none !important;box-shadow: 0px 1px 2px 2px rgba(190, 190, 190, 0.5) !important;opacity: 0.85 !important;color:#FFFFFF !important;}</style><link href="https://fonts.googleapis.com/css?family=Cookie" rel="stylesheet"><a class="bmc-button" target="_blank" href="https://www.buymeacoffee.com/khcUAVF"><img src="https://bmc-cdn.nyc3.digitaloceanspaces.com/BMC-button-images/BMC-btn-logo.svg" alt="Buy me a coffee"><span style="margin-left:5px">Buy me a coffee</span></a>
