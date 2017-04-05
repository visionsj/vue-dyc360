/**
 * 金钱类型(提供JS比较精确的计算)
 */
var BigDecimal = {};

/**
 * 除法函数
 */
BigDecimal.accDiv = function(arg1, arg2) {
    var t1 = 0, t2 = 0, r1, r2;
    try { t1 = arg1.toString().split(".")[1].length } catch (e) { }
    try { t2 = arg2.toString().split(".")[1].length } catch (e) { }
    with (Math) {
        r1 = Number(arg1.toString().replace(".", ""))
        r2 = Number(arg2.toString().replace(".", ""))
        return (r1 / r2) * pow(10, t2 - t1);
    }
};

/**
 * 乘法函数
 */
BigDecimal.accMul = function(arg1, arg2) {
    var m = 0, s1 = arg1.toString(), s2 = arg2.toString();
    try { m += s1.split(".")[1].length } catch (e) { }
    try { m += s2.split(".")[1].length } catch (e) { }
    return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m);
};

/**
 * 加法函数
 */
BigDecimal.accAdd = function(arg1, arg2) {
    var r1, r2, m;
    try { r1 = arg1.toString().split(".")[1].length; } catch (e) { r1 = 0; }
    try { r2 = arg2.toString().split(".")[1].length; } catch (e) { r2 = 0; }
    m = Math.pow(10, Math.max(r1, r2));
    return (arg1 * m + arg2 * m) / m;
};

/**
 * 减法函数
 */
BigDecimal.accSub = function(arg1, arg2) {
    var r1, r2, m, n;
    try {
        r1 = arg1.toString().split(".")[1].length;
    } catch (e) {
        r1 = 0;
    }
    try {
        r2 = arg2.toString().split(".")[1].length;
    } catch (e) {
        r2 = 0;
    }
    m = Math.pow(10, Math.max(r1, r2));

    n = (r1 >= r2) ? r1 : r2;
    if(n > 1) {
        return ((arg1 * m - arg2 * m) / m).toFixed(n);
    }else{
        return ((arg1 * m - arg2 * m) / m)
    }
};

/**
 * 添加千位符并且保留2位小数
 */
BigDecimal.milliFormat = function(s) {
    if(/[^0-9\.]/.test(s)) return "invalid value";
    s=s.replace(/^(\d*)$/,"$1.");
    s=(s+"00").replace(/(\d*\.\d\d)\d*/,"$1");
    s=s.replace(".",",");
    var re=/(\d)(\d{3},)/;
    while(re.test(s)){
        s=s.replace(re,"$1,$2");
    }
    s=s.replace(/,(\d\d)$/,".$1");
    return s.replace(/^\./,"0.")
};