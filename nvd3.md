---
title: "Nvd3"
name: "W20 dataviz"
tags:
    - "w20"
    - "frontend"
    - "chart"
    - "pie"
    - "bar"
    - "visualization"
zones:
    - Addons
menu:
    W20Dataviz:
        weight: 10
---

# Nvd3

[Nvd3](http://nvd3.org/) is a data visualization library build on top of the popular [d3](https://d3js.org/) library. It offers several chart types for
common visualization needs. The web framework add an AngularJS integration in the form of directives, along with sensible defaults for these different charts.

{{% button href="http://w20-framework.github.io/w20-dataviz" label="Live demo" %}}

# Multibar

The multibar chart is used to compare different series in a bar representation following the X axis.

## Configuration

```
"multibar":{},
```

The w20MultibarChart directive allows you to declare the chart on your html markup and specify the configuration object to be used in your controller.

{{% callout warning %}}
You must indicate a unique id for the chart
{{% /callout %}}

```
<div id="multibar" data-w20-multibar-chart="multibarConfig"></div>
```
## Data format

 Data fed to the multibar chart should follow a default format. This format can be overridden by the use of personal function (See "x" and "y" properties below).

 Default data format exemple :

      [
       {
          "key": "Series 1",
          "values": [ [1, 10], [2, 20], [3, 5] ]
       },
       {
          "key": "Series 2",
          "values": [ [1, 8], [2, 10], [3, 15] ]
       }
      ]

 The <code>key</code> property defines the name of the series. The <code>values</code> defines the data of the series. By default the value at index 0 of each sub array is plotted on the X axis while the value at index 1 is plotted on the Y axis.


## Multibar configuration

 The multibar chart is configured by the configuration object passed to the directive declaration (see Directives).

  Exemple :

      $scope.multibarConfig = {
          data: $scope.multibarData,
          yAxisShowMaxMin: true,
          xAxisShowMaxMin: true,
          showLegend: true,
          showControls: true,
          tooltips: true,
          yaxislabel: 'The Y axis title',
          xaxislabel: 'The X axis title',
          xaxistickformat: xAxisTickFormatMultibar // custom function to configure X axis
      }

 Available properties :

<table style="width: 100%; text-align: left;" class="table table-striped table-bordered table-condensed">
    <thead>
    <tr>
        <th>Properties</th>
        <th>Type</th>
        <th>Description</th>
    </tr>
    </thead>
    <tbody>
    <tr>
        <td>data</td>
        <td>Array</td>
        <td>Data to display using the multibar chart (mandatory if you don't define the "noData" property.).
            Generally it would be a property of $scope
        </td>
    </tr>
    <tr>
        <td>x</td>
        <td>function</td>
        <td>Providing a function to the x property allows configuration of the data on the X axis.
            Consider this example : say we want to double the data value displayed on the X axis in comparison
            to the data provided to the "data" property.
            We can achieve this by providing the following function to the x property :
            <code>function(d){
                return d[0]*2;
                };
            </code>
            where "d[0]" is all the values at index 0 of all sub arrays of the array at property "values" of
            all objects in the array provided to the "data" property.
        </td>
    </tr>
    <tr>
            <td>y</td>
            <td>function</td>
            <td>See "x" property above. Applied to the Y axis instead.</td>
    </tr>
      <tr>
                  <td>forceY</td>
                  <td>Array</td>
                  <td>Values to force on the Y axis. By default the Y axis will start at the minimum value of the serie.
                      Use it to force special values such as 0.
                  </td>
              </tr>
              <tr>
                  <td>showLegend</td>
                  <td>Boolean</td>
                  <td>Display or hide legend.</td>
              </tr>
              <tr>
                  <td>showControls</td>
                  <td>Boolean</td>
                  <td>Display or hide controls.</td>
              </tr>
              <tr>
                  <td>tooltips</td>
                  <td>Boolean</td>
                  <td>Enable or disable tooltips when hovering the chart.</td>
              </tr>
              <tr>
                  <td>reduceXTicks</td>
                  <td>Boolean</td>
                  <td>Reduce the number of ticks on the X axis</td>
              </tr>
              <tr>
                  <td>staggerLabels</td>
                  <td>Boolean</td>
                  <td>Create a gap between labels so that they don't overlap on each other if they are too many</td>
              </tr>
              <tr>
                  <td>noData</td>
                  <td>String</td>
                  <td>Message to display when there is no data (default to "No data available")</td>
              </tr>
              <tr>
                  <td>rotateLabels</td>
                  <td>integer</td>
                  <td>Rotation to apply to X axis labels (0 : horizontal(default), 90 : vertical)</td>
              </tr>
              <tr>
                  <td>color</td>
                  <td>Array</td>
                  <td> Color of series in the corresponding order. Can be hexadecimal, named or RGB.
                      Ex. <code>['#4D9FF2', 'yellow', 'rgb(151,109,165)']</code>. Note that you can also
                      specify the value of the color in the "data" array by providing a "color" attribute to each object.
                  </td>
              </tr>
              <tr>
                  <td>stacked</td>
                  <td>Boolean</td>
                  <td>Indicate whether the series should be stacked on each other or not.</td>
              </tr>
              <tr>
                      <td> tooltipContent</td>
                      <td>function</td>
                      <td>Customize tooltip content.
                          Ex.
                           function(key, x, y, e, graph) { return '&lth1&gt Tooltip Title &lt/h1&gt &ltp&gt'+ y
                              +'&lt/p&gt';}
                          where key, x and y are the name and value of the series at the tooltip point, e an event and graph the chart
                          object.
                      </td>
                  </tr>
                  <tr>
                      <td>transitionDuration</td>
                      <td>integer</td>
                      <td>Duration of transition effect (Default to 500).</td>
                  </tr>
    </tbody>
</table>


## Axis Configuration

 Axis are configured in the same configuration object.

### X axis :

  <table style="width: 100%; text-align: left;" class="table table-striped table-bordered table-condensed">
    <thead>
        <tr>
            <th>Properties</th>
            <th>Type</th>
            <th>Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>xAxisTickValues</td>
            <td>Array</td>
            <td> Specify explicitly the values to plot on the X axis</td>
        </tr>
         <tr>
            <td>xAxisTickSubdivide</td>
            <td>Integer</td>
            <td> Specify the number of intermediate ticks to show on the X axis </td>
        </tr>
         <tr>
            <td>xAxisTickPadding</td>
            <td>Integer</td>
            <td>Specify ticks padding on the X axis</td>
        </tr>
         <tr>
            <td>xAxisTickFormat</td>
            <td>function</td>
            <td> Specify how data should be formatted. For instance you can format number on the X axis to
            have exactly two digit after the decimal point : <code> d3.format('.2f')</code>. Or format Date object to
            a readable format as <code> d3.time.format('%Y')</code> which shows the year only. See
            <a href="https://github.com/mbostock/d3/wiki/Formatting" target="_blank">d3.js documentation</a>
            for a list of all format available
            </td>
        </tr>
         <tr>
            <td>xAxisLabel</td>
            <td>String</td>
            <td>Label of the X axis</td>
        </tr>
         <tr>
            <td>xAxisDomain</td>
            <td>Array [start, end]</td>
            <td> Specify the domain on the X axis (min to max value)</td>
        </tr>
         <tr>
            <td>xAxisShowMaxMin</td>
            <td>Boolean</td>
            <td> Show or hide maximum and minimum value in bold</td>
        </tr>
        <tr>
            <td>xAxisRotateLabels</td>
            <td>Integer</td>
            <td> 0 to 180° rotation of X axis tick label</td>
        </tr>
         <tr>
            <td>xAxisStaggerLabels</td>
            <td>Integer</td>
            <td>Size of the gap between labels to resolve overlapping issue</td>
        </tr>
    </tbody>
  </table>

### Y axis :

See X axis. Replace property "xName" by "yName".

# Pie

The pie chart is used to represent proportion between series.

## Configuration

     "pie":{},

The w20PieChart directive allows you to declare the chart on your html markup and specify the configuration object to be used in your controller.

{{% callout warning %}}
You must indicate a unique id for the chart
{{% /callout %}}

```
<div id="pie" data-w20-pie-chart="pieConfig"></div>
```

## Data format

Data fed to the pie chart should follow a default format. This format can be overridden by the use of personal function (See "x" and "y" properties below).

Default data format exemple :

```
     [
      {
         "key": "Series 1",
         "value": 10
      },
      {
         "key": "Series 2",
         "value": 20
      }
     ]
```
{{% callout tips %}}
Note that the pie/donut chart has "value" by default instead of "values" as it can only represent one single value
{{% /callout %}}

The `key` property defines the name of the series. The `value` defines the data of the series.

## Pie chart configuration

The pie chart is configured by the configuration object passed to the directive declaration (see Directives).

 Exemple :

```
    $scope.pieConfig = {
      data:$scope.pieData,
      showLabels:true,
      pieLabelsOutside:true,
      showValues:true,
      tooltips:true,
      labelType:'percent',
      showLegend:true
    }
```

Available properties :


<table style="width: 100%; text-align: left;" class="table table-striped table-bordered table-condensed">
   <thead>
       <tr>
           <th>Properties</th>
           <th>Type</th>
           <th>Description</th>
       </tr>
   </thead>
   <tbody>
       <tr>
           <td>data</td>
           <td>Numeric</td>
           <td>Data to display using the pie chart (mandatory if you don't define the "noData" property.).</td>
       </tr>
       <tr>
           <td>x</td>
           <td>function</td>
           <td>Providing a function to the x property allows configuration of the data on the "X" axis.
            Consider this example : say we want to customize the key value displayed on the "X" axis (X refer to the key and Y to the value)
            in comparison to the data provided to the "data" property.
           We can achieve this by providing the following function to the x property :
           function(){
                           return d.key+" a custom string appended";
                  };
             where "d.key" is all the values of key in the array passed to property "data".
           </td>
       </tr>
       <tr>
           <td>y</td>
           <td>function</td>
           <td>See "x" property above. Applied to the Y axis instead. (Exemple : double value :
               function(){
                      return d.value*2;
                  }
           </td>
       </tr>
       <tr>
           <td>showLegend</td>
           <td>Boolean</td>
           <td>Display or hide legend.</td>
       </tr>
       <tr>
           <td>tooltips</td>
           <td>Boolean</td>
           <td>Enable or disable tooltips when hovering the chart.</td>
       </tr>
         <tr>
           <td>noData</td>
           <td>String</td>
           <td>Message to display when there is no data (default to "No data available") </td>
       </tr>
         <tr>
           <td>color</td>
           <td>Array</td>
           <td> Color of series in the corresponding order. Can be hexadecimal, named  or RGB. Ex.  ['#4D9FF2', 'yellow', 'rgb(151,109,165)']. Note that you can also
           specify the value of the color in the "data" array by providing a "color" attribute to each object. </td>
       </tr>
          <tr>
           <td> tooltipContent</td>
           <td>function</td>
           <td>Customize tooltip content. Ex. function(key, x, y, e, graph) { return '&lth1&gt Tooltip Title &lt/h1&gt &ltp&gt'+ y +'&lt/p&gt';}
           where key, x and y are the name and value of the series at the tooltip point, e an event and graph the chart object.</td>
       </tr>
        <tr>
           <td>transitionDuration</td>
           <td>integer</td>
           <td>Duration of transition effect (Default to 500).</td>
       </tr>
        <tr>
           <td>showLabels</td>
           <td>Boolean</td>
           <td>Show or hide labels.</td>
       </tr>
       <tr>
           <td>labelType</td>
           <td>String</td>
           <td>What the label would display : 'key', 'value' or 'percent'.</td>
       </tr>
       <tr>
           <td>pieLabelsOutside</td>
           <td>Boolean</td>
           <td>Should the label be inside or outside the chart.</td>
       </tr>
        <tr>
           <td>valueFormat</td>
           <td>function</td>
           <td>Custom formating of values. For instance one can print values in .2f decimal
           by passing d3.format(',.2f') to this property. See <a href="https://github.com/mbostock/d3/wiki/Formatting" target="_blank">d3.js documentation</a>
           for a list of format value.</td>
       </tr>
        <tr>
           <td>donut</td>
           <td>Boolean</td>
           <td>Display the chart as a donut</td>
       </tr>
          <tr>
           <td>donutLabelsOutside</td>
           <td>Boolean</td>
           <td>Should the label be inside or outside the chart</td>
       </tr>
            </tr>
          <tr>
           <td>donutRatio</td>
           <td>Numeric</td>
           <td>Ratio between the hole and edge of donut (Default 0.5)</td>
       </tr>
   </tbody>
</table>

# Scatter/Bubble chart

The scatter chart is used to compare different series between 3 values : X and Y axis + size of data.

## Configuration

```
"scatter":{}
```

The w20ScatterChart directive allows you to declare the chart on your html markup and specify the configuration object to be used in your controller.

 {{% callout warning %}}
  You must indicate a unique id for the chart
 {{% /callout %}}

```
<div id="scatter" data-w20-scatter-chart="scatterConfig"></div>
```

## Fragment definition sections

This module has no fragment definition section.


## Data format

Data fed to the scatter chart should follow a default format.

Default data format exemple :

```
      [
       {
          "key": "Series 1",
          "values": [ {
                    x: 10,
                    y: 20,
                    size: 0.5
                    },
                    {
                    x: 12,
                    y: 13,
                    size: 0.9
                    }
                    ]
       },
       {
          "key": "Series 2",
          "values":  [ {
                     x: 15,
                     y: 2,
                     size: 0.5
                     },
                     {
                     x: 15,
                     y: 13,
                     size: 0.6
                     }
                     ]
       }
      ]
```

 The <code>key</code> property defines the name of the series. The <code>values</code> defines the data of the series.


## Scatter chart configuration

 The scatter chart is configured by the configuration object passed to the directive declaration (see Directives).

  Exemple :

```
     $scope.scatterConfig = {
       data: $scope.scatterChartData,
       tooltips: true,
       showLegend: true,
       showControls: true,
     }
```

 Available properties :

 <table style="width: 100%; text-align: left;" class="table table-striped table-bordered table-condensed">
    <thead>
        <tr>
            <th>Properties</th>
            <th>Type</th>
            <th>Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>data</td>
            <td>Array</td>
            <td>Data to display using the scatter chart (mandatory if you don't define the "noData" property.). Generally it would be a property of $scope</td>
        </tr>
        <tr>
            <td>x</td>
            <td>function</td>
            <td>Providing a function to the x property allows configuration of the data on the X axis. Consider this example :
            say we want to double the data value displayed on the X axis in comparison to the data provided to the "data" property.
            We can achieve this by providing the following function to the x property :
            function(){
                       return function(d){
                            return d[0]*2;
                        };
                   };
              where "d[0]" is all the values at index 0 of all sub arrays of the array at property "values" of all objects in the array provided to the "data" property.
            </td>
        </tr>
        <tr>
            <td>tooltipXContent</td>
            <td>function</td>
            <td>Customize tooltip content on the X axis (require tooltips to be true). Ex :
                function (key, x, y) {
                                   return '&ltstrong&gt' + x + '&lt/strong&gt';
                               })
             </td>
        </tr>
        <tr>
            <td>tooltipYContent</td>
            <td>function</td>
            <td>Customize tooltip content on the X axis (require tooltips to be true). Ex :
                function (key, x, y) {
                                   return '&ltstrong&gt' + y + '&lt/strong&gt';
                               })
            </td>
        </tr>
        <tr>
            <td>showLegend</td>
            <td>Boolean</td>
            <td>Display or hide legend.</td>
        </tr>
        <tr>
            <td>showControls</td>
            <td>Boolean</td>
            <td>Display or hide controls.</td>
        </tr>
        <tr>
            <td>tooltips</td>
            <td>Boolean</td>
            <td>Enable or disable tooltips when hovering the chart.</td>
        </tr>
        <tr>
            <td>showDistX</td>
            <td>Boolean</td>
            <td>Show/hide a line marker to the X value when hovering the point</td>
        </tr>
        <tr>
            <td>showDistY</td>
            <td>Boolean</td>
            <td>Show/hide a line marker to the Y value when hovering the point</td>
        </tr>
          <tr>
            <td>noData</td>
            <td>String</td>
            <td>Message to display when there is no data (default to "No data available") </td>
        </tr>
          <tr>
            <td>xPadding</td>
            <td>Numeric</td>
            <td>distance between ticks on the X axis</td>
        </tr>
         <tr>
            <td>yPadding</td>
            <td>Numeric</td>
            <td>distance between ticks on the Y axis</td>
        </tr>
          <tr>
            <td>color</td>
            <td>Array</td>
            <td> Color of series in the corresponding order. Can be hexadecimal, named  or RGB. Ex.  <code>['#4D9FF2', 'yellow', 'rgb(151,109,165)']</code>. Note that you can also
            specify the value of the color in the "data" array by providing a "color" attribute to each object. </td>
        </tr>
         <tr>
            <td>transitionDuration</td>
            <td>integer</td>
            <td>Duration of transition effect (Default to 500).</td>
        </tr>
          <tr>
            <td>fisheye</td>
            <td>Numeric</td>
            <td>Magnifying factor (when showControls is true)</td>
        </tr>
    </tbody>
 </table>


## Axis Configuration

 Axis are configured in the same configuration object.

 X axis :

  <table style="width: 100%; text-align: left;" class="table table-striped table-bordered table-condensed">
    <thead>
        <tr>
            <th>Properties</th>
            <th>Type</th>
            <th>Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>xAxisTickValues</td>
            <td>Array</td>
            <td> Specify explicitly the values to plot on the X axis</td>
        </tr>
         <tr>
            <td>xAxisTickSubdivide</td>
            <td>Integer</td>
            <td> Specify the number of intermediate ticks to show on the X axis </td>
        </tr>
         <tr>
            <td>xAxisTickPadding</td>
            <td>Integer</td>
            <td>Specify ticks padding on the X axis</td>
        </tr>
         <tr>
            <td>xAxisTickFormat</td>
            <td>function</td>
            <td> Specify how data should be formatted. For instance you can format number on the X axis to
            have exactly two digit after the decimal point : <code> d3.format('.2f')</code>. Or format Date object to
            a readable format as <code> d3.time.format('%Y')</code> which shows the year only. See
            <a href="https://github.com/mbostock/d3/wiki/Formatting" target="_blank">d3.js documentation</a>
            for a list of all format available
            </td>
        </tr>
         <tr>
            <td>xAxisLabel</td>
            <td>String</td>
            <td>Label of the X axis</td>
        </tr>
         <tr>
            <td>xAxisDomain</td>
            <td>Array [start, end]</td>
            <td> Specify the domain on the X axis (min to max value)</td>
        </tr>
         <tr>
            <td>xAxisShowMaxMin</td>
            <td>Boolean</td>
            <td> Show or hide maximum and minimum value in bold</td>
        </tr>
        <tr>
            <td>xAxisRotateLabels</td>
            <td>Integer</td>
            <td> 0 to 180° rotation of X axis tick label</td>
        </tr>
         <tr>
            <td>xAxisStaggerLabels</td>
            <td>Integer</td>
            <td>Size of the gap between labels to resolve overlapping issue</td>
        </tr>
    </tbody>
  </table>

  Y axis :

  See X axis. Replace property "xName" by "yName".

# Discrete bar

The discretebar chart is used to compare different series in a bar representation.

## Configuration

```
"discretebar":{}
```

The w20DiscreteBarChart directive allows you to declare the chart on your html markup and specify the configuration object to be used in your controller.

 {{% callout warning %}}
  You must indicate a unique id for the chart
 {{% /callout %}}

```
<div id="discretebar" data-w20-discrete-bar-chart="discreteConfig"></div>
```

## Data format

 Data fed to the discretebar chart should follow a default format. This format can be overridden by the use of personal function (See "x" and "y" properties below).

 Default data format exemple :

      [
       {
          "key": "Series 1",
          "values": [ [1, 10], [2, 20], [3, 5] ]
       },
       {
          "key": "Series 2",
          "values": [ [1, 8], [2, 10], [3, 15] ]
       }
      ]

 The <code>key</code> property defines the name of the series. The <code>values</code> defines the data of the series. By default the value at index 0 of each sub array is plotted on the X axis while the value at index 1 is plotted on the Y axis.


 ## Discretebar configuration

 The discretebar chart is configured by the configuration object passed to the directive declaration (see Directives).

  Exemple :

       $scope.discreteBarConfig = {
               data: $scope.discreteBarData,
               tooltips: true,
               showValues: true

       }

 Available properties :

 <table style="width: 100%; text-align: left;" class="table table-striped table-bordered table-condensed">
    <thead>
        <tr>
            <th>Properties</th>
            <th>Type</th>
            <th>Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>data</td>
            <td>Array</td>
            <td>Data to display using the discretebar chart (mandatory if you don't define the "noData" property.). Generally it would be a property of $scope</td>
        </tr>
        <tr>
            <td>x</td>
            <td>function</td>
            <td>Providing a function to the x property allows configuration of the data on the X axis. Consider this example : say we want to double the data value displayed on the X axis in comparison to the data provided to the "data" property.
            We can achieve this by providing the following function to the x property :
            function(){
                       return function(d){
                            return d[0]*2;
                        };
                   };
              where "d[0]" is all the values at index 0 of all sub arrays of the array at property "values" of all objects in the array provided to the "data" property.
            </td>
        </tr>
        <tr>
            <td>y</td>
            <td>function</td>
            <td>See "x" property above. Applied to the Y axis instead.</td>
        </tr>
        <tr>
            <td>forceY</td>
            <td>Array</td>
            <td>Values to force on the Y axis. By default the Y axis will start at the minimum value of the serie. Use it to force special values such as 0.</td>
        </tr>
        <tr>
            <td>showValues</td>
            <td>Boolean</td>
            <td>Display the value of the bar on top of them.</td>
        </tr>
       <tr>
            <td>valueFormat</td>
            <td>function</td>
            <td>Format the value displayed when showValues is true. Ex: <code> d3.format('.2f')</code></td>
        </tr>
        <tr>
            <td>tooltips</td>
            <td>Boolean</td>
            <td>Enable or disable tooltips when hovering the chart.</td>
        </tr>
        <tr>
            <td>staggerLabels</td>
            <td>Boolean</td>
            <td>Create a gap between labels so that they don't overlap on each other if they are too many </td>
        </tr>
          <tr>
            <td>noData</td>
            <td>String</td>
            <td>Message to display when there is no data (default to "No data available") </td>
        </tr>
          <tr>
            <td>color</td>
            <td>Array</td>
            <td> Color of series in the corresponding order. Can be hexadecimal, named  or RGB. Ex.  ['#4D9FF2', 'yellow', 'rgb(151,109,165)']. Note that you can also
            specify the value of the color in the "data" array by providing a "color" attribute to each object. </td>
        </tr>
           <tr>
            <td> tooltipContent</td>
            <td>function</td>
            <td>Customize tooltip content. Ex.  function(key, x, y, e, graph) { return '&lth1&gt Tooltip Title &lt/h1&gt &ltp&gt'+ y +'&lt/p&gt';}
            where key, x and y are the name and value of the series at the tooltip point, e an event and graph the chart object.</td>
        </tr>
         <tr>
            <td>transitionDuration</td>
            <td>integer</td>
            <td>Duration of transition effect (Default to 500).</td>
        </tr>
    </tbody>
 </table>


## Axis Configuration

 Axis are configured in the same configuration object.

 X axis :

  <table style="width: 100%; text-align: left;" class="table table-striped table-bordered table-condensed">
    <thead>
        <tr>
            <th>Properties</th>
            <th>Type</th>
            <th>Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>xAxisTickValues</td>
            <td>Array</td>
            <td> Specify explicitly the values to plot on the X axis</td>
        </tr>
         <tr>
            <td>xAxisTickSubdivide</td>
            <td>Integer</td>
            <td> Specify the number of intermediate ticks to show on the X axis </td>
        </tr>
         <tr>
            <td>xAxisTickPadding</td>
            <td>Integer</td>
            <td>Specify ticks padding on the X axis</td>
        </tr>
         <tr>
            <td>xAxisTickFormat</td>
            <td>function</td>
            <td> Specify how data should be formatted. For instance you can format number on the X axis to
            have exactly two digit after the decimal point : <code> d3.format('.2f')</code>. Or format Date object to
            a readable format as <code> d3.time.format('%Y')</code> which shows the year only. See
            <a href="https://github.com/mbostock/d3/wiki/Formatting" target="_blank">d3.js documentation</a>
            for a list of all format available
            </td>
        </tr>
         <tr>
            <td>xAxisLabel</td>
            <td>String</td>
            <td>Label of the X axis</td>
        </tr>
         <tr>
            <td>xAxisDomain</td>
            <td>Array [start, end]</td>
            <td> Specify the domain on the X axis (min to max value)</td>
        </tr>
         <tr>
            <td>xAxisShowMaxMin</td>
            <td>Boolean</td>
            <td> Show or hide maximum and minimum value in bold</td>
        </tr>
        <tr>
            <td>xAxisRotateLabels</td>
            <td>Integer</td>
            <td> 0 to 180° rotation of X axis tick label</td>
        </tr>
         <tr>
            <td>xAxisStaggerLabels</td>
            <td>Integer</td>
            <td>Size of the gap between labels to resolve overlapping issue</td>
        </tr>
    </tbody>
  </table>

 Y axis :

  See X axis. Replace property "xName" by "yName".

# Line with focus

The line with focus chart is used to explore series on a long range of values. You can restrict the range with
the chart below the main chart to render data in a more precise way.

## Configuration

```
"linewithfocus":{}
```

The w20LineWithFocusChart directive allows you to declare the chart on your html markup and specify the configuration object to be used in your controller.

{{% callout warning %}}
 You must indicate a unique id for the chart
{{% /callout %}}

```
<div id="linewithfocus" data-w20-line-with-focus-chart="lineWithFocusConfig"></div>
```

## Fragment definition sections

 This module has no fragment definition section.

## Data format

 Data fed to the line with focus chart should follow a default format. This format can be overridden by the use of personal function (See "x" and "y" properties below).

 Default data format exemple :

      [
       {
          "key": "Series 1",
          "values": [ [1, 10], [2, 20], [3, 5] ]
       },
       {
          "key": "Series 2",
          "values": [ [1, 8], [2, 10], [3, 15] ]
       }
      ]

 The <code>key</code> property defines the name of the series. The <code>values</code> defines the data of the series. By default the value at index 0 of each sub array is plotted on the X axis while the value at index 1 is plotted on the Y axis.


## Line with focus configuration

 The line with focus chart is configured by the configuration object passed to the directive declaration (see Directives).

  Exemple :

       $scope.lineWithFocusConfig = {
       data: $scope.linefocusdata,
       tooltips: true
       }

 Available properties :

 <table style="width: 100%; text-align: left;" class="table table-striped table-bordered table-condensed">
    <thead>
        <tr>
            <th>Properties</th>
            <th>Type</th>
            <th>Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>data</td>
            <td>Array</td>
            <td>Data to display using the line with focus chart (mandatory if you don't define the "noData" property.). Generally it would be a property of $scope</td>
        </tr>
        <tr>
            <td>x</td>
            <td>function</td>
            <td>Providing a function to the x property allows configuration of the data on the X axis. Consider this example : say we want to double the data value displayed on the X axis in comparison to the data provided to the "data" property.
            We can achieve this by providing the following function to the x property :
            function(){
                       return function(d){
                            return d[0]*2;
                        };
                   };
              where "d[0]" is all the values at index 0 of all sub arrays of the array at property "values" of all objects in the array provided to the "data" property.
            </td>
        </tr>
        <tr>
            <td>y</td>
            <td>function</td>
            <td>See "x" property above. Applied to the Y axis instead.</td>
        </tr>
        <tr>
            <td>forceY</td>
            <td>Array</td>
            <td>Values to force on the Y axis. By default the Y axis will start at the minimum value of the serie. Use it to force special values such as 0.</td>
        </tr>
        <tr>
            <td>showLegend</td>
            <td>Boolean</td>
            <td>Display or hide legend.</td>
        </tr>
        <tr>
            <td>tooltips</td>
            <td>Boolean</td>
            <td>Enable or disable tooltips when hovering the chart.</td>
        </tr>
          <tr>
            <td>noData</td>
            <td>String</td>
            <td>Message to display when there is no data (default to "No data available") </td>
        </tr>
          <tr>
            <td>color</td>
            <td>Array</td>
            <td> Color of series in the corresponding order. Can be hexadecimal, named  or RGB. Ex.  <code>['#4D9FF2', 'yellow', 'rgb(151,109,165)']</code>. Note that you can also
            specify the value of the color in the "data" array by providing a "color" attribute to each object. </td>
        </tr>
         <tr>
            <td>transitionDuration</td>
            <td>integer</td>
            <td>Duration of transition effect (Default to 500).</td>
        </tr>
    </tbody>
 </table>


## Axis Configuration

 Axis are configured in the same configuration object.

 X axis main chart:

  <table style="width: 100%; text-align: left;" class="table table-striped table-bordered table-condensed">
    <thead>
        <tr>
            <th>Properties</th>
            <th>Type</th>
            <th>Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>xAxisTickValues</td>
            <td>Array</td>
            <td> Specify explicitly the values to plot on the X axis</td>
        </tr>
         <tr>
            <td>xAxisTickSubdivide</td>
            <td>Integer</td>
            <td> Specify the number of intermediate ticks to show on the X axis </td>
        </tr>
         <tr>
            <td>xAxisTickPadding</td>
            <td>Integer</td>
            <td>Specify ticks padding on the X axis</td>
        </tr>
         <tr>
            <td>xAxisTickFormat</td>
            <td>function</td>
            <td> Specify how data should be formatted. For instance you can format number on the X axis to
            have exactly two digit after the decimal point : <code> d3.format('.2f')</code>. Or format Date object to
            a readable format as <code> d3.time.format('%Y')</code> which shows the year only. See
            <a href="https://github.com/mbostock/d3/wiki/Formatting" target="_blank">d3.js documentation</a>
            for a list of all format available
            </td>
        </tr>
         <tr>
            <td>xAxisLabel</td>
            <td>String</td>
            <td>Label of the X axis</td>
        </tr>
         <tr>
            <td>xAxisDomain</td>
            <td>Array [start, end]</td>
            <td> Specify the domain on the X axis (min to max value)</td>
        </tr>
         <tr>
            <td>xAxisShowMaxMin</td>
            <td>Boolean</td>
            <td> Show or hide maximum and minimum value in bold</td>
        </tr>
        <tr>
            <td>xAxisRotateLabels</td>
            <td>Integer</td>
            <td> 0 to 180° rotation of X axis tick label</td>
        </tr>
         <tr>
            <td>xAxisStaggerLabels</td>
            <td>Integer</td>
            <td>Size of the gap between labels to resolve overlapping issue</td>
        </tr>
    </tbody>
  </table>

  Y axis :

  See X axis. Replace property "xName" by "yName".

  X2 axis :

  For the small focusin chart. See X axis. Replace property 'xName' with 'x2Name'.

  Y2 axis :

  For the small focusing chart. See X axis. Replace property 'xName' with 'y2Name'.

# Stacked area

The stacked area chart is used to compare different series according to their surface area.

## Configuration

```
"stackedarea":{}
```

The w20StackedAreaChart directive allows you to declare the chart on your html markup and specify the configuration object to be used in your controller.

{{% callout warning %}}
You must indicate a unique id for the chart
{{% /callout %}}

```
<div id="stackedArea" data-w20-stacked-area-chart="stackedAreaConfig"></div>
```

## Data format

 Data fed to the stacked area chart should follow a default format. This format can be overridden by the use of personal function (See "x" and "y" properties below).

 Default data format exemple :

      [
       {
          "key": "Series 1",
          "values": [ [1, 10], [2, 20], [3, 5] ]
       },
       {
          "key": "Series 2",
          "values": [ [1, 8], [2, 10], [3, 15] ]
       }
      ]

 The <code>key</code> property defines the name of the series. The <code>values</code> defines the data of the series. By default the value at index 0 of each sub array is plotted on the X axis while the value at index 1 is plotted on the Y axis.


## Stacked area chart configuration

 The stacked area chart is configured by the configuration object passed to the directive declaration (see Directives).

  Exemple :

        $scope.stackedAreaConfig = {
               data: $scope.stackedareadata,
               tooltips: true,
               showControls: true,
               showLegend: true
       };

 Available properties :

 <table style="width: 100%; text-align: left;" class="table table-striped table-bordered table-condensed">
    <thead>
        <tr>
            <th>Properties</th>
            <th>Type</th>
            <th>Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>data</td>
            <td>Array</td>
            <td>Data to display using the multibar chart (mandatory if you don't define the "noData" property.). Generally it would be a property of $scope</td>
        </tr>
        <tr>
            <td>x</td>
            <td>function</td>
            <td>Providing a function to the x property allows configuration of the data on the X axis. Consider this example :
             say we want to double the data value displayed on the X axis in comparison to the data provided to the "data" property.
            We can achieve this by providing the following function to the x property :
            function(){
                       return function(d){
                            return d[0]*2;
                        };
                   };
              where "d[0]" is all the values at index 0 of all sub arrays of the array at property "values" of all objects in the array provided to the "data" property.
            </td>
        </tr>
        <tr>
            <td>y</td>
            <td>function</td>
            <td>See "x" property above. Applied to the Y axis instead.</td>
        </tr>
        <tr>
            <td>forceY</td>
            <td>Array</td>
            <td>Values to force on the Y axis. By default the Y axis will start at the minimum value of the serie. Use it to force special values such as 0.</td>
        </tr>
        <tr>
            <td>showLegend</td>
            <td>Boolean</td>
            <td>Display or hide legend.</td>
        </tr>
        <tr>
            <td>showControls</td>
            <td>Boolean</td>
            <td>Display or hide controls.</td>
        </tr>
        <tr>
            <td>tooltips</td>
            <td>Boolean</td>
            <td>Enable or disable tooltips when hovering the chart.</td>
        </tr>
          <tr>
            <td>noData</td>
            <td>String</td>
            <td>Message to display when there is no data (default to "No data available") </td>
        </tr>
          <tr>
            <td>color</td>
            <td>Array</td>
            <td> Color of series in the corresponding order. Can be hexadecimal, named  or RGB. Ex.  ['#4D9FF2', 'yellow', 'rgb(151,109,165)']. Note that you can also
            specify the value of the color in the "data" array by providing a "color" attribute to each object. </td>
        </tr>
           <tr>
            <td> tooltipContent</td>
            <td>function</td>
            <td>Customize tooltip content. Ex. function(key, x, y, e, graph) { return '&lth1&gt Tooltip Title &lt/h1&gt &ltp&gt'+ y +'&lt/p&gt';}
            where key, x and y are the name and value of the series at the tooltip point, e an event and graph the chart object.</td>
        </tr>
         <tr>
            <td>transitionDuration</td>
            <td>integer</td>
            <td>Duration of transition effect (Default to 500).</td>
        </tr>
    </tbody>
 </table>


## Axis Configuration

 Axis are configured in the same configuration object.

 X axis :

  <table style="width: 100%; text-align: left;" class="table table-striped table-bordered table-condensed">
    <thead>
        <tr>
            <th>Properties</th>
            <th>Type</th>
            <th>Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>xAxisTickValues</td>
            <td>Array</td>
            <td> Specify explicitly the values to plot on the X axis</td>
        </tr>
         <tr>
            <td>xAxisTickSubdivide</td>
            <td>Integer</td>
            <td> Specify the number of intermediate ticks to show on the X axis </td>
        </tr>
         <tr>
            <td>xAxisTickPadding</td>
            <td>Integer</td>
            <td>Specify ticks padding on the X axis</td>
        </tr>
         <tr>
            <td>xAxisTickFormat</td>
            <td>function</td>
            <td> Specify how data should be formatted. For instance you can format number on the X axis to
            have exactly two digit after the decimal point : <code> d3.format('.2f')</code>. Or format Date object to
            a readable format as <code> d3.time.format('%Y')</code> which shows the year only. See
            <a href="https://github.com/mbostock/d3/wiki/Formatting" target="_blank">d3.js documentation</a>
            for a list of all format available
            </td>
        </tr>
         <tr>
            <td>xAxisLabel</td>
            <td>String</td>
            <td>Label of the X axis</td>
        </tr>
         <tr>
            <td>xAxisDomain</td>
            <td>Array [start, end]</td>
            <td> Specify the domain on the X axis (min to max value)</td>
        </tr>
         <tr>
            <td>xAxisShowMaxMin</td>
            <td>Boolean</td>
            <td> Show or hide maximum and minimum value in bold</td>
        </tr>
        <tr>
            <td>xAxisRotateLabels</td>
            <td>Integer</td>
            <td> 0 to 180° rotation of X axis tick label</td>
        </tr>
         <tr>
            <td>xAxisStaggerLabels</td>
            <td>Integer</td>
            <td>Size of the gap between labels to resolve overlapping issue</td>
        </tr>
    </tbody>
  </table>

  Y axis :

 See X axis. Replace property "xName" by "yName".

# Multibar horizontal

The multibar horizontal chart is used to compare different series in a horizontal bar representation.

## Configuration

```
"multibarhorizontal":{}
```

The w20MultiBarHorizontalChart directive allows you to declare the chart on your html markup and specify the configuration object to be used in your controller.

{{% callout warning %}}
You must indicate a unique id for the chart
{{% /callout %}}

```
<div id="multibarhorizontal" data-w20-multi-bar-horizontal-chart="multibarHorizontalConfig"></div>
```

## Fragment definition sections

This module has no fragment definition section.


## Data format

Data fed to the multibar horizontal chart should follow a default format. This format can be overridden by the use of personal function (See "x" and "y" properties below).

Default data format exemple :

     [
      {
         "key": "Series 1",
         "values": [ [1, 10], [2, 20], [3, 5] ]
      },
      {
         "key": "Series 2",
         "values": [ [1, 8], [2, 10], [3, 15] ]
      }
     ]

The <code>key</code> property defines the name of the series. The <code>values</code> defines the data of the series. By default the value at index 0 of each sub array is plotted on the X axis while the value at index 1 is plotted on the Y axis.

## Multibar configuration

The multibar chart is configured by the configuration object passed to the directive declaration (see Directives).

 Exemple :

       $scope.multibarHorizontalConfig = {
              data: $scope.multibarhorizontaldata,
              showXAxis: true,
              showYAxis: true,
              tooltips: true,
              showControls: true,
              showLegend: true
        }

Available properties :

<table style="width: 100%; text-align: left;" class="table table-striped table-bordered table-condensed">
   <thead>
       <tr>
           <th>Properties</th>
           <th>Type</th>
           <th>Description</th>
       </tr>
   </thead>
   <tbody>
       <tr>
           <td>data</td>
           <td>Array</td>
           <td>Data to display using the multibar horizontal chart (mandatory if you don't define the "noData" property.). Generally it would be a property of $scope</td>
       </tr>
       <tr>
           <td>x</td>
           <td>function</td>
           <td>Providing a function to the x property allows configuration of the data on the X axis. Consider this example : say we want to double the data value displayed on the X axis in comparison to the data provided to the "data" property.
           We can achieve this by providing the following function to the x property :
           function(){
                      return function(d){
                           return d[0]*2;
                       };
                  };
             where "d[0]" is all the values at index 0 of all sub arrays of the array at property "values" of all objects in the array provided to the "data" property.
           </td>
       </tr>
       <tr>
           <td>y</td>
           <td>function</td>
           <td>See "x" property above. Applied to the Y axis instead.</td>
       </tr>
       <tr>
           <td>forceY</td>
           <td>Array</td>
           <td>Values to force on the Y axis. By default the Y axis will start at the minimum value of the serie. Use it to force special values such as 0.</td>
       </tr>
       <tr>
           <td>showLegend</td>
           <td>Boolean</td>
           <td>Display or hide legend.</td>
       </tr>
       <tr>
           <td>showControls</td>
           <td>Boolean</td>
           <td>Display or hide controls.</td>
       </tr>
       <tr>
           <td>tooltips</td>
           <td>Boolean</td>
           <td>Enable or disable tooltips when hovering the chart.</td>
       </tr>
         <tr>
           <td>noData</td>
           <td>String</td>
           <td>Message to display when there is no data (default to "No data available") </td>
       </tr>
         <tr>
           <td>color</td>
           <td>Array</td>
           <td> Color of series in the corresponding order. Can be hexadecimal, named  or RGB. Ex.  ['#4D9FF2', 'yellow', 'rgb(151,109,165)']. Note that you can also
           specify the value of the color in the "data" array by providing a "color" attribute to each object. </td>
       </tr>
        <tr>
           <td>stacked</td>
           <td>Boolean</td>
           <td>Indicate whether the series should be stacked on each other or not. </td>
       </tr>
          <tr>
           <td> tooltipContent</td>
           <td>function</td>
           <td>Customize tooltip content. Ex.function(key, x, y, e, graph) { return '&lth1&gt Tooltip Title &lt/h1&gt &ltp&gt'+ y +'&lt/p&gt';}
           where key, x and y are the name and value of the series at the tooltip point, e an event and graph the chart object.</td>
       </tr>
        <tr>
           <td>transitionDuration</td>
           <td>integer</td>
           <td>Duration of transition effect (Default to 500).</td>
       </tr>
   </tbody>
</table>

## Axis Configuration

Axis are configured in the same configuration object.

X axis :

 <table style="width: 100%; text-align: left;" class="table table-striped table-bordered table-condensed">
   <thead>
       <tr>
           <th>Properties</th>
           <th>Type</th>
           <th>Description</th>
       </tr>
   </thead>
   <tbody>
       <tr>
           <td>xAxisTickValues</td>
           <td>Array</td>
           <td> Specify explicitly the values to plot on the X axis</td>
       </tr>
        <tr>
           <td>xAxisTickSubdivide</td>
           <td>Integer</td>
           <td> Specify the number of intermediate ticks to show on the X axis </td>
       </tr>
        <tr>
           <td>xAxisTickPadding</td>
           <td>Integer</td>
           <td>Specify ticks padding on the X axis</td>
       </tr>
        <tr>
           <td>xAxisTickFormat</td>
           <td>function</td>
           <td> Specify how data should be formatted. For instance you can format number on the X axis to
           have exactly two digit after the decimal point : <code> d3.format('.2f')</code>. Or format Date object to
           a readable format as <code> d3.time.format('%Y')</code> which shows the year only. See
           <a href="https://github.com/mbostock/d3/wiki/Formatting" target="_blank">d3.js documentation</a>
           for a list of all format available
           </td>
       </tr>
        <tr>
           <td>xAxisLabel</td>
           <td>String</td>
           <td>Label of the X axis</td>
       </tr>
        <tr>
           <td>xAxisDomain</td>
           <td>Array [start, end]</td>
           <td> Specify the domain on the X axis (min to max value)</td>
       </tr>
        <tr>
           <td>xAxisShowMaxMin</td>
           <td>Boolean</td>
           <td> Show or hide maximum and minimum value in bold</td>
       </tr>
       <tr>
           <td>xAxisRotateLabels</td>
           <td>Integer</td>
           <td> 0 to 180° rotation of X axis tick label</td>
       </tr>
        <tr>
           <td>xAxisStaggerLabels</td>
           <td>Integer</td>
           <td>Size of the gap between labels to resolve overlapping issue</td>
       </tr>
   </tbody>
 </table>

 Y axis :

 See X axis. Replace property "xName" by "yName".

# Line

The line chart is used to plot series as line function.

## Configuration

```
"line":{}
```

The w20MultibarChart directive allows you to declare the chart on your html markup and specify the configuration object to be used in your controller.

{{% callout warning %}}
You must indicate a unique id for the chart
{{% /callout %}}

```
<div id="multibar" data-w20-multibar-chart="multibarConfig"></div>
```

## Data format

 Data fed to the line chart should follow a default format. This format can be overridden by the use of personal function (See "x" and "y" properties below).

 Default data format exemple :

      [
       {
          "key": "Series 1",
          "values": [ [1, 10], [2, 20], [3, 5] ]
       },
       {
          "key": "Series 2",
          "values": [ [1, 8], [2, 10], [3, 15] ]
       }
      ]

 The <code>key</code> property defines the name of the series. The <code>values</code> defines the data of the series. By default the value at index 0 of each sub array is plotted on the X axis while the value at index 1 is plotted on the Y axis.


## Line chart configuration

 The line chart is configured by the configuration object passed to the directive declaration (see Directives).

  Exemple :

        $scope.lineConfig = {
               data: $scope.lineData,
               xAxisTickSubdivide: 10,
               xAxisTickFormat: d3.format('.2f'),
               showControls: true,
               showLabels: true,
               showLegend: true,
               tooltips: true,
               showXAxis: true,
               showYAxis: true,
               xAxisHighlightZero: true,
               xAxisLabel: 'W label',
               yAxisLabel: 'y label',
               xAxisRotateLabels: 90,
               xAxisScale: d3.scale.linear(),
               xAxisDomain: [0, 10],
               yAxisDomain: [0, 100]
           }

 Available properties :

 <table style="width: 100%; text-align: left;" class="table table-striped table-bordered table-condensed">
    <thead>
        <tr>
            <th>Properties</th>
            <th>Type</th>
            <th>Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>data</td>
            <td>Array</td>
            <td>Data to display using the line chart (mandatory if you don't define the "noData" property.). Generally it would be a property of $scope</td>
        </tr>
        <tr>
            <td>x</td>
            <td>function</td>
            <td>Providing a function to the x property allows configuration of the data on the X axis. Consider this example : say we want to double the data value displayed on the X axis in comparison to the data provided to the "data" property.
            We can achieve this by providing the following function to the x property :
            function(){
                       return function(d){
                            return d[0]*2;
                        };
                   };
              where "d[0]" is all the values at index 0 of all sub arrays of the array at property "values" of all objects in the array provided to the "data" property.
            </td>
        </tr>
        <tr>
            <td>y</td>
            <td>function</td>
            <td>See "x" property above. Applied to the Y axis instead.</td>
        </tr>
        <tr>
            <td>forceY</td>
            <td>Array</td>
            <td>Values to force on the Y axis. By default the Y axis will start at the minimum value of the serie. Use it to force special values such as 0.</td>
        </tr>
        <tr>
            <td>showLegend</td>
            <td>Boolean</td>
            <td>Display or hide legend.</td>
        </tr>
        <tr>
            <td>tooltips</td>
            <td>Boolean</td>
            <td>Enable or disable tooltips when hovering the chart.</td>
        </tr>
         <tr>
            <td>isArea</td>
            <td>Boolean</td>
            <td>Color integral of series</td>
        </tr>
          <tr>
            <td>noData</td>
            <td>String</td>
            <td>Message to display when there is no data (default to "No data available") </td>
        </tr>
          <tr>
            <td>color</td>
            <td>Array</td>
            <td> Color of series in the corresponding order. Can be hexadecimal, named  or RGB. Ex. ['#4D9FF2', 'yellow', 'rgb(151,109,165)']. Note that you can also
            specify the value of the color in the "data" array by providing a "color" attribute to each object. </td>
        </tr>
           <tr>
            <td> tooltipContent</td>
            <td>function</td>
            <td>Customize tooltip content. Ex. function(key, x, y, e, graph) { return '&lth1&gt Tooltip Title &lt/h1&gt &ltp&gt'+ y +'&lt/p&gt';}
            where key, x and y are the name and value of the series at the tooltip point, e an event and graph the chart object.</td>
        </tr>
         <tr>
            <td>transitionDuration</td>
            <td>integer</td>
            <td>Duration of transition effect (Default to 500).</td>
        </tr>
         <tr>
            <td>showXAxis</td>
            <td>Boolean</td>
            <td>Show/hide X axis</td>
        </tr>
         <tr>
            <td>showYAxis</td>
            <td>Boolean</td>
            <td>Show/hide Y axis</td>
        </tr>
         <tr>
            <td>interpolate</td>
            <td>String</td>
            <td>Define the interpolation mode :
              <ul>
                    <li>linear - piecewise linear segments, as in a polyline.</li>
                    <li>linear-closed - close the linear segments to form a polygon.</li>
                    <li>step-before - alternate between vertical and horizontal segments, as in a step function.</li>
                    <li>step-after - alternate between horizontal and vertical segments, as in a step function.</li>
                    <li>basis - a B-spline, with control point duplication on the ends.</li>
                    <li>basis-open - an open B-spline; may not intersect the start or end.</li>
                    <li>basis-closed - a closed B-spline, as in a loop.</li>
                    <li>bundle - equivalent to basis, except the tension parameter is used to straighten the spline.</li>
                    <li>cardinal - a Cardinal spline, with control point duplication on the ends.</li>
                    <li>cardinal-open - an open Cardinal spline; may not intersect the start or end, but will intersect other control points.</li>
                    <li>cardinal-closed - a closed Cardinal spline, as in a loop.</li>
                    <li>monotone - cubic interpolation that preserves monotonicity in y.</li>
                </ul>
            </td>
        </tr>
    </tbody>
 </table>


## Axis Configuration

 Axis are configured in the same configuration object.

 X axis :

  <table style="width: 100%; text-align: left;" class="table table-striped table-bordered table-condensed">
    <thead>
        <tr>
            <th>Properties</th>
            <th>Type</th>
            <th>Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>xAxisTickValues</td>
            <td>Array</td>
            <td> Specify explicitly the values to plot on the X axis</td>
        </tr>
         <tr>
            <td>xAxisTickSubdivide</td>
            <td>Integer</td>
            <td> Specify the number of intermediate ticks to show on the X axis </td>
        </tr>
         <tr>
            <td>xAxisTickPadding</td>
            <td>Integer</td>
            <td>Specify ticks padding on the X axis</td>
        </tr>
         <tr>
            <td>xAxisTickFormat</td>
            <td>function</td>
            <td> Specify how data should be formatted. For instance you can format number on the X axis to
            have exactly two digit after the decimal point : <code> d3.format('.2f')</code>. Or format Date object to
            a readable format as <code> d3.time.format('%Y')</code> which shows the year only. See
            <a href="https://github.com/mbostock/d3/wiki/Formatting" target="_blank">d3.js documentation</a>
            for a list of all format available
            </td>
        </tr>
         <tr>
            <td>xAxisLabel</td>
            <td>String</td>
            <td>Label of the X axis</td>
        </tr>
         <tr>
            <td>xAxisDomain</td>
            <td>Array [start, end]</td>
            <td> Specify the domain on the X axis (min to max value)</td>
        </tr>
         <tr>
            <td>xAxisShowMaxMin</td>
            <td>Boolean</td>
            <td> Show or hide maximum and minimum value in bold</td>
        </tr>
        <tr>
            <td>xAxisRotateLabels</td>
            <td>Integer</td>
            <td> 0 to 180° rotation of X axis tick label</td>
        </tr>
         <tr>
            <td>xAxisStaggerLabels</td>
            <td>Integer</td>
            <td>Size of the gap between labels to resolve overlapping issue</td>
        </tr>
    </tbody>
  </table>

  Y axis :

  See X axis. Replace property "xName" by "yName".

# Line plus bar

The line plus bar chart is used to represent series by lines and bars on the same area..

## Configuration

```
"lineplusbar":{}
```

 The w20LinePlusBarChart directive allows you to declare the chart on your html markup and specify the configuration object to be used in your controller.

{{% callout warning %}}
You must indicate a unique id for the chart
{{% /callout %}}

```
<div id="LinePlusBarChart" data-w20-line-plus-bar-chart="lineplusbarConfig"></div>
```

## Fragment definition sections

 This module has no fragment definition section.


## Data format

 Data fed to the line plus bar chart should follow a default format. This format can be overridden by the use of personal function (See "x" and "y" properties below).

 Default data format exemple :

      [
       {
          "key": "Series 1",
          "bar": true,
          "values": [ [1, 10], [2, 20], [3, 5] ]
       },
       {
          "key": "Series 2",
          "values": [ [1, 8], [2, 10], [3, 15] ]
       }
      ]

 The <code>key</code> property defines the name of the series. The <code>values</code> defines the data of the series. By default the value at index 0 of each sub array is plotted on the X axis while the value at index 1 is plotted on the Y axis.
 By default data are plotted as line. The "bar" property specify if the series should be plotted with bars.


## line plus bar configuration

 The line plus bar chart is configured by the configuration object passed to the directive declaration (see Directives).

  Exemple :

      $scope.linePlusBarConfig = {
       data: $scope.lineplusbardata,
       showLegend: true
       }

 Available properties :

 <table style="width: 100%; text-align: left;" class="table table-striped table-bordered table-condensed">
    <thead>
        <tr>
            <th>Properties</th>
            <th>Type</th>
            <th>Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>data</td>
            <td>Array</td>
            <td>Data to display using the multibar chart (mandatory if you don't define the "noData" property.). Generally it would be a property of $scope</td>
        </tr>
        <tr>
            <td>x</td>
            <td>function</td>
            <td>Providing a function to the x property allows configuration of the data on the X axis. Consider this example : say we want to double the data value displayed on the X axis in comparison to the data provided to the "data" property.
            We can achieve this by providing the following function to the x property :
            function(){
                       return function(d){
                            return d[0]*2;
                        };
                   };
              where "d[0]" is all the values at index 0 of all sub arrays of the array at property "values" of all objects in the array provided to the "data" property.
            </td>
        </tr>
        <tr>
            <td>y</td>
            <td>function</td>
            <td>See "x" property above. Applied to the Y axis instead.</td>
        </tr>
        <tr>
            <td>showLegend</td>
            <td>Boolean</td>
            <td>Display or hide legend.</td>
        </tr>
        <tr>
            <td>tooltips</td>
            <td>Boolean</td>
            <td>Enable or disable tooltips when hovering the chart.</td>
        </tr>
          <tr>
            <td>noData</td>
            <td>String</td>
            <td>Message to display when there is no data (default to "No data available") </td>
        </tr>
          <tr>
            <td>color</td>
            <td>Array</td>
            <td> Color of series in the corresponding order. Can be hexadecimal, named  or RGB. Ex.  ['#4D9FF2', 'yellow', 'rgb(151,109,165)']. Note that you can also
            specify the value of the color in the "data" array by providing a "color" attribute to each object. </td>
        </tr>
           <tr>
            <td>tooltipContent</td>
            <td>function</td>
            <td>Customize tooltip content. Ex. function(key, x, y, e, graph) { return '&lth1&gt Tooltip Title &lt/h1&gt &ltp&gt'+ y +'&lt/p&gt';}
            where key, x and y are the name and value of the series at the tooltip point, e an event and graph the chart object.</td>
        </tr>
         <tr>
            <td>transitionDuration</td>
            <td>integer</td>
            <td>Duration of transition effect (Default to 500).</td>
        </tr>
    </tbody>
 </table>


## Axis Configuration

 Axis are configured in the same configuration object.

 X axis :

  <table style="width: 100%; text-align: left;" class="table table-striped table-bordered table-condensed">
    <thead>
        <tr>
            <th>Properties</th>
            <th>Type</th>
            <th>Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>xAxisTickValues</td>
            <td>Array</td>
            <td> Specify explicitly the values to plot on the X axis</td>
        </tr>
         <tr>
            <td>xAxisTickSubdivide</td>
            <td>Integer</td>
            <td> Specify the number of intermediate ticks to show on the X axis </td>
        </tr>
         <tr>
            <td>xAxisTickPadding</td>
            <td>Integer</td>
            <td>Specify ticks padding on the X axis</td>
        </tr>
         <tr>
            <td>xAxisTickFormat</td>
            <td>function</td>
            <td> Specify how data should be formatted. For instance you can format number on the X axis to
            have exactly two digit after the decimal point : <code> d3.format('.2f')</code>. Or format Date object to
            a readable format as <code> d3.time.format('%Y')</code> which shows the year only. See
            <a href="https://github.com/mbostock/d3/wiki/Formatting" target="_blank">d3.js documentation</a>
            for a list of all format available
            </td>
        </tr>
         <tr>
            <td>xAxisLabel</td>
            <td>String</td>
            <td>Label of the X axis</td>
        </tr>
         <tr>
            <td>xAxisDomain</td>
            <td>Array [start, end]</td>
            <td> Specify the domain on the X axis (min to max value)</td>
        </tr>
         <tr>
            <td>xAxisShowMaxMin</td>
            <td>Boolean</td>
            <td> Show or hide maximum and minimum value in bold</td>
        </tr>
        <tr>
            <td>xAxisRotateLabels</td>
            <td>Integer</td>
            <td> 0 to 180° rotation of X axis tick label</td>
        </tr>
         <tr>
            <td>xAxisStaggerLabels</td>
            <td>Integer</td>
            <td>Size of the gap between labels to resolve overlapping issue</td>
        </tr>
    </tbody>
  </table>

  Y axis :

  See X axis. Replace property "xName" by "yName".

  Y2 axis :

  For the right axis. Replace property "xName" by "y2Name"







