<?php
class Gastos{
 
    // conexión coa táboa da base de datos
    private $conn;
    private $tabla = "gastos";
    private $tablaCategorias = "categorias";
 
    // propiedades do obxecto
    public $id;
    public $anho;
    public $mes;
    public $descripcion;
    public $cantidad;
    public $usuarios_idusuario;
    public $categorias_idcategorias;
 
    // constructor con $db como conexión coa base de datos
    public function __construct($db){
        $this->conn = $db;
    }
    
   function leerGastos(){
        try{
            $stmt =$this->conn->prepare("SELECT G.descripcion, G.cantidad, C.nombreCategoria FROM ". $this->tabla ." G INNER JOIN ". $this->tablaCategorias ." C ON G.categorias_idcategorias = C.idcategorias WHERE usuarios_idusuario = ? AND mes = ? AND anho = ?");
            $stmt->bind_param('isi', $this->id, $this->mes, $this->anho); 

        }catch(Exception $err){
            echo $err;
        }
        $stmt->execute();

            return $stmt;

        $stmt->close();
   } 
   function leerGastosParaObjetivos(){
    try{
        $stmt =$this->conn->prepare("SELECT cantidad, anho, mes FROM  ". $this->tabla ." WHERE usuarios_idusuario = ? AND anho >= ?");
        $stmt->bind_param('ii', $this->id, $this->anho); 

    }catch(Exception $err){
        echo $err;
    }
    $stmt->execute();

        return $stmt;

    $stmt->close();
} 

   function crear(){
    try{
        $stmt =$this->conn->prepare("INSERT INTO ". $this->tabla ." (anho, mes, descripcion, cantidad, usuarios_idusuario, categorias_idcategorias) VALUES (?, ?, ?, ?, ?, ?)");
        $stmt->bind_param('issiii', $this->anho, $this->mes, $this->descripcion, $this->cantidad, $this->idusuario, $this->idCategoria);

    }catch(Exception $err){
        echo $err;
    }
    
    if($stmt->execute()){

        return true;

    }

        return false;
    
    
} 
}