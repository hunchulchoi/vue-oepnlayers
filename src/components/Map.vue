<template>
  <div>
    <div id="mapOL"></div>
  </div>
</template>

<script>

import 'ol/ol.css';
import Geolocation from 'ol/Geolocation';
import Map from 'ol/Map';
import View from 'ol/View';
import { defaults, ScaleLine } from 'ol/control';
import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer';
import { XYZ, Vector as VectorSource } from 'ol/source';
import Feature from 'ol/Feature';
import {
  Circle as CircleStyle, Fill, Stroke, Style,
} from 'ol/style';
// import { Tile as TileLayer } from 'ol/layer';
// import { XYZ } from 'ol/source';

export default {
  name: 'Map',
  data() {
    return {
      vectorSource: null,
      vectorLayer: null,
      view: null,
      map: null,
      geoLocation: null,
    };
  },
  async mounted() {
    await this.initiateMap();
  },
  methods: {
    initiateMap() {
      // const that = this;
      this.view = new View({
        center: [126.525264, 33.357516],
        projection: 'EPSG:4326',
        zoom: 11,
        maxZoom: 19,
        minZoom: 7,
      });
      this.map = new Map({
        controls: defaults().extend([
          new ScaleLine({ units: 'degrees' }),
        ]),
        layers: [
          new TileLayer({
            source: new XYZ({
              url:
                'http://api.vworld.kr/req/wmts/1.0.0/5E671111-443D-3670-8088-7893F1B6CA68/Base/{z}/{y}/{x}.png',
            }),
          }),
          new VectorLayer(
            { source: new VectorSource() },
          ),
        ],
        target: 'mapOL',
        view: this.view,
      });
      this.geoLocation = new Geolocation({
        trackingOptions: { enableHighAccuracy: true, },
        projection: this.view.getProjection(),
      });
      this.geoLocation.setTracking(true);
      const positionFeature = new Feature();

      positionFeature.setStylr(new Style({
        image: new CircleStyle({
          radius: 6,
          fill: new Fill({
            color: '#3399CC',
          }),
          stroke: new Stroke({
            color: '#fff',
            width: 2,
          }),
        }),
      }));
    },
  },
};
</script>

<style scoped>
  #mapOL{
    position: absolute;
    height: 500px;
    width: 99%;
    padding: 0;
    margin: 0;
  }
</style>
