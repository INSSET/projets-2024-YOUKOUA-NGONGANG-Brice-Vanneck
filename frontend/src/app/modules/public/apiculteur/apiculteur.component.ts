import { AfterViewInit, Component, OnInit } from '@angular/core';
import { HeaderComponent } from "../../../shared/header/header.component";
import { FooterComponent } from "../../../shared/footer/footer.component";
import { TableModule } from 'primeng/table';
import { FormBuilder, FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { NgClass, NgIf, NgStyle } from '@angular/common';
import { SelectButtonModule } from 'primeng/selectbutton';
import * as Leaflet from 'leaflet';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
Leaflet.Icon.Default.imagePath = 'assets/';

@Component({
  selector: 'app-apiculteur',
  standalone: true,
  imports: [NgIf,LeafletModule,
    NgStyle, NgClass,HeaderComponent, FooterComponent,TableModule,FormsModule,ReactiveFormsModule,DialogModule,SelectButtonModule],
  templateUrl: './apiculteur.component.html',
  styleUrl: './apiculteur.component.scss'
})
export class ApiculteurComponent implements OnInit,AfterViewInit{

  search="";
  loading=false;
  ruchedialog=false;

  limitItem:any;
  row=10;
  totalRecords=-1;
  page=1;
  rucheList=Array();
  isGettingAll = true;
  senddingRequest = false;
  isUpdating = false;
  displayType='map';

  map!: Leaflet.Map;
  markers: Leaflet.Marker[] = [];
  options = {
    layers: [
      Leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      })
    ],
    zoom: 16,
    center: { lat: 28.626137, lng: 79.821603 }
  }


  stateOptions = [
    { label: 'Tableux', value: 'table' },
    { label: 'Carte', value: 'map' },
  ];
 
  ruche={
    nom:"",
    position:""
  }
  ProjetForm = this.formBuilder.group({
    title: new FormControl('', [Validators.required]),
    title_en: new FormControl('', []),
    contexte_and_justification: new FormControl('', []),
    dateFin: new FormControl('', [Validators.required]),

  });

  rucheForm = this.formBuilder.group({
    nom: new FormControl('', [Validators.required]),
    position: new FormControl('', [Validators.required]),
   

  });

  constructor(private formBuilder: FormBuilder){

  }
  
  ngOnInit(): void {
    //throw new Error('Method not implemented.');
  }


  ngAfterViewInit(): void {
    //this.initMap();
  }




  saveRuche(){

  }

  addRuche(){

    this.ruchedialog=true;

  }

  fermerRuche(){

  }


  loadItems(event: any) {
    console.log(event);
    //this.loading=true;

  }

  changeDisplay(){
    console.log("change display")
    if(this.displayType=='map'){

    }
  }


  initMarkers() {
    const initialMarkers = [
      {
        position: { lat: 28.625485, lng: 79.821091 },
        draggable: true
      },
      {
        position: { lat: 28.625293, lng: 79.817926 },
        draggable: false
      },
      {
        position: { lat: 28.625182, lng: 79.81464 },
        draggable: true
      }
    ];
    for (let index = 0; index < initialMarkers.length; index++) {
      const data = initialMarkers[index];
      const marker = this.generateMarker(data, index);
      marker.addTo(this.map).bindPopup(`<b>${data.position.lat},  ${data.position.lng}</b>`);
      this.map.panTo(data.position);
      this.markers.push(marker)
    }
  }

  generateMarker(data: any, index: number) {
    return Leaflet.marker(data.position, { draggable: data.draggable })
      .on('click', (event) => this.markerClicked(event, index))
      .on('dragend', (event) => this.markerDragEnd(event, index));
  }

  onMapReady($event: Leaflet.Map) {
    this.map = $event;
    this.initMarkers();
  }

  mapClicked($event: any) {
    console.log($event.latlng.lat, $event.latlng.lng);
  }

  markerClicked($event: any, index: number) {
    console.log($event.latlng.lat, $event.latlng.lng);
  }

  markerDragEnd($event: any, index: number) {
    console.log($event.target.getLatLng());
  } 


}
