import "./style.css";
import Map from "@arcgis/core/Map.js";
import MapView from "@arcgis/core/views/MapView.js";
import BasemapToggle from "@arcgis/core/widgets/BasemapToggle";
import Locate from "@arcgis/core/widgets/Locate.js";

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


