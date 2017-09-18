/**
 * Created by Administrator on 16-5-13.
 */
//xUiShadow
(function ($, win) {
    var xUi = {
        content: {}, config: {}, events: {},
        skin: {}, method: {}, cache: {}, temp: {}, space: undefined
    };
    if (!$.isEmptyObject(win['xUi'])) {
        xUi = win['xUi'];
    } else {
        win['xUi'] = xUi;
    }
    if (!xUi.cache.shadow) {
        xUi.cache.shadow = {};
    }
    if (!xUi.shadow) {
        xUi.shadow = {};
    }
    //$.fn.xUiShadow = function (flag, msg) {
    //
    //}
    //便捷方法
    xUi.shadow.open = function ($el, opt) {
        if (!isEmpty($el.data("shadow.xUi"))) {
            var shadow = $el.data("shadow.xUi");
            shadow.elements.shadowDiv.show();
            return shadow;
        } else {
            var shadow = new xUi.content.shadow($el, opt);
            $el.data("shadow.xUi", shadow);
        }
    };
    xUi.shadow.hide = function ($el, num, callback) {
        if ($el.length > 0) {
            var shadow = $el.data("shadow.xUi");
            if (!isEmpty(shadow)) {
                if (!isEmpty(num) && $.isNumeric(num)) {
                    setTimeout(function () {
                        shadow.elements.shadowDiv.hide();
                        if ($.isFunction(callback)) {
                            callback.call(this);
                        }
                    }, num)
                } else {
                    shadow.elements.shadowDiv.hide();
                    if ($.isFunction(num)) {
                        num.call(this);
                    }
                    if ($.isFunction(callback)) {
                        callback.call(this);
                    }
                }
                return shadow;
            }
        }
    }
    xUi.shadow.close = function ($el) {
        if ($el.length > 0) {
            var shadow = $el.data("shadow.xUi");
            if (!isEmpty(shadow)) {
                delete xUi.cache.shadow[shadow.config.id];
                shadow.elements.shadowDiv.remove();
                $el.removeData("shadow.xUi");
            }
        }
    }
    //配置
    xUi.config.shadow = {
        id: undefined,
        needTip: true,
        shadowMsg: "正在加载,请稍候...",
        shadowImage: ""
    }
    //组件
    xUi.content.shadow = function ($el, opt) {
        this.config = {};
        this.elements = {};
        if ($el.length > 0) {
            if ($el[0] == document.body || $el[0] == document || $el[0] == window) {
                this.ele = $('body');
            } else {
                this.ele = $el;
            }
            xUi.method.shadow.initConfig.call(this, opt);
            xUi.method.shadow.createShodow.call(this);
            xUi.method.shadow.initEnableMethod.call(this);
        }
    }
    //定义可用事件
    xUi.events.shadow = {}
    //添加需要的皮肤class
    xUi.skin.shadow = {
        fullScreen: "full-screen",
        xUishadow: "panel-background",
        xUishadowWarp: "panel-shadow-warp",
        xuishadowMain: "panel-shadow-msg"
    };
    //定义创建方法
    xUi.method.shadow = {
        initConfig: function (opt) {
            var f = $.extend(true, {}, xUi.config.shadow);
            if (!isEmpty(opt)) {
                $.extend(true, f, opt);
                xUi.method.shadow.initEvents.call(this, opt);
            }
            $.extend(true, this.config, f);
        },
        initEvents: function (opt) {
            var t = (opt.event ? opt.event : {});
            var f = $.extend(true, {}, xUi.events.shadow);
            if (!isEmpty(t)) {
                $.extend(true, f, t);
            }
            $.extend(true, this.event, f);
        },
        initEnableMethod: function () {
            var this_ = this;
            var method = xUi.method.shadow;
            var elements = this.elements;
            var enableMethod = {}
            for (var met in enableMethod) {
                if (this[met] == undefined && $.isFunction(enableMethod[met])) {
                    this[met] = $.proxy(enableMethod[met], this_)
                }
            }
        },
        createShodow: function () {
            var skin = xUi.skin.shadow;
            var shadowDiv = this.elements.shadowDiv = $(document.createElement("div"));
            var shadowImage = this.elements.shadowImage = $(document.createElement("div"));
            var shadowSpan = this.elements.shadowSpan = $(document.createElement("span"));
            var xUishadow = this.elements.xUishadow = $(document.createElement("div"));
            var xUishadowWarp = this.elements.xUishadowWarp = $(document.createElement("div"));
            var xuishadowMain = this.elements.xuishadowMain = $('<div data-role="preloader" data-type="ring" data-style="color"'
                +'			style="margin: auto" class="preloader-ring color-style">'
                +'		<div class="wrap">'
                +'			<div class="circle"></div>'
                +'		</div>'
                +'		<div class="wrap">'
                +'			<div class="circle"></div>'
                +'		</div>'
                +'		<div class="wrap">'
                +'			<div class="circle"></div>'
                +'		</div>'
                +'		<div class="wrap">'
                +'			<div class="circle"></div>'
                +'		</div>'
                +'		<div class="wrap">'
                +'			<div class="circle"></div>'
                +'		</div>'
                +'	</div>');
            xUishadow.addClass(skin.xUishadow);
            xUishadowWarp.addClass(skin.xUishadowWarp);
            shadowDiv.append(xUishadow, xUishadowWarp);
            if (this.config.needTip == true) {
                xUishadowWarp.append(xuishadowMain);
//                xuishadowMain.append(shadowImage, shadowSpan);
                if (!isEmpty(this.config.id)) {
                    shadowDiv.attr("id", this.config.id);
                } else {
                    var id = Math.uuid();
                    shadowDiv.attr("id", id);
                    xUi.cache.shadow[id] = this;
                    this.config.id = id;
                }
                if (!isEmpty(this.config.shadowMsg)) {
                    shadowSpan.html(this.config.shadowMsg);
                }
                if (!isEmpty(this.config.shadowImage)) {
                    shadowImage.css("backgroundImage", this.config.shadowImage)
                }
            }
            if (this.ele[0] == document.body) {
                shadowDiv.addClass(skin.fullScreen);
            } else {
                this.ele.css("position", "relative");
            }
            this.ele.append(shadowDiv);
        }
    }
})(jQuery, window);