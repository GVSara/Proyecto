var PaginaPrincipal = PaginaPrincipal || {};
var objetivosArray = [];
//TRaer OBJETIVOS
PaginaPrincipal.initObjetivos = function () {

    var url = "../../php/objetivos/leerObjetivos.php?id=1";
    $.ajax({
      method: "GET", url, 
      success: PaginaPrincipal.datosObjetivosSucces
    })
  };
  PaginaPrincipal.datosObjetivosSucces = function (data){
  console.log(data);
  $.each(data.records, function (idx, item) {
      var objetivo=item.objetivo;
      var porcentaje=item.porcentaje;
      var cantidad=item.cantidad;
      var ahorrado=item.ahorrado;
      var estado=item.estado;
      var mes=item.mes;
      var anho=item.anho;



      objetivosArray.push([objetivo,porcentaje,cantidad,ahorrado,estado,mes,anho]);
    });
    console.log(objetivosArray);
    PaginaPrincipal.ObjetivosDatatable();
  }
  PaginaPrincipal.ObjetivosDatatable = function () {
    tablaObjetivos = $("#tablaObjetivos").DataTable({
        "data": objetivosArray,
        "paging": true,
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
            { "sWidth": "14%" },
            { "sWidth": "14%" },
            { "sWidth": "14%" },
            { "sWidth": "14%" },
            { "sWidth": "14%" },
            { "sWidth": "14%" },
            { "sWidth": "14%" },
        ],
        

    });

};
$(document).ready(function () {
    PaginaPrincipal.initObjetivos();  

  });