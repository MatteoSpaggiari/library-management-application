<?php
    class PDOFactory
    {
        public static function GetPDO($strDSN, $strUser, $strPass, $arParams)
        {
            $strKey = md5(serialize(array($strDSN, $strUser, $strPass, $arParams)));
            if(isset($GLOBALS['PDOS'])) {
                if(!($GLOBALS['PDOS'][$strKey] instanceof PDO))
                {
                    $GLOBALS['PDOS'][$strKey] = new PDO($strDSN, $strUser, $strPass, $arParams);
                }
                return($GLOBALS['PDOS'][$strKey]);
            } else {
                $GLOBALS['PDOS'][$strKey] = new PDO($strDSN, $strUser, $strPass, $arParams);
                return($GLOBALS['PDOS'][$strKey]);
            }
        }
    }
?>