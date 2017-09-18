/**
 * Created by zhangjun on 15/11/10.
 */
//扩充组建resizeElement事件
//兼容 扩充
(function ($, win) {
    if (!$.isFunction(win.String.prototype.trim)) {
        window.top.String.prototype.trim = win.String.prototype.trim = function () {
            return $.trim(this);
        }
    }
    /**
     * 判断会否为空 支持常规对象、NaN、html元素、jQuery元素、数组、对象，
     * 对象没有属性时（自身属性不包括父属性）数组没有成员时 和 其他为null 空 或者 undefined情况返回真search
     */
//    isEmpty = function (obj) {
//        if (obj == undefined || obj == null || _.isNaN(obj)) return true;
//        if (typeof obj === "function")  return false;
//        if (typeof obj === "string" && $.trim(obj).length > 0) return false;
//        else if (typeof obj === "string" && $.trim(obj).length <= 0) return true;
//        if (typeof obj === "number" || typeof obj === "boolean" || obj instanceof RegExp)  return false;
//        if (obj == obj.window || obj.nodeType)  return false;
//        if (obj instanceof jQuery && obj.length > 0) return false;
//        else if (obj instanceof jQuery && obj.length <= 0) return true;
//        return _.isEmpty(obj);
//    };
})(jQuery, window);
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
    //resizeWidth
    (function ($, h, c) {
        var a = $([]),
            e = $.resize = $.extend($.resize, {}),
            i,
            k = 'setTimeout',
            j = 'resizeWidth',
            d = j + '-special-event',
            b = 'delay',
            f = 'throttleWindow';
        e[b] = 250;
        e[f] = true;
        $.event.special[j] = {
            setup: function () {
                if (!e[f] && this[k]) {
                    return false;
                }
                var l = $(this);
                a = a.add(l);
                $.data(this, d, {
                    w: l.width()
                });
                if (a.length === 1) {
                    g();
                }
            },
            teardown: function () {
                if (!e[f] && this[k]) {
                    return false;
                }
                var l = $(this);
                a = a.not(l);
                l.removeData(d);
                if (!a.length) {
                    clearTimeout(i);
                }
            },
            add: function (l) {
                if (!e[f] && this[k]) {
                    return false;
                }
                var n;

                function m(s, o, p) {
                    var q = $(this),
                        r = $.data(this, d);
                    r.w = o !== c ? o : q.width();
                    n.apply(this, arguments);
                }

                if ($.isFunction(l)) {
                    n = l;
                    return m;
                } else {
                    n = l.handler;
                    l.handler = m;
                }
            }
        };
        function g() {
            i = h[k](function () {
                    a.each(function () {
                        var n = $(this),
                            m = n.width(),
                            o = $.data(this, d);
                        if (m !== o.w) {
                            n.trigger(j, [o.w = m]);
                        }
                    });
                    g();
                },
                e[b]);
        }
    })($, this);
    //resizeHeight
    (function ($, h, c) {
        var a = $([]),
            e = $.resize = $.extend($.resize, {}),
            i,
            k = 'setTimeout',
            j = 'resizeHeight',
            d = j + '-special-event',
            b = 'delay',
            f = 'throttleWindow';
        e[b] = 250;
        e[f] = true;
        $.event.special[j] = {
            setup: function () {
                if (!e[f] && this[k]) {
                    return false;
                }
                var l = $(this);
                a = a.add(l);
                $.data(this, d, {
                    h: l.height()
                });
                if (a.length === 1) {
                    g();
                }
            },
            teardown: function () {
                if (!e[f] && this[k]) {
                    return false;
                }
                var l = $(this);
                a = a.not(l);
                l.removeData(d);
                if (!a.length) {
                    clearTimeout(i);
                }
            },
            add: function (l) {
                if (!e[f] && this[k]) {
                    return false;
                }
                var n;

                function m(s, o, p) {
                    var q = $(this),
                        r = $.data(this, d);
                    r.h = p !== c ? p : q.height();
                    n.apply(this, arguments);
                }

                if ($.isFunction(l)) {
                    n = l;
                    return m;
                } else {
                    n = l.handler;
                    l.handler = m;
                }
            }
        };
        function g() {
            i = h[k](function () {
                    a.each(function () {
                        var n = $(this),
                            l = n.height(),
                            o = $.data(this, d);
                        if (l !== o.h) {
                            n.trigger(j, [o.h = l]);
                        }
                    });
                    g();
                },
                e[b]);
        }
    })($, this);
//resizeElement
    (function ($, h, c) {
        var a = $([]),
            e = $.resize = $.extend($.resize, {}),
            i,
            k = 'setTimeout',
            j = 'resizeElement',
            d = j + '-special-event',
            b = 'delay',
            f = 'throttleWindow';
        e[b] = 250;
        e[f] = true;
        $.event.special[j] = {
            setup: function () {
                if (!e[f] && this[k]) {
                    return false;
                }
                var l = $(this);
                a = a.add(l);
                $.data(this, d, {
                    w: l.width(),
                    h: l.height()
                });
                if (a.length === 1) {
                    g();
                }
            },
            teardown: function () {
                if (!e[f] && this[k]) {
                    return false;
                }
                var l = $(this);
                a = a.not(l);
                l.removeData(d);
                if (!a.length) {
                    clearTimeout(i);
                }
            },
            add: function (l) {
                if (!e[f] && this[k]) {
                    return false;
                }
                var n;

                function m(s, o, p) {
                    var q = $(this),
                        r = $.data(this, d);
                    r.w = o !== c ? o : q.width();
                    r.h = p !== c ? p : q.height();
                    n.apply(this, arguments);
                }

                if ($.isFunction(l)) {
                    n = l;
                    return m;
                } else {
                    n = l.handler;
                    l.handler = m;
                }
            }
        };
        function g() {
            i = h[k](function () {
                    a.each(function () {
                        var n = $(this),
                            m = n.width(),
                            l = n.height(),
                            o = $.data(this, d);
                        if (m !== o.w || l !== o.h) {
                            n.trigger(j, [o.w = m, o.h = l]);
                        }
                    });
                    g();
                },
                e[b]);
        }
    })($, this);
    //扩充Math 方法
    if (!$.isFunction(win.Math.uuid)) {
        var CHARS = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
        Math.uuid = function (len, radix) {
            var chars = CHARS, uuid = [], i;
            radix = radix || chars.length;
            if (len) {
                // Compact form
                for (i = 0; i < len; i++) uuid[i] = chars[0 | Math.random() * radix];
            } else {
                var r;
                uuid[14] = '4';
                for (i = 0; i < 36; i++) {
                    if (!uuid[i]) {
                        r = 0 | Math.random() * 16;
                        uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
                    }
                }
            }
            return uuid.join('');
        };
    }
    if (!$.isFunction(xUi.getStyle)) {
        xUi.getStyle = function (ele) {
            var str = ele[0].style.cssText;
            var style = {};
            var co = str.split(";");
            $.each(co, function (i, v) {
                var cq = v.split(":");
                if (cq.toString().length > 0) {
                    var key = cq[0].trim();
                    var value = cq[1].trim();
                    style[key] = value;
                }
            });
            return style;
        }
    }
    //扩充克隆方法
    if (!$.isFunction(win.top.clone)) {
        win.top.clone = function (obj) {
            if (isEmpty(obj) || obj == obj.window) return obj;
            var buf;
            if (typeof obj == 'function') {
                return obj;
            } else if (typeof obj.cloneNode == 'function') {
                return $(obj).clone(true);
            } else if (obj instanceof jQuery && obj.length > 0) {
                return obj.clone(true);
            } else if (obj instanceof Array) {
                buf = [];
                var i = obj.length;
                while (i--) {
                    buf[i] = arguments.callee(obj[i]);
                }
                return buf;
            } else if (obj instanceof Object) {
                buf = {};
                for (var k in obj) {
                    buf[k] = arguments.callee(obj[k]);
                }
                return buf;
            } else {
                return obj;
            }
        };
    }
    if (!$.isFunction(win.clone)) {
        win.clone = win.top._.clone;
    }
    //构造isEmpty方法
    if (!$.isFunction(win.top['isEmpty'])) {
        win.top['isEmpty'] = function (obj) {
            if (obj == undefined || obj == null || _.isNaN(obj)) return true;
            if (typeof obj === "function")  return false;
            if (typeof obj === "string" && $.trim(obj).length > 0) return false;
            else if (typeof obj === "string" && $.trim(obj).length <= 0) return true;
            if (typeof obj === "number" || typeof obj === "boolean" || obj instanceof RegExp)  return false;
            if (obj == obj.window || obj.nodeType)  return false;
            if (obj instanceof jQuery && obj.length > 0) return false
            else if (obj instanceof jQuery && obj.length <= 0) return true;
            return _.isEmpty(obj);
        }
    }
    if (!$.isFunction(win['isEmpty'])) {
        win['isEmpty'] = win.top['isEmpty'];
    }
    XUIOPT = "xuiopt";
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
    if (!$.isFunction(xUi.loadAjax)) {
        xUi['loadAjax'] = function (url, param, callback, errcallback, apply) {
            $.ajax({
                url: url,
                type: "POST",
                data: param,
                dataType: "json",
                success: function (datas) {
                    if ($.isArray(callback)) {
                        for (var h = 0; h < callback.length; h++) {
                            var cb = callback[h];
                            if ($.isFunction(cb)) {
                                if (!isEmpty(apply)) {
                                    cb.call(apply, datas);
                                } else {
                                    cb(datas);
                                }
                            }
                        }
                    } else if ($.isFunction(callback)) {
                        if (!window.top.isEmpty(apply)) {
                            callback.call(apply, datas);
                        } else {
                            callback(datas);
                        }
                    }
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    if ($.isFunction(errcallback)) {
                        if (!window.top.isEmpty(apply)) {
                            errcallback.call(apply);
                        } else {
                            errcallback.call();
                        }
                    }
                }
            });
        };
    }
    //构造extend方法
    if (!$.isFunction(xUi.extend)) {
        xUi.extend = function (child, parent, opts) {
            var f = new parent(opts);
            child.prototype = $.extend(true, child.prototype, f);
            child.method = $.extend(true, child.method, f.constructor.method);
//            child.prototype.constructor = $.extend(true, child.prototype.constructor, constructor);
            return child;
        }
    }
})(jQuery, window);
//layout
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
})(jQuery, window);
//panel
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
    if (!xUi.cache.panel) {
        xUi.cache.panel = {};
    }
    if ($.isFunction($.fn.xUiPanel)) {
        return
    }
    $.fn.xUiPanel = function (optionkey, val) {
        var ps = $(this);
        var panel;
        $.each(ps, function (i, t) {
            var tt = $(t);
            var key = $.extend(true, {}, optionkey);
            if (tt.data("xui") != undefined) {
                var xuiopt = tt.data("xui");
                $.extend(true, key, xuiopt);
            }
            var panelData = tt.data("panel.xUi");
            if (panelData != undefined) {
                return panelData;
            } else {
                var options = {};
                var panelStyle = xUi.getStyle(tt);
                if (key == undefined) {
                    key = {};
                }
                if (key.style == undefined) {
                    key.style = {}
                }
                if (key.style.panel == undefined) {
                    key.style.panel = {}
                }
                $.extend(true, key.style.panel, panelStyle);
                if (key.title == undefined) {
                    key.title = tt.attr("title");
                }
                var html = tt.children();
                var id = tt.attr("id");
                options.target = tt;
                options.content = html;
                if (key.content != undefined) {
                    options.content = key.content;
                    delete key.content;
                }
                panel = new xUi.content.panel(options, key);
            }
        });
        return panel;
    }
    xUi.skin.panel = {
        panel: "xui-panel",
        panelBorder: "panel-border",
        panelContent: "panel-content",
        panelHead: "panel-head",
        titleIcon: "title-icon",
        panelTitle: "xui-panel-title",
        panelToolbar: "panel-toolbar",
        panelBody: "xui-panel-body",
        panelFoot: "xui-panel-foot",
        panelShadow: "panel-shadow",
        panelBackground: "panel-background",
        panelShadowWarp: "panel-shadow-warp",
        panelShadowMsg: "panel-shadow-msg",
        panelClose: "panel-close",
        opacity: "panel-shadow-opacity",
        closeI: "fa fa-close icon-remove"
//        closeI: "icon-remove"
    };
    xUi.config.panel = {
        head: {
            height: "34px",
            fontSize: "16px",
            titleLeft: "14px",
            iconWidth: "14px",
            title: undefined,
            icon: undefined
        },
        toolBar: {
            height: "34px",
            toolBarBorder: true,
            content: []
        },
        foot: {
            height: "38px",
            footBorder: true,
            content: ""
        },
        power: false,
        shadowMsg: "正在加载,请稍候..."
    };
    //定义可用事件
    xUi.events.panel = {
        createSuccess: function (panel) {

        }
    }
    xUi.content.panel = function (option, config, value) {
        this.config = {
            needHead: true,//是否显示头
            needToolBar: false,//是否显示工具栏
            needFoot: false,//是否显示脚
            isShow: true,//是否立即显示组建
            border: true,//是否显示边框
            width: undefined,
            height: undefined,
            id: undefined,
            toolbar: undefined,
            title: undefined,
            style: {
                panel: {},
                head: {},
                toolbar: {},
                body: {},
                foot: {}
            },
            addClass: {
                panel: [],
                head: [],
                toolbar: [],
                body: [],
                foot: []
            }
        };
        this.panelConfig = {};
        this.content = undefined;
        this.elements = {};
        this.xUiId = undefined;
        this.isShow = false;
        this.target = undefined;
        this.useElement = {
            head: {
                target: undefined
            },
            toolbar: {
                target: undefined
            },
            body: {
                target: undefined
            },
            foot: {
                target: undefined
            }
        };
        this.fromElement = undefined;
        function init(opt, cfg) {
            this.target = opt.target;
            this.content = opt.content;
            if (isEmpty(this.target) && !isEmpty(opt.id)) {
                this.target = $("#" + opt.id);
            }
            var options = {};
            var key = $.extend(true, {}, opt);
            var panelStyle = xUi.getStyle(this.target);
            panelStyle.height = cfg.height;
            panelStyle.width = cfg.width;
            if (key == undefined) {
                key = {};
            }
            if (key.style == undefined) {
                key.style = {}
            }
            if (key.style.panel == undefined) {
                key.style.panel = {}
            }
            $.extend(true, key.style.panel, panelStyle);
            if (key.title == undefined) {
                key.title = this.target.attr("title");
            }
            if (key.id == undefined) {
                key.id = this.target.attr("id");
                this.target.removeAttr("id");
            }
            $.extend(true, key, cfg);
            xUi.method.panel.initConfig.call(this, key);
            xUi.method.panel.initEvents.call(this, key.events);
            xUi.method.panel.initPanel.call(this);
            xUi.method.panel.createPanel.call(this);
        }

        init.call(this, option, config);
        return this;
    };
    xUi.method.panel = {
        initConfig: function (config) {
            this.panelConfig = $.extend(true, {}, xUi.config.panel);
            this.panelConfig = $.extend(true, this.panelConfig, config);
            this.config = $.extend(true, this.config, config);
        },
        initEvents: function (e) {
            if (e) {
                var events = this.events = $.extend(true, {}, xUi.events.panel);
                for (var r in events) {
                    if (e[r] instanceof  Function) {
                        events[r] = e[r];
                    }
                }
            }
        },
        initEnableMethod: function () {
            var panel = this;
            var method = xUi.method.panel;
            var elements = this.elements;
            var enableMethod = {
                show: function () {
                    method.doLayout.call(this);
                    elements.panel.show();
                },
                addToolbar: function (content) {
                    if (!isEmpty(this.useElement.toolbar.target)) {
                        this.useElement.toolbar.target.append(content);
                    }
                },
                addBody: function (content) {
                    this.useElement.body.target.append(content);
                },
                addFooter: function (content) {
                    if (!isEmpty(this.useElement.foot.target)) {
                        this.useElement.foot.target.append(content);
                    }
                },
                replaceBody: function (content) {
                    this.useElement.body.target.empty();
                    this.useElement.body.target.append(content);
                },
                shadowPanel: function (flag, msg) {
                    var panelShadow = this.elements.panelShadow;
                    var panelShadowMsg = this.elements.panelShadowMsg;
                    var skin = xUi.skin.panel;
                    if (flag == true) {
                        if (!isEmpty(msg)) {
                            panelShadowMsg.empty();
                            panelShadowMsg.append($(document.createElement("div")), msg);
                        }
                        if (panelShadow.hasClass(skin.opacity)) {
                            this.elements.panelShadowWarp.show();
                            panelShadow.removeClass(skin.opacity);
                        }
                        panelShadow.show();
                    }
                    if (flag == false) {
                        panelShadow.hide();
                    }
                },
                shadowPanelNoWarp: function (flag) {
                    var panelShadow = this.elements.panelShadow;
                    var panelShadowWarp = this.elements.panelShadowWarp;
                    var skin = xUi.skin.panel;
                    var display = panelShadow.css("display");
                    if (flag == true && display == "none") {
                        this.elements.panelShadowWarp.hide();
                        panelShadow.addClass(skin.opacity);
                        panelShadow.show();
                    }
                    if (flag == false) {
                        display = panelShadowWarp.css("display");
                        if (display == "none") {
                            panelShadowWarp.show();
                            panelShadow.hide();
                        }
                        panelShadow.removeClass(skin.opacity);
                    }
                },
                destroy: function () {
                    delete  xUi.cache.panel[this.xUiId];
                    this.target.removeData("panel.xUi");
                },
                doLayout: function () {
                    var useElement = this.useElement;
                    var elements = this.elements;
                    var panelHead = elements.panelHead;
                    var panelBody = elements.panelBody;
                    var panelToolbar = elements.panelToolbar;
                    var panelFoot = elements.panelFoot;
                    var panelShadow = elements.panelShadow;
                    var bodyTop = 0, bodyBottom = 0;
                    useElement.head.top = panelHead.height() > 0 ? panelHead.outerHeight() : 0;
                    useElement.toolbar.top = panelToolbar.height() > 0 ? panelToolbar.outerHeight() : 0;
                    useElement.foot.top = panelFoot.height() > 0 ? panelFoot.outerHeight() : 0;
                    bodyTop = useElement.head.top + useElement.toolbar.top;
                    bodyBottom = useElement.foot.top;
                    panelToolbar.css("top", useElement.head.top);
                    panelBody.css("top", bodyTop);
                    panelShadow.css("top", useElement.head.top);
                    panelBody.css("bottom", bodyBottom);
                }
            }
            for (var met in enableMethod) {
                if (this[met] == undefined && $.isFunction(enableMethod[met])) {
                    this[met] = $.proxy(enableMethod[met], panel)
                }
            }
        },
        initPanel: function () {
            var config = this.config;
            var skin = xUi.skin.panel;
            var panel = this.elements.panel = $(document.createElement("div"));
            var panelContent = this.elements.panelContent = $(document.createElement("div"));
            var panelHead = this.elements.panelHead = $(document.createElement("div"));
            var titleIcon = this.elements.titleIcon = $(document.createElement("div"));
            var panelTitle = this.elements.panelTitle = $(document.createElement("div"));
            var panelToolbar = this.elements.panelToolbar = $(document.createElement("div"));
            var panelBody = this.elements.panelBody = $(document.createElement("div"));
            var panelFoot = this.elements.panelFoot = $(document.createElement("div"));
            var panelShadow = this.elements.panelShadow = $(document.createElement("div"));
            var panelBackground = this.elements.panelBackground = $(document.createElement("div"));
            var panelShadowWarp = this.elements.panelShadowWarp = $(document.createElement("div"));
            var panelShadowMsg = this.elements.panelShadowMsg = $(document.createElement("div"));
            var panelClose = this.elements.panelClose = $(document.createElement("div"));
            var panelCloseI = this.elements.panelCloseI = $(document.createElement("i"));
            panel.addClass(skin.panel);
            panelContent.addClass(skin.panelContent);
            panelHead.addClass(skin.panelHead);
            titleIcon.addClass(skin.titleIcon);
            panelTitle.addClass(skin.panelTitle);
            panelToolbar.addClass(skin.panelToolbar);
            panelBody.addClass(skin.panelBody);
            panelFoot.addClass(skin.panelFoot);
            panelShadow.addClass(skin.panelShadow);
            panelBackground.addClass(skin.panelBackground);
            panelShadowWarp.addClass(skin.panelShadowWarp);
            panelShadowMsg.addClass(skin.panelShadowMsg);
            panelClose.addClass(skin.panelClose);
            panelCloseI.addClass(skin.closeI);
            if (config.border == true) {
                panel.addClass(skin.panelBorder);
            }
            //addClass
            var panelClas, headClas, toolbarClas, bodyClas, footClas;
            var classEs = this.config.addClass;
            panelClas = classEs.panel;
            $.each(panelClas, function (i, cl) {
                panel.addClass(cl);
            });
            headClas = classEs.head;
            $.each(headClas, function (i, cl) {
                panelHead.addClass(cl);
            });
            toolbarClas = classEs.toolbar;
            $.each(toolbarClas, function (i, cl) {
                panelToolbar.addClass(cl);
            });
            bodyClas = classEs.body;
            $.each(bodyClas, function (i, cl) {
                panelBody.addClass(cl);
            });
            footClas = classEs.foot;
            $.each(footClas, function (i, cl) {
                panelFoot.addClass(cl);
            });

        },
        createPanel: function () {
            var panelConfig = this.panelConfig;
            var config = this.config;
            var method = xUi.method.panel;
            var useElement = this.useElement;
            var elements = this.elements;
            var panel = elements.panel;
            var panelContent = elements.panelContent;
            var panelHead = elements.panelHead;
            var panelBody = elements.panelBody;
            var titleIcon = elements.titleIcon;
            var panelTitle = elements.panelTitle;
            var panelToolbar = elements.panelToolbar;
            var panelFoot = elements.panelFoot;
            var panelShadow = elements.panelShadow;
            var panelBackground = elements.panelBackground;
            var panelShadowWarp = elements.panelShadowWarp;
            var panelShadowMsg = elements.panelShadowMsg;
            var panelClose = elements.panelClose;
            var panelCloseI = elements.panelCloseI;

            if (config.id != undefined) {
                panel.attr("id", config.id);
            }
            if (config.title != undefined) {
                panel.attr("title", config.title);
            }
            panel.data("panel.xUi", this);
            panel.append(panelContent);
//            head
            panelContent.append(panelHead);
            var tempDiv = $(document.createElement("div"));
            panelHead.append(tempDiv);
            tempDiv.append(titleIcon, panelTitle, panelClose);
            panelTitle.html(config.title);
            useElement.head.target = tempDiv;
            if (config.needHead == true) {
//                panelHead.css({
//                    height: panelConfig.head.height
//                });
                panelHead.css(panelConfig.head);
                panelTitle.css({
                    fontSize: panelConfig.head.fontSize,
                    left: panelConfig.head.titleLeft,
                    lineHeight: panelConfig.head.height
                });
                titleIcon.css({
                    width: panelConfig.head.iconWidth
                });
                panelClose.append(panelCloseI);
                panelClose.hide()
                panelHead.show();
            } else {
                panelHead.hide();
            }
//            toolbar
            panelContent.append(panelToolbar);
            var tempDiv = $(document.createElement("div"));
            panelToolbar.append(tempDiv);
            useElement.toolbar.target = tempDiv;
            if (config.toolbar != undefined) {
                tempDiv.append(config.toolbar);
            }
            if (config.needToolBar == true) {
                panelToolbar.css({
                    height: panelConfig.toolBar.height
                });
                panelToolbar.show();
            } else {
                panelToolbar.hide();
            }
            panelContent.append(panelBody);
            var tempDiv = $(document.createElement("div"));
            var tempDivBody = $(document.createElement("div"));
            panelBody.append(tempDiv.append(tempDivBody));
            useElement.body.target = tempDivBody;
            if (this.content != undefined) {
                tempDivBody.append(this.content);
            }
//            foot
            panelContent.append(panelFoot);
            var tempDiv = $(document.createElement("div"));
            panelFoot.append(tempDiv);
            useElement.foot.target = tempDiv;
            if (config.needFoot == true) {
                panelFoot.css({
                    height: panelConfig.foot.height
                });
                panelFoot.show();
            } else {
                panelFoot.hide();
            }
//            shadow
            panelContent.append(panelShadow);
            var tempDiv = $(document.createElement("div"));
            panelShadow.append(tempDiv);
            tempDiv.append(panelBackground, panelShadowWarp);
            panelShadowWarp.append(panelShadowMsg);
            panelShadowMsg.append($(document.createElement("div")), panelConfig.shadowMsg);
            panelShadow.hide();
            panelShadowMsg.on('resizeElement.xUi', function (e, width, height) {
                if (width > 1) {
                    panelShadowWarp.css("width", panelShadowMsg.outerWidth());
                }
                e.stopPropagation();
                return false;
            });

            method.initStyle.call(this);
            if (config.isShow == false) {
                panel.hide();
            } else {
                method.doLayout.call(this);
                this.isShow = true;
            }
//            method.initStyle.call(this);
            method.initEnableMethod.call(this);
            //在panelCache中存储他
            this.xUiId = Math.uuid();
            xUi.cache.panel[this.xUiId] = this;
            if (!isEmpty(this.events) && $.isFunction(this.events.createSuccess)) {
                this.events.createSuccess.call(this);
            }
        },
        initStyle: function () {
            var config = this.config;
            var useElement = this.useElement;
            var elements = this.elements;
            var styles = config.style;
            var panel = elements.panel;
            var head = elements.panelHead;
            var panelTitle = elements.panelTitle;
            var toolBar = this.elements.panelToolbar;
            var body = useElement.body.target;
            var foot = useElement.foot.target;
            if (!$.isEmptyObject(styles.panel)) {
                panel.css(styles.panel);
            }
            if (!$.isEmptyObject(styles.head) && config.needHead == true) {
                head.css(styles.head);
                if (styles.head.height != undefined) {
                    panelTitle.css("lineHeight", styles.head.height);
                }
            }
            if (!$.isEmptyObject(styles.toolbar) && config.needToolBar == true) {
                toolBar.css(styles.toolbar);
            }
            if (!$.isEmptyObject(styles.body)) {
                body.css(styles.body);
                var left = body.css("paddingLeft");
                var right = body.css("paddingRight");
                var top = body.css("paddingTop");
                var bottom = body.css("paddingBottom");
                if (parseInt(left) > 0) {
                    body.css({
                        left: parseInt(left)
                    });
                } else {
                    body.css({
                        left: 0
                    });
                }
                if (parseInt(right) > 0) {
                    body.css({
                        right: parseInt(right)
//                        right: parseInt(right) + 2
                    });
                } else {
                    body.css({
                        right: 0
                    });
                }
                if (parseInt(top) > 0) {
                    body.css({
                        top: parseInt(top)
                    });
                } else {
                    body.css({
                        top: 0
                    });
                }
                if (parseInt(bottom) > 0) {
                    body.css({
                        bottom: parseInt(bottom)
//                        bottom: parseInt(bottom) + 2
                    });
                } else {
                    body.css({
                        bottom: 0
                    });
                }
                body.css("padding", "");
            }
            if (!$.isEmptyObject(styles.foot) && config.needFoot == true) {
                elements.panelFoot.css(styles.foot);
//                foot.css(styles.foot);
//                elements.panelFoot.css("height", styles.foot.height);
            }
        },
        doLayout: function () {
            var useElement = this.useElement;
            var elements = this.elements;
            var panelHead = elements.panelHead;
            var panelBody = elements.panelBody;
            var panelToolbar = elements.panelToolbar;
            var panelFoot = elements.panelFoot;
            var panel = elements.panel;
            var panelShadow = elements.panelShadow;
            var bodyTop = 0, bodyBottom = 0;
//            TODO
            this.target.before(panel);
            this.target.hide();
//            this.target.replaceWith(panel);
            if (!isEmpty(panelHead) && panelHead.css("display") != "none") {
                useElement.head.top = panelHead.height() > 0 ? panelHead.outerHeight() : 0;
            } else {
                useElement.head.top = 0;
            }
            if (!isEmpty(panelToolbar) && panelToolbar.css("display") != "none") {
                useElement.toolbar.top = panelToolbar.height() > 0 ? panelToolbar.outerHeight() : 0;
            } else {
                useElement.toolbar.top = 0;
            }
            if (!isEmpty(panelFoot) && panelFoot.css("display") != "none") {
                useElement.foot.top = panelFoot.height() > 0 ? panelFoot.outerHeight() : 0;
            } else {
                useElement.foot.top = 0;
            }
            bodyTop = useElement.head.top + useElement.toolbar.top;
            bodyBottom = useElement.foot.top;
            panelToolbar.css("top", useElement.head.top);
            panelBody.css("top", bodyTop);
            panelShadow.css("top", useElement.head.top);
            panelBody.css("bottom", bodyBottom);
            if (this.config.power == true) {
                var style = this.elements.panel.attr("style");
                this.elements.panel.attr("style", style);
            }
        }
    };
    //自动初始化
    $(document).ready(function () {
        $(".xui-panel").each(function (i, v) {
            var tabData = $(this).data("panel.xUi");
            if (!isEmpty(tabData)) {
                return tabData;
            } else {
                var option = xUi.getXUIOPT($(this).data(XUIOPT));
                $(this).xUiPanel(option);
            }
        });
    })
})(jQuery, window);
//tabs
(function ($, win) {
    if (!win.xUi || $.isEmptyObject(win.xUi)) {
        xUi = {
            content: {}, config: {}, events: {},
            skin: {}, method: {}, cache: {}, space: undefined
        };
    }
    if ($.isFunction($.fn.xUiTab)) {
        return;
    }
    $.fn.xUiTab = function (optionkey, val) {
        var obj = {};
        var key = {};
        var tabData = $(this).data("tab.xUi");
        if (!isEmpty(tabData)) {
            return tabData;
        } else {
            if (!isEmpty(optionkey)) {
                $.extend(true, key, optionkey);
            }
            obj.target = $(this);
            var tab = new xUi.content.tab(obj, key);
            return tab;
        }
    }
    xUi.skin.tab = {
        tabUl: "xui-tabUl",
        ulTop: "ul-top",
        ulBottom: "ul-bottom",
        ulLeft: "ul-left",
        ulRight: "ul-right",
        cDiv: "tab-div",
        leftBtn: "ul-tab-btn-left",
        btnBottom: "btn-bottom",
        btnRight: "btn-right",
        leftLi: "icon-arrow-left",
        rightBtn: "ul-tab-btn-right",
        rightLi: "icon-arrow-right",
        topBtn: "ul-tab-btn-top",
        topLi: "icon-arrow-up",
        bottomBtn: "ul-tab-btn-bottom",
        bottomLi: "icon-arrow-down"
    };
    xUi.config.tab = {};
    xUi.content.tab = function (option, config, value) {
        this.config = {
            position: "top"//默认是上有left,right,bottom
        };
        this.elements = {};
        this.xUiId = undefined;
        this.isShow = true;
        this.target = undefined;
        this.useElement = {
            ul: undefined,
            lis: [],
            active: undefined,
            div: []
        };
        this.fromElement = undefined;
        function init(opt, cfg) {
            this.target = opt.target;
            xUi.method.tab.initConfig.call(this, cfg);
            xUi.method.tab.initTab.call(this);
        }

        init.call(this, option, config);
    };
    xUi.method.tab = {
        initConfig: function (config) {
            this.config = $.extend(true, this.config, config);
        },
        initEnableMethod: function () {
            var panel = this;
            var method = xUi.method.tab;
            var elements = this.elements;
            var enableMethod = {
                show: function () {
                    method.doLayout.call(this);
                    elements.tab.show();
                }
            }
            for (var met in enableMethod) {
                if (this[met] == undefined && $.isFunction(enableMethod[met])) {
                    this[met] = $.proxy(enableMethod[met], panel)
                }
            }
        },
        initLi: function () {
            var target = this.target;
            var usE = this.useElement;
            var lis = this.useElement.lis = target.children("li");
            var cDivTemp = this.elements.cDivTemp;
            var tablUl = this.elements.tablUl;
            var flag = 0;
            for (var i = 0; i < lis.length; i++) {
                var li = $(lis[i]);
                tablUl.append(li);
                if ($(this).hasClass("active")) {
                    usE.active = $(this);
                    cDivTemp.children().hide();
                    $(li).data("xui.target").fadeIn();
                    flag++;
                }
                var a = li.find("a").first();
                var href = a.attr("href");
                a.attr("href", "javascript:void(0)")
                var div = {
                    id: href,
                    target: $(href)
                }
                $(href).hide();
                cDivTemp.append($(href));
                li.data("xui.target", $(href));
                li.bind("click", function () {
                    if (!$(this).hasClass("active")) {
                        lis.removeClass("active");
                        $(this).addClass("active");
                        cDivTemp.children().hide();
                        $(this).data("xui.target").fadeIn();
                        usE.active = $(this);
                    }
                });
            }
            if (flag == 0) {
                var li = $(this.useElement.lis[0])
                li.addClass("active");
                usE.active = li;
                cDivTemp.children().hide();
                li.data("xui.target").show();
            }
        },
        initTopBottomBtn: function (pos) {
            var skin = xUi.skin.tab;
            var panel = this.xUiPanel;
            var topBtn = this.elements.topBtn = $(document.createElement("div"));
            var topBtnLi = $(document.createElement("li"));
            topBtnLi.addClass(skin.topLi);
            var bottomBtn = this.elements.bottomBtn = $(document.createElement("div"));
            var bottomBtnLi = $(document.createElement("li"));
            bottomBtnLi.addClass(skin.bottomLi);
            topBtn.append(topBtnLi);
            bottomBtn.append(bottomBtnLi);
            var tablUl = this.elements.tablUl;
            topBtn.addClass(skin.topBtn);
            bottomBtn.addClass(skin.bottomBtn);
            //渲染CSS
            topBtn.css({
                width: tablUl.width()
            })
            bottomBtn.css({
                width: tablUl.width()
            })
            if (pos == "right") {
                topBtn.addClass(skin.btnRight);
                bottomBtn.addClass(skin.btnRight);
            }
            topBtn.hide();
            bottomBtn.hide();
            topBtn.attr("onselectstart", "return false");
            bottomBtn.attr("onselectstart", "return false");
            panel.addBody(topBtn);
            panel.addBody(bottomBtn);
            var body = panel.useElement.body.target;
            //绑定事件
            var topTime = null;
            var bottomTime = null;
            topBtn.on("mousedown", function (e) {
                clearInterval(bottomTime);
                bottomTime = null;
                var cz = tablUl.height() - body.innerHeight() - 1;
                if (topTime == null) {
                    topTime = setInterval(function () {
                        var top = tablUl.position().top;
                        if (top < topBtn.innerHeight() - 1) {
                            tablUl.css("top", (top + 1));
                        }
                    }, 3)
                }
            });
            bottomBtn.on("mousedown", function (e) {
                clearInterval(topTime);
                topTime = null;
                var cz = tablUl.height() - body.innerHeight() - 1;
                if (bottomTime == null) {
                    bottomTime = setInterval(function () {
                        var top = tablUl.position().top;
                        if (cz > 0 && cz > ( Math.abs(top) - bottomBtn.innerHeight())) {
                            tablUl.css("top", (top - 1));
                        }
                    }, 3)
                }
            });
            topBtn.on("mouseup", function (e) {
                clearInterval(topTime);
                topTime = null;
            });
            bottomBtn.on("mouseup", function (e) {
                clearInterval(bottomTime);
                bottomTime = null;
            });
            //绑定监听
            if (tablUl.height() > body.innerHeight() - 1) {
                topBtn.show();
                bottomBtn.show();
                tablUl.css("top", topBtn.innerHeight() - 1);
            } else {
                tablUl.css("top", 0);
                topBtn.hide();
                bottomBtn.hide();
            }
            tablUl.on("resizeElement.xUi", function (e, width, height) {
                if (height > body.innerHeight() - 1) {
                    topBtn.show();
                    bottomBtn.show();
                    tablUl.css("top", topBtn.innerHeight() - 1);
                } else {
                    topBtn.hide();
                    bottomBtn.hide();
                    tablUl.css("top", 0);
                }
            });
        },
        initLeftRightBtn: function (pos) {
            var skin = xUi.skin.tab;
            var panel = this.xUiPanel;
            var leftBtn = this.elements.leftBtn = $(document.createElement("div"));
            var leftBtnLi = $(document.createElement("li"));
            leftBtnLi.addClass(skin.leftLi);
            var rightBtn = this.elements.rightBtn = $(document.createElement("div"));
            var rightBtnLi = $(document.createElement("li"));
            rightBtnLi.addClass(skin.rightLi);
            leftBtn.append(leftBtnLi);
            rightBtn.append(rightBtnLi);
            var tablUl = this.elements.tablUl;
            if (pos == "bottom") {
                leftBtn.addClass(skin.btnBottom);
                rightBtn.addClass(skin.btnBottom);
            }
            leftBtn.addClass(skin.leftBtn);
            rightBtn.addClass(skin.rightBtn);
            //渲染CSS
            leftBtn.css({
                height: tablUl.height(),
                lineHeight: (tablUl.height() - 4) + "px"
            })
            rightBtn.css({
                height: tablUl.height(),
                lineHeight: (tablUl.height() - 4) + "px"
            })
            leftBtn.hide();
            rightBtn.hide();
            leftBtn.attr("onselectstart", "return false");
            rightBtn.attr("onselectstart", "return false");
            panel.addBody(leftBtn);
            panel.addBody(rightBtn);
            var body = panel.useElement.body.target;
            //绑定事件
            var leftTime = null;
            var rightTime = null;
            leftBtn.on("mousedown", function (e) {
                clearInterval(rightTime);
                rightTime = null;
                var cz = tablUl.width() - body.innerWidth();
                if (leftTime == null) {
                    leftTime = setInterval(function () {
                        var left = tablUl.position().left;
                        if (left < leftBtn.outerWidth()) {
                            tablUl.css("left", (left + 1));
                        }
                    }, 3)
                }
            });
            rightBtn.on("mousedown", function (e) {
                clearInterval(leftTime);
                leftTime = null;
                var cz = tablUl.width() - body.innerWidth();
                if (rightTime == null) {
                    rightTime = setInterval(function () {
                        var left = tablUl.position().left;
                        if (cz > 0 && cz > ( Math.abs(left) - rightBtn.outerWidth())) {
                            tablUl.css("left", (left - 1));
                        }
                    }, 3)
                }
            });
            leftBtn.on("mouseup", function (e) {
                clearInterval(leftTime);
                leftTime = null;
            });
            rightBtn.on("mouseup", function (e) {
                clearInterval(rightTime);
                rightTime = null;
            });
            //绑定监听
            if (tablUl.width() > body.innerWidth()) {
                leftBtn.show();
                rightBtn.show();
                tablUl.css("left", leftBtn.outerWidth());
            } else {
                tablUl.css("left", 0);
                leftBtn.hide();
                rightBtn.hide();
            }
            tablUl.on("resizeElement.xUi", function (e, width, height) {
                if (width > body.innerWidth()) {
                    leftBtn.show();
                    rightBtn.show();
                    tablUl.css("left", leftBtn.outerWidth());
                } else {
                    leftBtn.hide();
                    rightBtn.hide();
                    tablUl.css("left", 0);
                }
            });
        },
        initTab: function () {
            var skin = xUi.skin.tab;
            var method = xUi.method.tab;
            var tab = this;
            var panel = new xUi.content.panel({target: this.target},
                {
                    needHead: false,
                    needFoot: false,
                    style: {
                        body: {
                            padding: 0
                        }
                    }
                });
            this.xUiPanel = panel;
            this.target = panel.target;
            this.constructor.prototype = $.extend(true, this.constructor.prototype, panel);
            //如果没有元素就创建元素
            if (isEmpty(this.useElement.ul)) {
                var tablUl = this.elements.tablUl = $(document.createElement("ul"));
                tablUl.addClass(skin.tabUl);
                panel.addBody(tablUl);
            }
            var cDiv = this.elements.cDiv = $(document.createElement("div"));
            var cDivTemp = this.elements.cDivTemp = $(document.createElement("div"));
            cDiv.addClass(skin.cDiv);
            cDiv.append(cDivTemp);
            panel.addBody(cDiv);

            panel.elements.panel.data("tab.xUi", this);

            method.initLi.call(this);
            method.doLayout.call(this);
            method.initEnableMethod.call(this);
        },
        doLayout: function () {
            var skin = xUi.skin.tab;
            var method = xUi.method.tab;
            var tablUl = this.elements.tablUl;
            var cDiv = this.elements.cDiv;
            var config = this.config;
            switch (config.position) {
                case "top":
                    tablUl.addClass(skin.ulTop);
                    var top = (tablUl.height() > 0 ? tablUl.outerHeight() : 0);
                    cDiv.css("top", top);
                    method.initLeftRightBtn.call(this, "top");
                    break;
                case "left":
                    tablUl.addClass(skin.ulLeft);
                    var left = (tablUl.width() > 0 ? tablUl.outerWidth() : 0);
                    cDiv.css("left", left);
                    method.initTopBottomBtn.call(this);
                    break;
                case "right":
                    tablUl.addClass(skin.ulRight);
                    var right = (tablUl.width() > 0 ? tablUl.outerWidth() : 0);
                    cDiv.css("right", right);
                    method.initTopBottomBtn.call(this, "right");
                    break;
                case "bottom":
                    tablUl.addClass(skin.ulBottom);
                    var bottom = (tablUl.height() > 0 ? tablUl.outerHeight() : 0);
                    cDiv.css("bottom", bottom);
                    method.initLeftRightBtn.call(this, "bottom");
                    break;
                default :
                    tablUl.addClass(skin.ulTop);
                    var top = (cDiv.height() > 0 ? tablUl.outerHeight() : 0);
                    cDiv.css("top", top);
                    method.initLeftRightBtn.call(this, "top");
                    break;
            }

        }
    };
    //自动初始化
    $(document).ready(function () {
        $(".xui-tabs-top").each(function (i, v) {
            var tabData = $(this).data("tab.xUi");
            if (!isEmpty(tabData)) {
                return tabData;
            } else {
                var tab = $(this).xUiTab({
                    position: "top"
                });
                return tab;
            }
        });
        $(".xui-tabs-left").each(function (i, v) {
            var tabData = $(this).data("tab.xUi");
            if (!isEmpty(tabData)) {
                return tabData;
            } else {
                var tab = $(this).xUiTab({
                    position: "left"
                });
                return tab;
            }
        });
        $(".xui-tabs-right").each(function (i, v) {
            var tabData = $(this).data("tab.xUi");
            if (!isEmpty(tabData)) {
                return tabData;
            } else {
                var tab = $(this).xUiTab({
                    position: "right"
                });
                return tab;
            }
        });
        $(".xui-tabs-bottom").each(function (i, v) {
            var tabData = $(this).data("tab.xUi");
            if (!isEmpty(tabData)) {
                return tabData;
            } else {
                var tab = $(this).xUiTab({
                    position: "bottom"
                });
                return tab;
            }
        });
    })
})(jQuery, window);
//select
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
    if ($.isFunction($.fn.xUiCombSelect)) {
        return;
    }
    $.fn.xUiCombSelect = function (key, opt) {
        var select = $(this);
        if (select.length < 1) {
            return;
        }
        var sdata = select.data("xUi.content.comboSelect");
        if (!isEmpty(sdata)) {
            return sdata;
        }
        var id = $(this).attr("id");
        var name = $(this).attr("name");
        if (isEmpty(id)) {
            id = Math.uuid();
        }
        if (isEmpty(key)) {
            key = {};
        }
        key.id = id;
        if (isEmpty(key.height)) {
            key.height = (select.outerHeight() <= 1 ? 25 : select.outerHeight());
        }
        if (isEmpty(key.width)) {
            key.width = (select.outerWidth() <= 1 ? 65 : select.outerWidth());
        }
        if (!isEmpty(select.attr("style"))) {
            key.style = select.attr("style");
        }
        if (!isEmpty(name)) {
            key.name = name;
            select.removeAttr("name");
        }
        key.target = select;
        select.hide();
        select.removeAttr("id");
        return new xUi.content.comboSelect(key);
    }
    xUi.content.comboSelect = function (opt, key) {
        this.elements = {
            target: undefined,
            span: undefined,
            comboFloatDiv: undefined,
            input: undefined,
            inputDiv: undefined,
            ul: undefined,
            ulDiv: undefined
        };
        this.config = {};
        this.dataSource = {
            fromData: [],
            initData: [],
            selected: undefined
        }
        function initUrl(opt, callback) {
            var this_ = this;
            var target = opt.target;
            var cb = function (data) {
                var tempData;
                if ($.isFunction(opt.events.loadFilter)) {
                    tempData = opt.events.loadFilter.call(this_, data);
                } else {
                    tempData = data;
                }
                $.each(tempData, function (i, v) {
                    var field = v.field;
                    var value = v.value;
                    var temp = $("<option value='" + value + "'>" + field + "</option>");
                    target.append(temp);
                });
                callback.call(this_, opt);
            }
            xUi.loadAjax(opt.url, opt.param, cb);
        }

        function init(opt) {
            if (!isEmpty(opt.url)) {
                initUrl.call(this, opt, xUi.method.comboSelect.createComboSelect);
            } else {
                xUi.method.comboSelect.createComboSelect.call(this, opt);
            }
        }

        init.call(this, opt);
    }
    //列配置
    xUi.config.comboSelect = {
        id: undefined,
        name: undefined,
        zIndex: 1,
        fontSize: "13px",
        target: undefined,
        width: 25,
        height: 50,
        isEditor: false,
        needSearch: false,
        searchHandle: function (li, str) {
            var html = $(li).html();
            if (html != str) {
                return false;
            } else {
                return true;
            }
        },
        needEmpty: true,
        emptyOption: {
            name: "请选择",
            selected: true,
            value: false
        },
        events: {},
        datas: [],
        style: undefined,
        minHeight: "150px",
        minWidth: "60px"
    }
    //定义可用事件
    xUi.events.comboSelect = {
        loadFilter: function (data) {
            return data;
        },
        onSelect: function () {
        }
    }
    //添加需要的皮肤class
    xUi.skin.comboSelect = {
        comboSelect: "combo-select",
        comboDiv: "combo-select-comboDiv",
        comboTable: "combo-select-comboTable",
        comboDivIvSpan: "combo-select-comboDiv-ivSpan",
        mouseDow: "combo-select-mouseDown",
        comboDivTbSpan: "combo-select-comboDiv-TbSpan",
        comboFloatDiv: "combo-select-comboDiv-float",
        floatInputDiv: "combo-select-float-inputDiv",
        floatInput: "combo-select-float-input",
        floatFlowDiv: "combo-select-float-flowDiv",
        flowUl: "combo-select-flowUl",
        select: "combo-select-select"
    };
    //定义可用方法
    xUi.method.comboSelect = {
        initConfig: function (cfg) {
            var config = $.extend(true, {}, xUi.config.comboSelect);
            this.config = $.extend(true, config, cfg);
        },
        initEnableMethod: function () {
            var this_ = this;
            var method = xUi.method.comboSelect;
            var elements = this.elements;
            var enableMethod = {
                getValue: function () {
                    return this.dataSource.selected.value;
                },
                setValue: function (val) {
                    var count = 0;
                    var elements = this.elements;
                    var el = undefined;
                    var ul = elements.ul;
                    ul.find("li").each(function (i, li) {
                        var data = $(this).data("xUi.content.comboSelect");
                        if (data.value == val) {
                            count++;
                            el = $(this);
                            return false;
                        }
                    });
                    if (count > 0) {
                        el.trigger("click");
                    }
                },
                reSet: function () {
                    this.setValue(this.dataSource.fromData[0].value);
                },
                reload: function () {
                    xUi.method.comboSelect.reload.call(this);
                },
                hide: function () {
                    var skin = xUi.skin.comboSelect;
                    var elements = this.elements;
                    var comboFloatDiv = elements.comboFloatDiv;
                    var target = elements.target;
                    target.removeClass(skin.mouseDow);
                    comboFloatDiv.hide();
                }
            }
            for (var met in enableMethod) {
                if (this[met] == undefined && $.isFunction(enableMethod[met])) {
                    this[met] = $.proxy(enableMethod[met], this_)
                }
            }
        },
        initSpace: function () {
            if ($("div.xuiSpace__").length == 0) {
                xUi.space = $(document.createElement("div"));
                xUi.space.addClass("xuiSpace__");
                $("body").append(xUi.space);
            }
        },
        initSelect: function () {
            var skin = xUi.skin.comboSelect;
            var body = xUi.space;
            var elements = this.elements;
            var target = elements.target = $("<div></div>");
            var span = elements.span = $("<input>");
            var comboFloatDiv = elements.comboFloatDiv = $("<div></div>");
            var comboDiv = elements.comboDiv = $("<div></div>");
            var inputDiv = elements.inputDiv = $("<div></div>");
            var floatInput = elements.input = $("<input>");
            var ulDiv = elements.ulDiv = $("<div></div>");
            var ul = elements.ul = $("<ul></ul>");

            var comboTable = $("<table></table>");
            var comboTbody = $("<tbody></tbody>");
            var comboTr = $("<tr></tr>");
            var tempTd1 = $("<td style='vertical-align: middle'></td>");
            var tempTd2 = $("<td style='width: 8px;padding: 0px 0px 3px 0px;vertical-align: middle'></td>");
            var tempSpan = elements.tempSpan = $("<span></span>");

            comboDiv.append(comboTable.append(comboTbody));
            tempTd1.append(span);
            tempTd2.append(tempSpan);
            comboTbody.append(comboTr.append(tempTd1, tempTd2));
            inputDiv.append(floatInput);
            ulDiv.append(ul);
            comboFloatDiv.append(inputDiv, ulDiv);
            target.append(comboDiv);
            body.append(comboFloatDiv);

            target.addClass(skin.comboSelect);
            comboTable.addClass(skin.comboTable);
            comboDiv.addClass(skin.comboDiv);
            span.addClass(skin.comboDivIvSpan);
            tempSpan.addClass(skin.comboDivTbSpan);
            comboFloatDiv.addClass(skin.comboFloatDiv);
            inputDiv.addClass(skin.floatInputDiv);
            floatInput.addClass(skin.floatInput);
            ulDiv.addClass(skin.floatFlowDiv);
            ul.addClass(skin.flowUl);
            ulDiv.data("xui.comboSelect", this);


            var cls = this.config.target.attr("class");
            if (!isEmpty(cls)) {
                var clsarr = cls.split(" ");
                $.each(clsarr, function (i, s) {
                    target.addClass(s);
                })
            }
            if (this.config.needEmpty == true) {
                var so = this.config.target[0].selectedOptions;
                if (!isEmpty(so)) {
                    var sd = so[0].getAttribute("selected");
                    var emptyOpt = $(document.createElement("option"));
                    emptyOpt.html(this.config.emptyOption.name);
                    emptyOpt.val(this.config.emptyOption.value);
                    this.config.target.prepend(emptyOpt);
                    if (isEmpty(sd)) {
                        emptyOpt.attr("selected", "selected");
                    }
                } else {
                    var emptyOpt = $(document.createElement("option"));
                    emptyOpt.html(this.config.emptyOption.name);
                    emptyOpt.val(this.config.emptyOption.value);
                    this.config.target.prepend(emptyOpt);
                }
//                var li = $("<li></li>");
//                this.config.emptyOption.element = li;
//                li.html( this.config.emptyOption.name);
//                li.val( this.config.emptyOption.value);
//                li.data("xUi.content.comboSelect", config.emptyOption);
//                ul.append(li);
//                span.val(config.emptyOption.name);
//                target.val(config.emptyOption.value);
            }
        },
        initData: function () {
            var comboSelect = this;
            var config = this.config;
            var dataSource = this.dataSource;
            var fromData = dataSource.fromData = [];
            var initData = dataSource.initData = [];
            dataSource.selected = {};
            initData = config.datas;
            if (!isEmpty(config.target)) {
                var childrens = config.target.children();
                $.each(childrens, function (i, option) {
                    var st = $(option).attr("selected");
                    var opt = {
                        name: $(option).html(),
                        value: $(option).val(),
                        element: undefined,
                        target: $(option)
                    }
                    if (!isEmpty(st)) {
                        dataSource.selected = opt
                    } else {
                        opt.selected = false;
                    }
                    fromData.push(opt);
                });
            }
            $.each(initData, function (i, data) {
                var selected = data.selected;
                if (!isEmpty(selected)) {
                    dataSource.selected = data
                } else {
                    data.selected = false;
                }
            });
        },
        initEvents: function (e) {
            if (e) {
                var events = this.events = $.extend(true, {}, xUi.events.comboSelect);
                for (var r in events) {
                    if (e[r] instanceof  Function) {
                        events[r] = e[r];
                    }
                }
            }
        },
        load: function () {
            var method = xUi.method.comboSelect;
            var skin = xUi.skin.comboSelect;
            var config = this.config;
            var elements = this.elements;
            var ul = elements.ul;
            var target = elements.target;
            var dataSource = this.dataSource;
            var fromData = dataSource.fromData;
            var initData = dataSource.initData;
            var span = elements.span;
            span.css("fontSize", config.fontSize);
            ul.children().each(function (i, v) {
                $(this).remove();
            })
            $.each(fromData, function (i, data) {
                var li = $("<li></li>");
                data.element = li;
                li.html(data.name);
                li.val(data.value);
                li.data("xUi.content.comboSelect", data);
                ul.append(li);
            });
            if (config.needEmpty == false && isEmpty(dataSource.selected)) {
                var temp = {};
                if (initData.length > 0) {
                    temp = initData[0];
                }
                if (fromData.length > 0) {
                    temp = fromData[0];
                }
            }
            $.each(initData, function (i, edata) {
                var li = $("<li></li>");
                edata.element = li;
                li.html(edata.name);
                li.val(edata.value);
                li.data("xUi.content.comboSelect", edata);
                ul.append(li);
            });
            span.val(dataSource.selected.name);
            target.val(dataSource.selected.value);
            if (!isEmpty(dataSource.selected)) {
                dataSource.selected.element.addClass(skin.select);
            }
        },
        reload: function () {
            var method = xUi.method.comboSelect;
            method.initData.call(this);
            method.load.call(this);
        },
        createComboSelect: function (cfg) {
            var method = xUi.method.comboSelect;
            method.initConfig.call(this, cfg);
            method.initSpace.call(this);
            method.initEvents.call(this, cfg.events);
            method.initSelect.call(this);
            method.initData.call(this);
            var elements = this.elements;
            var target = elements.target;
            var config = this.config;
            var id = config.id;
            target.attr("id", id);
            if (!isEmpty(config.name)) {
                target.attr("name", config.name);
            }
            method.load.call(this);
            config.target.before(target);
            target.data("xUi.content.comboSelect", this);
            method.doLayout.call(this);
            method.bindEvent.call(this);
            method.initEnableMethod.call(this);
        },
        bindEvent: function () {
            var select = this;
            var skin = xUi.skin.comboSelect;
            var config = this.config;
            var elements = this.elements;
            var comboFloatDiv = elements.comboFloatDiv;
            var dataSource = this.dataSource;
            var inputDiv = elements.inputDiv;
            var comboDiv = elements.comboDiv;
            var ulDiv = elements.ulDiv;
            var target = elements.target;
            var floatInput = elements.input;
            var ul = elements.ul;
            var span = elements.span;
            var tempSpan = elements.tempSpan;
            target.bind("click", function (e) {
                if (e.target != floatInput[0]) {
                    comboFloatDiv.hide();
                    comboFloatDiv.css({
                        top: 0,
                        left: 0
                    });
                    if (target.hasClass(skin.mouseDow)) {
                        target.removeClass(skin.mouseDow);
                        floatInput.val("");
                        ul.find("li").show();
                        e.stopPropagation();
                        return false;
                    } else {
                        target.addClass(skin.mouseDow);
                        comboFloatDiv.show();
                    }
                    var offset = target.offset();
//                    var bodyLeft = parseInt($("body").css("marginLeft"));
//                    var bodyTop = parseInt($("body").css("marginTop"));
                    var cfdPostion = comboFloatDiv.position();
                    var bodyLeft = cfdPostion.left;
                    var bodyTop = cfdPostion.top;
                    var top, left;
                    left = offset.left - bodyLeft;
                    top = offset.top - bodyTop;
                    //兼容性
                    var wh = win.innerHeight;
                    if (typeof (wh) != "number" || Number(wh) < 1) {
                        wh = $(document).height();
                    }
                    if (wh - top - comboFloatDiv.outerHeight() - target.outerHeight() - 10 > 0) {
                        top = top + target.outerHeight() + 2;
                        ulDiv.before(inputDiv);
                    } else {
                        top = top - ( comboFloatDiv.outerHeight() + 2);
                        ulDiv.after(inputDiv);
                    }
                    comboFloatDiv.css({
                        top: top,
                        left: left,
                        width: target.width()
                    });
                    if (inputDiv.css("display") != "none") {
                        ulDiv.css({
                            height: comboFloatDiv.innerHeight() - inputDiv.outerHeight()
                        });
                    }
                    if ($.browser.msie == true && $.browser.version.indexOf("8") != -1 && floatInput.length > 0) {
                        var ww = inputDiv.width();
                        ww -= parseInt(floatInput.css("paddingLeft"));
                        ww -= parseInt(floatInput.css("paddingRight"));
                        ww -= parseInt(floatInput.css("borderLeftWidth"));
                        ww -= parseInt(floatInput.css("borderRightWidth"));
                        floatInput.css("width", ww);
                        floatInput.css("height", 13);
                    }
                    if (floatInput.length > 0) {
                        $.each(ul.find("li"), function (i, li) {
                            if ($(li).hasClass(skin.select)) {
                                ulDiv.scrollTop((i - 1) * $(li).outerHeight());
                            }
                        })
                    }
//                    span.focus();
                    floatInput.focus();
                }
                e.stopPropagation();
                return false;
            });
            ul.delegate("li", "click", function (e) {
                var data = $(this).data("xUi.content.comboSelect");
                dataSource.selected.element.removeClass(skin.select);
                $(this).addClass(skin.select);
                target.val(data.value);
                span.val(data.name);
                if (target.hasClass(skin.mouseDow)) {
                    target.trigger("click");
                }
                dataSource.selected = data;
                if (select.events && select.events.onSelect instanceof  Function) {
                    select.events.onSelect.call($(this), data.name, data.value, data);
                }
                span.data("select.beforeValue", data.value);
                e.stopPropagation();
                return false;
            });
            if (config.isEditor == true) {
                tempSpan.hide();
                span.keyup(function (e, b, c) {
                    if (event.keyCode == 13) {
                        e.stopPropagation();
                        return false;
                    }
                    var str = $(this).val();
                    ul.find("li").each(function (i, li) {
                        var html = $(li).html();
                        if (html.indexOf(str) == -1) {
                            $(li).hide();
                        } else {
                            $(li).show();
                        }
                    });
                });
            } else {
                span.attr("readonly", "readonly");
            }
            floatInput.keyup(function (e, b, c) {
                if (e.keyCode == 13) {
                    e.stopPropagation();
                    return false;
                }
                var str = $(this).val();
                if (str == "") {
                    ul.find("li").each(function (i, li) {
                        $(li).show();
                    });
                } else {
                    ul.find("li").each(function (i, li) {
                        var flag = config.searchHandle.call(this, li, str);
                        if (flag == true) {
                            $(li).show();
                        } else {
                            $(li).hide();
                        }
                    });
                }
            });
            $(document).mousedown(function (e) {
                var cs = $(e.target).parents("div.combo-select");
                var data = cs.data("xUi.content.comboSelect");
                if (isEmpty(data)) {
                    data = $(e.target).data("xui.comboSelect");
                }
                if (data != undefined) {
                    var target = data.elements.target;
                    var tar = data.elements.comboFloatDiv;
                    var md = $("div." + skin.mouseDow);
                    $.each(md, function (i, mm) {
                        if (mm != target[0]) {
                            md.trigger("click");
                        }
                    })
                    if (cs.length > 0 && tar.length == 0 && target.hasClass(skin.mouseDow)) {
                        target.trigger("click");
                    }
                } else {
                    var data = $(e.target).parents(".combo-select-float-flowDiv").data("xui.comboSelect");
                    var md = $("div." + skin.mouseDow);
                    if (!isEmpty(data)) {
                        var tt = data.elements.target;
                        $.each(md, function (i, mm) {
                            if (mm != tt[0]) {
                                md.trigger("click");
                            }
                        })
                    } else {
                        if (md.length > 0) {
                            md.trigger("click");
                        }
                    }
                }
//                e.stopPropagation();
//                return false;
            });
            $(window).resize(function () {
                if (target.hasClass(skin.mouseDow)) {
                    target.trigger("click");
                }
            });

        },
        doLayout: function () {
            var config = this.config;
            var elements = this.elements;
            var comboFloatDiv = elements.comboFloatDiv;
            var inputDiv = elements.inputDiv;
            var ulDiv = elements.ulDiv;
            var target = elements.target;
            target.css({
                zIndex: config.zIndex,
                height: config.height,
                width: config.width
            });
            comboFloatDiv.css({
                zIndex: config.zIndex + 1,
                height: config.height,
                width: config.width,
                top: 0,
                left: 0,
                minHeight: config.minHeight,
                minWidth: config.minWidth
            });
            if (config.needSearch != true) {
                inputDiv.hide();
                inputDiv.empty();
                ulDiv.css("height", comboFloatDiv.innerHeight() - inputDiv.height());
            } else {
                ulDiv.css("height", comboFloatDiv.innerHeight() - inputDiv.outerHeight());
            }
            comboFloatDiv.css("opacity", 1);
            comboFloatDiv.css("filter", "alpha(opacity=100)");
            target.attr("style", config.style);
            comboFloatDiv.on('resizeElement.xUi', function (e, width, height) {
                if (config.needSearch != true) {
                    ulDiv.css("height", height - inputDiv.height());
                } else {
                    ulDiv.css("height", height - inputDiv.outerHeight());
                }
                e.stopPropagation();
                return false;
            })
            target.on('resizeElement.xUi', function (e, width, height) {
                comboFloatDiv.css({
                    width: width
                });
                e.stopPropagation();
                return false;
            });
            comboFloatDiv.hide();
        }
    }
    //自动初始化
    $(document).ready(function () {
        $(".xui-combo-select").each(function (i, v) {
            var tabData = $(this).data("xUi.content.comboSelect");
            if (!isEmpty(tabData)) {
                return tabData;
            } else {
                var option = xUi.getXUIOPT($(this).data(XUIOPT));
                var tab = $(this).xUiCombSelect(option);
                return tab;
            }
        });
    })
})(jQuery, window);
//pager
(function ($, win) {
    var xUi = {
        content: {}, config: {}, events: {},
        skin: {}, method: {}, cache: {}, temp: {}
    };
    if (!$.isEmptyObject(win['xUi'])) {
        xUi = win['xUi'];
    } else {
        win['xUi'] = xUi;
    }
    if ($.isFunction($.fn.xUipager)) {
        return;
    }
    $.fn.xUipager = function (key, opt) {
        if (isEmpty(key)) {
            key = {};
        }
        var data = $(this).data("pager.xUi");
        if (!isEmpty(data)) {
            return data;
        }
        key.target = $(this);
        return new xUi.content.pager(key);
    }
    xUi.content.pager = function (key, opt) {
        this.config = {};
        this.elements = {
            target: undefined,
            pageSelect: undefined,
            numSelect: undefined,
            firstBtn: undefined,
            prevBtn: undefined,
            nextBtn: undefined,
            lastBtn: undefined,
            emptyDiv: undefined
        }
        this.useElement = {};
        function init(opt) {
            xUi.method.pager.createPage.call(this, opt);
        }

        init.call(this, key);
    }
    //列配置
    xUi.config.pager = {
        target: undefined,
        events: {},
        zIndex: 1,
        pageType: 0,    //分页方式 1 动态分页，0 静态分页
        total: 0,       //数据总条数
        pageTotal: 1,   //总页数
        pageNumber: 1,     //当前页数
        pageArray: [5, 10, 20, 30, 40],
        pageSize: 5
    }
    //定义可用事件
    xUi.events.pager = {
        onClick: function (pageNumber, pageSize) {

        },
        onSelect: function (pageNumber, pageSize) {
        }
    }
    //添加需要的皮肤class
    xUi.skin.pager = {
        pagerDiv: "pager-table-warpDiv",
        pagerTable: "pager-table",
        pagerSplit: "pager-splitDiv",
        pagerWarp: "pager-warpDiv",
        pagerFirstBtn: "pager-firstBtn",
        pagerPrevBtn: "pager-prevBtn",
        pagerNextBtn: "pager-nextBtn",
        pagerLastBtn: "pager-lastBtn",
        pagerEmptyDiv: "pager-warpDiv-empty"
    };
    //定义可用方法
    xUi.method.pager = {
        initConfig: function (cfg) {
            var config = $.extend(true, {}, xUi.config.pager);
            this.config = $.extend(true, config, cfg);
        },
        initEvents: function (e) {
            if (e) {
                var events = this.events = $.extend(true, {}, xUi.events.pager);
                for (var r in events) {
                    if (e[r] instanceof  Function) {
                        events[r] = e[r];
                    }
                }
            }
        },
        initEnableMethod: function () {
            var this_ = this;
            var method = xUi.method.pager;
            var elements = this.elements;
            var enableMethod = {
                reload: function () {
                    method.initPageSelect.call(this);
                    method.initNumSelect.call(this);
                    method.doLayout.call(this);
                }
            }
            for (var met in enableMethod) {
                if (this[met] == undefined && $.isFunction(enableMethod[met])) {
                    this[met] = $.proxy(enableMethod[met], this_)
                }
            }
        },
        initPageSelect: function () {
            var pageSelect;
            if (!isEmpty(this.elements.pageSelect)) {
                this.elements.pageSelect.children().each(function () {
                    $(this).remove();
                })
                pageSelect = this.elements.pageSelect;
            } else {
                pageSelect = this.elements.pageSelect = $("<select></select>");
                pageSelect.css({
                    height: 24,
                    width: "100%"
                });
            }
            $.each(this.config.pageArray, function (i, v) {
                var option = $("<option></option>");
                option.val(v);
                option.html(v);
                pageSelect.append(option);
            });
        },
        initNumSelect: function () {
            var numSelect;
            var config = this.config;
            var total = config.total;
            var pageSize = config.pageSize;
            if (!isEmpty(this.elements.numSelect)) {
                this.elements.numSelect.children().each(function () {
                    $(this).remove();
                })
                numSelect = this.elements.numSelect;
            } else {
                numSelect = this.elements.numSelect = $("<select></select>");
                numSelect.css({
                    height: 24,
                    width: "100%"
                });
            }
            config.pageTotal = (Math.ceil(total / pageSize) < 1 ? 1 : Math.ceil(total / pageSize));
            for (var e = 1; e <= config.pageTotal; e++) {
                var option = $("<option></option>");
                option.val(e);
                option.html(e);
                if (e == config.pageNumber) {
                    option.attr("selected", "selected")
                }
                numSelect.append(option);
            }
        },
        createPage: function (cfg) {
            var skin = xUi.skin.pager;
            var method = xUi.method.pager;
            method.initConfig.call(this, cfg);
            method.initEvents.call(this, cfg.events);
            method.initPageSelect.call(this);
            method.initNumSelect.call(this);
            var config = this.config;
            var id = config.target.attr("id");
            var pageSelect = this.elements.pageSelect;
            var numSelect = this.elements.numSelect;
            var target = this.elements.target = $("<div  onselectstart='return false'></div>");
            if (!isEmpty(id)) {
                target.attr("id", id);
                config.target.removeAttr("id");
            }
            var table = $("<table></table>");
            var tbody = $("<tbody></tbody>");
            var tr = this.elements.tableTr = $("<tr></tr>");
            var pageSelectTd = $("<td title='选择分页大小' style='width: 48px;max-width: 48px'></td>");
            var oneSplitTd = $("<td style='width:2px'></td>");
            var firstBtnTd = $("<td title='第一页' style='width: 26px'></td>");
            var prevBtnTd = $("<td title='上一页' style='width: 26px'></td>");
            var numSelectTd = $("<td  title='页数' style='width: 42px'></td>");
            var nextBtnTd = $("<td  title='下一页' style='width: 26px'></td>");
            var lastBtnTd = $("<td  title='最后一页' style='width: 26px'></td>");
            var twoSplitTd = $("<td style='width: 2px'></td>");
            var emptyDivTd = $("<td></td>");

            var oneSplitDiv = $("<div></div>");
            var twoSplitDiv = $("<div></div>");
            var onePagerWarpDiv = this.elements.firstBtn = $("<div></div>");
            var twoPagerWarpDiv = this.elements.prevBtn = $("<div></div>");
            var threePagerWarpDiv = this.elements.nextBtn = $("<div></div>");
            var fourPagerWarpDiv = this.elements.lastBtn = $("<div></div>");
            var firstBtn = $("<div></div>");
            var prevBtn = $("<div></div>");
            var nextBtn = $("<div></div>");
            var lastBtn = $("<div></div>");
            var emptyDiv = this.elements.emptyDiv = $("<div></div>");

            target.append(table.append(tbody.append(tr)));
            tr.append(pageSelectTd, oneSplitTd, firstBtnTd, prevBtnTd, numSelectTd);
            tr.append(nextBtnTd, lastBtnTd, twoSplitTd, emptyDivTd);
            pageSelectTd.append(pageSelect);
            oneSplitTd.append(oneSplitDiv);
            firstBtnTd.append(onePagerWarpDiv.append(firstBtn));
            prevBtnTd.append(twoPagerWarpDiv.append(prevBtn));
            numSelectTd.append(numSelect);
            nextBtnTd.append(threePagerWarpDiv.append(nextBtn));
            lastBtnTd.append(fourPagerWarpDiv.append(lastBtn));
            twoSplitTd.append(twoSplitDiv);
            emptyDivTd.append(emptyDiv);

            emptyDiv.addClass(skin.pagerEmptyDiv);
            firstBtn.addClass(skin.pagerFirstBtn);
            prevBtn.addClass(skin.pagerPrevBtn);
            nextBtn.addClass(skin.pagerNextBtn);
            lastBtn.addClass(skin.pagerLastBtn);
            onePagerWarpDiv.addClass(skin.pagerWarp);
            twoPagerWarpDiv.addClass(skin.pagerWarp);
            threePagerWarpDiv.addClass(skin.pagerWarp);
            fourPagerWarpDiv.addClass(skin.pagerWarp);
            oneSplitDiv.addClass(skin.pagerSplit);
            twoSplitDiv.addClass(skin.pagerSplit);
            table.addClass(skin.pagerTable);
            target.addClass(skin.pagerDiv);

            config.target.replaceWith(target);
            method.doLayout.call(this);
            method.bindEvent.call(this);
            method.initEnableMethod.call(this);
        },
        bindEvent: function () {
            var pager = this;
            var config = this.config;
            var events = this.events;
            var target = this.elements.target;
            var numSelect = this.elements.numSelect;
            var firstBtn = this.elements.firstBtn;
            var prevBtn = this.elements.prevBtn;
            var nextBtn = this.elements.nextBtn;
            var lastBtn = this.elements.lastBtn;
            var use = this.useElement;
            firstBtn.bind("click.xUi.pager", function (e) {
                config.pageNumber = 1;
                use.numSelect.setValue(1);
//                    events.onClick.call(pager, 1, config.pageSize);
            });
            prevBtn.bind("click.xUi.pager", function (e) {
                var num = config.pageNumber;
                num = (num - 1 <= 1 ? 1 : num - 1);
                config.pageNumber = num;
                use.numSelect.setValue(num);
//                    events.onClick.call(pager, num, config.pageSize);
            });
            nextBtn.bind("click.xUi.pager", function (e) {
                var num = config.pageNumber;
                var sum = config.pageTotal;
                num = (num + 1 >= sum ? sum : num + 1);
                config.pageNumber = num;
                use.numSelect.setValue(num);
//                events.onClick.call(pager, num, config.pageSize);
            });
            lastBtn.bind("click.xUi.pager", function (e) {
                var num = config.pageTotal;
                config.pageNumber = num;
                use.numSelect.setValue(num);
//                    events.onClick.call(pager, num, config.pageSize);
            });
            var tds = this.elements.tableTr.children();
            var len = tds.length;
            var chageWidth = function (width) {
                if (width < 360) {
                    tds.eq(len - 1).children().hide();
                    tds.eq(len - 2).children().hide();
                } else {
                    tds.eq(len - 1).children().show();
                    tds.eq(len - 2).children().show();
                }
                if (width < 230) {
                    tds.eq(len - 1).hide();
                    tds.eq(len - 2).hide();
                    tds.eq(0).hide();
                    tds.eq(1).hide();
                } else {
                    tds.eq(len - 1).show();
                    tds.eq(len - 2).show();
                    tds.eq(0).show();
                    tds.eq(1).show();
                }
                if (width < 164) {
                    tds.eq(2).hide();
                    tds.eq(6).hide();
                } else {
                    tds.eq(2).show();
                    tds.eq(6).show();
                }
                if (width < 98) {
                    tds.eq(3).hide();
                    tds.eq(5).hide();
                } else {
                    tds.eq(3).show();
                    tds.eq(5).show();
                }
            }
            target.on('resizeElement.xUi', function (e, width, height) {
                chageWidth(width);
                //防止冒泡
                e.stopPropagation();
                return false;
            });
            chageWidth(target.width());
        },
        doLayout: function () {
            var pager = this;
            var method = xUi.method.pager;
            var config = this.config;
            var events = this.events;
            var use = this.useElement;
            var pageSelect = this.elements.pageSelect;
            var numSelect = this.elements.numSelect;
            if (isEmpty(use.numSelect)) {
                use.numSelect = numSelect.xUiCombSelect({
//                isEditor: true,
                    needEmpty: false,
                    needSearch: true,
                    minWidth: 70,
                    events: {
                        onSelect: function (name, value, data) {
                            config.pageNumber = Number(value);
                            events.onSelect.call(this, config.pageNumber, config.pageSize);
                        }
                    }
                });
            } else {
                use.numSelect.reload();
            }
            //this.elements.numSelect.setValue(config.pageNumber);
            if (isEmpty(use.pageSelect)) {
                use.pageSelect = pageSelect.xUiCombSelect({
                    needEmpty: false,
                    minWidth: 70,
                    events: {
                        onSelect: function (name, value, data) {
                            config.pageSize = Number(value);
                            method.initNumSelect.call(pager);
                            use.numSelect.reload();
                            config.pageNumber = 1;
                            events.onSelect.call(this, config.pageNumber, config.pageSize);
                            pager.elements.emptyDiv.html("共" + config.total + "记录," + config.pageTotal + "页");
                        }
                    }
                });
            } else {
                use.pageSelect.reload();
            }
            this.elements.emptyDiv.html("共" + config.total + "记录," + config.pageTotal + "页");
        }
    }
})(jQuery, window);
//grid
(function ($, win) {
    //初始化xUi
    var xUi = {
        content: {}, config: {}, events: {},
        skin: {}, method: {}, cache: {}, temp: {}, space: undefined
    };
    if (!$.isEmptyObject(win['xUi'])) {
        xUi = win['xUi'];
    } else {
        win['xUi'] = xUi;
    }
    if (xUi.cache.grid == undefined) {
        xUi.cache.grid = {};
    }
//    if (win.top.xUi.cache.grid != undefined) {
//        xUi.cache.grid = win.top.xUi.cache.grid;
//    } else {
//        xUi.cache.grid = $.extend(true, {}, win.top.xUi.cache.grid);
//    }
    if (!$.isFunction(xUi.getGrid)) {
        xUi.getGrid = function (id) {
            var grid = null;
            $.each(xUi.cache.grid, function (i, v) {
                if (v.config.id == id) {
                    grid = v;
                    return false;
                }
            });
            if (grid == null) {
                $.each(window.top.xUi.cache.grid, function (i, v) {
                    if (v.config.id == id) {
                        grid = v;
                        return false;
                    }
                });
            }
            return grid
        }
    }
    if ($.isFunction($.fn.dataGrid)) {
        return;
    }
    $.fn.dataGrid = function (key, opt) {
        var tt = $(this);
        var options = {};
        var arNum = arguments.length;
        if (arNum > 1) {
            var panelData = tt.data("grid.xUi");
            if (!isEmpty(panelData) && typeof(key) == "string") {
                options[key] = opt;
                return panelData.init(options);
            } else {
                return new xUi.panel(options);
            }
        }
//        var html = tt.html();
        var style = tt.attr("style");
        var id = tt.attr("id");
        options.id = id;
        options.beforeTarget = tt;
//        options.content = html;
//        options.style = {};
//        options.style.panel = style;
        options = $.extend(true, options, key);
        return new xUi.content.dataGrid(options);
//        return new xUi.extend(xUi.dataGrid, xUi.panel, options, xUi.dataGrid.constructor);
    }
    xUi.content.dataGrid = function (key, opt) {
        this.xUiPanel = undefined;
        this.columns = [];
        this.frozenCl = [];
        this.url = "";//查询请求地址
        this.rowHeight = "28px";//行高
        this.dynamicRow = false;//是否需要动态行高
        this.colMinWidth = "20px";//列最小宽度
        this.headHeight = "32px";//表头高度
        this.needIndex = true;//是否需要序号
        this.needCheck = false;//是哦服需要选择框
        this.needFoot = true;
        this.needPager = true;//是否需要分页
        this.fitColumns = true;//是否把列铺满
        this.needMsg = true;//是否显示遮罩文字
        this.frozenPosition = "left";//冻结方向
        this.queryParams = {};//查询参数
        this.power = false;//增强组建的兼容性，但是降低性能
        this.selectType = "single";//选中模式（single和mutile,none不能被选中）
        this.staticDatas = [];
        this.elementId = "";
        this.dataRowName = "dataRow";
        this.dataColnum = "dataColnum";
        this.index = {
            width: "auto",//序号宽度
            minWidth: "30px",
            title: "序号",
            field: "dataGrid-index",
            frozen: true//默认为冻结项
        };
        this.check = {
            width: "28px",//复选框宽度
            field: "dataGrid-check",
            frozen: true//默认为冻结项
        };
        this.pager = {
            events: {},
            zIndex: 1,
            pageType: 0,    //分页方式 1 动态分页，0 静态分页
            total: 0,       //数据总条数
            pageTotal: 1,   //总页数
            pageNumber: 1,     //当前页数
            pageArray: [5, 10, 20, 30, 40]
        };
        //内部元素
//        this.elements = {
//            gridWarpDiv: undefined,
//            gridTable: undefined,
//            frozeTd: undefined,
//            headTr: undefined,
//            headTrDiv: undefined,
//            headTable: undefined,
//            bodyTable: undefined,
//            frozenTableLeft: undefined,
//            panel: undefined
//        };
        this.useElement = {
            indexTrs: [],
            checkTrs: [],
            bodyTrs: [],
            frozeHeadBodyTrs: [],
            realColnum: [],
            totalCheck: undefined,
            frozeHeadTr: undefined,
            frozeCss: {},
            realCss: {},
            headTr: undefined,
            totalCheckFlag: false,
            selectRow: undefined,
            checkRows: {},
            styleDiv: undefined
        };
        this.dataSource = {
            fromData: undefined,
            initData: undefined
        };
        //绑定事件
        (function (tt) {
            for (var r in xUi.events.dataGrid) {
                tt[r] = xUi.events.dataGrid[r];
            }
        })(this);

//        this.loadFilter = function (data) {
//            return data
//        };
        //初始化配置
        this.init = function (opt) {
            (function (tt) {
                xUi.method.dataGrid.createGrid.call(tt, opt);
            })(this);
            return this;
        }
        this.show = function () {
            var panel = this.xUiPanel;
            if (!this.isShow) {
                var method = xUi.method.dataGrid
                panel.show();
                method.doLayout.call(this);
                method.bindResize.call(this);
                method.doLayout.call(this);
                method.bindCheckEvent.call(this);
                method.power.call(this);
                this.isShow = true;
            } else {
                panel.show();
            }
        }
        this.init.call(this, key);
    }
    //列配置
    xUi.content.dataGrid.colnumConfig = {
        title: "",//标题
        field: "",//字段
        fieldId: "",//字段Id
        frozen: false,//是否为冻结列
        rowspan: undefined,//行合并
        colspan: undefined,//列合并
        textAlign: "center",//列对齐方式
        verticalAlign: "middle",//行对齐方式
        editor: false,//单元不可以编辑
        editorFormatter: undefined,//自定义编辑器
        formatter: undefined,//自定义编辑器
        style: undefined,//自定义样式
        resize: true
    }
    //定义可用事件
    xUi.events.dataGrid = {
        loadFilter: function (data) {
            return data;
        },
        afterCreate: function (grid) {

        },
        afterLoad: function (grid) {

        },
        afterInit: function (grid) {

        },
        rowLoad: function (tr, row) {

        },
        onSelect: function (grid, row, tr) {

        }
    }
    //添加需要的皮肤class
    xUi.skin.dataGrid = {
        gridWarpDiv: "dataGrid-warpDiv",
        emptyTd: "dataGrid-emptyTd",
        helpLine: "dataGrid-helpLine",
        reDiv: "dataGrid-relativeDiv",
        abDiv: "dataGrid-absoluteDiv",
        headTable: "dataGrid-headTable",
        headDivTable: "headTableDivBackgroundColor",
        bodyTable: "dataGrid-bodyTable",
        bodyTableTr: "dataGrid-bodyTableTr",
        bodyTableTd: "dataGrid-bodyTableTd",
        frozenTable: "dataGrid-frozenTable",
        frozenHeadTable: "dataGrid-frozenHeadTable",
        bodyFrozeTd: "dataGrid-bodyFrozeTd",
        emptyTdRight: "dataGrid-emptyTd-right"
    };
    //定义可用方法
    xUi.method.dataGrid = {
        extend: function (options) {
            $.extend(true, this, options)
            if (isEmpty(this.style)) {
                this.style = {};
            }
            this.style.toolbar = $.extend(true, {backgroundColor: "#fff"}, this.style.toolbar);
            this.style.foot = {height: "31px", backgroundColor: "#fff"};
            var panel = $("#" + this.id).xUiPanel(this);
            this.xUiPanel = panel;
            this.target = panel.target;
            $.extend(true, this, panel);
        },
        initEnableMethod: function () {
            var this_ = this;
            var method = xUi.method.dataGrid;
            var elements = this.elements;
            var enableMethod = {
                getSelectRow: function () {
                    var use = this.useElement;
                    return use.selectRow;
                },
                checkRow: function (trid) {
                    var tr = this.elements.bodyTr.find("[fieldid='" + trid + "']");
                    if (tr.data("dataRow")['row.getCheck'] == false || tr.data("dataRow")['row.getCheck'] == undefined) {
                        tr.trigger("click");
                    }
                },
                getSelectRows: function () {
                    var use = this.useElement;
                    var rows = [];
                    $.each(use.checkRows, function (i, v) {
                        rows.push(v);
                    })
                    return rows;
                },
                changeRow: function (fid, row, flag) {
                    var grid = this;
                    var trs = this.useElement.bodyTrs;
                    var temp = {
                        ele: undefined,
                        data: undefined,
                        fieldId: undefined
                    };
                    $.each(trs, function (i, v) {
                        if (v.attr('fieldid') == fid) {
                            temp.ele = v;
                            temp.fieldId = fid;
                            temp.data = v.data(grid.dataRowName);
                            return true;
                        }
                    });
                    if (flag == true) {
                        for (var rr in  temp.data) {
                            if (rr == "row.fieldId") {
                                continue;
                            }
                            if (rr == "row.getCheck") {
                                continue;
                            }
                            temp.data[rr] = row[rr];
                        }
                    } else {
                        $.extend(true, temp.data, row);
                    }
                    for (var i in temp.data) {
                        var o = temp.ele.find("[field='" + i + "']");
                        if (o && o.length > 0) {
                            var html = (isEmpty(temp.data[i]) ? "" : temp.data[i]);
                            var col = o.data(grid.dataColnum);
                            if (col.formatter && col.formatter instanceof  Function) {
                                html = col.formatter.call(o.children().eq(0), temp.data, html, temp.fieldId, col);
                            }
                            o.children().eq(0).html(html);
                        }
                    }
                },
                search: function (param) {
                    var method = xUi.method.dataGrid;
                    this.queryParams = param;
                    method.loadData.call(this);
                },
                staticSearch: function (str) {
                    this.statich = str;
                    var method = xUi.method.dataGrid;
                    method.loadData.call(this);
                },
                reload: function (param) {
                    var method = xUi.method.dataGrid;
                    this.queryParams = param;
                    method.initColnum.call(this);
                    method.initHeadTable.call(this);
                    method.createFrozeHeadTable.call(this);
                    method.createHeadTable.call(this);
                    method.loadData.call(this);
                    method.initBodyColnum.call(this);
                    method.reloadBody.call(this);
                    method.bindCheckEvent.call(this);
                    method.initCss.call(this);
                },
                appendRow: function (dd) {
                    if (!isEmpty(dd)) {
                        var grid = this;
                        var rows = [];
                        if (!(dd instanceof Array)) {
                            rows.push(dd);
                        }
                        else {
                            rows = dd;
                        }
                        $.each(rows, function (i, v) {
                            grid.staticDatas.push(v);
                        });
                        method.loadData.call(this);
                        method.initBodyColnum.call(grid);
                        method.reloadBody.call(grid);
                        method.initCss.call(this);
                        if ($.isFunction(grid.events.afterLoad)) {
                            grid.events.afterLoad.call(grid, grid);
                        }
                    }
                },
                prependRow: function (dd) {
                    if (!isEmpty(dd)) {
                        var grid = this;
                        var rows = [];
                        if (!(dd instanceof Array)) {
                            rows.push(dd);
                        }
                        else {
                            rows = dd;
                        }
                        $.each(rows, function (i, v) {
                            grid.staticDatas.splice(0, 0, v);
                        });
                        method.loadData.call(this);
                        method.initBodyColnum.call(grid);
                        method.reloadBody.call(grid);
                        if ($.isFunction(grid.events.afterLoad)) {
                            grid.events.afterLoad.call(grid, grid);
                        }
                    }
                },
                removeData: function () {
                    this.staticDatas.length = 0;
                    method.loadData.call(this);
                    method.initBodyColnum.call(this);
                    method.reloadBody.call(this);
                },
                getData: function () {
                    return this.dataSource.initData;
                }
            }
            for (var met in enableMethod) {
                if (this[met] == undefined && $.isFunction(enableMethod[met])) {
                    this[met] = $.proxy(enableMethod[met], this_)
                }
            }
        },
        initEvents: function (e) {
            if (e) {
                var events = this.events = $.extend(true, {}, xUi.events.dataGrid);
                for (var r in events) {
                    if (e[r] instanceof  Function) {
                        events[r] = e[r];
                    }
                }
            }
        },
        createWarpDiv: function () {
            var panel = this.xUiPanel;
            var skin = xUi.skin.dataGrid;
            var warpDiv = this.elements.gridWarpDiv = $("<div></div>");
            var gridTable = this.elements.gridTable = $("<table></table>");
            var gridTableTbody = $("<tbody></tbody>");
            var gridOneTr = this.elements.headTr = $("<tr></tr>");
            var gridTwoTr = this.elements.bodyTr = $("<tr></tr>");
            var frozeTd = this.elements.frozeTd = $("<td></td>");
            var twoTd = this.useElement.headDivRelTd = $("<td></td>");
            var twoTdreDiv = this.useElement.headDivRel = $("<div></div>");
            var twoTdabDiv = this.elements.headTrDiv = $("<div></div>");
            var helpLine = this.elements.helpLine = $("<div></div>");
            gridTable.append(gridTableTbody);
            twoTdreDiv.addClass(skin.reDiv);
            twoTdabDiv.addClass(skin.abDiv);
            twoTdreDiv.append(twoTdabDiv);
            if (this.frozenPosition == "right") {
                gridOneTr.append(twoTd.append(twoTdreDiv));
                gridOneTr.append(frozeTd);
                frozeTd.addClass(skin.emptyTdRight);
            } else {
                gridOneTr.append(frozeTd);
                gridOneTr.append(twoTd.append(twoTdreDiv));
                frozeTd.addClass(skin.emptyTd);
            }
            gridTableTbody.append(gridOneTr, gridTwoTr);
            gridTwoTr.addClass(skin.bodyTableTr);
            warpDiv.addClass(skin.gridWarpDiv);
            helpLine.addClass(skin.helpLine);
            warpDiv.append(gridTable);
            warpDiv.append(helpLine);
            panel.replaceBody(warpDiv);
            this.target.data("grid.xUi", this);
        },
        getDataIndex: function () {
            var grid = this;
            if (grid.needPager && grid.config.needFoot) {
                var start, end, tempData = [], l, rn;
                l = grid.dataSource.fromData.length;
                rn = Math.ceil(l / grid.pager.pageSize);
                if (rn < grid.pager.pageNumber && rn > 0) {
                    grid.pager.pageNumber = rn;
                }
                start = (grid.pager.pageNumber - 1) * grid.pager.pageSize;
                end = (grid.pager.pageNumber * grid.pager.pageSize);
                for (var i = start; i < end && i < l; i++) {
                    tempData[i] = grid.dataSource.fromData[i];
                }
                return tempData;
            } else {
                return grid.dataSource.fromData;
            }
        },
        loadData: function () {
            var grid = this;
            var pageType = this.pager.pageType;
            var tempDatas = [];
            var method = xUi.method.dataGrid;
            var errCallback = function () {
                grid.shadowPanel(!grid.needMsg);
                method.initPager.call(this);
            }
            if (grid.url != "") {
                var callbacks = function (data) {
                	this.dataSource.total=data.total;
                    if ($.isFunction(grid.events.loadFilter)) {
                        grid.dataSource.fromData = grid.events.loadFilter.call(grid, data);
                        if (isEmpty(grid.dataSource.fromData)) {
                            grid.dataSource.fromData = [];
                        }
                    } else {
                        grid.dataSource.fromData = data
                    }
                    var tempData;
                    if (grid.statich != null) {
                        var parm = grid.statich;
                        var temp = [];
                        if (typeof (parm) == "string") {
                            if (grid.statich == "") {
                                temp = this.dataSource.fromData;
                            } else {
                                $.each(grid.dataSource.initData, function (i, v) {
                                    for (var i in v) {
                                        if (v[i].toString().toUpperCase().indexOf(parm.toString().toUpperCase()) != -1) {
                                            temp.push(v);
                                            break;
                                        }
                                    }
                                });
                            }
                        } else if (parm instanceof  Object) {
                            $.each(grid.dataSource.initData, function (i, v) {
                                for (var r in parm) {
                                    if (v[r] == parm[r]) {
                                        temp.push(v);
                                        break;
                                    }
                                }
                            });
                        }
                        grid.dataSource.fromData = temp;
                        grid.dataSource.initData = grid.dataSource.fromData;
                    } else {
                        tempData = method.getDataIndex.call(grid);
                        grid.dataSource.initData = tempData;
                    }
                    setTimeout(function () {
                        method.initBodyColnum.call(grid);
                        method.reloadBody.call(grid);
                        setTimeout(function () {
                            grid.shadowPanel(!grid.needMsg);
                        }, 250)
                    }, 1);
                    if (grid.needPager && grid.config.needFoot) {
                        if (pageType == 0) {
                            var scallback = function (pageNumber, pageSize) {
                                var start, end;
                                grid.shadowPanel(grid.needMsg);
                                start = (pageNumber - 1) * pageSize;
                                end = (pageNumber * pageSize);
                                if (grid.statich != null) {
                                    var parm = grid.statich;
                                    var temp = [];
                                    if (typeof (parm) == "string") {
                                        if (grid.statich == "") {
                                            temp = this.dataSource.fromData;
                                        } else {
                                            $.each(grid.dataSource.initData, function (i, v) {
                                                for (var i in v) {
                                                    if (v[i].toString().toUpperCase().indexOf(parm.toString().toUpperCase()) != -1) {
                                                        temp.push(v);
                                                        break;
                                                    }
                                                }
                                            });
                                        }
                                    } else if (parm instanceof  Object) {
                                        $.each(grid.dataSource.initData, function (i, v) {
                                            for (var r in parm) {
                                                if (v[r] == parm[r]) {
                                                    temp.push(v);
                                                    break;
                                                }
                                            }
                                        });
                                    }
                                    grid.dataSource.fromData = temp;
                                    grid.dataSource.initData = grid.dataSource.fromData;
                                } else {
                                    var tempData = [];
                                    for (var i = start; i < end; i++) {
                                        tempData[i] = grid.dataSource.fromData[i];
                                    }
                                    grid.dataSource.initData = tempData;
                                }

                                method.initBodyColnum.call(grid);
                                method.reloadBody.call(grid);
                                method.bindCheckEvent.call(grid);
                                setTimeout(function () {
                                    grid.shadowPanel(!grid.needMsg);
                                }, 250)
                            };
                            grid.pager.events.onSelect = scallback;
                            method.initPager.call(this);
                            if ($.isFunction(grid.events.afterLoad)) {
                                grid.events.afterLoad.call(grid, grid);
                            }
                            if ($.isFunction(grid.events.afterInit)) {
                                grid.events.afterInit.call(grid, grid);
                            }
                        } else {
                            var scallback = function (pageNumber, pageSize) {
                                var fycalback = function (data) {
                                    if ($.isFunction(grid.events.loadFilter)) {
                                        grid.dataSource.fromData = grid.events.loadFilter.call(grid, data);
                                    } else {
                                        grid.dataSource.fromData = data;
                                    }
                                    if (grid.statich != null) {
                                        var parm = grid.statich;
                                        var temp = [];
                                        if (typeof (parm) == "string") {
                                            if (grid.statich == "") {
                                                temp = this.dataSource.fromData;
                                            } else {
                                                $.each(grid.dataSource.initData, function (i, v) {
                                                    for (var i in v) {
                                                        if (v[i].toString().toUpperCase().indexOf(parm.toString().toUpperCase()) != -1) {
                                                            temp.push(v);
                                                            break;
                                                        }
                                                    }
                                                });
                                            }
                                        } else if (parm instanceof  Object) {
                                            $.each(grid.dataSource.initData, function (i, v) {
                                                for (var r in parm) {
                                                    if (v[r] == parm[r]) {
                                                        temp.push(v);
                                                        break;
                                                    }
                                                }
                                            });
                                        }
                                        grid.dataSource.initData = grid.dataSource.fromData = temp;
                                    } else {
                                        grid.dataSource.initData = grid.dataSource.fromData;
                                    }
                                    method.initBodyColnum.call(grid);
                                    method.reloadBody.call(grid);
                                    setTimeout(function () {
                                        grid.shadowPanel(!grid.needMsg);
                                    }, 250)
                                    if ($.isFunction(grid.events.afterLoad)) {
                                        grid.events.afterLoad.call(grid, grid);
                                    }
                                    if ($.isFunction(grid.events.afterInit)) {
                                        grid.events.afterInit.call(grid, grid);
                                    }
                                }
                                grid.shadowPanel(grid.needMsg);
                                grid.queryParams.pageNumber = pageNumber; //页数
                                grid.queryParams.pageSize = pageSize; //分页大小
                                xUi.loadAjax(grid.url, grid.queryParams, fycalback, errCallback, grid);
                            };
                            grid.pager.events.onSelect = scallback;
                            method.initPager.call(this);
                        }
                    } else {
                        if ($.isFunction(grid.events.afterLoad)) {
                            grid.events.afterLoad.call(grid, grid);
                        }
                    }
                }
                if (grid.needPager && grid.config.needFoot && pageType != 0) {
                    this.queryParams.pageNumber = this.pager.pageNumber; //页数
                    this.queryParams.pageSize = this.pager.pageSize; //分页大小
                }
                grid.shadowPanel(grid.needMsg);
                xUi.loadAjax(this.url, this.queryParams, callbacks, errCallback, this);
            }
            else {
                if ($.isFunction(this.events.loadFilter)) {
                    this.dataSource.fromData = this.events.loadFilter.call(this, this.staticDatas);
                } else {
                    this.dataSource.fromData = this.staticDatas;
                }
//                this.dataSource.searchData = $.extend(true, [], this.dataSource.fromData);
                if (grid.statich != null) {
                    var parm = grid.statich;
                    var temp = [];
                    if (typeof (parm) == "string") {
                        if (grid.statich == "") {
                            temp = this.dataSource.fromData;
                        } else {
                            $.each(grid.dataSource.fromData, function (i, v) {
                                for (var i in v) {
                                    if (v[i].toString().toUpperCase().indexOf(parm.toString().toUpperCase()) != -1) {
                                        temp.push(v);
                                        break;
                                    }
                                }
                            });
                        }
                    } else if (parm instanceof  Object) {
                        $.each(grid.dataSource.fromData, function (i, v) {
                            for (var r in parm) {
                                if (v[r] == parm[r]) {
                                    temp.push(v);
                                    break;
                                }
                            }
                        });
                    }
                    grid.dataSource.fromData = temp;
                    this.pager.pageNumber = 1;
                }
                this.dataSource.initData = this.dataSource.fromData;
                if (grid.needPager && grid.config.needFoot) {
                    var scallback = function (pageNumber, pageSize) {
                        var start, end;
                        grid.shadowPanel(grid.needMsg);
                        setTimeout(function () {
                            start = (pageNumber - 1) * pageSize;
                            end = (pageNumber * pageSize);
                            var tempData = [];
                            for (var i = start; i < end && i < grid.dataSource.fromData.length; i++) {
                                tempData[i] = grid.dataSource.fromData[i];
                            }
                            grid.dataSource.initData = tempData;
                            method.initBodyColnum.call(grid);
                            method.reloadBody.call(grid);
                            setTimeout(function () {
                                grid.shadowPanel(!grid.needMsg);
                            }, 250);
                            if ($.isFunction(grid.events.afterInit)) {
                                grid.events.afterInit.call(grid, grid);
                            }
                            grid.statich = null;
                        }, 1)
                    };
                    grid.pager.events.onSelect = scallback;
                    method.initPager.call(this);
                    scallback.call(this, this.pager.pageNumber, this.pager.pageSize)
                } else {
                    if (grid.statich != null) {
                        grid.dataSource.initData = grid.dataSource.fromData;
                        method.initBodyColnum.call(grid);
                        method.reloadBody.call(grid);
                        setTimeout(function () {
                            grid.shadowPanel(!grid.needMsg);
                        }, 250);
                        grid.statich = null;
                    }
                    if ($.isFunction(grid.events.afterLoad)) {
                        grid.events.afterLoad.call(grid, grid);
                    }
                    if ($.isFunction(grid.events.afterInit)) {
                        grid.events.afterInit.call(grid, grid);
                    }
                }
            }

        },
        initData: function (callback) {
            var grid = this;
            var pager = this.pager;
            var method = xUi.method.dataGrid
            var pageType = pager.pageType;
            grid.pager.pageSize = grid.pager.pageArray[0];
            method.loadData.call(this);
            //处理分页
//            if (this.needPager && this.needFoot) {
//                var callback = undefined;
//                if (pageType == 0 && grid.url == "") {
//                    var tempData = method.getDataIndex.call(grid);
//                    grid.dataSource.initData = tempData;
//                    callback = function (pageNumber, pageSize) {
//                        var start, end;
//                        grid.shadowPanel(grid.needMsg);
//                        setTimeout(function () {
//                            start = (pageNumber - 1) * pageSize;
//                            end = (pageNumber * pageSize);
//                            var tempData = [];
//                            for (var i = start; i < end; i++) {
//                                tempData[i] = grid.dataSource.fromData[i]
//                            }
//                            grid.dataSource.initData = tempData;
//                            method.initBodyColnum.call(grid);
//                            method.reloadBody.call(grid);
//                            setTimeout(function () {
//                                grid.shadowPanel(grid.needMsg);
//                            }, 250)
//                        }, 1)
//                    };
//                    grid.pager.events.onSelect = callback;
//                    method.initPager.call(this);
//                }
//            }
        },
        initColnum: function () {
            var columns = $.extend(true, [], this.columns);
            var realColnum = this.useElement.realColnum = [];
            var frozenCls = this.frozenCl = [];
            while (columns.length > 0) {
                var rowIndex = columns.length - 1;
                var colnum = columns.pop();
                var tempCol = $.extend(true, {}, xUi.content.dataGrid.colnumConfig);
                colnum = $.extend(true, tempCol, colnum);
                //检查是否有冻结列
                if (colnum.frozen == true) {
                    frozenCls.push(colnum);
                } else {
                    realColnum[rowIndex] = colnum;
                }
            }
            //渲染序号和复选框
            if (this.needCheck == true) {
                var tempCol = $.extend(true, {}, xUi.content.dataGrid.colnumConfig);
                if (this.check.frozen == true) {
                    frozenCls.splice(0, 0, $.extend(true, tempCol, this.check));
                } else {
                    realColnum.splice(0, 0, $.extend(true, tempCol, this.check));
                }
            }
            if (this.needIndex == true) {
                var tempCol = $.extend(true, {}, xUi.content.dataGrid.colnumConfig);
                if (this.index.frozen == true) {
                    frozenCls.splice(0, 0, $.extend(true, tempCol, this.index));
                } else {
                    realColnum.splice(0, 0, $.extend(true, tempCol, this.index));
                }
            }
            var tempTr = this.useElement.headTr;
            var frozeHeadTr = this.useElement.frozeHeadTr;
            var frozeTd = this.elements.frozeTd;
            if (!isEmpty(tempTr)) {
                tempTr.empty();
            }
            if (!isEmpty(frozeHeadTr)) {
                frozeHeadTr.empty();
            }
            if (!isEmpty(frozeTd)) {
                frozeTd.empty();
            }
        },
        initHeadTable: function () {
            var grid = this;
            var frozeTd = this.elements.frozeTd
            var warpDiv = this.elements.gridWarpDiv;
            var helpLine = this.elements.helpLine;
            var twoTdabDiv = this.elements.headTrDiv;
            //初始化普通列
            var realColnum = this.useElement.realColnum;
            var frozenCls = this.frozenCl;
            var tempTr = this.useElement.headTr = $("<tr></tr>");
            var frozeHeadTr = this.useElement.frozeHeadTr = $("<tr></tr>");
            var realCss = this.useElement.realCss = {};
            $.each(realColnum, function (i, colnum) {
                if (!colnum) {
                    return;
                }
                var tempTd = $("<td></td>");
                var tempDiv = $("<div></div>");
                var cssId = "f-" + Math.uuid(8);
                cssId = cssId.toUpperCase();
                realCss[cssId] = {
                    width: (isEmpty(colnum.width) ? grid.colMinWidth : colnum.width)
                }
                colnum['cssid'] = cssId;
                tempDiv.attr("class", cssId);
                tempTd.attr("field", colnum.field);
                if (colnum.field == "dataGrid-index" && grid.needIndex == true) {
                    tempDiv.css("minWidth", colnum.minWidth);
                    colnum.resize = false;
                    realCss[cssId] = {
                        width: colnum.minWidth
                    }
                }
                if (colnum.field == "dataGrid-check" && grid.needCheck == true) {
                    var checkbox = grid.useElement.totalCheck = $("<input type='checkbox'>");
                    colnum.resize = false;
                    colnum.title = checkbox;
                }
                tempDiv.html(colnum.title);
                tempTd.append(tempDiv);
                tempTd.data("grid.xUi.style", {cssId: cssId});
                tempTr.append(tempTd);
                //创建拖动
                if (colnum.resize == true && $.isFunction($.fn.resizable)) {
                    tempTd.resizable({
                        handles: 'e',
                        distance: 1,
                        start: function (event, ui) {
                            warpDiv.addClass("warpOpacity");
//                            var pl = twoTdabDiv.position().left;
//                            var l = ui.originalElement.position().left + pl
//                            var w = ui.size.width + frozeTd.width();
                            helpLine.css({
                                left: (ui.originalElement.offset().left-ui.originalElement.position().left+ui.originalElement.width()-12)
                            })
//                            helpLine.css({
//                            	left: (w + l + 2)
//                            })
                            helpLine.css("display", "block");
                        },
                        resize: function (event, ui) {
                            $(this).removeAttr("style");
                            var pl = twoTdabDiv.position().left;
                            var l = ui.originalElement.offset().left-ui.originalElement.position().left + pl;
                            var w = ui.size.width;
                            helpLine.css({
                                left: (w + l - 12)
                            })
                        },
                        stop: function (event, ui) {
                            var styles = grid.useElement.styles;
                            var w = ui.size.width - 2;
                            var data = ui.originalElement.data("grid.xUi.style");
//                            var html = "." + data.cssId + "{width:" + w + "px;}";
                            grid.useElement.realCss[data.cssId].width = w;
                            var method = xUi.method.dataGrid;
                            method.initCss.call(grid);
                            helpLine.css("display", "none");
                            warpDiv.removeClass("warpOpacity");
                        }
                    });
                }
            });
            //初始化冻结列
            $.each(frozenCls, function (i, colnum) {
                var tempTd = $("<td></td>");
                var tempDiv = $("<div></div>");
                tempTd.attr("field", colnum.field);
                var cssId = "f-" + Math.uuid(8);
                cssId = cssId.toUpperCase();
                realCss[cssId] = {
                    width: (isEmpty(colnum.width) ? grid.colMinWidth : colnum.width)
                }
                colnum['cssid'] = cssId;
                tempDiv.attr("class", cssId);
//                    if (colnum.textAlign != "") {
//                        tempTd.css({
//                            textAlign: colnum.textAlign
//                        });
//                    }
//                    if (colnum.verticalAlign != "") {
//                        tempTd.css({
//                            verticalAlign: colnum.verticalAlign
//                        });
//                    }
                if (colnum.field == "dataGrid-index" && grid.needIndex == true) {
                    tempDiv.css("minWidth", colnum.minWidth);
                    colnum.resize = false;
                    realCss[cssId] = {
                        width: colnum.minWidth
                    }
                }
                if (colnum.field == "dataGrid-check" && grid.needCheck == true) {
                    var checkbox = grid.useElement.totalCheck = $("<input type='checkbox'>");
                    colnum.resize = false;
                    colnum.title = checkbox;
                }
                tempDiv.html(colnum.title);
                tempTd.append(tempDiv);
                frozeHeadTr.append(tempTd);
                if (colnum.resize == true) {
                    tempTd.resizable({
                        handles: 'e',
                        distance: 1,
                        start: function (event, ui) {
                            warpDiv.addClass("warpOpacity");
                            var pl = twoTdabDiv.position().left;
                            var l = ui.originalElement.position().left + pl
                            var w = ui.size.width + frozeTd.width();
                            helpLine.css({
                                left: (w + l + 2)
                            })
                            helpLine.css("display", "block")
                        },
                        resize: function (event, ui) {
                            $(this).removeAttr("style");
                            var pl = twoTdabDiv.position().left;
                            var l = ui.originalElement.position().left + pl
                            var w = ui.size.width + frozeTd.width();
                            helpLine.css({
                                left: (w + l + 2)
                            })
                        },
                        stop: function (event, ui) {
                            var styles = grid.useElement.styles;
                            var w = ui.size.width - 2;
                            var data = ui.originalElement.data("grid.xUi.style");
                            var html = "." + data.cssId + "{width:" + w + "px;}";
                            var style = styles[data.cssId];
                            //兼容IE8
                            if (style[0].styleSheet) {
                                style[0].styleSheet.cssText = html;
                            } else {
                                style.html(html);
                            }
                            helpLine.css("display", "none");
                            warpDiv.removeClass("warpOpacity");
                        }
                    });
                }
            });
        },
        initBodyColnum: function () {
            var grid = this;
            var columns = this.useElement.realColnum;
            var frozenCls = this.frozenCl;
            var bodyTrs = this.useElement.bodyTrs = [];
            var frozeBodyTrs = this.useElement.frozeHeadBodyTrs = [];
            var datas = this.dataSource.initData;
            if (!datas) {
                return;
            }
            $.each(datas, function (n, v) {
                if (!v) {
                    return true;
                }
                var tempTr = $("<tr></tr>");
                var frozenTr = $("<tr></tr>");
                tempTr.css("height", grid.rowHeight);
                frozenTr.css("height", grid.rowHeight);
//                TODO
                var fieldId = ( isEmpty(v["row.fieldId"]) ? Math.uuid(8).toUpperCase() : v["row.fieldId"]);
                $.each(columns, function (o, col) {
                    var colnum = col;
                    if (!colnum) {
                        return true;
                    }
                    var tempTd = $("<td></td>");
                    tempTd.data(grid.dataColnum, colnum);
                    tempTr.append(tempTd);
                    var tempDiv = $("<div></div>");
                    tempTd.append(tempDiv);
                    var html = (isEmpty(v[colnum.field]) ? "" : v[colnum.field]);
                    //渲染序号和复选框
                    if (colnum.field == "dataGrid-index" && grid.needIndex == true) {
                        var html = (n + 1);
                        tempDiv.append(html);
                        tempDiv.css("minWidth", colnum.minWidth);
                    }
                    if (colnum.field == "dataGrid-check" && grid.needCheck == true) {
                        html = $("<input type='checkbox'>");
                        v["row.CheckDom"] = html;
                        tempDiv.append(html);
                    }
                    tempTd.attr("field", colnum.field);
                    if ($.isNumeric(colnum.rowspan)) {
                        tempTd.attr("rowspan", colnum.rowspan);
                    }
                    if ($.isNumeric(colnum.colspan)) {
                        tempTd.attr("colspan", colnum.colspan);
                    }
                    tempDiv.attr("class", colnum['cssid']);
                    if (colnum.textAlign != "") {
                        tempDiv.css({
                            textAlign: colnum.textAlign
                        });
                    }
                    if (colnum.verticalAlign != "") {
                        tempDiv.css({
                            verticalAlign: colnum.verticalAlign
                        });
                    }
                    if (colnum.formatter && colnum.formatter instanceof  Function) {
                        html = colnum.formatter.call(tempDiv, v, html, fieldId, colnum);
                    }
                    if (isEmpty(html)) {
                        html = " ";
                    }
                    if (typeof(html) == "string") {
                        tempDiv.attr("title", html);
                    }
                    tempDiv.html(html);
                });
                tempTr.attr("fieldId", fieldId);
                v["row.fieldId"] = fieldId;
                tempTr.data(grid.dataRowName, v);
                if ($.isFunction(grid.events.rowLoad)) {
                    grid.events.rowLoad.call(grid, tempTr, v);
                }
                bodyTrs.push(tempTr);
                if (frozenCls.length > 0) {
                    $.each(frozenCls, function (u, colnum) {
                        var tempTd = $("<td></td>");
                        var tempDiv = $("<div></div>");
                        tempTd.append(tempDiv);
                        frozenTr.append(tempTd);
                        frozenTr.attr("fieldId", fieldId);
                        var html = (isEmpty(v[colnum.field]) ? "" : v[colnum.field]);
                        //渲染序号和复选框
                        if (colnum.field == "dataGrid-index" && grid.needIndex == true) {
                            var html = (n + 1);
                            tempDiv.append(html);
                            tempDiv.css("minWidth", colnum.minWidth);
                        }
                        if (colnum.field == "dataGrid-check" && grid.needCheck == true) {
                            html = $("<input type='checkbox'>");
                            v["row.CheckDom"] = html;
                            tempDiv.append(html);
                        }
                        tempTd.attr("field", colnum.field);
                        tempDiv.attr("class", colnum['cssid']);
                        if (colnum.textAlign != "") {
                            tempDiv.css({
                                textAlign: colnum.textAlign
                            });
                        }
                        if (colnum.verticalAlign != "") {
                            tempDiv.css({
                                verticalAlign: colnum.verticalAlign
                            });
                        }
                        if (colnum.formatter && colnum.formatter instanceof  Function) {
                            html = colnum.formatter.call(tempDiv, v, html, fieldId, colnum);
                        }
                        if ($.isNumeric(colnum.rowspan)) {
                            tempTd.attr("rowspan", colnum.rowspan);
                        }
                        if ($.isNumeric(colnum.colspan)) {
                            tempTd.attr("colspan", colnum.colspan);
                        }
                        if (isEmpty(html)) {
                            html = " ";
                        }
                        tempDiv.html(html);
                        if (typeof(html) == "string") {
                            tempDiv.attr("title", html);
                        }
                    });
                    frozenTr.data(grid.dataRowName, v);
                    if ($.isFunction(grid.events.rowLoad)) {
                        grid.events.rowLoad.call(grid, frozenTr, v);
                    }
                    frozeBodyTrs.push(frozenTr);
                }
            });
        },
        initPager: function () {
            if (this.needPager && this.config.needFoot && !isEmpty(this.xUipager)) {
//                var length = this.dataSource.initData.length;
                var length = this.dataSource.fromData.length;
                this.xUipager.config.total = ($.isNumeric(length) ? length : 0);
                if(!isEmpty(this.dataSource.total)){
                	this.xUipager.config.total = this.dataSource.total;
                }
                this.xUipager.reload();
            }
            if (this.needPager && this.config.needFoot && isEmpty(this.xUipager)) {
                var pager = this.elements.pagerDiv = $("<div></div>");
                this.xUiPanel.addFooter(pager);
                this.pager.total = (!isEmpty(this.dataSource.total) ? this.dataSource.total : 0);
//                this.pager.total = (!isEmpty(this.dataSource.initData) ? this.dataSource.fromData.length : 0);
                this.xUipager = pager.xUipager(this.pager);
            }
        },
        createFrozeHeadTable: function () {
            var skin = xUi.skin.dataGrid;
            var frozeTd = this.elements.frozeTd;
            var frozeHeadTr = this.useElement.frozeHeadTr;
            var frozeHeadTable = this.elements.frozeHeadTable = $("<table></table>");
            var frozeHeadTbody = $("<tbody></tbody>");
            frozeHeadTable.addClass(skin.frozenHeadTable);
            frozeTd.append(frozeHeadTable.append(frozeHeadTbody.append(frozeHeadTr)));
        },
        createHeadTable: function () {
            var skin = xUi.skin.dataGrid;
            var twoTdabDiv = this.elements.headTrDiv;
            var headTable = this.elements.headTable = $("<table></table>");
            var headTbody = $("<tbody></tbody>");
            var headTr = this.useElement.headTr;
            twoTdabDiv.empty();
            headTable.addClass(skin.headTable);
            twoTdabDiv.parent().addClass(skin.headDivTable);
            twoTdabDiv.append(headTable.append(headTbody.append(headTr)));
        },
        createFrozeBody: function () {
            var grid = this;
            var skin = xUi.skin.dataGrid;
            var method = xUi.method.dataGrid;
            var gridTwoTr = this.elements.bodyTr;
            var bodyTrs = this.useElement.bodyTrs;
            var frozeBodyTrs = this.useElement.frozeHeadBodyTrs;
            var frozeBodyTd = this.useElement.frozeBodyTd = $("<td></td>");
            var frozeBodyTable = this.useElement.frozeBodyTable = $("<table></table>");
            var frozeBodyTbody = $("<tbody></tbody>");
            var warpDiv = $("<div></div>");
            var absoDiv = this.useElement.frozeBodyAbsDiv = $("<div></div>");
            warpDiv.addClass(skin.reDiv);
            absoDiv.addClass(skin.abDiv);
            absoDiv.css("width", "100%");
            warpDiv.addClass(skin.headDivTable);
            frozeBodyTable.addClass(skin.frozenTable);
            frozeBodyTd.addClass(skin.bodyFrozeTd);
            frozeBodyTable.append(frozeBodyTbody);
            frozeBodyTd.append(warpDiv.append(absoDiv.append(frozeBodyTable)));
            gridTwoTr.append(frozeBodyTd);
            if (grid.dynamicRow == true) {
                $.each(frozeBodyTrs, function (i, tr) {
                    tr.css({
                        height: bodyTrs[i].height()
                    })
                    frozeBodyTbody.append(tr);
                    method.bindTrEvent.call(grid, frozeBodyTrs, tr, i);
                });
            }
            else {
                $.each(frozeBodyTrs, function (i, tr) {
                    frozeBodyTbody.append(tr);
                    method.bindTrEvent.call(grid, frozeBodyTrs, tr, i);
                });
            }
        },
        createBody: function () {
            var grid = this;
            var method = xUi.method.dataGrid;
            var skin = xUi.skin.dataGrid;
            var bodyTrs = this.useElement.bodyTrs;
            var gridTwoTr = this.elements.bodyTr;
            var twoTdabDiv = this.elements.headTrDiv;
            var frozeBodyAbsDiv = this.useElement.frozeBodyAbsDiv;
            var bodyTd = this.useElement.bodyTd = $("<td></td>");
            var bodyTable = this.useElement.bodyTable = $("<table ></table>");
            var checkbox = this.useElement.totalCheck;
            if (checkbox && checkbox.length > 0) {
                checkbox[0].checked = true;
            }
            var bodyTbody = $("<tbody></tbody>");
            var warpDiv = $("<div></div>");
            var absoDiv = $("<div></div>");
            if (this.fitColumns == true) {
                bodyTable.css("width", "100%");
                absoDiv.css("width", "100%");
            }
            warpDiv.addClass(skin.reDiv);
            warpDiv.css("overflow", "auto");
            absoDiv.addClass(skin.abDiv);
            bodyTable.addClass(skin.bodyTable);
            bodyTd.addClass(skin.bodyTableTd);
            bodyTable.append(bodyTbody);
            bodyTd.append(warpDiv.append(absoDiv.append(bodyTable)));
            gridTwoTr.append(bodyTd);
            $.each(bodyTrs, function (i, tr) {
                bodyTbody.append(tr);
                method.bindTrEvent.call(grid, bodyTrs, tr, i);
            });
            method.initEnableMethod.call(this);
            warpDiv.scroll(function () {
                var scrollTop = $(this).scrollTop();
                var scrollLeft = $(this).scrollLeft();
                if (scrollTop >= 0) {
                    frozeBodyAbsDiv.css({top: (-scrollTop)});
                }
                if (scrollLeft >= 0) {
                    twoTdabDiv.css({left: (-scrollLeft)});
                }
            })
        },
        reloadBody: function () {
            var grid = this;
            var method = xUi.method.dataGrid;
            var bodyTrs = this.useElement.bodyTrs;
            var bodyTable = this.useElement.bodyTable;
            var frozeBodyTrs = this.useElement.frozeHeadBodyTrs;
            var frozeBodyTable = this.useElement.frozeBodyTable;
            var checkbox = this.useElement.totalCheck;
            if (checkbox && checkbox.length > 0) {
                checkbox[0].checked = true;
            }
            var bodyTbody = bodyTable.find("tbody");
            bodyTbody.empty();
            $.each(bodyTrs, function (i, tr) {
                bodyTbody.append(tr);
                method.bindTrEvent.call(grid, bodyTrs, tr, i);
            });
            if (!isEmpty(frozeBodyTable)) {
                var frozeBodyTbody = frozeBodyTable.find("tbody");
                frozeBodyTbody.empty();
                if (grid.dynamicRow == true) {
                    $.each(frozeBodyTrs, function (i, tr) {
                        tr.css({
                            height: bodyTrs[i].height()
                        })
                        frozeBodyTbody.append(tr);
                        method.bindTrEvent.call(grid, frozeBodyTrs, tr, i);
                    });
                } else {
                    $.each(frozeBodyTrs, function (i, tr) {
                        frozeBodyTbody.append(tr);
                        method.bindTrEvent.call(grid, frozeBodyTrs, tr, i);
                    });
                }
            }
        },
        bindCheckEvent: function () {
            var grid = this;
            var checkbox = this.useElement.totalCheck;
            var use = this.useElement;
            use.checkRows = {};
            if (checkbox && checkbox.length > 0) {
                checkbox.unbind("click");
                checkbox.bind("click", function () {
                    var bodyTrs = grid.useElement.bodyTrs;
                    var flag = this.checked;
                    if (flag) {
                        $.each(bodyTrs, function (i, v) {
                            $(v).attr("active", "true");
                            $(v).data(grid.dataRowName)['row.getCheck'] = true;
                            var rowData = $(this).data(grid.dataRowName);
                            use.checkRows[rowData['row.fieldId']] = rowData;
                            if ($(v).data(grid.dataRowName)["row.CheckDom"] != undefined) {
                                $(v).data(grid.dataRowName)["row.CheckDom"][0].checked = true;
                            }
                        });
                    } else {
                        use.checkRows = {};
                        $.each(bodyTrs, function (i, v) {
                            $(v).removeAttr("active");
                            $(v).data(grid.dataRowName)['row.getCheck'] = false;
                            if ($(v).data(grid.dataRowName)["row.CheckDom"] != undefined) {
                                $(v).data(grid.dataRowName)["row.CheckDom"][0].checked = false;
                            }
                        });
                    }
                })
            }
        },
        bindTrEvent: function (trs, tr, i) {
            var grid = this;
            var use = this.useElement;
            var checkbox = this.useElement.totalCheck;
            var dataRowName = $(tr).data(grid.dataRowName);
            if (dataRowName['row.getCheck'] == true) {
                $(tr).attr("active", "true");
                if (dataRowName["row.CheckDom"] != undefined) {
                    dataRowName["row.CheckDom"][0].checked = true;
                }
                grid.useElement.totalCheckFlag = true;
            } else {
                grid.useElement.totalCheckFlag = false;
                if (checkbox && checkbox.length > 0 && checkbox[0].checked) {
                    checkbox[0].checked = false;
                }
            }
            $(tr).attr("rowIndex", i);
//            $(tr).unbind();
            $(tr).bind("click", function (e) {
                var flag = $(this).data(grid.dataRowName)['row.getCheck'];
                if (grid.selectType != "none") {
                    if (grid.selectType == "single") {
                        $.each(trs, function (i, v) {
                            $(v).removeAttr("active");
                            use.checkRows = {};
                            $(v).data(grid.dataRowName)['row.getCheck'] = false;
                            if ($(v).data(grid.dataRowName)["row.CheckDom"] != undefined) {
                                $(v).data(grid.dataRowName)["row.CheckDom"][0].checked = false;
                            }
                        });
                    }
                    if (flag == true) {
                        $(this).removeAttr("active");
                        var rowData = $(this).data(grid.dataRowName);
                        rowData['row.getCheck'] = false;
                        use.selectRow = undefined;
                        delete use.checkRows[rowData['row.fieldId']];
                        if ($(this).data(grid.dataRowName)["row.CheckDom"] != undefined) {
                            $(this).data(grid.dataRowName)["row.CheckDom"][0].checked = false;
                        }
                        if (checkbox && checkbox.length > 0) {
                            checkbox[0].checked = false;
                        }
                    } else {
                        $(this).attr("active", "true");
                        $(this).data(grid.dataRowName)['row.getCheck'] = true;
                        var rowData = $(this).data(grid.dataRowName);
                        use.selectRow = rowData;
                        use.checkRows[rowData['row.fieldId']] = rowData;
//                    TODO
                        if ($(this).data(grid.dataRowName)["row.CheckDom"] != undefined) {
                            $(this).data(grid.dataRowName)["row.CheckDom"][0].checked = true;
                        }
                        if ($.isFunction(grid.events.onSelect)) {
                            grid.events.onSelect.call(grid, grid, rowData, $(this));
                        }
                        if (checkbox && checkbox.length > 0) {
                            var flg = true;
                            for (var i = 0; i < trs.length; i++) {
                                var ff = $(trs[i]).data(grid.dataRowName)['row.getCheck'];
                                if (ff != true) {
                                    flg = ff;
                                    break;
                                }
                            }
                            if (flg) {
                                checkbox[0].checked = true;
                            }
                        }
                    }
                }

            });
            if (grid.dynamicRow == true) {
                $(tr).on('resizeHeight.xUi', function (e, height) {
                    var frozeBodyTrs = grid.useElement.frozeHeadBodyTrs;
                    var index = Number($(this).attr("rowIndex"));
                    frozeBodyTrs[index].css({
                        height: height
                    })
                });
            }

        },
        createGrid: function (cfg) {
            this.elementId = "g" + Math.uuid(5);
            xUi.cache.grid[this.elementId] = this;
            var method = xUi.method.dataGrid
            method.extend.call(this, cfg);
            method.initEvents.call(this, cfg.events);
            method.createWarpDiv.call(this);
            method.initColnum.call(this);
            method.initData.call(this);
            method.initHeadTable.call(this);
            method.initBodyColnum.call(this);
            method.initCss.call(this);
            method.createFrozeHeadTable.call(this);
            method.createHeadTable.call(this);
            method.createFrozeBody.call(this);
            method.createBody.call(this);
            if ($.isFunction(this.events.afterCreate)) {
                this.events.afterCreate.call(this, this);
            }
            if (this.isShow) {
                method.doLayout.call(this);
                method.bindCheckEvent.call(this);
                method.bindResize.call(this);
                method.power.call(this);
            }
//            if ($.isFunction(this.events.afterInit)) {
//                debugger
//                this.events.afterInit.call(this, this);
//            }
        },
        initCss: function () {
            var css = this.useElement.realCss;
            var warpDiv = this.elements.gridWarpDiv;
            var styleDiv = this.useElement.styleDiv;
            if (isEmpty(styleDiv)) {
                styleDiv = this.useElement.styleDiv = $(document.createElement("div"));
                warpDiv.append(styleDiv);
            } else {
                styleDiv.empty();
            }
            var html = "";
            for (var c in css) {
                var obj = css[c];
                var style = $('<style type="text/css"></style>');
                style.attr("id", c);
                for (var o in obj) {
                    var val = parseInt(obj[o]);
                    if (!$.isNumeric(val)) {
                        val = 1;
                    }
                    html += "." + c + "{" + o + ":" + val + "px;}";
                }
                //兼容IE8
            }
            var x = document.createElement("div");
            x.innerHTML = 'x<style>' + html + '</style>';
            styleDiv[0].appendChild(x.lastChild);
        },
        bindResize: function () {
            var grid = this;
            var bodyTable = this.useElement.bodyTable;
            var twoTdabDiv = this.elements.headTrDiv;
            var boderWidth = parseInt(bodyTable.css("borderRightWidth"));
            boderWidth += parseInt(bodyTable.css("borderLeftWidth"));
            if (isEmpty(boderWidth)) {
                boderWidth = 0;
            }
            bodyTable.on('resizeElement.xUi', function (e, width, height) {
//                var tempWidth = width + boderWidth;
//                if (grid.power == true) {
//                    var $ovDiv = bodyTable.parent().parent();
//                    var ovDiv = $ovDiv[0];
//                    var scW = ovDiv.offsetWidth - ovDiv.clientWidth;
//                    if (scW == 0) {
//                        $ovDiv.css("overflow", "scroll");
//                        scW = ovDiv.offsetWidth - ovDiv.clientWidth;
//                        $ovDiv.css("overflow", "auto");
//                        if (scW > 0) {
//                            tempWidth = tempWidth - scW;
//                        }
//                    }
//                }
                twoTdabDiv.css("width", width);
//                twoTdabDiv.css("width", tempWidth);
                //防止冒泡
                e.stopPropagation();
                return false;
            });
        },
        power: function () {
            if (this.power == true) {
                var bodyTd = this.useElement.bodyTd;
                var frozeBodyTd = this.useElement.frozeBodyTd;
                var twoTd = this.useElement.headDivRelTd;
                var twoTdreDiv = this.useElement.headDivRel;
                var frozeTd = this.elements.frozeTd;
                twoTdreDiv.css("height", twoTd.height());
                frozeTd.css("height", twoTd.height());
                var warpDiv = this.elements.gridWarpDiv;
                var headTable = this.elements.headTable;
                var headTableHeight = headTable.height();
                bodyTd.children().css("height", warpDiv.height() - 1 - headTableHeight);
                frozeBodyTd.children().css("height", warpDiv.height() - 1 - headTableHeight);
                warpDiv.on('resizeElement.xUi', function (e, width, height) {
                    bodyTd.children().css("height", height - headTableHeight);
                    frozeBodyTd.children().css("height", height - headTableHeight);
                    e.stopPropagation();
                    return false;
                });
            }
        },
        doLayout: function () {
            var gridOneTr = this.elements.headTr;
            var frozeBodyTable = this.useElement.frozeBodyTable;
            var frozeBodyTd = this.useElement.frozeBodyTd;
            var bodyTd = this.useElement.bodyTd;
            if (this.frozenPosition == "right") {
                bodyTd.after(frozeBodyTd);
            }
            var frozeTd = this.elements.frozeTd;
            var frozeHeadTable = this.elements.frozeHeadTable;
            var bodyTable = this.useElement.bodyTable;
            var twoTdabDiv = this.elements.headTrDiv;
            var twoTd = this.useElement.headDivRelTd;
            var frozenCls = this.frozenCl;
            var frozeHeadTableWidth = frozeHeadTable.outerWidth();
            if (frozenCls.length < 1) {
                var bodyTd = this.useElement.bodyTd;
                var frozeTd = this.elements.frozeTd;
                var frozeBodyTd = this.useElement.frozeBodyTd;
                frozeBodyTd.hide();
                frozeTd.hide();
                bodyTd.css("width", "100%");
            }
            gridOneTr.css("height", parseInt(this.headHeight));
            twoTd.css("height", parseInt(this.headHeight));
            frozeTd.css("height", parseInt(this.headHeight));
            frozeTd.css("width", frozeHeadTableWidth);
            twoTdabDiv.css("height", "100%");
            twoTdabDiv.css("width", bodyTable.outerWidth());
            frozeBodyTd.css("width", frozeBodyTable.outerWidth());
            if (frozeBodyTable.find("td").length > 0) {
                var lastWidth = frozeBodyTable.find("tr").first().find("td").first().find("div").width()
                var index = frozeHeadTable.find("td[field=" + this.index.field + "]");
                index.find("div").css("width", lastWidth);
            }
        }
    }
})(jQuery, window);
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
            var xuishadowMain = this.elements.xuishadowMain = $(document.createElement("div"));
            xUishadow.addClass(skin.xUishadow);
            xUishadowWarp.addClass(skin.xUishadowWarp);
            xuishadowMain.addClass(skin.xuishadowMain);
            shadowDiv.append(xUishadow, xUishadowWarp);
            if (this.config.needTip == true) {
                xUishadowWarp.append(xuishadowMain);
                xuishadowMain.append(shadowImage, shadowSpan);
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
//dialog and Box
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
    if (!xUi.cache.dialog) {
        xUi.cache.dialog = {};
    }
    xUi.win = win;
    xUi.dialog = {};
    //便捷方法
    xUi.dialog.openIframe = function (opt) {
        if (!isEmpty(opt)) {
            var id = (opt.id == undefined) ? Math.uuid() : opt.id;
            var tempDiv, tempIframe;
            tempDiv = $(document.createElement("div"));
            tempDiv.attr("id", id);
            tempDiv.attr("title", (!isEmpty(opt.title) ? opt.title : ""));
            xUi.method.dialog.initSpace.call(this);
            xUi.space.append(tempDiv);
            tempIframe = $(document.createElement("iframe"));
            tempIframe.css({
                border: "none",
                height: "100%",
                width: "100%",
                outline: "none",
                display: "block",
                borderRadius: "4px",
                frameborder: "0"
            });
            tempDiv.append(tempIframe);
            tempIframe.attr("src", opt.url);
            if (opt.needFoot == undefined)opt.needFoot = false;
            if (opt.resize == undefined)opt.resize = false;
            tempDiv.xUiDialog(opt);
        }
    };
    xUi.dialog.boxIframe = function (opt) {
        if (!isEmpty(opt)) {
            var id = (opt.id == undefined) ? Math.uuid() : opt.id;
            var tempDiv, tempIframe;
            tempDiv = $(document.createElement("div"));
            tempDiv.attr("id", id);
            tempDiv.attr("title", (!isEmpty(opt.title) ? opt.title : ""));
            tempDiv.css(opt.style);
            xUi.method.dialog.initSpace.call(this);
            xUi.space.append(tempDiv);
            tempIframe = $(document.createElement("iframe"));
            tempIframe.css({
                border: "none",
                height: "100%",
                width: "100%",
                outline: "none",
                display: "block",
                borderRadius: "4px",
                frameborder: "0"
            });
            tempDiv.append(tempIframe);
            tempIframe.attr("src", opt.url);
            if (opt.needFoot == undefined)opt.needFoot = false;
//            if (opt.resize == undefined)opt.resize = false;
            opt.resize = false;
            tempDiv.xUiBox(opt);
        }
    };
    xUi.dialog.openContent = function (opt) {
        if (!isEmpty(opt)) {
            var id = (opt.id == undefined) ? Math.uuid() : opt.id;
            var tempDiv;
            tempDiv = $(document.createElement("div"));
            tempDiv.attr("id", id);
            tempDiv.attr("title", (!isEmpty(opt.title) ? opt.title : ""));
            xUi.method.dialog.initSpace.call(this);
            xUi.space.append(tempDiv);
            if (opt.needFoot == undefined)opt.needFoot = false;
            if (opt.resize == undefined)opt.resize = false;
            tempDiv.xUiDialog(opt);
        }
    };
    xUi.dialog.openBoxContent = function (opt) {
        if (!isEmpty(opt)) {
            var id = (opt.id == undefined) ? Math.uuid() : opt.id;
            var tempDiv;
            tempDiv = $(document.createElement("div"));
            tempDiv.attr("id", id);
            tempDiv.attr("title", (!isEmpty(opt.title) ? opt.title : ""));
            xUi.method.dialog.initSpace.call(this);
            xUi.space.append(tempDiv);
            if (opt.needFoot == undefined)opt.needFoot = true;
            if (opt.resize == undefined)opt.resize = false;
            tempDiv.xUiBox(opt);
        }
    };
    xUi.dialog.closeDialog = function (id) {
        var tempD = xUi.cache.dialog[id];
        if (tempD != undefined) {
            tempD.close();
            delete xUi.cache.dialog[id];
        }
    };
    xUi.dialog.hideDialog = function (id) {
        var tempD = xUi.cache.dialog[id];
        if (tempD != undefined) {
            tempD.hide();
        }
    };
    xUi.dialog.showDialog = function (id) {
        var tempD = xUi.cache.dialog[id];
        if (tempD != undefined) {
            tempD.show();
        }
    };
    xUi.dialog.confirm = function (message, successFnc, cancleFnc, opt) {
        var initMessage = function (id, message, icon) {
            var layoutSkin = xUi.skin.layout;
            var dialogSkin = xUi.skin.dialog;
            var table = $(document.createElement("table"));
            var tbody = $(document.createElement("tbody"));
            var tr = $(document.createElement("tr"));
            var tdOne = $(document.createElement("td"));
            var tdTwo = $(document.createElement("td"));
            var img = $(document.createElement("div"));
            var span = $(document.createElement("div"));
            img.addClass(dialogSkin.img);
            img.addClass(dialogSkin[icon]);
            table.append(tbody.append(tr));
            tr.append(tdOne, tdTwo);
            table.css({
                width: "100%",
                height: "100%",
                borderCollapse: "collapse"
            })
            tdOne.append(img).css({
                width: "28px",
                paddingLeft: "12px",
                paddingRight: "12px"
            });
            span.css({
                overflow: "hidden",
                wordBreak: "break-all"
            });

            tdTwo.append(span);
            tdTwo.attr("id", id + "td");
            span.attr("id", id + "span").html(message);
            return table
        }
        var option = {
            title: "提示",
            width: "320px",
            height: "165",
            closeModel: "close",
            needFoot: true,
            resize: false,
            draggable: false,
            needOkBtn: true,
            needCancleBtn: true,
            style: {
                body: {
                    overflow: 'hidden'
                }
            },
            okBtn: {
                id: "dBtn-" + Math.uuid(),
                title: "确定",
                className: "xui-btn xui-btn-blue xui-btn-radius btn-sm",
                handle: function () {
                    if (this.closeModel == "close") {
                        this.close();
                    } else {
                        this.hide();
                    }
                    if ($.isFunction(successFnc)) {
                        successFnc.call();
                    }
                }
            },
            cancleBtn: {
                id: "dBtn-" + Math.uuid(),
                title: "取消",
                className: "xui-btn xui-btn-red xui-btn-radius btn-sm",
                handle: function () {
                    if (this.closeModel == "close") {
                        this.close();
                    } else {
                        this.hide();
                    }
                    if ($.isFunction(cancleFnc)) {
                        cancleFnc.call();
                    }
                }
            }
        }
        $.extend(true, option, opt);
        var id = "confirmDialog";
        if ($("#" + id).length == 0) {
            option.id = id;
            var tempEvent = opt.events.afterCreate;
            option.events = {
                afterCreate: function () {
//                    var this_ = this;
                    var span = $("#" + id + "span");
                    var td = $("#" + id + "td");
                    var html = span.html();
                    span.html("");
                    var tdHeight = td.height();
                    td.css("height", tdHeight);
                    span.html(html);
                    if (span.height() > tdHeight) {
                        span.css("height", "100%");
                        span.css("overflow", "auto");
                    }
                    tempEvent.call(this);
                }
            };
            option.addClass = {
                head: ["panel-head-blue"],
                panel: ["panel-border-blue"]
            };
            option.content = initMessage(id, message, "info")
            xUi.dialog.openContent(option);
        } else {
            $("#" + id + "span").html(message);
            xUi.dialog.showDialog(id);
        }
    }
    xUi.dialog.boxConfirm = function (title, message, successFnc, cancleFnc, opt) {
        title = (isEmpty(title) ? "提示" : title);
        var option = {
            title: title,
            width: "320px",
            height: "165",
            closeModel: "close",
            needFoot: true,
            resize: false,
            draggable: false,
            needOkBtn: true,
            needCancleBtn: true,
            style: {
                body: {
                    overflow: 'hidden'
                }
            },
            okBtn: {
                id: "dBtn-" + Math.uuid(),
                title: "确定",
                className: "xui-btn xui-btn-blue xui-btn-radius btn-sm",
                handle: function () {
                    if (this.closeModel == "close") {
                        this.close();
                    } else {
                        this.hide();
                    }
                    if ($.isFunction(successFnc)) {
                        successFnc.call();
                    }
                }
            },
            cancleBtn: {
                id: "dBtn-" + Math.uuid(),
                title: "取消",
                className: "xui-btn xui-btn-opc xui-btn-radius btn-sm",
                handle: function () {
                    if (this.closeModel == "close") {
                        this.close();
                    } else {
                        this.hide();
                    }
                    if ($.isFunction(cancleFnc)) {
                        cancleFnc.call();
                    }
                }
            }
        }
        $.extend(true, option, opt);
        var id = Math.uuid();
        option.id = id;
        option.content = message;
        xUi.dialog.openBoxContent(option);
//        if ($("#" + id).length == 0) {
//            option.id = id;
//            option.content = message;
//            xUi.dialog.openBoxContent(option);
//        } else {
//            $("#" + id + "span").html(message);
//            xUi.dialog.showDialog(id);
//        }
    }
    xUi.dialog.messageBox = function (message, icon, opt) {
        icon = (isEmpty(icon) ? "" : icon);
        var initMessage = function (id, message, icon) {
            var layoutSkin = xUi.skin.layout;
            var dialogSkin = xUi.skin.dialog;
            var table = $(document.createElement("table"));
            var tbody = $(document.createElement("tbody"));
            var tr = $(document.createElement("tr"));
            var tdOne = $(document.createElement("td"));
            var tdTwo = $(document.createElement("td"));
            var img = $(document.createElement("div"));
            var span = $(document.createElement("div"));
            img.addClass(dialogSkin.img);
            img.addClass(dialogSkin[icon]);
            table.append(tbody.append(tr));
            tr.append(tdOne, tdTwo);
            table.css({
                width: "100%",
                height: "100%",
                borderCollapse: "collapse"
            })
            tdOne.append(img).css({
                width: "28px",
                paddingLeft: "12px",
                paddingRight: "12px"
            });
            span.css({
                overflow: "hidden",
                wordBreak: "break-all"
            })
            tdTwo.append(span);
            tdTwo.attr("id", id + "td");
            span.attr("id", id + "span").html(message);
            return table
        }
        var option = {
            title: "提示",
            width: "320px",
            height: "165",
            closeModel: "hide",
            needFoot: true,
            resize: false,
            needOkBtn: true,
            draggable: false,
            events: {
                afterCreate: function () {

                }
            },
            style: {
                body: {
                    overflow: 'hidden'
                }
            },
            power: true,
            okBtn: {
                id: "dBtn-" + Math.uuid(),
                title: "关闭",
                className: "xui-btn xui-btn-radius btn-sm",
                handle: function () {
                    if (this.closeModel == "close") {
                        this.close();
                    } else {
                        this.hide();
                    }
                }
            }
        }
        $.extend(true, option, opt);
        switch (icon) {
            case "info":
                var id = "infoDialog";
                if ($("#" + id).length == 0) {
                    option.id = id;
                    option.events.afterCreate = function (panel) {
                        var span = $("#" + id + "span");
                        var td = $("#" + id + "td");
                        var html = span.html();
                        span.html("");
                        var tdHeight = td.height();
                        td.css("height", tdHeight);
                        span.html(html);
                        if (span.height() > tdHeight) {
                            span.css("height", "100%");
                            span.css("overflow", "auto");
                        }
                    };
                    option.addClass = {
                        head: ["panel-head-lightblue"],
                        panel: ["panel-lightblue"]
                    };
                    option.okBtn.className += " xui-btn-lightblue";
                    option.content = initMessage(id, message, icon)
                    xUi.dialog.openContent(option);
                } else {
                    $("#" + id + "span").html(message);
                    xUi.dialog.showDialog(id);
                }
                break;
            case "alert":
                var id = "alertDialog";
                if ($("#" + id).length == 0) {
                    option.id = id;
                    option.events.afterCreate = function (panel) {
                        var span = $("#" + id + "span");
                        var td = $("#" + id + "td");
                        var html = span.html();
                        span.html("");
                        var tdHeight = td.height();
                        td.css("height", tdHeight);
                        span.html(html);
                        if (span.height() > tdHeight) {
                            span.css("height", "100%");
                            span.css("overflow", "auto");
                        }
                    };
                    option.title = "警告";
                    option.addClass = {
                        head: ["panel-head-orange"],
                        panel: ["panel-orange"]
                    };
                    option.okBtn.className += " xui-btn-orange";
                    option.content = initMessage(id, message, icon)
                    xUi.dialog.openContent(option);
                } else {
                    $("#" + id + "span").html(message);
                    xUi.dialog.showDialog(id);
                }
                break;
            case "error":
                var id = "errorDialog";
                if ($("#" + id).length == 0) {
                    option.id = id;
                    option.events.afterCreate = function (panel) {
                        var span = $("#" + id + "span");
                        var td = $("#" + id + "td");
                        var html = span.html();
                        span.html("");
                        var tdHeight = td.height();
                        td.css("height", tdHeight);
                        span.html(html);
                        if (span.height() > tdHeight) {
                            span.css("height", "100%");
                            span.css("overflow", "auto");
                        }
                    };
                    option.title = "错误";
                    option.addClass = {
                        head: ["panel-head-red"],
                        panel: ["panel-red"]
                    };
                    option.okBtn.className += " xui-btn-red";
                    option.content = initMessage(id, message, icon)
                    xUi.dialog.openContent(option);
                } else {
                    $("#" + id + "span").html(message);
                    xUi.dialog.showDialog(id);
                }
                break;
            case "success":
                var id = "successDialog";
                if ($("#" + id).length == 0) {
                    option.id = id;
                    option.events.afterCreate = function (panel) {
                        var span = $("#" + id + "span");
                        var td = $("#" + id + "td");
                        var html = span.html();
                        span.html("");
                        var tdHeight = td.height();
                        td.css("height", tdHeight);
                        span.html(html);
                        if (span.height() > tdHeight) {
                            span.css("height", "100%");
                            span.css("overflow", "auto");
                        }
                    };
                    option.title = "成功";
                    option.addClass = {
                        head: ["panel-head-green"],
                        panel: ["panel-green"]
                    };
                    option.okBtn.className += " xui-btn-green";
                    option.content = initMessage(id, message, icon)
                    xUi.dialog.openContent(option);
                } else {
                    $("#" + id + "span").html(message);
                    xUi.dialog.showDialog(id);
                }
                break;
            default :
                var id = "userDialog";
                if ($("#" + id).length == 0) {
                    option.id = id;
                    option.events.afterCreate = function (panel) {
                        var span = $("#" + id + "span");
                        var td = $("#" + id + "td");
                        var html = span.html();
                        span.html("");
                        var tdHeight = td.height();
                        td.css("height", tdHeight);
                        span.html(html);
                        if (span.height() > tdHeight) {
                            span.css("height", "100%");
                            span.css("overflow", "auto");
                        }
                    };
                    if (!isEmpty(icon)) {
                        option.title = icon;
                    }
                    option.okBtn.className += " xui-btn-blue";
                    option.content = initMessage(id, message, "info")
                    xUi.dialog.openContent(option);
                } else {
                    $("#" + id + "span").html(message);
                    xUi.dialog.showDialog(id);
                }
        }

    }
    xUi.dialog.boxMessage = function (title, message, icon, opt) {
        title = (isEmpty(title) ? "提示" : title);
        var option = {
            title: title,
            width: "320px",
            height: "155",
            closeModel: "close",
            needFoot: true,
            resize: false,
            needOkBtn: true,
            draggable: false,
            content: message,
            events: {
                afterCreate: function () {

                }
            },
            okBtn: {
                id: "dBtn-" + Math.uuid(),
                title: "关闭",
                className: "xui-btn xui-btn-radius btn-sm",
                handle: function () {
                    if (this.closeModel == "close") {
                        this.close();
                    } else {
                        this.hide();
                    }
                }
            }
        }
        $.extend(true, option, opt);
        switch (icon) {
            case "info":
                var id = "infoDialog";
                option.okBtn.className += " xui-btn-lightblue";
                xUi.dialog.openBoxContent(option);
                break;
            case "alert":
                var id = "alertDialog";
                option.id = id;
                option.okBtn.className += " xui-btn-orange";
                xUi.dialog.openBoxContent(option);
                break;
            case "error":
                var id = "errorDialog";
                option.id = id;
                option.okBtn.className += " xui-btn-red";
                xUi.dialog.openBoxContent(option);
                break;
            case "success":
                var id = "successDialog";
                option.id = id;
                option.okBtn.className += " xui-btn-green";
                xUi.dialog.openBoxContent(option);
                break;
            default :
                var id = "userDialog";
                option.id = id;
                option.okBtn.className += " xui-btn-blue";
                xUi.dialog.openBoxContent(option);
        }
    }
    xUi.dialog.box = function (opt) {
        var option = {
            title: "提示",
            width: "320px",
            height: "165",
            closeModel: "close",
            resize: false,
            needOkBtn: true,
            needCancleBtn: true,
            draggable: false,
            content: "",
            events: {
                afterCreate: function () {

                }
            },
            okBtn: {
                id: "dBtn-" + Math.uuid(),
                title: "确定",
                className: "xui-btn xui-btn-radius btn-sm xui-btn-blue",
                handle: function () {
                    if (this.closeModel == "close") {
                        this.close();
                    } else {
                        this.hide();
                    }
                }
            },
            cancleBtn: {
                id: "dBtn-" + Math.uuid(),
                title: "取消",
                className: "xui-btn xui-btn-opc xui-btn-radius btn-sm",
                handle: function () {
                    if (this.closeModel == "close") {
                        this.close();
                    } else {
                        this.hide();
                    }
                }
            }
        }
        $.extend(true, option, opt);
        xUi.dialog.openBoxContent(option);
    }
    $.fn.xUiDialog = function (key, opt) {
        var arr = $(this);
        arr.each(function (i, v) {
            var data = $(v).data("xui.xUiDialog");
            if (!isEmpty($(v)) && isEmpty(data)) {
                var xUiDialog = new xUi.content.dialog(key, $(v));
                xUiDialog.elements.dialog.data("xui.xUiDialog", xUiDialog);
            }
        });
    }
    $.fn.xUiBox = function (key, opt) {
        var arr = $(this);
        arr.each(function (i, v) {
            var data = $(v).data("xui.xUiDialog");
            if (!isEmpty($(v)) && isEmpty(data)) {
                var xUiDialog = new xUi.content.box(key, $(v));
                xUiDialog.elements.dialog.data("xui.xUiBox", xUiDialog);
            }
        });
    }

    //配置
    xUi.config.dialog = {
        id: undefined,
        title: undefined,
        width: 400,
        height: 300,
        minWidth: 150,
        minHeight: 100,
        zIndex: 5,
        type: 1,
        needFoot: true,
        model: true,//是否需要遮罩
        resize: true,//是否可托大拖小
        closeModel: "close",//关闭模式close(关闭),hide(隐藏)
        needOkBtn: false,
        needCancleBtn: false,
        okBtn: {
            id: "dBtn-" + Math.uuid(),
            title: "确定",
            className: "xui-btn xui-btn-blue xui-btn-radius btn-sm",
            handle: function () {

            }
        },
        cancleBtn: {
            id: "dBtn-" + Math.uuid(),
            title: "取消",
            className: "xui-btn xui-btn-red xui-btn-radius btn-sm",
            handle: function () {
                if (this.closeModel == "close") {
                    this.close();
                } else {
                    this.hide();
                }
                if ($.isFunction(this.events.afterClose)) {
                    this.events.afterClose.call(this);
                }
            }
        },
        draggable: true,
        style: {
            head: {
                height: "30px"
            },
            body: {
                overflow: 'auto'
            },
            foot: {
                height: "35px",
                border: "none"
            }
        },
        toolBar: [],
        content: undefined
    }
    //组件
    xUi.content.dialog = function (key, target) {
        this.config = {};
        this.elements = {}
        this.events = {}
        function init(target) {
            if (!isEmpty(target)) {
                this.id = target.attr("id");
                this.title = target.attr("title");
                target.removeAttr("title");
                var style = xUi.getStyle(target);
                this.config.height = style.height;
                this.config.width = style.width;
                this.config.style = style;
                this.content = target.children();
            }
        }

        function create(opt) {
            if (isEmpty(opt)) {
                opt = this.config;
            }
            xUi.method.dialog.initConfig.call(this, opt);
            xUi.method.dialog.initEvents.call(this, opt.events);
            xUi.method.dialog.initSpace.call(this);
            xUi.method.dialog.initDialog.call(this);
            xUi.method.dialog.initToolBar.call(this);
            xUi.method.dialog.doLayout.call(this);
            xUi.method.dialog.bindEvent.call(this);
            xUi.method.dialog.initEnableMethod.call(this);
            xUi.method.dialog.afterShow.call(this);
            if (this.id)
                xUi.cache.dialog[this.id] = this;
        }

        init.call(this, target);
        create.call(this, key);
    }
    xUi.content.box = function (key, target) {
        this.config = {};
        this.elements = {}
        this.events = {}
        function init(target) {
            if (!isEmpty(target)) {
                this.id = target.attr("id");
                target.removeAttr("id");
                this.title = target.attr("title");
                target.removeAttr("title");
                var style = xUi.getStyle(target);
                this.config.height = style.height;
                this.config.width = style.width;
                this.config.style = style;
                this.content = target.children();
            }
        }

        function create(opt) {
            if (isEmpty(opt)) {
                opt = this.config;
            }
            xUi.method.dialog.initConfig.call(this, opt);
            xUi.method.dialog.initEvents.call(this, opt.events);
            xUi.method.dialog.initSpace.call(this);
            xUi.method.dialog.initBox.call(this);
            xUi.method.dialog.initBoxToolBar.call(this);
            xUi.method.dialog.box_doLayout.call(this);
            xUi.method.dialog.initEnableMethod.call(this);
            xUi.method.dialog.box_afterShow.call(this);
            xUi.method.dialog.box_bindEvent.call(this);
            if (this.id)
                xUi.cache.dialog[this.id] = this;
        }

        init.call(this, target);
        create.call(this, key);
    }
    //定义可用事件
    xUi.events.dialog = {
        afterCreate: function (dialog) {

        },
        afterInitToolBar: function (dialog, toolbar) {

        },
        afterClose: function (dialog) {

        }
    }
    //添加需要的皮肤class
    xUi.skin.dialog = {
        xUiDialog: "xui-dialog",
        xUiDialogWarp: "xui-dialog-warp",
        xuiDialogMain: "xui-dialog-main",
        xuiBoxMain: "xui-dialog-box-main",
        xuiBoxWarpPo: "xui-dialog-box-xuiBoxWarpPo",
        xuiBoxClose: "xui-closeIcon",
        xuiBoxDragDiv: "xui-boxDragDiv",
        xuiBoxSpan: "xui-boxSpan",
        xuiBoxHtml: "xui-box-html",
        xuiBoxWarp: "xi-box-warp",
        xuiboxWarp: "xui-boxWarp",
        xuiBoxButton: "xui-box-button",
        shadow: "dialog-background",
        img: "message-img",
        info: "message-info",
        alert: "message-alert",
        error: "message-error",
        success: "message-success"
    };
    //定义创建方法
    xUi.method.dialog = {
        initConfig: function (cfg) {
            var config = $.extend(true, {}, xUi.config.dialog);
            $.extend(true, config, cfg);
            $.extend(true, this, config);
        },
        initEvents: function (ev) {
            var event = $.extend(true, {}, xUi.events.dialog);
            $.extend(true, event, ev);
            $.extend(true, this.events, event);
        },
        initEnableMethod: function () {
            var this_ = this;
            var method = xUi.method.dialog;
            var elements = this.elements;
            var enableMethod = {
                hide: function (flag) {
                    var dialogShadow = this_.elements.dialogShadow;
                    var dialogMain = this_.elements.dialogMain;
                    var dialog = this_.elements.dialog;
                    if (flag == true) {
                        dialogShadow.hide();
                        dialog.hide();
                    } else {
                        if (this.draggable == true && $.fn.draggable instanceof Function) {
                            var top = "3%"
                            dialogMain.animate({
                                top: top,
                                opacity: 0
                            }, 280, function () {
                                dialogShadow.hide();
                                dialog.hide();
                                dialogMain.css("opacity", "");
                            });
                        } else {
                            dialogMain.animate({
                                marginTop: "8%",
                                opacity: 0
                            }, 280, function () {
                                dialogShadow.hide();
                                dialog.hide();
                                dialogMain.css("marginTop", "3%");
                                dialogMain.css("opacity", "");
                            });
                        }
                    }
                },
                show: function () {
                    var dialogShadow = this_.elements.dialogShadow;
                    var dialog = this_.elements.dialog;
                    var dialogMain = this_.elements.dialogMain;
                    var panelSkin = xUi.skin.panel;
                    dialogShadow.show();
                    dialog.show();
                    dialogMain.addClass(panelSkin.opacity);
                    if (this.draggable == true && $.fn.draggable instanceof Function) {
                        var top = "13%";
                        dialogMain.css("top", "3%");
                        dialogMain.removeClass(panelSkin.opacity);
                        dialogMain.animate({
                            top: top
                        }, 280);
                    } else {
                        var top = "13%";
                        dialogMain.css("marginTop", "3%");
                        dialogMain.removeClass(panelSkin.opacity);
                        dialogMain.animate({
                            marginTop: top
                        }, 280);
                    }
                },
                close: function () {
                    var dialog = this_.elements.dialog;
                    var dialogMain = this_.elements.dialogMain;
                    if (this.draggable == true && $.fn.draggable instanceof Function) {
                        var top = "3%"
                        dialogMain.animate({
                            top: top,
                            opacity: 0
                        }, 280, function () {
                            dialog.remove();
                        });
                    } else {
                        dialogMain.animate({
                            marginTop: "8%",
                            opacity: 0
                        }, 280, function () {
                            dialog.remove();
                        });
                    }
                }
            };
            for (var met in enableMethod) {
                if (this[met] == undefined && $.isFunction(enableMethod[met])) {
                    this[met] = $.proxy(enableMethod[met], this_)
                }
            }
        },
        bindEvent: function () {
            var this_ = this;
            var panel = this.xUiPanel;
            var dialog = this.elements.dialog;
            var dialogShadow = this.elements.dialogShadow;
            panel.elements.panelClose.show();
            panel.elements.panelClose.bind("click", function () {
                if (this_.closeModel == "close") {
                    this_.close();
                } else {
                    this_.hide();
                }
            })
        },
        box_bindEvent: function () {
            var this_ = this;
            var dialog = this.elements.dialog;
            var els = this.elements;
            var dialogShadow = this.elements.dialogShadow;
            var dialogMain = this.elements.dialogMain;
            var boxHtml = this.elements.boxHtml;
            var boxWarp = els.boxWarp;
            var boxWarpPo = els.boxWarpPo;
            var closeIcon = this.elements.closeIcon;
            closeIcon.unbind();
            closeIcon.bind("click", function () {
                if (this_.closeModel == "close") {
                    this_.close();
                } else {
                    this_.hide();
                }
                if ($.isFunction(this_.events.afterClose)) {
                    this_.events.afterClose.call(this_);
                }
            });
//            TODO 窗口一直初始化

//            boxWarpPo.on("resizeElement.xuiBox", function (e, width, height) {
//                if (boxWarp.height() > height) {
//                    var cz = boxWarp.height() - height;
//                    var mainheight = dialogMain.height();
//                    dialogMain.animate({
//                        height: (cz + mainheight + 2)
//                    }, 300)
//                }
////                else{
////                    var boxSpan = els.boxSpan;
////                    boxWarp.height(height);
////                    if (!isEmpty(boxSpan)) {
////                        boxHtml.height(height - boxSpan.outerHeight());
////                    }
////                }
//                e.stopPropagation();
//                return false;
//            });
//            boxWarp.on("resizeElement.xuiBox", function (e, width, height) {
//                var proheight = boxWarpPo.height();
//                if (proheight == 0) {
//                    e.stopPropagation();
//                    return false;
//                }
//                if (height > proheight) {
//                    var cz = height - proheight;
//                    var mainheight = dialogMain.height();
//                    dialogMain.attr("oldHeight", mainheight);
//                    dialogMain.css({right: "", left: ""});
//                    if (this_.resize == true && $.fn.resizable instanceof Function) {
//                        dialogMain.animate({
//                            height: (cz + mainheight + 2)
//                        }, 200, function () {
//                            dialogMain.css(dialogMain.offset());
//                            dialogMain.css({right: "auto"});
//                        });
//                    } else {
//                        dialogMain.animate({
//                            height: (cz + mainheight + 2)
//                        }, 200);
//                    }
//                } else {
//                    if (this_.resize == true && $.fn.resizable instanceof Function) {
//                        dialogMain.css({right: "", left: ""});
//                        dialogMain.animate({
//                            height: Number(dialogMain.attr("oldHeight"))
//                        }, 200, function () {
//                            dialogMain.css(dialogMain.offset());
//                            dialogMain.css({right: "auto"});
//                        });
//                    } else {
//                        var cz = height - proheight;
//                        var mainheight = dialogMain.height();
//                        dialogMain.attr("oldHeight", height);
//                        dialogMain.css({right: "", left: ""});
//                        dialogMain.animate({
//                            height: (cz + mainheight + 2)
//                        }, 200);
//                    }
//                }
//                e.stopPropagation();
//                return false;
//            });

        },
        initSpace: function () {
            if ($("div.xuiSpace__").length == 0) {
                xUi.space = $(document.createElement("div"));
                xUi.space.addClass("xuiSpace__");
                $("body").append(xUi.space);
            }
        },
        initDialog: function () {
            var skin = xUi.skin.dialog;
            var panelSkin = xUi.skin.panel;
            var els = this.elements;
            var dialog = els.dialog = $(document.createElement("div"));
            var dialogWarp = els.dialogWarp = $(document.createElement("div"));
            var dialogMain = els.dialogMain = $(document.createElement("div"));
            var dialogShadow = els.dialogShadow = $(document.createElement("div"));
            dialog.addClass(panelSkin.opacity);
//            dialog.hide();
            dialog.addClass(skin.xUiDialog);
            dialogWarp.addClass(skin.xUiDialogWarp);
            dialogMain.addClass(skin.xuiDialogMain);
            dialogShadow.addClass(skin.shadow);

            xUi.space.append(dialog);
            dialog.append(dialogWarp);
            dialogWarp.append(dialogMain, dialogShadow);
            dialogShadow.hide();
            if (2 == Number(this.type)) {
                this.style.foot.height = "42px";
                $.extend(true, this.style.body, {
                    paddingTop: "0px",
                    paddingBottom: "6px",
                    paddingLeft: "6px",
                    paddingRight: "6px",
//                border: '1px solid #265B9B',
                    borderRadius: '6px',
                    borderBottom: "0px"
                })
                if (this.needFoot == true) {
                    $.extend(true, this.style.body, {
                        paddingBottom: "0px",
                        borderRadius: '6px 6px 0 0'
                    })
                }
            }
            var panel = $("#" + this.id).xUiPanel(this);
            this.xUiPanel = panel;
            this.target = panel.elements.panel;
            this.target.removeAttr("id");
            this.target.css({
                height: "100%",
                width: "100%"
            });
            dialog.attr("id", this.id);
            dialogMain.append(this.target);
        },
        initBox: function () {
            var skin = xUi.skin.dialog;
            var panelSkin = xUi.skin.panel;
            var els = this.elements;
            var dialog = els.dialog = $(document.createElement("div"));
            var dialogWarp = els.dialogWarp = $(document.createElement("div"));
            var dialogMain = els.dialogMain = $(document.createElement("div"));
            var dialogShadow = els.dialogShadow = $(document.createElement("div"));
            var boxWarp = els.boxWarp = $(document.createElement("div"));
            var boxWarpPo = els.boxWarpPo = $(document.createElement("div"));
            var boxDragDiv = els.boxDragDiv = $(document.createElement("div"));
            var boxHtml = els.boxHtml = $(document.createElement("div"));
            dialog.addClass(panelSkin.opacity);
//            dialog.hide();
            dialog.addClass(skin.xUiDialog);
            dialogWarp.addClass(skin.xUiDialogWarp);
            dialogMain.addClass(skin.xuiDialogMain);
            dialogMain.addClass(skin.xuiBoxMain);
            boxDragDiv.addClass(skin.xuiBoxDragDiv);
            dialogShadow.addClass(skin.shadow);
            boxWarp.addClass(skin.xuiboxWarp);
            boxHtml.addClass(skin.xuiBoxHtml);
            xUi.space.append(dialog);
            dialog.append(dialogWarp);
            dialogWarp.append(dialogMain, dialogShadow);
            dialogShadow.hide();
            dialog.attr("id", this.id);
            dialogMain.css(this.config.style);
            boxWarpPo.addClass(skin.xuiBoxWarpPo);
            var closeIcon = els.closeIcon = $(document.createElement("div"));
            closeIcon.html("×");
            closeIcon.addClass(skin.xuiBoxClose);
            dialogMain.append(boxDragDiv, closeIcon);
            var title = this.title;
            if (!isEmpty(title)) {
                var boxSpan = els.boxSpan = $(document.createElement("span"));
                boxSpan.html(title);
                if (!isEmpty(this.style) && !isEmpty(this.style.title)) {
                    boxSpan.css(this.style.title);
                }
                boxSpan.addClass(skin.xuiBoxSpan);
                boxWarp.append(boxSpan.append(boxDragDiv));
            }
            dialogMain.append(boxWarpPo.append(boxWarp.append(boxHtml)));

            var boxButton = els.boxButton = $(document.createElement("div"));
            boxButton.addClass(skin.xuiBoxButton);
            dialogMain.append(boxButton);

            var xuiBoxWarp = els.xuiBoxWarp = $(document.createElement("div"));
            xuiBoxWarp.addClass(skin.xuiBoxWarp);
            dialogMain.append(xuiBoxWarp);
        },
        initToolBar: function () {
            var this_ = this;
            var toolbars = this_.toolBar;
            var boxWarpPo = this.elements.boxWarpPo;
            var btnDiv = this.elements.btnDiv = $(document.createElement("div"));
            if (this_.needFoot == true) {
                this_.xUiPanel.addFooter(btnDiv);
                btnDiv.css({
                    overflow: "hidden",
                    textAlign: "right",
                    boxSizing: " border-box",
                    position: "absolute",
                    left: "0",
                    right: "0",
                    backgroundColor: "#F5F5F5",
                    borderRadius: " 0 0 4px 4px",
                    border: "1px solid transparent",
                    borderTopColor: "#ccc"
                });
                if (2 == Number(this.type)) {
                    btnDiv.css({
                        overflow: "hidden",
                        textAlign: "right",
                        boxSizing: " border-box",
                        position: "absolute",
                        left: "6px",
                        right: "6px",
                        backgroundColor: "#F5F5F5",
                        border: "1px solid transparent",
                        borderTopColor: "#ccc"
                    });
                }
                if (this_.needOkBtn == true) {
                    var ok = $('<button></button>');
                    ok.addClass(this_.okBtn.className);
                    ok.attr("id", this_.okBtn.id);
                    ok.attr("title", this_.okBtn.title);
                    ok.html(this_.okBtn.title);
                    ok.bind("click", function () {
                        this_.okBtn.handle.call(this_);
                    });
                    btnDiv.append(ok);
                }
                if (this_.needCancleBtn == true) {
                    var cancle = $('<button></button>');
                    cancle.addClass(this_.cancleBtn.className);
                    cancle.attr("id", this_.cancleBtn.id);
                    cancle.attr("title", this_.cancleBtn.title);
                    cancle.html(this_.cancleBtn.title);
                    cancle.bind("click", function () {
                        this_.cancleBtn.handle.call(this_);
                    });
                    btnDiv.append(cancle);
                }
                if (this_.needFoot == true && !isEmpty(toolbars)) {
                    $.each(toolbars, function (i, v) {
                        btnDiv.append(v);
                    });
                }
                this_.xUiPanel.doLayout();
            } else {
//                boxWarpPo.addClass("nofoot");
            }
        },
        initBoxToolBar: function () {
            var this_ = this;
            var toolbars = this_.toolBar;
            var boxButton = this_.elements.boxButton;
            var boxWarpPo = this.elements.boxWarpPo;
            if (this_.needFoot == true) {
                boxWarpPo.removeClass("nofoot");
                if (this_.needOkBtn == true) {
                    var ok = $('<button></button>');
                    ok.addClass(this_.okBtn.className);
                    ok.attr("id", this_.okBtn.id);
                    ok.attr("title", this_.okBtn.title);
                    ok.html(this_.okBtn.title);
                    ok.bind("click", function () {
                        this_.okBtn.handle.call(this_);
                    });
                    boxButton.append(ok);
                }
                if (!isEmpty(toolbars)) {
                    $.each(toolbars, function (i, v) {
                        boxButton.append(v);
                    });
                    if ($.isFunction(this.events.afterInitToolBar)) {
                        this.events.afterInitToolBar.call(this, this, toolbars);
                    }
                }
                if (this_.needCancleBtn == true) {
                    var cancle = $('<button></button>');
                    cancle.addClass(this_.cancleBtn.className);
                    cancle.attr("id", this_.cancleBtn.id);
                    cancle.attr("title", this_.cancleBtn.title);
                    cancle.html(this_.cancleBtn.title);
                    cancle.bind("click", function () {
                        this_.cancleBtn.handle.call(this_);
                    });
                    boxButton.append(cancle);
                }
            } else {
                boxWarpPo.addClass("nofoot");
            }
        },
        doLayout: function () {
            var this_ = this;
            var dialogMain = this.elements.dialogMain;
            var dialogShadow = this.elements.dialogShadow;
            dialogMain.css({
                height: this.height,
                width: this.width,
                zIndex: (this.zIndex ? this.zIndex : 5)
            });
            if (this.model == true) {
                dialogShadow.show()
            }
            if (this.draggable == true && $.fn.draggable instanceof Function) {
                dialogMain.draggable({
                    handle: this.xUiPanel.elements.panelHead
                });
            }
            if (this.resize == true && $.fn.resizable instanceof Function) {
                dialogMain.resizable({
                    start: function (a) {
                        this_.xUiPanel.shadowPanelNoWarp(true);
                    },
                    stop: function () {
                        this_.xUiPanel.shadowPanelNoWarp(false);
                    }
                });
            }
        },
        box_doLayout: function () {
            var this_ = this;
            var dialogMain = this.elements.dialogMain;
            var dialogShadow = this.elements.dialogShadow;
            dialogMain.css({
                height: this.height,
                width: this.width,
                minWidth: this.minWidth,
                minHeight: this.minHeight,
                zIndex: (this.zIndex ? this.zIndex : 5)
            });
            if (this.model == true) {
                dialogShadow.show()
            }
            if (this.draggable == true && $.fn.draggable instanceof Function) {
                dialogMain.draggable({
                    handle: this_.elements.boxSpan
                });
            }
            if (this.resize == true && $.fn.resizable instanceof Function) {
                dialogMain.resizable({
                    start: function (a) {
                        this_.elements.xuiBoxWarp.show();
                    },
                    stop: function () {
                        this_.elements.xuiBoxWarp.hide();
                    }
                });
            }
        },
        afterShow: function () {
            var dialog = this.elements.dialog;
            var panelSkin = xUi.skin.panel;
            var panel = this.xUiPanel;
            panel.replaceBody(this.content);
            if (this.draggable == true && $.fn.draggable instanceof Function) {
                this.elements.dialogMain.css(this.elements.dialogMain.offset());
                this.elements.dialogMain.css({
                    right: "auto",
                    bottom: "auto",
                    marginTop: "0"
                });
            }
            if ($.isFunction(this.events.afterCreate)) {
                this.events.afterCreate.call(this);
            }
            dialog.removeClass(panelSkin.opacity);
            this.hide(true);
            this.show();
        },
        box_afterShow: function () {
            var dialog = this.elements.dialog;
            var boxHtml = this.elements.boxHtml;
            var els = this.elements;
            var dialogMain = this.elements.dialogMain;
            var boxWarp = els.boxWarp;
            var boxWarpPo = els.boxWarpPo;
            var panelSkin = xUi.skin.panel;
            boxHtml.empty().append(this.content);
//            var proheight = boxWarpPo.height();
//            if (boxWarp.height() > proheight) {
//                var cz = boxWarp.height() - proheight;
//                var mainheight = dialogMain.height();
//                dialogMain.height((cz + mainheight + 2));
//            } else {
//                var boxSpan = els.boxSpan;
//                var proheight = boxWarpPo.height();
//                boxWarp.height(proheight);
//                if (!isEmpty(boxSpan)) {
////                    boxHtml.css({
////                       minHeight:proheight - boxSpan.outerHeight()
////                    });
//                }
//            }
            if (this.draggable == true && $.fn.draggable instanceof Function) {
                this.elements.dialogMain.css(this.elements.dialogMain.offset());
                this.elements.dialogMain.css({
                    right: "auto",
                    bottom: "auto",
                    marginTop: "0"
                });
            }
            if ($.isFunction(this.events.afterCreate)) {
                this.events.afterCreate.call(this);
            }
            dialog.removeClass(panelSkin.opacity);
            this.hide(true);
            this.show();
        }
    }
    //自动初始化
    $(document).ready(function () {

    })
})(jQuery, window);
//validinput
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
    xUi.content.validinput = function (option) {
        this.elements = {};
        this.config = {};
        this.events = {};
        function create(option) {
            xUi.method.validinput.initSpace.call(this);
            xUi.method.validinput.initConfig.call(this, option);
            xUi.method.validinput.initEvents.call(this, option.events);
            xUi.method.validinput.initValid.call(this);
            xUi.method.validinput.bindEvent.call(this);
            xUi.method.validinput.initEnableMethod.call(this);
        }

        create.call(this, option)
    }
    //定义可用事件
    xUi.events.validinput = {
        afterCreate: function (input) {

        }
    }
    //皮肤
    xUi.skin.validinput = {
        xuiValid: "xui-valid",
        xuiValidBox: "xui-validBox",
        xuiValidArrow: "xui-valid-arrow",
        xuiVliDiv: "xui-xuiVliDiv",
        xuiValidaTitle: "xui-valid-title",
        xuiValidaMessage: "xui-valid-message",
        opcaHide: "opacHide",
        error: "input-error"
    }
    //初始化配置
    xUi.config.validinput = {
        place: "bottom",
        needTitle: true,
        title: "错误提示",
        validMsg: "校验不通过",
        passMsg: "校验通过",
        tipMsg: "",
        icon: "fa fa-exclamation-circle"
//        icon: "icon-exclamation-sign"
    }
    //绑定窗口事件
    $(window).resize(function () {
        $("input" + "." + xUi.skin.validinput.xuiValid).each(function (i, v) {
            var data = $(this).data("xui.valid");
            if (!isEmpty(data)) {
                data.hide();
                var config = data.config;
                var target = config.target;
                target.removeClass(xUi.skin.validinput.error);
            }
        });
        $("textarea" + "." + xUi.skin.validinput.xuiValid).each(function (i, v) {
            var data = $(this).data("xui.valid");
            if (!isEmpty(data)) {
                data.hide();
                var config = data.config;
                var target = config.target;
                target.removeClass(xUi.skin.validinput.error);
            }
        });
    });
//    页面点击关闭
    $(document).mousedown(function (e) {
        var data = $(e.target).data("xui.valid");
        if (isEmpty(data)) {
            $("input" + "." + xUi.skin.validinput.xuiValid).each(function (i, v) {
                var data = $(this).data("xui.valid");
                if (!isEmpty(data)) {
                    data.hide();
                }
            });
            $("textarea" + "." + xUi.skin.validinput.xuiValid).each(function (i, v) {
                var data = $(this).data("xui.valid");
                if (!isEmpty(data)) {
                    data.hide();
                }
            });
        }
    });
    //组件方法
    xUi.method.validinput = {
        initConfig: function (cfg) {
            var config = $.extend(true, {}, xUi.config.validinput);
            $.extend(true, config, cfg);
            $.extend(true, this.config, config);
        },
        initEvents: function (ev) {
            var event = $.extend(true, {}, xUi.events.validinput);
            $.extend(true, event, ev);
            $.extend(true, this.events, event);
        },
        initEnableMethod: function () {
            var this_ = this;
            var method = xUi.method.validinput;
            var elements = this.elements;
            var enableMethod = {
                hide: function () {
                    elements.valiBox.hide();
                },
                valid: function (regs) {
                    var valid = this;
                    var config = this.config;
                    var method = xUi.method.validinput;
                    var elements = valid.elements;
                    var target = config.target;
                    var skin = xUi.skin.validinput;
                    if (!isEmpty(regs)) {
                        var obj = method.initReg.call(valid, regs, target);
                        if (obj.flag == false) {
                            target.addClass(skin.error);
                            elements.valiBox.append(elements.icon);
                            elements.message.empty();
                            elements.message.append(elements.icon, obj.message);
                            method.doLayout.call(valid);
                        }
                        else {
                            target.removeClass(skin.error);
                            elements.valiBox.hide();
                        }
                        return obj;
                    }
                    else {
                        var obj = method.initReg.call(valid, config.regs, target);
                        if (obj.flag == false) {
                            target.addClass(skin.error);
                            elements.valiBox.append(elements.icon);
                            elements.message.empty();
                            elements.message.append(elements.icon, obj.message);
                            method.doLayout.call(valid);
                        }
                        else {
                            target.removeClass(skin.error);
                            elements.valiBox.hide();
                        }
                        return obj;
                    }
                }
            };
            for (var met in enableMethod) {
                if (this[met] == undefined && $.isFunction(enableMethod[met])) {
                    this[met] = $.proxy(enableMethod[met], this_)
                }
            }
        },
        initSpace: function () {
            if ($("div.xuiSpace__").length == 0) {
                xUi.space = $(document.createElement("div"));
                xUi.space.addClass("xuiSpace__");
                $("body").append(xUi.space);
            }
        },
        initReg: function (regs, target) {
            var config = this.config;
            var validArr, str, reg, sp;
            validArr = [];
            var inReg = function (strArr) {
                var valid = {
                    flag: false,
                    message: config.validMsg
                };
                if (typeof (strArr) == "object") {
                    var val = target.val();
                    if (strArr.test(val) == true) {
                        valid.flag = true;
                        valid.message = config.passMsg;
                    }
                }
                else {
                    str = strArr.split("-");
                    reg = str[0];
                    if (str.length > 1) {
                        sp = str[1];
                    }
                    switch (reg) {
                        case "need":
                            var val = target.val();
                            if (!isEmpty(val)) {
                                valid.flag = true;
                                valid.message = config.passMsg;
                            }
                            break;
                        case "max":
                            var val = target.val();
                            var num = Number(sp);
                            if (isEmpty(val) || (!isEmpty(val) && val.length < num)) {
                                valid.flag = true;
                                valid.message = config.passMsg;
                            }
                            break;
                        case"min":
                            var val = target.val();
                            var num = Number(sp);
                            if (!isEmpty(val) && val.length > num) {
                                valid.flag = true;
                                valid.message = config.passMsg;
                            }
                            break;
                        default :
                            break;
                    }
                }
                validArr.push(valid);
            }
            if (!isEmpty(regs)) {
                if (typeof (regs) == "string") {
                    inReg(regs);
                } else {
                    $.each(regs, function (i, strArr) {
                        inReg(strArr)
                    });
                }
            }
            var vd = {
                flag: true,
                message: config.passMsg
            };
            $.each(validArr, function (i, v) {
                if (v.flag == false) {
                    vd = v;
                    vd.tipMsg = config.tipMsg;
                    return false;
                }
            });
            return vd;
        },
        initValid: function () {
            var skin = xUi.skin.validinput;
            var config = this.config;
            var target = config.target;
            var valiBox = this.elements.valiBox = $(document.createElement("div"));
            var valiDiv = this.elements.valiDiv = $(document.createElement("div"));
            var Arrow = this.elements.arrow = $(document.createElement("div"));
            var message = this.elements.message = $(document.createElement("div"));
            var icon = this.elements.icon = $(document.createElement("i"));

            valiBox.addClass(skin.xuiValidBox, skin.opcaHide);
            Arrow.addClass(skin.xuiValidArrow);
            valiDiv.addClass(skin.xuiVliDiv);
            message.addClass(skin.xuiValidaMessage);
            icon.attr('class', config.icon);

            target.before(valiDiv);
            valiDiv.append(target);
            valiDiv.append(valiBox);
            valiBox.append(Arrow, message);
            message.append(icon);
            valiBox.hide();
        },
        bindEvent: function () {
            var valid = this;
            var config = this.config;
            var method = xUi.method.validinput;
            var elements = valid.elements;
            var target = config.target;
            var skin = xUi.skin.validinput;
            target.bind("blur.xui", function () {
                var obj = method.initReg.call(valid, config.regs, target);
                if (obj.flag == false) {
                    target.addClass(skin.error);
                    elements.valiBox.append(elements.icon);
                    elements.message.empty();
                    elements.message.append(elements.icon, obj.message);
                    method.doLayout.call(valid);
                }
                else {
                    target.removeClass(skin.error);
                    elements.valiBox.hide();
                }
            });
            target.bind("focus.xui", function () {
                target.removeClass(skin.error);
                elements.valiBox.hide();
            });
            //TODO
//            target.bind("resizeElement.xui", function (e, width, height) {
//                target.removeClass(skin.error);
//                elements.valiBox.hide();
//            });
        },
        doLayout: function () {
            var config = this.config;
            var method = xUi.method.validinput;
            var place = config.place;
            method[place].call(this, config.target);
        },
        top: function (target) {
            var elements = this.elements;
            var skin = xUi.skin.validinput;
            var valiBox, valiBoxOffset, boxLeft, boxTop, targetOffset, left, top;
            valiBox = elements.valiBox;
            valiBox.addClass(skin.opcaHide);
            valiBox.show();
            valiBox.css({top: 0, left: 0});
            valiBoxOffset = valiBox.position();

            if (target.position().top > (valiBox.outerHeight() + 10)) {
                valiBox.removeClass("bottom");
                valiBox.addClass("top");
                boxLeft = valiBoxOffset.left;
                boxTop = valiBoxOffset.top;
                targetOffset = target.offset();
                left = targetOffset.left - boxLeft;
                top = targetOffset.top - boxTop - valiBox.outerHeight();
                valiBox.css({
                    top: top,
                    left: left
                });
                valiBox.removeClass(skin.opcaHide);
            }
            else {
                valiBox.removeClass("top");
                valiBox.addClass("bottom");
                boxLeft = valiBoxOffset.left;
                boxTop = valiBoxOffset.top;
                targetOffset = target.offset();
                left = targetOffset.left - boxLeft;
                top = targetOffset.top - boxTop + target.outerHeight();
                valiBox.css({
                    top: top,
                    left: left
                });
                valiBox.removeClass(skin.opcaHide);
            }
        },
        bottom: function (target) {
            var elements = this.elements;
            var skin = xUi.skin.validinput;
            var valiBox, valiBoxOffset, boxLeft, boxTop, targetOffset, left, top, winh;
            valiBox = elements.valiBox;
            valiBox.addClass(skin.opcaHide);
            valiBox.show();
            valiBox.css({top: 0, left: 0});
//            valiBoxOffset = valiBox.position();
//            if (win.innerHeight != undefined) {
//                winh = win.innerHeight;
//            } else {
//                var a = document.body;
//                var b = document.documentElement;
//                winh = Math.min(b.clientHeight, a.clientHeight);
//            }
//            var wh = winh - (target.position().top + target.outerHeight());
//            if (wh > (valiBox.outerHeight() + 10)) {
//                valiBox.removeClass("top");
//                valiBox.addClass("bottom");
//                boxLeft = valiBoxOffset.left;
//                boxTop = valiBoxOffset.top;
//                targetOffset = target.offset();
//                left = targetOffset.left - boxLeft;
//                top = targetOffset.top - boxTop + target.outerHeight();
//                valiBox.css({
//                    top: top,
//                    left: left
//                });
//                valiBox.removeClass(skin.opcaHide);
//            }
//            else {
//                valiBox.removeClass("bottom");
//                valiBox.addClass("top");
//                boxLeft = valiBoxOffset.left;
//                boxTop = valiBoxOffset.top;
//                targetOffset = target.offset();
//                left = targetOffset.left - boxLeft;
//                top = targetOffset.top - boxTop - valiBox.outerHeight();
//                valiBox.css({
//                    top: top,
//                    left: left
//                });
//                valiBox.removeClass(skin.opcaHide);
//            }
            valiBox.css({
                top: "",
                left: ""
            });
            valiBox.removeClass("top");
            valiBox.addClass("bottom");
            valiBox.removeClass(skin.opcaHide);
        },
        ready: function () {
            var data = $(this).data("xui.valid");
            if (!isEmpty(data)) {
                return data;
            } else {
                var option = xUi.getXUIOPT($(this).data(XUIOPT));
                var regs = $(this).data("regs");
                var validMsg = $(this).data("validmsg");
                var passmsg = $(this).data("passmsg");
                if (!isEmpty(validMsg)) {
                    option['validMsg'] = validMsg;
                }
                if (!isEmpty(passmsg)) {
                    option['passMsg'] = passmsg;
                }
                $(this).removeAttr("data-regs");
                option.regs = eval(regs);
                option.target = $(this);
                var lay = new xUi.content.validinput(option);
                $(this).data("xui.valid", lay);
            }
        }
    }
    //自动初始化
    $(document).ready(function () {
        $("input" + "." + xUi.skin.validinput.xuiValid).each(function (i, v) {
            xUi.method.validinput.ready.call(this, v);
        });
        $("textarea" + "." + xUi.skin.validinput.xuiValid).each(function (i, v) {
            xUi.method.validinput.ready.call(this);
        });
    })
})(jQuery, window);
