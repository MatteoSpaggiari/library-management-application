<?php	
    include('./include-php/head.php');
    require './include-php/class.LoadDir.php';
    require './include-php/class.LoadImages.php';
    require './include-php/class.ResizeImage.php';
    if($objUser->getAccess_level() > 1 && $objUser->getIs_block() == "N")
    {
	$data_modif = date('Y-m-d H:i:s');	
	if(isset($_REQUEST['submit']))
        {
            switch($_REQUEST['submit'])
            {

                case 'add_catalog':
	            
                    #Elimino gli eventuali Campi Salvati in un precedente invio dei dati
                    $objSession->deleteFieldsValueAddCatalog();
                    #Elimino gli errori effettuati in un precedente invio dei dati
                    $objSession->deleteErrorsAddCatalog();
                    $Id_sog_modifica = $objUser->getID();

                    $Errors_validate = array();
                    $objCatalog = new Cataloguing($objPDO);
                    
                    $Isbn = (isset($_POST['isbn'])) ? ($_POST['isbn']) : '';
                    $Sigla_inv = (isset($_POST['proprieta'])) ? ($_POST['proprieta']) : '';
                    $Num_inv = (isset($_POST['num_inv'])) ? (trim($_POST['num_inv'])) : '';
                    $Cod_dew = (isset($_POST['dewey'])) ? (strtoupper(trim($_POST['dewey']))) : '';
                    $Titolo = (isset($_POST['titolo'])) ? (trim($_POST['titolo'])) : '';
                    $Autore = (isset($_POST['autore'])) ? (ucwords(trim($_POST['autore']))) : '';
                    $Genere = (isset($_POST['genere'])) ? (trim($_POST['genere'])) : '';
                    $Editore = (isset($_POST['editore'])) ? (trim($_POST['editore'])) : '';
                    $Edizione = (isset($_POST['edizione'])) ? (ucwords(trim($_POST['edizione']))) : '';
                    $Collana = (isset($_POST['collana'])) ? (trim($_POST['collana'])) : '';
                    $Scaffale = (isset($_POST['scaffale'])) ? (strtoupper(trim($_POST['scaffale']))) : '';
                    $Formato = (isset($_POST['formato'])) ? (trim($_POST['formato'])) : '';
                    $Note_formato = (isset($_POST['note_formato'])) ? (trim($_POST['note_formato'])) : '';
                    $Pagine = (isset($_POST['pagine'])) ? (trim($_POST['pagine'])) : '';
                    $Data_c = (isset($_POST['data_c'])) ? (trim($_POST['data_c'])) : '';
                    $Novita = (isset($_POST['novita'])) ? ($_POST['novita']) : '';
                    $Costo = (isset($_POST['costo'])) ? (str_replace(",",".",trim($_POST['costo']))) : '';
                    $Provenienza = (isset($_POST['provenienza'])) ? (trim($_POST['provenienza'])) : '';
                    $Lingua_o = (isset($_POST['lingua_o'])) ? ($_POST['lingua_o']) : '';
                    $Titolo_o = (isset($_POST['titolo_o'])) ? (trim($_POST['titolo_o'])) : '';
                    $Traduttore = (isset($_POST['traduttore'])) ? (ucwords(trim($_POST['traduttore']))) : '';
                    $Testo_f = (isset($_POST['testo_f'])) ? ($_POST['testo_f']) : '';
                    $Lingua = (isset($_POST['lingua'])) ? (trim($_POST['lingua'])) : '';
                    $Nazione = (isset($_POST['nazione'])) ? (ucwords(trim($_POST['nazione']))) : '';
                    $Note = (isset($_POST['note'])) ? (trim($_POST['note'])) : '';
		
                    $objCatalog->setIsbn($Isbn);
                    $objCatalog->setSigla_inv($Sigla_inv);
                    $objCatalog->setNum_inv($Num_inv);
                    $objCatalog->setCodice($Cod_dew);
                    $objCatalog->setTitolo($Titolo);
                    $objCatalog->setAutore($Autore);
                    $objCatalog->setGenere($Genere);
                    $objCatalog->setEditore($Editore);
                    $objCatalog->setEdizione($Edizione);
                    (!empty($Collana) ? $objCatalog->setCollana($Collana) : '');
                    $objCatalog->setScaffale($Scaffale);
                    $objCatalog->setFormato($Formato);
                    (!empty($Note_formato) ? $objCatalog->setNote_formato($Note_formato) : '');
                    $objCatalog->setPagine($Pagine);
                    $objCatalog->setDate_catalog($Data_c);
                    $objCatalog->setNovita($Novita);
                    $objCatalog->setCosto($Costo);
                    (!empty($Provenienza) ? $objCatalog->setProvenienza($Provenienza) : '');
                    $objCatalog->setLingua_orig($Lingua_o);
                    $objCatalog->setTitolo_orig($Titolo_o);
                    $objCatalog->setTraduttore($Traduttore);
                    $objCatalog->setTesto_fronte($Testo_f);
                    $objCatalog->setLingua($Lingua);
                    $objCatalog->setNazione($Nazione);
                    (!empty($Note) ? $objCatalog->setNote($Note) : '');
                    $objCatalog->setAlienato("N");
                    $objCatalog->setVisibile("Y");
                    $objCatalog->setId_sog_modifica($Id_sog_modifica);
                    

                    #Salvo in Variabili di Sessione i Valori inseriti dall'utente
                    $objSession->sac_ISBN = $Isbn;
                    $objSession->sac_PROPRIETA = $Sigla_inv;
                    $objSession->sac_NUMERO_INVENTARIO = $Num_inv;
                    $objSession->sac_CODICE_DEWEY = $Cod_dew;
                    $objSession->sac_TITOLO = $Titolo;
                    $objSession->sac_AUTORE = $Autore;
                    $objSession->sac_GENERE = $Genere;
                    $objSession->sac_EDITORE = $Editore;
                    $objSession->sac_EDIZIONE = $Edizione;
                    $objSession->sac_COLLANA = $Collana;
                    $objSession->sac_SCAFFALE = $Scaffale;
                    $objSession->sac_FORMATO = $Formato;
                    $objSession->sac_NOTE_FORMATO = $Note_formato;
                    $objSession->sac_PAGINE = $Pagine;
                    $objSession->sac_DATA_CATALOGAZIONE = $Data_c;
                    $objSession->sac_NOVITA = $Novita;
                    $objSession->sac_COSTO = $Costo;
                    $objSession->sac_PROVENIENZA = $Provenienza;
                    $objSession->sac_LINGUA_ORIGINALE = $Lingua_o;
                    $objSession->sac_TITOLO_ORIGINALE = $Titolo_o;
                    $objSession->sac_TRADUTTORE = $Traduttore;
                    $objSession->sac_TESTO_FRONTE = $Testo_f;
                    $objSession->sac_LINGUA = $Lingua;
                    $objSession->sac_NAZIONE = $Nazione;
                    $objSession->sac_NOTE = $Note;

                    $Errors_validate = $objCatalog->validate();

                    if(sizeof($Errors_validate) > 0)
                    {
                        foreach ($Errors_validate as $key => $value)
                        {
                            $key_m = 'eac_'.$key;
                            $objSession->$key_m = $Errors_validate[$key];
                        }
                        redirect('./add_catalog.php?errors=yes');
                        exit();
                    }
                    else
                    {
                        if(Cataloguing::ControlExistingCatalog($objPDO, $Sigla_inv, $Num_inv) > 0)
                        {
                            $Error = "QUESTA CATALOGAZIONE ESISTE GI&Agrave;.";
                            $url = './add_catalog.php?error_exist='.urlencode($Error);					
                            redirect($url);
                            exit();
                        }
                        else
                        {
                            if($objCatalog->Save())
                            {
                                $objSession->deleteFieldsValueAddCatalog();
                                $objSession->deleteErrorsAddCatalog();
                                Cataloguing::AddAutore($objPDO, $Autore);
                                Cataloguing::AddCollana($objPDO, $Collana);
                                Cataloguing::AddEditore($objPDO, $Editore);
                                Cataloguing::AddFormato($objPDO, $Formato);
                                Cataloguing::AddGenere($objPDO, $Genere);
                                Cataloguing::AddNazione($objPDO, $Nazione);
                                Cataloguing::AddScaffale($objPDO, $Scaffale);
                                $Successo = "CATALOGAZIONE AGGIUNTA CORRETTAMENTE.";
                                $url = './card_catalog.php?id_catalog='.$objCatalog->getID().'&success_add_c='.urlencode($Successo);
                                redirect($url);
                                exit();
                            } 
                            else 
                            {
                                $Errore = "ERRORE: LA CATALOGAZIONE NON &Egrave; STATA AGGIUNTA...RIPROVA.";
                                $url = './add_catalog.php?error_add='.urlencode($Errore);
                                redirect($url);
                                exit();
                            }
                        }
                    }
                break;
                
                case 'edit_catalog' :

                    if(isset($_POST["id_catalogazione"]))
                    {
                        $Id_catalog = $_POST["id_catalogazione"];
                    }
                    else
                    {
                        redirect("access.php");
                        exit();
                    }
                    
                    #Elimino gli eventuali Campi Salvati in un precedente invio dei dati
                    $objSession->deleteFieldsValueEditCatalog();
                    #Elimino gli errori effettuati in un precedente invio dei dati
                    $objSession->deleteErrorsEditCatalog();
                    $Id_sog_modifica = $objUser->getID();
                    
                    $Errors_validate = array();
                    $objCatalog = new Cataloguing($objPDO, $Id_catalog);
                    
                    $Isbn = (isset($_POST['isbn'])) ? ($_POST['isbn']) : '';
                    $Sigla_inv = (isset($_POST['proprieta'])) ? ($_POST['proprieta']) : '';
                    $Num_inv = (isset($_POST['num_inv'])) ? (trim($_POST['num_inv'])) : '';
                    $Cod_dew = (isset($_POST['dewey'])) ? (strtoupper(trim($_POST['dewey']))) : '';
                    $Titolo = (isset($_POST['titolo'])) ? (trim($_POST['titolo'])) : '';
                    $Autore = (isset($_POST['autore'])) ? (ucwords(trim($_POST['autore']))) : '';
                    $Genere = (isset($_POST['genere'])) ? (trim($_POST['genere'])) : '';
                    $Editore = (isset($_POST['editore'])) ? (trim($_POST['editore'])) : '';
                    $Edizione = (isset($_POST['edizione'])) ? (ucwords(trim($_POST['edizione']))) : '';
                    $Collana = (isset($_POST['collana'])) ? (trim($_POST['collana'])) : '';
                    $Scaffale = (isset($_POST['scaffale'])) ? (strtoupper(trim($_POST['scaffale']))) : '';
                    $Formato = (isset($_POST['formato'])) ? (trim($_POST['formato'])) : '';
                    $Note_formato = (isset($_POST['note_formato'])) ? (trim($_POST['note_formato'])) : '';
                    $Pagine = (isset($_POST['pagine'])) ? (trim($_POST['pagine'])) : '';
                    $Data_c = (isset($_POST['data_c'])) ? (trim($_POST['data_c'])) : '';
                    $Novita = (isset($_POST['novita'])) ? ($_POST['novita']) : '';
                    $Costo = (isset($_POST['costo'])) ? (str_replace(",",".",trim($_POST['costo']))) : '';
                    $Provenienza = (isset($_POST['provenienza'])) ? (trim($_POST['provenienza'])) : '';
                    $Lingua_o = (isset($_POST['lingua_o'])) ? ($_POST['lingua_o']) : '';
                    $Titolo_o = (isset($_POST['titolo_o'])) ? (trim($_POST['titolo_o'])) : '';
                    $Traduttore = (isset($_POST['traduttore'])) ? (ucwords(trim($_POST['traduttore']))) : '';
                    $Testo_f = (isset($_POST['testo_f'])) ? ($_POST['testo_f']) : '';
                    $Lingua = (isset($_POST['lingua'])) ? (trim($_POST['lingua'])) : '';
                    $Nazione = (isset($_POST['nazione'])) ? (ucwords(trim($_POST['nazione']))) : '';
                    $Note = (isset($_POST['note'])) ? (trim($_POST['note'])) : '';
                    $Alienato = (isset($_POST['alienato'])) ? (trim($_POST['alienato'])) : '';
                    $Visibile = (isset($_POST['visibile'])) ? (trim($_POST['visibile'])) : '';
		
                    $objCatalog->setIsbn($Isbn);
                    $objCatalog->setSigla_inv($Sigla_inv);
                    $objCatalog->setNum_inv($Num_inv);
                    $objCatalog->setCodice($Cod_dew);
                    $objCatalog->setTitolo($Titolo);
                    $objCatalog->setAutore($Autore);
                    $objCatalog->setGenere($Genere);
                    $objCatalog->setEditore($Editore);
                    $objCatalog->setEdizione($Edizione);
                    (!empty($Collana) ? $objCatalog->setCollana($Collana) : '');
                    $objCatalog->setScaffale($Scaffale);
                    $objCatalog->setFormato($Formato);
                    (!empty($Note_formato) ? $objCatalog->setNote_formato($Note_formato) : '');
                    $objCatalog->setPagine($Pagine);
                    $objCatalog->setDate_catalog($Data_c);
                    $objCatalog->setNovita($Novita);
                    $objCatalog->setCosto($Costo);
                    (!empty($Provenienza) ? $objCatalog->setProvenienza($Provenienza) : '');
                    $objCatalog->setLingua_orig($Lingua_o);
                    $objCatalog->setTitolo_orig($Titolo_o);
                    $objCatalog->setTraduttore($Traduttore);
                    $objCatalog->setTesto_fronte($Testo_f);
                    $objCatalog->setLingua($Lingua);
                    $objCatalog->setNazione($Nazione);
                    (!empty($Note) ? $objCatalog->setNote($Note) : '');
                    $objCatalog->setAlienato($Alienato);
                    $objCatalog->setVisibile($Visibile);
                    $objCatalog->setId_sog_modifica($Id_sog_modifica);

                    #Elimino gli eventuali Campi Salvati in un precedente invio dei dati
                    $objSession->deleteFieldsValueEditCatalog();
                    #Salvo in Variabili di Sessione i Valori inseriti dall'utente
                    $objSession->sec_ISBN = $Isbn;
                    $objSession->sec_PROPRIETA = $Sigla_inv;
                    $objSession->sec_NUMERO_INVENTARIO = $Num_inv;
                    $objSession->sec_CODICE_DEWEY = $Cod_dew;
                    $objSession->sec_TITOLO = $Titolo;
                    $objSession->sec_AUTORE = $Autore;
                    $objSession->sec_GENERE = $Genere;
                    $objSession->sec_EDITORE = $Editore;
                    $objSession->sec_EDIZIONE = $Edizione;
                    $objSession->sec_COLLANA = $Collana;
                    $objSession->sec_SCAFFALE = $Scaffale;
                    $objSession->sec_FORMATO = $Formato;
                    $objSession->sec_NOTE_FORMATO = $Note_formato;
                    $objSession->sec_PAGINE = $Pagine;
                    $objSession->sec_DATA_CATALOGAZIONE = $Data_c;
                    $objSession->sec_NOVITA = $Novita;
                    $objSession->sec_COSTO = $Costo;
                    $objSession->sec_PROVENIENZA = $Provenienza;
                    $objSession->sec_LINGUA_ORIGINALE = $Lingua_o;
                    $objSession->sec_TITOLO_ORIGINALE = $Titolo_o;
                    $objSession->sec_TRADUTTORE = $Traduttore;
                    $objSession->sec_TESTO_FRONTE = $Testo_f;
                    $objSession->sec_LINGUA = $Lingua;
                    $objSession->sec_NAZIONE = $Nazione;
                    $objSession->sec_NOTE = $Note;
                    $objSession->sec_ALIENATO = $Alienato;
                    $objSession->sec_VISIBILE = $Visibile;

                    $Errors_validate = $objCatalog->validate();
                    if(sizeof($Errors_validate) > 0)
                    {
                        foreach ($Errors_validate as $key => $value)
                        {
                            $key_m = 'eec_'.$key;
                            $objSession->$key_m = $Errors_validate[$key];
                        }
                        redirect('./edit_catalog.php?errors=yes&id_catalog='.$Id_catalog);
                        exit();
                    }
                    else
                    {
                        if($objCatalog->Save())
                        {
                            $objSession->deleteFieldsValueEditCatalog();
                            $objSession->deleteErrorsEditCatalog();
                            Cataloguing::AddAutore($objPDO, $Autore);
                            Cataloguing::AddCollana($objPDO, $Collana);
                            Cataloguing::AddEditore($objPDO, $Editore);
                            Cataloguing::AddFormato($objPDO, $Formato);
                            Cataloguing::AddGenere($objPDO, $Genere);
                            Cataloguing::AddNazione($objPDO, $Nazione);
                            Cataloguing::AddScaffale($objPDO, $Scaffale);
                            
                            if($Alienato == "Y") {
                                Utility::AddAlienazione($objPDO, $Id_catalog, $Id_sog_modifica);
                            } else if ($Alienato == "N") {
                                Utility::DeleteAlienazione($objPDO, $Id_catalog);
                            }
                            
                            $Successo = "CATALOGAZIONE MODIFICATA CORRETTAMENTE.";
                            $url = './card_catalog.php?id_catalog='.$objCatalog->getID().'&success_update_c='.urlencode($Successo);
                            redirect($url);
                            exit();
                        } 
                        else 
                        {
                            $Errore = "ERRORE: LA CATALOGAZIONE NON &Egrave; STATA MODIFICATA...RIPROVA.";
                            $url = './edit_catalog.php?error_update='.urlencode($Errore).'&id_catalog='.$Id_catalog;
                            redirect($url);
                            exit();
                        }
                    }
                break;
				
                case 'add_subscriber' :
	
                    #Elimino gli eventuali Campi Salvati in un precedente invio dei dati
                    $objSession->deleteFieldsValueAddSubscriber();
                    #Elimino gli errori effettuati in un precedente invio dei dati
                    $objSession->deleteErrorsAddSubscriber();
                    $Id_sog_modifica = $objUser->getID();
                    $Ora_attuale = date("H:i:s");
                    
                    $Errors_validate  = array();
                    $Errors_validate_t = array();
                    $objSubscriber = new Subscriber($objPDO);
                    
                    $Num_tes = (isset($_POST['num_tes'])) ? ($_POST['num_tes']) : '';
                    $Data_isc = (isset($_POST['data_isc'])) ? (trim($_POST['data_isc'])) : '';
                    $Nome = (isset($_POST['nome'])) ? (ucwords(trim($_POST['nome']))) : '';
                    $Cognome = (isset($_POST['cognome'])) ? (ucwords(trim($_POST['cognome']))) : '';
                    $Sesso = (isset($_POST['sesso'])) ? (trim($_POST['sesso'])) : '';
                    $Data_nas = (isset($_POST['data_nas'])) ? (trim($_POST['data_nas'])) : '';
                    $Professione = (isset($_POST['professione'])) ? (ucfirst(trim($_POST['professione']))) : '';
                    $Indirizzo = (isset($_POST['indirizzo'])) ? (ucwords(trim($_POST['indirizzo']))) : '';
                    $Num_civ = (isset($_POST['num_civ'])) ? (trim($_POST['num_civ'])) : '';
                    $Localita = (isset($_POST['localita'])) ? (strtoupper(trim($_POST['localita']))) : '';
                    $Provincia = (isset($_POST['provincia'])) ? (strtoupper(trim($_POST['provincia']))) : '';
                    $Cap = (isset($_POST['cap'])) ? (trim($_POST['cap'])) : '';
                    $Tel_casa = (isset($_POST['tel_casa'])) ? (trim($_POST['tel_casa'])) : '';
                    $Tel_cell = (isset($_POST['tel_cell'])) ? (trim($_POST['tel_cell'])) : '';
                    $Email = (isset($_POST['email'])) ? (strtolower($_POST['email'])) : '';
                    $Internet = (isset($_POST['internet'])) ? ($_POST['internet']) : '';
                    $Privacy = (isset($_POST['privacy'])) ? ($_POST['privacy']) : '';
                    $Tipo_documento = (isset($_POST['tipo_documento'])) ? (trim($_POST['tipo_documento'])) : '';
                    $Num_documento = (isset($_POST['num_documento'])) ? (strtoupper(trim($_POST['num_documento']))) : '';
                    $Note = (isset($_POST['note'])) ? ($_POST['note']) : '';
                    $Tutore = (isset($_POST['tutore'])) ? (trim($_POST['tutore'])) : '';

		
                    $objSubscriber->setNum_tessera($Num_tes);
                    $objSubscriber->setData_iscrizione($Data_isc);
                    $objSubscriber->setNome($Nome);
                    $objSubscriber->setCognome($Cognome);
                    $objSubscriber->setSesso($Sesso);
                    $objSubscriber->setData_nascita($Data_nas);
                    $objSubscriber->setProfessione($Professione);
                    $objSubscriber->setIndirizzo($Indirizzo);
                    $objSubscriber->setNum_civico($Num_civ);
                    $objSubscriber->setLocalita($Localita);
                    $objSubscriber->setProvincia($Provincia);
                    $objSubscriber->setCap($Cap);
                    (!empty($Tel_casa) ? $objSubscriber->setTel_casa($Tel_casa) : '');
                    (!empty($Tel_cell) ? $objSubscriber->setTel_cell($Tel_cell) : '');
                    (!empty($Email) ? $objSubscriber->setEmail($Email) : '');
                    $objSubscriber->setInternet($Internet);
                    $objSubscriber->setPrivacy($Privacy);
                    (!empty($Tipo_documento) ? $objSubscriber->setTipo_documento($Tipo_documento) : '');
                    (!empty($Num_documento) ? $objSubscriber->setNum_documento($Num_documento) : '');
                    (!empty($Note) ? $objSubscriber->setNote($Note) : '');
                    $objSubscriber->setTutore($Tutore);
                    $objSubscriber->setId_sog_modifica($Id_sog_modifica);
                    
                    if(!empty($Tutore) && $Tutore == "Y")
                    {
                        $objLegalGuardian = new LegalGuardian($objPDO);
                        
                        $Nome_t = (isset($_POST['nome_t'])) ? (ucwords(trim($_POST['nome_t']))) : '';
                        $Cognome_t = (isset($_POST['cognome_t'])) ? (ucwords(trim($_POST['cognome_t']))) : '';
                        $Sesso_t = (isset($_POST['sesso_t'])) ? (trim($_POST['sesso_t'])) : '';
                        $Indirizzo_t = (isset($_POST['indirizzo_t'])) ? (ucwords(trim($_POST['indirizzo_t']))) : '';
                        $Num_civ_t = (isset($_POST['num_civ_t'])) ? (trim($_POST['num_civ_t'])) : '';
                        $Localita_t = (isset($_POST['localita_t'])) ? (strtoupper(trim($_POST['localita_t']))) : '';
                        $Provincia_t = (isset($_POST['provincia_t'])) ? (strtoupper(trim($_POST['provincia_t']))) : '';
                        $Cap_t = (isset($_POST['cap_t'])) ? (trim($_POST['cap_t'])) : '';
                        $Tel_casa_t = (isset($_POST['tel_casa_t'])) ? (trim($_POST['tel_casa_t'])) : '';
                        $Tel_cell_t = (isset($_POST['tel_cell_t'])) ? (trim($_POST['tel_cell_t'])) : '';
                        $Email_t = (isset($_POST['email_t'])) ? (strtolower($_POST['email_t'])) : '';
                        $Tipo_documento_t = (isset($_POST['tipo_documento_t'])) ? (trim($_POST['tipo_documento_t'])) : '';
                        $Num_documento_t = (isset($_POST['num_documento_t'])) ? (strtoupper(trim($_POST['num_documento_t']))) : '';
                        
                        $objLegalGuardian->setNome($Nome_t);
                        $objLegalGuardian->setCognome($Cognome_t);
                        $objLegalGuardian->setSesso($Sesso_t);
                        $objLegalGuardian->setIndirizzo($Indirizzo_t);
                        $objLegalGuardian->setNum_civico($Num_civ_t);
                        $objLegalGuardian->setLocalita($Localita_t);
                        $objLegalGuardian->setProvincia($Provincia_t);
                        $objLegalGuardian->setCap($Cap_t);
                        (!empty($Tel_casa_t) ? $objLegalGuardian->setTel_casa($Tel_casa_t) : '');
                        (!empty($Tel_cell_t) ? $objLegalGuardian->setTel_cell($Tel_cell_t) : '');
                        (!empty($Email_t) ? $objLegalGuardian->setEmail($Email_t) : '');
                        $objLegalGuardian->setTipo_documento($Tipo_documento_t);
                        $objLegalGuardian->setNum_documento($Num_documento_t);
                        $objLegalGuardian->setId_sog_modifica($Id_sog_modifica);
                    }


                    #Salvo in Variabili di Sessione i Valori inseriti dall'utente
                    $objSession->sas_NUMERO_TESSERA = $Num_tes;
                    $objSession->sas_DATA_ISCRIZIONE = $Data_isc;
                    $objSession->sas_NOME = $Nome;
                    $objSession->sas_COGNOME = $Cognome;
                    $objSession->sas_SESSO = $Sesso;
                    $objSession->sas_DATA_NASCITA = $Data_nas;
                    $objSession->sas_PROFESSIONE = $Professione;
                    $objSession->sas_INDIRIZZO = $Indirizzo;
                    $objSession->sas_NUMERO_CIVICO = $Num_civ;
                    $objSession->sas_LOCALITA = $Localita;
                    $objSession->sas_PROVINCIA = $Provincia;
                    $objSession->sas_CAP = $Cap;
                    $objSession->sas_TELEFONO_CASA = $Tel_casa;
                    $objSession->sas_TELEFONO_CELLULARE = $Tel_cell;
                    $objSession->sas_EMAIL = $Email;
                    $objSession->sas_INTERNET = $Internet;
                    $objSession->sas_PRIVACY = $Privacy;
                    $objSession->sas_TIPO_DOCUMENTO = $Tipo_documento;
                    $objSession->sas_NUMERO_DOCUMENTO = $Num_documento;
                    $objSession->sas_NOTE = $Note;
                    $objSession->sas_TUTORE = $Tutore;
                    
                    if(!empty($Tutore) && $Tutore == "Y")
                    {
                        $objSession->sas_NOME_T = $Nome_t;
                        $objSession->sas_COGNOME_T = $Cognome_t;
                        $objSession->sas_SESSO_T = $Sesso_t;
                        $objSession->sas_INDIRIZZO_T = $Indirizzo_t;
                        $objSession->sas_NUMERO_CIVICO_T = $Num_civ_t;
                        $objSession->sas_LOCALITA_T = $Localita_t;
                        $objSession->sas_PROVINCIA_T = $Provincia_t;
                        $objSession->sas_CAP_T = $Cap_t;
                        $objSession->sas_TELEFONO_CASA_T = $Tel_casa_t;
                        $objSession->sas_TELEFONO_CELLULARE_T = $Tel_cell_t;
                        $objSession->sas_EMAIL_T = $Email_t;
                        $objSession->sas_TIPO_DOCUMENTO_T = $Tipo_documento_t;
                        $objSession->sas_NUMERO_DOCUMENTO_T = $Num_documento_t;
                    }

                    //Verifico che i valore dei campi siano corretti
                    $Errors_validate = $objSubscriber->validate();
                    
                    if(!empty($Tutore) && $Tutore == "Y")
                    {
                        //Verifico che i valore dei campi siano corretti
                        $Errors_validate_t = $objLegalGuardian->validate();
                    }
                    if(sizeof($Errors_validate) > 0 || sizeof($Errors_validate_t) > 0)
                    {
                        if(sizeof($Errors_validate) > 0)
                        {
                            foreach ($Errors_validate as $key => $value)
                            {
                                $key_m = 'eas_'.$key;
                                $objSession->$key_m = $Errors_validate[$key];
                            }
                        }
                        if(sizeof($Errors_validate_t) > 0)
                        {
                            foreach ($Errors_validate_t as $key => $value)
                            {
                                $key_m = 'eas_'.$key;
                                $objSession->$key_m = $Errors_validate_t[$key];
                            }
                        }
                        redirect('./add_subscriber.php?errors=yes');
                        exit();
                    }
                    else
                    {
                        $objSubscriber->setData_iscrizione($Data_isc." ".$Ora_attuale);
                        if($objSubscriber->Save())
                        {
                            Subscriber::AddProfessione($objPDO, $Professione);
                            Subscriber::AddLocalita($objPDO, $Localita, $Cap, $Provincia);
                            Subscriber::AddIndirizzo($objPDO, $Indirizzo);
                            
                            if(!empty($Tutore) && $Tutore == "Y")
                            {
                                $objLegalGuardian->setId_iscritto($objSubscriber->getID());
                                if($objLegalGuardian->Save())
                                {
                                    #Elimino gli eventuali Campi Salvati in un precedente invio dei dati
                                    $objSession->deleteFieldsValueAddSubscriber();
                                    #Elimino gli errori effettuati in un precedente invio dei dati
                                    $objSession->deleteErrorsAddSubscriber();
                                    $Successo = "ISCRITTO AGGIUNTO CORRETTAMENTE.";
                                    $url = './card_subscriber.php?id_iscritto='.$objSubscriber->getID().'&success_add_i='.urlencode($Successo);
                                    redirect($url);
                                    exit();
                                }
                                else
                                {
                                    $Errore = "ERRORE: IL TUTORE DELL'ISCRITTO NON &Egrave; STATO AGGIUNTO...RIPROVA.";
                                    $url = './add_subscriber.php?error_add_t='.urlencode($Errore);
                                    redirect($url);
                                    exit();
                                }
                            }
                            else
                            {
                                #Elimino gli eventuali Campi Salvati in un precedente invio dei dati
                                $objSession->deleteFieldsValueAddSubscriber();
                                #Elimino gli errori effettuati in un precedente invio dei dati
                                $objSession->deleteErrorsAddSubscriber();
                                $Successo = "ISCRITTO AGGIUNTO CORRETTAMENTE.";
                                $url = './card_subscriber.php?id_iscritto='.$objSubscriber->getID().'&success_add_i='.urlencode($Successo);
                                redirect($url);
                                exit();
                            }
                        } 
                        else 
                        {
                            $Errore = "ERRORE: L'ISCRITTO NON &Egrave; STATO AGGIUNTO...RIPROVA.";
                            $url = './add_subscriber.php?error_add='.urlencode($Errore);
                            redirect($url);
                            exit();
                        }
                    }
                break;
                
                case 'edit_subscriber' :
                    
                    if(isset($_POST["id_iscritto"]) && isset($_POST["num_tes"]))
                    {
                        $Id_iscritto = $_POST["id_iscritto"];
                        $Num_tes = $_POST["num_tes"];
                    }
                    else
                    {
                        redirect("access.php");
                        exit();
                    }
                    
                    #Elimino gli eventuali Campi Salvati in un precedente invio dei dati
                    $objSession->deleteFieldsValueEditSubscriber();
                    #Elimino gli errori effettuati in un precedente invio dei dati
                    $objSession->deleteErrorsEditSubscriber();
                    $Id_sog_modifica = $objUser->getID();
                    $Ora_attuale = date("H:i:s");
                    
                    $Errors_validate = array();
                    $Errors_validate_t = array();
                    $objSubscriber = new Subscriber($objPDO,$Id_iscritto);
                    
                    $Data_isc = (isset($_POST['data_isc'])) ? (trim($_POST['data_isc'])) : '';
                    $Nome = (isset($_POST['nome'])) ? (ucwords(trim($_POST['nome']))) : '';
                    $Cognome = (isset($_POST['cognome'])) ? (ucwords(trim($_POST['cognome']))) : '';
                    $Sesso = (isset($_POST['sesso'])) ? (trim($_POST['sesso'])) : '';
                    $Data_nas = (isset($_POST['data_nas'])) ? (trim($_POST['data_nas'])) : '';
                    $Professione = (isset($_POST['professione'])) ? (ucfirst(trim($_POST['professione']))) : '';
                    $Indirizzo = (isset($_POST['indirizzo'])) ? (ucwords(trim($_POST['indirizzo']))) : '';
                    $Num_civ = (isset($_POST['num_civ'])) ? (trim($_POST['num_civ'])) : '';
                    $Localita = (isset($_POST['localita'])) ? (strtoupper(trim($_POST['localita']))) : '';
                    $Provincia = (isset($_POST['provincia'])) ? (strtoupper(trim($_POST['provincia']))) : '';
                    $Cap = (isset($_POST['cap'])) ? (trim($_POST['cap'])) : '';
                    $Tel_casa = (isset($_POST['tel_casa'])) ? (trim($_POST['tel_casa'])) : '';
                    $Tel_cell = (isset($_POST['tel_cell'])) ? (trim($_POST['tel_cell'])) : '';
                    $Email = (isset($_POST['email'])) ? (strtolower($_POST['email'])) : '';
                    $Internet = (isset($_POST['internet'])) ? ($_POST['internet']) : '';
                    $Privacy = (isset($_POST['privacy'])) ? ($_POST['privacy']) : '';
                    $Tipo_documento = (isset($_POST['tipo_documento'])) ? (trim($_POST['tipo_documento'])) : '';
                    $Num_documento = (isset($_POST['num_documento'])) ? (strtoupper(trim($_POST['num_documento']))) : '';
                    $Note = (isset($_POST['note'])) ? ($_POST['note']) : '';
                    $Deceduto = (isset($_POST['deceduto'])) ? ($_POST['deceduto']) : '';
                    $Tutore = (isset($_POST['tutore'])) ? (trim($_POST['tutore'])) : '';
                    
                    $objSubscriber->setNum_tessera($Num_tes);
                    $objSubscriber->setData_iscrizione($Data_isc);
                    $objSubscriber->setNome($Nome);
                    $objSubscriber->setCognome($Cognome);
                    $objSubscriber->setSesso($Sesso);
                    $objSubscriber->setData_nascita($Data_nas);
                    $objSubscriber->setProfessione($Professione);
                    $objSubscriber->setIndirizzo($Indirizzo);
                    $objSubscriber->setNum_civico($Num_civ);
                    $objSubscriber->setLocalita($Localita);
                    $objSubscriber->setProvincia($Provincia);
                    $objSubscriber->setCap($Cap);
                    (!empty($Tel_casa) ? $objSubscriber->setTel_casa($Tel_casa) : '');
                    (!empty($Tel_cell) ? $objSubscriber->setTel_cell($Tel_cell) : '');
                    (!empty($Email) ? $objSubscriber->setEmail($Email) : '');
                    $objSubscriber->setInternet($Internet);
                    $objSubscriber->setPrivacy($Privacy);
                    (!empty($Tipo_documento) ? $objSubscriber->setTipo_documento($Tipo_documento) : '');
                    (!empty($Num_documento) ? $objSubscriber->setNum_documento($Num_documento) : '');
                    (!empty($Note) ? $objSubscriber->setNote($Note) : '');
                    $objSubscriber->setDeceduto($Deceduto);
                    $objSubscriber->setTutore($Tutore);
                    $objSubscriber->setId_sog_modifica($Id_sog_modifica);
                                                            
                    if(!empty($Tutore) && $Tutore == "Y")
                    {
                        $Id_tutore = LegalGuardian::GetIdLegalGuardian($objPDO, $Id_iscritto);
                        if(count($Id_tutore) == 1) {
                            $objLegalGuardian = new LegalGuardian($objPDO,$Id_tutore);
                        } else {
                            $objLegalGuardian = new LegalGuardian($objPDO);
                            $objLegalGuardian->setId_iscritto($Id_iscritto);
                        }
                        
                        $Nome_t = (isset($_POST['nome_t'])) ? (ucwords(trim($_POST['nome_t']))) : '';
                        $Cognome_t = (isset($_POST['cognome_t'])) ? (ucwords(trim($_POST['cognome_t']))) : '';
                        $Sesso_t = (isset($_POST['sesso_t'])) ? (trim($_POST['sesso_t'])) : '';
                        $Indirizzo_t = (isset($_POST['indirizzo_t'])) ? (ucwords(trim($_POST['indirizzo_t']))) : '';
                        $Num_civ_t = (isset($_POST['num_civ_t'])) ? (trim($_POST['num_civ_t'])) : '';
                        $Localita_t = (isset($_POST['localita_t'])) ? (strtoupper(trim($_POST['localita_t']))) : '';
                        $Provincia_t = (isset($_POST['provincia_t'])) ? (strtoupper(trim($_POST['provincia_t']))) : '';
                        $Cap_t = (isset($_POST['cap_t'])) ? (trim($_POST['cap_t'])) : '';
                        $Tel_casa_t = (isset($_POST['tel_casa_t'])) ? (trim($_POST['tel_casa_t'])) : '';
                        $Tel_cell_t = (isset($_POST['tel_cell_t'])) ? (trim($_POST['tel_cell_t'])) : '';
                        $Email_t = (isset($_POST['email_t'])) ? (strtolower($_POST['email_t'])) : '';
                        $Tipo_documento_t = (isset($_POST['tipo_documento_t'])) ? (trim($_POST['tipo_documento_t'])) : '';
                        $Num_documento_t = (isset($_POST['num_documento_t'])) ? (strtoupper(trim($_POST['num_documento_t']))) : '';
                        
                        
                        $objLegalGuardian->setNome($Nome_t);
                        $objLegalGuardian->setCognome($Cognome_t);
                        $objLegalGuardian->setSesso($Sesso_t);
                        $objLegalGuardian->setIndirizzo($Indirizzo_t);
                        $objLegalGuardian->setNum_civico($Num_civ_t);
                        $objLegalGuardian->setLocalita($Localita_t);
                        $objLegalGuardian->setProvincia($Provincia_t);
                        $objLegalGuardian->setCap($Cap_t);
                        (!empty($Tel_casa_t) ? $objLegalGuardian->setTel_casa($Tel_casa_t) : '');
                        (!empty($Tel_cell_t) ? $objLegalGuardian->setTel_cell($Tel_cell_t) : '');
                        (!empty($Email_t) ? $objLegalGuardian->setEmail($Email_t) : '');
                        $objLegalGuardian->setTipo_documento($Tipo_documento_t);
                        $objLegalGuardian->setNum_documento($Num_documento_t);
                        $objLegalGuardian->setId_sog_modifica($Id_sog_modifica);

                    }
                    

                    #Salvo in Variabili di Sessione i Valori inseriti dall'utente
                    $objSession->ses_NUMERO_TESSERA = $Num_tes;
                    $objSession->ses_DATA_ISCRIZIONE = $Data_isc;
                    $objSession->ses_NOME = $Nome;
                    $objSession->ses_COGNOME = $Cognome;
                    $objSession->ses_SESSO = $Sesso;
                    $objSession->ses_DATA_NASCITA = $Data_nas;
                    $objSession->ses_PROFESSIONE = $Professione;
                    $objSession->ses_INDIRIZZO = $Indirizzo;
                    $objSession->ses_NUMERO_CIVICO = $Num_civ;
                    $objSession->ses_LOCALITA = $Localita;
                    $objSession->ses_PROVINCIA = $Provincia;
                    $objSession->ses_CAP = $Cap;
                    $objSession->ses_TELEFONO_CASA = $Tel_casa;
                    $objSession->ses_TELEFONO_CELLULARE = $Tel_cell;
                    $objSession->ses_EMAIL = $Email;
                    $objSession->ses_INTERNET = $Internet;
                    $objSession->ses_PRIVACY = $Privacy;
                    $objSession->ses_TIPO_DOCUMENTO = $Tipo_documento;
                    $objSession->ses_NUMERO_DOCUMENTO = $Num_documento;
                    $objSession->ses_NOTE = $Note;
                    $objSession->ses_DECEDUTO = $Deceduto;
                    $objSession->ses_TUTORE = $Tutore;
                    
                    if(!empty($Tutore) && $Tutore == "Y")
                    {
                        $objSession->ses_NOME_T = $Nome_t;
                        $objSession->ses_COGNOME_T = $Cognome_t;
                        $objSession->ses_SESSO_T = $Sesso_t;
                        $objSession->ses_INDIRIZZO_T = $Indirizzo_t;
                        $objSession->ses_NUMERO_CIVICO_T = $Num_civ_t;
                        $objSession->ses_LOCALITA_T = $Localita_t;
                        $objSession->ses_PROVINCIA_T = $Provincia_t;
                        $objSession->ses_CAP_T = $Cap_t;
                        $objSession->ses_TELEFONO_CASA_T = $Tel_casa_t;
                        $objSession->ses_TELEFONO_CELLULARE_T = $Tel_cell_t;
                        $objSession->ses_EMAIL_T = $Email_t;
                        $objSession->ses_TIPO_DOCUMENTO_T = $Tipo_documento_t;
                        $objSession->ses_NUMERO_DOCUMENTO_T = $Num_documento_t;
                    }
                    
                    //Verifico che i valore dei campi siano corretti
                    $Errors_validate = $objSubscriber->validate();
                    
                    if(!empty($Tutore) && $Tutore == "Y")
                    {
                        $Errors_validate_t = $objLegalGuardian->validate();
                    }
                    if(sizeof($Errors_validate) > 0 || sizeof($Errors_validate_t) > 0)
                    {
                        if(sizeof($Errors_validate) > 0)
                        {
                            foreach ($Errors_validate as $key => $value)
                            {
                                $key_m = 'ees_'.$key;
                                $objSession->$key_m = $Errors_validate[$key];
                            }
                        }
                        if(sizeof($Errors_validate_t) > 0)
                        {
                            foreach ($Errors_validate_t as $key => $value)
                            {
                                $key_m = 'ees_'.$key;
                                $objSession->$key_m = $Errors_validate_t[$key];
                            }
                        }
                        redirect('./edit_subscriber.php?errors=yes&id_iscritto='.$Id_iscritto);
                        exit();
                    }
                    else
                    {
                        $objSubscriber->setData_iscrizione($Data_isc." ".$Ora_attuale);

                        if($objSubscriber->Save())
                        {
                            Subscriber::AddProfessione($objPDO, $Professione);
                            Subscriber::AddLocalita($objPDO, $Localita, $Cap, $Provincia);
                            Subscriber::AddIndirizzo($objPDO, $Indirizzo);
                            
                            if(!empty($Tutore) && $Tutore == "Y")
                            {
                                if($objLegalGuardian->Save())
                                {
                                    #Elimino gli eventuali Campi Salvati in un precedente invio dei dati
                                    $objSession->deleteFieldsValueEditSubscriber();
                                    #Elimino gli errori effettuati in un precedente invio dei dati
                                    $objSession->deleteErrorsEditSubscriber();
                                    $Successo = "ISCRITTO MODIFICATO CORRETTAMENTE.";
                                    $url = './card_subscriber.php?id_iscritto='.$objSubscriber->getID().'&success_update_i='.urlencode($Successo);
                                    redirect($url);
                                    exit();
                                }
                                else
                                {
                                    $Errore = "ERRORE: IL TUTORE DELL'ISCRITTO NON &Egrave; STATO MODIFICATO...RIPROVA.";
                                    $url = './edit_subscriber.php?error_update_t='.urlencode($Errore).'&id_iscritto='.$Id_iscritto;
                                    redirect($url);
                                    exit();
                                }
                            }
                            else
                            {
                                #Elimino gli eventuali Campi Salvati in un precedente invio dei dati
                                $objSession->deleteFieldsValueEditSubscriber();
                                #Elimino gli errori effettuati in un precedente invio dei dati
                                $objSession->deleteErrorsEditSubscriber();
                                $Successo = "ISCRITTO MODIFICATO CORRETTAMENTE.";
                                $url = './card_subscriber.php?id_iscritto='.$objSubscriber->getID().'&success_update_i='.urlencode($Successo);
                                redirect($url);
                                exit();
                            }
                        } 
                        else 
                        {
                            $Errore = "ERRORE: L'ISCRITTO NON &Egrave; STATO MODIFICATO...RIPROVA.";
                            $url = './edit_subscriber.php?error_update='.urlencode($Errore).'&id_iscritto='.$Id_iscritto;
                            redirect($url);
                            exit();
                        }
                    }
                break;
		
                case 'add_loan':
                    
                    #Elimino gli eventuali Campi Salvati in un precedente invio dei dati
                    $objSession->deleteFieldsValueLoan();
                    #Elimino gli errori effettuati in un precedente invio dei dati
                    $objSession->deleteErrorsLoan();
                    
                    $Errors = array();
                    $Errors_validate = array();
                    $objLoan = new Loan($objPDO);
                    
                    $Isbn_p = (isset($_POST['isbn_p'])) ? ($_POST['isbn_p']) : '';
                    $Sigla_inv_p = (isset($_POST['proprieta_p'])) ? ($_POST['proprieta_p']) : '';
                    $Num_inv_p = (isset($_POST['num_inv_p'])) ? (trim($_POST['num_inv_p'])) : '';
                    $Num_tes_p = (isset($_POST['num_tes_p'])) ? (trim($_POST['num_tes_p'])) : '';
                    $Data_pres_p = (isset($_POST['data_pres_p'])) ? trim($_POST['data_pres_p']) : '';
                    
                    if(!empty($Isbn_p)) {
                        $Id_catalog = Cataloguing::GetIdCataloguingFromISBN($objPDO, $Isbn_p);
                        if($Id_catalog != 0)
                        {
                            $objLoan->setId_catalog($Id_catalog);
                        }
                        else
                        {
                            $Errors['el_CATALOGAZIONE'] = "Non esiste una CATALOGAZIONE con questo codice ISBN.";
                        }
                    } else {

                        if(!empty($Sigla_inv_p) && !empty($Num_inv_p))
                        {
                            $Id_catalog = Cataloguing::GetIdCataloguing($objPDO, $Sigla_inv_p, $Num_inv_p);
                            if($Id_catalog != 0)
                            {
                                $objLoan->setId_catalog($Id_catalog);
                            }
                            else
                            {
                                $Errors['el_CATALOGAZIONE'] = "Non esiste una CATALOGAZIONE con la PROPRIET&Agrave; ed il NUMERO DI INVENTARIO che sono stati scelti.";
                            }
                        }
                        else
                        {
                            if(empty($Sigla_inv_p))
                            {
                                $Errors['el_SIGLA_INVENTARIO'] = "&Egrave; obbligatorio scegliere la PROPRIET&Agrave;.";
                            }
                            if(empty($Num_inv_p))
                            {
                                $Errors['el_NUMERO_INVENTARIO'] = "&Egrave; obbligatorio inserire il NUMERO DI INVENTARIO.";
                            }
                        }
                    }
                    if(!empty($Num_tes_p))
                    {
                        $Id_iscritto = Subscriber::GetIdSubscriber($objPDO, $Num_tes_p);
                        if($Id_iscritto != 0)
                        {
                            $objLoan->setId_iscritto($Id_iscritto);
                        }
                        else
                        {
                            $Errors['el_ISCRITTO'] = "Non esiste nessun ISCRITTO con il NUMERO DI TESSERA scelto.";
                        }
                    }
                    else
                    {
                        $Errors['el_NUMERO_TESSERA'] = "&Egrave; obbligatorio inserire il NUMERO DELLA TESSERA.";
                    }
                    if(!empty($Data_pres_p))
                    {
                        $objLoan->setDate_pres($Data_pres_p);
                    }
                    else
                    {
                        $Errors['el_DATA_PRESTITO'] = "&Egrave; obbligatorio inserire la DATA DEL PRESTITO.";
                    }
                    
                    #Salvo in Variabili di Sessione i Valori inseriti dall'utente
                    $objSession->sl_ISBN = $Isbn_p;
                    $objSession->sl_SIGLA_INVENTARIO = $Sigla_inv_p;
                    $objSession->sl_NUMERO_INVENTARIO = $Num_inv_p;
                    $objSession->sl_NUMERO_TESSERA = $Num_tes_p;
                    $objSession->sl_DATA_PRESTITO = $Data_pres_p;
                    
                    if(sizeof($Errors) > 0)
                    {
                        foreach($Errors as $key => $value)
                        {
                            $objSession->$key = $Errors[$key];
                        }
                        redirect('./add_loan.php?errors=yes');
                        exit();
                    }
                    else
                    {
                        $objCatalog = new Cataloguing($objPDO,$Id_catalog);
                        $objSubscriber = new Subscriber($objPDO,$Id_iscritto);
                        
                        //Controllo se la Catalogazione è già in prestito
                        if(Loan::ControlIfLent($objPDO, $Id_catalog))
                        {
                            redirect("./add_loan.php?loan=lent");
                            exit();
                        }
                        //Controllo se l'utente è sospeso
                        if($objSubscriber->getSospeso() == "Y")
                        {
                            redirect("./add_loan.php?subscriber=suspended");
                            exit(); 
                        }
                        //Controllo se l'utente (escludendo le SCUOLE) ha già tre prestiti in quel caso non è più possibile prestare CATALOGAZIONI
                        if($objSubscriber->getName() != "Scuola Elementare" && $objSubscriber->getName() != "Scuola Materna" && Loan::ControlNumberLents($objPDO, $Id_iscritto) >= 3)
                        {
                            redirect("./add_loan.php?loan=limit");
                            exit();
                        }
                        
                        $Data_pres_v_p = explode('-',$Data_pres_p);
                        $Ora = date('H:i:s');
                        $Ora = explode(":",$Ora);
                        $Data_pres_u_p = mktime($Ora[0],$Ora[1],$Ora[2],$Data_pres_v_p[1],$Data_pres_v_p[2],$Data_pres_v_p[0]);
                        $Data_pres_p_ok = date('Y-m-d H:i:s',$Data_pres_u_p);
                        $ini_cod = substr($objCatalog->getCodice(),0,1);
                        if($ini_cod == "C" || $ini_cod == "D" || $ini_cod == "V") {
                            $Data_res_u_p = mktime($Ora[0],$Ora[1],$Ora[2],$Data_pres_v_p[1],$Data_pres_v_p[2]+7,$Data_pres_v_p[0]);				
                        } else {
                            $Data_res_u_p = mktime($Ora[0],$Ora[1],$Ora[2],$Data_pres_v_p[1],$Data_pres_v_p[2]+30,$Data_pres_v_p[0]);				
                        }
                        $Data_res_p_ok = date('Y-m-d H:i:s',$Data_res_u_p);

                        $objLoan->setId_catalog($Id_catalog);
                        $objLoan->setId_iscritto($Id_iscritto);
                        $objLoan->setDate_pres($Data_pres_p_ok);
                        $objLoan->setDate_res($Data_res_p_ok);
                        $objLoan->setResa("N");
                        $objLoan->setId_sog_modifica($objUser->getID());
                        
                        $Errors_validate = $objLoan->validate();
                        if($Errors_validate > 0)
                        {
                            foreach ($Errors_validate as $key => $value)
                            {
                                $key_m = 'el_'.$key;
                                $objSession->$key_m = $Errors_validate[$key];
                            }
                            redirect('./add_loan.php?errors=yes');
                            exit();
                        }
                        else
                        {
                            #Elimino gli eventuali Campi Salvati in un precedente invio dei dati e gli Errori
                            $objSession->deleteFieldsValueLoan();                            
                            $objSession->deleteErrorsLoan();
                            $objLoan->Save();
                            redirect('./add_loan.php?num_tes='.$Num_tes_p.'&data_pres='.$Data_pres_p.'&loan=success');
                            exit();
                        }
                    }
                break;
                
                case 'sospendi':
                    if(isset($_GET['id_iscritto']) && !empty($_GET['id_iscritto']))
                    {
                        $Id_iscritto = trim($_GET['id_iscritto']);
                        $Id_user = $objUser->getID();
                        if(Utility::AddSospensione($objPDO, $Id_iscritto, $Id_user))
                        {
                            if(Utility::UpdateSospensione($objPDO, $Id_iscritto, $Id_user))
                            {
                                $successo = "SOSPENSIONE ISCRITTO AVVENUTA CORRETTAMENTE.";
                                redirect('./card_subscriber.php?success_suspended='.urlencode($successo).'&id_iscritto='.$Id_iscritto);
                                exit();
                            }
                            else
                            {
                                $Errore = "ERRORE: AGGIORNAMENTO SOSPENSIONE NON AVVENUTO...RIPROVA.";
                                redirect('./card_subscriber.php?error_update_suspended='.urlencode($Errore).'&id_iscritto='.$Id_iscritto);
                                exit();
                            }
                        }
                        else
                        {
                            $Errore = "ERRORE: AGGIUNTA SOSPENSIONE NON AVVENUTA...RIPROVA.";
                            redirect('./card_subscriber.php?error_suspended='.urlencode($Errore).'&id_iscritto='.$Id_iscritto);
                            exit();                           
                        }
                    } else {
                        redirect('./index.php');
                        exit();
                    }
                break;
                
                case 'riammetti':
                    if(isset($_GET['id_iscritto']) && !empty($_GET['id_iscritto']))
                    {
                        $Id_iscritto = trim($_GET['id_iscritto']);
                        $Id_user = $objUser->getID();
                        if(Utility::AddRiammissione($objPDO, $Id_iscritto, $Id_user))
                        {
                            if(Utility::UpdateRiammissione($objPDO, $Id_iscritto, $Id_user))
                            {
                                $successo = "RIAMMISSIONE ISCRITTO AVVENUTA CORRETTAMENTE.";
                                redirect('./card_subscriber.php?success_readmission='.urlencode($successo).'&id_iscritto='.$Id_iscritto);
                                exit();
                            }
                            else
                            {
                                $Errore = "ERRORE: AGGIORNAMENTO RIAMMISSIONE NON AVVENUTA...RIPROVA.";
                                redirect('./card_subscriber.php?error_update_readmission='.urlencode($Errore).'&id_iscritto='.$Id_iscritto);
                                exit();
                            }
                        }
                        else
                        {
                           $Errore = "ERRORE: RIAMMISSIONE NON AVVENUTA...RIPROVA.";
                            redirect('./card_subscriber.php?error_readmission='.urlencode($Errore).'&id_iscritto='.$Id_iscritto);
                            exit();
                        }
                    } else {
                        redirect('./index.php');
                        exit();
                    }
                break;
                
                case 'socio':
                    if(isset($_GET['id_iscritto']) && !empty($_GET['id_iscritto']) && isset($_GET['anno_socio']) && !empty($_GET['anno_socio'])) {
                        $Id_iscritto = trim($_GET['id_iscritto']);
                        $Anno_socio = trim($_GET['anno_socio']);
                        $Id_user = $objUser->getID();
                        if(Utility::ControlSocioAnno($objPDO, $Id_iscritto, $Anno_socio) == 0)
                        {
                            if(Utility::AddSocioAnno($objPDO, $Id_iscritto, $Anno_socio,$Id_user))
                            {
                                $successo = urlencode("1");
                                echo $successo;
                                exit();
                            }
                            else
                            {
                                $errore = urlencode("0");
                                echo $errore;
                                exit();                                
                            }
                        }
                        else
                        {
                            $informazione = urlencode($Anno_socio);
                            echo $informazione;
                            exit();                                 
                        }
                    } else {
                        redirect('./index.php');
                        exit();
                    }
                break;
                
                case 'eli_socio':
                    if(isset($_GET['id_iscritto']) && !empty($_GET['id_iscritto']) && isset($_GET['anno_socio']) && !empty($_GET['anno_socio'])) {
                        $Id_iscritto = trim($_GET['id_iscritto']);
                        $Anno_socio = trim($_GET['anno_socio']);
                        if(Utility::DeleteSocioAnno($objPDO, $Id_iscritto, $Anno_socio))
                        {
                            $successo = urlencode("Eliminazione socio per l'anno ".$Anno_socio." avvenuta correttamente.");
                            redirect('./card_subscriber.php?info_socio='.$successo.'&id_iscritto='.$Id_iscritto);
                            exit();
                        }
                    } else {
                        redirect('./index.php');
                        exit();
                    }
                break;
                
                case "rinnova":
                    if(isset($_GET['id_catalog']) && !empty($_GET['id_catalog']) && isset($_GET['id_iscritto']) && !empty($_GET['id_iscritto']) && isset($_GET['id_prestito']) && !empty($_GET['id_prestito'])) {
                        $Id_catalogazione = trim($_GET['id_catalog']);
                        $Id_iscritto = trim($_GET['id_iscritto']);
                        $Id_prestito = trim($_GET['id_prestito']);
                    } else {
                        redirect('./index.php');
                        exit();
                    }
                    $objLoan = new Loan($objPDO, $Id_prestito);
                    $objSubscriber = new Subscriber($objPDO, $Id_iscritto);
                    $objCatalog = new Cataloguing($objPDO, $Id_catalogazione);
                    $datetime = date('Y-m-d H:i:s');
                    if($objSubscriber->getSospeso() == "Y")
                    {
                        $Error = "L'UTENTE &Egrave; SOSPESO PER CUI NON &Egrave; POSSIBILE RINNOVARE IL PRESTITO.";
                        $url = './card_subscriber.php?id_iscritto='.$Id_iscritto.'&error_renewed='.urlencode($Error);					
                        redirect($url);
                        exit();
                    }
                    else
                    {
                        if($objSubscriber->getNome() != "Scuola Elementare" && $objSubscriber->getNome() != "Scuola Materna")
                        {
                            if($objCatalog->getNovita() == "Y")
                            {
                                $Error = "QUESTO PRESTITO NON PU&Ograve; ESSERE RINNOVATO PERCH&Egrave; SI TRATTA DI UNA NOVIT&Agrave;.";
                                $url = './card_subscriber.php?id_iscritto='.$Id_iscritto.'&error_news='.urlencode($Error);					
                                redirect($url);
                                exit();
                            }
                            else
                            {
                                $date_pres = $objLoan->getDate_pres();
                                $date_res = $objLoan->getDate_res();
                                $date_pres_v = explode(' ',$date_pres);
                                $date_pres_u_v = explode('-',$date_pres_v[0]);
                                $date_pres_u = mktime(0,0,0,$date_pres_u_v[1],$date_pres_u_v[2],$date_pres_u_v[0]);
                                $date_res_v = explode(' ',$date_res);
                                $date_res_u_v = explode('-',$date_res_v[0]);			
                                $date_res_u = mktime(0,0,0,$date_res_u_v[1],$date_res_u_v[2],$date_res_u_v[0]);
                                $controllo = ($date_res_u-$date_pres_u)/(60*60*24);
                                
                                if(substr($objCatalog->getCodice(),0,1) == "C" || substr($objCatalog->getCodice(),0,1) == "D" || substr($objCatalog->getCodice(),0,1) == "V")
                                {
                                    if($controllo > 9)
                                    {
                                        $Error = "QUESTO PRESTITO NON PU&Ograve; PI&Ugrave; ESSERE RINNOVATO.";
                                        $url = './card_subscriber.php?id_iscritto='.$Id_iscritto.'&error_renewal='.urlencode($Error);					
                                        redirect($url);
                                        exit();
                                    }
                                    else
                                    {
                                        $Ora = explode(":",$date_pres_v[1]);
                                        $Date_Res_u_p = mktime($Ora[0],$Ora[1],$Ora[2],$date_res_u_v[1],$date_res_u_v[2]+7,$date_res_u_v[0]);				
                                        $Date_Res_p = date('Y-m-d H:i:s',$Date_Res_u_p);
                                        $objLoan->setDate_res($Date_Res_p);
                                        $objLoan->setDate_modifica($datetime);
                                        $objLoan->setId_sog_modifica($objUser->getID());
                                        $objLoan->Save();
                                        $successo = "IL RINNOVO DI QUESTO PRESTITO &Egrave; AVVENUTO CORRETTAMENTE.";
                                        $url = './card_subscriber.php?id_iscritto='.$Id_iscritto.'&success_renewal='.urlencode($successo);					
                                        redirect($url);
                                        exit();
                                    }
                                }
                                else
                                {
                                    if($controllo > 35)
                                    {
                                        $Error = "QUESTO PRESTITO NON PU&Ograve; PI&Ugrave; ESSERE RINNOVATO.";
                                        $url = './card_subscriber.php?id_iscritto='.$Id_iscritto.'&error_renewal_no='.urlencode($Error);					
                                        redirect($url);
                                        exit();
                                    }
                                    else
                                    {
                                        $Ora = explode(":",$date_pres_v[1]);
                                        $Date_Res_u_p = mktime($Ora[0],$Ora[1],$Ora[2],$date_res_u_v[1],$date_res_u_v[2]+30,$date_res_u_v[0]);				
                                        $Date_Res_p = date('Y-m-d H:i:s',$Date_Res_u_p);
                                        $objLoan->setDate_res($Date_Res_p);
                                        $objLoan->setDate_modifica($datetime);
                                        $objLoan->setId_sog_modifica($objUser->getID());
                                        $objLoan->Save();
                                        $successo = "IL RINNOVO DI QUESTO PRESTITO &Egrave; AVVENUTO CORRETTAMENTE.";
                                        $url = './card_subscriber.php?id_iscritto='.$Id_iscritto.'&success_renewal='.urlencode($successo);					
                                        redirect($url);
                                        exit();
                                    }
                                }
                            }
                        }
                        else
                        {
                            $date_pres = $objLoan->getDate_pres();
                            $date_res = $objLoan->getDate_res();
                            $date_pres_v = explode(' ',$date_pres);
                            $date_pres_u_v = explode('-',$date_pres_v[0]);
                            $date_pres_u = mktime(0,0,0,$date_pres_u_v[1],$date_pres_u_v[2],$date_pres_u_v[0]);
                            $date_res_v = explode(' ',$date_res);
                            $date_res_u_v = explode('-',$date_res_v[0]);			
                            $date_res_u = mktime(0,0,0,$date_res_u_v[1],$date_res_u_v[2],$date_res_u_v[0]);
                            if(substr($objCatalog->getCodice(),0,1) == "C" || substr($objCatalog->getCodice(),0,1) == "D" || substr($objCatalog->getCodice(),0,1) == "V")
                            {
                                $Ora = explode(":",$date_pres_v[1]);
                                $Date_Res_u_p = mktime($Ora[0],$Ora[1],$Ora[2],$date_res_u_v[1],$date_res_u_v[2]+7,$date_res_u_v[0]);				
                                $Date_Res_p = date('Y-m-d H:i:s',$Date_Res_u_p);
                                $objLoan->setDate_res($Date_Res_p);
                                $objLoan->setDate_modifica($datetime);
                                $objLoan->setId_sog_modifica($objUser->getID());
                                $objLoan->Save();
                                $successo = urlencode("IL RINNOVO DI QUESTO PRESTITO &Egrave; AVVENUTO CORRETTAMENTE.");
                                redirect('./card_subscriber.php?success_renewal='.urlencode($successo).'&id_iscritto='.$id_iscritto);
                                exit();
                            }
                            else
                            {
                                $Ora = explode(":",$date_pres_v[1]);
                                $Date_Res_u_p = mktime($Ora[0],$Ora[1],$Ora[2],$date_res_u_v[1],$date_res_u_v[2]+30,$date_res_u_v[0]);				
                                $Date_Res_p = date('Y-m-d H:i:s',$Date_Res_u_p);
                                $objLoan->setDate_res($Date_Res_p);
                                $objLoan->setDate_modifica($datetime);
                                $objLoan->setId_sog_modifica($objUser->getID());
                                $objLoan->Save();
                                $successo = urlencode("IL RINNOVO DI QUESTO PRESTITO &Egrave; AVVENUTO CORRETTAMENTE.");
                                redirect('./card_subscriber.php?success_renewal='.urlencode($successo).'&id_iscritto='.$id_iscritto);
                                exit();
                            }
                        }
                    }
                break;
                
                case "restituisce":
                    $Date_restituzione = date("Y-m-d H:i:s");
                    $Date_modifica = $Date_restituzione;
                    if(isset($_GET['id_catalog']) && !empty($_GET['id_catalog']) && isset($_GET['id_iscritto']) && !empty($_GET['id_iscritto']) && isset($_GET['id_prestito']) && !empty($_GET['id_prestito'])) {
                        $Id_catalogazione = trim($_GET['id_catalog']);
                        $Id_iscritto = trim($_GET['id_iscritto']);
                        $Id_prestito = trim($_GET['id_prestito']);
                    }
                    else
                    {
                        redirect('./index.php');
                        exit();
                    }
                    $objLoan = new Loan($objPDO, $Id_prestito);
                    if($Id_catalogazione == $objLoan->getId_catalog() && $Id_iscritto == $objLoan->getId_iscritto())
                    {
                        $objLoan->setResa("Y");
                        $objLoan->setDate_res($Date_restituzione);
                        $objLoan->setDate_modifica($Date_modifica);
                        $objLoan->setId_sog_modifica($objUser->getID());
                        $objLoan->Save();
                        $successo = urlencode("INSERIMENTO RESTITUZIONE AVVENUTO CORRETTAMENTE.");
                        redirect('./card_subscriber.php?success_restitution='.$successo.'&id_iscritto='.$Id_iscritto);
                        exit();
                    }
                    else
                    {
                        redirect('./index.php');
                        exit();
                    }
                break;
            
                case "elimina_prestito":
                    if(isset($_GET['id_catalog']) && !empty($_GET['id_catalog']) && isset($_GET['id_iscritto']) && !empty($_GET['id_iscritto']) && isset($_GET['id_prestito']) && !empty($_GET['id_prestito'])) {
                        $Id_catalogazione = trim($_GET['id_catalog']);
                        $Id_iscritto = trim($_GET['id_iscritto']);
                        $Id_prestito = trim($_GET['id_prestito']);
                    }
                    else
                    {
                        redirect('./index.php');
                        exit();
                    }
                    $objLoan = new Loan($objPDO, $Id_prestito);
                    if($Id_catalogazione == $objLoan->getId_catalog() && $Id_iscritto == $objLoan->getId_iscritto())
                    {
                        $objLoan->MarkForDeletion();
                        $successo = urlencode("ELIMINAZIONE PRESTITO AVVENUTA CORRETTAMENTE.");
                        redirect('./card_subscriber.php?success_remove_loan='.$successo.'&id_iscritto='.$Id_iscritto);
                        exit();
                    }
                    else
                    {
                        redirect('./index.php');
                        exit();
                    }
                break;
                
                case 'add_image_catalog':
                    if(isset($_FILES['filename']) && isset($_POST['id_catalog']))
                    {
                        $objCatalog = new Cataloguing($objPDO,trim($_POST['id_catalog']));
                        $objCatalog->Load();
                        if(!empty($objCatalog->getID())) {
                            //Percorso Directory Immagini
                            $dir = './images/catalogazioni/';
                            //Controllo se lo scaricamento dell'immagine è andato a buon fine
                            //make sure the uploaded file transfer was successful
                            if ($_FILES['filename']['error'] != UPLOAD_ERR_OK) 
                            {	       
                                switch ($_FILES['filename']['error']) 
                                {	       
                                    case UPLOAD_ERR_INI_SIZE:
                                        die('The uploaded file exceeds the upload_max_filesize directive in php.ini.');
                                    break;
                                    case UPLOAD_ERR_FORM_SIZE:
                                        die('The uploaded file exceeds the MAX_FILE_SIZE directive that was specified in the HTML form.');
                                    break;
                                    case UPLOAD_ERR_PARTIAL:
                                        die('The uploaded file was only partially uploaded.');
                                    break;
                                    case UPLOAD_ERR_NO_FILE:
                                        die('No file was uploaded.');
                                    break;
                                    case UPLOAD_ERR_NO_TMP_DIR:
                                        die('The server is missing a temporary folder.');
                                    break;
                                    case UPLOAD_ERR_CANT_WRITE:
                                        die('The server failed to write the uploaded file to disk.');
                                    break;
                                    case UPLOAD_ERR_EXTENSION:
                                        die('File upload stopped by extension.');
                                    break;        
                                }
                            }
                            //Prendo Informazioni
                            list($width, $height, $type, $attr) = getimagesize($_FILES['filename']['tmp_name']);
                            //Controllo se è davvero un immagine
                            $error = 'The file you uploaded was not a supported filetype.';
                            switch ($type) 
                            {
                                case IMAGETYPE_GIF:
                                    $image = imagecreatefromgif($_FILES['filename']['tmp_name']) or die($error);
                                break;
                                case IMAGETYPE_JPEG:
                                    $image = imagecreatefromjpeg($_FILES['filename']['tmp_name']) or die($error);
                                break;
                                case IMAGETYPE_PNG:
                                    $image = imagecreatefrompng($_FILES['filename']['tmp_name']) or die($error);
                                break;
                                default:
                                    die($error);
                                break;
                            }
                            if(Cataloguing::SaveImageCatalog($objPDO, $objCatalog->getID(), $dir.$objCatalog->getID().".jpg")) {
                                //Ridimensiono l'immagine e la salvo	    
                                if($width > $height) {
                                    $width_r = 200;
                                    $height_r = $height*$width_r/$width;
                                } else if($width < $height){
                                    $height_r = 200;
                                    $width_r = $width*$height_r/$height;
                                } else {
                                    $width_r = 200;
                                    $height_r = 200;
                                }		
                                $image_resize = imagecreatetruecolor($width_r, $height_r);
                                imagecopyresampled($image_resize, $image, 0, 0, 0, 0, $width_r, $height_r, $width, $height);	    
                                imagejpeg($image_resize, $dir.$objCatalog->getID().".jpg");
                                imagedestroy($image);
                                imagedestroy($image_resize);
                                echo $dir.$objCatalog->getID().".jpg";
                            } else {
                                echo "Error";
                            }
                        } else {
                            echo "Error";
                        }
                    }
                break;
                
                case 'add_image_subscriber':
                    if(isset($_FILES['filename']) && isset($_POST['id_subscriber']))
                    {
                        $objSubscriber = new Subscriber($objPDO,trim($_POST['id_subscriber']));
                        $objSubscriber->Load();
                        if(!empty($objSubscriber->getID())) {
                            //Percorso Directory Immagini
                            $dir = './images/iscritti/';
                            //Controllo se lo scaricamento dell'immagine è andato a buon fine
                            //make sure the uploaded file transfer was successful
                            if ($_FILES['filename']['error'] != UPLOAD_ERR_OK) 
                            {	       
                                switch ($_FILES['filename']['error']) 
                                {	       
                                    case UPLOAD_ERR_INI_SIZE:
                                        die('The uploaded file exceeds the upload_max_filesize directive in php.ini.');
                                    break;
                                    case UPLOAD_ERR_FORM_SIZE:
                                        die('The uploaded file exceeds the MAX_FILE_SIZE directive that was specified in the HTML form.');
                                    break;
                                    case UPLOAD_ERR_PARTIAL:
                                        die('The uploaded file was only partially uploaded.');
                                    break;
                                    case UPLOAD_ERR_NO_FILE:
                                        die('No file was uploaded.');
                                    break;
                                    case UPLOAD_ERR_NO_TMP_DIR:
                                        die('The server is missing a temporary folder.');
                                    break;
                                    case UPLOAD_ERR_CANT_WRITE:
                                        die('The server failed to write the uploaded file to disk.');
                                    break;
                                    case UPLOAD_ERR_EXTENSION:
                                        die('File upload stopped by extension.');
                                    break;        
                                }
                            }
                            //Prendo Informazioni
                            list($width, $height, $type, $attr) = getimagesize($_FILES['filename']['tmp_name']);
                            //Controllo se è davvero un immagine
                            $error = 'The file you uploaded was not a supported filetype.';
                            switch ($type) 
                            {
                                case IMAGETYPE_GIF:
                                    $image = imagecreatefromgif($_FILES['filename']['tmp_name']) or die($error);
                                break;
                                case IMAGETYPE_JPEG:
                                    $image = imagecreatefromjpeg($_FILES['filename']['tmp_name']) or die($error);
                                break;
                                case IMAGETYPE_PNG:
                                    $image = imagecreatefrompng($_FILES['filename']['tmp_name']) or die($error);
                                break;
                                default:
                                    die($error);
                                break;
                            }
                            if(Subscriber::SaveImageSubscriber($objPDO, $objSubscriber->getID(), $dir.$objSubscriber->getID().".jpg")) {
                                //Ridimensiono l'immagine e la salvo	    
                                if($width > $height) {
                                    $width_r = 200;
                                    $height_r = $height*$width_r/$width;
                                } else if($width < $height){
                                    $height_r = 200;
                                    $width_r = $width*$height_r/$height;
                                } else {
                                    $width_r = 200;
                                    $height_r = 200;
                                }		
                                $image_resize = imagecreatetruecolor($width_r, $height_r);
                                imagecopyresampled($image_resize, $image, 0, 0, 0, 0, $width_r, $height_r, $width, $height);	    
                                imagejpeg($image_resize, $dir.$objSubscriber->getID().".jpg");
                                imagedestroy($image);
                                imagedestroy($image_resize);
                                echo $dir.$objSubscriber->getID().".jpg";
                            } else {
                                echo "Error";
                            }
                        } else {
                            echo "Error";
                        }
                    }
                break;
                
                case 'add_image_user':
                    if(isset($_FILES['filename']))
                    {
                        //Percorso Directory Immagini
                        $dir = './images/operatori/';
                        //Controllo se lo scaricamento dell'immagine è andato a buon fine
                        //make sure the uploaded file transfer was successful
                        if ($_FILES['filename']['error'] != UPLOAD_ERR_OK) 
                        {	       
                            switch ($_FILES['filename']['error']) 
                            {	       
                                case UPLOAD_ERR_INI_SIZE:
                                    die('The uploaded file exceeds the upload_max_filesize directive in php.ini.');
                                break;
                                case UPLOAD_ERR_FORM_SIZE:
                                    die('The uploaded file exceeds the MAX_FILE_SIZE directive that was specified in the HTML form.');
                                break;
                                case UPLOAD_ERR_PARTIAL:
                                    die('The uploaded file was only partially uploaded.');
                                break;
                                case UPLOAD_ERR_NO_FILE:
                                    die('No file was uploaded.');
                                break;
                                case UPLOAD_ERR_NO_TMP_DIR:
                                    die('The server is missing a temporary folder.');
                                break;
                                case UPLOAD_ERR_CANT_WRITE:
                                    die('The server failed to write the uploaded file to disk.');
                                break;
                                case UPLOAD_ERR_EXTENSION:
                                    die('File upload stopped by extension.');
                                break;        
                            }
                        }
                        //Prendo Informazioni
                        list($width, $height, $type, $attr) = getimagesize($_FILES['filename']['tmp_name']);
                        //Controllo se è davvero un immagine
                        $error = 'The file you uploaded was not a supported filetype.';
                        switch ($type) 
                        {
                            case IMAGETYPE_GIF:
                                $image = imagecreatefromgif($_FILES['filename']['tmp_name']) or die($error);
                            break;
                            case IMAGETYPE_JPEG:
                                $image = imagecreatefromjpeg($_FILES['filename']['tmp_name']) or die($error);
                            break;
                            case IMAGETYPE_PNG:
                                $image = imagecreatefrompng($_FILES['filename']['tmp_name']) or die($error);
                            break;
                            default:
                                die($error);
                            break;
                        }
                        if(User::SaveImageUser($objPDO, $objUser->getID(), $dir.$objUser->getID().".jpg")) {
                            //Ridimensiono l'immagine e la salvo	    
                            if($width > $height) {
                                $width_r = 100;
                                $height_r = $height*$width_r/$width;
                            } else if($width < $height){
                                $height_r = 100;
                                $width_r = $width*$height_r/$height;
                            } else {
                                $width_r = 100;
                                $height_r = 100;
                            }		
                            $image_resize = imagecreatetruecolor($width_r, $height_r);
                            imagecopyresampled($image_resize, $image, 0, 0, 0, 0, $width_r, $height_r, $width, $height);	    
                            imagejpeg($image_resize, $dir.$objUser->getID().".jpg");
                            imagedestroy($image);
                            imagedestroy($image_resize);
                            echo $dir.$objUser->getID().".jpg";
                        } else {
                            echo "Error";
                        }
                    }
                break;
                
                case 'edit_profile' :
                  
                    #Elimino gli eventuali Campi Salvati in un precedente invio dei dati
                    $objSession->deleteFieldsValueEditProfile();
                    #Elimino gli errori effettuati in un precedente invio dei dati
                    $objSession->deleteErrorsEditProfile();
                    
                    $Errors_validate = array();
                    
                    $Nome = (isset($_POST['nome'])) ? (ucwords(trim($_POST['nome']))) : '';
                    $Cognome = (isset($_POST['cognome'])) ? (ucwords(trim($_POST['cognome']))) : '';
                    $Username = (isset($_POST['username'])) ? (strtolower(trim($_POST['username']))) : '';
                    $Old_password = (isset($_POST['oldpassword'])) ? (trim($_POST['oldpassword'])) : '';
                    $New_password = (isset($_POST['newpassword'])) ? (trim($_POST['newpassword'])) : '';
                    
                    $prosecute = true;
                    
                    if(!empty($Old_password) && !empty($New_password)) {
                        $user = User::GetProfileUser($objPDO, $objUser->getID(), $Old_password);
                        if($user['susername'] != $objUser->getUsername()) {
                            $prosecute = false;
                        }
                    } else if(empty($Old_password) && empty($New_password)) {
                        $prosecute = true;
                    } else {
                        $prosecute = false;
                    }
                    
                    if($prosecute) {
                   
                        $objUser->setName($Nome);
                        $objUser->setSurname($Cognome);
                        $objUser->setUsername($Username);
                                                            
                        #Salvo in Variabili di Sessione i Valori inseriti dall'utente
                        $objSession->sep_NOME = $Nome;
                        $objSession->sep_COGNOME = $Cognome;
                        $objSession->sep_USERNAME = $Username;
                  
                        //Verifico che i valore dei campi siano corretti
                        $Errors_validate = $objUser->validate();
                  
                        if(sizeof($Errors_validate) > 0)
                        {
                            foreach ($Errors_validate as $key => $value)
                            {
                                $key_m = 'eep_'.$key;
                                $objSession->$key_m = $Errors_validate[$key];
                            }
                            
                            redirect('./edit_profile.php?errors=yes');
                            exit();
                        }
                        else
                        {
                            if($objUser->Save())
                            {
                                if(!empty($New_password) && !empty($Old_password)) {
                                    User::changePasswordUser($objPDO, $objUser->getID(), $New_password);
                                }

                                #Elimino gli eventuali Campi Salvati in un precedente invio dei dati
                                $objSession->deleteFieldsValueEditProfile();
                                #Elimino gli errori effettuati in un precedente invio dei dati
                                $objSession->deleteErrorsEditProfile();
                                $Successo = "PROFILO MODIFICATO CORRETTAMENTE.";
                                $url = './edit_profile.php?success_update_u='.urlencode($Successo);
                                redirect($url);
                                exit();
                            } 
                            else 
                            {
                                $Errore = "ERRORE: IL PROFILO NON &Egrave; STATO MODIFICATO...RIPROVA.";
                                $url = './edit_profile.php?error_update_u='.urlencode($Errore);
                                redirect($url);
                                exit();
                            }
                        }
                    }
                    else
                    {
                        redirect('./edit_profile.php?error_username=yes');
                        exit();
                    }
                break;
                
                default:
                    redirect('./access.php');
                break;
                		
            }
	}
        else
        {
            redirect('./access.php');
            exit();
	}
    } 
    else 
    {
        redirect('./access.php');
        exit();
    }
?>