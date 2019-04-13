<?php 
    $seccion = $_SERVER['REQUEST_URI'];
    $contacto = strpos($seccion, 'contacto') !== false ? 'logo_2' : 'logo' ;
    
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="css/bootstrap.min.css">
    <link rel="stylesheet" href="css/style.css">
    <title>Tang México</title>
</head>
<body>
    <div class="hamburger_cont">
        <div class="hamburger hamburger--spin js-hamburger">
            <div class="hamburger-box">
                <div class="hamburger-inner"></div>
            </div>
        </div>
    </div>
    <img src="img/logo.png" alt="" class="<?=$contacto ?>">
