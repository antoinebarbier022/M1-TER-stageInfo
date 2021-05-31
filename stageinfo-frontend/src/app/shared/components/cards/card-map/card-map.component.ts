import { Component, Input, OnDestroy, OnInit } from '@angular/core';

/** import for the map  */
import Map from 'ol/Map';
import View from 'ol/View';
import VectorLayer from 'ol/layer/Vector';
import Style from 'ol/style/Style';
import Icon from 'ol/style/Icon';
import OSM from 'ol/source/OSM';
import * as olProj from 'ol/';
import TileLayer from 'ol/layer/Tile';
import XYZ from 'ol/source/XYZ';
import { fromLonLat, transform } from 'ol/proj';
import Layer from 'ol/renderer/Layer';
import Point from 'ol/geom/Point';
import VectorSource from 'ol/source/Vector';
import { LocalisationService } from 'src/app/core/services/localisation.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';


@Component({
  selector: 'app-card-map',
  templateUrl: './card-map.component.html',
  styleUrls: ['./card-map.component.scss']
})
export class CardMapComponent implements OnInit, OnDestroy {
  @Input() title: string = "";
  @Input() adresseEntreprise: string = "";
  map:any;
  marker: any;
  vectorSource: any;
  vectorLayer!: VectorLayer;
  xyzSource: any;
  tileLayer!: TileLayer;
  view!: View;


    // pour pouvoir détruire les subscribes
    destroy$: Subject<boolean> = new Subject<boolean>();
    
  constructor( private localisationService: LocalisationService) { }

  ngOnInit(){
      this.localisationService.getInfoAdresse(this.adresseEntreprise)
      .pipe(takeUntil(this.destroy$))
        .subscribe((_data: any) => {
          console.log(_data.features[0].geometry.coordinates);
          // coordonnées longitude et latitude
          var coordinate = _data.features[0].geometry.coordinates;

          var marker = new olProj.Feature({
            geometry: new Point([coordinate[0], coordinate[1]]) // dont worry about coordinate type 0,0 will be in west coast of africa
        });

        var iconFeature = new olProj.Feature({
          geometry: new Point(fromLonLat([coordinate[0], coordinate[1]])),
          name: 'Null Island',
          population: 4000,
          rainfall: 500,
        });
        
     

        this.vectorSource = new VectorSource({
          features: [iconFeature]
        });
        
        this.vectorLayer = new VectorLayer({
          source: this.vectorSource
        });

          this.map = new Map({
            target: 'map',
            layers: [
              new TileLayer({
                source: new XYZ({
                  url: 'https://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png'
                })
              }),
              this.vectorLayer
              
            ],
            view: new View({
              center: fromLonLat([coordinate[0], coordinate[1]]),
              zoom: 14
            })
          });
          



          
  
      });

  }

  ngOnDestroy() {
    this.destroy$.next(true);
    // Now let's also unsubscribe from the subject itself:
    this.destroy$.unsubscribe();
  }
}
