/**
 * Created by zhangjun on 16-1-28.
 */
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
    if ($.isFunction($.fn.layout)) {
        return;
    }
    XUIOPT = "xuiopt";
    if (!$.isFunction(xUi.getXUIOPT)) {
        xUi.getXUIOPT = function (str) {
            var temp = {};
            if (!isEmpty(str)) {
                var arr = str.split(",");
                $.each(arr, function (i, v) {
                    var vv = v.split(":");
                    if (typeof(vv[1]) == "string" && vv[1].trim() == "true") {
                        vv[1] = true;
                    }
                    if (typeof(vv[1]) == "string" && vv[1].trim() == "false") {
                        vv[1] = false;
                    }
                    if (typeof(vv[1]) == "string" && $.isNumeric(Number(vv[1]))) {
                        vv[1] = Number(vv[1]);
                    }
                    if (typeof(vv[1]) == "string") {
                        temp[vv[0].trim()] = vv[1].trim();
                    } else {
                        temp[vv[0].trim()] = vv[1];
                    }
                });
            }
            return temp;
        }
    }
    //配置
    xUi.config.layout = {
        distance: 2,//间距离
        model: "default",//包裹模式
        listener: true,//是否启用动态监听
        needTop: true,
        needLeft: true,
        needRight: true,
        needBottom: true
    }
    //组件
    xUi.content.layout = function (key, opt) {
        this.config = {
            id: "",
            title: "",
            height: "100%",
            width: "100%"
        };
        this.elements = {
            layoutWarp: undefined,
            top: undefined,
            left: undefined,
            right: undefined,
            bottom: undefined,
            center: undefined
        }
        function init(opt) {
            this.elements.layoutWarp = opt.target;
            xUi.method.layout.initConfig.call(this, opt);
            xUi.method.layout.initEvents.call(this);
            xUi.method.layout.initLayOut.call(this);
            xUi.method.layout.doLayout.call(this);
            xUi.method.layout.initEnableMethod.call(this);
            xUi.method.layout.bindListen.call(this);
            xUi.queen--;
            return this;
        }

        init.call(this, key);
    }
    //定义可用事件
    xUi.events.layout = {

    }
    //添加需要的皮肤class
    xUi.skin.layout = {
        layoutWarp: "xui-layoutWarp",
        top: "xui-layout-top",
        left: "xui-layout-left",
        right: "xui-layout-right",
        bottom: "xui-layout-bottom",
        center: "xui-layout-center"
    };
    //定义创建方法
    xUi.method.layout = {
        initConfig: function (cfg) {
            var config = $.extend(true, {}, xUi.config.layout);
            this.config = $.extend(true, config, cfg);
        },
        initEvents: function () {

        },
        initEnableMethod: function () {
            var this_ = this;
            var method = xUi.method.layout;
            var elements = this.elements;
            var enableMethod = {
                changeElement: function (posi, num, cb) {
                    var els = this.elements;
                    switch (posi) {
                        case "top":
                            els.top.css("height", num);
                            break;
                        case "left":
                            els.left.css("width", num);
                            break;
                        case "right":
                            els.right.css("width", num);
                            break;
                        case "bottom":
                            els.bottom.css("height", num);
                            break;
                        default :
                            break;
                            return null;
                    }
                    xUi.method.layout.doLayout.call(this);
                    if (cb instanceof Function) {
                        cb.call(els[posi], this);
                    }
                },
                remove: function (posi) {
                    var els = this.elements;
                    switch (posi) {
                        case "top":
                            els.top.remove();
                            delete  els[posi];
                            break;
                        case "left":
                            els.left.remove();
                            delete  els[posi];
                            break;
                        case "right":
                            els.right.remove();
                            delete  els[posi];
                            break;
                        case "bottom":
                            els.bottom.remove();
                            delete  els[posi];
                            break;
                        default :
                            break;
                            return null;
                    }

                    xUi.method.layout.doLayout.call(this);
                },
                add: function (posi, num, cb) {
                    var els = this.elements;
                    var skin = xUi.skin.layout;
                    if (isEmpty(els[posi])) {
                        els[posi] = $(document.createElement("div"));
                        els.layoutWarp.append(els[posi]);
                    }
                    switch (posi) {
                        case "top":
                            els[posi].addClass(skin.top);
                            break;
                        case "left":
                            els[posi].addClass(skin.left);
                            break;
                        case "right":
                            els[posi].addClass(skin.right);
                            break;
                        case "bottom":
                            els[posi].addClass(skin.bottom);
                            break;
                        default :
                            break;
                            return null;
                    }
                    this.changeElement(posi, num, cb);
                },
                getElement: function (posi) {
                    var ele = undefined;
                    var els = this.elements;
                    if (!isEmpty(els[posi])) {
                        ele = els[posi];
                    }
                    return ele;
                }
            }
            for (var met in enableMethod) {
                if (this[met] == undefined && $.isFunction(enableMethod[met])) {
                    this[met] = $.proxy(enableMethod[met], this_)
                }
            }
        },
        initLayOut: function () {
            var skin = xUi.skin.layout;
            var els = this.elements;
            var warp = els.layoutWarp;
            warp.children().each(function (i, v) {
                if ($(v).hasClass(skin.top)) {
                    els.top = $(v);
                }
                if ($(v).hasClass(skin.left)) {
                    els.left = $(v);
                }
                if ($(v).hasClass(skin.right)) {
                    els.right = $(v);
                }
                if ($(v).hasClass(skin.center)) {
                    els.center = $(v);
                }
                if ($(v).hasClass(skin.bottom)) {
                    els.bottom = $(v);
                }
            });
            if (els.center.length == 0) {
                els.center = $(document.createElement("div"));
                els.center.addClass(skin.center);
            }
        },
        bindListen: function () {
            var config = this.config;
            var els = this.elements;
            var layout = this;
            if (config.listener == true) {
                if (!isEmpty(els.top)) {
                    var interTop = null;
                    els.top.on('resizeHeight.xUi', function (e, width, height) {
                        if (interTop == null) {
                            interTop = setTimeout(function () {
                                layout.changeElement("top", $(e.target).outerHeight());
                                clearTimeout(interTop);
                                interTop = null;
                            }, 300);
                        }
                        e.stopPropagation();//阻止事件冒泡
                        return false;
                    });
                }
                if (!isEmpty(els.left)) {
                    var interLeft = null;
                    els.left.on('resizeWidth.xUi', function (e, width, height) {
                        if (interLeft == null) {
                            interLeft = setTimeout(function () {
                                layout.changeElement("left", $(e.target).outerWidth());
                                clearTimeout(interLeft);
                                interLeft = null;
                            }, 300);
                        }
                        e.stopPropagation();//阻止事件冒泡
                        return false;
                    });
                }
                if (!isEmpty(els.right)) {
                    var interRight = null;
                    els.right.on('resizeWidth.xUi', function (e, width, height) {
                        if (interRight == null) {
                            interRight = setTimeout(function () {
                                layout.changeElement("right", $(e.target).outerWidth());
                                clearTimeout(interRight);
                                interRight = null;
                            }, 300);
                        }
                        e.stopPropagation();//阻止事件冒泡
                        return false;
                    });
                }
                if (!isEmpty(els.bottom)) {
                    var interBottom = null;
                    els.bottom.on('resizeHeight.xUi', function (e, width, height) {
                        if (interBottom == null) {
                            interBottom = setTimeout(function () {
                                layout.changeElement("bottom", $(e.target).outerHeight());
                                clearTimeout(interBottom);
                                interBottom = null;
                            }, 300);
                        }
                        e.stopPropagation();//阻止事件冒泡
                        return false;
                    });
                }
            }
        },
        doLayout: function () {
            var config = this.config;
            var top = 0, left = 0, right = 0, bottom = 0;

            var els = this.elements;
            if (!isEmpty(els.top)) {
                top = els.top.outerHeight() + config.distance;
            }
            if (!isEmpty(els.left)) {
                left = els.left.outerWidth() + config.distance;
            }
            if (!isEmpty(els.right)) {
                right = els.right.outerWidth() + config.distance;
            }
            if (!isEmpty(els.bottom)) {
                bottom = els.bottom.outerHeight() + config.distance;
            }
            if (!isEmpty(els.left)) {
                els.left.css({
                    height: "none",
                    top: top,
                    bottom: bottom
                });
            }
            if (!isEmpty(els.right)) {
                els.right.css({
                    height: "none",
                    top: top,
                    bottom: bottom
                });
            }
            els.center.css({
                top: top,
                left: left,
                right: right,
                bottom: bottom
            });
            if (config.distance > 0) {
                if (!isEmpty(els.right)) {
                    els.right.css({
                        padding: config.distance
                    });
                }
                if (!isEmpty(els.center)) {
                    els.center.css({
                        padding: config.distance
                    });
                }
                if (!isEmpty(els.left)) {
                    els.left.css({
                        padding: config.distance
                    });
                }
                if (!isEmpty(els.top)) {
                    els.top.css({
                        padding: config.distance
                    });
                }
                if (!isEmpty(els.bottom)) {
                    els.bottom.css({
                        padding: config.distance
                    });
                }
            }
        }
    }
    //自动初始化
    $(document).ready(function () {
        $("." + xUi.skin.layout.layoutWarp).each(function (i, v) {
            var data = $(this).data("xui.layout");
            if (!isEmpty(data)) {
                return data;
            } else {
                var option = xUi.getXUIOPT($(this).data(XUIOPT));
                option.target = $(v);
                xUi.queen++;
                var lay = new xUi.content.layout(option);
                $(this).data("xui.layout", lay);
            }
        });
    })
})(jQuery, window)