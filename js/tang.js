$(document).ready(function () {
    app.init();
});
var pos = 0;
var site_url = '/tang-2019/';

var app = {
    init: function(){
        this.menu();
        this.pruebas();
        this.masboton();
        if($(".fondo_madera").length > 0){
            this.getTheJSON('recetas', 'sobres', 0, '', 'home');
        }
        if($(".recetas_seccion").length > 0){
            this.getThumbs('recetas', 'todos');
        }
        if($(".sabores_seccion").length > 0){
            this.getThumbs('sobres', 'todos');
        }
        this.colores_home();
        this.flechas_home();
        this.getInterior();
        this.filtros();
        this.cerrarPromo();
        setTimeout(function(){
            $(".plasta_circular").addClass('bounce-scale');
            setTimeout(function(){
                $(".plasta_circular").addClass('bounce-scale2');
            }, 1000);
        }, 1000);
    },
    menu: function(){
        $(document).on('click', ".hamburger_cont", function (e) {
            var este = $(this);
            var hamburger = este.find(".hamburger");
            if(!hamburger.hasClass('is-active')){
                $(".menu_cont, .logo, .logo_2").addClass("madera_move");
                setTimeout(function(){
                    $(".madera").each(function (index, element) {
                        var este = $(this);
                        setTimeout(function(){
                            este.addClass("madera_move");
                        }, index*120);
                    });
                    setTimeout(function(){
                        $(".menu_botones").addClass("madera_move");
                    }, 500);
                }, 20);
            }else{
                $(".menu_botones").removeClass("madera_move");
                $(".madera").each(function (index, element) {
                    var este = $(this);
                    setTimeout(function(){
                        este.removeClass("madera_move");
                    }, index*120);
                });
                setTimeout(function(){
                    $(".menu_cont").removeClass("madera_move");
                }, 700);
                setTimeout(function(){
                    $(".logo, .logo_2").removeClass("madera_move");
                }, 200);

            }
            $(hamburger).toggleClass("is-active");
        });
    },
    masboton: function(){
        $(document).on("click", ".mas_nav_cont", function () {
            $(".colores_cont").slideToggle(400);
            $(this).toggleClass("is-active");
        });
    },
    getTheJSON: function(file, file2, pos, laurl, seccion){
        //Obtenemos el primer Json
        $.getJSON(site_url+file+".json", function(json) {
            //Reseteamos el menu de colores
            $(".colores_cont").html("");
            //Obtenemos un Array con los keys del objeto JSON y obtenemos los colores de cada botón
            var laskeys = Object.keys(json[file]);
            var first = laskeys[pos];
            for (var h=0; h < laskeys.length; h++){
                $(".colores_cont").append('<div class="colores_item" data-pos="'+h+'" style="background-color:'+json[file][laskeys[h]].color+'"></div>');
            }
            //Matchamos ambos JSON para que se obtengan las recetas y los sobres del mismo sabor
            $.getJSON(site_url+file2+".json", function(json2) {
                //Obtenemos el array de este JSON
                var laskeys2 = Object.keys(json2[file2]);
                var first_sobres = laskeys2[pos];
                //console.log(first_sobres);
                for (var i=0; i < laskeys2.length; i++){
                    //Se loopea en el segundo JSON y se compara que sea el mismo del primero
                    if(first == laskeys2[i]){
                        //Separamos el titulo para que sea igual al diseño (No. palabras/2 redondeado hacia arriba)
                        var nombres = json[file][first].nombre.split(" ");
                        var media = Math.floor(nombres.length/2);
                        var nomb = "", nomb2 = "";
                        for(var k=0; k<media; k++)
                             nomb = nomb + nombres[k] + " ";
                        for(var j=media; j<nombres.length; j++)
                             nomb2 = nomb2 + nombres[j] + " ";
                        //Se genera la palabra de nuevo con las etiquetas necesarias
                        var elnombre = nomb+"<br><span>"+nomb2+"</span>";
                        //Se insertan todos
                        if(seccion == 'home'){
                            $(".derecho .plasta_circular").css('background-color', json[file][first].color);
                            $(".receta_home_nombre").html(elnombre);
                            $(".receta_home_img").attr("src", json[file][first].home_img_url);
                            $(".sobre").attr("src", laurl+json2[file2][laskeys2[i]].img_url);
                            $(".receta_home_img_a").attr("href", json[file][first].link);
                            $(".sobre_home_a").attr("href", json2[file2][laskeys2[i]].link);
                        } 

                        //Acomodo con las flechas de recetas
                        if(seccion == 'recetas'){
                            $(".ingredientes_lista, .preparacion_lista").html('');
                            var jsonItem = json[file][first];
                            $(".derecho .plasta_circular").css('background-color', jsonItem.color);
                            $(".receta_interior_cont").css('background-image', 'url('+laurl+jsonItem.img_url+')');
                            
                            //Separamos el titulo para que sea igual al diseño
                            var nombres = jsonItem.nombre.split(" ");
                            var media = Math.floor(nombres.length/2);
                            var nomb = "", nomb2 = "";
                            for(var k=0; k<media; k++)
                                nomb = nomb + nombres[k] + " ";
                            for(var j=media; j<nombres.length; j++)
                                nomb2 = nomb2 + nombres[j] + " ";
                            var elnombre = nomb+"<br><span>"+nomb2+"</span>";
                            //Insertamos datos en los campos
                            $(".receta_interior_cont").css("background-image", "url("+site_url+jsonItem.img_url+")");
                            $(".receta_interior_titulo").html(elnombre);
                            $(".minutos_num").html(jsonItem.minutos);
                            $(".porciones_num").html(jsonItem.porciones);
                            //Loopeamos en el objeto de ingredientes para determinar si tiene subtitulos como "otros" "base" "salsa"
                            var ing_laskeys = Object.keys(jsonItem.ingredientes);
                            for(var m=0; m < ing_laskeys.length; m++){
                                var ing_key = ing_laskeys[m];
                                //Si el subtitulo es "normal" se ignora el subtitulo y se añaden directamente
                                if(ing_key == 'normal'){
                                    for(var n=0; n < jsonItem.ingredientes[ing_key].length; n++)
                                        $(".ingredientes_lista").append('<li class="ingredientes_item">'+jsonItem.ingredientes[ing_key][n]+'</li>');
                                }else{
                                    //Si es alguno de los anteriores se imprime el subtitulo y después los ingredientes
                                    $(".ingredientes_lista").append('<li class="ingredientes_item ingredientes_titulo uppercase">'+ing_key+'</li>');
                                    for(var o=0; o < jsonItem.ingredientes[ing_key].length; o++)
                                        $(".ingredientes_lista").append('<li class="ingredientes_item">'+jsonItem.ingredientes[ing_key][o]+'</li>');
                                }
                            }
                            //Se añaden los puntos de la preparación
                            for(var p=0; p < jsonItem.preparacion.length; p++)
                                $(".preparacion_lista").append('<li class="preparacion_item">'+jsonItem.preparacion[p]+'</li>');



                        }
                        //Acomodo con las flechas de sobres
                        if(seccion == 'sobres'){
                            $(".derecho .plasta_circular").css('background-color', json2[file2][first_sobres].color);
                            $(".sobre").attr("src", laurl+json2[file2][first_sobres].img_url);
                            $(".porciones_envase .porciones_img_item").attr("src", site_url+"img/sobres/mini/"+first_sobres+".png");
                            $(".sabor_interior_titulo p span").html(json2[file2][first_sobres].nombre);
                            $(".sabor_desc_titulo").html(json2[file2][first_sobres].titulo);
                            $(".sabor_desc").html(json2[file2][first_sobres].descripcion);
                            var info_nutri = [];
                            //Se itera en el objeto de tabla nutrimental generando un array con sus keys para después ponerlo en su posición correcta con el $.each
                            for (var key2 in json2[file2][first_sobres].info_nutri) {
                                info_nutri.push(json2[file2][first_sobres].info_nutri[key2]);
                            }
                            $(".info_nutri_num").each(function (index, element) {
                                var ele = $(this);
                                ele.html(info_nutri[index]);
                            });
                        }
                       
                    }
                }
            });
        });
    },
    colores_home: function(){
        var este = this;
        $(document).on("click", ".colores_item", function(){
            pos = $(this).data('pos');
            este.getTheJSON("recetas", "sobres", pos, '', 'home');
        });
    },
    flechas_home: function(){
        var este = this;
        $(document).on("click", ".derecho .home_flecha_cont", function(){
            if($(this).hasClass('izquierda')){
                pos = (pos == 0) ? 21 : pos;
                este.getTheJSON("recetas", "sobres", (pos-1), '', 'home');
                pos--;
            }else{
                pos = (pos == 20) ? -1 : pos;
                este.getTheJSON("recetas", "sobres", (pos+1), '', 'home');
                pos++;
            }
        });
    },
    flechas_interior: function(position){
        var este = this;
        var elinterior;
        $(document).on("click", ".izquierdo .home_flecha_cont", function(){
            elinterior = $(this).data('seccion');
            //console.log(position);
            if($(this).hasClass('izquierda')){
                position = (position == 0) ? 21 : position;
                este.getTheJSON("recetas", "sobres", (position-1), site_url, elinterior);
                position--;
            }else{
                position = (position == 20) ? -1 : position;
                este.getTheJSON("recetas", "sobres", (position+1), site_url, elinterior);
                position++;
            }
        });
    },
    getInterior: function(){
        //Se obtiene los index de la variable de la URL
        var url = window.location.href;
        var indicador = url.indexOf('?');
        var indicador2 = url.indexOf('=');
        var este = this;
        //Si existe entramos
        if(indicador > -1){
            //Se obtiene la variable de la URL
            var getvar = url.substring(indicador + 1);
            var file = getvar.split("=")[0];
            var key = url.substring(indicador2 + 1);
            //Obtenemos el objeto con la key de la variable de URL
            $.getJSON(site_url+file+".json", function(json) {
                var jsonItem = json[file][key];
                $(".derecho .plasta_circular").css("background-color", jsonItem.color);
                //Se envía la posición de la key para indexar la navegación entre recetas y sobres
                var position = Object.keys(json[file]).indexOf(key);
                este.flechas_interior(position);
                //console.log(position, json[file], json[file].melon);
                if(file == 'recetas'){
                    //Separamos el titulo para que sea igual al diseño
                    var nombres = json[file][key].nombre.split(" ");
                    var media = Math.floor(nombres.length/2);
                    var nomb = "", nomb2 = "";
                    for(var k=0; k<media; k++)
                         nomb = nomb + nombres[k] + " ";
                    for(var j=media; j<nombres.length; j++)
                         nomb2 = nomb2 + nombres[j] + " ";
                    var elnombre = nomb+"<br><span>"+nomb2+"</span>";
                    //Insertamos datos en los campos
                    $(".receta_interior_cont").css("background-image", "url("+site_url+jsonItem.img_url+")");
                    $(".receta_interior_titulo").html(elnombre);
                    $(".minutos_num").html(jsonItem.minutos);
                    $(".porciones_num").html(jsonItem.porciones);
                    //Loopeamos en el objeto de ingredientes para determinar si tiene subtitulos como "otros" "base" "salsa"
                    var ing_laskeys = Object.keys(jsonItem.ingredientes);
                    for(var m=0; m < ing_laskeys.length; m++){
                        var ing_key = ing_laskeys[m];
                        //Si el subtitulo es "normal" se ignora el subtitulo y se añaden directamente
                        if(ing_key == 'normal'){
                            for(var n=0; n < jsonItem.ingredientes[ing_key].length; n++)
                                $(".ingredientes_lista").append('<li class="ingredientes_item">'+jsonItem.ingredientes[ing_key][n]+'</li>');
                        }else{
                            //Si es alguno de los anteriores se imprime el subtitulo y después los ingredientes
                            $(".ingredientes_lista").append('<li class="ingredientes_item ingredientes_titulo uppercase">'+ing_key+'</li>');
                            for(var o=0; o < jsonItem.ingredientes[ing_key].length; o++)
                                $(".ingredientes_lista").append('<li class="ingredientes_item">'+jsonItem.ingredientes[ing_key][o]+'</li>');
                        }
                    }
                    //Se añaden los puntos de la preparación
                    for(var p=0; p < jsonItem.preparacion.length; p++)
                        $(".preparacion_lista").append('<li class="preparacion_item">'+jsonItem.preparacion[p]+'</li>');

                }else if(file == 'sobres'){
                    //Si es interior de sobres se imprimen sus datos
                    $(".sobre_interior").attr("src", site_url+jsonItem.img_url);
                    $(".sabor_interior_titulo p span").html(jsonItem.nombre);
                    $(".sabor_desc_titulo").html(jsonItem.titulo);
                    $(".sabor_desc").html(jsonItem.descripcion);
                    $(".porciones_envase .porciones_img_item").attr("src", site_url+"img/sobres/mini/"+key+".png");
                    //console.log(key);
                    var info_nutri = [];
                    //Se itera en el objeto de tabla nutrimental generando un array con sus keys para después ponerlo en su posición correcta con el $.each
                    for (var key2 in jsonItem.info_nutri) {
                        info_nutri.push(jsonItem.info_nutri[key2]);
                    }
                    $(".info_nutri_num").each(function (index, element) {
                        var ele = $(this);
                        ele.html(info_nutri[index]);
                    });
                }
            });
        }
    },
    getThumbs: function(file, eltipo){
        $.getJSON(site_url+file+".json", function(json) {
            var carpeta = (file == 'recetas') ? 'thumbs' : 'mini';
            var int = (file == 'recetas') ? 'receta_int' : 'sabor_int';
            var type; 
            $("."+file+"_thumbs_cont .row").html('');
            if(eltipo == 'todos'){
                for (const key in json[file]) {
                    $("."+file+"_thumbs_cont .row").append(`
                        <div class="col-6 col-md-3">
                            <div class="receta_thumb_cont">
                                <a href="${int}.php?${file}=${key}"><img src="${site_url}img/${file}/${carpeta}/${key}.png" alt="" class="receta_thumb"></a>
                            </div>
                        </div>
                    `);
                }
            }else{
                for (const key in json[file]) {
                    type = json[file][key].tipo;
                    if(eltipo == type){
                        $("."+file+"_thumbs_cont .row").append(`
                            <div class="col-6 col-md-3">
                                <div class="receta_thumb_cont">
                                    <a href="${int}.php?${file}=${key}"><img src="${site_url}img/${file}/${carpeta}/${key}.png" alt="" class="receta_thumb"></a>
                                </div>
                            </div>
                        `);
                    }
                }
            }
            
        });
    },
    filtros: function(){
        var este = this;
        $(document).on('click', '.botones_sobres .enviar_contacto', function(){
            var boton = $(this).data('boton');
            este.getThumbs('sobres', boton);
        });
        $(document).on('click', '.botones_recetas .enviar_contacto', function(){
            var boton = $(this).data('boton');
            este.getThumbs('recetas', boton);
        });
    },
    cerrarPromo: function(){
        $(document).on('click', '.cerrar_promo', function(){
            $(".promo").fadeOut(400);
        });
    },
    pruebas: function(){
        //alert("Width: "+$(window).width());
        //alert("Height: "+$(window).height());
    }
}