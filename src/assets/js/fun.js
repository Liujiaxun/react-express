/**
 * @FunName gradientColor 方法名
 * @param startColor 指定起始颜色
 * @param endColor   指定结束颜色
 * @param step       划分渐变色区域数量
 * @returns {Array}  返回渐变色数组
 */
export const gradientColor = function (startColor, endColor, step) {
        let startRGB = colorRgb(startColor);//转换为rgb数组模式
        let startR = startRGB[0];
        let startG = startRGB[1];
        let startB = startRGB[2];

        let endRGB = colorRgb(endColor);
        let endR = endRGB[0];
        let endG = endRGB[1];
        let endB = endRGB[2];

        let sR = (endR - startR) / step;//总差值
        let sG = (endG - startG) / step;
        let sB = (endB - startB) / step;

        let colorArr = [];
        for (let i = 0; i < step; i++) {
            //计算每一步的hex值
            let hex = colorHex('rgb('+ parseInt((sR * i + startR))+ ',' + parseInt((sG * i + startG))+ ',' +
                parseInt((sB * i + startB)) + ')');
            colorArr.push(hex);
        }
        return colorArr;
    };
    const colorRgb = function (sColor) {
        let reg = /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/;
        sColor = sColor.toLowerCase();
        if (sColor && reg.test(sColor)) {
            if (sColor.length === 4) {
                let sColorNew = "#";
                for (let i = 1; i < 4; i += 1) {
                    sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1));
                }
                sColor = sColorNew;
            }
            //处理六位的颜色值
            let sColorChange = [];
            for (let i = 1; i < 7; i += 2) {
                sColorChange.push(parseInt("0x" + sColor.slice(i, i + 2)));
            }
            return sColorChange;
        } else {
            return sColor;
        }
    };
    // 将rgb表示方式转换为hex表示方式
    const colorHex = function (rgb) {
        let _this = rgb;
        let reg = /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/;
        if (/^(rgb|RGB)/.test(_this)) {
            let aColor = _this.replace(/(?:\(|\)|rgb|RGB)*/g, "").split(",");
            let strHex = "#";
            for (let i = 0; i < aColor.length; i++) {
                let hex = Number(aColor[i]).toString(16);
                hex = hex < 10 ? 0 + '' + hex : hex;// 保证每个rgb的值为2位
                if (hex === "0") {
                    hex += hex;
                }
                strHex += hex;
            }
            if (strHex.length !== 7) {
                strHex = _this;
            }
            return strHex;
        } else if (reg.test(_this)) {
            let aNum = _this.replace(/#/, "").split("");
            if (aNum.length === 6) {
                return _this;
            } else if (aNum.length === 3) {
                let numHex = "#";
                for (let i = 0; i < aNum.length; i += 1) {
                    numHex += (aNum[i] + aNum[i]);
                }
                return numHex;
            }
        } else {
            return _this;
        }
    };
/**
 * @FunName rnd  方法名
 * @param n 指定区间开始
 * @param m   指定结束区间
 * @returns {Number}  返回一个整数随机数
 */
    export const rnd = function(n, m){
        var random = Math.floor(Math.random()*(m-n+1)+n);
        return random;
    }
/**
 * @Object LocalStorages  方法名
 */
export const LocalStorages = {
    get(key){
        return localStorage.getItem(key) || null;
    },
    set(key,value){
        localStorage.setItem(key,value);
    },
    del(key){
        localStorage.removeItem(key);
    },
    clear(){
        localStorage.clear();
    },
    getKey(index){
        localStorage.key(index);
    }
}

export const SessionStorages = {
    get(key){
        return sessionStorage.getItem(key) || null;
    },
    set(key,value){
        sessionStorage.setItem(key,value);
    },
    del(key){
        sessionStorage.removeItem(key);
    },
    clear(){
        sessionStorage.clear();
    },
    getKey(index){
        sessionStorage.key(index);
    }
}