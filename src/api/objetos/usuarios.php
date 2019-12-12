<?php
class Usuario{
 
    // conexión coa táboa da base de datos
    private $conn;
    private $taboa = "Usuarios";
 
    // propiedades do obxecto
    public $idusuario;
    public $nombre;
    public $apellidos;
    public $password;
    public $email;


 
    // constructor con $db como conexión coa base de datos
    public function __construct($db){
        $this->conn = $db;
    }

    function leerUsuario(){
        try{
            $stmt =$this->conn->prepare("SELECT idusuario, nombre FROM ". $this->taboa ." WHERE email = ? AND password = ?");
            $stmt->bind_param('ss', $this->email, $this->password); 

        }catch(Exception $err){
            echo $err;
        }
        $stmt->execute();

            return $stmt;

        $stmt->close();
   } 

    function crear(){
        try{
            $stmt =$this->conn->prepare("INSERT INTO ". $this->taboa ." (nombre, apellidos, password, email) VALUES (?, ?, ?, ?)");
            $stmt->bind_param('ssss', $this->nombre, $this->apellidos, $this->password, $this->email);

        }catch(Exception $err){
            echo $err;
        }
        
        if($stmt->execute()){

            return true;

        }

            return false;
        
        
   } 

    
}