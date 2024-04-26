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
  basemap: "topo-vector",
});

const view = new MapView({
  container: "mapViewDiv",
  map: map,
  zoom: 7,
  center: [-78, 40.9],
});

var toggle = new BasemapToggle({
  view: view,
});
view.ui.add(toggle, "bottom-right");

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
    (<any>mapUtils.getLayerDefinition(mapServerUrl, "gisdata.TRAFFIC_SITE_STATION", "tms_site_no", ["1575", "32057"], labelClass))
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

const labels = ['7-8 AM', '8-9 AM', '9-10 AM', '10-11 AM', '11-12 PM', '12-1 PM', '1-2 PM', '2-3 PM', '3-4 PM', '5-6 PM', '6-7 PM', '7-8 PM', '8-9 PM', '9-10 PM', '10-11 PM'];
  const data0079 = {
  labels: labels,
  datasets: [    
    {
      label: 'April 8 North',
      data: [764,1162,1791,2207,2175,2270,1889,1516,468,368,326,261,226,174,147],
      borderColor: 'rgb(54, 162, 235)',
      backgroundColor: 'rgb(54, 162, 235, 0.5)',
    },
    {
      label: ' April 8 South',
      data: [311,287,289,317,340,319,293,204,1467,2168,2665,2451,1495,1191,682],
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgb(255, 99, 132, 0.5)',
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
      data: [386,527,725,781,731,653,474,342,273,324,294,207,176,141,127],
      borderColor: 'rgb(54, 162, 235)',
      backgroundColor: 'rgb(54, 162, 235, 0.5)',
    },
    {
      label: 'Southbound',
      data: [258,199,222,259,265,263,237,287,341,1109,1817,1840,1546,1012,429,230],
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgb(255, 99, 132, 0.5)',
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
        display: false,
        text: 'I-78 Traffic Volume in Crawford County, PA'
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
      text: 'I-15 Traffic Volume'
    }
  }
},   
});
