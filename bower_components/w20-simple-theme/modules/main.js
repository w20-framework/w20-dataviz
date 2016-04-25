/*
 * Copyright (c) 2013-2016, The SeedStack authors <http://seedstack.org>
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

define([
    'require',
    'module',

    '{lodash}/lodash',
    '{angular}/angular',

    '[text]!{w20-simple-theme}/templates/topbar.html',

    '{angular-sanitize}/angular-sanitize',
    '{w20-core}/modules/ui',
    '{w20-core}/modules/culture',
    '{w20-core}/modules/utils'

], function (require, module, _, angular, topbarTemplate) {
    'use strict';

    var _config = module && module.config() || {},
        w20SimpleThemeMain = angular.module('w20SimpleThemeMain', ['w20CoreCulture', 'w20CoreUtils', 'ngSanitize']),
        showTopbar = true;

    w20SimpleThemeMain.directive('w20Topbar', ['$route', '$location', 'EventService', 'DisplayService', 'MenuService', 'EnvironmentService', 'ApplicationService', 'SecurityExpressionService', 'CultureService',
        function ($route, $location, eventService, displayService, menuService, environmentService, applicationService, securityExpressionService, cultureService) {
            function isRouteVisible(route) {
                return !route.hidden && (typeof route.security === 'undefined' || securityExpressionService.evaluate(route.security));
            }

            return {
                template: topbarTemplate,
                replace: true,
                transclude: true,
                restrict: 'A',
                scope: true,
                link: function (scope, iElement, iAttrs) {
                    scope.linkPrefix = $location.$$html5 ? '' : '#!';
                    scope.hideViews = _config.hideViews || false;
                    scope.title = iAttrs.title || '';
                    scope.description = iAttrs.subtitle || '';
                    scope.navActions = menuService.getActions;
                    scope.navAction = menuService.getAction;
                    scope.displayName = cultureService.displayName;
                    scope.envtype = environmentService.environment;
                    scope.logo = _config.logo;

                    scope.isTopbarDisplayed = function () {
                        return showTopbar;
                    };

                    scope.routeCategories = function () {
                        return _.sortBy(_.uniq(_.filter(_.map($route.routes, function (route) {
                            if (typeof route.category !== 'undefined' && route.category !== '__top' && isRouteVisible(route)) {
                                return route.category;
                            } else {
                                return null;
                            }
                        }), function (elt) {
                            return elt !== null && (typeof _config.categories !== 'undefined' ? _.contains(_config.categories, elt) : true);
                        })), function (elt) {
                            if (typeof _config.categories !== 'undefined') {
                                return _.indexOf(_config.categories, elt);
                            } else {
                                return elt;
                            }
                        });
                    };

                    scope.topLevelRoutes = function () {
                        return _.filter($route.routes, function (route) {
                            return route.category === '__top' && isRouteVisible(route);
                        });
                    };

                    scope.routesFromCategory = function (category) {
                        return _.filter($route.routes, function (route) {
                            return route.category === category && isRouteVisible(route);
                        });
                    };

                    scope.routeSortKey = function (route) {
                        return route.sortKey || route.path;
                    };

                    displayService.registerContentShiftCallback(function () {
                        return [showTopbar ? 50 : 0, 0, 0, 0];
                    });
                }
            };
        }]);

    w20SimpleThemeMain.run(['$rootScope', 'DisplayService', 'MenuService', function ($rootScope, displayService, menuService) {
        $rootScope.$on('$routeChangeSuccess', function (event, routeInfo) {
            if (routeInfo && routeInfo.$$route) {
                switch (routeInfo.$$route.navigation) {
                    case 'none':
                        showTopbar = false;
                        break;
                    case 'topbar':
                        showTopbar = true;
                        break;
                    case 'full':
                    /* falls through */
                    default:
                        showTopbar = true;
                        break;
                }

                displayService.computeContentShift();
            }
        });

        if (!_config.hideSecurity) {
            menuService.addAction('login', 'w20-login', {
                sortKey: 0
            });
            menuService.addAction('logout', 'w20-logout', {
                sortKey: 100
            });
        }

        if (!_config.hideCulture) {
            menuService.addAction('culture', 'w20-culture', {
                sortKey: 200
            });
        }

        if (!_config.hideConnectivity) {
            menuService.addAction('connectivity', 'w20-connectivity', {
                sortKey: 300
            });
        }

        _.each(_config.links, function (link, idx) {
            if (idx < 10) {
                menuService.addAction('link-' + idx, 'w20-link', _.extend(link, {
                    sortKey: 400 + idx
                }));
            }
        });
    }]);

    return {
        angularModules: ['w20SimpleThemeMain'],
        lifecycle: {
            pre: function (modules, fragments, callback) {
                angular.element('body').addClass('w20-top-shift-padding w20-right-shift-padding w20-bottom-shift-padding w20-left-shift-padding');
                callback(module);
            }
        }
    };
});