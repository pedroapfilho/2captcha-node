import rp from 'request-promise'

const captcha = key => {
  const postCaptcha = async image => {
    const options = {
      method: 'POST',
      url: 'http://2captcha.com/in.php',
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

      const captchaID = JSONPost.request

      return captchaID
    } catch (e) {
      throw new Error(e)
    }
  }

  const getCaptcha = async id => {
    const options = {
      method: 'GET',
      url: 'http://2captcha.com/res.php',
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

      await new Promise(resolve => setTimeout(resolve, 1000))

      return getCaptcha(id)
    } catch (e) {
      throw new Error(e)
    }
  }

  const solveCaptcha = async image => {
    const id = await postCaptcha(image)

    await new Promise(resolve => setTimeout(resolve, 5000))

    return getCaptcha(id)
  }

  return {
    solve: solveCaptcha
  }
}

export default captcha
