import rp from 'request-promise-native'

const postUrl = 'http://2captcha.com/in.php'

const getUrl = 'http://2captcha.com/res.php'

const timer = ms => new Promise(resolve => setTimeout(resolve, ms))

const captchaSolver = key => {
  const postCaptcha = async image => {
    const options = {
      method: 'POST',
      url: postUrl,
      qs: {
        key: key,
        json: '1',
        method: 'base64'
      },
      headers: {
        'cache-control': 'no-cache',
        'content-type': 'multipart/form-data'
      },
      formData: {
        body: image
      }
    }

    try {
      const postRequest = await rp(options)

      const JSONPost = JSON.parse(postRequest)

      return JSONPost.request
    } catch (e) {
      throw new Error(e)
    }
  }

  const getCaptcha = async id => {
    const options = {
      method: 'GET',
      url: getUrl,
      qs: {
        key: key,
        action: 'get',
        id,
        json: '1'
      }
    }

    try {
      const getRequest = await rp(options)

      const JSONGet = JSON.parse(getRequest)

      if (JSONGet.status === 1) {
        return JSONGet.request
      }

      await timer(1000)

      return getCaptcha(id)
    } catch (e) {
      throw new Error(e)
    }
  }

  const solveCaptcha = async image => {
    const id = await postCaptcha(image)

    await timer(5000)

    return getCaptcha(id)
  }

  const getBalance = async () => {
    const options = {
      method: 'GET',
      url: getUrl,
      qs: {
        key: key,
        action: 'getbalance',
        json: '1'
      }
    }

    try {
      const getBalance = await rp(options)

      const JSONBalance = JSON.parse(getBalance)

      return JSONBalance.request
    } catch (e) {
      throw new Error(e)
    }
  }

  const postReCaptcha = async ({
    method = 'userrecaptcha',
    json = 1,
    ...rest
  }) => {
    const options = {
      method: 'POST',
      url: postUrl,
      qs: {
        method,
        json,
        key,
        ...rest
      },
      headers: {
        'cache-control': 'no-cache',
        'content-type': 'application/json'
      }
    }

    try {
      const postRequest = await rp(options)

      const JSONPost = JSON.parse(postRequest)

      return JSONPost.request
    } catch (e) {
      throw new Error(e)
    }
  }

  /**
   * Solve Google reCaptcha V2 and V3
   *
   * @async
   * @example
   * solveReCaptcha({
   *   googlekey: '6Le-wvkSAAAAAPBMRTvw0Q4Muexq9bi0DJwx_mJ-',
   *   pageurl: 'https://www.google.com/recaptcha/api2/demo'
   * }).then(reCaptchaToken => {
   *   console.log(reCaptchaToken) // '03AHJ_Vuve5Asa4koK3KSMyUkCq0vUF...'
   *
   *   // Use reCaptchaToken as a value inside "#g-recaptcha-response"
   *   // which is an invisible textarea
   * })
   *
   * @param {Object} opts
   * @param {String} opts.googleKey Value of k or data-sitekey parameter you found on page
   * @param {String} opts.pageurl Full URL of the page where you see the ReCaptcha
   * @param {String} [opts.version='v2'] v2 OR v3
   * @param {Number} [opts.invisble=0] 0 = visible || 1 = invisible
   * @returns {Promise<String>} reCaptchaToken
   */
  const solveReCaptcha = async ({
    googlekey,
    pageurl,
    version = 'v2',
    invisble = 0,
    ...rest
  }) => {
    const id = await postReCaptcha({
      googlekey,
      pageurl,
      version,
      invisble,
      rest
    })

    await timer(5000)

    return getCaptcha(id)
  }

  return {
    solve: solveCaptcha,
    solveReCaptcha,
    balance: getBalance
  }
}

export default captchaSolver
