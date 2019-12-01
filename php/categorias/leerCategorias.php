<?php
// cabeceiras necesarias
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

//a conexión coa base de datos irá aquí

// incluir os ficheiros de base de datos
include_once '../configuracion/baseDatos.php';
include_once '../objetos/categorias.php';
 
// instanciar a base de datos e o obxecto categoria
$baseDatos = new BaseDatos();
$db = $baseDatos->getConexion();
 
// inicializar o obxecto categoria
$categorias = new categorias($db);
 
 $metodo = $_SERVER['REQUEST_METHOD']; 
 
if ('GET' === $metodo) {
    $stmt = $categorias->leerCategorias();
    $resultado=$stmt->get_result();
    $num=$resultado->num_rows;
}

 if($num>0){
    // array de categorias
    $categorias_arr=array();
    $categorias_arr["records"]=array();
    while ($item=$resultado->fetch_assoc()){
        $item_categoria=array(
            "idcategorias" => $item["idcategorias"],
            "nombreCategoria" =>utf8_decode($item["nombreCategoria"]),
            "tipo" =>utf8_decode($item["tipo"]),
        );
        array_push($categorias_arr["records"],$item_categoria);
    }
   // var_dump($item_categoria["descripcion"]);

 
    http_response_code(200);
    echo json_encode($categorias_arr,JSON_PRETTY_PRINT);
}

else{

    http_response_code(404);
    echo json_encode(
        array("message" => "Non se atoparon categorias.")
    );
} 

 try{
   $categorias->leerCategorias();

}catch(Exception $err){
    echo "error". $err;
}
 
?>