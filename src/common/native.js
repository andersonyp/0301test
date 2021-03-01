var Native = function () {
    var apiNames = {
        share: 'appShare',
        scan: 'appScan',
        getGPS: 'appGetGPS',
        appBack: 'appBack',
        weChatSign: 'appWeChatSign',
        aLiSign: 'appALiSign',
        cookieClear: 'appCookieClear',
        exitLogin: 'exitLogin'
    }

    var userAgent = window.navigator.userAgent.toUpperCase()
    var isAnroid = (function () {
        return userAgent.indexOf('ANDROID') != -1
    })()
    var isIos = (function () {
        return userAgent.indexOf('MAC OS') != -1
    })()

    var nativeBridge = function (name, param, cbName) {
        console.log('name:' + name);
        console.log('param:' + JSON.stringify(param));
        console.log('cbName:' + cbName);

        var wkParam;
        if (name == "appShare") {
            wkParam = param;
        } else {
            wkParam = JSON.stringify(param);
        }


        if (isAnroid) {
            window.JSInterface[name](cbName, JSON.stringify(param));
        } else if (isIos) {

            // 最新写法2020年3月20 10点 这边主要是把两个数据，撮合起来，弄成一个数组，否则的话，无法对发送的数据进行区分。
            window.webkit.messageHandlers[name].postMessage({
                fun: cbName,
                arg: {
                    callback: wkParam
                }
            })
        }
    }


    var callNative = function (name, param, callback) {
        if (typeof callback != 'function') {
            callback = param || function () { }
        }
        var cbName = '_NATIVE_CB_' + name
        window[cbName] = function (data) {
            console.log("以下是data的值：");
            console.log(data);
            callback(data)
        }
        try {
            nativeBridge(name, param, cbName)
        } catch (e) {
            window[cbName]()
        }
    }

    var native = {
        isAnroid: isAnroid,
        isIos: isIos
    }
    for (let key in apiNames) {
        native[key] = function (param, callback) {
            callNative(apiNames[key], param, callback)
        }
    }

    return native;
}

export {
    Native
}
