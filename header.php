<?php 
    $site_url = '/tang/';
    $uri = $_SERVER['REQUEST_URI'];
    //Este pequeño script detecta la url para saber si estás en una sección en la que el logo va al centro.
    $logo = strrpos($uri, 'contacto') !== false ? 'logo_2' : 'logo' ;
    //Agregar a este array las secciones que se sumen al sitio web en el futuro
    $secciones = ['recetas', 'sobres'];
    foreach($secciones as $seccion){
        if(strrpos($uri, $seccion) !== false){
            $pos = strrpos($uri, '/');
            $id = $pos === false ? $uri : substr($uri, $pos + 1);
            $logo = ($id == '' || $id == 'index.php') ? "logo_2" : "logo";
            $overflow = 'over_visible';
            break;
        }else{
            $pos = strrpos($uri, '/');
            $id = $pos === false ? $uri : substr($uri, $pos + 1);
            $overflow = ($id == '' || $id == 'index.php') ? "over_hidden" : "over_visible";
        }
    }


    // echo $overflow.', ';
    // echo $seccion.', ';
    // echo $pos.', ';
    // echo $id.', ';
?>

<!DOCTYPE html>
<html lang="en" class="<?=$overflow?>">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="<?=$site_url?>css/bootstrap.min.css">
    <link rel="stylesheet" href="<?=$site_url?>css/style.css">
    <title>Tang México</title>
</head>
<body class="<?=$overflow?>">
    <div class="hamburger_cont">
        <div class="hamburger hamburger--spin js-hamburger">
            <div class="hamburger-box">
                <div class="hamburger-inner"></div>
            </div>
        </div>
    </div>
    <img src="<?=$site_url?>img/logo.png" alt="" class="<?=$logo ?>">
