/// <reference path="../app.ts" />
/// <reference path="../common/spinner.ts" />
/// <reference path="../../scripts/typings/jquery/jquery.d.ts" />
/// <reference path='../../Scripts/typings/angularjs/angular.d.ts'/>
/// <reference path='../../Scripts/typings/angularjs/angular-resource.d.ts'/>
'use strict';
/// ccImgPerson
//Usage:
//<img data-cc-img-person="{{s.speaker.imageSource}}"/>
var ccImgPerson = (function () {
    function ccImgPerson(config, $window) {
        this.config = config;
        this.$window = $window;
        this.restrict = "A";
        this.basePath = config.imageSettings.imageBasePath;
        this.unknownImage = config.imageSettings.unknownPersonImageSource;
    }
    ccImgPerson.prototype.link = function (scope, element, attrs) {
        var _this = this;
        attrs.$observe(ccImgPerson.directiveId, function (value) {
            value = _this.basePath + (value || _this.unknownImage);
            attrs.$set('src', value);
        });
    };
    ccImgPerson.directiveId = "ccImgPerson";
    return ccImgPerson;
})();

app.directive(ccImgPerson.directiveId, [
    'config', '$window', function (config, $window) {
        return new ccImgPerson(config, $window);
    }
]);

/// ccSidebar
// Opens and closes the sidebar menu.
// Usage:
//  <div data-cc-sidebar>
// Creates:
//  <div data-cc-sidebar class="sidebar">
var ccSidebar = (function () {
    function ccSidebar(config, $window) {
        this.config = config;
        this.$window = $window;
        this.restrict = "A";
    }
    ccSidebar.prototype.link = function (scope, element, attrs) {
        var _this = this;
        var $sidebarInner = element.find('.sidebar-inner');
        var $dropdownElement = element.find('.sidebar-dropdown a');
        element.addClass('sidebar');

        $dropdownElement.click(function (eventObject) {
            var dropClass = 'dropy';
            eventObject.preventDefault();

            if (!$dropdownElement.hasClass(dropClass)) {
                _this.hideAllSidebars($sidebarInner, dropClass);
                $sidebarInner.slideDown(350);
                $dropdownElement.addClass(dropClass);
            } else if ($dropdownElement.hasClass(dropClass)) {
                $dropdownElement.removeClass(dropClass);
                $sidebarInner.slideUp(350);
            }
        });
    };

    ccSidebar.prototype.hideAllSidebars = function ($sidebarInner, dropClass) {
        $sidebarInner.slideUp(350);
        $('.sidebar-dropdown a').removeClass(dropClass);
    };
    ccSidebar.directiveId = "ccSidebar";
    return ccSidebar;
})();

app.directive(ccSidebar.directiveId, [
    'config', '$window', function (config, $window) {
        return new ccSidebar(config, $window);
    }
]);

/// ccWidgetClose
// Usage:
// <a data-cc-widget-close></a>
// Creates:
// <a data-cc-widget-close="" href="#" class="wclose">
//     <i class="fa fa-remove"></i>
// </a>
var ccWidgetClose = (function () {
    function ccWidgetClose(config, $window) {
        this.config = config;
        this.$window = $window;
        this.restrict = "A";
        this.template = '<i class="fa fa-remove"></i>';
    }
    ccWidgetClose.prototype.link = function (scope, element, attrs) {
        attrs.$set('href', '#');
        attrs.$set('wclose', 'wclose');
        element.click(close);

        element.click(function (eventObject) {
            eventObject.preventDefault();

            element.parent().parent().parent().hide(100);
        });
    };
    ccWidgetClose.directiveId = "ccWidgetClose";
    return ccWidgetClose;
})();

app.directive(ccWidgetClose.directiveId, [
    'config', '$window', function (config, $window) {
        return new ccWidgetClose(config, $window);
    }
]);

/// ccWidgetMinimize
// Usage:
// <a data-cc-widget-minimize></a>
// Creates:
// <a data-cc-widget-minimize="" href="#"><i class="fa fa-chevron-up"></i></a>
var ccWidgetMinimize = (function () {
    function ccWidgetMinimize(config, $window) {
        this.config = config;
        this.$window = $window;
        this.restrict = "A";
        this.template = '<i class="fa fa-chevron-up"></i>';
    }
    ccWidgetMinimize.prototype.link = function (scope, element, attrs) {
        attrs.$set('href', '#');
        attrs.$set('wminimize', "wminimize");
        element.click(function (eventObject) {
            eventObject.preventDefault();

            var $wcontent = element.parent().parent().next('.widget-content');
            var iElement = element.children('i');
            if ($wcontent.is(':visible')) {
                iElement.removeClass('fa fa-chevron-up');
                iElement.addClass('fa fa-chevron-down');
            } else {
                iElement.removeClass('fa fa-chevron-down');
                iElement.addClass('fa fa-chevron-up');
            }

            $wcontent.toggle(500);
        });
    };
    ccWidgetMinimize.directiveId = "ccWidgetMinimize";
    return ccWidgetMinimize;
})();

app.directive(ccWidgetMinimize.directiveId, [
    'config', '$window', function (config, $window) {
        return new ccWidgetMinimize(config, $window);
    }
]);

/// ccScrollToTop
// Usage:
// <span data-cc-scroll-to-top></span>
// Creates:
// <span data-cc-scroll-to-top="" class="totop">
//      <a href="#"><i class="fa fa-chevron-up"></i></a>
// </span>
var ccScrollToTop = (function () {
    function ccScrollToTop(config, $window) {
        var _this = this;
        this.config = config;
        this.$window = $window;
        this.restrict = "A";
        this.template = '<a href="#"><i class="fa fa-chevron-up"></i></a>';
        this.link = function (scope, element, attrs) {
            var $win = $(_this.$window);
            element.addClass('totop');

            $win.scroll(function () {
                $win.scrollTop() > 300 ? element.slideDown() : element.slideUp();
            });
            //element.find((eventObject: JQuery) => {
            //    //element.preventDefault(); ???
            //    // Learning Point: $anchorScroll works, but no animation
            //    //$anchorScroll();
            //    $('body').animate({ scrollTop: 0 }, 500);
            //});
        };
    }
    ccScrollToTop.directiveId = "ccScrollToTop";
    return ccScrollToTop;
})();

app.directive(ccScrollToTop.directiveId, [
    'config', '$window', function (config, $window) {
        return new ccScrollToTop(config, $window);
    }
]);


// Description:
//  Creates a new Spinner and sets its options
// Usage:
//  <div data-cc-spinner="vm.spinnerOptions"></div>
var ccSpinner = (function () {
    function ccSpinner(config, $window) {
        this.config = config;
        this.$window = $window;
        this.restrict = "A";
    }
    ccSpinner.prototype.link = function (scope, element, attrs) {
        scope.spinner = null;

        scope.$watch(ccSpinner.directiveId, function (listener) {
            if (scope.spinner) {
                //scope.spinner.stop();
            }
            //scope.spinner = new $window.Spinner(options);
            //scope.spinner.spin(element[0]);
        }, true);
    };
    ccSpinner.directiveId = "ccSpinner";
    return ccSpinner;
})();

app.directive(ccSpinner.directiveId, [
    'config', '$window', function (config, $window) {
        return new ccSpinner(config, $window);
    }
]);

/// ccWidgetHeader
//Usage:
//<div data-cc-widget-header title="vm.map.title"></div>
var ccWidgetHeader = (function () {
    function ccWidgetHeader(config, $window) {
        this.config = config;
        this.$window = $window;
        this.restrict = "A";
        this.templateUrl = "/app/layout/widgetheader.html";
        this.scope = {
            title: "@",
            subtitle: "@",
            rightText: "@",
            allowCollapse: "@"
        };
    }
    ccWidgetHeader.prototype.link = function (scope, element, attrs) {
        attrs.$set('class', 'widget-head');
    };
    ccWidgetHeader.directiveId = "ccWidgetHeader";
    return ccWidgetHeader;
})();

app.directive(ccWidgetHeader.directiveId, [
    'config', '$window', function (config, $window) {
        return new ccWidgetHeader(config, $window);
    }
]);
//# sourceMappingURL=directives.js.map
