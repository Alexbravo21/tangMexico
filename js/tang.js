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
        $(document).on("click", ".mas_nav_cont.mas_nav_home_button", function () {
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
            //Se acomodan las keys en orden alfabético para que se mantenga el orden del diseño
            laskeys.sort();
            var first = laskeys[pos];
            for (var h=0; h < laskeys.length; h++){
                $(".colores_cont").append('<div class="colores_item" data-pos="'+h+'" style="background-color:'+json[file][laskeys[h]].color+'"></div>');
            }
            //Matchamos ambos JSON para que se obtengan las recetas y los sobres del mismo sabor
            $.getJSON(site_url+file2+".json", function(json2) {
                //Obtenemos el array de este JSON
                var laskeys2 = Object.keys(json2[file2]);
                //Se acomodan las keys en orden alfabético para que se mantenga el orden del diseño
                laskeys2.sort();
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
                            $(".receta_home_img_a").attr("href", json[file][first].link + "&viene=home");
                            $(".sobre_home_a").attr("href", json2[file2][laskeys2[i]].link + "&viene=home");
                            $(".receta_home_nombre").css('color', json2[file2][laskeys2[i]].texto_color);
                        } 

                        //Acomodo con las flechas de recetas
                        if(seccion == 'recetas'){
                            history.replaceState("", "", "receta_int.php?recetas="+first);
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
                            $(".receta_interior_titulo, .minutos_num, .porciones_num, .receta_interior_ingredientes").css('color', jsonItem.texto_color);
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
                            history.replaceState("", "", "sabor_int.php?sobres="+first_sobres);
                            var jsonItem2 = json2[file2][first_sobres];
                            $(".derecho .plasta_circular").css('background-color', jsonItem2.color);
                            $(".sobre.sobre_interior").attr("src", laurl+jsonItem2.img_url);
                            $(".porciones_envase .porciones_img_item").attr("src", site_url+"img/sobres/mini/"+first_sobres+".png");
                            $(".sabor_interior_titulo p span").html(jsonItem2.nombre);
                            $(".sabor_interior_titulo span, .sabor_desc_titulo, .info_nutri_titulo").css('color', jsonItem2.texto_color);
                            $(".sabor_desc_titulo").html(jsonItem2.titulo);
                            $(".sabor_desc").html(jsonItem2.descripcion);
                            var info_nutri = [];
                            //Se itera en el objeto de tabla nutrimental generando un array con sus keys para después ponerlo en su posición correcta con el $.each
                            for (var key2 in jsonItem2.info_nutri) {
                                info_nutri.push(jsonItem2.info_nutri[key2]);
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

        //Obtenemos el JSON de las frutas individuales
        $.getJSON(site_url+"frutas.json", function(json_frutas) {
            $(".frutas_home").remove();
            var frutas_keys = Object.keys(json_frutas.sobres);
            //Se acomodan las keys en orden alfabético para que se mantenga el orden del diseño
            frutas_keys.sort();
            var fruta_actual = frutas_keys[pos];
            var car_fruta_actual = json_frutas.sobres[fruta_actual];
            car_fruta_actual.frutas.forEach(function(item, index){
                $(".fondo_madera .izquierdo").append('<img src="'+site_url+item+'" class="frutas_home" style="top:'+car_fruta_actual.frutas_pos[index][1]+'%; left:'+car_fruta_actual.frutas_pos[index][0]+'%; transform: translate('+car_fruta_actual.frutas_transform[index][0]+'%, '+car_fruta_actual.frutas_transform[index][1]+'%)">');
            });
            car_fruta_actual.receta_home.forEach(function(item, index){
                $(".receta_home").append('<img src="'+site_url+item+'" class="frutas_home" style="top:'
                +car_fruta_actual.receta_home_pos[index][1]+'%; left:'+car_fruta_actual.receta_home_pos[index][0]+'%; transform: translate('+car_fruta_actual.frutas_transform[index][0]+'%, '+car_fruta_actual.frutas_transform[index][1]+'%)">');
            });
        });

    },
    colores_home: function(){
        var este = this;
        $(document).on("click", ".colores_item", function(){
            pos = $(this).data('pos');
            //Se añaden clases que animan la plasta y el sobre
            $(".plasta_circular").addClass('bounce-scale');
            $(".izquierdo .sobre").addClass("rotate-scale");
            setTimeout(function(){
                //Se manda llamar la función que cambia los elementos con base en el JSON
                este.getTheJSON("recetas", "sobres", pos, '', 'home');
            }, 250);
            setTimeout(function(){
                //Se regresan a su estado original los elementos quitando las clases o añadiendo nuevas para mejorar la animación
                $(".plasta_circular").addClass('bounce-scale2');
                $(".izquierdo .sobre").removeClass("rotate-scale");
                setTimeout(function(){
                    // Se quitan todas las clases para reiniciar las animaciones
                    $(".plasta_circular").removeClass('bounce-scale');
                    $(".plasta_circular").removeClass('bounce-scale2');
                }, 510);
            }, 800);
        });
    },
    flechas_home: function(){
        var este = this;
        $(document).on("click", ".derecho .home_flecha_cont", function(){
            //Se manda llamar la función que cambia los elementos con base en el JSON
            var este_boton = $(this);
            if(este_boton.hasClass('izquierda')){
                    $(".receta_home_cont").addClass("bajar_anim");
                    $(".sobre").addClass("subir_anim");
                    $("body, html").css("overflow", "hidden");
                    setTimeout( function () {
                        pos = (pos == 0) ? 21 : pos;
                        este.getTheJSON("recetas", "sobres", (pos-1), '', 'home');
                        pos--;
                        $(".receta_home_cont, .sobre").css("transition", "all 0ms ease-in-out");
                        $(".receta_home_cont").addClass("subir_anim");
                        $(".sobre").addClass("bajar_anim");
                        setTimeout( function () {
                            $(".receta_home_cont").removeClass("bajar_anim");
                            $(".sobre").removeClass("subir_anim");
                        },30 );
                    },410 );
                    setTimeout( function () {
                        $(".receta_home_cont, .sobre").css("transition", "all 400ms ease-in-out");
                        $(".receta_home_cont").removeClass("subir_anim");
                        $(".sobre").removeClass("bajar_anim");
                        setTimeout ( function () {
                            //$("body, html").css("overflow", "auto");
                        },200 );
                    },500 );
                }else{
                    $(".receta_home_cont").addClass("subir_anim");
                    $(".sobre").addClass("bajar_anim");
                    $("body, html").css("overflow", "hidden");
                    setTimeout( function () {
                        pos = (pos == 20) ? -1 : pos;
                        este.getTheJSON("recetas", "sobres", (pos+1), '', 'home');
                        pos++;
                        $(".receta_home_cont, .sobre").css("transition", "all 0ms ease-in-out");
                        $(".receta_home_cont").addClass("bajar_anim");
                        $(".sobre").addClass("subir_anim");
                        setTimeout( function () {
                            $(".receta_home_cont").removeClass("subir_anim");
                            $(".sobre").removeClass("bajar_anim");
                        },30 );
                    },410 );
                    setTimeout( function () {
                        $(".receta_home_cont, .sobre").css("transition", "all 400ms ease-in-out");
                        $(".receta_home_cont").removeClass("bajar_anim");
                        $(".sobre").removeClass("subir_anim");
                        setTimeout ( function () {
                            //$("body, html").css("overflow", "auto");
                        },50 );
                    },500 );
                }
        });
    },
    flechas_interior: function(position){
        var este = this;
        var elinterior;
        $(document).on("click", ".home_flecha_cont.flecha_int", function(){
            var este_boton = $(this);
            elinterior = este_boton.data('seccion');
            var elemento = ($(".sobre.sobre_interior").length > 0) ? ".sobre.sobre_interior" : ".receta_interior_contenedor";
            $(".plasta_circular").css("transition", "background-color 400ms ease-in-out");
            $(".receta_interior_cont").css("transition", "background-image 400ms ease-in-out");
            $(elemento).fadeOut(400, function(){
                //Se manda llamar la función que cambia los elementos con base en el JSON
                if(este_boton.hasClass('izquierda')){
                    position = (position == 0) ? 21 : position;
                    este.getTheJSON("recetas", "sobres", (position-1), site_url, elinterior);
                    position--;
                }else{
                    position = (position == 20) ? -1 : position;
                    este.getTheJSON("recetas", "sobres", (position+1), site_url, elinterior);
                    position++;
                }
                setTimeout(function(){
                    $(elemento).fadeIn(400);
                }, 200);
            });
            
        });
    },
    getInterior: function(){
        //Se obtiene los index de la variable de la URL
        var url = window.location.href;
        var indicador = url.indexOf('?');
        var indicador2 = url.indexOf('=');
        var indicador3 = url.indexOf('&');
        var este = this;
        //Si existe entramos
        if(indicador > -1){
            //Checamos que tenga variable de "origen" para enviarlos de regreso a ello
            if(indicador3 > -1){
                //No se necesita de momento pero aqui se obtiene la variable del origen
                var viene = url.substring(indicador3 + 1);
                var indicador4 = viene.indexOf('=');
                var origen = viene.substring(indicador4 + 1);
                url = url.replace('&'+viene, '');
                //Se cambia url si el origen es el home (solo el enlace desde el home tiene variable "viene")
                $(".cerrar_interior").attr('href', site_url);
            }
            //Se obtiene la variable de la URL
            var getvar = url.substring(indicador + 1);
            var file = getvar.split("=")[0];
            var key = url.substring(indicador2 + 1);
            //Obtenemos el objeto con la key de la variable de URL
            $.getJSON(site_url+file+".json", function(json) {
                var jsonItem = json[file][key];
                $(".derecho .plasta_circular").css("background-color", jsonItem.color);
                //Se envía la posición de la key para indexar la navegación entre recetas y sobres
                var laskeys = Object.keys(json[file]);
                //Se acomodan las keys en orden alfabético para que se mantenga el orden del diseño
                laskeys.sort();
                var position = laskeys.indexOf(key);
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
                    $(".receta_interior_titulo, .minutos_num, .porciones_num, .receta_interior_ingredientes").css('color', jsonItem.texto_color);
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
                    $(".sabor_interior_titulo span, .sabor_desc_titulo, .info_nutri_titulo").css('color', jsonItem.texto_color);
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
        var self = this;
        $.getJSON(site_url+file+".json", function(json) {
            var carpeta = (file == 'recetas') ? 'thumbs' : 'mini';
            var int = (file == 'recetas') ? 'receta_int' : 'sabor_int';
            var type; 
            $("."+file+"_thumbs_cont .row").html('');
            if(eltipo == 'todos'){
                for (const key in json[file]) {
                    $("."+file+"_thumbs_cont .row").append(`
                        <div class="col-6 col-md-3 receta_thumb_col">
                            <div class="receta_thumb_cont">
                                <a href="${int}.php?${file}=${key}"><img src="${site_url}img/${file}/${carpeta}/${key}.png" alt="" class="receta_thumb"></a>
                            </div>
                        </div>
                    `);
                }
                $("."+file+"_thumbs_cont .row").append('<div class="col-1 my-sizer-element"></div>');
                self.shuffleJS();
                
            }else{
                for (const key in json[file]) {
                    type = json[file][key].tipo;
                    if(eltipo == type){
                        $("."+file+"_thumbs_cont .row").append(`
                            <div class="col-6 col-md-3 receta_thumb_col">
                                <div class="receta_thumb_cont">
                                    <a href="${int}.php?${file}=${key}"><img src="${site_url}img/${file}/${carpeta}/${key}.png" alt="" class="receta_thumb"></a>
                                </div>
                            </div>
                        `);
                    }
                }
                $("."+file+"_thumbs_cont .row").append('<div class="col-1 my-sizer-element"></div>');
                self.shuffleJS();
                
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
    shuffleJS: function(){
        window.shuffleInstance = new window.Shuffle(document.getElementById('grid'), {
            itemSelector: '.receta_thumb_col',
            sizer: '.my-sizer-element',
          });
    },
    pruebas: function(){
        //alert("Width: "+$(window).width());
        //alert("Height: "+$(window).height());
    }
}