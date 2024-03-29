<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

include_once '../configuracion/baseDatos.php';
include_once '../objetos/gastos.php';
$year=date("Y");
$baseDatos = new BaseDatos();
$db = $baseDatos->getConexion();

$gasto = new Gastos($db);

$metodo = $_SERVER['REQUEST_METHOD']; 
        if ('POST' === $metodo) {
                $gasto->anho = intval($year);
                $gasto->mes = $_POST['mes'] ;
                $gasto->descripcion = $_POST['descripcion'];
                $gasto->cantidad= $_POST['cantidad'] ;
                $gasto->idCategoria =  $_POST['idCategoria'] ;
                $gasto->idusuario =  $_POST['idusuario'] ;
            }


$mes= $gasto->mes;
if($gasto->crear()){
    
    //http_response_code(201);
    header('Location: ../../front/php/paginaPrincipal.php?mes='.$mes);

}else{

    if(isset($gasto->anho) && isset($gasto->mes) && isset($gasto->descripcion) && isset($gasto->cantidad)  && isset($gasto->idusuario)){

    	 http_response_code(503);
         echo json_encode(
            array("message" => "Error al registrar gasto.")
        );

     }else{
        
        http_response_code(404);
       
        echo json_encode(
            array("message" => "Faltan datos necesarios.")
        );
    }
} 
?>
