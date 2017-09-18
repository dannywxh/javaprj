xUi.config.layout.distance = 0;
$(document).ready(function () {
    var flag = 0;
    var dragBox = '<div name="dragBox" class="dragBox">'
        + '<div class="closeBtn">'
        + '<a href="javascript:void(0)" class="closeA"><i class="icon-remove"></i></a>'
        + '</div>' + '<div class="content">' + '</div>'
        + '</div>';
    //数据元、限定词初始化
    (function () {
        function loadItem(url, type, $element, id) {
            var po = $("#" + id).data("panel.xUi");
            po.shadowPanel(true);
            $element.empty();
            $.ajax({
                type: "POST",
                url: url,
                dataType: "json",
                success: function (data) {
                    if (!isEmpty(data)) {
                        $element.data(type == "data" ? "dataComponent" : "filterKey", data);
                        $.each(data, function (i, item) {
                            if (!isEmpty(item)) {
                                item.type = type;
                                var $elem = $(document.createElement("A"));
                                if (type == 'data') {
                                    $elem.attr("code", item['nbbsf']);
                                } else if (type == 'filter') {
                                    $elem.attr("code", item['nbbs']);
                                }
                                $elem.attr("bsf", item['bsf']);
                                $elem.attr("val", item['zwmc']);
                                $elem.addClass("list-group-item");
                                $elem.html(item['zwmc']);
                                $elem.data("selectData", item);
                                if (type == "data") {
                                    $elem.attr("href", "http://sjygl.kx.ga/jsp/cx/sjcx_sjydetail.action?sjyId="
                                        + (!isEmpty(item["nbbsf"]) ? item["nbbsf"] : ""));
                                } else {
                                    $elem.attr("href", "http://sjygl.kx.ga/jsp/cx/sjcx_xdcdetail.action?xdcid="
                                        + (!isEmpty(item["nbbs"]) ? item["nbbs"] : ""));
                                }
                                $elem.attr("target", "_blank");
                                $elem.draggable({
                                    appendTo: 'body',
                                    helper: function (event) {
                                        var $dragBox = $(dragBox);
                                        var data = $(this).data("selectData");
                                        $dragBox.data("selectData", data);
                                        $dragBox.find(".content").html(data['zwmc']);
                                        return $dragBox;
                                    }
                                });
                                po.shadowPanel(false);
                                $element.append($elem);
                            }
                        });
                    }
                    flag++;
                }});
        }

        loadItem("getDataComponent", "data", $("#dataComponent"), "pp1");
        loadItem("getFilterKey", "filter", $("#filterKey"), "pp2");
    })();
    //grid初始化
    (function () {
        $("#grid1").dataGrid({
            needHead: false,
            needCheck: false,
            needFoot: false,
            needPager: false,
            staticDatas: [], style: {toolbar: {height: "35px"}}, fitColumns: true, power: true, check: {frozen: false},
            events: {
                loadFilter: function (data) {
                    if (!isEmpty(data)) {
                        return data;
                    } else {
                        return[]
                    }
                },
                afterCreate: function (grid) {
                }
            },
            columns: [
                {field: 'sjxbsf', title: '数据项标识符', width: '160px', columnEdit: true},
                {field: 'sjxmc', title: '数据项名称', width: '160px', columnEdit: true},
                {field: 'sm', title: '数据项说明', width: '100px', columnEdit: true},
                {field: 'glsjy', title: '数据元标识符', width: '100px', columnEdit: false, formatter: function (row, val, fieldId) {
                    var $html = "";
                    if (!isEmpty(val)) {
                        $html = $(document.createElement("A"));
                        $html.html(val);
                        $html.attr("href", 'http://sjygl.kx.ga/jsp/cx/sjcx_sjydetail.action?sjyId='
                            + val);
                        $html.attr("target", '_blank');
                    }
                    return $html;
                }},
                {field: 'glsjymc', title: '数据元', width: '100px', columnEdit: false},
                {field: 'tyc', title: '同义词', width: '100px', columnEdit: false},
                {field: 'glxdc', title: '限定词标识符', width: '100px', columnEdit: false},
                {field: 'glxdcmc', title: '限定词', width: '100px', columnEdit: false}
            ]
        });
        $("#grid2").dataGrid({
            needHead: false,
            needCheck: false,
            needToolBar: true,
            needFoot: false,
            needPager: false,
            staticDatas: [], style: {toolbar: {height: "35px"}}, fitColumns: true, power: true, check: {frozen: false}, events: {loadFilter: function (data) {
                if (!isEmpty(data)) {
                    return data;
                } else {
                    return[]
                }
            }, afterCreate: function (grid) {
                var zxc = $("#zxc");
                grid.xUiPanel.addToolbar(zxc.show());
            }},
            power: true,
            columns: [
                {field: 'sjxbsf', title: '数据项标识符', width: '160px', columnEdit: false},
                {field: 'sjxmc', title: '数据项名称', width: '160px', columnEdit: false},
                {field: 'sm', title: '数据项说明', width: '100px', columnEdit: false},
                {field: 'glsjy', title: '数据元标识符', width: '100px', columnEdit: false,
                    formatter: function (row, val, fieldId) {
                        var $html = "";
                        if (!isEmpty(val)) {
                            $html = $(document.createElement("A"));
                            $html.html(val);
                            $html.attr("href", 'http://sjygl.kx.ga/jsp/cx/sjcx_sjydetail.action?sjyId='
                                + val);
                            $html.attr("target", '_blank');
                        }
                        return $html;
                    }},
                {field: 'glsjymc', title: '数据元', width: '100px', columnEdit: false},
                {field: 'tyc', title: '同义词', width: '100px', columnEdit: false},
                {field: 'glxdc', title: '限定词标识符', width: '100px', columnEdit: false},
                {field: 'glxdcmc', title: '限定词', width: '100px', columnEdit: false},
                {field: 'cz', title: '操作', width: '60px', columnEdit: false, isShowMore: false, formatter: function (row, val, fieldId) {
                    var grid = this;
                    var $html = $(document.createElement("A"));
                    $html.html("删除");
                    $html.click(function () {
                        grid.fn("removeRow", row.fieldId);
                    })
                    return $html;
                }}
            ]
        });
    })();
    //拖拽处理
    (function () {
        $("#cfg").droppable({
            drop: function (event, ui) {
                var $dragBox = $(dragBox);
                var data = ui.helper.data("selectData");
                $dragBox.data("selectData", data);
                $dragBox.find(".closeA").click(function () {
                    $dragBox.remove();
                    configUpdate();
                });
                var $html = "";
                if (!isEmpty(data['zwmc'])) {
                    $html = $(document.createElement("A"));
                    $html.html(data['zwmc']);
                    if (data.type == "data") {
                        $html.attr("href", "http://sjygl.kx.ga/jsp/cx/sjcx_sjydetail.action?sjyId="
                            + (!isEmpty(data["nbbsf"]) ? data["nbbsf"] : ""));
                    } else {
                        $html.attr("href", "http://sjygl.kx.ga/jsp/cx/sjcx_xdcdetail.action?xdcid="
                            + (!isEmpty(data["nbbs"]) ? data["nbbs"] : ""));
                    }
                    $html.attr("target", "_blank");
                }
                $dragBox.find(".content").html($html);
                if (data.type == "data") {
                    $(this).find('.dragBoxData').remove();
                    $dragBox.addClass("dragBoxData");
                } else {
                    $dragBox.addClass("dragBoxKeyWords");
                }
                $(this).append($dragBox);
                configUpdate();
            }
        });
        function configUpdate() {
            var grid1 = xUi.getGrid("grid1");
            if (isEmpty(grid1))
                return;
            var config = {sjxbsf: "", sjxmc: "", glsjy: "", glsjymc: "", tyc: "", glxdc: "", glxdcmc: ""};
            var beasData = null;
            if ($("#cfg").find("div[name='dragBox']").length > 0) {
                $("#cfgTip").hide();
            } else {
                $("#cfgTip").show();
            }
            $("#cfg").find("div[name='dragBox']").each(function () {
                var $dragBox = $(this);
                var data = $dragBox.data("selectData");
                if (isEmpty(data))
                    return true;
                if (data.type == "data") {
                    beasData = clone(data);
                } else if (data.type == "filter") {
                    if (!isEmpty(data['nbbs']))
                        config["glxdc"] += ","
                            + data['nbbs'];
                    if (!isEmpty(data['bsf']))
                        config["sjxbsf"] += "_"
                            + data['bsf'];
                    if (!isEmpty(data['zwmc']))
                        config["sjxmc"] += "_"
                            + data['zwmc'];
                }
            });
            if (!isEmpty(beasData) && !isEmpty(beasData['bsf']) && !isEmpty(beasData['zwmc'])) {
                !isEmpty(beasData['tymc']) && (config["tyc"] = beasData['tymc']);
                config["glsjy"] = beasData['nbbsf'];
                config["glsjymc"] = beasData['zwmc'];
                config["glxdcmc"] = config["sjxmc"];
                config["sjxbsf"] += "_" + beasData['bsf'];
                config["sjxmc"] += "_" + beasData['zwmc'];
                config["glxdc"] = config["glxdc"].replace(",", "");
                config["glxdcmc"] = config["glxdcmc"].replace("_", "");
                config["sjxbsf"] = config["sjxbsf"].replace("_", "");
                config["sjxmc"] = config["sjxmc"].replace("_", "");
//                grid1.option.loadData = {rows: [config]};
                grid1.removeData();
                grid1.prependRow(config);
            } else {
                grid1.removeData();
            }
        }
    })();
    //添加、保存处理
    (function () {
        $("#btnAdd").click(function () {
            var grid1 = xUi.getGrid("grid1");
            var grid2 = xUi.getGrid("grid2");
            if (!isEmpty(grid1) && !isEmpty(grid2)) {
                var data = clone(grid1.getData()[0]);
                if (!isEmpty(data)) {
                    if (isEmpty(data['sjxbsf']) || isEmpty(data['sjxmc'])) {
                        alert("请填写完整信息（数据项标识符、数据项名称）！！！");
                    }
                    else {
                        grid2.prependRow(data);
//                        grid1.removeData();
                    }
                } else
                    alert("不存在配置项，无法添加！！！");
            } else {
//                skynetDialog.msg("请确定组件加载完成！！！", "warning");
            }
        });
        $("#btnSave").click(function () {
            var grid2 = xUi.getGrid("grid2");
            var data = clone(grid2.getData());
            if(!isEmpty(data)){
                var saveUrl = "../dbtool/isHaveDataItemConfig";//保存url
                var keys = "";
                var k = 0, kmax = data.length;
                for (; k < kmax; k++) {
                    var item = data[k];
                    if (!isEmpty(item) && !isEmpty(item.sjxbsf)) {
                        keys += ","
                            + item.sjxbsf
                            + "_"
                            + item.sjxmc;
                    }
                }
                keys = keys.replace(",", "");
                var callback = function (obj) {
                    grid2.removeData();
                    xUi.shadow.hide($("body"))
                }
                var errcall = function () {
                    xUi.shadow.hide($("body"))
                }
                xUi.shadow.open($("body"));
                xUi.loadAjax(saveUrl, {"keys": keys}, callback)
            }
//            if (!isEmpty(grid2)) {
//                var data = clone(grid2.getData());
//                if (!isEmpty(data)) {
//                    var keys = "";
//                    var k = 0, kmax = data.length;
//                    for (; k < kmax; k++) {
//                        var item = data[k];
//                        if (!isEmpty(item) && !isEmpty(item.sjxbsf)) {
//                            keys += ","
//                                + item.sjxbsf
//                                + "_"
//                                + item.sjxmc;
//                        }
//                    }
//                    keys = keys.replace(",", "");
//                    $.post("isHaveDataItemConfig", {"keys": keys}, function (odata) {
//                        if (isEmpty(odata)) {
//                            grid2.fn("submit");
//                        } else {
//                            var i = 0;
//                            imax = odata.length;
//                            for (; i < imax; i++) {
//                                var item = odata[i];
//                                if (!isEmpty(item) && !isEmpty(item.sjxbsf)) {
//                                    var $tr = grid2.target.find("td[field='sjxbsf'][revalue='" + item.sjxbsf + "']").parent("tr");
//                                    var row = $tr.data("row.skynetGrid");
//                                    var id = row.fieldId;
//                                    row["isHave"] = "true";
//                                    grid2.fn("changeRow", id, row);
//                                }
//                            }
//                            skynetDialog.confirm("保存数据中，系统中已存在(重复项将不保存)，是否确定操作?", function () {
//                                grid2.fn("submit");
//                            });
//                        }
//                    }, "json");
//                } else{
////                    skynetDialog.msg("不存在数据项，无法保存！！！", "warning");
//                }
//            } else {
////                skynetDialog.msg("请确定组件加载完成！！！", "warning");
//            }
        });
    })();
    //静态搜索
    (function () {
        function staticSearch(val, key, $element) {
            var data = $element.data(key);
            if (isEmpty(val)) {
                $element.find("a").removeClass("active");
                $element.find("a").show();
            } else {
                if ($element.find("a[val*='" + val + "']").length > 0) {
                    $element.find("a").removeClass("active");
                    $element.find("a").hide();
                    $element.find("a[val*='" + val + "']:first").addClass("active");
                    $element.find("a[val*='" + val + "']").show();
                } else if ($element.find("a[bsf*='" + val + "']").length > 0) {
                    $element.find("a").removeClass("active");
                    $element.find("a").hide();
                    $element.find("a[bsf*='" + val + "']:first").addClass("active");
                    $element.find("a[bsf*='" + val + "']").show();
                } else if ($element.find("a[code*='" + val + "']").length > 0) {
                    $element.find("a").removeClass("active");
                    $element.find("a").hide();
                    $element.find("a[code*='" + val + "']:first").addClass("active");
                    $element.find("a[code*='" + val + "']").show();
                } else {
                    $element.find("a").removeClass("active");
                    $element.find("a").show();
                }
            }
        }

        var $Component = $("#dataComponent");
        var $filterKey = $("#filterKey");
        $("#dataPicker").keyup(function () {
            var $this = $(this);
            var val = $(this).val();
            staticSearch(val, "dataComponent", $Component);
        });
        $("#dataFilter").keyup(function () {
            var $this = $(this);
            var val = $(this).val();
            staticSearch(val, "filterKey", $filterKey);
        });
    })();
    var lisenner = setInterval(function () {
        if (flag == 4) {
            $("#btnAdd,#btnSave").show();
            $('div.container').skynetShadowBox("hide");
            clearInterval(lisenner);
        }
    }, 1000);
});