import { Injectable } from '@angular/core';
import * as CropData from './crop-data/crop-data.json';

@Injectable({
  providedIn: 'root'
})
export class CropService {

  private cropData: any  = {
    "Apples": {
      "initialMc": 80,
      "finalMc": 24,
      "bulkDensity": 513
    },
    "Apricot": {
      "initialMc": 85,
      "finalMc": 18,
      "bulkDensity": 400
    },
    "Bananas": {
      "initialMc": 80,
      "finalMc":15,
      "bulkDensity":1000
    },
    "Beans": {
      "initialMc": 22,
      "finalMc": 10,
      "bulkDensity": 750
    },
    "Brinjal": {
      "initialMc": 95,
      "finalMc": 6,
      "bulkDensity":750
    },
    "Carrot": {
      "initialMc": 70,
      "finalMc": 5,
      "bulkDensity": 1000
    },
    "Cassava": {
      "initialMc": 65,
      "finalMc":16,
      "bulkDensity":500
    },
    "Cauliflower": {
      "initialMc": 80,
      "finalMc":6,
      "bulkDensity": 270
    },
    "ChickenPeas": {
      "initialMc": 22,
      "finalMc": 10,
      "bulkDensity": 750
    },
    "Chilies": {
      "initialMc": 85,
      "finalMc": 5,
      "bulkDensity": 450
    },
    "CowPeas": {
      "initialMc": 22,
      "finalMc":10,
      "bulkDensity":400
    },
    "Garlic": {
      "initialMc": 80,
      "finalMc": 4,
      "bulkDensity": 500
    },
    "Grapes": {
      "initialMc": 80,
      "finalMc": 20,
      "bulkDensity":2000
    },
    "GreenGrams": {
      "initialMc": 70,
      "finalMc": 5,
      "bulkDensity": 430
    },
    "GreenPeas": {
      "initialMc": 80,
      "finalMc":5,
      "bulkDensity":1150
    },
    "Guavas": {
      "initialMc": 80,
      "finalMc":7,
      "bulkDensity": 250
    },
    "Lentils": {
      "initialMc": 22,
      "finalMc": 10,
      "bulkDensity":850
    },
    "Maize": {
      "initialMc": 35,
      "finalMc": 16,
      "bulkDensity": 550
    },
    "Millet": {
      "initialMc": 36,
      "finalMc": 16,
      "bulkDensity" : 780
    },
    "Onion": {
      "initialMc": 80,
      "finalMc": 5,
      "bulkDensity": 550
    },
    "Pineapple": {
      "initialMc": 80,
      "finalMc": 10,
      "bulkDensity":700
    },
    "Potato": {
      "initialMc": 75,
      "finalMc": 7,
      "bulkDensity" : 675
    },
    "Rice": {
      "initialMc": 24,
      "finalMc": 11,
      "bulkDensity": 800
    },
    "Sorghum": {
      "initialMc": 36,
      "finalMc": 18,
      "bulkDensity":780
    },
    "SweetPotato": {
      "initialMc": 75,
      "finalMc": 7,
      "bulkDensity" : 675
    },
    "Tomato": {
      "initialMc": 96,
      "finalMc": 10,
      "bulkDensity": 1000
    },
    "Wheat": {
      "initialMc": 20,
      "finalMc": 16,
      "bulkDensity": 750
    }
  }
  constructor(
  ) { 
  }

  public getAllCropData(): any{
     return this.cropData;
  }
  public getCropData(crop: string): any{
       return this.cropData[crop];
  }


}
