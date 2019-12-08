<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

include_once '../configuracion/baseDatos.php';
include_once '../objetos/usuarios.php';

$baseDatos = new BaseDatos();
$db = $baseDatos->getConexion();

$usuario = new Usuario($db);


$metodo = $_SERVER['REQUEST_METHOD']; 
        if ('GET' === $metodo) {
                $user=$usuario->user= $_GET['email'];
                $password=$usuario->password= $_GET['password'];
                $stmt = $usuario->leerUsuario();
                $resultado=$stmt->get_result();
                $num=$resultado->num_rows;
        }        
        var_dump($_GET['email']);
        var_dump($_GET['password']);
        var_dump($stmt);

        if($num>0){
            // array de gastos
            $usuario_arr=array();
            $usuario_arr["records"]=array();
            while ($item=$resultado->fetch_assoc()){
                $item_usuario=array(
                    "nombre"=> $item["nombre"],
                );
                array_push($usuario_arr["records"],$item_usuario);
            }
           // var_dump($item_gasto["descripcion"]);
        
         
            http_response_code(200);
            echo json_encode($usuario_arr,JSON_PRETTY_PRINT);
        }
        
        else{
        
            http_response_code(404);
            echo json_encode(
                array("message" => "Error Usuario.")
            );
        } 
           

?>

	
	