---
title: "Basics"
name: "W20 dataviz"
repo: "https://github.com/seedstack/w20-dataviz"
date: 2016-01-20
author: Kavi RAMYEAD
description: "Provides data visualization features like charts."
frontend: "responsive"
weight: -1
tags:
    - "frontend"
    - "w20"
    - "chart"
    - "data"
    - "visualization"
zones:
    - Addons
menu:
    W20Dataviz:
        weight: 10
---

The W20 Dataviz addon provides supports for charts and graphical representation. It proposes an integration of the
[NVD3](http://nvd3.org/) charting library (which itself uses [D3](http://d3js.org/)) along with an integration of
the [Dygraphs](http://dygraphs.com/) chart library for large data sets.

# Dataviz addon

## Installation

```
bower install w20-dataviz
```

## Configuration

To include the addon, declare it in the application manifest:

```
"bower_components/w20-dataviz/w20-dataviz.w20.json": {}
```
If using the w20 bridge you can simply refer to the fragment by its id without specifying the path:

```
"w20-dataviz": {}
```

Additional configuration information can be found in the [Jsdoc](http://seedstack.org/jsdoc/#/dataviz) of the addon.