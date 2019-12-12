<?php
session_start();
?>
<!DOCTYPE html>
<html lang="es">
        
 <head>
        <meta charset="UTF-8">
    <link rel="stylesheet" type="text/css" href="../css/EstilosInicio.css">
    <link rel="stylesheet" type="text/css" href="../css/estilosInicioSesion.css">
    <script type="text/javascript"
        src="../resources/librerias/DataTables/jQuery-3.3.1/jquery-3.3.1.min.js"></script>
    <script type="text/javascript"
        src="../resources/librerias/DataTables/Bootstrap-3.3.7/js/bootstrap.min.js"></script>
    <script type="text/javascript" src="../resources/librerias/jquery-ui-1.12.1/jquery-ui.min.js"></script>
    <script type="text/javascript"
        src="../resources/librerias/DataTables/DataTables-1.10.20/js/jquery.dataTables.min.js"></script>

    <link rel="stylesheet" type="text/css"
        href="../resources/librerias/jquery-ui-1.12.1/jquery-ui.min.css">
    <link rel="stylesheet" type="text/css"
        href="../resources/librerias/DataTables/Bootstrap-3.3.7/css/bootstrap.min.css">
    <link rel="stylesheet" type="text/css"
        href="../resources/librerias/DataTables/DataTables-1.10.20/css/jquery.dataTables.min.css">

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
    <form action="../../api/usuarios/iniciarSesion.php">
        <div class="container">
            <h1>Iniciar Sesión</h1>
            <hr>
            <div class="col-md-6 col-md-offset-3">
                <label for="email"><b>EMail</b></label><br>
                <input type="email" name="email" id="email" tabindex="1" class="form-control" placeholder="EMail"
                    value="" required><br>

                <label for="psw"><b>Contraseña</b></label><br>
                <input type="password" name="password" id="password" class="form-control" placeholder="Contraseña"
                    required><br>
                <?php 
                    if(isset($_SESSION["errorInicio"])) {
                        echo $_SESSION['errorInicio'];
                    };
                ?>    
                <button type="submit" class="btn btn-success signinbtn">Iniciar Sesión</button>
            </div>
        </div>
    </form>
    </div>
</body>

</html>
