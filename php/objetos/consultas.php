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
            $stmt =$this->conn->prepare("SELECT descripcion, cantidad, categorias_idcategorias FROM ". $this->tabla ." WHERE usuarios_idusuario = ? AND mes = ? AND anho = ?");
            $stmt->bind_param('isi', $this->id, $this->mes, $this->anho); 

        }catch(Exception $err){
            echo $err;
        }
        $stmt->execute();

            return $stmt;

        $stmt->close();
   } 
}