var PaginaObjetivos = PaginaObjetivos || {};
var objetivosArray = [];
//TRaer OBJETIVOS
PaginaObjetivos.initObjetivos = function () {

    var url = "../../api/objetivos/leerObjetivos.php?id="+ userId +"";
    $.ajax({
      method: "GET", url, 
      success: PaginaObjetivos.datosObjetivosSucces,
      error:PaginaObjetivos.ObjetivosDatatable,
      
      
    })
  };
  PaginaObjetivos.datosObjetivosSucces = function (data){
  console.log(data);
  $.each(data.records, function (idx, item) {
      var objetivo=item.objetivo;
      var porcentaje="<span>"+item.porcentaje+"%</span>";;
      var cantidad="<span>"+item.cantidad+"€</span>";
      var ahorrado="<span>"+item.ahorrado+" €</span>";;
      var estado=item.estado;
      var mes=item.mes;
      var anho=item.anho;



      objetivosArray.push([objetivo,porcentaje,cantidad,ahorrado,estado,mes,anho]);
    });
    console.log(objetivosArray);
    PaginaObjetivos.ObjetivosDatatable();
  }
  PaginaObjetivos.ObjetivosDatatable = function () {
    tablaObjetivos = $("#tablaObjetivos").DataTable({
        "data": objetivosArray,
        "paging": true,
        "ordering": true,
        "iDisplayLength": 20,
        "bLengthChange": false,
        "pagingType": "simple",
        "bfilter": false,
        "info": true,
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
            "zeroRecords": "No hay objetivos todavía",
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
    PaginaObjetivos.initObjetivos();  

  });