define([
    '{angular}/angular',
    'jquery',
    '{dygraphs}/dygraph',
    '{angular-resource}/angular-resource'

], function (angular, $, Dygraph) {
    'use strict';

    var module = angular.module('dygraphs', ['ngResource']);

    module.directive('w20Dygraph', ['$compile', function ($compile) {
        return {
            scope: {
                data: '=?',
                options: '=?',
                reference: '=?',
                optional: '=?',
                onRangeChange: '=?',
                comparator: '=?'
            },
            link: function (scope, element, attributes) {

                var mouseDownEventSelector = 'mousedown.w20 touchstart.w20',
                    mouseUpEventSelector = 'mouseup.w20 touchend.w20',
                    rangeElementSelector = '.dygraph-rangesel-fgcanvas, .dygraph-rangesel-zoomhandle',
                    isRangeSelectorActive = false,
                    originalData;

                function rangeSelectorListener(callback) {
                    var mouseUpEventElement = element,
                        rangeElement = element.find(rangeElementSelector);

                    rangeElement.off(mouseDownEventSelector);
                    rangeElement.on(mouseDownEventSelector, function () {
                        mouseUpEventElement.off(mouseUpEventSelector);
                        isRangeSelectorActive = true;
                        angular.element(mouseUpEventElement).on(mouseUpEventSelector, function () {
                            mouseUpEventElement.off(mouseUpEventSelector);
                            isRangeSelectorActive = false;
                            callback(angular.copy(scope.reference.xAxisRange()));
                        });
                    });
                }

                function mergeCSVData(originalData, zoomData) {
                    var originalDataArray = originalData.split('\n'),
                        zoomDataArray = zoomData.split('\n');

                    // Remove csv headers
                    zoomDataArray.shift();

                    var zoomLowerLimit = zoomDataArray[0].split(',')[0],
                        zoomUpperLimit = zoomDataArray[zoomDataArray.length - 1].split(',')[0],
                        startInsertIndex,
                        endInsertIndex,
                        currentAbscissa;

                    for (var i = 1; i < originalDataArray.length; i++) {
                        currentAbscissa = originalDataArray[i].split(',')[0];
                        if (!startInsertIndex && (scope.comparator(currentAbscissa, zoomLowerLimit))) {
                            startInsertIndex = i;
                        }
                        if (scope.comparator(currentAbscissa, zoomUpperLimit)) {
                            endInsertIndex = i - 1;
                            break;
                        }
                    }

                    originalDataArray.splice.apply(originalDataArray, [startInsertIndex, endInsertIndex - startInsertIndex + 1].concat(zoomDataArray));

                    return originalDataArray.join('\n');
                }

                function mergeRawData(originalDataArray, zoomDataArray) {
                    var originalDataArrayCopy = originalDataArray.slice(0),
                        zoomLowerLimit = zoomDataArray[0][0],
                        zoomUpperLimit = zoomDataArray[zoomDataArray.length - 1][0],
                        startInsertIndex,
                        endInsertIndex,
                        currentAbscissa;

                    for (var i = 1; i < originalDataArrayCopy.length; i++) {
                        currentAbscissa = originalDataArrayCopy[i][0];
                        if (!startInsertIndex && (scope.comparator(currentAbscissa, zoomLowerLimit))) {
                            startInsertIndex = i;
                        }
                        if (scope.comparator(currentAbscissa, zoomUpperLimit)) {
                            endInsertIndex = i - 1;
                            break;
                        }
                    }

                    originalDataArrayCopy.splice.apply(originalDataArrayCopy, [startInsertIndex, endInsertIndex - startInsertIndex + 1].concat(zoomDataArray));

                    return originalDataArrayCopy;
                }

                function updateDygragh(zoomData) {
                    if (zoomData) {
                        var mergedData;

                        if (typeof zoomData === 'string') {
                            mergedData = mergeCSVData(originalData, zoomData);
                        } else if (zoomData instanceof Array) {
                            mergedData = mergeRawData(originalData, zoomData);
                        } else {
                            throw new Error('Unsupported data type: should be string or array but got ', typeof zoomData);
                        }

                        if (mergedData) {
                            scope.reference.updateOptions(angular.extend({file: mergedData}, defaultOptions, scope.options, true));
                            scope.loading = false;
                            scope.$apply();
                        }
                    } else if (originalData) {
                        console.warn('no zoom data');
                        return originalData;
                    } else {
                        throw new Error('No data');
                    }
                }

                function rangeChangeCallback(xAxisRange) {
                    scope.loading = true;
                    scope.onRangeChange(xAxisRange, function (zoomData) {
                        updateDygragh(zoomData);
                    });
                }

                function zoomCallback (min, max, yRange) {
                    if (scope.onRangeChange && !isRangeSelectorActive) {
                        rangeChangeCallback([min, max]);
                    }
                }

                function defaultComparator(x1, x2) {
                    return x1 >= x2;
                }

                scope.options = scope.options ? scope.options : {};
                scope.comparator = scope.comparator ? scope.comparator : defaultComparator;
                element[0].style.width = scope.options.width || attributes.width || element[0].style.width || '100%';
                element[0].style.height = scope.options.height || attributes.height || element[0].style.height || '340px';

                var defaultOptions = {
                    legend: 'always',
                    showRangeSelector: true,
                    connectSeparatedPoints: true,
                    digitsAfterDecimal: 2,
                    labelsShowZeroValues: true,
                    interactionModel: Dygraph.defaultInteractionModel,
                    zoomCallback: zoomCallback
                };

                var initComplete = scope.$watch('data', function (data) {
                    if (data && data.length) {

                        originalData = angular.copy(scope.data);
                        scope.reference = new Dygraph(element[0], scope.data, angular.extend(defaultOptions, scope.options, true), scope.optional);

                        scope.loading = false;
                        var loadingSpinnerTemplate = '<div data-ng-show="loading" style="float: left; padding: 0 50%"><i class="fa fa-spinner fa-pulse fa-3x fa-fw margin-bottom"></i></div>';
                        element.prepend($compile(loadingSpinnerTemplate)(scope));

                        if (scope.onRangeChange) {
                            rangeSelectorListener(function (xAxisRange) {
                                rangeChangeCallback(xAxisRange);
                            });
                        }

                        initComplete();
                    }
                });
            }
        };
    }]);

    return {
        angularModules: ['dygraphs']
    };
});
