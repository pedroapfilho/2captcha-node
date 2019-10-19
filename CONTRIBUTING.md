# CONTRIBUTING

To start contributing to this project:

- Fork it
- `git clone https://github.com/<your_github_username>/2captcha-node.git` (edit `<your_github_username>`)
- `cd 2captcha-node`
- `yarn install` (If you don't have yarn then get it from [here](https://yarnpkg.com/lang/en/docs/install))
- Create a file called `dev.js`
- Fill that file with

```javascript
import captchaSolver from './src'

const captcha = captchaSolver('your-api-key')

// ... your code
```

- `yarn dev`
- Update library code on `src/index.js` then test your code in `dev.js`
