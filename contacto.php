<?php include('header.php') ?>

<div class="fondo_contacto">
    <div class="secion_logo_medio">
        <p class="contacto_texto">
        <strong>¡Queremos escucharte!</strong><br>
        Si tienes dudas o comentarios respecto a nuestros productos o recetas puedes escribirnos. Pronto alguien de nuestro equipo se pondrá en contacto contigo.
        </p>
        <div class="fondo_claro_int">
            <form action="" id="form_contacto">
                <div class="form-group">
                    <input type="text" placeholder="NOMBRE" class="form-control" id="nombre">
                </div>
                <div class="form-group">
                    <input type="text" placeholder="CORREO" class="form-control" id="mail">
                </div>
                <div class="form-group">
                    <textarea name="duda" id="duda" class="form-control" placeholder="DUDA O SUGERENCIA"></textarea>
                </div>
                <button type="button" class="enviar_contacto">ENVIAR</button>
            </form>
        </div>
    </div>
</div>

<?php include('footer.php') ?>