import {AfterViewInit, ChangeDetectorRef, Component, inject, OnInit, ViewEncapsulation} from '@angular/core';
import { HeaderComponent } from "../../../shared/header/header.component";
import { FooterComponent } from "../../../shared/footer/footer.component";
import { TableModule } from 'primeng/table';
import { FormBuilder, FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { CommonModule, NgClass, NgIf, NgStyle } from '@angular/common';
import { SelectButtonModule } from 'primeng/selectbutton';
import * as Leaflet from 'leaflet';
import * as Leaflet2 from 'leaflet';
import { ToastModule } from 'primeng/toast';
import { CalendarModule } from 'primeng/calendar';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { UserHelper } from '../../../shared/helpers/user';
import { RucheService } from '../../../services/other/ruche.service';
Leaflet.Icon.Default.imagePath = 'assets_files/';
import { TooltipModule } from 'primeng/tooltip';
import { ButtonModule } from 'primeng/button';
import { ConfirmationService, MessageService } from 'primeng/api';
import { InterventionService } from '../../../services/other/intervention.service';
import {ChartModule} from 'primeng/chart';
import { RecolteService } from '../../../services/other/recolte.service';
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-apiculteur',
  standalone: true,
  imports: [NgIf,LeafletModule,
    NgStyle, NgClass,HeaderComponent, FooterComponent,TableModule,FormsModule,ReactiveFormsModule,ButtonModule,ToastModule,
    DialogModule,SelectButtonModule,TooltipModule,CalendarModule,CommonModule,ConfirmDialogModule,ChartModule],
  templateUrl: './apiculteur.component.html',
  styleUrl: './apiculteur.component.scss',
  encapsulation: ViewEncapsulation.None,
  providers:[RucheService,MessageService,InterventionService,ConfirmationService,RecolteService]
})
export class ApiculteurComponent implements OnInit,AfterViewInit{
  private title = inject(Title);

  search="";
  autre='';
  loading=false;
  loadingRuche=false;
  loadingIntervention=false;
  ruchedialog=false;
  positionDialog=false;
  interventionDialog: boolean = false;
  addInterventionDialog=false;
  recolteDialog=false;
  totalRecolte=0;

  recolte={
    poids:null,
    date:new Date()
  }
  optionsChart ={

    };
  dataChart:any;

  limitItem:any;
  row=10;
  totalRecords=-1;
  totalInterventionRecords=0;
  page=1;
  rucheList=Array();
  interventionList=Array();
  recolteList=Array();
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
    zoom: 9,
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
    id:null,
    libelle:"",
    longitude:null,
    latitude:null,
  interventions:Array(),
    recoltes:Array()
  }

  intervention={
    id:null,
    libelle:"",
    date:new Date(),
    ruche:null
  }


  rucheForm = this.formBuilder.group({
    nom: new FormControl('', [Validators.required]),
    longitude: new FormControl('', [Validators.required]),
    latitude: new FormControl('', [Validators.required]),

  });

  interventionForm = this.formBuilder.group({
    libelle: new FormControl('', [Validators.required]),
  });

  recolteForm = this.formBuilder.group({
    poids: new FormControl('', [Validators.required,Validators.min(0.1)]),
    date: new FormControl('', [Validators.required]),
  });

  constructor(private formBuilder: FormBuilder,private rucheService:RucheService,private interventionService:InterventionService,
    private messageService:MessageService,private confirmationService: ConfirmationService,private cdr: ChangeDetectorRef,
  private recolteService:RecolteService){


    this.title.setTitle('Apiculteur');
  }

  ngOnInit(): void {
    //throw new Error('Method not implemented.');
    console.log(UserHelper.getUser());
    this.getRuches();
  }


  ngAfterViewInit(): void {
    //this.initMap();
  }


  saveRuche(){
    this.senddingRequest=true;
    if (this.isUpdating){
      this.rucheService.update({libelle:this.ruche.libelle,longitude:String(this.ruche.longitude),latitude:String(this.ruche.latitude)},
        this.ruche?.id).subscribe(data=>{
          if(data!=null){
            this.senddingRequest=false;
            this.ruchedialog=false;
            this.getRuches();
            this.messageToast("Ruche Modifiée avec succès","Confirmation");

          }else{
            //error or with statut
          }

      });

    }else{


      this.rucheService.create(this.ruche).subscribe(data=>{
        if(data!=null){
          console.log(data);
          let ruh =data;
          ruh.interventions=[];
          ruh.recoltes=[];
          this.rucheList.unshift(ruh);
          //this.appendToMap(data,0);
          this.messageToast("Ruche enregistrée avec succès","Confirmation");


        }else{
          //error
          //we can also use status of response
        }
        this.ruchedialog=false;
        this.senddingRequest=false;
      });

    }

  }

  addRuche(){

    this.isUpdating=false;
    this.ruchedialog=true;
    this.rucheForm.reset();

  }

  fermerRuche(){
    this.ruchedialog=false;
    this.cdr.detectChanges();
  }


  loadItems(event: any) {
    console.log(event);
    //this.loading=true;

  }

  loadItemIntervention(event: any){
    console.log(event);

  }

  getRuches(){
    this.loadingRuche=true;
    this.rucheService.all().subscribe(data=>{
      this.rucheList=data?.member;
      this.totalRecords=data?.totalItems;

      console.log(data)

      this.loadingRuche=false;
      this.initMarkers();
      this.cdr.detectChanges();
    });
  }

  deleteRuche(dataItem:any,event: Event) {
    console.log("delete call");
    this.confirmationService.confirm({
        target: event.target as EventTarget,
        message: 'Etes-vous sûr de vouloir supprimer cette ruche ?',
        header: 'Confirmation',
        icon: 'pi pi-exclamation-triangle',
        acceptLabel:"Oui supprimer",
        rejectLabel:"Non",
        acceptIcon:"none",
        rejectIcon:"none",
        rejectButtonStyleClass:"p-button-text",
        accept: () => {

            this.rucheService.delete(dataItem.id).subscribe(response=>{
              let status = response.status;
              if(status==204){
                this.rucheList = this.rucheList.filter(x => x.id!=dataItem.id);
                this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'Ruche supprimée avec succès' });
              }else{
                this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Problème rencontré lors de la suppression', life: 3000 });
              }

            });
        },
        reject: () => {
            this.messageService.add({ severity: 'error', summary: 'Annulation', detail: 'Suppression annulée', life: 3000 });
        }
    });
}

  getIntervention(ruche_id:any){
    this.loadingIntervention=true;
    this.interventionService.all(ruche_id).subscribe(data=>{
      this.interventionList=data?.member;
      this.totalInterventionRecords=data?.totalItems;
      console.log(data);


      this.loadingIntervention=false;
      this.cdr.detectChanges();
    });
  }



  changeDisplay(){
    console.log("change display")
    if(this.displayType=='map'){

    }
    //console.log(this.displayType);
  }

  editRuche(ruche:any){
    this.isUpdating=true;
    this.ruchedialog=true;
    this.cdr.detectChanges();
    //this.rucheForm.reset();

    this.ruche.id=ruche.id;
    this.ruche.libelle=ruche.libelle;
    this.ruche.longitude=ruche.longitude;
    this.ruche.latitude=ruche.latitude;

    console.log(this.ruche);

  }

  addIntervention(){
    this.interventionForm.reset();
    this.addInterventionDialog=true;
    this.cdr.detectChanges();
  }



  initMarkers() {

    for (let index = 0; index < this.rucheList.length; index++) {
      const data = this.rucheList[index];
      this.appendToMap(data,index);
    }

  }



  appendToMap(data:any,index:number){
    const marker = this.generateMarker(data, index);

        const popupContent = `
            <b>Ruche:</b> <span>${data.libelle}</span>
           <span class="ms-4">
              <button id="btn-${index}" class="p-button p-button-info btn-sm">
                  <i class="pi pi-eye"></i>
              </button>
           </span>
        `;

        // Ajoutez la popup au marqueur
        marker.addTo(this.map).bindPopup(popupContent);

        // Attachez un gestionnaire à l'événement popupopen
        marker.on('popupopen', () => {
            const button = document.getElementById(`btn-${index}`);
            if (button) {
              button.addEventListener('click', (e) => {
                this.openInterventionDialog(data); // Conserve le contexte correct
            });
            } else {
                console.error(`Bouton non trouvé pour l'index ${index}`);
            }
        });

        this.map.panTo({ lat: data.latitude, lng: data.longitude });
        this.markers.push(marker);
  }



  onDialogShow() {
    if (this.mapDialog) {
      this.mapDialog.invalidateSize(); // Recalculer la taille de la carte
      this.clearMarkersDialog();
      this.position.lat=null;
      this.position.lon=null;
    }
  }

  onDialogClose(){
    //console.log("close")
    this.interventionDialog=false;
    this.cdr.detectChanges();
    //console.log('end close');
  }


  openInterventionDialog(ruche: any) {
    console.log("openInterventionDialog appelé avec :", ruche);
    console.log("this.interventionDialog avant :", this.interventionDialog);

    this.interventionDialog = true;
    this.cdr.detectChanges();
    this.interventionList = [];
    this.ruche.id = ruche.id;
    this.ruche.libelle = ruche.libelle;
    this.ruche.longitude = ruche.longitude;
    this.ruche.latitude = ruche.latitude;

    this.getIntervention(this.ruche.id);

    this.cdr.detectChanges();
    console.log("this.interventionDialog après :", this.interventionDialog);
}



  saveIntervention(){
    this.senddingRequest=true;
    let interv={
      libelle:this.intervention.libelle,
      //date:this.intervention.date.getDay()+'/'+this.intervention.date.getMonth()+'/'+this.intervention.date.getFullYear(),

      ruche_id:this.ruche.id
    }

    console.log(interv);

    this.interventionService.create(interv).subscribe(data=>{
      if(data!=null){
        console.log(data);
        let int =data;

        this.interventionList.unshift(int);
        this.ruche.interventions.unshift(int);
        this.rucheList.filter(x=>x.id==this.ruche.id)[0].interventions=this.interventionList;
        this.messageToast("Intervention enregistrée avec succès","Confirmation");

      }else{
        //error
        //we can also use status of response

      }


      this.addInterventionDialog=false;
      this.senddingRequest=false;
      this.cdr.detectChanges();
    });

  }




  clearMarkersDialog() {
    this.dialogMarkers.forEach(marker => {
      this.mapDialog.removeLayer(marker); // Supprime chaque marqueur de la carte
    });
    this.dialogMarkers = []; // Vide le tableau des marqueurs
  }

  validerPosition(){
    this.ruche.latitude=this.position.lat;
    this.ruche.longitude=this.position.lon;

    this.positionDialog=false;
  }

 messageToast(message:string,summary:string,severity='success'){

  this.messageService.add({
    severity: severity,
    summary: summary,
    detail: message,
    life: 3000
  });

 }


 openRecolte(){
  this.recolteDialog=true;
  let x=0;


  this.recolteService.all(this.ruche.id).subscribe(data=>{
    this.recolteList=data;
    this.statChart()
    //this.totalRecolte=this.getTotal();

    this.recolteList.forEach(e=>{
      x=e.totalPoids;
    });

    this.totalRecolte=parseFloat((x/1000).toFixed(3));
    console.log(data);
    console.log(this.ruche);

    this.cdr.detectChanges();

  });


 }

 onCloseRecolteDialog(){

  this.recolteDialog=false;
  this.cdr.detectChanges();

}





 saveRecolte(){

  this.senddingRequest=true;
  let recol={
    poids:this.recolte.poids,
    date:this.recolte.date.getDay()+'/'+this.recolte.date.getMonth()+'/'+this.recolte.date.getFullYear(),
    ruche_id:this.ruche.id
  };

  console.log(recol);

  this.recolteService.create(recol).subscribe(data=>{
    if(data!=null){
      console.log(data);
      let rec =data;

      this.recolteList.unshift(rec);
      this.ruche.recoltes.unshift(rec);
      this.rucheList.filter(x=>x.id==this.ruche.id)[0].recoltes=this.recolteList;
      this.totalRecolte= this.totalRecolte+parseFloat((data.poids/1000).toFixed(3));

      this.openRecolte();
/*
      this.messageToast("Recolte enregistrée avec succès","Confirmation");
      this.dataChart=null;
      this.optionsChart={};
      setTimeout(() => {
        this.statChart();

      },200);
*/


    }else{
      //error
      //we can also use status of response

    }

    this.senddingRequest=false;
    this.cdr.detectChanges();
  });
 }

/**
 * For map
 */


 generateMarker(data: any, index: number) {
  return Leaflet.marker({ lat: data.latitude, lng: data.longitude }, { draggable: true })
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
  console.log($event.target);
  console.log($event.target.getLatLng());


}

openPositionDialog(){
  this.positionDialog=true;
  this.cdr.detectChanges();
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

statChart():void{

  this.dataChart = {
    labels: this.recolteList.map(x=>x.mois),
    datasets: [
      {
        label: 'Masse',
        data:this.recolteList.map(x=>x.totalPoids),
        backgroundColor: '#138ebb',
      }
    ]
  };


  this.optionsChart = {

    plugins: {
      title: {
        display: true,
        text: '',
        fontSize: 16
      },
      legend: {
        position: 'top'
      }
    }
  };

}


}
