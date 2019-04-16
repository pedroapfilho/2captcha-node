import rp from 'request-promise'

const timeoutDelay = (ms) => new Promise((res) => setTimeout(res, ms));

const captcha = (key) => {
	const MAX_TRIES_POST = 5;
	const MAX_TRIES_GET = 10;

	let triesPost = 0;
	let triesGet = 0;
	let captchaId;

	const postCaptcha = async (image) => {
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
			},	
    		json: true
		}

        try {
			const result = await rp(options);
			captchaId = result.request;
        } catch(error) {
            if (triesPost < MAX_TRIES_POST) {
                triesPost++;
                return postCaptcha(image);
			}

			return error;
        }
	}

	const getCaptcha = (id) => {
		const options = {
			method: 'GET',
			url: 'http://2captcha.com/res.php',
			qs: {
				key: key,
				action: 'get',
				id,
				json: '1'
			},	
    		json: true
		}
		
		try {
			const result = await rp(options);
			
			if (result.status !== 1 && triesGet < MAX_TRIES_GET) {
				triesGet++;
				timeoutDelay(3000);
                return getCaptcha(id);
			}
			return result.request;
        } catch(error) {
            if (triesGet < MAX_TRIES_GET) {
				triesGet++;
				timeoutDelay(3000);
                return getCaptcha(id);
			}

			return error;
        }

	}

	const solveCaptcha = async (image) => {
		await postCaptcha(image);
		return await getCaptcha(captchaId);
	}
}

return {
	solve: solveCaptcha
}

export default captcha;
