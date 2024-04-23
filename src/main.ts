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


view.when(() => {
  var pointLayer = new FeatureLayer(
    (<any>mapUtils.getLayerDefinition(mapServerUrl, "gisdata.TRAFFIC_SITE_STATION", "tms_site_no", ["1575"]))
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

const ctx = document.getElementById('chartCanvas') as ChartItem;

const labels = ['7-8 AM', '8-9 AM', '9-10 AM', '10-11 AM', '11-12 PM', '12-1 PM', '1-2 PM', '2-3 PM', '3-4 PM', '5-6 PM', '6-7 PM', '7-8 PM', '8-9 PM'];
  const data = {
  labels: labels,
  datasets: [    
    {
      label: 'Northbound',
      data: [764,1162,1791,2207,2175,2270,1889,1516,468,368,326,261,226],
      borderColor: 'rgb(54, 162, 235)',
      backgroundColor: 'rgb(54, 162, 235, 0.5)',
    },
    {
      label: 'Southbound',
      data: [311,287,289,317,340,319,293,204,1467,2168,2665,2451,1495,1,191,682],
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgb(255, 99, 132, 0.5)',
    }
  ]
};

var chart = new Chart(ctx, {
    type: 'line',
  data: data,
  options: {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'I-78 Traffic Volume in Crawford County, PA'
      }
    }
  },
   
});
