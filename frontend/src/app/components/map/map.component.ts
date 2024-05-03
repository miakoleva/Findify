import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import Map from 'ol/Map';
import View from 'ol/View';
import VectorLayer from 'ol/layer/Vector';
import Style from 'ol/style/Style';
import Icon from 'ol/style/Icon';
import OSM from 'ol/source/OSM';
import * as olProj from 'ol/proj';
import TileLayer from 'ol/layer/Tile';
import Attribution from 'ol/control/Attribution.js';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import VectorSource from 'ol/source/Vector';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [],
  templateUrl: './map.component.html',
  styleUrl: './map.component.scss'
})
export class MapComponent implements OnInit {

  map: Map | undefined


  constructor() { }

  ngOnInit(): void {
    this.initMap()
    this.addMarker()
  }

  initMap(): void {
    this.map = new Map({
      target: 'item_map',
      layers: [
        new TileLayer({
          source: new OSM()
        })
      ],
      view: new View({
        center: olProj.fromLonLat([21.4254, 41.9981]),
        zoom: 10
      })
    });

    const controls = this.map.getControls();

    controls.forEach(control => {
      if (control instanceof Attribution) {
        this.map!!.removeControl(control);
      }
    })
  }

  addMarker(): void {
    const iconStyle = new Style({
      image: new Icon({
        anchor: [0.5, 1],
        src: '../../../assets/point.png',
        scale: 0.05
      })
    });
  
    const markerFeature = new Feature({
      geometry: new Point(olProj.fromLonLat([21.4254, 41.9981]))
    });
  
    markerFeature.setStyle(iconStyle);
  
    const markerSource = new VectorSource({
      features: [markerFeature]
    });
  
    const markerLayer = new VectorLayer({
      source: markerSource
    });
  
    this.map!.addLayer(markerLayer);
  }

}
