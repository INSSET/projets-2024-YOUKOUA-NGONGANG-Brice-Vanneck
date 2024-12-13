import { AfterViewInit, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { HeaderComponent } from "../../../shared/header/header.component";
import { FooterComponent } from "../../../shared/footer/footer.component";
import { TableModule } from 'primeng/table';
import { FormBuilder, FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { NgClass, NgIf, NgStyle } from '@angular/common';
import { SelectButtonModule } from 'primeng/selectbutton';
import * as Leaflet from 'leaflet';
import * as Leaflet2 from 'leaflet';

import { LeafletModule } from '@asymmetrik/ngx-leaflet';
Leaflet.Icon.Default.imagePath = 'assets/';

@Component({
  selector: 'app-apiculteur',
  standalone: true,
  imports: [NgIf,LeafletModule,
    NgStyle, NgClass,HeaderComponent, FooterComponent,TableModule,FormsModule,ReactiveFormsModule,DialogModule,SelectButtonModule],
  templateUrl: './apiculteur.component.html',
  styleUrl: './apiculteur.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class ApiculteurComponent implements OnInit,AfterViewInit{

  search="";
  autre='';
  loading=false;
  ruchedialog=false;
  positionDialog=false;

  limitItem:any;
  row=10;
  totalRecords=-1;
  page=1;
  rucheList=Array();
  isGettingAll = true;
  senddingRequest = false;
  isUpdating = false;
  displayType='table';

  map!: Leaflet.Map;
  mapDialog!: Leaflet2.Map;
  dialogMarkers:Leaflet2.Marker[] = [];

  markers: Leaflet.Marker[] = [];
  options = {
    layers: [
      Leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      })
    ],
    zoom: 16,
    center: { lat: 48.8566, lng: 2.3522 }
  }

  position={
    lon:null,
    lat:null
  }

  optionsDialog = {
    layers: [
      Leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      })
    ],
    zoom: 10,
    center: { lat: 48.8566, lng: 2.3522 }
  }


  stateOptions = [
    { label: 'Tableux', value: 'table' },
    { label: 'Carte', value: 'map' },
  ];

  ruche={
    nom:"",
    position:"",
    lon:null,
    lat:null
  }
  ProjetForm = this.formBuilder.group({
    title: new FormControl('', [Validators.required]),
    title_en: new FormControl('', []),
    contexte_and_justification: new FormControl('', []),
    dateFin: new FormControl('', [Validators.required]),

  });

  rucheForm = this.formBuilder.group({
    nom: new FormControl('', [Validators.required]),
    longitude: new FormControl('', [Validators.required]),
    latitude: new FormControl('', [Validators.required]),

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
    this.rucheForm.reset();

  }

  fermerRuche(){
    this.ruchedialog=false;
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

  openPositionDialog(){
    this.positionDialog=true;
  }


  dialogMapClicked($event: any) {
    console.log($event.latlng.lat, $event.latlng.lng);
    
    this.clearMarkersDialog();

    let mymarker ={
      position: { lat: $event.latlng.lat, lng: $event.latlng.lng },
      draggable: true
    }


      let marker= Leaflet2.marker(mymarker.position, { draggable: mymarker.draggable })
      .on('dragend', (event) => this.dialogMarkerDrag(event));

      this.position.lon=$event.latlng.lng;
      this.position.lat=$event.latlng.lat;

      marker.addTo(this.mapDialog).bindPopup(`<b>Longitude:</b> ${this.position.lon}<br/>  <b>Latitude:</b> ${this.position.lon}`);
      this.mapDialog.panTo(mymarker.position);
      this.dialogMarkers.push(marker);

 
      //console.log(this.dialogMarkers);

  }

  dialogMarkerDrag($event: any){
    console.log($event.target.getLatLng());

    this.position.lon=$event.target.getLatLng().lng;
    this.position.lat=$event.target.getLatLng().lat;
    
  }

  dialogOnMapReady(map: Leaflet2.Map) {
    //this.mapDialog = $event;
    console.log("ready dialog");
    this.mapDialog = map;
  }


  onDialogShow() {
    if (this.mapDialog) {
      this.mapDialog.invalidateSize(); // Recalculer la taille de la carte
      this.clearMarkersDialog();
      this.position.lat=null;
      this.position.lon=null;
    }
  }


  clearMarkersDialog() {
    this.dialogMarkers.forEach(marker => {
      this.mapDialog.removeLayer(marker); // Supprime chaque marqueur de la carte
    });
    this.dialogMarkers = []; // Vide le tableau des marqueurs
  }

  validerPosition(){
    this.ruche.lat=this.position.lat;
    this.ruche.lon=this.position.lon;

    this.positionDialog=false;
  }

}
