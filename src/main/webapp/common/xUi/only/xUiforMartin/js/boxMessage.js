/**
 * Created by Administrator on 16-5-13.
 */
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
            if (opt.needFoot == undefined)opt.needFoot = false;
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
                    setTimeout(function () {
                        if ($.isFunction(successFnc)) {
                            successFnc.call();
                        }
                    }, 0)
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
                    setTimeout(function () {
                        if ($.isFunction(cancleFnc)) {
                            cancleFnc.call();
                        }
                    }, 0)
                }
            }
        }
        $.extend(true, option, opt);
        var id = "confirmDialog";
        if ($("#" + id).length == 0) {
            option.id = id;
            option.content = message;
            xUi.dialog.openBoxContent(option);
        } else {
            $("#" + id + "span").html(message);
            xUi.dialog.showDialog(id);
        }
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
        xuiBoxButton: "xui-box-button",
        shadow: "dialog-background",
        img: "message-img",
        info: "message-info",
        alert: "message-alert",
        error: "message-error",
        success: "message-success",
        opacity: "panel-shadow-opacity"
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
                    var panelSkin = xUi.skin.messageBox();
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
            });
            boxWarpPo.on("resizeElement.xuiBox", function (e, width, height) {
                if (boxWarp.height() > height) {
                    var cz = boxWarp.height() - height;
                    var mainheight = dialogMain.height();
                    dialogMain.animate({
                        height: (cz + mainheight + 2)
                    }, 300)
                }
//                else{
//                    var boxSpan = els.boxSpan;
//                    boxWarp.height(height);
//                    if (!isEmpty(boxSpan)) {
//                        boxHtml.height(height - boxSpan.outerHeight());
//                    }
//                }
                e.stopPropagation();
                return false;
            });
            boxWarp.on("resizeElement.xuiBox", function (e, width, height) {
                var proheight = boxWarpPo.height();
                if (proheight == 0) {
                    e.stopPropagation();
                    return false;
                }
                if (height > proheight) {
                    var cz = height - proheight;
                    var mainheight = dialogMain.height();
                    dialogMain.attr("oldHeight", mainheight);
                    dialogMain.css({right: "", left: ""});
                    if (this_.resize == true && $.fn.resizable instanceof Function) {
                        dialogMain.animate({
                            height: (cz + mainheight + 2)
                        }, 200, function () {
                            dialogMain.css(dialogMain.offset());
                            dialogMain.css({right: "auto"});
                        });
                    } else {
                        dialogMain.animate({
                            height: (cz + mainheight + 2)
                        }, 200);
                    }
                } else {
                    if (this_.resize == true && $.fn.resizable instanceof Function) {
                        dialogMain.css({right: "", left: ""});
                        dialogMain.animate({
                            height: Number(dialogMain.attr("oldHeight"))
                        }, 200, function () {
                            dialogMain.css(dialogMain.offset());
                            dialogMain.css({right: "auto"});
                        });
                    } else {
                        var cz = height - proheight;
                        var mainheight = dialogMain.height();
                        dialogMain.attr("oldHeight", height);
                        dialogMain.css({right: "", left: ""});
                        dialogMain.animate({
                            height: (cz + mainheight + 2)
                        }, 200);
                    }
                }
                e.stopPropagation();
                return false;
            });

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
            var panelSkin = xUi.skin.messageBox();
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
            boxHtml.addClass(skin.xuiBoxHtml);
            xUi.space.append(dialog);
            dialog.append(dialogWarp);
            dialogWarp.append(dialogMain, dialogShadow);
            dialogShadow.hide();
            dialog.attr("id", this.id);
            boxWarpPo.addClass(skin.xuiBoxWarpPo);
            var closeIcon = els.closeIcon = $(document.createElement("div"));
            closeIcon.html("×");
            closeIcon.addClass(skin.xuiBoxClose);
            dialogMain.append(boxDragDiv, closeIcon);
            var title = this.title;
            if (!isEmpty(title)) {
                var boxSpan = els.boxSpan = $(document.createElement("span"));
                boxSpan.html(title);
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
            }
        },
        initBoxToolBar: function () {
            var this_ = this;
            var toolbars = this_.toolBar;
            var boxButton = this_.elements.boxButton;
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
            if (!isEmpty(toolbars)) {
                $.each(toolbars, function (i, v) {
                    boxButton.append(v);
                });
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
            var proheight = boxWarpPo.height();
            if (boxWarp.height() > proheight) {
                var cz = boxWarp.height() - proheight;
                var mainheight = dialogMain.height();
                dialogMain.height((cz + mainheight + 2));
            } else {
                var boxSpan = els.boxSpan;
                var proheight = boxWarpPo.height();
                boxWarp.height(proheight);
                if (!isEmpty(boxSpan)) {
                    boxHtml.height(proheight - boxSpan.outerHeight());
                }
            }
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