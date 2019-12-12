<?php
// cabeceiras necesarias
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

//a conexión coa base de datos irá aquí

// incluir os ficheiros de base de datos
include_once '../configuracion/baseDatos.php';
include_once '../objetos/objetivos.php';
 
// instanciar a base de datos e o obxecto categoria
$baseDatos = new BaseDatos();
$db = $baseDatos->getConexion();
 
// inicializar o obxecto categoria
$datosObjetivos = new Objetivos($db);
 
 $metodo = $_SERVER['REQUEST_METHOD']; 
 
if ('GET' === $metodo) {
    $id=$datosObjetivos->id= $_GET["id"];
    $stmt = $datosObjetivos->leerObjetivos();
    $resultado=$stmt->get_result();
    $num=$resultado->num_rows;
}

 if($num>0){
    // array de datosObjetivos
    $datosObjetivos_arr=array();
    $datosObjetivos_arr["records"]=array();
    while ($item=$resultado->fetch_assoc()){
        $item_objetivos=array(
            "idobjetivos" =>$item["idobjetivos"],
            "objetivo" => utf8_decode($item["objetivo"]),
            "porcentaje" =>$item["porcentaje"],
            "cantidad" =>$item["cantidad"],
            "ahorrado" =>$item["ahorrado"],
            "estado" =>utf8_decode($item["estado"]),
            "mes" =>$item["mes"],
            "anho" =>$item["anho"],
            
            
        );
        array_push($datosObjetivos_arr["records"],$item_objetivos);
    }
    

 
    http_response_code(200);
    echo json_encode($datosObjetivos_arr,JSON_PRETTY_PRINT);
}

else{

    http_response_code(404);
    echo json_encode(
        array("message" => "Non se atoparon objetivos.")
    );
} 

 try{
   $datosObjetivos->leerObjetivos();

}catch(Exception $err){
    echo "error". $err;
}
 
?>