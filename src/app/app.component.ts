import { Component } from '@angular/core';
import {Stimulsoft} from 'stimulsoft-reports-js/Scripts/stimulsoft.blockly.editor'

@Component({
  selector: 'app-root',
  template: `<div>
                  <h2>Stimulsoft Reports.JS Designer</h2>
                  <div id="designer"></div>
              </div>`
})
export class AppComponent {
  options: any;
  designer: any;

  ngOnInit() {
    console.log('Loading Designer view');
Stimulsoft.Base.Localization.StiLocalization.addLocalizationFile("../assets/fa.xml", false, "Farsi");

    console.log('Set full screen mode for the designer');
    this.options = new Stimulsoft.Designer.StiDesignerOptions();
    this.options.appearance.fullScreenMode = true;

    console.log('Create the report designer with specified options');
    this.designer = new Stimulsoft.Designer.StiDesigner(this.options, 'StiDesigner', false);
    console.log('Edit report template in the designer');
    var dataSet = new Stimulsoft.System.Data.DataSet("SimpleDataSet");

    dataSet.readJson({	"Customers" : {
        "CustomerID" : "ALFKI",
        "CompanyName" : "Alfreds Futterkistefghfghfghfghfghfghfgh",
        "ContactName" : "Maria Anders",
        "ContactTitle" : "Sales Representative",
        "Address" : "Obere Str. 57",
        "City" : "Berlin",
        "Region" : null,
        "PostalCode" : "12209",
        "Country" : "Germany",
        "Phone" : "030-0074321",
        "Fax" : "030-0076545"
      }})
    this.designer.report = new Stimulsoft.Report.StiReport();
    // this.designer.report.loadFile('/reports/SimpleList.mrt');
    this.designer.report.regData(dataSet.dataSetName, "JSON", dataSet);

    this.designer.report.dictionary.synchronize();

    console.log('this.designer.report' , this.designer.report)

    console.log('Load report from url');

    console.log('Rendering the designer to selected element');
    this.designer.renderHtml('designer');

    console.log('Loading completed successfully!');
let _this = this
    this.designer.onSaveReport = function (args:any) {



//a flag to prevent further processing of the event

      args.preventDefault = false;



//Report name from the designer save dialog

      var reportName = args.fileName;



//Original report name from properties

      var reportName = args.report.reportName;
     console.log('args', args)
      args.preventDefault = false;

      var jsonReport = args.report.saveToJsonString();

      console.log('jsonReport', jsonReport)

    }

  }

  constructor() {
  }
}
