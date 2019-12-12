<?php
class Categorias{
 
    // conexión coa táboa da base de datos
    private $conn;
    private $tabla = "categorias";
   
 
    // propiedades do obxecto
    public $idcategorias;
    public $nombreCategoria;
    public $tipo;
    // constructor con $db como conexión coa base de datos
    public function __construct($db){
        $this->conn = $db;
    }
    
   function leerCategorias(){
        try{
            $stmt =$this->conn->prepare("SELECT idcategorias, nombreCategoria, tipo FROM ". $this->tabla ."");

        }catch(Exception $err){
            echo $err;
        }
        $stmt->execute();

            return $stmt;

        $stmt->close();
   } 
}