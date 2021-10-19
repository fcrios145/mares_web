import { Component, OnInit } from '@angular/core';
import { PDFDocument, StandardFonts, rgb, degrees, toHexString } from 'pdf-lib';
import { saveAs } from 'file-saver';
import { AngularFireStorage } from '@angular/fire/compat/storage';

@Component({
  selector: 'app-receipt',
  templateUrl: './receipt.component.html',
  styleUrls: ['./receipt.component.scss']
})
export class ReceiptComponent implements OnInit {
  downloadUrl: string = '';

  folio: string = '';
  day: string = '';
  month: string = '';
  year: string = '';
  uadministrativa: string = '';
  arearecaudadora: string = '';
  domicilio: string = '';
  estado: string = '';
  delegacion: string = '';
  cp: string = '';
  dia: string = '';
  mes: string = '';
  anio: string = '';
  nombre: string = '';
  domiciliopersona: string = '';
  paispersona: string = '';
  ciudadpersona: string = '';
  rfc: string = '';
  curp: string = '';
  cppersona: string = '';
  telefono: string = '';
  claveconcepto: string = '';
  cadenadependencia: string = '';

  ciudadUISelected: string = 'CHIHUAHUA';
  cities = [
    { key: '', value: '' },
    { key: 'CHIHUAHUA', value: 'CHIHUAHUA', extraFields: {} }
  ]

  constructor(private afStorage: AngularFireStorage) { }

  getDownloadUrl() {
    this.afStorage.ref('receipt_chihuahua_fillable_form.pdf').getDownloadURL().subscribe(x => this.downloadUrl = x)    
  }

  ngOnInit(): void {
    this.getDownloadUrl();
  }

  async generatePdf() {
    
    
    // Fetch an existing PDF document
    
    const existingPdfBytes = await fetch(this.downloadUrl).then(res => res.arrayBuffer())

    // Load a PDFDocument from the existing PDF bytes
    const pdfDoc = await PDFDocument.load(existingPdfBytes)
    const form = pdfDoc.getForm()

    if (this.ciudadUISelected === 'CHIHUAHUA') {
      this.uadministrativa = '628 - CHIHUAHUA';
      this.arearecaudadora = '313 - DIRECCION GENERAL DE PROTECCION Y MEDICINA PREVENTIVA';
      this.domicilio = 'KM. 3 CARRETERA A AVALOS S/N, COL. RANCHERIA JUAREZ, CHIHUAHUA';
      this.estado = 'CHIHUAHUA';
      this.delegacion = 'CHIHUAHUA';
      this.cp = '31064';
    }
    
    form.getTextField('uadministrativa').setText(this.uadministrativa);
    form.getTextField('arearecaudadora').setText(this.arearecaudadora);
    form.getTextField('domicilio').setText(this.domicilio);
    form.getTextField('estado').setText(this.estado);
    form.getTextField('delegacion').setText(this.delegacion);
    form.getTextField('cp').setText(this.cp);
    form.getTextField('dia').setText(this.dia);
    form.getTextField('mes').setText(this.mes);
    form.getTextField('anio').setText(this.anio);
    form.getTextField('nombre').setText(this.nombre);
    form.getTextField('domiciliopersona').setText(this.domiciliopersona);
    form.getTextField('paispersona').setText(this.paispersona);
    form.getTextField('ciudadpersona').setText(this.ciudadpersona);
    form.getTextField('rfc').setText(this.rfc);
    form.getTextField('curp').setText(this.curp);
    form.getTextField('cppersona').setText(this.cppersona);
    form.getTextField('telefono').setText(this.telefono);


    // // // Embed the Helvetica font
    const helveticaFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold)
    // // const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman)

    // // // Get the first page of the document
    const pages = pdfDoc.getPages()
    const firstPage = pages[0]

    firstPage.moveTo(100, firstPage.getHeight() - 5)

    // // // Get the width and height of the first page
    // // const { width, height } = firstPage.getSize()
  
    // // const svgFirst3Digits =
    // //   'M 10 10 H 38 V 27 H 10 L 10 10';
    // // const svgDates =
    // // 'M 10 10 H 23 V 23 H 10 L 10 10';
    // // const svgDateYear =
    // // 'M 10 10 H 30 V 23 H 10 L 10 10';

    // //   // Draw SVG - Erase last 3 digits at the TOP
    // // firstPage.moveDown(7);
    // // firstPage.moveRight(413);
    // // firstPage.drawSvgPath(svgFirst3Digits, { color: rgb(0.8, 0.8, 0.8), borderColor: rgb(0,1,0), borderWidth: 2 })

    // // firstPage.moveDown(147);
    // // firstPage.moveLeft(460);
    // // firstPage.drawSvgPath(svgDates, { color: rgb(1, 1, 1), borderColor: rgb(0,0,0), borderWidth: 1 })

    // // firstPage.moveRight(52);
    // // firstPage.drawSvgPath(svgDates, { color: rgb(1, 1, 1)} )

    // // firstPage.moveRight(52);
    // // firstPage.drawSvgPath(svgDateYear, { color: rgb(1, 1, 1)} )

    // //   // Draw a string of text diagonally across the first page
    // //   firstPage.drawText('10', {
    // //     x: 64,
    // //     y: 613,
    // //     size: 8,
    // //     font: helveticaFont,
    // //     color: rgb(0, 0, 0)
    // //   });

      firstPage.drawText(this.cadenadependencia, {
        x: 205,
        y: 424,
        size: 8,
        font: helveticaFont,
        color: rgb(0, 0, 0)
      });

      firstPage.drawText('628210010' + this.folio, {
        x: 480,
        y: 758,
        size: 8,
        font: helveticaFont,
        color: rgb(0, 0, 0)
      });

      firstPage.drawText(this.claveconcepto, {
        x: 116,
        y: 512,
        size: 8,
        font: helveticaFont,
        color: rgb(0, 0, 0)
      });

    

    // Draw the SVG path as a black line
    // firstPage.moveDown(25)
    // firstPage.drawSvgPath(svgPath)

    // // Draw the SVG path as a thick green line
    // firstPage.moveDown(200)
    // firstPage.drawSvgPath(svgPath, { borderColor: rgb(0, 1, 0), borderWidth: 5 })

    

    // Draw the SVG path at 50% of its original size
    // firstPage.moveDown(200)
    // firstPage.drawSvgPath(svgPath, { scale: 0.5 })


    // Serialize the PDFDocument to bytes (a Uint8Array)
    const pdfBytes = await pdfDoc.save();
    var blob = new Blob([pdfBytes]);

    // Trigger the browser to download the PDF document
    // download(pdfBytes, "pdf-lib_modification_example.pdf", "application/pdf");
    saveAs(blob, "pdf-lib_modification_example.pdf");

  }

}