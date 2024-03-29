var ObjetivosPaginaPrincipal = ObjetivosPaginaPrincipal || {};
var ingresosParaObjetivos = {};
var gastosParaObjetivos = {};
var mesActual;
var yearObjetivo;
var porcentaje;
var mes;
var ahorrado;
var cantidad;
var estado;
var idObjetivo;
var cantidadObj;
var meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre","Todos"];
var mesesNumero = {"Enero":0, "Febrero":1, "Marzo":2, "Abril":3, "Mayo":4, "Junio":5, "Julio":6, "Agosto":7, "Septiembre":8, "Octubre":9, "Noviembre":10, "Diciembre":11,"Todos":12};
//TRaer OBJETIVOS
ObjetivosPaginaPrincipal.initObjetivos = function () {

    var url = "../../api/objetivos/leerObjetivosPagPrincipal.php?id="+userId+"&estado=Pendiente";
    $.ajax({
      method: "GET", url, 
      success: ObjetivosPaginaPrincipal.datosObjetivosSucces,
      error: function(result) {
        $("#divDatosObjetivos").html("No se han encontrado Objetivos");
    }
    })
  };
  ObjetivosPaginaPrincipal.datosObjetivosSucces = function (data){

  $.each(data.records, function (idx, item) {
    idObjetivo=item.idobjetivos;

    var objetivo=item.objetivo;
      porcentaje=item.porcentaje;
      cantidad=item.cantidad;
      ahorrado=item.ahorrado;
      estado=item.estado;
      mesObjetivo=item.mes;
      yearObjetivo=item.anho;
      $("#nombreObjetivo").html(objetivo +"("+cantidad+")€");
    });
    ObjetivosPaginaPrincipal.initIngresos();  
    
  }
ObjetivosPaginaPrincipal.initIngresos = function () {

  var url = "../../api/ingresos/leerIngresosParaObjetivos.php?id="+userId+"&anho="+yearObjetivo;
  $.ajax({
    method: "GET", url, 
    success: ObjetivosPaginaPrincipal.datosIngresosSucces
  })
};
ObjetivosPaginaPrincipal.datosIngresosSucces = function (data){

$.each(data.records, function (idx, item) {
  if (typeof (ingresosParaObjetivos[item.anho]) == "undefined") {
    ingresosParaObjetivos[item.anho]={};
    ingresosParaObjetivos[item.anho][item.mes]=[];
    ingresosParaObjetivos[item.anho][item.mes]= item.cantidad;

  }else{
    if (typeof (ingresosParaObjetivos[item.anho][item.mes]) == "undefined") {
      ingresosParaObjetivos[item.anho][item.mes]=[];
      ingresosParaObjetivos[item.anho][item.mes]= parseFloat(item.cantidad);
    }else{
     var cantidad = parseFloat(ingresosParaObjetivos[item.anho][item.mes]) +parseFloat(item.cantidad);
      ingresosParaObjetivos[item.anho][item.mes]=cantidad;
    }
  }

  });
  ObjetivosPaginaPrincipal.initGastos();
}
ObjetivosPaginaPrincipal.initGastos = function () {

  var url = "../../api/gastos/leerGastosParaObjetivos.php?id="+userId+"&anho="+yearObjetivo;
  $.ajax({
    method: "GET", url, 
    success: ObjetivosPaginaPrincipal.datosGastosSucces,
    error: function(result) {
      $("#divDatosObjetivos").html("No se han encontrado Objetivos");
  }
  })
};
ObjetivosPaginaPrincipal.datosGastosSucces = function (data){

$.each(data.records, function (idx, item) {
  $("#glyphiconAñadirObjetivo").hide();
  if (typeof (gastosParaObjetivos[item.anho]) == "undefined") {
    gastosParaObjetivos[item.anho]={};
    gastosParaObjetivos[item.anho][item.mes]=[];
    gastosParaObjetivos[item.anho][item.mes]=parseFloat(item.cantidad);

  }else{
    if (typeof (gastosParaObjetivos[item.anho][item.mes]) == "undefined") {
      gastosParaObjetivos[item.anho][item.mes]=[];
      gastosParaObjetivos[item.anho][item.mes]= parseFloat(item.cantidad);
    }else{
     var cantidad = parseFloat(gastosParaObjetivos[item.anho][item.mes]) +parseFloat(item.cantidad);
     gastosParaObjetivos[item.anho][item.mes]=cantidad;
    }
  }

  });
  ObjetivosPaginaPrincipal.calculoObjetivo();
}
ObjetivosPaginaPrincipal.calculoObjetivo = function (){
  var ingresosTotal=0;
  var gastosTotal=0;
 var mesNumeroObj=mesesNumero[mesObjetivo];

  if(yearObjetivo == year){

    
    for(mesNumeroObj;mesNumeroObj<=mesActual;mesNumeroObj++){
      ingresosTotal +=parseFloat(ingresosParaObjetivos[yearObjetivo][meses[mesNumeroObj]])
      gastosTotal +=parseFloat(gastosParaObjetivos[yearObjetivo][meses[mesNumeroObj]])
    }

  }else{
    var mesFor=11;
    for(yearObjetivo;yearObjetivo<=year;yearObjetivo++){
      for(mesNumeroObj;mesNumeroObj<=mesFor;mesNumeroObj++){
        ingresosTotal +=parseFloat(ingresosParaObjetivos[yearObjetivo][meses[mesNumeroObj]])
      }
      mesNumeroObj=0;
      if(yearObjetivo+1 == year){
        mesNumeroObj=0;
      }
    }
  }
  var totalObtenidoObjeto=((ingresosTotal-gastosTotal)*parseInt(porcentaje))/100;
  if (totalObtenidoObjeto<0){
    totalObtenidoObjeto=0;
  }
  if (totalObtenidoObjeto >=  cantidad){
    $("#ahorradoObj").html("<h4 style='text-align:center'>"+parseFloat(totalObtenidoObjeto).toFixed(2)+"€</h4><p style='text-align:center'>Felicidades, has cumplido tu objetivo</p>");
    $("#glyphiconAñadirObjetivo").show();
  }else{
    $("#ahorradoObj").html("<h4 style='text-align:center'>"+parseFloat(totalObtenidoObjeto).toFixed(2)+"€</h4>");
  }

  if(ahorrado!=totalObtenidoObjeto){
    if (totalObtenidoObjeto >= cantidad){
     var data={
      'idObjetivo' : idObjetivo,
      'estado' : "Completado",
      'totalObjetivo':totalObtenidoObjeto
    };
    }else{
      var data={
        'idObjetivo' : idObjetivo,
        'estado' : "Pendiente",
        'totalObjetivo':totalObtenidoObjeto
      };
    }
    ObjetivosPaginaPrincipal.updateObjetivos(data)
  };
}
 ObjetivosPaginaPrincipal.updateObjetivos = function (data) {
  
   var url = "../../api/objetivos/actualizarObjetivos.php";
   $.ajax({
    method: "POST", url, 
    data: data,
    success: console.log("objetivo Actualizado")
  })
 };
$(document).ready(function () {
  ObjetivosPaginaPrincipal.initObjetivos();

  
});