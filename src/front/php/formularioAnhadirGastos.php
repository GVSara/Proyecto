<!DOCTYPE html>
<html lang="es">       
 <head>
    <meta charset="UTF-8">
</head>
<body>
<form  action="../../api/gastos/guardarGastos.php" method="post">
    <div class="container">

        
        <input id="mes" type="text" placeholder="Mes" name="mes" >

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
                <input type="number" step=".01" min="0" placeholder="0.00€" name="cantidad" required><label> €</label><br>
            </div>
        </div>
        <input id="user" type="number" placeholder="idusuario" name="idusuario" required><br>
        <div class="clearfix">
        <button type="submit" class="btn btn-success signupbtn">Enviar</button>
        </div>
    </div>
    </form>
</body>
</html>    