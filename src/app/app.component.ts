import { Component, OnChanges, OnInit } from '@angular/core';

import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from 'pdfmake/build/vfs_fonts';

(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;
import { ForecastService } from './services/forecast.service';
import { CropService } from './crop.service';
import { Crop } from './crop';
import { DrierDocService } from './drier-doc.service';

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

   
   // public baseImgUrl = "https://agriceng.netlify.app/assets/";
   public baseImgUrl = "./assets/";
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
   public docTitle = '';

   //crops

   public crops: any;
   public selectedCropData: Crop;
   public cropOptions = [];
   public readOnlyMode = false;
  
   

   constructor(
     private forecastService: ForecastService,
     private cropService: CropService,
     private drierDocService: DrierDocService
   ) {}

   ngOnInit() {
    this.getForecast();
    this.getCrops();
   }

   public onWwChange($event){
    console.log('wwchange', $event);
    this.determineDrierSize($event);
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
    console.log('Imageurl', imageUrl);
    this.getBase64ImageFromURL(imageUrl)
    .then((result: any)=>{
       const imageUrl = result;
       this.generatePdfDocDef(imageUrl).then((docDef)=>{
          console.log('generatePdfDocDef', docDef);
          this.createPdf(docDef);

       });

    })
    .catch((error)=>{
        console.error('Error displaying image', error);
    })
     

   }
   public createPdf(docDefinition: any){
    pdfMake.createPdf(docDefinition).open();

   }
   public generatePdfDocDef(imageUrl: string){
    return new Promise((resolve, reject) => {
     let docDefinition: any;
     if(this.drierSize === 'Small Drier'){

      if(this.drierType === 'improved'){
        const drierImgUrl= this.baseImgUrl + 'small_improved_drier_example.jpg';
        const smallImprovedDrierVar = this.baseImgUrl + 'small_improved_drier_variation.jpg';
        console.log('drierImgurl', drierImgUrl);
        console.log('smallImprovedDrierVar', smallImprovedDrierVar);
        Promise.all([this.getBase64ImageFromURL(imageUrl),
          this.getBase64ImageFromURL(drierImgUrl),
          this.getBase64ImageFromURL(smallImprovedDrierVar)]).then((images) => {
          console.log('smallImprovedDrierImgs', images);
          const smallSimpleDrierImgs = images;
          docDefinition = this.drierDocService.generaSmallImprovedDrierDoc(this.docTitle,this.ca,this.nc,smallSimpleDrierImgs);
          resolve(docDefinition);
        });
      }else{
          const drierImgUrl= this.baseImgUrl + 'small_simple_drier_example.png';
          const smallSimpleDrierVar = this.baseImgUrl + 'small_simple_drier_variation.jpg';
          console.log('drierImgurl', drierImgUrl);
          console.log('smallSimpleDrierVar', smallSimpleDrierVar);
          Promise.all([this.getBase64ImageFromURL(imageUrl),
            this.getBase64ImageFromURL(drierImgUrl),
            this.getBase64ImageFromURL(smallSimpleDrierVar)]).then((images) => {
            console.log('smallSimpleDrierImgs', images);
            const smallSimpleDrierImgs = images;
            docDefinition = this.drierDocService.generaSmallSimpleDrierDoc(this.docTitle,this.ca,this.nc,smallSimpleDrierImgs);
            resolve(docDefinition);
          });
      }

    }else if(this.drierSize === 'Large Drier'){
        if(this.drierType === 'improved'){
          this.getBase64ImageFromURL(imageUrl)
          .then((imageResultUrl: string) => {
            docDefinition = this.drierDocService.generateLargeImprovedDrierDoc(this.docTitle,this.ca,this.nc,imageResultUrl);
            resolve(docDefinition);

          });
         
        }else{
          const drierImgUrl= this.baseImgUrl + 'large_improved_example.png';
          const largeDrierVar = this.baseImgUrl + 'large_simple_variations.png';
          console.log('drierImgurl', drierImgUrl);
          console.log('largeDrierVar', largeDrierVar);
          Promise.all([this.getBase64ImageFromURL(drierImgUrl),this.getBase64ImageFromURL(largeDrierVar)]).then((images) => {
            console.log('images', images);
            const largeDrierImgs = images;
            docDefinition = this.drierDocService.generateLargeSimpleDrierDoc(this.docTitle,this.ca,this.nc,imageUrl,largeDrierImgs);
            resolve(docDefinition);
          });
        }
    }

  });
     

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
      tempArray.forEach((t: any) => {
          totalTemp += t.temp ? t.temp : 0;
      });

      console.log('totalTemp',totalTemp);
      const avgTemp = (totalTemp / tempArray.length).toFixed(2);
      console.log('avgTemp',avgTemp);
      this.averageTemp = Number(avgTemp);
      this.atD = this.averageTemp;
      this.onAtDChange(this.atD);
  }
  public getWindDataArray(data: any){
    const arr = [];
    data.forEach((d: any) => {
      arr.push(d.wind);
    });

    console.log('arrWind',arr);
    this.getAvgWindSpeed(arr);

  }
  public getAvgWindSpeed(windArray: any): void{
      let totalWindSpeed = 0
      windArray.forEach((w: any) => {
          totalWindSpeed += w.speed ? w.speed : 0;
      });

      console.log('totalWindSpeed',totalWindSpeed);
      const avgWs = (totalWindSpeed / windArray.length).toFixed(2);
      console.log('avgWindSpeed',avgWs);
      this.averageWindSpeed = Number(avgWs);
      this.vc = this.averageWindSpeed;
  }
  public onMcSourceChange($event: string): void{
     console.log('onMcSource',$event);
     switch($event){
      case 'manual':
        this.miwb = 0;
        this.miwb = 0;
        this.readOnlyMode = false;
        break;
      case 'system':
        this.setFilterDatafromCropData(this.selectedCropData);
        this.readOnlyMode = true;
        break;

     }
  }
  public ondryerSizeChange($event): void{
    console.log('ondryerSizeChange',$event);
    this.setDrierImage();
  }
  public ondryerTypeChange($event: string): void{
    console.log('ondryerTypeChange',$event);
    this.setDrierImage();
    this.setDocTitle();
  }
  public setDrierImage(){
      if(this.drierSize === 'Small Drier'){

        if(this.drierType === 'improved'){
             this.selectedDrierImg = this.smallImprovedDrierImg;
        }else{
          this.selectedDrierImg = this.smallSimpleDrierImg;
        }

      }else if(this.drierSize === 'Large Drier'){
          if(this.drierType === 'improved'){
                this.selectedDrierImg = this.largeImprovedDrierImg;
          }else{
            this.selectedDrierImg = this.largeSimpleDrierImg;
          }

      }else{
        this.selectedDrierImg = this.largeSimpleDrierImg;
      }
  }
  public setDocTitle(){
    if(this.drierSize === 'Small Drier'){

      if(this.drierType === 'improved'){
           this.docTitle = 'Small Improved Drier';
      }else{
           this.docTitle = 'Small Simple Drier';
      }

    }else if(this.drierSize === 'Large Drier'){
        if(this.drierType === 'improved'){
          this.docTitle = 'Large Improved Drier';
        }else{
          this.docTitle = 'Large Simple Drier';
        }

    }else{
      this.docTitle = 'Drier';
    }

  }

  public getCrops(){
     this.crops = this.cropService.getAllCropData();
     console.log('crops', this.crops);
     const cropOptions = Object.entries(this.crops).map(([key, value])=> {
        return {
          label: key,
          value: key
        }
     });
     console.log('cropOptions', cropOptions);
     this.cropOptions = cropOptions;
  }
  public onCropChange($event){
    console.log('cropChange',$event);
    const cropData = this.getCropData($event);
    this.selectedCropData = cropData;
    this.setFilterDatafromCropData(this.selectedCropData);
    this.calculateMm();
  }
  public getCropData(crop: string): any{
     const cropData: Crop = this.cropService.getCropData(crop);
     console.log('Specific Crop Data', cropData);
     return cropData;
  }
  public setFilterDatafromCropData(cropData: any): void{
       if(cropData.initialMc){
         this.miwb = cropData.initialMc;
       }
       if(cropData.finalMc){
         this.mfwb = cropData.finalMc;
       }
  }
  private determineDrierSize(productMass: number): void{
      if(productMass > 100){
        this.drierSize = 'Large Drier';
      }else {
        this.drierSize = 'Small Drier'
      }

  }

}
