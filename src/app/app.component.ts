import { ThrowStmt } from '@angular/compiler';
import { Component, OnChanges, OnInit } from '@angular/core';

import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from 'pdfmake/build/vfs_fonts';

(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;
import { ForecastService } from './services/forecast.service';

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
   public tempDiff: number = Number(2 * this.dP * (this.tb - this.tc)*(this.it/this.lo));
  

   //section 2
  
   public ww: number = 0;
   public miwb: number = 0;
   public mfwb: number = 0;
   public mw: number = 0;

  //section 3

   public taLK = 304.06;
   public atD:number = 0;
   public atK: number = this.atD + 273;
   public taLD:number = this.atD + (this.tempDiff);
   public taLHD: number = 43.2;
   public to: number = this.taLD + 273;
   public pa:number = 101800.0;
   public cpa:number = 1006.0;

   //section 3.10
   public ra = 286.9;
   public rg: number = 461.5;
   public tb2: number = 373;
   public pc: number = 22060000;
   public tp: number = Number(0.25 * ((3 * this.taLD) + this.atD));
   public tpt: number = this.tp + 273;
   public vtc: number = 650;
   public lt: number = Math.round(Number(this.rg * this.vtc*this.tb2)*(Math.log(this.pc/Math.pow(10,5)))*(Math.pow((this.vtc-this.tpt),0.38))/(Math.pow((this.vtc-this.tb2),1.38)));

   //section3 dependant on 3.10
   public va = (this.mw * this.lt * this.ra * this.atD)/(this.cpa * this.pa*(this.to - this.taLK));
   
   //section 4
   public t: number = 86400;
   public v: number = Number((this.va / this.t));
   public vam = '';
   public p:number = 1.2;
   public mfr: number = Number(this.v /this.p);

   //section 5
   public n: number =  0.125;
   public smw: number = 0;
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

   // public largeDrierImgUrl = "http://localhost:4200/assets/large_drier.jpg";
   public baseImgUrl = "https://agriceng.netlify.app/assets/";
   public smallSimpleDrierImg = 'small_simple.jpg';
   public smallImprovedDrierImg = 'small_improved.jpg';
   public largeSimpleDrierImg = 'large_simple.jpg';
   public largeImprovedDrierImg = 'large_improved.jpg';
   public selectedDrierImg = '';

   public averageTemp:number;
   public averageWindSpeed:number;
   public mcSource = '';
   public drierSize = '';
   public drierType = '';
  
   

   constructor(
     private forecastService: ForecastService
   ) {}

   ngOnInit() {
    this.getForecast();
   }

   public onWwChange($event){
    this.calculateMm();
    //this.calculateSolarEnergyCollectionArea();
    this.calculateMasOfCassavaToDry();
    this.calculateLoadingDensity();
    this.calculateVolumeOfAirRequiredToRemoveMositure();
    this.calculateVolumeFlowRate();
    this.calculateMassFlowRate();
    this.calculateNumberOfChimneys();
   }

   public calculateMm(){
    this.mw = Number(this.ww * ((this.miwb/100) - (this.mfwb)/100)/(1 - (this.mfwb)/100));
    this.calculateSolarEnergyCollectionArea();
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
     this.ca = Math.round((this.mw * this.slt)/(this.sit * this.st * this.n));
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
      this.nc = Math.round(this.v/(this.w * this.s * this.vc));
   }
   public onAtDChange($event){
     this.calculateAmbientTempInKelvin();
     this.calculateTempOfAirLeavingHeaterInDegrees();
     this.calculateTemparatureOfProduct();
     this.calculateEnthalpyOfVaporization();
     this.calculateVolumeOfAirRequiredToRemoveMositure();
     this.calculateVolumeFlowRate();
     this.calculateMassFlowRate();
     this.calculateNumberOfChimneys();
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
    this.tp = Number((0.25 * ((3 * this.taLD) + Number(this.atD))));
    this.calculateTemparatureOfProductInKelvin();
   }
   public calculateTemparatureOfProductInKelvin(){
    this.tpt = Number(this.tp) + 273;
   }
   public calculateEnthalpyOfVaporization(){
    this.lt = Math.round(Number(this.rg * this.vtc*this.tb2)*(Math.log(this.pc/Math.pow(10,5)))*(Math.pow((this.vtc-this.tpt),0.38))/(Math.pow((this.vtc-this.tb2),1.38)));
   }
   public calculateVolumeOfAirRequiredToRemoveMositure(){
    this.va = Number(((this.mw * this.lt * this.ra * this.atK)/(this.cpa * this.pa*(this.to - this.taLK))));
   }
   public calculateVolumeFlowRate(){
     this.v = Number((this.va / this.t));
   }
   public calculateMassFlowRate(){
     this.mfr = Number((this.v * this.p));
   }
   public viewAsPdf(){
    console.log('View as pdf...');
    const imageUrl = this.baseImgUrl + this.selectedDrierImg;
    this.getBase64ImageFromURL(imageUrl)
    .then((result)=>{
       const imageUrl = result;
       const docDefinition = this.generatePdfDocDef(imageUrl);
       this.createPdf(docDefinition);

    })
    .catch((error)=>{
        console.error('Error displaying image', error);
    })
     

   }
   public createPdf(docDefinition){
    pdfMake.createPdf(docDefinition).open();

   }
   public generatePdfDocDef(imageUrl){
    const docDefinition = { 
      content: [
        {text: 'Agriceng Tunnel Dryer App', style: 'header'},
        {
          image: imageUrl,
          width: 500
        },
          {
            style: 'tableExample',
            table: {
              body: [
                ['Output', 'Value'],
                ['Mass of moisture to be removed in kg', (this.mw).toFixed(2)],
                ['Volume of air required to remove the moisture in m3', (this.va).toFixed(2)],
                ['Volume flow rate (Va/t)', (this.v).toFixed(2)],
                ['Collector area', this.ca],
                ['Number of chimneys', this.nc],
                ['Surface area of drying beds in m2', this.sa],
                ['Loading Density', this.ld]
              ]
            }
          }
      ],
     
      styles: {
        header: {
          fontSize: 18,
          bold: true,
          alignment: 'left',
          margin: [0,5,0,5]
        }
     }


   }

   return docDefinition;
  }
  public getBase64ImageFromURL(url) {
    return new Promise((resolve, reject) => {
      var img = new Image();
      img.setAttribute("crossOrigin", "anonymous");

      img.onload = () => {
        var canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;

        var ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0);

        var dataURL = canvas.toDataURL("image/png");

        resolve(dataURL);
      };

      img.onerror = error => {
        reject(error);
      };

      img.src = url;
    });
  }

  public getForecast(){
     this.forecastService.getForeCast()
     .subscribe((result: any)=> {
      console.log('result', result);
      const list = result.default.list;
      this.getTempDataArray(list);

      this.getWindDataArray(list);
     })
  }
  public getTempDataArray(data){
    const arr = [];
    data.forEach((d: any) => {
      arr.push(d.main);
    });

    console.log('arr',arr);
    this.getAvgTemp(arr);

  }
  public getAvgTemp(tempArray: any){
      let totalTemp = 0
      tempArray.forEach((t) => {
          totalTemp += t.temp;
      });

      console.log('totalTemp',totalTemp);
      const avgTemp = (totalTemp / tempArray.length).toFixed(2);
      console.log('avgTemp',avgTemp);
      this.averageTemp = Number(avgTemp);
  }
  public getWindDataArray(data: any){
    const arr = [];
    data.forEach((d: any) => {
      arr.push(d.wind);
    });

    console.log('arrWind',arr);
    this.getAvgTemp(arr);

  }
  public getAvgWindSpeed(windArray: any){
      let totalWindSpeed = 0
      windArray.forEach((t: any) => {
          totalWindSpeed += t.speed;
      });

      console.log('totalWindSpeed',totalWindSpeed);
      const avgWs = (totalWindSpeed / windArray.length).toFixed(2);
      console.log('avgWindSpeed',avgWs);
      this.averageWindSpeed = Number(avgWs);
  }
  public onMcSourceChange($event: string): void{
     console.log('onMcSource',$event);
  }
  public ondryerSizeChange($event): void{
    console.log('ondryerSizeChange',$event);
    this.setDrierImage();
  }
  public ondryerTypeChange($event: string): void{
    console.log('ondryerTypeChange',$event);
    this.setDrierImage();
  }
  public setDrierImage(){
      if(this.drierSize === 'smallDrier'){

        if(this.drierType === 'imoproved'){
             this.selectedDrierImg = this.smallImprovedDrierImg;
        }else{
          this.selectedDrierImg = this.smallSimpleDrierImg;
        }

      }else if(this.drierSize === 'largeDrier'){
          if(this.drierType === 'improved'){
                this.selectedDrierImg = this.largeImprovedDrierImg;
          }else{
            this.selectedDrierImg = this.largeSimpleDrierImg;
          }

      }else{
        this.selectedDrierImg = this.largeSimpleDrierImg;
      }
  }

}
