<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

include_once '../configuracion/baseDatos.php';
include_once '../objetos/usuarios.php';

$baseDatos = new BaseDatos();
$db = $baseDatos->getConexion();

$usuario = new Usuario($db);

$metodo = $_SERVER['REQUEST_METHOD']; 
        if ('POST' === $metodo) {
        // comprobar se hai máis de 0 rexistros devoltos
         $data = json_decode(file_get_contents('php://input'));
        //         if (is_null($data)) {
        //             header('HTTP/1.1 400 Bad Request');
        //             $this->result();
        //             return;
        //         }
                $usuario->nombre = $_POST['nombre'];
                $usuario->apellidos = $_POST['apellidos'];
                $usuario->password= $_POST['password'] ;
                $usuario->email = $_POST['email'];
            }



if($usuario->crear()){
    
    //http_response_code(201);
    header('Location: ../../front/php/formInicioSesion.php');

}else{

    if(isset($usuario->nombre) && isset($usuario->apellidos) && isset($usuario->password) && isset($usuario->email)){

    	 http_response_code(503);
         echo json_encode(
            array("message" => "Error al registrar Usuario.")
        );

     }else{
        
        http_response_code(404);
       
        echo json_encode(
            array("message" => "Faltan datos necesarios.")
        );
    }
} 
?>
