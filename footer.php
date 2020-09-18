    <script src="<?=$site_url?>js/jquery-3.3.1.min.js"></script>
    <script src="<?=$site_url?>js/circletype.min.js"></script>
    <script src="<?=$site_url?>js/tang.js"></script>
    <div class="loader" style="display:none">
        <?php 
            $directories = ["img/fondos/", "img/frases/", "img/frutas/", "img/sobres/"];
            foreach($directories as $directory){
                $images = glob($directory."*.{jpg,gif,png}",GLOB_BRACE);
                foreach($images as $image){
                    echo '<img src="'.$image.'" />';
                }
            }
        ?>
    </div>
</body>
</html>