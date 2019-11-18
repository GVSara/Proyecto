var PaginaPrincipal = PaginaPrincipal || {};
var gastosArray = [];
var mesActual;
var year;
var meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
PaginaPrincipal.init = function () {
  /*  var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
       console.log(JSON.parse(this.responseText));
      }
    };
    xhttp.open("GET", "Back/gastos/leerGastos.php?id=1&mes=Noviembre&anho=2019", true);
    xhttp.send();*/
    var mes=meses[mesActual]
    var url = "../Back/gastos/leerGastos.php?id=1&mes="+ mes +"&anho="+year;
    $.ajax({
      method: "GET", url, 
      success: PaginaPrincipal.datosSucces
    })
};
PaginaPrincipal.datosSucces = function (data){
  console.log(data);
  console.log(data.records[0].descripcion);
  $.each(data.records, function (idx, item) {
    var categoria="-";
    var descripcion=item.descripcion;
    var cantidad=item.cantidad;
    console.log(item);
    gastosArray.push([categoria,descripcion,cantidad]);
    console.log(gastosArray);
    });
    PaginaPrincipal.GastosDatatable();
}
PaginaPrincipal.GastosGrafico = function () {
    $("#grafico").chart('container', {
    chart: {
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false,
      type: 'pie'
    },
    title: {
      text: 'Gráfico mensual'
    },
    tooltip: {
      pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: 'pointer',
        dataLabels: {
          enabled: true,
          format: '<b>{point.name}</b><br>{point.percentage:.1f} %',
          distance: -50,
          filter: {
            property: 'percentage',
            operator: '>',
            value: 4
          }
        }
      }
    },
    series: [{
      name: 'Share',
      data: [
      ]
    }]
  });
};  
PaginaPrincipal.GastosDatatable = function () {
    tablaGastos = $("#gastosMes").DataTable({
        "data": gastosArray,
        "paging": false,
        "ordering": false,
        "iDisplayLength": 20,
        "bLengthChange": false,
        "pagingType": "simple",
        "bfilter": false,
        "info": false,
        "autoWidth": false,
        "responsive": false,
        "searching": false,
        "language": {
            "paginate": {
                "next": "<span class='glyphicon glyphicon-chevron-right' title='Siguiente'/>",
                "previous": "<span class='glyphicon glyphicon-chevron-left' title='Anterior'/>"
            },
            "sInfo": "_START_ - _END_ (_TOTAL_) ",
            "sInfoEmpty": "0 - _END_ (_TOTAL_) ",
            "zeroRecords": "No hay movimientos todavía",
            "search": "búsqueda",
        },
        "aoColumns": [
            { "sWidth": "33%" },
            { "sWidth": "33%" },
            { "sWidth": "33%" },
        ],

    });
};    
$(document).ready(function () {
   
hoy=new Date();
mesActual=hoy.getMonth();
year = hoy.getFullYear();
console.log(mesActual);
$("#tabsMeses").tabs({ active: mesActual});

console.log("js");
    PaginaPrincipal.init(); 
});
