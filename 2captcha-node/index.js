var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import rp from "request-promise-native";
const postUrl = "http://2captcha.com/in.php";
const getUrl = "http://2captcha.com/res.php";
const timer = (ms) => new Promise(resolve => setTimeout(resolve, ms));
const captchaSolver = (key) => {
    const postCaptcha = (image) => __awaiter(void 0, void 0, void 0, function* () {
        const options = {
            method: "POST",
            url: postUrl,
            qs: {
                key: key,
                json: "1",
                method: "base64"
            },
            headers: {
                "cache-control": "no-cache",
                "content-type": "multipart/form-data"
            },
            formData: {
                body: image
            }
        };
        try {
            const postRequest = yield rp(options);
            const JSONPost = JSON.parse(postRequest);
            return JSONPost.request;
        }
        catch (e) {
            throw new Error(e);
        }
    });
    const getCaptcha = (id) => __awaiter(void 0, void 0, void 0, function* () {
        const options = {
            method: "GET",
            url: getUrl,
            qs: {
                key: key,
                action: "get",
                id,
                json: "1"
            }
        };
        try {
            const getRequest = yield rp(options);
            const JSONGet = JSON.parse(getRequest);
            if (JSONGet.status === 1) {
                return JSONGet.request;
            }
            yield timer(1000);
            return getCaptcha(id);
        }
        catch (e) {
            throw new Error(e);
        }
    });
    const solveCaptcha = (image) => __awaiter(void 0, void 0, void 0, function* () {
        const id = yield postCaptcha(image);
        yield timer(5000);
        return getCaptcha(id);
    });
    const getBalance = () => __awaiter(void 0, void 0, void 0, function* () {
        const options = {
            method: "GET",
            url: getUrl,
            qs: {
                key: key,
                action: "getbalance",
                json: "1"
            }
        };
        try {
            const getBalance = yield rp(options);
            const JSONBalance = JSON.parse(getBalance);
            return JSONBalance.request;
        }
        catch (e) {
            throw new Error(e);
        }
    });
    return {
        solve: solveCaptcha,
        balance: getBalance
    };
};
export default captchaSolver;
