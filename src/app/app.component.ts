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
   public dP = 0.2;
   public tb = 100;
   public tc = 0;
   public it = 555;
   public lo = 1367;
   public tempDiff = (2 * this.dP * (this.tb - this.tc)*(this.it/this.lo)).toFixed(1);
  

   //section 2
  
   public ww = 0;
   public miwb = 0;
   public mfwb = 0;
   public mw: number = 0;

  //section 3
   public va = 0;
   public taLD = 31.6;
   public taLK = 304.06;
   public atD = 27;
   public atK = 300;
   public taLHD = 43.2;
   public to = 316.2;
   public pa = 101800.0;
   public cpa = 1006.0;

   //section 3.10
   public lt = (2.35 * Math.pow(10, 6));
   public ra = 286.9;
   public rg = 461.5;
   public tb2 = 373;
   public pc = 22060000;
   public tp = 39.18;
   public tpt = 312.18;
   public vtc = 650;

   //section 4
   public v = 0.993831219245376;
   public mfr = 1.19259746309445;
   public vam = '';
   public t = 86400;
   public p = 1.2;

   //section 5
   public ca = 0;
   public n =  0;
   public smw = 529.41;
   public slt = 2.35E+06;
   public sit = 555;
   public st = 86400;

   //section 6
   public nc = 0;
   public vc = 0;
   public cv = 0.993831219245376;
   public w = 0.265;
   public s = 0.3;

   //section 7
   public dww = this.mw;
   public dt = 0.02;
   public bd = 600;
   public sa = 600/(this.bd * this.dt);
   public ld = (this.dww/this.sa);
  
   

   constructor(
   ) {}

   ngOnInit() {
   console.log('module loaded..');

   }

   public onWwChange($event){
    console.log('onchange ww', $event);
    this.calculateMm();
   }

   public calculateMm(){
    console.log('calculatemm..');
    this.mw = Number((this.ww * ((this.miwb/100) - (this.mfwb)/100)/(1 - (this.mfwb)/100)).toFixed(2));
   }
   public onMiwbChange($event){
    console.log('onchange miwb', $event);
    this.calculateMm();
   }
   public onMfwbChange($event){
    console.log('onchange mfwb', $event);
    this.calculateMm();
   }
   public onNChange($event){
    console.log('onchange n', $event);
    this.calculateSolarEnergyCollectionArea();
   }
   public calculateSolarEnergyCollectionArea(){
     console.log('calculateSolarEnergyCollectionArea...');
     this.ca = (this.smw * this.slt)/(this.sit * this.st * this.n);
     console.log('ca..', this.ca);
   }
   public onVcChange($event){
    console.log('onVcchange ...', $event);
    if($event !== ''){
      this.calculateNumberOfChimneys();
    }
   }
   public calculateNumberOfChimneys(){
      this.nc = Math.round(this.cv/(this.w * this.s * this.vc))
      console.log('nc', this.nc);;
   }



}
