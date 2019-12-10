var PaginaPrincipal = PaginaPrincipal || {};
var datosTableArray = [];
var categorias = {};
var gastoPorCategoria = {};
var mesActual;
var year;
var ingresos=0;
var meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre",""];
//CATEGORIAS
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

//INGRESOS

PaginaPrincipal.initIngresos = function (mesEnviado) {
  console.log(mesEnviado);
  var mes="";
  if (typeof mesEnviado === "undefined"){
    mes=meses[mesActual];
    console.log("hola")
    
  }else{
    mes=meses[mesEnviado];
    
  }
  console.log(mes);
   ingresos=0;
   datosTableArray = [];
   gastoPorCategoria = {};
  
  url=""
  var url = "../../php/ingresos/leerIngresos.php?id=1&mes="+ mes +"&anho="+year;
  $.ajax({
    method: "GET", url, 
    success: PaginaPrincipal.datosIngresosSucces,
    error: PaginaPrincipal.datosIngresosSucces,
    
  })
  PaginaPrincipal.initGastos(mes);
};
PaginaPrincipal.datosIngresosSucces = function (data){
  
console.log(data);
$.each(data.records, function (idx, item) {
  var categoria=item.nombreCategoria;
    var descripcion=item.descripcion;
    var cantidad=parseFloat(item.cantidad);
    var tipo ="ingreso";
  ingresos=ingresos+parseFloat(item.cantidad);
  datosTableArray.push([categoria,descripcion,cantidad,tipo]);
  });

$("#ingresosMes").html("<h3>Saldo:"+ ingresos+ "€ </h3>");

}

//GASTOS
PaginaPrincipal.initGastos = function (mes) {
  
    url=""
    var url = "../../php/gastos/leerGastos.php?id=1&mes="+ mes +"&anho="+year;
    $.ajax({
      method: "GET", url, 
      success: PaginaPrincipal.datosGastosSucces,
      error:PaginaPrincipal.datosGastosSucces,
    })
};
PaginaPrincipal.datosGastosSucces = function (data){
  if ($.fn.DataTable.isDataTable('#gastosMes')) {
    tablaGastos.destroy();
    datosTableArray = [];
}
  $.each(data.records, function (idx, item) {
    var categoria=item.nombreCategoria;
    var descripcion=item.descripcion;
    var cantidad=parseFloat(item.cantidad);
    var tipo ="gasto";

    if (typeof (gastoPorCategoria[categoria]) == "undefined") {
      gastoPorCategoria[categoria] = cantidad;
    console.log("categorias");
    }else{
      gastoPorCategoria[categoria] += cantidad;
    }
    datosTableArray.push([categoria,descripcion,cantidad,tipo]);
    //console.log(datosTableArray);
    });
    console.log(gastoPorCategoria);
    PaginaPrincipal.GastosDatatable();
    PaginaPrincipal.GastosGrafico();
}
PaginaPrincipal.GastosGrafico = function () {
    $("#grafico").highcharts({ 
      colors:['#4572A7', '#AA4643', '#89A54E', '#80699B', '#3D96AE',
      '#DB843D', '#92A8CD', '#A47D7C', '#B5CA92'],  
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
        { name: 'Casa', y:gastoPorCategoria.Casa? gastoPorCategoria.Casa : 0},
        { name: 'Transporte', y: gastoPorCategoria.Transporte? gastoPorCategoria.Transporte : 0 },
        { name: 'Salud', y: gastoPorCategoria.Salud? gastoPorCategoria.Salud : 0 },
        { name: 'Restaurantes', y:gastoPorCategoria.Restaurantes? gastoPorCategoria.Restaurantes : 0},
        { name: 'Otros', y: gastoPorCategoria.Otros? gastoPorCategoria.Otros : 0 },
        { name: 'Coche', y: gastoPorCategoria.Coche? gastoPorCategoria.Coche : 0 },
        { name: 'Supermercado', y:gastoPorCategoria.Supermercado? gastoPorCategoria.Supermercado : 0},
        { name: 'Ropa', y:gastoPorCategoria.Ropa? gastoPorCategoria.Ropa : 0},


      ]
    }]
  });
};  
PaginaPrincipal.GastosDatatable = function () {
    tablaGastos = $("#gastosMes").DataTable({
        "data": datosTableArray,
        "paging": true,
        "ordering": true,
        "iDisplayLength": 5,
        "bLengthChange": false,
        "pagingType": "simple",
        "bfilter": false,
        "info": true,
        "autoWidth": false,
        "responsive": false,
        "searching": true,
        "createdRow": function( row, data, dataIndex){
          if( data[3] == "gasto"){
              $(row).find('td:eq(2)').addClass('red');
          }else{
            $(row).find('td:eq(2)').addClass('green');
          }
        },
        "language": {
            "paginate": {
                "next": "<span class='glyphicon glyphicon-chevron-right' title='Siguiente'/>",
                "previous": "<span class='glyphicon glyphicon-chevron-left' title='Anterior'/>"
            },
            "sInfo": "_START_ - _END_ (_TOTAL_) ",
            "sInfoEmpty": "0 - _END_ (_TOTAL_) ",
            "zeroRecords": "No hay gastos todavía",
            "search": "",
            "searchPlaceholder": "Búsqueda",
        },
        "columnDefs": [
          {
              "targets": [ 3 ],
              "visible": false,
          }
        ],
        "aoColumns": [
            { "sWidth": "32%" },
            { "sWidth": "32%" },
            { "sWidth": "32%" },
            { "sWidth": "0%" },
        ],
        "footerCallback": function ( row, data, start, end, display ) {
          var api = this.api(), data;

          // Remove the formatting to get integer data for summation
          var intVal = function ( i ) {
              return typeof i === 'string' ?
                  i.replace(/[\$,]/g, '')*1 :
                  typeof i === 'number' ?
                      i : 0;
          };

          // Total over all pages
          total = api
              .column(2)
              .data()
              .reduce( function (a, b) {
                  return intVal(a) + intVal(b);
              }, 0 );

         /* // Total over this page
          pageTotal = api
              .column( 2, { page: 'current'} )
              .data()
              .reduce( function (a, b) {
                  return intVal(a) + intVal(b);
              }, 0 );

          // Update footer
          $( api.column(2).footer() ).html(
              pageTotal +'€ ('+ total +' € total)'
          );*/
      }

    });
    $("#tituloGastsoMes").html("<h3>Gastos:"+total+"€</h3>");
};

//MODALES

PaginaPrincipal.LoadingModalGastos = function () {
  //alert("loadig");
  var html="";
  console.log(categorias["ingreso"]);
  var mes=meses[mesActual]
  $.each(categorias["gasto"], function (idx, item) {
    html += '<option value="' + item.id + '">' + item.nombreCategoria + '</option>';
});
console.log(html);
  $.ajax({url: "../html/formularioAnhadirGastos.html", success: function(result){
        $("#contentBody").html(result);
        $(".modal-title").html("Añade tu nuevo gasto");
        $("#idCategoria").append(html);
        $("#mes").val(mes).hide();
        $("#user").val(1).hide();
      $("#myModal").modal('show'); 

  }});
}  
PaginaPrincipal.LoadingModalIngresos = function () {
  //alert("loadig");
  var html="";
  console.log(categorias["ingreso"]);
  var mes=meses[mesActual]
  $.each(categorias["ingreso"], function (idx, item) {
    html += '<option value="' + item.id + '">' + item.nombreCategoria + '</option>';
});
console.log(html);
  $.ajax({url: "../html/formularioAnhadirIngresos.html", success: function(result){
        $("#contentBody").html(result);
        $(".modal-title").html("Añade tu nuevo ingreso");
        $("#idCategoria").append(html);
        $("#mes").val(mes).hide();
        $("#user").val(1).hide();
      $("#myModal").modal('show'); 

  }});
} 

PaginaPrincipal.LoadingModalObjetivos = function () {
  //alert("loadig");
  var mes=meses[mesActual]
  $.ajax({url: "../html/formularioAnhadirObjetivos.html", success: function(result){
        $("#contentBody").html(result);
        $(".modal-title").html("Añade tu objetivo");
        $("#mes").val(mes).hide();
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
//$("#tabsMeses").tabs({ active: mesActual});
$("#tabsMeses li").eq(mesActual).addClass('active');

console.log("js");
     
    PaginaPrincipal.initIngresos();
});
