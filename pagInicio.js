var PaginaPrincipal = PaginaPrincipal || {};
PaginaPrincipal.init = function () {
    //Consulta DATOS
};
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
        "data": [],
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
    html = "<div id='tabsMeses' >";
        html += "<ul class='nav nav-tabs'>";
            html += "<li><a href='#tabcontent' id='tab-1' onclick='PaginaPrincipal.init()'>Enero</a></li>";
            html += "<li><a href='#tabcontent' id='tab-2' onclick='PaginaPrincipal.init()'>Febrero</a></li>";
            html += "<li><a href='#tabcontent' id='tab-3' onclick='PaginaPrincipal.init()'>Marzo</a></li>";
            html += "<li><a href='#tabcontent' id='tab-4' onclick='PaginaPrincipal.init()'>Abril</a></li>";
            html += "<li><a href='#tabcontent' id='tab-5' onclick='PaginaPrincipal.init()'>Mayo</a></li>";
            html += "<li><a href='#tabcontent' id='tab-6' onclick='PaginaPrincipal.init()'>Junio</a></li>";
            html += "<li><a href='#tabcontent' id='tab-7' onclick='PaginaPrincipal.init()'>Julio</a></li>";
            html += "<li><a href='#tabcontent' id='tab-8' onclick='PaginaPrincipal.init()'>Agosto</a></li>";
            html += "<li><a href='#tabcontent' id='tab-9' onclick='PaginaPrincipal.init()'>Septiembre</a></li>";
            html += "<li><a href='#tabcontent' id='tab-10' onclick='PaginaPrincipal.init()'>Octubre</a></li>";
            html += "<li><a href='#tabcontent' id='tab-11' onclick='PaginaPrincipal.init()'>Noviembre</a></li>";
            html += "<li><a href='#tabcontent' id='tab-12' onclick='PaginaPrincipal.init()'>Diciembre</a></li>";
            html += "<li><a href='#tabcontent' id='tab-13' onclick='PaginaPrincipal.init()'>Todos</a></li>";
            html += "</ul>";
    html += "</div>";
    html += "<div class='container'>";
     html += "<div class='row'>"
      html += "<div class='col-md-6'>"
      //DATATABLE
      html += "<table id='gastosMes' width='100%' class='table table-hover'>\
        <thead>\
          <th class='wpTableHeader'>Categoría</th>\
          <th class='wpTableHeader'>Descripción</th>\
          <th class='wpTableHeader'>€</th>\
      </thead>\
      <tbody></tbody>\
        </table>";
      html += "</div>"
      html += "<div class='col-md-6'>"
      html += "<div>"
      html +="<h2 >Objetivos</h2>"
      html +="<button onclick='' style='float: right;'>Añadir objetivo</button>"
      html += "</div>"
      //OBJETIVO
      html += "</div>"
    html += "</div>"
    html += "<div class='row'>"
      html += "<div id='grafico'class='col-md-6'>"
      //GRAFICO
      html += "</div>"
      html += "<div class='col-md-6'>"
      //DATOS
      html += "</div>"
    html += "</div>"

html += "</div>";
hoy=new Date();
mes=hoy.getMonth();
//$("#tabsMeses").tabs();
    $("#Inicio").append(html);  
    PaginaPrincipal.GastosDatatable(); 
   
});
