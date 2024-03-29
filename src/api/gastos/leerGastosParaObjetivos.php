<?php
// cabeceiras necesarias
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

//a conexión coa base de datos irá aquí

// incluir os ficheiros de base de datos
include_once '../configuracion/baseDatos.php';
include_once '../objetos/gastos.php';
 
// instanciar a base de datos e o obxecto gasto
$baseDatos = new BaseDatos();
$db = $baseDatos->getConexion();
 
// inicializar o obxecto gasto
$gastos = new Gastos($db);
 
 $metodo = $_SERVER['REQUEST_METHOD']; 
 
if ('GET' === $metodo) {
    $id=$gastos->id= $_GET["id"];
    $anho=$gastos->anho= $_GET["anho"];
    $stmt = $gastos->leerGastosParaObjetivos();
    $resultado=$stmt->get_result();
    $num=$resultado->num_rows;
}

 if($num>0){
    // array de gastos
    $gastos_arr=array();
    $gastos_arr["records"]=array();
    while ($item=$resultado->fetch_assoc()){
        $item_gasto=array(
            "cantidad" => $item["cantidad"],
            "anho" => $item["anho"],
            "mes" => $item["mes"],
        );
        array_push($gastos_arr["records"],$item_gasto);
    }
   // var_dump($item_gasto["descripcion"]);

 
    http_response_code(200);
    echo json_encode($gastos_arr,JSON_PRETTY_PRINT);
}

else{

    http_response_code(404);
    echo json_encode(
        array("message" => "Non se atoparon gastos.")
    );
} 

 try{
   $gastos->leerGastosParaObjetivos();

}catch(Exception $err){
    echo "error". $err;
}
 
?>