import { ThrowStmt } from '@angular/compiler';
import { Component, OnChanges, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'malawi';
  // section 1
   public dP: number = 0.2;
   public tb: number = 100;
   public tc: number = 0;
   public it: number = 555;
   public lo: number = 1367;
   public tempDiff: number = Number((2 * this.dP * (this.tb - this.tc)*(this.it/this.lo)).toFixed(1));
  

   //section 2
  
   public ww: number = 0;
   public miwb: number = 0;
   public mfwb: number = 0;
   public mw: number = 0;

  //section 3
   public va = 0;
   public taLK = 304.06;
   public atD:number = 27;
   public atK: number = this.atD + 273;
   public taLD:number = this.atD + (this.tempDiff);
   public taLHD: number = 43.2;
   public to: number = this.taLD + 273;
   public pa = 101800.0;
   public cpa = 1006.0;

   //section 3.10
   public ra = 286.9;
   public rg: number = 461.5;
   public tb2: number = 373;
   public pc: number = 22060000;
   public tp: number = Number((0.25 * ((3 * this.taLD) + this.atD)).toFixed(2));
   public tpt: number = this.tp + 273;
   public vtc: number = 650;
   public lt: number = Math.round(Number(this.rg * this.vtc*this.tb2)*(Math.log(this.pc/Math.pow(10,5)))*(Math.pow((this.vtc-this.tpt),0.38))/(Math.pow((this.vtc-this.tb2),1.38)));

   //section 4
   public v: number = 0.993831219245376;
   public mfr: number = 1.19259746309445;
   public vam = '';
   public t: number = 86400;
   public p:number = 1.2;

   //section 5
   public n: number =  0.125;
   public smw: number = 529.41;
   public slt: number = 2.35E+06;
   public sit: number = 555;
   public st: number = 86400;
   public ca: number = Math.round((Number(this.smw * this.slt)/(this.sit * this.st * this.n)));

   //section 6
   public nc: number = 0;
   public vc: number = 0;
   public cv: number = 0.993831219245376;
   public w: number = 0.265;
   public s: number = 0.3;

   //section 7
   public dww: number = this.mw;
   public dt: number = 0.02;
   public bd: number = 600;
   public sa: number = this.bd/(this.bd * this.dt);
   public ld: number = (this.dww/this.sa);
  
   

   constructor(
   ) {}

   ngOnInit() {
   }

   public onWwChange($event){
    this.calculateMm();
    this.calculateMasOfCassavaToDry();
    this.calculateLoadingDensity();
   }

   public calculateMm(){
    this.mw = Number((this.ww * ((this.miwb/100) - (this.mfwb)/100)/(1 - (this.mfwb)/100)).toFixed(2));
   }
   public onMiwbChange($event){
    this.calculateMm();
   }
   public onMfwbChange($event){
    this.calculateMm();
   }
   public calculateMasOfCassavaToDry(){
      this.dww = Number(this.ww);
   }
   public onNChange($event){
    this.calculateSolarEnergyCollectionArea();
   }
   public calculateSolarEnergyCollectionArea(){
     this.ca = Math.round((this.smw * this.slt)/(this.sit * this.st * this.n));
   }
   public calculateLoadingDensity(){
      this.ld = (this.dww/this.sa);
   }
   public onVcChange($event){
    if($event !== ''){
      this.calculateNumberOfChimneys();
    }
   }
   public calculateNumberOfChimneys(){
      this.nc = Math.round(this.cv/(this.w * this.s * this.vc));
   }
   public onAtDChange($event){
     this.calculateAmbientTempInKelvin();
     this.calculateTempOfAirLeavingHeaterInDegrees();
     this.calculateTemparatureOfProduct();
     this.calculateEnthalpyOfVaporization();
   }
   public calculateAmbientTempInKelvin(){
      this.atK = Number(this.atD) + 273;
   }
   public calculateTempOfAirLeavingHeaterInDegrees(){
     this.taLD = Number(Number(this.atD) + Number(this.tempDiff));
     this.calculateTempOfAirLeavingHeaterInKelvin();
   }
   public calculateTempOfAirLeavingHeaterInKelvin(){
    this.to = this.taLD + 273;
   }
   public calculateTemparatureOfProduct(){
    this.tp = Number((0.25 * ((3 * this.taLD) + Number(this.atD))).toFixed(2));
    this.calculateTemparatureOfProductInKelvin();
   }
   public calculateTemparatureOfProductInKelvin(){
    this.tpt = Number(this.tp) + 273;
   }
   public calculateEnthalpyOfVaporization(){
    this.lt = Math.round(Number(this.rg * this.vtc*this.tb2)*(Math.log(this.pc/Math.pow(10,5)))*(Math.pow((this.vtc-this.tpt),0.38))/(Math.pow((this.vtc-this.tb2),1.38)));
   }



}
