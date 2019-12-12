var PaginaPrincipal = PaginaPrincipal || {};
var gastosArray = [];
var categorias = {};
var gastoPorCategoria = {};
var mesActual;
var year;
var ingresos=0;
var meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
PaginaPrincipal.initCategorias = function () {
  var url = "../../php/categorias/leerCategorias.php"
  $.ajax({
    method: "GET", url, 
    success: PaginaPrincipal.datosSuccesCategorias
  })
};
PaginaPrincipal.datosSuccesCategorias = function (data){
  console.log(data);
  $.each(data.records, function (idx, item) {
    var idcategoria=item.idcategorias;
    var nombreCategoria=item.nombreCategoria;
    var tipo= item.tipo;
    if (typeof (categorias[tipo]) == "undefined") {
      categorias[tipo]=[];
    categorias[tipo].push({ "id" : idcategoria,"nombreCategoria" : nombreCategoria});
    console.log(categorias);
    }else{
      categorias[tipo].push({ "id" : idcategoria,"nombreCategoria" : nombreCategoria});
    }
    //console.log(categoriasArray);
    });
}  
PaginaPrincipal.initIngresos = function () {
   gastosArray = [];
   gastoPorCategoria = {};
  var mes=meses[mesActual]
  url=""
  var url = "../../api/gastos/leerIngresos.php?id=1&mes="+ mes +"&anho="+year;
  $.ajax({
    method: "GET", url, 
    success: PaginaPrincipal.datosIngresosSucces
  })
};
PaginaPrincipal.datosIngresosSucces = function (data){
console.log(data);
$.each(data.records, function (idx, item) {
  ingresos=ingresos+item.cantidad;
  console.log(ingresos);
  });

}
PaginaPrincipal.initGastos = function () {
    var mes=meses[mesActual]
    url=""
    var url = "../../api/gastos/leerGastos.php?id=1&mes="+ mes +"&anho="+year;
    $.ajax({
      method: "GET", url, 
      success: PaginaPrincipal.datosGastosSucces
    })
};
PaginaPrincipal.datosGastosSucces = function (data){

  $.each(data.records, function (idx, item) {
    var categoria=item.nombreCategoria;
    var descripcion=item.descripcion;
    var cantidad=parseFloat(item.cantidad);


    if (typeof (gastoPorCategoria[categoria]) == "undefined") {
      gastoPorCategoria[categoria] = cantidad;
    console.log("categorias");
    }else{
      gastoPorCategoria[categoria] += cantidad;
    }
    gastosArray.push([categoria,descripcion,cantidad]);
    //console.log(gastosArray);
    });
    console.log(gastoPorCategoria);
    PaginaPrincipal.GastosDatatable();
    PaginaPrincipal.GastosGrafico();
}
PaginaPrincipal.GastosGrafico = function () {
    $("#grafico").highcharts({ 
      colors: ["#7cb5ec", "#f7a35c"],  
    chart: {
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false,
      type: 'pie'
    },
    title: {
      text: 'Gráfico gastos mensuales'
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
        { name: 'Ocio', y: gastoPorCategoria.Ocio? gastoPorCategoria.Ocio : 0 },
        { name: 'Facturas', y: gastoPorCategoria.Facturas? gastoPorCategoria.Facturas : 0 },
        { name: 'Casa', y:gastoPorCategoria.Casa? gastoPorCategoria.Casa : 0}
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
            { "sWidth": "32%" },
            { "sWidth": "32%" },
            { "sWidth": "32%" },
        ],

    });
};
PaginaPrincipal.loadigLoadingModal = function (tipo) {
  //alert("loadig");
  var html="";
  console.log(categorias[tipo]);

  $.each(categorias[tipo], function (idx, item) {
    html += '<option value="' + item.id + '">' + item.nombreCategoria + '</option>';
});
console.log(html);
  $.ajax({url: "../php/formularioAnhadirGastosIngresos.php", success: function(result){
        $("#contentBody").html(result);
        $("#selectCategoria").append(html);
        $("#mes").val(mesActual).hide();
        $("#user").val(1).hide();
      $("#myModal").modal('show'); 

  }});
}    
$(document).ready(function () {
  PaginaPrincipal.initCategorias();  
hoy=new Date();
mesActual=hoy.getMonth();
year = hoy.getFullYear();
console.log(mesActual);
$("#tabsMeses").tabs({ active: mesActual});


console.log("js");
    PaginaPrincipal.initGastos(); 
   // PaginaPrincipal.initIngresos();
});
