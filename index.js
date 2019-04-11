import rp from 'request-promise'

const captcha = key => {
  const postCaptcha = image => {
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

    return rp(options)
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

    return rp(options)
  }

  return {
    solve: async image => {
      const postRequest = await postCaptcha(image)

      const JSONPost = JSON.parse(postRequest)

      const id = JSONPost.request

      await new Promise(resolve => setTimeout(resolve, 5000))

      let response = false

      while (!response) {
        const getRequest = await getCaptcha(id)
        const JSONGet = JSON.parse(getRequest)

        if (JSONGet.status === 1) {
          response = true
          return JSONGet.request
        }

        await new Promise(resolve => setTimeout(resolve, 1000))
      }
    }
  }
}

export default captcha
