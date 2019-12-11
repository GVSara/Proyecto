<?php
// cabeceiras necesarias
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

//a conexión coa base de datos irá aquí

// incluir os ficheiros de base de datos
include_once '../configuracion/baseDatos.php';
include_once '../objetos/ingresos.php';
 
// instanciar a base de datos e o obxecto gasto
$baseDatos = new BaseDatos();
$db = $baseDatos->getConexion();
 
// inicializar o obxecto gasto
$Ingresos = new Ingresos($db);
 
 $metodo = $_SERVER['REQUEST_METHOD']; 
 
if ('GET' === $metodo) {
    $id=$Ingresos->id= $_GET["id"];
    $anho=$Ingresos->anho= $_GET["anho"];
    $stmt = $Ingresos->leerIngresosAnho();
    $resultado=$stmt->get_result();
    $num=$resultado->num_rows;
}

 if($num>0){
    // array de Ingresos
    $gastos_arr=array();
    $gastos_arr["records"]=array();
    while ($item=$resultado->fetch_assoc()){
        $item_gasto=array(
            "nombreCategoria"=> $item["nombreCategoria"],
            "descripcion" => utf8_decode($item["descripcion"]),
            "cantidad" => $item["cantidad"],
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
        array("message" => "Non se atoparon Ingresos.")
    );
} 

 try{
   $Ingresos->leerIngresosAnho();

}catch(Exception $err){
    echo "error". $err;
}
 
?>