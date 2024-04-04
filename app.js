am5.ready(function() {

  // Create root element
  // https://www.amcharts.com/docs/v5/getting-started/#Root_element
  var root = am5.Root.new("chartdiv");
  
  
  // Set themes
  // https://www.amcharts.com/docs/v5/concepts/themes/
  root.setThemes([
    am5themes_Animated.new(root)
  ]);
  
  
  // Create chart
  // https://www.amcharts.com/docs/v5/charts/xy-chart/
  var chart = root.container.children.push(am5xy.XYChart.new(root, {
  // chart.scrollbarX = new am5.scrollbarX(),
    panX: false,
    panY: false,
    wheelX: "panX",
    wheelY: "zoomX",
    layout: root.verticalLayout
  }));
  
  var colors = chart.get("colors");
  
  
  var data = [{
    moth: "فروردین ",
    visits: 725
  }, {
    moth: "اردیبهشت",
    visits: 625
  }, {
    moth: "خرداد",
    visits: 250
  }, {
    moth: "تیر",
    visits: 509
  }, {
    moth: "مرداد",
    visits: 322
  }, {
    moth: "شهریور",
    visits: 214
  }, {
    moth: "مهر",
    visits: 204
  }, {
    moth: "ابان",
    visits: 750
  }, {
    moth: "اذر",
    visits: 600
  }, {
    moth: "دی",
    visits: 93
  }, {
    moth: "بهمن",
    visits:352,
    
  }];
  
  prepareParetoData();
  
  function prepareParetoData() {
    var total = 0;
  
    for (var i = 0; i < data.length; i++) {
      var value = data[i].visits;
      total += value;
    }
  
    var sum = 0;
    for (var i = 0; i < data.length; i++) {
      var value = data[i].visits;
      sum += value;
      data[i].pareto = sum / total * 100;
    }
  }
  
  
  
  // Create axes
  // https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
  var xRenderer = am5xy.AxisRendererX.new(root, {
    minGridDistance: 30
  })
  
  var xAxis = chart.xAxes.push(am5xy.CategoryAxis.new(root, {
    categoryField: "moth",
    renderer: xRenderer
  }));
  
  xRenderer.grid.template.setAll({
    location: 1
  })
  
  xRenderer.labels.template.setAll({
    paddingTop: 20
  });
  
  xAxis.data.setAll(data);
  
  var yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
    renderer: am5xy.AxisRendererY.new(root, {
      strokeOpacity: 0.1
    })
  }));
  
  var paretoAxisRenderer = am5xy.AxisRendererY.new(root, { opposite: true });
  var paretoAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
    renderer: paretoAxisRenderer,
    min: 0,
    max: 100,
    strictMinMax: true
  }));
  
  paretoAxisRenderer.grid.template.set("forceHidden", true);
  paretoAxis.set("numberFormat", "#'%");
  
  
  // Add series
  // https://www.amcharts.com/docs/v5/charts/xy-chart/series/
  var series = chart.series.push(am5xy.ColumnSeries.new(root, {
    xAxis: xAxis,
    yAxis: yAxis,
    valueYField: "visits",
    categoryXField: "moth"
  }));
  
  series.columns.template.setAll({
    tooltipText: "{categoryX}: {valueY}",
    tooltipY: 0,
    strokeOpacity: 0,
    cornerRadiusTL: 6,
    cornerRadiusTR: 6
  });
  
  series.columns.template.adapters.add("fill", function(fill, target) {
    return chart.get("colors").getIndex(series.dataItems.indexOf(target.dataItem));
  })
  
  
  // pareto series
  var paretoSeries = chart.series.push(am5xy.LineSeries.new(root, {
    xAxis: xAxis,
    yAxis: paretoAxis,
    valueYField: "pareto",
    categoryXField: "moth",
    stroke: root.interfaceColors.get("alternativeBackground"),
    maskBullets: false
  }));
  
  paretoSeries.bullets.push(function() {
    return am5.Bullet.new(root, {
      locationY: 1,
      sprite: am5.Circle.new(root, {
        radius: 5,
        fill: series.get("fill"),
        stroke: root.interfaceColors.get("alternativeBackground")
      })
    })
  })
  
  series.data.setAll(data);
  paretoSeries.data.setAll(data);
  
  // Make stuff animate on load
  // https://www.amcharts.com/docs/v5/concepts/animations/
  series.appear();
  chart.appear(1000, 100);
  
  }); // end am5.ready()