import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DrierDocService {

  constructor() { }
  public generateLargeSimpleDrierDoc(docTitle: string,
    ca: number,
    nc: number,
    imageUrl: string,
    largeDrierImgs: any[]): any{
    const docDefinition = { 
      content: [
        {
          text: docTitle, 
          style: 'header', 
          alignment: 'center'
        },
        {
          text: '1. Output from the App',
          style: 'subheader'
        },
        '\n',
        `The Area of the Drying Chamber = ${ca}`,
        `The Number of Chimneys = ${nc} \n\n\n`,
        {
          text: '2. Schematics',
          style: 'subheader'
        },
        {
          image: imageUrl,
          width: 500
        },
        '\n\n',
        {
          text: '3. Construction Notes',
          style: 'subheader'
        },
        '\n',
        'The length and width of the drying chamber should be calculated from the Area of the drying chamber',
        'The height of the dryer should not exceed 3 meters',
        'A solar absorbent material, preferably UV stabilized greenhouse polythene sheet of 200 mm micro thickness, should cover the top of the collector. Two drying trays are recommended for this type of dryer',
        '\n\n',
        {
          text: '4. Example of constructed Small Improved Dryer',
          style: 'subheader'
        },
        {
          image: largeDrierImgs[0]?largeDrierImgs[0]: '',
          width: 500
        },
        '\n\n',
        {
          text: '5. Possible Variations',
          style: 'subheader'
        },
        {
          image: largeDrierImgs[1]?largeDrierImgs[1]: '',
          width: 500
        },
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
  public generateLargeImprovedDrierDoc(docTitle: string,
    ca: number,
    nc: number,
    imageUrl: string): any{
    const docDefinition = { 
      content: [
        {
          text: docTitle, 
          style: 'header', 
          alignment: 'center'
        },
        {
          text: '1. Output from the App',
          style: 'subheader'
        },
        '\n',
        `The Area of the Drying Chamber = ${ca}`,
        `The Number of Chimneys = ${nc} \n\n\n`,
        {
          text: '2. Schematics',
          style: 'subheader'
        },
        {
          image: imageUrl,
          width: 500
        },
        '\n\n',
        {
          text: '3. Construction Notes',
          style: 'subheader'
        },
        '\n',
        'The length and width of the drying chamber should be calculated from the Area of the drying chamber',
        'The length and width of the Area of the Collector should be calculated from the Area of the Collector from the App',
        'The height of the dryer should not exceed 3 meters',
        'A solar absorbent material, preferably UV stabilized greenhouse polythene sheet of 200 mm micro thickness, should cover the top of the drying chamber.',
        'A solar absorbent material, preferably UV stabilized greenhouse polythene sheet of 200 mm micro thickness or Perspex glass, should cover the top of the collector.',
        'Two drying trays are recommended for this type of dryer'
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
}
