<?php
    class LoadImages {
        private $pathLoad;
        private $images;
        private $numberImages;
                
        function __construct($path) {
            $this->images = array();
            $this->pathLoad = $path;
            $dh = opendir($this->pathLoad) or die("Errore nell'apertura della directory ". $this->pathLoad);
            while (($file = readdir($dh)) != FALSE) {
                if (!is_dir($file)) {
                    $this->images[] = $file;
                }
            }
            closedir($dh);
            $this->numberImages = count($this->images);
        }
        
        public function getImages() {
            return $this->images;
        }
        
        public function getNumberImages() {
            return $this->numberImages;
        }
    }
?>
