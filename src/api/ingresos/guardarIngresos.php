<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

include_once '../configuracion/baseDatos.php';
include_once '../objetos/ingresos.php';
$year=date("Y");
$baseDatos = new BaseDatos();
$db = $baseDatos->getConexion();

$ingreso = new Ingresos($db);

$metodo = $_SERVER['REQUEST_METHOD']; 
        if ('POST' === $metodo) {
                $ingreso->anho = intval($year);
                $ingreso->mes = $_POST['mes'] ;
                $ingreso->descripcion = $_POST['descripcion'];
                $ingreso->cantidad= $_POST['cantidad'] ;
                $ingreso->idCategoria =  $_POST['idCategoria'] ;
                $ingreso->idusuario =  $_POST['idusuario'] ;
            }


$mes= $ingreso->mes;
if($ingreso->crear()){
    
    //http_response_code(201);
    header('Location: ../../front/php/paginaPrincipal.php?mes='.$mes);

}else{

    if(isset($ingreso->anho) && isset($ingreso->mes) && isset($ingreso->descripcion) && isset($ingreso->cantidad)  && isset($ingreso->idusuario)){

    	 http_response_code(503);
         echo json_encode(
            array("message" => "Error al registrar ingreso.")
        );

     }else{
        
        http_response_code(404);
       
        echo json_encode(
            array("message" => "Faltan datos necesarios.")
        );
    }
} 
?>
