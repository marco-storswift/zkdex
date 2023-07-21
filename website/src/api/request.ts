/**
 * request 网络请求工具
 * 更详细的 api 文档: https://github.com/umijs/umi-request
 */

// const codeMessage = {
//     200: '服务器成功返回请求的数据。',
//     201: '新建或修改数据成功。',
//     202: '一个请求已经进入后台排队（异步任务）。',
//     204: '删除数据成功。',
//     400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
//     401: '用户没有权限（令牌、用户名、密码错误）。',
//     403: '用户得到授权，但是访问是被禁止的。',
//     404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
//     406: '请求的格式不可得。',
//     410: '请求的资源被永久删除，且不会再得到的。',
//     422: '当创建一个对象时，发生一个验证错误。',
//     500: '服务器发生错误，请检查服务器。',
//     502: '网关错误。',
//     503: '服务不可用，服务器暂时过载或维护。',
//     504: '网关超时。',
// };

/**
 * 异常处理程序
 */
const errorHandler = (error: { response: Response }): Response =>  {
    const {response} = error;
    if (response && response.status && response.status as number) {
        // @ts-ignore
        // let errorText = codeMessage[response.status] || response.statusText;
        const {status} = response;
        // if (status === 302 || status === 401 || status === 405) {
        //     const auth = response.headers.get("auth-level");
        //     let req = await loginStates()
        //     if (req && req.data && req.data.authentication_level === 1 && auth === "2") {
        //         window.location.href = `/verify?${Base64.encode(window.location.pathname)}`
        //     } else if (req && req.data && req.data.authentication_level === 0 && auth === "2") {
        //         window.location.replace("/signin")
        //     }
        // }
    }
    return response;
};



/**
 * 配置request请求时的默认参数
 */

class Request {
    prefix: string;

    constructor(prefix: string) {
        this.prefix = prefix;
    }

    async get(url: string, init?: RequestInit | undefined) {
        let requestUrl = url;
        if (!url.startsWith("http")) {
            requestUrl = this.prefix + url;
        }
        const resp = errorHandler({
            response: await fetch(requestUrl, {
                ...init,
                headers: {
                    Accept: 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token') || ''}`,
                },
                method: 'GET',
            }),
        });
        return errorHandler({response: resp});

    }

    async post(url: string, init?: RequestInit | undefined) {
        let requestUrl = url;
        if (!url.startsWith("http")) {
            requestUrl = this.prefix + url;
        }
        const resp = errorHandler({
            response: await fetch(requestUrl, {
                ...init,
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token') || ''}`,
                },
                method: 'POST',
            }),
        });
        return errorHandler({response: resp});

    }

    async put(url: string, init?: RequestInit | undefined) {
        let requestUrl = url;
        if (!url.startsWith("http")) {
            requestUrl = this.prefix + url;
        }
        const resp = errorHandler({
            response: await fetch(requestUrl, {
                ...init,
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token') || ''}`,
                },
            }),
        });
        return errorHandler({response: resp});
    }

    async pat(url: string, init?: RequestInit | undefined) {
        let requestUrl = url;
        if (!url.startsWith("http")) {
            requestUrl = this.prefix + url;
        }
        const resp = errorHandler({
            response: await fetch(requestUrl, {
                ...init,
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token') || ''}`,
                },
                method: 'PATCH',
            }),
        });
        return errorHandler({response: resp});
    }

    async delete(url: string, init?: RequestInit | undefined) {
        let requestUrl = url;
        if (!url.startsWith("http")) {
            requestUrl = this.prefix + url;
        }
        const resp = errorHandler({
            response: await fetch(requestUrl, {
                ...init,
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token') || ''}`,
                },
                method: 'DELETE',
            }),
        });
        return errorHandler({response: resp});
    }

}

const request = new Request("");

export default request;