<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

include_once '../configuracion/baseDatos.php';
include_once '../objetos/objetivos.php';
$year=date("Y");
$baseDatos = new BaseDatos();
$db = $baseDatos->getConexion();

$datosObjetivo = new Objetivos($db);

$metodo = $_SERVER['REQUEST_METHOD']; 
        if ('POST' === $metodo) {
        // comprobar se hai máis de 0 rexistros devoltos
         $data = json_decode(file_get_contents('php://input'));
        //         if (is_null($data)) {
        //             header('HTTP/1.1 400 Bad Request');
        //             $this->result();
        //             return;
        //         }

                
                $datosObjetivo->objetivo = $_POST['objetivo'];
                $datosObjetivo->porcentaje= $_POST['porcentaje'] ;
                $datosObjetivo->cantidad =  $_POST['cantidad'] ;
                $datosObjetivo->ahorrado =  0 ;
                $datosObjetivo->estado =  "Pendiente" ;
                $datosObjetivo->anho = intval($year);
                $datosObjetivo->mes = $_POST['mes'] ;
                $datosObjetivo->idusuario =  $_POST['idusuario'] ;
            }



if($datosObjetivo->crear()){
    
    //http_response_code(201);
    header('Location: ../../front/php/paginaPrincipal.php');

}else{

    if(isset($datosObjetivo->anho) && isset($datosObjetivo->mes) && isset($datosObjetivo->objetivo) && isset($datosObjetivo->cantidad)  && isset($datosObjetivo->idusuario)){

    	 http_response_code(503);
         echo json_encode(
            array("message" => "Error al registrar datosObjetivo.")
        );

     }else{
        
        http_response_code(404);
       
        echo json_encode(
            array("message" => "Faltan datos necesarios.")
        );
    }
} 
?>
