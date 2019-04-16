<?php include('../header.php') ?>

<?php 
    $log_directory = 'C:\xampp\htdocs\tang\img\sobres\mini';
    //$log_directory = '/var/www/test.catorcedias.com/tang-2019/img/sobres/mini';
?>

<div class="fondo_claro">
    <div class="secion_logo_medio">
        <p class="contacto_texto">
            Lorem ipsum dolor sit amet consectetur adipiscing elit nascetur aliquet aenean, nisi interdum placerat eget sociosqu ornare mollis mauris.
        </p>
        <div class="fondo_claro_int">
            <div class="back_color"></div>
            <div class="sobres_cont">
                <div class="botones_sobres">
                    <button type="button" class="enviar_contacto">TODOS</button>
                    <button type="button" class="enviar_contacto">MIXES</button>
                    <button type="button" class="enviar_contacto">TÉS</button>
                    <button type="button" class="enviar_contacto">SABORES</button>
                </div>
                <div class="sobres_thumbs_cont">
                    <div class="col-12">
                        <div class="row">
                            <?php 
                            foreach(glob($log_directory.'/*.png') as $file) {
                                $position = strrpos($file, '/');
                                $filename = $position === false ? $file : substr($file, $position + 1);
                                ?>
                                    <div class="col-6 col-md-3">
                                        <div class="receta_thumb_cont">
                                            <img src="<?=$site_url?>img/sobres/mini/<?=$filename?>" alt="" class="receta_thumb">
                                        </div>
                                    </div>
                                <?php
                            }
                            ?>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<?php include('../footer.php') ?>