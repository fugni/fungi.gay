<!DOCTYPE html>
<html>
<head>
<title>fungi</title>
<link rel="stylesheet" href="style.css">
</head>
<body>
	<div>
		<span class="λ">λ&nbsp;</span>neofetch<br>
	</div>
	
	<?php
		command("b");
	?>

	<?php 
		function command($command) {
			$commands = array("neofetch");

			if (!in_array($command, $commands)) {
				echo "nya: command not found";
			} else {
				include "includes/" . $command . ".html";
			}
			
			echo "<br><br>";

			// create div
			echo "<div class='terminal'>";
			echo "<span class='λ'>λ&nbsp;</span>";
			echo "<input type='text' id='command' autofocus>";
		
		}
	?>

	<br class="responsive">
	<div class="responsive">best experienced on pc or laptop</div>

	<script src="script.js"></script>
</body>
</html>