var PaginaPrincipal = PaginaPrincipal || {};
var datosTableArray = [];
var categorias = {};
var gastoPorCategoria = {};
var mesActual;
var year;
var ingresos=0;
var meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre","Todos"];
//CATEGORIAS
PaginaPrincipal.initCategorias = function () {
  var url = "../../api/categorias/leerCategorias.php"
  $.ajax({
    method: "GET", url, 
    success: PaginaPrincipal.datosSuccesCategorias
  })
};
PaginaPrincipal.datosSuccesCategorias = function (data){

  $.each(data.records, function (idx, item) {
    var idcategoria=item.idcategorias;
    var nombreCategoria=item.nombreCategoria;
    var tipo= item.tipo;
    if (typeof (categorias[tipo]) == "undefined") {
      categorias[tipo]=[];
    categorias[tipo].push({ "id" : idcategoria,"nombreCategoria" : nombreCategoria});

    }else{
      categorias[tipo].push({ "id" : idcategoria,"nombreCategoria" : nombreCategoria});
    }

    });
}

//INGRESOS

PaginaPrincipal.initIngresos = function (mesEnviado) {

  var mes="";
  hoy=new Date();
  var todos=false;
  if (typeof mesEnviado === "undefined"){
    mes=meses[mesActual]; 
  }else{
    mes=meses[mesEnviado];
    $("#divObjetivos").hide();
  }
  if(mes == meses[hoy.getMonth()] ){
    $("#divObjetivos").show();
  }else{
    $("#divObjetivos").hide();
  }

   ingresos=0;
   datosTableArray = [];
   gastoPorCategoria = {};
  
   var url=""
   if(mes=="Todos"){
    url = "../../api/ingresos/leerIngresosAnho.php?id="+ userId +"&anho="+year;
   }else{
    url = "../../api/ingresos/leerIngresos.php?id="+ userId +"&mes="+ mes +"&anho="+year;
  }
  $.ajax({
    method: "GET", url, 
    success: PaginaPrincipal.datosIngresosSucces,
    error: PaginaPrincipal.datosIngresosSucces,
    
  })
  
};
PaginaPrincipal.datosIngresosSucces = function (data){
    datosTableArray = [];
    ingresos=0;
    mes=$("#tabsMeses li.active a").html();

$.each(data.records, function (idx, item) {
  var categoria=item.nombreCategoria;
    var descripcion=item.descripcion;
    var cantidad=parseFloat(item.cantidad);
    var tipo ="ingreso";
  ingresos +=cantidad;
  datosTableArray.push([categoria,descripcion,cantidad,tipo]);
  });

$("#ingresosMes").html("<h3>Saldo:"+ ingresos+ "€ </h3>");
PaginaPrincipal.initGastos(mes);
}

//GASTOS
PaginaPrincipal.initGastos = function (mes) {

   var url=""
   if (mes ==="Todos"){
      url = "../../api/gastos/leerGastosAnho.php?id="+ userId +"&anho="+year;
     }else{
     url = "../../api/gastos/leerGastos.php?id="+ userId +"&mes="+ mes +"&anho="+year;
     }
    $.ajax({
      method: "GET", url, 
      success: PaginaPrincipal.datosGastosSucces,
      error:PaginaPrincipal.datosGastosSucces,
    })
};
PaginaPrincipal.datosGastosSucces = function (data){
 
  if ($.fn.DataTable.isDataTable('#gastosMes')) {
    tablaGastos.destroy();
  }
  var totalGasto=0;
  $.each(data.records, function (idx, item) {
    var categoria=item.nombreCategoria;
    var descripcion=item.descripcion;
    var cantidad=parseFloat(item.cantidad);
    var tipo ="gasto";
    
    totalGasto += cantidad;
    if (typeof (gastoPorCategoria[categoria]) == "undefined") {
      gastoPorCategoria[categoria] = cantidad;

    }else{
      gastoPorCategoria[categoria] += cantidad;
    }
    datosTableArray.push([categoria,descripcion,cantidad,tipo]);

    });
    $("#tituloGastsoMes").html("<h3>Gastos:"+ parseFloat(totalGasto).toFixed(2) +"€</h3>");
    $("#ahorroMes").html("<h3>Ahorro:" +(ingresos - totalGasto).toFixed(2) +"€</h3>");

    PaginaPrincipal.GastosDatatable();
    PaginaPrincipal.GastosGrafico();
}

//GRAFICO

PaginaPrincipal.GastosGrafico = function () {
  
  if(!jQuery.isEmptyObject(gastoPorCategoria)){
    var datosSerie= [
      { name: 'Ocio', y: gastoPorCategoria.Ocio? gastoPorCategoria.Ocio : 0 },
      { name: 'Factura', y: gastoPorCategoria.Factura? gastoPorCategoria.Factura : 0 },
      { name: 'Casa', y:gastoPorCategoria.Casa? gastoPorCategoria.Casa : 0},
      { name: 'Transporte', y: gastoPorCategoria.Transporte? gastoPorCategoria.Transporte : 0 },
      { name: 'Salud', y: gastoPorCategoria.Salud? gastoPorCategoria.Salud : 0 },
      { name: 'Restaurante', y:gastoPorCategoria.Restaurante? gastoPorCategoria.Restaurante : 0},
      { name: 'Otros', y: gastoPorCategoria.Otros? gastoPorCategoria.Otros : 0 },
      { name: 'Coche', y: gastoPorCategoria.Coche? gastoPorCategoria.Coche : 0 },
      { name: 'Supermercado', y:gastoPorCategoria.Supermercado? gastoPorCategoria.Supermercado : 0},
      { name: 'Ropa', y:gastoPorCategoria.Ropa? gastoPorCategoria.Ropa : 0},


    ];
  }else{
    var datosGrafico=[];
  }
    $("#grafico").highcharts({ 
      colors:['#4572A7', '#AA4643', '#89A54E', '#80699B', '#3D96AE',
      '#DB843D', '#92A8CD', '#A47D7C', '#B5CA92','#d5db97'],  
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
    lang: {
      noData: 'No hay gastos para mostrar'
     },
    series: [{
      name: 'Share',
      data: datosSerie
    }]
  });
};  
//TABLA

PaginaPrincipal.GastosDatatable = function () {
  if (!$.fn.DataTable.isDataTable('#gestionGastosContent'))
    tablaGastos = $("#gastosMes").DataTable({
        "data": datosTableArray,
        "paging": true,
        "ordering": true,
        "iDisplayLength": 11,
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
        
    });
   else
   tablaGastos.draw();
};

//MODALES

PaginaPrincipal.LoadingModalGastos = function () {
  //alert("loadig");
  var html="";
 
  var mes=$("#tabsMeses li.active a").html();
  $.each(categorias["gasto"], function (idx, item) {
    html += '<option value="' + item.id + '">' + item.nombreCategoria + '</option>';
});

  $.ajax({url: "../php/formularioAnhadirGastos.php", success: function(result){
        $("#contentBody").html(result);
        $(".modal-title").html("Añade tu nuevo gasto");
        $("#idCategoria").append(html);
        $("#mes").val(mes).hide();
        $("#user").val(userId).hide();
      $("#myModal").modal('show'); 

  }});
 
  PaginaPrincipal.initIngresos(mesesNumero[mes]);
}  
PaginaPrincipal.LoadingModalIngresos = function () {
  //alert("loadig");
  var html="";

  var mes=$("#tabsMeses li.active a").html();
  $.each(categorias["ingreso"], function (idx, item) {
    html += '<option value="' + item.id + '">' + item.nombreCategoria + '</option>';
});

  $.ajax({url: "../php/formularioAnhadirIngresos.php", success: function(result){
        $("#contentBody").html(result);
        $(".modal-title").html("Añade tu nuevo ingreso");
        $("#idCategoria").append(html);
        $("#mes").val(mes).hide();
        $("#user").val(userId).hide();
      $("#myModal").modal('show'); 

  }});

  PaginaPrincipal.initIngresos(mesesNumero[mes]);
} 

PaginaPrincipal.LoadingModalObjetivos = function () {
  //alert("loadig");
  var mes=$("#tabsMeses li.active a").html();
  $.ajax({url: "../php/formularioAnhadirObjetivos.php", success: function(result){
        $("#contentBody").html(result);
        $(".modal-title").html("Añade tu objetivo");
        $("#mes").val(mes).hide();
        $("#user").val(userId).hide();
      $("#myModal").modal('show'); 

  }});

  PaginaPrincipal.initIngresos(mesesNumero[mes]);
}  

$(document).ready(function () {
  PaginaPrincipal.initCategorias();  
hoy=new Date();
mesActual=hoy.getMonth();
year = hoy.getFullYear();


var searchParams = new URLSearchParams(window.location.search)
if(searchParams.has('mes')){
param = searchParams.get('mes')
 mesActual=mesesNumero[param];
}    
$("#tabsMeses li").eq(mesActual).addClass('active');


     
    PaginaPrincipal.initIngresos();
});
