<?php
    $a = array("AP/n.00018","F/n.00067","n.00078");
	$num = count($a);
	for($i = 0; $i < $num; $i++) {
		if(preg_match('|/|', $a[$i])) {
			$b[$i] = explode('/',$a[$i]);
		} else {
			$b[$i][0] = ' ';
			$b[$i][1] = $a[$i];			
		}
		$b[$i][1] = substr($b[$i][1],2);
		switch($b[$i][0]) {
			case 'AP':
				$b[$i][0] = "P";
			break;
			case ' ':
				$b[$i][0] = "C";
			break;	
		}
	}
	print_r($b);
	$stringa = "Mia mamma 340 voleva giocare";
	print_r(explode(" ",$stringa,3));
	
?>
<html>
	<head>
		<script language="JavaScript" type="text/javascript" src="../js/jquery-1.9.1.js"></script>
		<script language="JavaScript" type="text/javascript" src="../js/jquery-ui-1.10.3.custom.min.js"></script>
		<script language="JavaScript" type="text/javascript" src="../javascript/gestione.js"></script>
		<link rel="stylesheet" type="text/css"  href="../css/start/jquery-ui-1.10.3.custom.min.css" />
		<link rel="stylesheet" type="text/css" href="../css/biblio.css" />
		<script language="JavaScript" type="text/javascript">
			$(document).ready(function(){
				$("#menu").menu();
			});
		</script>		
	</head>
	<body>
		<ul id="menu">
		  <li><a href="#">Item 1</a></li>
		  <li><a href="#">Item 2</a></li>
		  <li><a href="#">Item 3</a>
		    <ul>
		      <li><a href="#">Item 3-1</a></li>
		      <li><a href="#">Item 3-2</a></li>
		      <li><a href="#">Item 3-3</a></li>
		      <li><a href="#">Item 3-4</a></li>
		      <li><a href="#">Item 3-5</a></li>
		    </ul>
		  </li>
		  <li><a href="#">Item 4</a></li>
		  <li><a href="#">Item 5</a></li>
		</ul>
	</body>
</html>