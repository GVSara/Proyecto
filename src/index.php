<?php
session_start();
if(isset($_SESSION["userId"])) {
    $session_value=$_SESSION["userId"];
    $nombre=$_SESSION["nombre"];
    header("Location: front/php/paginaPrincipal.php");
}
?>
<!DOCTYPE html>
<html lang="es">

<head>
    <link rel="stylesheet" type="text/css" href="front/css/EstilosInicio.css">
    <link rel="stylesheet" type="text/css" href="front/css/estilosIndex.css">
    <script type="text/javascript"
        src="front/resources/librerias/DataTables/jQuery-3.3.1/jquery-3.3.1.min.js"></script>
    <script type="text/javascript"
        src="front/resources/librerias/DataTables/Bootstrap-3.3.7/js/bootstrap.min.js"></script>
    <script type="text/javascript" src="front/resources/librerias/Descargas/jquery-ui-1.12.1/jquery-ui.min.js"></script>

    <link rel="stylesheet" type="text/css"
        href="front/resources/librerias/jquery-ui-1.12.1/jquery-ui.min.css">
    <link rel="stylesheet" type="text/css"
        href="front/resources/librerias/DataTables/Bootstrap-3.3.7/css/bootstrap.min.css">
</head>

<body>
    <header id="main-header">

        <a id="logo-header" href="front/php/paginaPrincipal.html">
            <span class="site-name">Kostuak</span>
            <span class="site-desc">Visualiza tus gastos</span>
        </a> <!-- / #logo-header -->

        <nav>
            <ul>
                <li><a href="front/php/inicioSesion.php">Iniciar sesión</a></li>
                <li><a href="front/php/registro.php">Regístrate</a></li>
            </ul>
        </nav><!-- / nav -->

    </header>

   
    <div class="site-wrapper">

            <div class="site-wrapper-inner">
      
              <div class="container">
                <div class="inner cover">
                  <h1 class="cover-heading">Controla tus gastos.</h1>
                  <p class="lead">Introduce tus gastos y tus ingresos.Tendrá un gráfico con tus gastos mensuales y otro en el que podrás ver tus gastos anuales y filtrarlos por categoría.También podrás proponerte objetivos para facilitar tu ahorro</p>
                  <p class="lead">
                    <a href="front/php/inicioSesion.php" class="btn btn-lg btn-default">Iniciar Sesión</a>
                  </p>
                </div>
      
              </div>
      
            </div>
      
          </div>

</html>