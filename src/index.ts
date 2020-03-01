import fetch from 'isomorphic-unfetch';

import { SolveCaptcha, ResponseCaptcha } from './types';

const postUrl = new URL('http://2captcha.com/in.php');

const getUrl = new URL('http://2captcha.com/res.php');

const timer = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const captchaSolver = (key: string) => {
  const postCaptcha = async (image: string) => {
    const options = {
      method: 'POST',
      headers: {
        'cache-control': 'no-cache',
        'content-type': 'multipart/form-data',
      },
      body: JSON.stringify({
        body: image,
      }),
    };

    const params = {
      key: key,
      json: '1',
      method: 'base64',
    };

    postUrl.search = new URLSearchParams(params).toString();

    try {
      const postRequest = await fetch(postUrl.toString(), options);

      const JSONPost = await postRequest.json();

      return JSONPost.request;
    } catch (e) {
      throw new Error(e);
    }
  };

  const getCaptcha = async (
    id: string,
    maxAttempts: number
  ): Promise<ResponseCaptcha> => {
    if (!maxAttempts)
      throw new Error(
        'This request has reached the maximum number of attempts'
      );

    const params = {
      key: key,
      action: 'get',
      id,
      json: '1',
    };

    getUrl.search = new URLSearchParams(params).toString();

    try {
      const getRequest = await fetch(getUrl.toString());

      const JSONGet = await getRequest.json();

      if (JSONGet.status === 1) {
        return {
          id: id,
          text: JSONGet.request,
        };
      }

      await timer(1000);

      return getCaptcha(id, maxAttempts - 1);
    } catch (e) {
      throw new Error(e);
    }
  };

  const solveCaptcha = async ({ image, maxAttempts = 60 }: SolveCaptcha) => {
    const id = await postCaptcha(image);

    await timer(5000);

    return getCaptcha(id, maxAttempts);
  };

  const getBalance = async (): Promise<string> => {
    const params = {
      key: key,
      action: 'getbalance',
      json: '1',
    };

    getUrl.search = new URLSearchParams(params).toString();

    try {
      const getBalance = await fetch(getUrl.toString());

      const JSONBalance = await getBalance.json();

      return JSONBalance.request;
    } catch (e) {
      throw new Error(e);
    }
  };

  const reportCaptcha = async (
    id: string,
    isValid: boolean
  ): Promise<boolean> => {
    const params = {
      key: key,
      action: isValid ? 'reportgood' : 'reportbad',
      json: '1',
      id: id,
    };

    getUrl.search = new URLSearchParams(params).toString();

    try {
      const reportResponse = await fetch(getUrl.toString());

      const JSONBalance = await reportResponse.json();

      return JSONBalance.request ? true : false;
    } catch (e) {
      throw new Error(e);
    }
  };

  return {
    solve: solveCaptcha,
    balance: getBalance,
    report: reportCaptcha,
  };
};

export default captchaSolver;
