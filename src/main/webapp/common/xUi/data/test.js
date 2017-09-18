function disabled(cmp) {
    $(cmp).attr("disabled", "disabled");
}
xUi.config.layout.distance = 0;
function enabled(cmp) {
    $(cmp).removeAttr("disabled");
}
var initGrid = function(opt, skin, callback) {
    var opts = {
        isEdit : false,
        gridId : "",
        params : {},
        toolAlign : "left",
        url : "",
        isCheck : true,
        isFoot : true,
        isPager : true,
        isToolbar : true,
        autoCreate : true,
        pager : { // 分页配置
            pageType : 0
            // 分页方式 1 动态分页，0 静态分页
        },
        bindSelect : undefined,
        columns : [],
        tools : [],
        onCreateSuccess : undefined
    }
    var callback = {};
    var init = function(opt) {
        for (var i in opts) {
            if (!isEmpty(opt[i]))
                opts[i] = opt[i];
        }
        if (opts.columns.length > 0) {
            var u = 0;
            while (u < opts.columns.length) {
                var cl = opts.columns[u];
                if (!isEmpty(cl.width)) {
                    if ($.isNumeric(cl.width)) {
                        cl.width = cl.width + "px";
                    }
                }
                u++
            }
        }
        if (opts.bindSelect && !isEmpty(opts.columns)) {
            var se = $("#" + opts.bindSelect);
            enabled(se);
            var fopt = $('<option id="dhselect" value="false">请选择</option>');
            se.empty();
            se.append(fopt);
            var count = 0;
            for (var i = 0; i < opts.columns.length; i++) {
                var data = opts.columns[i];
                var need = data['needSearch'];
                need = (isEmpty(need)) ? true : need;
                if (need) {
                    var option = $('<option value="' + data['field'] + '">'
                        + data['title'] + '</option>');
                    if (data['selected']) {
                        if (count == 0) {
                            count++;
                            option.attr("selected", "selected");
                        }
                    }
                    option.data("data", data);
                    se.append(option);
                }
            }
        }
    }
    var create = function() {
        // 加载过滤
        callback.loadFilter = function(datas) {
            // 数据对象
            return datas;
        };
        // 创建完成
        if (!isEmpty(opt.onCreateSuccess))
            callback.onCreateSuccess = opt.onCreateSuccess;
        new skynetGrid($("#" + opts.gridId), opts, callback, skin);
    }
    init(opt);
    create();
}

$(document).ready(function() {
    if (isEmpty(navigator.userAgent.toLowerCase().match(/chrome/))) {
        skynetDialog.through({
            id: "msg",
            content: "<table style='width:100%;height:100%;'>"
                + "<tr>"
                + "<td style='width:32px;'>"
                + "<image src=\"" + getUIPath() + "/images/dialog/warning.png?t=" + Math.random() + "\" class=\"skynetMessager\" />"
                + "</td>"
                + "<td>"
                + "<div style='text-align:left;margin-left: 15px;'>"
                + "<table>"
                + "<tr>"
                + "<th>警告！请使用专用浏览器进行访问！</th>"
                + "</tr>"
                + "<tr>"
                + "<td>在其他浏览器下（IE,FireFox,Safari,360等)可能出现显示或功能不正常！</td>"
                + "</tr>"
                + "<tr>"
                + "<td><a style='font-size: 15px;text-decoration: underline;' href='ftp://a:a@10.166.7.238/chrome/ChromeStandalone_44.0.2403.130_Setup.1438755492.exe'>ChromeV44浏览器下载</a></td>"
                + "</tr>"
                + "<table>"
                + "</div>"
                + "</td>"
                + "</tr>"
                + "<table>",
            width: 500,
            height: 120,
            ok: function (here) {
                return true;
            }
        });
    }
    $("#wcccx").click(function() {
        var t = $(this);
        var querykey = $("#wwcgridcx").val()
        var option = $($("#wwcgridcx")[0].selectedOptions)
        var optionData = option.data('data');
        var queryParams = $("#wwcquerys").val();
        var gridA = skynetgrid("wwcgrid");
        var checked=$("#wdbinput").val();
        disabled(t);
        if (querykey != "false") {
            gridA.search({
                zdm : querykey,
                checked:checked,
                param : queryParams
            });
            $("#wwcquerys").html("");
        }
        setTimeout(function() {
            enabled(t);
            t.addClass("btn-submit");
        }, 2000);
    })
    $("#btnmh2").click(function() {
        var cz = $(this).attr("vd");
        var t = $(this);
        var querykey = $("#sslect").val();
        var ppselect = $("#ppselect").val()
        var option = $($("#sslect")[0].selectedOptions)
        var optionData = option.data('data');
        var queryParams = $("#queryParams").val();
        var gridA = skynetgrid("SecondGrid");
        disabled(t);
        if (querykey != "false" && !isEmpty(queryParams)) {
            var url = "../dbtool/getFzsj";
            gridA.option.url = url;
            gridA.search({
                paramt : querykey,
                sim:ppselect,
                param : queryParams,
                cx : cz
            });
            $("#ylcxdiv").html("");
        } else if (!isEmpty(totalQueryAData) && isEmpty(queryParams)) {
            gridA.load({
                paramt : JSON.stringify(totalQueryAData),
                cx : cz
            });
        }
        setTimeout(function() {
            enabled(t);
            t.addClass("btn-submit");
        }, 2000);
    });
    $("#saveBtn").on("click", function() {
        var grid = skynetGrid("wwcgrid");
        grid.option.saveUrl = "../dbtool/saveGrid"; // 保存url
        var params = "";
        params = JSON.stringify(grid.fn("getChangeData"));
        grid.callback.onLoadSuccess = undefined;
        var val = grid.option.params['tname']
        $.ajax({
            url : grid.option.saveUrl,
            type : grid.option.method,
            data : {
                param : params,
                tname : val
            },
            dataType : "json",
            beforeSend : function() {
                createMsgShadow($("#mainDiv"), {
                    initShow : true,
                    shadowType : "relative"
                })
            },
            complete : function() {
                $("#mainDiv").skynetShadowBox("hide");
            },
            success : function(obj) {
                var datas = null;
                if (typeof(obj) === "string") {
                    try {
                        datas = JSON.parse(obj);
                    } catch (e) {
                        alert("非标准json数据");
                        return false;
                    }
                } else {
                    datas = obj;
                }
                grid.search({
                    tname : val
                });
            }
        });
    });
    var wwcGrid = function() {
        var opt = {
            url : "../dbmore/getWwcTable",
            gridId : "wwcgrid",
            isEdit : true,
            isToolbar : false,
            // toolAlign: "right",
            pager : { // 分页配置
                pageType : 0, // 分页方式 1 动态分页，0 静态分页
                rows : 9,
                sizeArray : [9, 10, 20, 30, 40]
                // 页大小可选范围
            },
            // tools: [savebtn],
            isCheck : false,
            columns : [{
                field : 'cz',
                title : '操作',
                width : 90,
                rowAlign : "center",
                thAlign : "center",
                columnEdit : false,
                formatter : function(val, row, index) {
                    var span = $("<span></span>");
                    var a = $("<a href=\"javscript:void(0)\">" + "对标" + "</a>");
                    var b = $("<a href=\"javscript:void(0)\">" + "待定" + "</a>");
                    var c = $("<a href=\"javscript:void(0)\">" + "值域" + "</a>");
                    var rows = row;
                    var ind = index;
                    var id = Math.uuid();
                    a.attr("id", id);
                    a.click(function() {
                        var grid = skynetGrid("SecondGrid");
                        $(this).parent().click();
                        totalQueryA = {};
                        totalQueryAData = {};
                        $("#queryParams").val("");
                        $("#queryParams").val(row['zdsm']);
                        $("#btnmh2").click();
                        var zdm = rows['zdm'];
                        $("#tableTTF_Head").find("th").each(function() {
                            var ht = $(this).children().html()
                            ht = ht.toUpperCase();
                            zdm = zdm.toUpperCase();
                            if (ht == zdm) {
                                this.scrollIntoView();
                            }
                        })
                    })
                    b.click(function () {
                        var grid = skynetgrid("wwcgrid");
                        $(this).parents("tr").first().click();
                        var sr = grid.fn("getSelectRow");
                        var srfield = sr['fieldId'];
                        for (var y in sr) {
                            if(y=="tname"||y=="bsm"||y=="zdm"||y=="zdsm"||y=="zdlx"||y=="zdcd"){
                                continue;
                            }
                            sr[y] = "";
                        }
                        sr['bzxid'] = "a";
                        grid.fn("changeRow", srfield,sr);
                    })
                    c.click(function() {
                        var tname = rows.tname;
                        var yhm = rows.yhm;
                        var rname = rows.zdm;
                        tname = tname.replace("BZ_", "");
                        tname = yhm + "." + tname;
                        openDialog('../dbmore/dbMoreDialog?tname='
                            + tname + '&rname=' + rname
                            + '', '值域', 600, 320)
                    })
                    span.append(a);
                    span.append("|");
                    span.append(b);
                    span.append("|");
                    span.append(c);
                    return span;
                }
            }, {
                field : 'tname',
                title : '表名称',
                width : 155,
                rowAlign : "left",
                columnEdit : false
            }, {
                field : 'bsm',
                title : '表说明',
                width : 155,
                rowAlign : "left",
                columnEdit : false
            }, {
                field : 'zdm',
                title : '字段名',
                width : 105,
                rowAlign : "left",
                columnEdit : false
            }, {
                field : 'zdsm',
                title : '字段说明',
                width : 185,
                rowAlign : "left",
                columnEdit : false
            }, {
                field : 'zdlx',
                title : '类型',
                width : 75,
                rowAlign : "left",
                columnEdit : false
            }, {
                field : 'zdcd',
                title : '长度',
                width : 45,
                rowAlign : "left",
                columnEdit : false
            }, {
                field : 'sjxbsf',
                title : '数据项标识符',
                width : 105,
                rowAlign : "left",
                columnEdit : false
            }, {
                field : 'sjxmc',
                title : '数据项',
                width : 190,
                rowAlign : "left",
                columnEdit : false
            }, {
                field : 'sjynbbsf',
                title : '数据元标识符',
                width : 95,
                rowAlign : "center",
                columnEdit : false,
                formatter : function(val, row, index) {
                    var a = $('<a href="http://sjygl.kx.ga/jsp/cx/sjcx_sjydetail.action?sjyId='
                        + val + '" target="_blank">' + val + '</a>');
                    return a;
                }
            }, {
                field : 'sjyzwmc',
                title : '数据元',
                width : 190,
                rowAlign : "center",
                columnEdit : false,
                selfAttr : {
                    "reg" : "number"
                }
            }, {
                field : 'xdcnbbs',
                title : '限定词标识符',
                width : 94,
                rowAlign : "center",
                thAlign : "center",
                columnEdit : false,
                formatter : function(val, row, index) {
                    var a = $('<a href="http://sjygl.kx.ga/jsp/cx/sjcx_xdcdetail.action?xdcid='
                        + val + '" target="_blank">' + val + '</a>');
                    return a;
                }
            }, {
                field : 'xdczwmc',
                title : '限定词',
                width : 190,
                rowAlign : "center",
                thAlign : "center",
                columnEdit : false
            }, {
                field : 'bzxid',
                title : '数据项编号',
                width : 210,
                rowAlign : "center",
                thAlign : "center",
                columnEdit : false
            }]
        }
        initGrid(opt);
    }
    var ssGrid = function() {
        var opt2 = {
            url : "../dbtool/getGrids?type=empty",
            gridId : "SecondGrid",
            isToolbar : false,
            bindSelect : "sslect",
            pager : { // 分页配置
                pageType : 0, // 分页方式 1 动态分页，0 静态分页
                rows : 5,
                sizeArray : [5, 10, 20, 30, 40]
                // 页大小可选范围
            },
            columns : [{
                field : 'cz',
                title : '操作',
                width : 40,
                rowAlign : "center",
                thAlign : "center",
                needSearch : false,
                columnEdit : false,
                formatter : function(val, row, index) {
                    var a = $("<a href=\"###\">" + "选择" + "</a>");
                    a.click(function() {
                        var grid = skynetgrid("wwcgrid");
                        var sr = grid.fn("getSelectRow");
                        if (!isEmpty(sr)) {
                            var srfield = sr['fieldId'];
                            for (var y in sr) {
                                if(y=="tname"||y=="bsm"||y=="zdm"||y=="zdsm"||y=="zdlx"||y=="zdcd"){
                                    continue;
                                }
                                sr[y] = row[y]
                            }
                            sr['bzxid'] = row['id'];
                            sr['fieldId'] = srfield;
                            grid.fn("changeRow", sr['fieldId'],sr);
                            var newTr=$("tr[fieldid='" + sr['fieldId'] + "']");
                            newTr.click();
                        } else {
                            skynetDialog.msg("请先选择一个需要绑定的字段",
                                "info");
                        }
                    });
                    return a;
                }
            },

                {
                    field : 'sjxbsf',
                    title : '数据项标识符',
                    width : 115,
                    rowAlign : "left",
                    columnEdit : false
                }, {
                    field : 'sjxmc',
                    title : '数据项',
                    width : 185,
                    rowAlign : "left",
                    selected : true,
                    columnEdit : false
                },                    {
                    field: 'sm',
                    title: '数据项说明',
                    width: 100,
                    rowalign: "left",
                    selected: true,
                    columnEdit: false
                },{
                    field : 'sjynbbsf',
                    title : '数据元标识符',
                    width : 95,
                    rowAlign : "center",
                    columnEdit : false,
                    formatter : function(val, row, index) {
                        var a = $('<a href="http://sjygl.kx.ga/jsp/cx/sjcx_sjydetail.action?sjyId='
                            + val + '" target="_blank">' + val + '</a>');
                        return a;
                    }
                }, {
                    field : 'sjyzwmc',
                    title : '数据元',
                    width : 85,
                    rowAlign : "left",
                    columnEdit : false,
                    selfAttr : {
                        "reg" : "string"
                    }
                }, {
                    field : 'sjytymc',
                    title : '同义词',
                    width : 105,
                    rowAlign : "left",
                    columnEdit : false
                }, {
                    field : 'sjysjlx',
                    title : '类型',
                    width : 115,
                    rowAlign : "left",
                    columnEdit : false
                }, {
                    field : 'sjybsgs',
                    title : '长度',
                    width : 65,
                    rowAlign : "center",
                    columnEdit : false
                }, {
                    field : 'xdcnbbs',
                    title : '限定词标识符',
                    width : 85,
                    rowAlign : "center",
                    thAlign : "center",
                    columnEdit : false,
                    formatter : function(val, row, index) {
                        var a = $('<a href="http://sjygl.kx.ga/jsp/cx/sjcx_xdcdetail.action?xdcid='
                            + val + '" target="_blank">' + val + '</a>');
                        return a;
                    }
                }, {
                    field : 'xdczwmc',
                    title : '限定词',
                    width : 105,
                    rowAlign : "center",
                    thAlign : "center",
                    columnEdit : false
                }, {
                    field : 'id',
                    title : '数据项编号',
                    rowAlign : "left",
                    width : 235,
                    columnEdit : false
                }

            ]
        };
        initGrid(opt2);
    }
    wwcGrid();
    ssGrid();
});
