var postcss = require('postcss');

var pxRegex = /"[^"]+"|'[^']+'|url\([^\)]+\)|(\d*\.?\d+)px/g;
var remRegex = /"[^"]+"|'[^']+'|url\([^\)]+\)|(\d*\.?\d+)rem/g;

var Default = {
    vwUnit: 360,
    minPixelValue:2
}

module.exports = postcss.plugin('postcss-px-to-vw', function (options) {
    return function (css) {
        options = options || {};
        var opts = Object.assign({}, Default, options);
        css.walkRules(function (rule) {
            rule.walkDecls(function(decl) {
                const annotation = decl.next();
                if ( annotation && annotation.type == 'comment' && annotation.text == 'px') return;
                if(decl.value.indexOf('rem') != -1){
                    var remTxt=';'+'\n '+decl.prop+decl.raws.between+decl.value.replace(remRegex, function (remSize,m1,m2) {
                       
                        var num = parseFloat(remSize)*10;
    
                        return num + 'vw';
                    });
                    decl.value+=remTxt;
                }
                else if (decl.value.indexOf('px') != -1) {
                    var remTxt=';'+'\n '+decl.prop+decl.raws.between+decl.value.replace(pxRegex, function (pxSize,m1,m2) {
                        var num = parseInt(pxSize);
                        var vwNum = num * 100 / opts.vwUnit;
                        return num<opts.minPixelValue?pxSize:vwNum + 'vw';
                    });
                    decl.value =decl.value.replace(pxRegex, function (pxSize) {
                        var num = parseInt(pxSize);
                        var vwNum = num * 10 / opts.vwUnit;
                        return num<opts.minPixelValue?pxSize:vwNum + 'rem';
                    });
                    decl.value+=remTxt;
                }
            })
            
        });
    }
});