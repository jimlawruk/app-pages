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

const labels = chartUtils.months({count: 7});
  const data = {
  labels: labels,
  datasets: [
    {
      label: 'Dataset 1',
      data: [2,213,33,22,11],
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgb(255, 99, 132, 0.5)',
    },
    {
      label: 'Dataset 2',
      data: [12,21,3,12,11],
      borderColor: 'rgb(54, 162, 235)',
      backgroundColor: 'rgb(54, 162, 235, 0.5)',
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
        text: 'Sample chart'
      }
    }
  },
   
});
