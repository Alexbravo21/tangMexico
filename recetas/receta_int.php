<?php include('../header.php') ?>

<div class="receta_interior_cont">
    <div class="izquierdo"></div><!--
--><div class="derecho">
        <div class="receta_interior_texto">
            <div class="receta_interior_titulo"></div>
            <div class="tiemporciones">
                <div class="minutos">
                    <img src="<?=$site_url?>img/reloj.png" alt="" class="reloj">
                    <div class="textbox">
                        <span class="minutos_num"></span><span class="minutos_texto">MINUTOS</span>
                    </div>
                </div><!--
                --><div class="porciones">
                    <img src="<?=$site_url?>img/carita.png" alt="" class="carita">
                    <div class="textbox">
                        <span class="porciones_num">6</span><span class="porciones_texto">PORCIONES</span>
                    </div>
                </div>
            </div>
            <div class="receta_interior_ingredientes">
                <p class="ingredientes_titulo">INGREDIENTES</p>
                <ul class="ingredientes_lista"></ul>
            </div>
            <div class="receta_interior_preparacion">
                <p class="preparacion_titulo">PREPARACIÓN</p>
                <ul class="preparacion_lista">
                    <li><span>DISOLVER</span> el sobre de Tang® sabor limón en los 2 L de agua.</li>
                    <li><span>SERVIR</span> en una garra con el pepino, limón, chía, hielo y hierbabuena.</li>
                </ul>
            </div>
        </div>
    <div class="plasta_circular"></div>
</div>
</div>

<?php include('../footer.php') ?>