/*! =========================================================
 *
 * Material Dashboard PRO - V1.3.0
 *
 * =========================================================
 *
 * Copyright 2016 Creative Tim (http://www.creative-tim.com/product/material-dashboard-pro)
 *
 *
 *                       _oo0oo_
 *                      o8888888o
 *                      88" . "88
 *                      (| -_- |)
 *                      0\  =  /0
 *                    ___/`---'\___
 *                  .' \|     |// '.
 *                 / \|||  :  |||// \
 *                / _||||| -:- |||||- \
 *               |   | \\  -  /// |   |
 *               | \_|  ''\---/''  |_/ |
 *               \  .-\__  '-'  ___/-. /
 *             ___'. .'  /--.--\  `. .'___
 *          ."" '<  `.___\_<|>_/___.' >' "".
 *         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
 *         \  \ `_.   \_ __\ /__ _/   .-` /  /
 *     =====`-.____`.___ \_____/___.-`___.-'=====
 *                       `=---='
 *
 *     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 *
 *               Buddha Bless:  "No Bugs"
 *
 * ========================================================= */

(function () {
    isWindows = navigator.platform.indexOf('Win') > -1 ? true : false;

    // if (isWindows && !$('body').hasClass('sidebar-mini')){
    if (!$('body').hasClass('sidebar-mini')) {//cny_add


        // if we are on windows OS we activate the perfectScrollbar function
        $('.sidebar .sidebar-wrapper, .main-panel').perfectScrollbar();

        $('html').addClass('perfect-scrollbar-on');
    } else {
        $('html').addClass('perfect-scrollbar-off');
    }
})();


$(document).ready(function () {

    
    var breakCards = true;

    var searchVisible = 0;
    var transparent = true;

    var transparentDemo = true;
    var fixedTop = false;

    var mobile_menu_visible = 0,
        mobile_menu_initialized = false,
        toggle_initialized = false,
        bootstrap_nav_initialized = false;

    var seq = 0, delays = 80, durations = 500;
    var seq2 = 0, delays2 = 80, durations2 = 500;


    $sidebar = $('.sidebar');

    $.material.init();
    var md = {
        misc: {
            navbar_menu_visible: 0,
            active_collapse: true,
            disabled_collapse_init: 0,
        },
    
        checkSidebarImage: function () {
            $sidebar = $('.sidebar');
            image_src = $sidebar.data('image');
    
            if (image_src !== undefined) {
                sidebar_container = '<div class="sidebar-background" style="background-image: url(' + image_src + ') "/>';
                $sidebar.append(sidebar_container);
            }
        },
    
        initSliders: function () {
            // Sliders for demo purpose in refine cards section
            var slider = document.getElementById('sliderRegular');
    
            noUiSlider.create(slider, {
                start: 40,
                connect: [true, false],
                range: {
                    min: 0,
                    max: 100
                }
            });
    
            var slider2 = document.getElementById('sliderDouble');
    
            noUiSlider.create(slider2, {
                start: [20, 60],
                connect: true,
                range: {
                    min: 0,
                    max: 100
                }
            });
        },
    
        initSidebarsCheck: function () {
            if ($(window).width() <= 991) {
                if ($sidebar.length != 0) {
                    md.initRightMenu();
                }
            }
        },
    
        initMinimizeSidebar: function () {
    
            $('#minimizeSidebar').click(function () {
                var $btn = $(this);
    
                if (md.misc.sidebar_mini_active == true) {
                    $('body').removeClass('sidebar-mini');
                    md.misc.sidebar_mini_active = false;
                } else {
                    $('body').addClass('sidebar-mini');
                    md.misc.sidebar_mini_active = true;
                }
    
                // we simulate the window Resize so the charts will get updated in realtime.
                var simulateWindowResize = setInterval(function () {
                    window.dispatchEvent(new Event('resize'));
                }, 180);
    
                // we stop the simulation of Window Resize after the animations are completed
                setTimeout(function () {
                    clearInterval(simulateWindowResize);
                }, 1000);
            });
        },
    
        checkScrollForTransparentNavbar: debounce(function () {
            if ($(document).scrollTop() > 260) {
                if (transparent) {
                    transparent = false;
                    $('.navbar-color-on-scroll').removeClass('navbar-transparent');
                }
            } else {
                if (!transparent) {
                    transparent = true;
                    $('.navbar-color-on-scroll').addClass('navbar-transparent');
                }
            }
        }, 17),
    
    
        initRightMenu: debounce(function () {
            $sidebar_wrapper = $('.sidebar-wrapper');
    
            if (!mobile_menu_initialized) {
                $navbar = $('nav').find('.navbar-collapse').children('.navbar-nav.navbar-right');
    
                mobile_menu_content = '';
    
                nav_content = $navbar.html();
    
                nav_content = '<ul class="nav nav-mobile-menu">' + nav_content + '</ul>';
    
                navbar_form = $('nav').find('.navbar-form').get(0).outerHTML;
    
                $sidebar_nav = $sidebar_wrapper.find(' > .nav');
    
                // insert the navbar form before the sidebar list
                $nav_content = $(nav_content);
                $navbar_form = $(navbar_form);
                $nav_content.insertBefore($sidebar_nav);
                $navbar_form.insertBefore($nav_content);
    
                $(".sidebar-wrapper .dropdown .dropdown-menu > li > a").click(function (event) {
                    event.stopPropagation();
    
                });
    
                // simulate resize so all the charts/maps will be redrawn
                window.dispatchEvent(new Event('resize'));
    
                mobile_menu_initialized = true;
            } else {
                if ($(window).width() > 991) {
                    // reset all the additions that we made for the sidebar wrapper only if the screen is bigger than 991px
                    $sidebar_wrapper.find('.navbar-form').remove();
                    $sidebar_wrapper.find('.nav-mobile-menu').remove();
    
                    mobile_menu_initialized = false;
                }
            }
        }, 200),
    
    
        // initBootstrapNavbarMenu: debounce(function(){
        //
        //     if(!bootstrap_nav_initialized){
        //         $navbar = $('nav').find('.navbar-collapse').first().clone(true);
        //
        //         nav_content = '';
        //         mobile_menu_content = '';
        //
        //         //add the content from the regular header to the mobile menu
        //         $navbar.children('ul').each(function(){
        //             content_buff = $(this).html();
        //             nav_content = nav_content + content_buff;
        //         });
        //
        //         nav_content = '<ul class="nav nav-mobile-menu">' + nav_content + '</ul>';
        //
        //         $navbar.html(nav_content);
        //         $navbar.addClass('off-canvas-sidebar');
        //
        //         // append it to the body, so it will come from the right side of the screen
        //         $('body').append($navbar);
        //
        //         $toggle = $('.navbar-toggle');
        //
        //         $navbar.find('a').removeClass('btn btn-round btn-default');
        //         $navbar.find('button').removeClass('btn-round btn-fill btn-info btn-primary btn-success btn-danger btn-warning btn-neutral');
        //         $navbar.find('button').addClass('btn-simple btn-block');
        //
        //         bootstrap_nav_initialized = true;
        //     }
        // }, 500),
    
        startAnimationForLineChart: function (chart) {
    
            chart.on('draw', function (data) {
                if (data.type === 'line' || data.type === 'area') {
                    data.element.animate({
                        d: {
                            begin: 600,
                            dur: 700,
                            from: data.path.clone().scale(1, 0).translate(0, data.chartRect.height()).stringify(),
                            to: data.path.clone().stringify(),
                            easing: Chartist.Svg.Easing.easeOutQuint
                        }
                    });
                } else if (data.type === 'point') {
                    seq++;
                    data.element.animate({
                        opacity: {
                            begin: seq * delays,
                            dur: durations,
                            from: 0,
                            to: 1,
                            easing: 'ease'
                        }
                    });
                }
            });
    
            seq = 0;
        },
        startAnimationForBarChart: function (chart) {
    
            chart.on('draw', function (data) {
                if (data.type === 'bar') {
                    seq2++;
                    data.element.animate({
                        opacity: {
                            begin: seq2 * delays2,
                            dur: durations2,
                            from: 0,
                            to: 1,
                            easing: 'ease'
                        }
                    });
                }
            });
    
            seq2 = 0;
        }
    }
    

    md.initSidebarsCheck();

    if ($('body').hasClass('sidebar-mini')) {
        md.misc.sidebar_mini_active = true;
    }

    var window_width = $(window).width();

    // check if there is an image set for the sidebar's background
    md.checkSidebarImage();

    md.initMinimizeSidebar();

    //    Activate bootstrap-select
    if ($(".selectpicker").length != 0) {
        $(".selectpicker").selectpicker();
    }

    //  Activate the tooltips
    $('[rel="tooltip"]').tooltip();

    //removed class label and label-color from tag span and replaced with data-color
    var tagClass = $('.tagsinput').data('color');

    $('.tagsinput').tagsinput({
        tagClass: ' tag-' + tagClass + ' '
    });

    //    Activate bootstrap-select
    $(".select").dropdown({ "dropdownClass": "dropdown-menu", "optionClass": "" });

    $('.form-control').on("focus", function () {
        $(this).parent('.input-group').addClass("input-group-focus");
    }).on("blur", function () {
        $(this).parent(".input-group").removeClass("input-group-focus");
    });


    if (breakCards == true) {
        // We break the cards headers if there is too much stress on them :-)
        $('[data-header-animation="true"]').each(function () {
            var $fix_button = $(this)
            var $card = $(this).parent('.card');

            $card.find('.fix-broken-card').click(function () {
                console.log(this);
                var $header = $(this).parent().parent().siblings('.card-header, .card-image');

                $header.removeClass('hinge').addClass('fadeInDown');

                $card.attr('data-count', 0);

                setTimeout(function () {
                    $header.removeClass('fadeInDown animate');
                }, 480);
            });

            $card.mouseenter(function () {
                var $this = $(this);
                hover_count = parseInt($this.attr('data-count'), 10) + 1 || 0;
                $this.attr("data-count", hover_count);

                if (hover_count >= 20) {
                    $(this).children('.card-header, .card-image').addClass('hinge animated');
                }
            });
        });
    }

    // remove class has-error for checkbox validation
    $('input[type="checkbox"][required="true"], input[type="radio"][required="true"]').on('click', function () {
        if ($(this).hasClass('error')) {
            $(this).closest('div').removeClass('has-error');
        }
    });


$(document).on('click', '.navbar-toggle', function () {
    $toggle = $(this);

    if (mobile_menu_visible == 1) {
        $('html').removeClass('nav-open');

        $('.close-layer').remove();
        setTimeout(function () {
            $toggle.removeClass('toggled');
        }, 400);

        mobile_menu_visible = 0;
    } else {
        setTimeout(function () {
            $toggle.addClass('toggled');
        }, 430);

        var $layer = $('<div class="close-layer"></div>');

        if ($('body').find('.main-panel').length != 0) {
            $layer.appendTo(".main-panel");

        } else if (($('body').hasClass('off-canvas-sidebar'))) {
            $layer.appendTo(".wrapper-full-page");
        }

        setTimeout(function () {
            $layer.addClass('visible');
        }, 100);

        $layer.click(function () {
            $('html').removeClass('nav-open');
            mobile_menu_visible = 0;

            $layer.removeClass('visible');

            setTimeout(function () {
                $layer.remove();
                $toggle.removeClass('toggled');

            }, 400);
        });

        $('html').addClass('nav-open');
        mobile_menu_visible = 1;

    }

});

// activate collapse right menu when the windows is resized
$(window).resize(function () {
    md.initSidebarsCheck();

    // reset the seq for charts drawing animations
    seq = seq2 = 0;

    setTimeout(function () {
        // demo.initDashboardPageCharts();//cny_note
    }, 500);
});


});
// Returns a function, that, as long as it continues to be invoked, will not
// be triggered. The function will be called after it stops being called for
// N milliseconds. If `immediate` is passed, trigger the function on the
// leading edge, instead of the trailing.

function debounce(func, wait, immediate) {
    var timeout;
    return function () {
        var context = this, args = arguments;
        clearTimeout(timeout);
        timeout = setTimeout(function () {
            timeout = null;
            if (!immediate) func.apply(context, args);
        }, wait);
        if (immediate && !timeout) func.apply(context, args);
    };
};


//---------------------- ????????????????????? begin ----------------------

(function(){
    "use strict";
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
})();

$.extend({
    /**
     * ??????http??????
     * @func
     * @param {object} options ????????????  
     * @param {object=} settings ???????????????  (?????????????????????)
     * @param {function=} successFn ??????
     * @param {function=} errorFn ??????
     */
    http: function (options, settings, success, error) {

        options = options || {};

        var args = arguments;
        var successFn, errorFn;
        var defaultSettings = {
            retry: 3,
            showError: true,
            toast: 'toast'
        }

        var holder = packing(['action', 'method', 'success', 'error'], options);
        // ????????????????????????function, ?????????????????????settings
        if (typeof args[1] == 'function') {
            successFn = args[1];
            errorFn = args[2];
            settings = null;
        } else {
            successFn = success;
            errorFn = error;
        }
        // ????????? ???options??????success/error?????????
        if (!successFn && holder.success) {
            successFn = holder.success;
        }
        if (!errorFn && holder.error) {
            errorFn = holder.error;
        }
        settings = $.extend({}, defaultSettings, settings || {});

        // ??????????????????????????????, ????????????????????????
        if (typeof settings.retry != "number") {
            settings.retry = defaultSettings.retry;
        }

        options = $.extend({
            url: '',
            type: 'get',
            dataType: 'json',
            timeout: 30000,
            success: function (response) {
                if (typeof settings.mock === 'function') {
                    response = settings.mock.apply(options, arguments) || response;
                }
                successHandler.call(this, response);
            },
            error: function (error, status) {
                if (status === 'timeout') {
                    if (--settings.retry > 0) {
                        $.http(options, settings, successFn, errorFn);
                    } else {
                        showSwal({
                            type: "error",
                            confirmButtonText: '???',
                            text: "????????????"
                        }, function (handler) {
                            errorFn && errorFn.apply(self, arguments);
                        });
                    }
                } else {
                    errorHandler.apply(this, arguments);
                }
            }
        }, {
            url: holder.action,
            type: holder.method
        }, options);

        if (options.data instanceof FormData) {
            options = $.extend({
                processData: false,
                contentType: false
            }, options);
        }

        function successHandler(response) {
            var self = this;
            if (response.status < 0) {
                // ????????????, ??????????????????
                showSwal({
                    type: "error",
                    confirmButtonText: '???',
                    text: response.msg
                }, function (handler) {
                    // ????????????, ???????????????????????????null
                    errorFn && errorFn.call(self, null, response);
                });
            } else {
                try{
                    var toast = settings.toast;
                    if (toast && response[toast]) {
                        var xhr = JSON.parse(localStorage.getItem(toast + '_xhr')) || [];
                        var data = ($.isArray(xhr) ? xhr : [xhr]).concat(response[toast]);
                        localStorage.setItem(toast + '_xhr', JSON.stringify(data));
                    }
                } catch(e) {
                    console.log(e);
                }
                successFn && successFn.call(self, response);
            }
        }
        function errorHandler(error, status) {
            var self = this;
            var args = arguments;
            // ????????????????????????
            if (status === 'parsererror') {
                showSwal({
                    type: "error",
                    confirmButtonText: "???",
                    text: "??????????????????"
                }, function (handler) {
                    errorFn && errorFn.apply(self, args);
                });
            // ???????????????
            } else if (settings.showError) {
                showSwal({
                    type: "error",
                    confirmButtonText: '???',
                    text: (error.responseJSON || {}).msg || "????????????, ???????????????"
                }, function (handler) {
                    errorFn && errorFn.apply(self, args);
                });
            } else {
                errorFn && errorFn.apply(self, args);
            }
        }

        function packing(keys, obj) {
            var newObj = {};
            $.each(keys, function (index, item) {
                newObj[item] = obj[item];
                delete obj[item];
            });
            return newObj;
        }
        function showSwal(options, done) {
            if (swal && options) {
                swal(options).then(function (isConfirm) {
                    done && done('confirm');
                }).catch(function () {
                    done && done('cancel');
                });
            } else {
                done && done();
            }
        }
        return $.ajax(options);
    },
    /**
     * ??????????????????
     * @param {object=} options 
     * @param {number=3000} options.interval ????????????(??????????????????????????????)
     * @param {array=[]} options.list ??????????????????????????? (????????????????????????, ???????????? localStorage ?????????)
     * @param {string="toast"} options.key ???????????????localStorage???key(??????????????????)
     * @param {function=} options.verify ??????????????????????????????
     * @param {function=(item)} options.getText ????????????????????????
     * @param {function=(text, done, item)} options.show ???????????????????????????
     * @param {function=(index)} options.close ??????????????????????????????
     * @param {function=} options.complete ?????????????????????????????????
     */
    toast: function (options) {
        if (this.toast.instance) return this.toast.instance.init(options);
        var funcs = {
            getText: function (item) {
                if (typeof item === 'string') {
                    return item;
                } else if (item instanceof Object) {
                    if (typeof item.a == 'string') {
                        return item.a;
                    }
                }
            },
            verify: function () {
                return this.list.length; //&& /toast/.test(location.hash);
            },
            start: function () {
                if (this.verify()) {
                    this.queue(this.list, this.complete);
                }
                return this;
            },
            shift: function () {
                try {
                    this.list.shift();
                    this.key && localStorage.setItem(this.key, JSON.stringify(this.list));
                } catch (e) {
                    console.log(e);
                }
            },
            queue: function (data, done) {
                var that = this;
                if (data.length == 0) {
                    // ?????????????????????this?????????
                    done && done.call(this);
                } else {
                    var text = this.getText(data[0]);
                    that.show(text, function () {
                        swal && swal.close();
                        that.close(0);
                        that.queue(data, done);
                        // ???????????? 
                    }, data[0]);
                    that.shift();
                }
                return this;
            },
            show: function (text, done, item) {
                if (text && swal) {
                    swal({
                        type: 'info',
                        timer: this.interval,
                        text: text
                    }).then(done).catch(done);
                } else {
                    done && done();
                }
                return this;
            },
            close: function (index) {
            },
            complete: function () {
                this.key && localStorage.removeItem(this.key);
                return this;
            }
        }
        var toast = {
            init: function (options) {
                try {
                    $.extend(this, {
                        interval: 3000,
                        key: '',
                        list: [],
                    }, funcs, options);
                    if (this.key) {
                        var list, xhr;
                        if ($.isArray(this.list) && this.list.length) {
                            list = this.list;
                        } else {
                            list = JSON.parse(localStorage.getItem(this.key)) || [];
                            xhr = JSON.parse(localStorage.getItem(this.key + '_xhr')) || [];
                            list = ($.isArray(list) ? list : [list]).concat(xhr);
                        }
                        this.list = list;
                        localStorage.setItem(this.key, JSON.stringify(this.list));
                        localStorage.removeItem(this.key + '_xhr');
                    }
                    if ($.isArray(this.list)) {
                        this.start();
                    }
                } catch (e) {
                    console.log(e);
                }
                return this;
            }
        };
        this.toast.instance = toast;
        return toast.init(options);
    }
});
$.toast({
    interval: 3000,
    key: 'toast'
});
$.fn.extend({
    /**
     * ?????????????????????
     * @param {object} option 
     * @param {string} option.container ????????????
     * @param {string} option.item ??????????????????
     * @param {string} option.tag ????????????????????????
     * @param {string} option.text ????????????
     * @param {number} option.height ???????????? ????????????0???, ??????????????????????????????
     * @param {number} option.scale ????????????
     * @param {object} option.containerStyle
     * @param {object} option.itemStyle
     * @param {object} option.tagStyle
     */
    elementBox: function(option, context){
        var that = $(context || this);
        if (!that.data("elementBox")) {
            that.data("elementBox", instance(option || {}, that));
        }
        return $(this).data("elementBox");
        function instance(option, context) {
            var box = {
                context: context,
                option: $.extend({
                    container: '.overflow-box',
                    item: '.overflow-item',
                    tag: '.overflow-tag',
                    text: '...',
                    tagStyle: {},
                    itemStyle: {},
                    containerStyle: {},
                    height: 0,
                    scale: 1.5
                }, option),
                elms: {},
                selectElms: function(context, option){
                    option = option || this.option;
                    var elms = {};
                    $.each([
                        'container', 'tag', 'item'
                    ], function(key, item){
                        elms[item] = $(option[item], context);
                    });
                    return elms;
                },
                init: function() {
                    var that = this;
                    this.elms = this.selectElms(context);
                    if (!option.height) {
                        that.option.height = that.elms.container.height();
                    }
                    that.elms.container.css($.extend({
                        height: that.option.height,
                        position: 'relative',
                        overflow: "hidden",
                        display: "block"
                    },that.option.containerStyle));
                    this.elms.item.css($.extend({
                        paddingRight: 15,
                        height: 'auto',
                        overflow: 'initial'
                    }, that.option.itemStyle));
                    that.elms.tag.css($.extend({
                        position: "absolute",
                        top: 0,
                        right: 0,
                        zIndex: 9999,
                        color: "#333",
                        width: 15,
                        fontSize: 18,
                        display: "none",
                        cursor: 'pointer'
                    }, that.option.tagStyle));
                    return that;
                },
                compute: function(target){
                    var over = false;
                    var elms = target? this.selectElms($(target), this.option) : this.elms;
                    if (elms.item.height() > this.option.height * this.option.scale) {
                        elms.tag.text(this.option.text).show();
                        elms.container.addClass("over");
                        over = true;
                    } else  {
                        elms.tag.text('').hide();
                        elms.container.removeClass("over");
                    }
                    this.option.change && this.option.change(over);
                    return this;
                },
                remove: function($el) {
                    this.elms.item.remove($el);
                    this.compute();
                    return this;
                },
                add: function($el){
                    this.elms.item.append($el);
                    this.compute();
                    return this;
                },
                html: function(html) {
                    this.elms.item.html(html);
                    this.compute();
                    return this;
                }
            }
            return box.init();
        }
    },
    setFormValidation: function (option) {
        if (!$.fn.validate) return;
        option = $.extend({
            errorPlacement: function (error, element) {
                $(element).closest('.form-group').addClass('has-error').find('.control-label').append(error);
            }
        }, option || {});
        return $(this).validate(option);
    },
    /**
     * ????????????
     * @func
     * @param {object} options ajax?????? 
     * 
     * @param {object=} settings ???????????? (????????????settings)
     * @param {string=} settings.submit ???????????? (??????????????????????????????)
     * @param {boolean=} settings.isBubble ?????????????????????????????????????????????
     * @param {string=} settings.disabledClass ?????????????????????class???, ??????????????????
     * @param {boolean=} settings.preventDefault ??????????????????????????????
     * 
     * @param {function=} successFn ?????? successFn(response, $event); ???$.http???????????????????????????????????? $event ??????
     * @param {function=} errorFn ?????? errorFn(error, $event); ???$.http???????????????????????????????????? $event ??????
     * @example
     * $("#register-form").formSubmit(
        * // options
        * {
        *     url: '/auth',
        *     type: 'post',
        *     // ??????data?????????, ????????????serializeArray??????, ????????????????????????, ????????????????????????????????????????????? 
        *     data: function () {
        *         return {
        *             mobile: $("#register-form").find("[name='mobile']").val()
        *         }
        *     }
        * },
        * // settings
        * {
        *     submit: ".submit",
        *     isBubble: true,
        *     preventDefault: true,
        * },
        * // success
        * function(response, $event){
        * },
        * // error
        * function(error, $event){
        * });
        */
    formSubmit: function (options, settings, success, error) {
        var container = this;
        var args = arguments;
        var successFn, errorFn;
        var formSubmit = container.data("formSubmit");
        if (typeof args[1] == 'function') {
            successFn = args[1];
            errorFn = args[2];
            settings = null;
        } else {
            successFn = success;
            errorFn = error;
        }
        return arguments.length ? instance() : formSubmit || instance();
        function instance() {
            settings = $.extend({
                form: '.form',
                submit: ".submit",
                disabledClass: 'disabled',
                validate: true,
                isBubble: true,
                preventDefault: true,
                // ????????????, ready/pending, ????????????????????????
                state: "ready"
            }, settings);
            var result;
            var ajaxOption = function (form, options) {
                // ????????????????????????
                var formOption = {
                    url: form.attr('action'),
                    type: form.attr('method'),
                    contentType: form.attr('enctype'),
                }
                // ????????????: ?????????,????????????,????????????
                result = $.extend({
                    url: '',
                    type: 'POST',
                    dataType: 'json',
                    beforeSend: function () {
                        return true;
                    }
                },
                    options,
                    formOption
                );
                var data = (options || {}).data;
                if (typeof data == 'function') {
                    result.data = data(form);
                } else {
                    result.data = result.data || form.serializeArray();
                }
                return result;
            }
            
            var submit = function ($event) {
                // $event 
                // ?????????jQuery????????????event, ?????????????????????????????????????????????
                // ????????????, ??????????????????????????????????????????????????????????????????Enter, ??????????????????????????????
                var that = $event instanceof Object && $event.originalEvent instanceof MouseEvent ? $(this) : $(settings.submit, settings.container || container);
                var form = settings.isBubble ? that.closest("form") : $(settings.form, settings.container || container);
                var submitOption = ajaxOption(form, options);
                var beforeSend = submitOption.beforeSend;
                submitOption.beforeSend = function (xhr, options) {
                    var disabled = that.hasClass(settings.disabledClass);
                    var res = beforeSend ? beforeSend(xhr, options, form) : true;
                    // ????????????????????????, ????????????????????????
                    if (!beforeSend && settings.validate) {
                        // ??????????????????
                        try {
                            res = form.valid();
                        } catch (e) {
                            console.log(e);
                        }
                    }
                    if (!disabled && res) {
                        return true;
                    } else {
                        settings.state = 'ready';
                        return false;
                    }
                }
                if (settings.state == 'ready') {
                    settings.state = 'pending';
                    $.http(submitOption, function (response) {
                        settings.state = 'ready';
                        typeof successFn == 'function' && successFn(response, $event);
                    }, function (error) {
                        settings.state = 'ready';
                        typeof errorFn == 'function' && errorFn(error, $event);
                    });
                }
                if (settings.preventDefault) {
                    return false;
                }
            }

            container.data("formSubmit", result = {
                settings: settings,
                submit: submit
            });
            // ???????????????????????????, ?????????????????????????????????enter???????????????, ?????????????????????????????????
            container.find("form").on("submit", function () {
                $(settings.submit, this).eq(0).trigger("click");
                return false;
            });
            container.off("click", submit).on("click", settings.submit, submit);

        }
    },
    muiltPicker: function (options) {
        options = options || {};
        if ($(this).length > 1) {
            var pickers = [];
            $(this).each(function () {
                pickers.push(instance.call(this, options));
            });
            return pickers[0];
        } else {
            return instance.call(this, options);
        }
        function instance(options) {
            var source = $(this);
            var muiltPicker = source.data("muiltPicker");
            // ?????????????????????
            if (muiltPicker) {
                if (typeof options == 'object') {
                    muiltPicker.setOptions(options);
                }
                return muiltPicker
            }
            var defaults = {
                // range/muilt
                mode: 'range',

                // ----- ????????? -----

                // ????????????????????????????????????
                // true: ??????????????? false: ????????????
                inner: true,

                // ??????ui?????? (?????????????????????, ??????inner)
                container: '.picker-container',
                // ??????????????? (?????????????????????, ??????inner)
                selectSelecotr: '.select-group',
                optionSelecotr: '.li-item',
                scrollSelecotr: '.scroll-bar',

                // ???????????????????????????
                triggerSelecotr: ".picker-input-group",

                // ----- ?????? -----
                // ??????????????????, ??????????????????????????????
                inline: false,
                containerWidth: '100%;',
                scrollBarHeight: '240px',
                // ???????????????????????????container
                autoShow: true,
                triggerClose: false,
                // ?????????????????????
                leaveClose: false,
                // customElms: function(){return {}},
                // plugins: {
                //         options: function(options){},
                //         compiler: function(picker){
                //              console.log(arguments); 
                //         }
                // },

                // ?????????????????????, ?????????????????????/????????????, ?????????????????????????????????
                // custom: function () { console.log(this) },

                // ----- ???????????? -----

                // ?????????????????????: ????????????/??????
                // ???async???true???, ?????????generator?????????done???????????????????????????
                async: false,
                // ????????????????????????????????? ???????????????, ????????????html????????????, done: ??????????????????, ???????????????????????????????????????????????????done
                // generator: function(done){ /* done('<li class="li-item" data-value="1000">1000</li>') */return '<li class="li-item" data-value="1000">1000</li>' },
                beforeShow: function () { },
                clear: null, // function(){},
                // ??????????????????, ????????????????????????
                autoClose: false,
                // ?????????????????????, ?????????????????????????????????boolean.
                // selected: ????????????????????????
                outsideClick: function (selected) { return selected.length === 0 },
                // ?????????????????????????????????
                resetSelected: true,
                // ??????????????????
                active: 'start',
                // ????????????????????????
                beforeChange: function ($that, selected, active) { },
                afterChange: function ($that, selected, active) { },
            }
            var selected = [];
            var picker = {};

            execCommand('beforeInit');

            $.extend(picker, plugins(options, source));

            custom(picker);

            source.data("muiltPicker", picker);

            execCommand('afterInit');
            /**
             * ????????????????????????
             * @func
             * @param {object} options $.fn.muiltPicker ??????????????????
             * @param {object} source ????????????????????????jQuery??????
             */
            function getOptions(options, source) {
                selected = [];
                options = $.extend(getDefaultOptions(defaults, source.data()), options);
                var picker = {};
                var context = options.inner ? source : document;
                var elms = {
                    source: source,
                    container: $(options.container, source),
                    scroll: $(options.scrollSelecotr, source),
                    select: $(options.selectSelecotr, source),
                    option: $(options.optionSelecotr, source),
                    trigger: $(options.triggerSelecotr, context)
                }
                var events = {
                    triggerSelecotrClick: [],
                    autoClose: [],
                    liItemClick: []
                }
                picker = $.extend(picker, {
                    bus: {},
                    state: 'hide',
                    elms: elms,
                    source: source,
                    options: options,
                    context: context,
                    plugins: [],
                    events: events,
                    setEvents: setEvents,
                    addEvent: addEvent,
                    offEvent: offEvent,
                    setOptions: setOptions,
                    select: function(values){
                        values = $.isArray(values) ? values : [values];
                        var maps = {};
                        $.each(values, function(index, item){
                            maps[item] = (maps[item] || 0) + 1;
                        });
                        if (this.elms.option) {
                            $.each(this.elms.option, function(index, item){
                                var num = maps[$(this).data("value")];
                                if (num) {
                                    while (num-- > 0) {
                                        $(this).trigger("click");
                                    }
                                }
                            });
                        }
                    },
                    show: function () {
                        execCommand('beforeShow');
                        this.elms.container.show();
                        this.state = 'show';
                        execCommand('afterShow');
                        return this;
                    },
                    clear: function () {
                        execCommand('clear');
                        return this;
                    },
                    destroy: function () {
                        this.clear();
                        for (var key in this.events) {
                            this.offEvent.apply(null, this.events[key]);
                        }
                        this.source.removeData("muiltPicker");
                        for (var i in this) {
                            delete this[i];
                        }
                        execCommand('destroy');
                        return this;
                    },
                    hide: function () {
                        if (options.inline) {
                            return this;
                        }
                        if (typeof options.beforeHide != 'function' || execCommand('beforeHide', [selected])) {
                            if (this.options.resetSelected) {
                                selected.splice(0);
                            }
                            this.elms.container.hide();
                            this.state = 'hide';
                            execCommand('afterHide');
                        }
                        return this;
                    },
                    setHtml: function (done) {
                        var self = this;
                        if (this.options.async) {
                            typeof this.options.generator == 'function' && this.options.generator(function (html) {
                                self.elms.select.html(html);
                                done();
                            });
                        } else {
                            typeof this.options.generator == 'function' && this.elms.select.html(this.options.generator());
                            done();
                        }
                        return this;
                    },
                    setStyles: function () {
                        this.elms.container.css({
                            width: this.options.containerWidth
                        });
                        this.elms.scroll.css({
                            height: this.options.scrollBarHeight
                        });
                        return this;
                    }
                });
                $.extend(elms,
                    typeof options.customElms === 'function'
                        ? options.customElms.call(picker, source, context)
                        : {}
                );
                return picker;
            }
            /**
             * ?????????????????????
             * @param {object} defaults ????????????
             * @param {object} data source.data()
             */
            function getDefaultOptions(defaults, data) {
                data = typeof data === 'object' ? data : {};
                var result = {};
                // ???data()??????????????????
                $.each(defaults, function (key, item) {
                    if (!(item instanceof Object) && typeof data[key] !== 'undefined') {
                        result[key] = data[key];
                    } else {
                        result[key] = item;
                    }
                });
                return result;
            }

            function plugins(options, source) {
                var picker;
                var plugins = options.plugins;
                if (typeof plugins === 'object') {
                    execCommand('beforeRunPlugins');
                    if (typeof plugins.options === 'function') {
                        $.extend(options, plugins.options(options));
                    }
                    picker = getOptions(options, source);
                    if (typeof plugins.compiler === 'function') {
                        plugins.compiler(picker)
                    };
                    execCommand('afterRunPlugins');
                } else {
                    picker = getOptions(options, source);
                }
                return picker;
            }

            function custom(picker) {
                if (!picker.options.custom) {
                    picker.setHtml(function () {
                        picker.elms.option = $(picker.options.optionSelecotr, picker.source);
                        picker.setStyles();
                        picker.setEvents(picker);
                        picker.options.inline && picker.show();
                    });
                } else {
                    execCommand('custom');
                }
            }

            function setOptions(option) {
                if (arguments.length) {
                    if (typeof option.customElms === 'function') {
                        $.extend(picker.elms,
                            typeof option.customElms === 'function'
                                ? option.customElms.call(picker, picker.source, picker.context)
                                : {}
                        );
                    }
                    $.extend(picker.options, option);
                }
                return this;
            }

            function addEvent() {
                var args = arguments;
                if (args.length < 3) {
                    return [];
                }
                var selecotr = args[0];
                var type = args[1];
                var handler, element;
                if (args.length === 3) {
                    handler = args[2];
                    $(selecotr).on(type, handler)
                } else {
                    element = args[2];
                    handler = args[3];
                    $(selecotr).on(type, element, handler)
                }
                return [selecotr, type, element, handler];
            }
            function offEvent(selecotr, type, element, handler) {
                if (element) {
                    $(selecotr).off(type, element, handler);
                } else {
                    $(selecotr).off(type, handler);
                }
            }
            function setEvents(picker) {
                var events = picker.events;
                var context = picker.context;
                var options = picker.options;
                var elms = picker.elms;
                var source = picker.source;
                events.leaveClose = addEvent(
                    $(context),
                    'mouseleave',
                    options.container,
                    function () {
                        options.leaveClose && picker.hide();
                    }
                )
                events.triggerSelecotrClick = addEvent(
                    $(context),
                    "click",
                    options.triggerSelecotr,
                    function () {
                        if (picker.state != 'show') {
                            $(this).closest(".is-empty").removeClass("is-empty");
                            options.autoShow && picker.show();
                            elms.select.scrollTop(0);
                        } else {
                            options.triggerClose && picker.hide();
                        }
                        return false;
                    }
                );
                events.autoClose = addEvent(
                    $(document),
                    "click",
                    function (e) {
                        var $target = $(e.target);
                        var $parent;
                        if ($target.hasClass("muilt-picker")) {
                            $parent = $target
                        } else if ($target.closest(".muilt-picker").length) {
                            $parent = $target.closest(".muilt-picker");
                        }
                        if (!$parent) {
                            if (options.autoClose || execCommand("outsideClick", [selected])) {
                                if (!$parent || $parent[0] === source[0]) {
                                    elms.container.css("display") !== 'none' && picker.hide();
                                }
                            }
                        }
                    }
                );
                events.liItemClick = addEvent(
                    source,
                    "click",
                    options.optionSelecotr,
                    function () {
                        if ($(this).hasClass("disabled")) { return false; }
                        if (typeof options.beforeChange === 'function' && options.beforeChange.call(picker, $(this), selected, options.active) === false) {
                            return false;
                        } else {
                            updateSelected(selected, this);
                        }
                        if (typeof options.afterChange == 'function') {
                            return options.afterChange.call(picker, $(this), selected, options.active);
                        }

                        return false;
                    }
                );
            }
            function updateSelected(selected, element) {
                var selectedIndex = selected.indexOf(element);
                if (selectedIndex < 0) {
                    selected.push(element);
                } else {
                    selected.splice(selectedIndex, 1);
                }
                return selected;
            }
            function execCommand(fname, args) {
                return fname && typeof options[fname] === 'function' && options[fname].apply(picker, $.isArray(args) ? args : arguments.length > 1 ? [args] : []);
            }

            if ($.fn.muiltPicker.pickers && $.isArray($.fn.muiltPicker.pickers)) {
                $.fn.muiltPicker.pickers.push(picker);
            } else {
                $.fn.muiltPicker.pickers = [picker];
            }
            return picker;
        }
    },
    qrcode: function (options, rest) {
        if (!this.data("qrcode")) {
            this.data("qrcode", instance.call(this, options, rest).init());
        }
        return this.data("qrcode");
        function instance(options, rest) {
            var done = rest.done;
            var verify = rest.verify;
            return {
                container: $(this).get(0),
                QRCode: null,
                key: '',
                starttime: 0,
                timeid: 0,
                data: {},
                createKey: function (len, radix) {
                    var str = '';
                    len = len <= 0 ? 64 : len;
                    radix = !radix || radix > 36 || radix <= 2 ? 36 : ~~radix;
                    while (len-- > 0) {
                        str += (~~(Math.random() * radix)).toString(radix);
                    }
                    return str;
                },
                http: $.extend({
                }, rest.http),
                qrcode: $.extend({
                    height: 120,
                    width: 120
                }, rest.qrcode),
                params: $.extend({}, rest.params),
                settings: $.extend({
                    expire: 0,
                    interval: 1000
                }, rest.settings),
                options: $.extend({
                    a: 'codeLogin',
                }, options),
                init: function () {
                    if (typeof verify !== 'function') {
                        console.log('?????????verify??????');
                        return this;
                    }
                    this.key = this.createKey(64);
                    if (QRCode) {
                        $(this.container).html('');
                        this.QRCode = new QRCode(this.container, this.qrcode);
                        this.makeCode();
                        this.starttime = +new Date;
                        this.query();
                    }
                    return this;
                },
                query: function () {
                    var that = this;
                    var params = $.extend({}, that.http);
                    if (typeof params.data === 'function') {
                        params.data = params.data.call(this);
                    }
                    $.http(params, {
                        showError: false
                    }, function (data) {
                        if (verify.call(that, data)) {
                            that.timeid = setTimeout(function () {
                                if (!that.settings.expire || that.starttime + that.settings.expire > new Date) {
                                    that.query();
                                } else {
                                    that.init();
                                }
                            }, that.settings.interval);
                        } else {
                            done && done.call(that);
                        }
                    });
                },
                makeCode: function () {
                    var that = this;
                    myParams(this.params, function (data) {
                        that.data = data;
                        var result = $.extend({}, that.options, {
                            key: that.key,
                            token: token,
                            data: data.json
                        });
                        that.QRCode.makeCode(JSON.stringify(result));
                    });
                }
            };
        }
    }
});
//---------------------- ????????????????????? end ------------------------


//---------------------- ????????????????????? begin ----------------------


//---------------------- ????????????????????? end ------------------------
