/**
 * User: 晓田(tancy)
 * Date: 13-3-27
 * Time: PM11:04
 */
define(function(require,exports,module){
    var $ = require('zepto'),touchTimer,touchel,pos,_lazy=520;

    function _touchstart(e){
        if(touchel)changeClass(false);
        touchel=$(e.currentTarget);

        if (touchel.attr('disabled') !== null) {
            e.prevent();
            touchel = null;
            return;
        }
        var touches=e.targetTouches[0];
        touchel.bind('touchmove',_touchmove).bind('touchend',_touchend).bind('touchcancel',_touchcancel);
        pos = {x: touches.screenX,y: touches.screenY};
        touchTimer=setTimeout(function() {
            touchel && changeClass(true);
        }, _lazy);
    }
    function _touchmove(e){
        var curPos = e.targetTouches[0];
        //event.getNode('moving-box') ||
        console.log('y:'+Math.abs(pos.y - curPos.screenY));
        console.log('x:'+ Math.abs(pos.x - curPos.screenX));

        if(touchel&&randomArea(e)){
            changeClass(false);
            clear();
        }
    }
    function _touchend(e){
        if(touchel){
            changeClass(true);
            touchel.click(e);
            clear(true);
        }else{
            clear();
        }

    }
    function _touchcancel(e){
        if(touchel){
            changeClass(false);
        }
        clear();
    }
    function randomArea(e){
        var curPos = e.targetTouches[0];
        //event.getNode('moving-box') ||
        //判断是否有横向滚动条
        var ea = document.documentElement.scrollWidth > window.innerWidth;
        return (Math.abs(pos.y - curPos.screenY) >= 30 || (ea && Math.abs(pos.x - curPos.screenX) >= 3));

    }
    function clear(lazy){
        clearTimeout(touchTimer);
        touchel && setTimeout(function(){
            changeClass(false);
            touchel=null;
        }, lazy ? _lazy : 0);

    }
    function changeClass(show){
        if(show){
            touchel.addClass('touched');
        }else{
            touchel.removeClass('touched');
        }
    }
    function hasTouchEvents(){
        return 'ontouchstart' in window;
    }
    exports.init=function(o){
        if (!hasTouchEvents())
            return;
        o.find('.touchable').bind('touchstart',_touchstart);
    }
});