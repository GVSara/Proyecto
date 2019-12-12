<?php
session_start();
if(isset($_SESSION["userId"])) {
    $session_value=$_SESSION["userId"];
    $nombre=$_SESSION["nombre"];
    header("Location: ../../front/php/paginaPrincipal.php");
}
?>
<!DOCTYPE html>
<html lang="es">

<head>
    <link rel="stylesheet" type="text/css" href="../css/EstilosInicio.css">
    <link rel="stylesheet" type="text/css" href="../css/estilosIndex.css">
    <script type="text/javascript"
        src="../resources/librerias/DataTables/jQuery-3.3.1/jquery-3.3.1.min.js"></script>
    <script type="text/javascript"
        src="../resources/librerias/DataTables/Bootstrap-3.3.7/js/bootstrap.min.js"></script>
    <script type="text/javascript" src="../resources/librerias/Descargas/jquery-ui-1.12.1/jquery-ui.min.js"></script>

    <link rel="stylesheet" type="text/css"
        href="../resources/librerias/jquery-ui-1.12.1/jquery-ui.min.css">
    <link rel="stylesheet" type="text/css"
        href="../resources/librerias/DataTables/Bootstrap-3.3.7/css/bootstrap.min.css">
</head>

<body>
    <header id="main-header">

        <a id="logo-header" href="paginaPrincipal.html">
            <span class="site-name">Kostuak</span>
            <span class="site-desc">Visualiza tus gastos</span>
        </a> <!-- / #logo-header -->

        <nav>
            <ul>
                <li><a href="inicioSesion.php">Iniciar sesión</a></li>
                <li><a href="registro.php">Regístrate</a></li>
            </ul>
        </nav><!-- / nav -->

    </header>

   
    <div class="site-wrapper">

            <div class="site-wrapper-inner">
      
              <div class="container">
                <div class="inner cover">
                  <h1 class="cover-heading">Visualiza tus gastos.</h1>
                  <p class="lead">Introduce tus gastos y tus ingresos y visualizalos en diferentes gráficos.Podrás comparar tus gastos por categorías o por meses y proponerte objetivos de ahorro</p>
                  <p class="lead">
                    <a href="#" class="btn btn-lg btn-default">Learn more</a>
                  </p>
                </div>
      
              </div>
      
            </div>
      
          </div>

</html>