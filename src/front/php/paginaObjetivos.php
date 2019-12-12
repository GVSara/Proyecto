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

    <div class="container">
        <div class="row">
        <h3>Tus Objetivos:</h3>   
        <table id='tablaObjetivos' class='table table-hover'>
                <thead>
                    <th class='wpTableHeader'>Descripción</th>
                    <th class='wpTableHeader'>% Asignado</th>
                    <th class='wpTableHeader'>Cantidad</th>
                    <th class='wpTableHeader'>Ahorrado</th>
                    <th class='wpTableHeader'>Estado</th>
                    <th class='wpTableHeader'>Mes</th>
                    <th class='wpTableHeader'>Año</th>
                </thead>
                <tbody></tbody>
            </table>
        </div>
    </div>   
 </html>   