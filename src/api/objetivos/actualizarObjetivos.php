<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

include_once '../configuracion/baseDatos.php';
include_once '../objetos/objetivos.php';
$baseDatos = new BaseDatos();
$db = $baseDatos->getConexion();

$datosObjetivo = new Objetivos($db);
$id=$datosObjetivo->idobjetivos= $_POST["idObjetivo"];
$estado=$datosObjetivo->estado= $_POST["estado"];
$ahorrado=$datosObjetivo->ahorrado= $_POST["totalObjetivo"];

$metodo = $_SERVER['REQUEST_METHOD']; 
        if ('PUT' === $metodo) {
            $data = json_decode(file_get_contents("php://input"));
                $datosObjetivo->estado = $estado;
                $datosObjetivo->ahorrado= $ahorrado ;
                $datosObjetivo->idobjetivos= $id ;
            }
            var_dump($datosObjetivo->estado);
            if( $datosObjetivo->actualizar()){

                //$datosObjetivo->actualizar();
    
    http_response_code(200);
                    echo json_encode(
                        array("message" => "Actualizacion realizada correctamente")
                    );

}else{

    http_response_code(503);
                    echo json_encode(
                        array("message" => "Erro no procesamento da actualizacion")
                    );
     
} 
?>
