<?php
session_start();
if(!isset($_SESSION["userId"])) {
    header("Location: ../../front/php/inicioSesion.php");
}else{
    $session_value=$_SESSION["userId"];
    $nombre=$_SESSION["nombre"];
}

?>
<!DOCTYPE html>
<html lang="es">
<meta charset="UTF-8">
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1">

<?php include_once 'header.php'; ?>
<script type="text/javascript" src="../js/paginaPrincipal.js"></script>
<script type="text/javascript" src="../js/paginaObjetivos.js"></script>
<script type="text/javascript" src="../js/objetivosPagPrincipal.js"></script>

 <div id='tabsMeses' class="col-md-12">
    <ul class='nav nav-tabs'>
        <li><a data-toggle="tab" href='#tabcontent' id='tab-1' onclick='PaginaPrincipal.initIngresos(0)'>Enero</a></li>
        <li><a data-toggle="tab" href='#tabcontent' id='tab-2' onclick='PaginaPrincipal.initIngresos(1)'>Febrero</a>
        </li>
        <li><a data-toggle="tab" href='#tabcontent' id='tab-3' onclick='PaginaPrincipal.initIngresos(2)'>Marzo</a></li>
        <li><a data-toggle="tab" href='#tabcontent' id='tab-4' onclick='PaginaPrincipal.initIngresos(3)'>Abril</a></li>
        <li><a data-toggle="tab" href='#tabcontent' id='tab-5' onclick='PaginaPrincipal.initIngresos(4)'>Mayo</a></li>
        <li><a data-toggle="tab" href='#tabcontent' id='tab-6' onclick='PaginaPrincipal.initIngresos(5)'>Junio</a></li>
        <li><a data-toggle="tab" href='#tabcontent' id='tab-7' onclick='PaginaPrincipal.initIngresos(6)'>Julio</a></li>
        <li><a data-toggle="tab" href='#tabcontent' id='tab-8' onclick='PaginaPrincipal.initIngresos(7)'>Agosto</a></li>
        <li><a data-toggle="tab" href='#tabcontent' id='tab-9' onclick='PaginaPrincipal.initIngresos(8)'>Septiembre</a>
        </li>
        <li><a data-toggle="tab" href='#tabcontent' id='tab-10' onclick='PaginaPrincipal.initIngresos(9)'>Octubre</a>
        </li>
        <li><a data-toggle="tab" href='#tabcontent' id='tab-11' onclick='PaginaPrincipal.initIngresos(10)'>Noviembre</a>
        </li>
        <li><a data-toggle="tab" href='#tabcontent' id='tab-12' onclick='PaginaPrincipal.initIngresos(11)'>Diciembre</a>
        </li>
        <li><a data-toggle="tab" href='#tabcontent' id='tab-13' onclick='PaginaPrincipal.initIngresos(12)'>Todos</a>
        </li>
    </ul>
</div> 
<div id="tabcontent" >
<section id="main-content">
<!-- <div id="todosLosDivs"> -->
    <div id="divIngresosGastos" class="col-md-12"'>
            
            <div class=' col-md-3 ' id="ingresosMes"> </div>
            <div class=' col-md-3 ' id="tituloGastsoMes"></div>
            <div class=' col-md-3 ' id="ahorroMes"></div>
            <div id="BotonesAñadir" class=' col-md-3 '>
                <button id="añadirGasto" class="btn btn-default" onclick="PaginaPrincipal.LoadingModalGastos()"><span
                        class="glyphicon glyphicon-minus-sign"></span>Gastos</button>
                <button id="añadirIngreso" class="btn btn-default" onclick="PaginaPrincipal.LoadingModalIngresos()"><span
                        class="glyphicon glyphicon-plus-sign"></span>Ingreso</button>
            </div>
    </div>  
    <div id="tablaYObjetivos" class="row">
    <!-- //DATATABLE -->
        <div class=' col-md-7'>
        <div id="panelTabla" class='panel panel-default'>
            <div class="panel-heading">
                <h3 class="panel-title">Tabla de gastos e ingresos</h3>
            </div>
            <div class="panel-body">
                <table id='gastosMes' class='table table-hover'>
                    <thead>
                        <th class='wpTableHeader'>Categoría</th>
                        <th class='wpTableHeader'>Descripción</th>
                        <th class='wpTableHeader'>€</th>
                    </thead>
                    <tbody></tbody>
                </table>
            </div>
        </div>
    </div>
    <div id="divObjetivos" class='col-md-5 panel panel-default'>
        <div class="panel-heading">
            <h3 class="panel-title">Objetivos<a id="glyphiconAñadirObjetivo" class="glyphicon glyphicon-plus"
                    onclick="PaginaPrincipal.LoadingModalObjetivos()"></a>
                <a class="glyphicon glyphicon-eye-open" style='float: right;' href="paginaObjetivos.php"></a>
            </h3>
        </div>
        <!-- //OBJETIVO -->
        <div id="divDatosObjetivos" class="panel-body">
            <p id="nombreObjetivo"></p>
            <div id="ahorradoObj"></div>
        </div>
    </div>
    <div>
<button id="verGraficoAnual" class="btn btn-default" onclick="window.location.href = 'graficoComparaciones.php'">Ver Gráfico Anual</button>
    <div id='grafico' class='col-md-5'>
    
    </div>
</div>
</div>


</div>

</section><!-- / #main-content -->

<!-- Modal -->
<div id="myModal" class="modal fade" role="dialog">
    <div class="modal-dialog">

        <!-- Modal content-->
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">&times;</button>
                <h4 class="modal-title"></h4>
            </div>
            <div class="modal-body" id="contentBody">

            </div>
        </div>

    </div>
</div>
<!--     
    <footer id="main-footer">
        <p>&copy; 2019</p>
    </footer>/ #main-footer -->

</html>