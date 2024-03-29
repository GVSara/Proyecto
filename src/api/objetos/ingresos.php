<?php
class Ingresos{
 
    // conexión coa táboa da base de datos
    private $conn;
    private $tabla = "ingresos";
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
    
   function leerIngresos(){
        try{
            $stmt =$this->conn->prepare("SELECT I.descripcion, I.cantidad, C.nombreCategoria FROM Ingresos I INNER JOIN categorias C ON I.categorias_idcategorias = C.idcategorias WHERE usuarios_idusuario = ? AND mes = ? AND anho = ?");
            $stmt->bind_param('isi', $this->id, $this->mes, $this->anho); 

        }catch(Exception $err){
            echo $err;
        }
        $stmt->execute();

            return $stmt;

        $stmt->close();
   } 
   function leerIngresosAnho(){
    try{
        $stmt =$this->conn->prepare("SELECT I.descripcion, I.cantidad, C.nombreCategoria FROM Ingresos I INNER JOIN categorias C ON I.categorias_idcategorias = C.idcategorias WHERE usuarios_idusuario = ?  AND anho = ?");
        $stmt->bind_param('ii', $this->id, $this->anho); 

    }catch(Exception $err){
        echo $err;
    }
    $stmt->execute();

        return $stmt;

    $stmt->close();
} 
   function leerIngresosParaObjetivos(){
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
        $stmt->bind_param('issdii', $this->anho, $this->mes, $this->descripcion, $this->cantidad, $this->idusuario, $this->idCategoria);

    }catch(Exception $err){
        echo $err;
    }
    
    if($stmt->execute()){

        return true;

    }

        return false;
    
    
} 
}