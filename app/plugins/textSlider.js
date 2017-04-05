import Zepto from './zepto.min.js'

(function($){
  $.fn.textSlider = function(options){
        //默认配置
        var defaults = {
            speed: 1000,  //滚动速度,值越大速度越慢
            line: 1,     //滚动的行数
            delay: 5000,
            scrollHeight: 20
        };

        var opts = $.extend({}, defaults, options);

        var $timer;
        function marquee(obj, _speed, delay){
            var top = 0;
            var margintop;
            $timer = setInterval(function(){
                top += opts.scrollHeight;
                margintop = 0 - top;
                obj.find("ul").animate({
                    marginTop: margintop
                },_speed,function(){
                    var s = Math.abs(parseInt($(this).css("margin-top")));
                    var h = $(this).height();
                    if(s >= h){
                        top = 0;
                        $(this).css("margin-top", 0);   //确保每次都是从0开始，避免抖动
                        $(this).find("li").slice(0, 1).appendTo($(this));
                    }
                });
            }, delay);
        }

        this.each(function(){
            var speed = opts["speed"],line = opts["line"],delay = opts["delay"],_this = $(this);
            var $ul =_this.find("ul");
            if($ul.height() > _this.height()){
                marquee(_this, speed, delay);
            }

            //触摸开始
            //_this.on('touchstart', function(ev){
            //    ev.preventDefault();
            //    clearInterval($timer);
            //});
            //
            ////向上滑动
            //_this.on('swipeup', function(ev){
            //    ev.preventDefault();
            //    clearInterval($timer);
            //    if($ul.height() > _this.height()){
            //        for(i=0; i<opts.line;i++){
            //            $ul.find("li").first().appendTo($ul);
            //        }
            //        $ul.css("margin-top",0);
            //    }
            //});
            //
            ////向下滑动
            //_this.on('swipedown', function(ev){
            //    ev.preventDefault();
            //    clearInterval($timer);
            //    if($ul.height() > _this.height()){
            //        for(i=0;i<opts.line;i++){
            //            $ul.find("li").first().before($ul.find("li").last());
            //        }
            //        $ul.css("margin-top",0);
            //    }
            //});
            //
            ////触摸结束
            //_this.on('touchend',function(ev){
            //    ev.preventDefault();
            //    if($ul.height() > _this.height()){
            //        marquee(_this, speed);
            //    }
            //});
        });
    }

})(Zepto);
