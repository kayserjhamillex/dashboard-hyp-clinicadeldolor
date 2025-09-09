import { Component } from '@angular/core';

@Component({
  selector: 'app-report-tercero',
  standalone: true,
  imports: [],
  templateUrl: './report-tercero.component.html',
  styleUrl: './report-tercero.component.css'
})
export default class ReportTerceroComponent implements OnInit {
  fechaminstart: Date;
  fechamaxstart: Date;
  stringmaxstart;
  stringminstart;
  fechaminend: Date;
  fechamaxend: Date;
  stringmaxend;
  stringminend;
  fechastart: Date;
  fechaend: Date;
  fechastartstring;
  fechaendstring;
  grafico = false;
  reportetablas = false;
  reporte: any = [];
  @ViewChild('chart') chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;
  constructor(
    private pd: DatePipe,
    private toastr: ToastrService,
    private reporteService: ReportesService
  ) {
    this.chartOptions = {
      series: [
        15,
        2,
        23,
        53
      ],
      chart: {
        width: 500,
        type: 'pie'
      },
      labels: [
        'Atencion',
        'No Vino',
        'Reserva',
        'Postergacion'
      ],
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 300
            },
            legend: {
              position: 'bottom'
            }
          }
        }
      ]
    };
  }

  ngOnInit(): void {
    this.fechamaxstart = new Date(new Date().getFullYear(), new Date().getMonth() + 6, new Date().getDate());
    this.fechamaxend = new Date(new Date().getFullYear(), new Date().getMonth() + 6, new Date().getDate());
    this.stringmaxstart = this.pd.transform(this.fechamaxstart, 'yyyy-MM-dd');
    this.stringmaxend = this.pd.transform(this.fechamaxend, 'yyyy-MM-dd');
  }

  generar() {
    this.fechastartstring = this.fechastart.toString();
    this.fechaendstring = this.fechaend.toString();
    const filtro = new Date().toString();
    const date1 = this.fechastartstring;
    const date2 = this.fechaendstring;
    this.reportetablas = true;
    // this.reportegrafico = true;
    console.log(date1, date2, filtro);
    if (date1 === filtro || date2 === filtro) {
      this.toastr.error('por favor escoja fechas');
    } else {
      // aca va todo lo de abajo
    }
    // tslint:disable-next-line: deprecation
    this.reporteService.getflujobetween(date1, date2).subscribe(
      resreporte => {
        this.reporte = resreporte[0];
        console.log(this.reporte);
        this.reportetablas = true;
        const doctores = this.reporte.map( (ele) => ele.doctor);
        const ingresos = this.reporte.map( (ele) => +ele.monto);
        this.chartOptions.labels = doctores;
        this.chartOptions.series = ingresos;
      }, err => {
        this.toastr.error('Error Api Reporte Consolidado');
      }
    );
  }
  descargar() {
    const element = document.getElementById('parapdf');
    html2canvas(element).then(
      (canvas) => {
        const imgWidth = 208;
        // const pageheight = 295;
        const imgheight = canvas.height * imgWidth / canvas.width;
        const heightleft = imgheight;
        console.log(canvas);
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jspdf('p', 'mm', 'a4');
        const position = 0;
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, heightleft);
        pdf.save('reporteconsolidadocitas.pdf');
      }
    );
  }
}
