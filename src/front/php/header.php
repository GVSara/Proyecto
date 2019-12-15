<link rel="stylesheet" type="text/css" href="../css/EstilosInicio.css">
<script type="text/javascript"
    src="../resources/librerias/DataTables/jQuery-3.3.1/jquery-3.3.1.min.js"></script>
<script type="text/javascript"
    src="../resources/librerias/DataTables/Bootstrap-3.3.7/js/bootstrap.min.js"></script>
<script type="text/javascript" src="../../resources/librerias/jquery-ui-1.12.1/jquery-ui.min.js"></script>
<script type="text/javascript"
    src="../resources/librerias/DataTables/DataTables-1.10.20/js/jquery.dataTables.min.js"></script>
<script src="../resources/librerias/Highcharts-7.2.1/code/highcharts.js"></script>
<script src="../resources/librerias/Highcharts-7.2.1/code/modules/no-data-to-display.js"></script>
<script src="../resources/librerias/Highcharts-7.2.1/code/modules/exporting.js"></script>
<script src="../resources/librerias/Highcharts-7.2.1/code/modules/export-data.js"></script>


<link rel="stylesheet" type="text/css" href="../resources/librerias/jquery-ui-1.12.1/jquery-ui.min.css">
<link rel="stylesheet" type="text/css"
    href="../resources/librerias/DataTables/Bootstrap-3.3.7/css/bootstrap.min.css">
<link rel="stylesheet" type="text/css"
    href="../resources/librerias/DataTables/DataTables-1.10.20/css/jquery.dataTables.min.css">
    <script type="text/javascript">
    var userId='<?php echo $session_value;?>';
    </script>

<header id="main-header">

    <a id="logo-header" href="paginaPrincipal.php">
        <span class="site-name">Kostuak</span>
        <span class="site-desc">Visualiza tus gastos</span>
    </a> <!-- / #logo-header -->

    <nav>
        <ul>
            <li><?php echo $nombre;?></li>
            <li><a href="../php/LogOut.php">Cerrar Sesión</a></li>
        </ul>
    </nav><!-- / nav -->

</header><!-- / #main-header -->
