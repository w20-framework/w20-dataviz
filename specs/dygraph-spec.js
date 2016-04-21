/*
 * Copyright (c) 2013-2016, The SeedStack authors <http://seedstack.org>
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

define([
    'require',
    '{angular}/angular',
    '{angular-mocks}/angular-mocks',
    '{w20-dataviz}/modules/dygraphs'
], function (require, angular) {
    'use strict';

    describe('the dygraph directive', function () {
        var $scope,
            $compile,
            $location,
            dygraph,
            dygraphScope;

        var mockedCVSData = 'Date,High,Low\n20070101,62,39\n20070102,62,44\n20070105,54,60\n20070106,55,36',
            mockedRawData = [
                [20070101, 62, 39],
                [20070102, 62, 44],
                [20070103, 62, 42],
                [20070104, 57, 45],
                [20070105, 54, 44],
                [20070106, 55, 36],
                [20070107, 62, 45]
            ];

        beforeEach(function () {
            angular.mock.module('dygraphs');

            angular.mock.inject(function (_$rootScope_, _$compile_, _$location_) {
                $compile = _$compile_;
                $location = _$location_;
                $scope = _$rootScope_.$new();
                $scope.$digest();
            });

            dygraph = $compile('<div w20-dygraph data="data" reference="reference" options="options" on-range-change="change"></div>')($scope);
            dygraphScope = dygraph.isolateScope();
            $scope.$digest();
        });

        afterEach(function () {
            $scope.data = undefined;
            $scope.options = undefined;
            dygraphScope = undefined;
        });

        it('should not create a new Dygraph instance if data is undefined', function () {
            expect($scope.data).toBeUndefined();
            expect(dygraphScope.reference).toBeUndefined();
            expect($scope.reference).toBeUndefined();
        });

        it('should create a two way bounded Dygraph instance when data is defined', function () {
            $scope.data = mockedCVSData;
            $scope.$digest();
            expect($scope.data).toBeDefined();
            expect(dygraphScope.reference).toBeDefined();
            expect($scope.reference).toBe(dygraphScope.reference);
        });

        it('should merge graph options with the default one', function () {
            $scope.data = mockedCVSData;
            $scope.options = {
                connectSeparatedPoints: false
            };
            $scope.$digest();
            expect(dygraphScope.reference.user_attrs_.connectSeparatedPoints).toBeFalsy();
        });

        it('should call the update function with a zoom range and a done callback when the range is modified', function () {
            $scope.data = mockedCVSData;
            $scope.change = jasmine.createSpy('change');
            $scope.$digest();
            expect($scope.change).not.toHaveBeenCalled();
            var expectedXaxisRange = [1461243958000, 1463835958000];
            $scope.reference.doZoomXDates_.apply($scope.reference, expectedXaxisRange);
            $scope.$digest();
            expect($scope.change).toHaveBeenCalledWith(expectedXaxisRange, jasmine.any(Function));
        });

        it('should merge the zoom details with the original data (CSV)', function () {
            $scope.data = mockedCVSData;
            $scope.change = function (arr, done) {
                done('Date,High,Low\n20070102,62,44\n20070103,62,23\n20070104,57,26\n20070105,54,60');
            };
            $scope.$digest();
            var originalParsedData = [[1167609600000, 62, 39], [1167696000000, 62, 44], [1167955200000, 54, 60], [1168041600000, 55, 36]];
            expect($scope.reference.rawData_).toEqual(originalParsedData);
            $scope.reference.doZoomXDates_(1167747312000, 1168006512000);
            $scope.$digest();
            var expectedMergedData = [[1167609600000, 62, 39], [1167696000000, 62, 44], [1167782400000, 62, 23], [1167868800000, 57, 26], [1167955200000, 54, 60], [1167955200000, 54, 60], [1168041600000, 55, 36]];
            expect($scope.reference.rawData_).toEqual(expectedMergedData);
        });

        it('should merge the zoom details with the original data (CSV)', function () {
            $scope.data = mockedRawData;
            $scope.change = function (arr, done) {
                done([
                    [20070103, 62, 42],
                    [20070104, 57, 45],
                    [20070105, 54, 44],
                    [20070106, 55, 36]
                ]);
            };
            $scope.$digest();
            expect($scope.reference.rawData_).toEqual(mockedRawData);
            $scope.reference.doZoomXDates_(1167785594000, 1168044794000);
            $scope.$digest();
            var expectedMergedData = [[20070101, 62, 39], [20070102, 62, 44], [20070103, 62, 42], [20070104, 57, 45], [20070105, 54, 44], [20070106, 55, 36], [20070106, 55, 36], [20070107, 62, 45]];
            expect($scope.reference.rawData_).toEqual(expectedMergedData);
        });
    });
});