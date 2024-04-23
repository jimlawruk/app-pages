import "./style.css";

import Map from "@arcgis/core/Map.js";
import MapView from "@arcgis/core/views/MapView.js";
import BasemapToggle from "@arcgis/core/widgets/BasemapToggle";
import Locate from "@arcgis/core/widgets/Locate.js";

import { Chart, ChartItem } from 'chart.js/auto';
import { ChartUtils } from './chart-utils.ts';

const map = new Map({
  basemap: "topo-vector",
});

const view = new MapView({
  container: "mapViewDiv",
  map: map,
  zoom: 8,
  center: [-78, 41],
});

var toggle = new BasemapToggle({
  view: view,
});
view.ui.add(toggle, "bottom-right");

var locateBtn = new Locate({
  view: view,
});
view.ui.add(locateBtn, "top-left");

var chartUtils = new ChartUtils();

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
