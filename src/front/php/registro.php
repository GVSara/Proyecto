<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <link rel="stylesheet" type="text/css" href="../css/EstilosInicio.css">
    <link rel="stylesheet" type="text/css" href="../css/estilosRegistro.css">
    <script type="text/javascript"  src="../resources/librerias/DataTables/jQuery-3.3.1/jquery-3.3.1.min.js"></script>
    <script type="text/javascript"  src="../resources/librerias/DataTables/Bootstrap-3.3.7/js/bootstrap.min.js"></script>
    <script type="text/javascript"  src="../resources/librerias/jquery-ui-1.12.1/jquery-ui.min.js"></script>
    <script type="text/javascript"  src="../resources/librerias/DataTables/DataTables-1.10.20/js/jquery.dataTables.min.js"></script>
    
    <link rel="stylesheet" type="text/css" href="../resources/librerias/jquery-ui-1.12.1/jquery-ui.min.css">
    <link rel="stylesheet" type="text/css" href="../resources/librerias/DataTables/Bootstrap-3.3.7/css/bootstrap.min.css">
    <link rel="stylesheet" type="text/css" href="../resources/librerias/DataTables/DataTables-1.10.20/css/jquery.dataTables.min.css">
    
</head>

<body>
    <header id="main-header">

        <a id="logo-header" href="paginaPrincipal.php">
            <span class="site-name">Kostuak</span>
            <span class="site-desc">Visualiza tus gastos</span>
        </a> <!-- / #logo-header -->
    
        <nav>
            <ul>
                <li><a href="inicioSesion.php">Iniciar sesión</a></li>
                <li><a href="registro.php" >Regístrate</a></li>
            </ul>
        </nav><!-- / nav -->
    
    </header>
  <form  action="../../api/usuarios/registrarUsuario.php" method="post">
    <div class="container">
      <h1>Regístrate</h1>
      <p>Porfavor, complete todos los campos </p>
      <hr>
      <label for="nombre"><b>Nombre</b></label>
      <input type="text" placeholder="Nombre" name="nombre" required><br>
       
      <label for="apellidos"><b>Apellidos</b></label>
      <input type="text" placeholder="Apellidos" name="apellidos" required><br>

      <label for="email"><b>Email</b></label>
      <input type="text" placeholder="Email" name="email" required><br>

      <label for="password"><b>Contraseña</b></label>
      <input type="password" placeholder="Contraseña" name="password" required><br>
      
      <div class="clearfix">
        <button type="submit" class="btn btn-success signupbtn">Enviar</button>
      </div>
    </div>
  </form>
</div> 
</body>

</html>