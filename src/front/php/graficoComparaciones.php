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
<script type="text/javascript" src="../js/graficoComparaciones.js"></script>

    <div id="divSelectCategorias">
        <label ><b>Categoría</b></label>
        <select id="selectCategoria" name="selectCategoria" onchange="GraficoAnual.cambioCategoria()"></select>
    </div>
    <div id="divGraficoGastos" ></div>

 </html>   