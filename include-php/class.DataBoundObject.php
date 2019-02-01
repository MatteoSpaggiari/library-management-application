<?php
    include_once 'interface.Validator.php';
    abstract class DataBoundObject implements Validator
    {
        protected $ID;
        protected $objPDO;
        protected $strTableName;
        protected $arRelationMap;
        protected $strNameID;
        protected $blForDeletion;
        protected $blIsLoaded;
        protected $arModifiedRelations;
        protected $errors = array();

        abstract protected function DefineTableName();
        abstract protected function DefineNameID();
        abstract protected function DefineRelationMap();
        abstract public function validate();

        public function __construct(PDO $objPDO, $id = NULL)
        {
           $this->strTableName = $this->DefineTableName();
           $this->strNameID = $this->DefineNameID();
           $this->arRelationMap = $this->DefineRelationMap();
           $this->objPDO = $objPDO;
           $this->blIsLoaded = false;
           if (isset($id)) {
              $this->ID = $id;
           };
           $this->arModifiedRelations = array();
        }

        public function Load()
        {
            if (isset($this->ID))
            {
                $strQuery = "SELECT ";
                foreach ($this->arRelationMap as $key => $value)
                {
                    $strQuery .= " " . $key . ",";
                }
                $strQuery = substr($strQuery, 0, strlen($strQuery)-1); //Toglie la virgola dall'ultimo campo del SELECT
                $strQuery .= " FROM " . $this->strTableName . " WHERE " . $this->strNameID . " = :eid";
                $objStatement = $this->objPDO->prepare($strQuery);
                $objStatement->bindParam(':eid', $this->ID, PDO::PARAM_INT);
                $objStatement->execute();
                if($objStatement->rowCount() == 1) {
                    $arRow = $objStatement->fetch(PDO::FETCH_ASSOC);
                    foreach($arRow as $key => $value)
                    {
                        $strMember = $this->arRelationMap[$key];
                        if (property_exists($this, $strMember))
                        {
                            if (is_int($value) || is_float($value))
                            {
                                eval('$this->' . $strMember . ' = ' . $value . ';');
                            }
                            else
                            {
                                eval('$this->' . $strMember . ' = "' . $value . '";');
                            };
                        };
                    };
                    $this->blIsLoaded = true;
                }
            };
        }

        public function Save()
        {
            if (isset($this->ID))
            {
                $strQuery = "UPDATE " . $this->strTableName . " SET ";
                foreach ($this->arRelationMap as $key => $value)
                {
                    eval('$actualVal = &$this->' . $value . ';');
                    if (array_key_exists($value, $this->arModifiedRelations))
                    {
                        $strQuery .= " " . $key . " = :$value, ";
                    };
                }
                $strQuery = substr($strQuery, 0, strlen($strQuery)-2); //Per togliere la virgola e lo spazio dell'ultimo inserimento
                $strQuery .= " WHERE " . $this->strNameID . " = :eid";
                unset($objStatement);
                $objStatement = $this->objPDO->prepare($strQuery);
                $objStatement->bindValue(':eid', $this->ID, PDO::PARAM_INT);
                foreach ($this->arRelationMap as $key => $value)
                {
                    eval('$actualVal = &$this->' . $value . ';');
                    if (array_key_exists($value, $this->arModifiedRelations))
                    {
                        if ((is_int($actualVal)) || ($actualVal == NULL))
                        {
                            $objStatement->bindValue(':' . $value, $actualVal, PDO::PARAM_INT);
                        } 
                        else 
                        {
                            $objStatement->bindValue(':' . $value, $actualVal, PDO::PARAM_STR);
                        };
                    };
                };
                if($objStatement->execute())
                {
                    return true;
                }
                else
                {
                    return false;
                }
            }
            else
            {
                $strValueList = "";
                $strQuery = "INSERT INTO " . $this->strTableName . "(";
                foreach ($this->arRelationMap as $key => $value)
                {
                    eval('$actualVal = &$this->' . $value . ';');
                    if (isset($actualVal))
                    {
                        if (array_key_exists($value, $this->arModifiedRelations))
                        {
                        $strQuery .= $key . ", ";
                        $strValueList .= ":$value, ";
                        };
                    };
                }
                $strQuery = substr($strQuery, 0, strlen($strQuery) - 2); //Per togliere la virgola e lo spazio dell'ultimo inserimento
                $strValueList = substr($strValueList, 0, strlen($strValueList) - 2); //Per togliere la virgola e lo spazio dell'ultimo inserimento
                $strQuery .= ") VALUES (";
                $strQuery .= $strValueList;
                $strQuery .= ")";

                unset($objStatement);
                $objStatement = $this->objPDO->prepare($strQuery);
                foreach ($this->arRelationMap as $key => $value)
                {
                    eval('$actualVal = &$this->' . $value . ';');
                    if (isset($actualVal))
                    {   
                        if (array_key_exists($value, $this->arModifiedRelations))
                        {
                            if ((is_int($actualVal)) || ($actualVal == NULL))
                            {
                                $objStatement->bindValue(':' . $value, $actualVal, PDO::PARAM_INT);
                            }
                            else
                            {
                                $objStatement->bindValue(':' . $value, $actualVal, PDO::PARAM_STR);
                            };
                        };
                    };
                }
                if($objStatement->execute())
                {
                    $this->ID = $this->objPDO->lastInsertId($this->strTableName);
                    return true;
                }
                else
                {
                    return false;
                }
            }
        }

        public function MarkForDeletion()
        {
            $this->blForDeletion = true;
        }
   
        public function __destruct()
        {
            if (isset($this->ID))
            {   
                if ($this->blForDeletion == true)
                {
                    $strQuery = "DELETE FROM " . $this->strTableName . " WHERE " . $this->strNameID . " = :eid";
                    $objStatement = $this->objPDO->prepare($strQuery);
                    $objStatement->bindValue(':eid', $this->ID, PDO::PARAM_INT);   
                    $objStatement->execute();
                };
            }
        }

        public function __call($strFunction, $arArguments)
        {
            $strMethodType = substr($strFunction, 0, 3);
            $strMethodMember = substr($strFunction, 3);
            switch ($strMethodType) 
            {
                case "set":
                    return($this->SetAccessor($strMethodMember, $arArguments[0]));
                break;
                case "get":
                    return($this->GetAccessor($strMethodMember));
                break;
            };
            return(false);   
        }

        private function SetAccessor($strMember, $strNewValue) 
        {
            if (property_exists($this, $strMember))
            {
                if (is_int($strNewValue) || is_float($strNewValue))
                {
                    eval('$this->' . $strMember . ' = ' . $strNewValue . ';');
                }
                else
                {
                    eval('$this->' . $strMember . ' = "' . $strNewValue . '";');
                };
                $this->arModifiedRelations[$strMember] = "1";
            }
            else
            {
                return(false);
            };   
        }

        private function GetAccessor($strMember)
        {
            if ($this->blIsLoaded != true)
            {
                $this->Load();
            }
            if (property_exists($this, $strMember))
            {
                eval('$strRetVal = $this->' . $strMember . ';');
                return($strRetVal);
            }
            else
            {
                return(false);
            };   
        }
    }
?>

