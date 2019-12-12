<!DOCTYPE html>
<html lang="es">       
 <head>
    <meta charset="UTF-8">
    <script type="text/javascript" src="../js/paginaPrincipal.js"></script>
    <script type="text/javascript"
        src="../resources/librerias/DataTables/jQuery-3.3.1/jquery-3.3.1.min.js"></script>
    <script type="text/javascript"
        src="../resources/librerias/DataTables/Bootstrap-3.3.7/js/bootstrap.min.js"></script>
    <script type="text/javascript" src="../resources/librerias/jquery-ui-1.12.1/jquery-ui.min.js"></script>

    <link rel="stylesheet" type="text/css"
        href="../resources/librerias/jquery-ui-1.12.1/jquery-ui.min.css">
    <link rel="stylesheet" type="text/css"
        href="../resources/librerias/DataTables/Bootstrap-3.3.7/css/bootstrap.min.css">

</head>
<body>
<form  action="../../api/objetivos/guardarObjetivos.php" method="post">
    <div class="container">
        <input id="mes" type="text" placeholder="Mes" name="mes" ><br>
        <input id="user" type="number" placeholder="idusuario" name="idusuario" required><br>
       
        <div class="form-group row">
            <label class="col-md-2 col-form-label" for="objetivo"><b>Descripcion objetivo</b></label>
            <div class="col-md-10">
                <input type="text" placeholder="Descripcion objetivo" name="objetivo" required><br>
            </div>
        </div>
        <div class="form-group row">
            <label class="col-md-2 col-form-label" for="porcentaje"><b>Porcentace para el objetivo</b></label>
            <div class="col-md-10">   
                <input type="number" placeholder="0%" name="porcentaje" required><label>%</label><br>
            </div>
        </div>
        <div class="form-group row">
            <label class="col-md-2 col-form-label" for="cantidad"><b>Cantidad a obtener</b></label>
            <div class="col-md-10">
                <input type="number" step=".00" min="0" placeholder="0.00€" name="cantidad" required><label>€</label><br>
            </div>
        </div>
        <div class="clearfix">
        <button type="submit" class="btn btn-success ">Enviar</button>
        </div>
    </div>
    </form>
</body>
</html>    