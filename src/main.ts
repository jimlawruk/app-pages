import "./style.css";

import Map from "@arcgis/core/Map.js";
import MapView from "@arcgis/core/views/MapView.js";
import BasemapToggle from "@arcgis/core/widgets/BasemapToggle";
import Locate from "@arcgis/core/widgets/Locate.js";
import FeatureLayer from "@arcgis/core/layers/FeatureLayer.js";
import Graphic from "@arcgis/core/Graphic.js";
import GraphicsLayer from "@arcgis/core/layers/GraphicsLayer.js";

import { Chart, ChartItem } from 'chart.js/auto';
import { MapUtils } from "./map-utils.ts";

const map = new Map({
  basemap: "streets-navigation-vector",
});

const view = new MapView({
  container: "mapViewDiv",
  map: map,
  zoom: 6,
  center: [-78, 40.9],
});

var toggle = new BasemapToggle({
  view: view,
});
//view.ui.add(toggle, "bottom-right");

var locateBtn = new Locate({
  view: view,
});
view.ui.add(locateBtn, "top-left");

let mapServerUrl = "https://gis.penndot.gov/arcgis/rest/services/mapcore/map/MapServer";
var mapUtils = new MapUtils();

const graphicsLayer = new GraphicsLayer();
 map.add(graphicsLayer);

// Create a polygon geometry
const totalityPolygon = {
  type: "polygon",
  rings: [
    [-84.78529733178833,39.18473786742946],    
    [-83.88250869272004,41.59996290505581],
    [-80.80955546853916, 42.98072313608882],                   
    [-77.47361701486463,44.27678949286133],
    [-76.14214700220033, 42.97959286461707],
    [-78.70876353738693,41.99859011116081],
    [-80.51901858804607, 41.23678059159809],
    [-83.12295001504654, 40.02893209859656]    
  ]  
};

const simpleFillSymbol = {
  type: "simple-fill",
  color: [200, 200, 200, 0.6],
  outline: {
      color: [200, 200, 200],
      width: 1
  }
};

const totalityGraphic = new Graphic((<any>{
  geometry: totalityPolygon,
  symbol: simpleFillSymbol,
}));
graphicsLayer.add(totalityGraphic);


const labelClass = {  
  symbol: {
    type: "text",  
    color: "navy",
    haloColor: "navy",
    haloSize: 0,
    font: {
       family: "Arial",
       size: 8,
       weight: 'normal'
     }
  },
  labelPlacement: "above-center",
  labelExpressionInfo: {
    expression: "'Route: ' + $feature.ST_RT_NO"
  },
  
};

view.when(() => {
  var pointLayer = new FeatureLayer(
    (<any>mapUtils.getLayerDefinition(mapServerUrl, "gisdata.TRAFFIC_SITE_STATION", "tms_site_no", ["1575", "32057", "2583", "4750"], labelClass))
  );

  const markerRenderer = {
    type: "simple",
    symbol: {
      type: "simple-marker",
      size: 8,
      color: [200, 0, 0, 1],
      outline: {
        color: [200, 0, 0],
        width: 2,
      },
    },
  };
  pointLayer.renderer = (<any>markerRenderer);
  map.add(pointLayer);

});

const config = {
  type: 'line',
  data: [2,213,33,22,11],
  options: {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Chart.js Line Chart'
      }
    }
  },
};

const ctx0079 = document.getElementById('chartCanvas0079') as ChartItem;

const labels = ['7-8 AM', '8-9 AM', '9-10 AM', '10-11 AM', '11-12 PM', '12-1 PM', '1-2 PM', '2-3 PM', '3-4 PM', '4-5 PM', '5-6 PM', '6-7 PM', '7-8 PM', '8-9 PM', '9-10 PM', '10-11 PM', '11-12 PM'];
  const data0079 = {
  labels: labels,
  datasets: [    
    {
      label: 'April 8 North',
      data: [764,1162,1791,2207,2175,2270,1889,1516,468,368,326,261,226,174,147,127,91],
      borderColor: 'rgb(54, 162, 235)',
      backgroundColor: 'rgb(54, 162, 235, 0.5)',
    },
    {
      label: ' April 8 South',
      data: [311,287,289,317,340,319,293,204,1467,2168,2665,2451,1495,1191,682,284,171],
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgb(255, 99, 132, 0.5)',
    },
    {
      label: 'Normal North',
      data: [457,554,610,702,765,748,717,766,774,743,612,472,370,255,201,147,104],
      borderColor: 'rgb(54, 162, 235, 0.3)',
      backgroundColor: 'rgb(54, 162, 235, 0.1)',
    },
    {
      label: 'Normal Southbound',
      data: [508,566,571,590,638,626,683,718,770,683,586,407,312,262,177,130,74],
      borderColor: 'rgb(255, 99, 132, 0.3)',
      backgroundColor: 'rgb(255, 99, 132, 0.1)',
    }
  ]
};

const ctx0015 = document.getElementById('chartCanvas0015') as ChartItem;

var data0015 = {
  labels: labels,
  datasets: [    
    {
      label: 'Northbound',
      data: [386,527,725,781,731,653,474,342,273,324,294,207,176,141,127,107,74],
      borderColor: 'rgb(54, 162, 235)',
      backgroundColor: 'rgb(54, 162, 235, 0.5)',
    },
    {
      label: 'Southbound',
      data: [258,199,222,259,265,263,237,287,341,1109,1817,1840,1546,1012,429,230,113],
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgb(255, 99, 132, 0.5)',
    },
    {
      label: 'Normal North',
      data: [262,222,265,279,356,389,430,507,489,470,410,286,226,186,138,97,85],
      borderColor: 'rgb(54, 162, 235, 0.3)',
      backgroundColor: 'rgb(54, 162, 235, 0.1)',
    },
    {
      label: 'Normal Southbound',
      data: [295,328,357,433,452,434,408,392,440,444,381,250,191,158,124,98,78],
      borderColor: 'rgb(255, 99, 132, 0.3)',
      backgroundColor: 'rgb(255, 99, 132, 0.1)',
    }
  ]
};

const ctx0081 = document.getElementById('chartCanvas0081') as ChartItem;

var data0081 = {
  labels: labels,
  datasets: [    
    {
      label: 'Northbound',
      data: [1556,1725,1979,2119,2052,1679,1289,1130,1257,1400,1310,881,739,578,432,311,235],
      borderColor: 'rgb(54, 162, 235)',
      backgroundColor: 'rgb(54, 162, 235, 0.5)',
    },
    {
      label: 'Southbound',
      data: [1392,1235,975,944,983,956,963,960,1005,1284,1786,2048,2297,2237,2182,2209,1934],
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgb(255, 99, 132, 0.5)',
    },
    {
      label: 'Normal North',
      data: [976,1001,1058,1178,1345,1457,1589,1657,1789,1774,1496,1082,870,659,495,397,248],
      borderColor: 'rgb(54, 162, 235, 0.3)',
      backgroundColor: 'rgb(54, 162, 235, 0.1)',
    },
    {
      label: 'Normal Southbound',
      data: [1301,1298,1113,1177,1243,1251,1263,1285,1405,1436,1265,1011,725,550,414,337,210],
      borderColor: 'rgb(255, 99, 132, 0.3)',
      backgroundColor: 'rgb(255, 99, 132, 0.1)',
    }
  ]
};

const ctx0083 = document.getElementById('chartCanvas0083') as ChartItem;

var data0083 = {
  labels: labels,
  datasets: [    
    {
      label: 'Northbound',
      data: [936,906,1063,1011,1073,1115,1155,1377,1608,1919,1698,1265,797,725,532,435,306],
      borderColor: 'rgb(54, 162, 235)',
      backgroundColor: 'rgb(54, 162, 235, 0.5)',
    },
    {
      label: 'Southbound',
      data: [1795,1464,1095,1014,907,946,919,998,885,936,915,793,635,704,842,777,736],
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgb(255, 99, 132, 0.5)',
    },
    {
      label: 'Normal North',
      data: [878,809,1090,1192,1321,1307,1325,1531,1934,2047,1933,1287,930,684,659,497,320],
      borderColor: 'rgb(54, 162, 235, 0.3)',
      backgroundColor: 'rgb(54, 162, 235, 0.1)',
    },
    {
      label: 'Normal Southbound',
      data: [1715,1447,1191,1098,1183,1204,1196,1261,1143,1171,1103,965,727,602,457,291,235],
      borderColor: 'rgb(255, 99, 132, 0.3)',
      backgroundColor: 'rgb(255, 99, 132, 0.1)',
    }
  ]
};


var chart0079 = new Chart(ctx0079, {
    type: 'line',
  data: data0079,
  options: {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'I-79 Traffic Volume in Crawford County, PA'
      }
    }
  },   
});

var chart0015 = new Chart(ctx0015, {
  type: 'line',
data: data0015,
options: {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'US Route 15 Traffic Volume in Tioga County, PA'
    }
  }
},   
});

var chart0081 = new Chart(ctx0081, {
  type: 'line',
data: data0081,
options: {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'I-81 Traffic Volume in Lackawanna County, PA'
    }
  }
},   
});

var chart0083 = new Chart(ctx0083, {
  type: 'line',
data: data0083,
options: {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'I-83 Traffic Volume in York County, PA'
    }
  }
},   
});
