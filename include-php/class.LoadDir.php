<?php
    class LoadDir {
        private $pathLoad;
        private $numberDir;
        private $dir;
        private $dirValid;
        
        function __construct() {
            $this->pathLoad = "./immagini/";
            $this->dir = array();
            $this->dirValid = array();
            $directory = scandir($this->pathLoad) or die("Errore nell'apertura della directory ". $this->pathLoad);
            $this->numberDir = count($directory);
            for($i = 0;$i < $this->numberDir;$i++) {
                if (is_dir($this->pathLoad.$directory[$i])) {
                    $this->dir[] = $directory[$i];
                }
            }
            $this->dirValid = array_slice($this->dir, 2);
            $this->numberDir = count($this->dirValid);
        }
        
        public function getDir() {
            return $this->dirValid;
        }
        
        public function getNumberDir() {
            return $this->numberDir;
        }
    }
?>
