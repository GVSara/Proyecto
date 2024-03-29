<?php
class Objetivos{
 
    // conexión coa táboa da base de datos
    private $conn;
    private $tabla = "objetivos";
  
 
    // propiedades do obxecto
     public $objetivo;
     public $porcentaje;
     public $cantidad;
     public $ahorrado;
     public $estado;
     public $mes;
     public $anho;
 
    // constructor con $db como conexión coa base de datos       
    public function __construct($db){
        $this->conn = $db;
    }
    
//    
   function crear(){
        try{
            $stmt =$this->conn->prepare("INSERT INTO ". $this->tabla ." (objetivo, porcentaje, cantidad, ahorrado, estado , mes, anho, usuarios_idusuario) VALUES (?, ?, ?, ?, ?, ?, ?, ?)");
            $stmt->bind_param('siddssii', $this->objetivo, $this->porcentaje, $this->cantidad, $this->ahorrado, $this->estado, $this->mes, $this->anho, $this->idusuario);

        }catch(Exception $err){
            echo $err;
        }
        
        if($stmt->execute()){

            return true;

        }
            return false;
    } 

    function leerObjetivos(){
        try{
            $stmt =$this->conn->prepare("SELECT idobjetivos,objetivo, porcentaje, cantidad, ahorrado, estado, mes, anho, usuarios_idusuario FROM objetivos WHERE usuarios_idusuario = ? ");
            $stmt->bind_param('i', $this->id); 

        }catch(Exception $err){
            echo $err;
        }
        $stmt->execute();

            return $stmt;

        $stmt->close();
   }
   function leerObjetivoPagPrincipal(){
        try{
            $stmt =$this->conn->prepare("SELECT idobjetivos, objetivo, porcentaje, cantidad, ahorrado, estado, mes, anho, usuarios_idusuario FROM objetivos WHERE usuarios_idusuario = ? AND estado = ?");
            $stmt->bind_param('is', $this->id, $this->estado); 

        }catch(Exception $err){
            echo $err;
        }
        $stmt->execute();

            return $stmt;

        $stmt->close();
    }
    function actualizar(){
            
            $stmt =$this->conn->prepare( "UPDATE " . $this->tabla . " SET estado= ?, ahorrado= ? WHERE idobjetivos= ? ");
            $stmt->bind_param('sdi',$this->estado, $this->ahorrado, $this->idobjetivos);
             if($stmt->execute()){
    
                return true;
    
            }
    
                return false;
            
    }
    
}
?>