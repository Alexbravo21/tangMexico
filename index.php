<?php include('header.php') ?>

<?php 
    $log_directory = 'C:\xampp\htdocs\tang-2019\img\sobres\mini';
    //$log_directory = '/var/www/test.catorcedias.com/tang-2019/img/sobres/mini';
?>

<div class="nav_home_cont">
    <div class="mas_nav_cont">
        <div class="mas_nav">
            <div class="mas_nav_item horizontal"></div>
            <div class="mas_nav_item vertical"></div>
        </div>
    </div>
    <div class="colores_cont">
        <?php foreach(glob($log_directory.'/*.png') as $file) { ?>
                <div class="colores_item"></div>
        <?php } ?>
    </div>
</div>
<div class="fondo_madera">
    <div class="izquierdo">
        <img src="img/sobres/naranjadamix.jpg" alt="Naranjada Mix" class="sobre">
    </div><!--
    --><div class="derecho">
        <div class="plasta_circular">
            <div class="receta_home_cont">
                <div class="receta_home">
                    <p class="receta_home_nombre">Naranjada <br><span>Mango</span></p>
                    <img src="img/naranjadamix/receta.png" alt="" class="receta_home_img">
                </div>
            </div>
        </div>
        <div class="home_flecha_cont izquierda">
            <div class="home_flecha"></div>
        </div>
        <div class="home_flecha_cont derecha">
            <div class="home_flecha"></div>
        </div>
    </div>
</div>

<?php include('footer.php') ?>