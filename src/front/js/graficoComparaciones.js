var GraficoAnual = GraficoAnual || {};
var seriesGrafico = [];
var seriesGraficoMostrar=[];
var year;
var meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
var mesesPorNumero = {"Enero":0, "Febrero":1, "Marzo":2, "Abril":3, "Mayo":4, "Junio":5, "Julio":6, "Agosto":7, "Septiembre":8, "Octubre":9, "Noviembre":10, "Diciembre":11,"Todos":12};
var coloresGrafico=["#7cb5ec", "#434348", "#90ed7d", "#f7a35c", "#8085e9", "#f15c80", "#e4d354", "#2b908f", "#f45b5b", "#91e8e1"]
GraficoAnual.initCategorias = function () {
  var url = "../../api/categorias/leerCategorias.php"
  $.ajax({
    method: "GET", url, 
    success: GraficoAnual.datosSuccesCategorias
  })
};
GraficoAnual.datosSuccesCategorias = function (data){
  console.log(data);
  var html='<option value="10">Todas</option>';
  var i=0;
  $.each(data.records, function (idx, item) {
    
    var nombreCategoria=item.nombreCategoria;
    var tipo= item.tipo;
    
     
    if(tipo !="ingreso"){
      //Crear array para el gráfico y el select 
      seriesGrafico.push ({name: nombreCategoria ,data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], dataLabels: { format: '{y:,.0f}' },color:coloresGrafico[i]  });
      html += '<option value="' + i + '">' + nombreCategoria + '</option>';
      i += 1;
    }
    $("#selectCategoria").html(html);
    console.log(seriesGrafico);
   
    });
    
    GraficoAnual.initGastos () 
}  
GraficoAnual.initGastos = function () {
  var url = "../../api/gastos/leerGastosAnho.php?id="+ userId +"&anho="+year;
  $.ajax({
    method: "GET", url, 
    success: GraficoAnual.datosGastosSucces
  })
}
GraficoAnual.datosGastosSucces = function (data){

  
  $.each(data.records, function (idx, item) {
    var categoria=item.nombreCategoria;
    var cantidad=parseFloat(item.cantidad);

    //Guardar en la categoría correspondiente 
    var i=seriesGrafico.findIndex(i => i.name === categoria);
    seriesGrafico[i].data[mesesPorNumero[item.mes]]+= cantidad;
  
    console.log(seriesGrafico);
    });
    
    seriesGraficoMostrar=seriesGrafico;
    GraficoAnual.PintarGráfigo();
}

GraficoAnual.PintarGráfigo = function (){
  $('#divGraficoGastos').highcharts({
    chart: {
        type: 'column'
    },
    title: {
        text: 'Gastos en el año ' + year
    },
    xAxis: {
        categories: meses
    },
    yAxis: {
        min: 0,
        title: {
            text: '€ Totales en gastos'
        }
    },
    tooltip: {
        headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
        pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
            '<td style="padding:0"><b>{point.y:.1f} €</b></td></tr>',
        footerFormat: '</table>',
        shared: true,
        useHTML: true
    },
    plotOptions: {
        column: {
            pointPadding: 0.1,
            borderWidth: 0,
        }
    },
    series: seriesGraficoMostrar
});
}
//CAMBIO CATEGORIA-ACTUALIZA GRÁFICO
GraficoAnual.cambioCategoria = function (){
  var seleccionada=$("#selectCategoria").val();
  seriesGraficoMostrar=[];
  if(seleccionada !=10){
    seriesGraficoMostrar.push(seriesGrafico[seleccionada]);
  }else{
    seriesGraficoMostrar=seriesGrafico;
  }
  GraficoAnual.PintarGráfigo();
  console.log(seleccionada);
}  
$(document).ready(function () {
 var  hoy=new Date();
  year = hoy.getFullYear();
  GraficoAnual.initCategorias();

});
