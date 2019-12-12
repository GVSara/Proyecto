<!DOCTYPE html>
<html lang="es">       
 <head>
    <meta charset="UTF-8">
    <script type="text/javascript" src="../js/paginaPrincipal.js"></script>
    <script type="text/javascript"
        src="../resources/librerias/DataTables/jQuery-3.3.1/jquery-3.3.1.min.js"></script>
    <script type="text/javascript"
        src="../resources/librerias/DataTables/Bootstrap-3.3.7/js/bootstrap.min.js"></script>
    <script type="text/javascript" src="../../resources/librerias/jquery-ui-1.12.1/jquery-ui.min.js"></script>

    <link rel="stylesheet" type="text/css"
        href="../resources/librerias/jquery-ui-1.12.1/jquery-ui.min.css">
    <link rel="stylesheet" type="text/css"
        href="../resources/librerias/DataTables/Bootstrap-3.3.7/css/bootstrap.min.css">

</head>
<body>
<form  action="../../api/ingresos/guardarIngresos.php" method="post">
    <div class="container">

        
        <input id="mes" type="text" placeholder="Mes" name="mes" ><br>
        <div class="form-group row">
            <label class="col-md-1 col-form-label"><b>Categoria</b></label>
            <div class="col-md-11">
                <select id="idCategoria" name="idCategoria"></select>
            </div>
        </div>
        <div class="form-group row">
            <label class="col-md-1 col-form-label"  for="descripcion"><b>Descripcion</b></label>
            <div class="col-md-11">
                <input type="text" placeholder="Descripcion" name="descripcion" required>
            </div>
        </div>
        <div class="form-group row">
            <label class="col-md-1 col-form-label" for="cantidad"><b>Cantidad</b></label>
            <div class="col-md-11">
                <input type="number" step=".00" min="0" placeholder="0.00€" name="cantidad" required><label> €</label><br>
            </div>
        </div>
        <input id="user" type="number" placeholder="idusuario" name="idusuario" required><br>
        <div class="clearfix">
        <button type="submit" class="btn btn-success ">Enviar</button>
        </div>
    </div>
    </form>
</body>
</html>    