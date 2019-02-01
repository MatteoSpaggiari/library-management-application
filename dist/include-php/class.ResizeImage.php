<?php
    class ResizeImage {
        private $pathLoad;
        private $pathSave;
        private $imagesResource;
        private $imagesName;
        private $nameFile;
        private $imagesResize;
        private $widthOriginal;
        private $heightOriginal;
        private $widthResize;
        private $heightResize;
                
        function __construct($pathLoad = NULL,$pathSave) {
            $this->pathLoad = $pathLoad;
            $this->pathSave = $pathSave;
        }
        
        public function doResize($imagesResource,$imagesName,$i) {
            $this->imagesResource = $imagesResource;
            $this->imagesName = $imagesName;
            $this->nameFile = substr($this->imagesName, 0, strrpos($this->imagesName, '.'));
            //Prendo Informazioni Album
            list($width, $height, $type, $attr) = getimagesize($this->pathLoad.$this->imagesName);
            //Controllo se è davvero un immagine
            $this->widthOriginal = $width;
            $this->heightOriginal = $height;	    
            if($this->widthOriginal > $this->heightOriginal) {
                $this->widthResize = 200;
                $this->heightResize = ($this->widthResize*$this->heightOriginal/$this->widthOriginal);
            } else if($this->widthOriginal  < $this->heightOriginal){
                $this->heightResize = 350;
                $this->widthResize = ($this->heightResize*$this->widthOriginal/$this->heightOriginal);
            } else {
                $this->widthResize = 250;
                $this->heightResize = 250;
            }
            $this->imageResize = imagecreatetruecolor($this->widthResize, $this->heightResize);
            imagecopyresampled($this->imageResize, $this->imagesResource, 0, 0, 0, 0, $this->widthResize, $this->heightResize, $this->widthOriginal, $this->heightOriginal);
            //Se non esiste la cartella di salvataggio la creo
            if(!is_dir($this->pathSave)) {
                mkdir($this->pathSave,0777,true);
            }
            imagejpeg($this->imageResize, $this->pathSave.$this->nameFile.'.jpg', 80);
            imagedestroy($this->imageResize);
            imagedestroy($this->imagesResource);
        }
    }
?>