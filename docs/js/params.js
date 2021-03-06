jQuery && (function($){
    function Params (options, settings, func) {
        var args = arguments;
        var _func = func;
        var defaultSettings = {
            muilt: true,
            addEvent: true
        }
    
        if (typeof args[1] === 'function') {
            _func = args[1];
            settings = {}
        }
        this.settings = settings = $.extend({}, defaultSettings, settings instanceof Object ? settings : {});
        this.options = options || {};
        this.func = _func;
    
        if (!settings.muilt) {
            this.offEvent(this.options);
        }
        this.params = this.collect(true);
        return this;
    }
    Params.prototype = {
        constructor: Params,
        offEvent: function (options) {
            var self = this;
            options = options || self.options;
            var elms = self.getList(options.form || '');
            $.each(elms, function(index, item) {
                $("[name='" + item + "']").off("input change", self.bindParams);
            });
            return elms.length > 0;
        },
        format: function (params){
            var name;
            var self = this;
            var str = '';
            var json = {};
            var list = [];
            var param = [];
            if ($.isArray(params)) {
                list = params;
            } else if (params instanceof Object) {
                list = [params];
            }
            $.each(list, function(index, item){
                $.each(item, function(key, value){
                    if (item.hasOwnProperty("name") && item.hasOwnProperty("value")) {
                        if (key != 'name') return false;
                        key = item.name;
                        value = item.value;
                    }
                    param.push({
                        name: key,
                        value: value
                    });
                    json[key] = value;
                    str += "&" + key + "=" + value;
                });
            });
            return {
                param: param,
                str: str,
                json: json
            };
        },
        urlParam: function (name, url){
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
            var r = (url || window.location.search.substr(1)).match(reg);
            if (r != null) return unescape(r[2]); return null;
        },
        query: function(type, item) {
            return {
                'var': window[item],
                cookie: $.cookie ? $.cookie(item) : '',
                text: $(item).text(),
                data: $(item).data("value"),
                url: this.urlParam(item),
                form: $("[name='" + item + "']").val()
            }[type];
        },
        collect: function (init) {
            var self = this;
            var result = {};
            var param = [];
            var str = '';
            var json = {};
            var name;
            var value;
            var options = this.options;
            $.each(options, function(type, data){
                $.each(self.getList(data), function(index, item){
                    if (type == 'param') {
                        var temp = self.format(item);
                        param = param.concat(temp.param);
                        str += temp.str;
                        $.extend(json, temp.json);
                        return true;
                    }
                    if (type == 'text' || type == 'data') {
                        name = $(item).data("name");
                        // ???????????? data name, ?????????????????????
                        if (!name) {
                            return true;
                        }
                    } else {
                        name = item;
                    }
                    value = self.query(type, item);
                    // ???name, value????????????
                    self.realValue(type, name, item, value, function(name, value){
                        str += "&" + name + "=" + value;
                        json[name] = value;
                        param.push({
                            name: name,
                            value: value
                        });
                        if (init && self.settings.addEvent && type == 'form') {
                            $("[name='" + name + "']").on("input change", self.bindParams = function(){
                                self.func && self.func(self.collect());
                            });
                        }
                    });
                });
            });
            var result = {
                param: param,
                str: str.slice(1),
                json: json
            };
            init && self.func && self.func(result);
            return result;
        },
        getList: function (list){
            var result = [];
            if (typeof list === 'string') {
                result = list.split(",");
            } else if ($.isArray(list)) {
                result = list;
            } else if (list instanceof Object) {
                result = [list];
            }
            return result;
        },
        realValue: function(type, name, item, value, func) {
            var self = this;
            if (item instanceof Object) {
                $.each(item, function(key, val){
                    func && func(key, typeof val == 'function' ? val.call(self, type, key, item) : val);
                });
            } else {
                func && func(name, value);
            }
        },
        destroy: function(){
            this.offEvent();
            for(var key in this) {
                if (this.hasOwnProperty(key)) {
                    delete this[key];
                }
            }
        }
    }
    /**
     * ??????????????????
     * @func
     * @param {object} options ??????????????? 
     * @param {string|string[]|object[]} options.url ???url??????  
     * @param {string|string[]|object[]} options.form ?????????????????????(???name)   
     * @param {string|string[]|object[]} options.var ???????????????, ????????????window?????????????????????  
     * @param {string|string[]|object[]} options.cookie ???cookie?????????   
     * @param {string|string[]|object[]} options.text ??????????????????, ????????????????????????text(), ???????????????data-name   
     * @param {string|string[]|object[]} options.data ??????????????????, ????????????????????????data("value"), ???????????????data-name  
     * @param {object|object[]} options.param [{name:value}]/[{name: name, value: value}]???????????????, ???????????????????????????, ???????????????????????????, ???????????????[{name: name, value: value}]???????????????
     * @param {object=} settings ??????
     * @param {boolean=} settings.muilt ??????????????????????????????????????????  
     * @param {function=} func ??????????????????????????????   
     * @desc 
     * options????????????, ???param???, ????????????????????? 1. ????????? 2.????????? & ??????:??????/??? ???????????????, ???????????????, ???,??????
     */
    function myParams(options, settings, func){
        return new Params(options, settings,  func);
    }
    window.myParams = myParams;
})(jQuery);
