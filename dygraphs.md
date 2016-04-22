---
title: "Dygraphs"
name: "W20 dataviz"
tags:
    - "w20"
    - "frontend"
    - "chart"
    - "plot"
    - "linechart"
    - "visualization"
    - "sampling"
zones:
    - Addons
menu:
    W20Dataviz:
        weight: 20
---

[Dygraphs](http://dygraphs.com/) is a fast charting library that allows users to explore large data sets. It plots data series as lines.
The W20 integration provides an AngularJS directive augmented with an option to load down-sampled data while zooming.

# Dygraphs

## Installation

See the installation of the Dataviz addon in the [basics](/addons/w20-dataviz/) section

## Configuration

Declare the `dygraphs` module in the `modules` section of the dataviz fragment

```json
"w20-dataviz": {
    "modules": {
        "dygraphs": {}
    }
}
```

# Directive

Below you can find an example of a dygrah declaration with all its attributes:

```html
<div w20-dygraph
     data="data"
     options="options"
     reference="reference"
     on-range-change="change">
</div> 
```

## Attributes

- **data**: The initial data to provide to the dygraph. Data format can either be of type `string` (CSV), `array` or `url`. If no data is passed or if the values are empty, the graph will not be instatntiated.

### String (CSV) data set

CSV, for Comma Separated Values, is a lightweight data format that can be transmitted as `string` to the dygraph. It is often used while exporting data from tools like MS Excel for instance. Here is an example of a CVS data set which represents two series of maximum and minimum temperatures during consecutive days of january 2007.

```
Date,High,Low
20070101,62,39
20070102,62,44
20070103,62,42
20070104,57,45
20070105,54,44
20070106,55,36
20070107,62,45
```

The first line is the data set header. Dygraphs will use these information for labelling the axis and series. For each row of data, the first element correspond to the X-axis while the remaining values represents the series value at this abscissa.

### Raw data set

You can also pass an array of data to the graph instead of a CSV formatted string. Here is the same example as above in raw data format.

```json
[
    [20070101,62,39]
    [20070102,62,44]
    [20070103,62,42]
    [20070104,57,45]
    [20070105,54,44]
    [20070106,55,36]
    [20070107,62,45]
]
```

The information about series name is lost when using raw data format. Headers for native format must be specified via the `labels` option (see options attribute).

### URL

Alternatively you can use a url as the value of the data attribute. Dygraphs will try to issue a GET request to this url and use the response as the data value. The response should be of one of the aforementioned type. 

- **options**: This attributes allows you to merge your custom options with the default one provided by the directive. The available options are documented on the dygraphs [options](http://dygraphs.com/options.html) page.

- **reference**: This attribute establishes a two way data binding between the dygraph instance created in the directive and the reference passed to this attribute.

```html
<div w20-dygraph reference="myReference" ...></div>
```

```javascript
console.info($scope.myReference instanceof Dygraph); // true
```

Please note that data must be passed to the graph before a reference could be created. This means that the reference could be undefined if you try to access it prior to the graph instantiation.

- **on-range-change**: This attribute should receive a function reference which, if defined, will display a range selector below the graph and trigger the function whenever the range changes. See next section for details.

# Server side down sampling

Dygraph can handle large data sets but feeding a massive amount of data to the client still pose a problem in terms of network performance. One technique to avoid this issue is to load a reasonable amount of data points initially and request more data points on the range the user has selected. This behavior can be triggered by declaring the `on-range-attribute` on the directive element.

Example: Our backend has a REST resource `'/data'` which returns a data set interval defined by the two query params `min` and `max`:

```html
<div w20-dygraph
     data="data"
     options="options"
     reference="reference"
     on-range-change="onRangeChange">
</div> 
```

```javascript
var minValue = 1461327631000, 
    max value = 1461414031000;

$http.get('/data', { params: { min: minValue, max: maxValue })
     .then(function (data) { $scope.data = data; });

$scope.onRangeChange = function (rangeArray, doneCallback) {
    var lowerLimit = rangeArray[0],
        upperLimit = rangeArray[1];

     $http.get('/data', { params: { min: lowerLimit, max: upperLimit })
          .then(function (moreDetailedData) { 
             doneCallback(moreDetailedData);
          });   
}
```

We start by requesting the original data set and set our initial `$scope.data` with the result. As soon as data is available, the directive will create a new Dygraph instance and plot the graph to the div. 

When the user interact with the graph through the range selector or by click-moving on the graph canvas, the `onRangeChange` function is called with two parameters:

- **rangeArray**: An array of length 2 which contains the lower and upper limit selected by the range selector.
- **doneCallback**: A function callback which must be called with the more fine grained data set for the specific interval. 

When the `doneCallback` function is called, the argument it is passed will be merged into the original data set (supplied to $scope.data).
