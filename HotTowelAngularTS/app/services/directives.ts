/// <reference path="../app.ts" />
/// <reference path="../common/spinner.ts" />
/// <reference path="../../scripts/typings/jquery/jquery.d.ts" />
/// <reference path='../../Scripts/typings/angularjs/angular.d.ts'/>
/// <reference path='../../Scripts/typings/angularjs/angular-resource.d.ts'/>

'use strict';

/// ccImgPerson
//Usage:
//<img data-cc-img-person="{{s.speaker.imageSource}}"/>
class ccImgPerson implements ng.IDirective {
    static directiveId: string = "ccImgPerson";
    restrict: string = "A";

    basePath: string;
    unknownImage: string;

    constructor(private config: Iconfig, private $window: ng.IWindowService) {
        this.basePath = config.imageSettings.imageBasePath;
        this.unknownImage  = config.imageSettings.unknownPersonImageSource;
    }

    link(scope: ng.IScope, element: ng.IAugmentedJQuery, attrs: ng.IAttributes) {
        attrs.$observe(ccImgPerson.directiveId, (value?: any): any=> {
            value = this.basePath + (value || this.unknownImage);
            attrs.$set('src', value);
        });
    }
}

app.directive(ccImgPerson.directiveId, ['config', '$window', (config, $window) =>
    new ccImgPerson(config, $window)
]);


/// ccSidebar
// Opens and closes the sidebar menu.
// Usage:
//  <div data-cc-sidebar>
// Creates:
//  <div data-cc-sidebar class="sidebar">
class ccSidebar implements ng.IDirective {
    static directiveId: string = "ccSidebar";
    restrict: string = "A";

    constructor(private config: Iconfig, private $window: ng.IWindowService) {
    }

    link(scope: ng.IScope, element: ng.IAugmentedJQuery, attrs: ng.IAttributes) {
        var $sidebarInner: ng.IAugmentedJQuery = element.find('.sidebar-inner');
        var $dropdownElement: ng.IAugmentedJQuery = element.find('.sidebar-dropdown a');
        element.addClass('sidebar');

        $dropdownElement.click((eventObject: JQueryEventObject) => {
            var dropClass = 'dropy';
            eventObject.preventDefault();

            if (!$dropdownElement.hasClass(dropClass)) {
                this.hideAllSidebars($sidebarInner, dropClass);
                $sidebarInner.slideDown(350);
                $dropdownElement.addClass(dropClass);
            } else if ($dropdownElement.hasClass(dropClass)) {
                $dropdownElement.removeClass(dropClass);
                $sidebarInner.slideUp(350);
            }
        });
    }

    hideAllSidebars($sidebarInner: ng.IAugmentedJQuery, dropClass: string) {
        $sidebarInner.slideUp(350);
        $('.sidebar-dropdown a').removeClass(dropClass);
    }
}

app.directive(ccSidebar.directiveId, ['config', '$window', (config, $window) =>
    new ccSidebar(config, $window)
]);


/// ccWidgetClose
// Usage:
// <a data-cc-widget-close></a>
// Creates:
// <a data-cc-widget-close="" href="#" class="wclose">
//     <i class="fa fa-remove"></i>
// </a>
class ccWidgetClose implements ng.IDirective {
    static directiveId: string = "ccWidgetClose";
    restrict: string = "A";
    template: string = '<i class="fa fa-remove"></i>';

    constructor(private config: Iconfig, private $window: ng.IWindowService) {
    }

    link(scope: ng.IScope, element: ng.IAugmentedJQuery, attrs: ng.IAttributes) {
        attrs.$set('href', '#');
        attrs.$set('wclose', 'wclose');
        element.click(close);

        element.click((eventObject: JQueryEventObject) => {
            eventObject.preventDefault();

            element.parent().parent().parent().hide(100);
        });
    }
}

app.directive(ccWidgetClose.directiveId, ['config', '$window', (config, $window) =>
    new ccWidgetClose(config, $window)
]);


/// ccWidgetMinimize
// Usage:
// <a data-cc-widget-minimize></a>
// Creates:
// <a data-cc-widget-minimize="" href="#"><i class="fa fa-chevron-up"></i></a>
class ccWidgetMinimize implements ng.IDirective {
    static directiveId: string = "ccWidgetMinimize";
    restrict: string = "A";
    template: string = '<i class="fa fa-chevron-up"></i>';

    constructor(private config: Iconfig, private $window: ng.IWindowService) {
    }

    link(scope: ng.IScope, element: ng.IAugmentedJQuery, attrs: ng.IAttributes) {
        attrs.$set('href', '#');
        attrs.$set('wminimize', "wminimize");
        element.click((eventObject: JQueryEventObject) => {
            eventObject.preventDefault();

            var $wcontent: JQuery = element.parent().parent().next('.widget-content');
            var iElement: JQuery = element.children('i');
            if ($wcontent.is(':visible')) {
                iElement.removeClass('fa fa-chevron-up');
                iElement.addClass('fa fa-chevron-down');
            } else {
                iElement.removeClass('fa fa-chevron-down');
                iElement.addClass('fa fa-chevron-up');
            }

            $wcontent.toggle(500);
        });
    }
}

app.directive(ccWidgetMinimize.directiveId, ['config', '$window', (config, $window) =>
    new ccWidgetMinimize(config, $window)
]);


/// ccScrollToTop
// Usage:
// <span data-cc-scroll-to-top></span>
// Creates:
// <span data-cc-scroll-to-top="" class="totop">
//      <a href="#"><i class="fa fa-chevron-up"></i></a>
// </span>
class ccScrollToTop implements ng.IDirective {
    static directiveId: string = "ccScrollToTop";
    restrict: string = "A";
    template: string = '<a href="#"><i class="fa fa-chevron-up"></i></a>';

    constructor(private config: Iconfig, private $window: ng.IWindowService) {
    }

    link = (scope: ng.IScope, element: JQuery, attrs: ng.IAttributes) => {
        var $win: JQuery = $(this.$window);
        element.addClass('totop');

        $win.scroll(() => { $win.scrollTop() > 300 ? element.slideDown() : element.slideUp(); });

        //element.find((eventObject: JQuery) => {
        //    //element.preventDefault(); ???

        //    // Learning Point: $anchorScroll works, but no animation
        //    //$anchorScroll();
        //    $('body').animate({ scrollTop: 0 }, 500);
        //});
    }
}

app.directive(ccScrollToTop.directiveId, ['config', '$window', (config, $window) =>
    new ccScrollToTop(config, $window)
]);


/// ccSpinner
interface IccSpinnerScope extends ng.IScope {
    spinner: IspinnerFactory;
}

interface IccSpinnerAttributes extends ng.IAttributes {
    ccSpinner: ng.IDirective;
}

// Description:
//  Creates a new Spinner and sets its options
// Usage:
//  <div data-cc-spinner="vm.spinnerOptions"></div>
class ccSpinner implements ng.IDirective {
    static directiveId: string = "ccSpinner";
    restrict: string = "A";

    constructor(private config: Iconfig, private $window: ng.IWindowService) {
    }

    link(scope: IccSpinnerScope, element: ng.IAugmentedJQuery, attrs: IccSpinnerAttributes) {
        scope.spinner = null;

        scope.$watch(ccSpinner.directiveId, listener => {
            if (scope.spinner) {
                //scope.spinner.stop();
            }
            //scope.spinner = new $window.Spinner(options);
            //scope.spinner.spin(element[0]);
        }, true);
    }
}

app.directive(ccSpinner.directiveId, ['config', '$window', (config, $window) =>
    new ccSpinner(config, $window)
]);


/// ccWidgetHeader
//Usage:
//<div data-cc-widget-header title="vm.map.title"></div>
class ccWidgetHeader implements ng.IDirective {
    static directiveId: string = "ccWidgetHeader";
    restrict: string = "A";
    templateUrl: string = "/app/layout/widgetheader.html";

    scope = {
        title: "@",
        subtitle: "@",
        rightText: "@",
        allowCollapse: "@"
    };

    constructor(private config: Iconfig, private $window: ng.IWindowService) {
    }

    link(scope: ng.IScope, element: JQuery, attrs: ng.IAttributes) {
        attrs.$set('class', 'widget-head');
    }
}

app.directive(ccWidgetHeader.directiveId, ['config', '$window', (config, $window) =>
    new ccWidgetHeader(config, $window)
]);
