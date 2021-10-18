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
  constructor(private afStorage: AngularFireStorage) { }

  getDownloadUrl() {
    this.afStorage.ref('receipt_chihuahua.pdf').getDownloadURL().subscribe(x => this.downloadUrl = x)    
  }

  ngOnInit(): void {
    this.getDownloadUrl();
  }

  async generatePdf() {
    
    
    // Fetch an existing PDF document
    
    const existingPdfBytes = await fetch(this.downloadUrl).then(res => res.arrayBuffer())

    // Load a PDFDocument from the existing PDF bytes
    const pdfDoc = await PDFDocument.load(existingPdfBytes)
    console.log(pdfDoc);



    // Embed the Helvetica font
    const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica)

    // Get the first page of the document
    const pages = pdfDoc.getPages()
    const firstPage = pages[0]

    firstPage.moveTo(100, firstPage.getHeight() - 5)


    // Get the width and height of the first page
    const { width, height } = firstPage.getSize()

    // Draw a string of text diagonally across the first page
    firstPage.drawText('This text', {
      x: 5,
      y: height / 2 + 300,
      size: 50,
      font: helveticaFont,
      color: rgb(0.95, 0.1, 0.1),
      rotate: degrees(-45),
    })
    const svgFirst3Digits =
      'M 10 10 H 38 V 27 H 10 L 10 10';
    const svgDates =
    'M 10 10 H 23 V 23 H 10 L 10 10';
    const svgDateYear =
    'M 10 10 H 30 V 23 H 10 L 10 10';

      // Draw SVG - Erase last 3 digits at the TOP
    firstPage.moveDown(7);
    firstPage.moveRight(413);
    firstPage.drawSvgPath(svgFirst3Digits, { color: rgb(0.8, 0.8, 0.8), borderColor: rgb(0,1,0), borderWidth: 2 })

    firstPage.moveDown(147);
    firstPage.moveLeft(460);
    firstPage.drawSvgPath(svgDates, { color: rgb(1, 1, 1), borderColor: rgb(0,0,0), borderWidth: 1 })

    firstPage.moveRight(52);
    firstPage.drawSvgPath(svgDates, { color: rgb(1, 1, 1), borderColor: rgb(0,0,0), borderWidth: 1 })

    firstPage.moveRight(52);
    firstPage.drawSvgPath(svgDateYear, { color: rgb(1, 1, 1), borderColor: rgb(0,0,0), borderWidth: 1 })

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
