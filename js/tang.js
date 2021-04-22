$(document).ready(function () {
    app.init();
});
let position = 0;
const site_url = '/developer/tangMexico/';
let primeraVes = true;
let primerCarga = true;
let sobres, frutas, laskeys, randomKeys;
let videoFlag = true;
const app = {
    init: () => {
        app.menu();
        app.masboton();
        app.getTheJSON(0);
        app.colores_home();
        app.flechas_home();
        $(".frutas_home").remove();
        if(videoFlag){
            document.getElementById('video-tang').addEventListener('canplay',app.videoEnds,false);
            document.getElementById('video-tang-mobile').addEventListener('canplay',app.videoEnds,false);
        }
    },
    menu: () => {
        $(document).on('click', ".hamburger_cont", function (e) {
            var este = $(this);
            var hamburger = este.find(".hamburger");
            if(!hamburger.hasClass('is-active')){
                $(".menu_cont").fadeIn(300);
                $(".logo").addClass("madera_move");
                setTimeout( () => {setTimeout( () => {$(".menu_botones").addClass("madera_move");}, 500);}, 20);
            }else{
                $(".menu_botones").removeClass("madera_move");
                setTimeout( () => {$(".menu_cont").fadeOut(300);}, 700);
                setTimeout( () => {$(".logo").removeClass("madera_move");}, 200);
            }
            $(hamburger).toggleClass("is-active");
        });
    },
    masboton: () => {
        $(document).on("click", ".mas_nav_cont.mas_nav_home_button", function () {
            $(".colores_cont").slideToggle(400);
            $(this).toggleClass("is-active");
        });
    },
    getTheJSON: function(pos){
        //Obtenemos el primer Json
        $.getJSON(site_url+"sobres.json", function(json) {
            sobres = json;
            //Reseteamos el menu de colores
            $(".colores_cont").html("");
            //Obtenemos un Array con los keys del objeto JSON y obtenemos los colores de cada botón
            laskeys = Object.keys(sobres);
            randomKeys = app.randomizeArray(laskeys);
            let sobresKeys = sobres[randomKeys[0]];
            laskeys.forEach(function (it, i){
                $(".colores_cont").append('<div class="colores_item" data-sabor="'+i+'" style="background-color:'+sobres[randomKeys[i]].color+'"></div>');
            });
            $(".fondo_madera").css("background-image", "url("+site_url+"/img/fondos/"+randomKeys[0]+"-izq.jpg)");
            $(".plasta_circular").css("background-image", "url("+site_url+"/img/fondos/"+randomKeys[0]+"-der.png)");
            $("html, body").css("overflow", "hidden");
            $(".sobre_sabor_nombre").html("TANG "+sobresKeys.nombre);
            app.textoCurveado();
            $(".sobre_home").attr("src", site_url+"/img/sobres/"+randomKeys[0]+".jpg");
            $(".frase_img").attr("src", site_url+"/img/frases/"+randomKeys[0]+".png");
            $.getJSON(site_url+"frutas.json", function(json_frutas){
                frutas = json_frutas;
                let frutasKeys = frutas[randomKeys[0]];
                frutasKeys.frutas_pos.forEach(function(item, index){
                    $(".fondo_madera .derecho").append('<img src="'+site_url+"/img/frutas/"+randomKeys[0]+'-'+(index+1)+'.png" class="frutas_home" style="top:'+item[1]+'%; left:'+item[0]+'%; transform: translate('+frutasKeys.frutas_transform[index][0]+'%, '+frutasKeys.frutas_transform[index][1]+'%);">');
                });
            })
        });
        //Obtenemos el JSON de las frutas individuales

    },
    colores_home: () => {
        $(document).on("click", ".colores_item", function(){
            $(".colores_cont").slideToggle(400);
            $(".mas_nav_cont.mas_nav_home_button").toggleClass("is-active");
            let sabor = parseInt($(this).data('sabor'));
            app.flechaClick('der', (sabor-1));
        });
    },
    flechas_home: () => {
        $(document).on("click", ".derecho .home_flecha_cont", function(){
            //Se manda llamar la función que cambia los elementos con base en el JSON
            var este_boton = $(this);
                if(este_boton.hasClass('izquierda')){
                    app.flechaClick('izq');
                }else{
                    app.flechaClick('der');
                }
        });
    },
    contacto: () => {
        $(document).on("click", ".enviar_contacto", function(){
            var nombre = $("#nombre").val();
            var mail = $("#mail").val();
            var duda = $("#duda").val();
            if(nombre != '' && mail != '' && duda != ''){
                $.post(site_url+"send.php", {nombre:nombre, mail:mail, duda:duda},
                    function (data) {
                        alert("Tu mensaje ha sido enviado");
                        $("#nombre").val('');
                        $("#mail").val('');
                        $("#duda").val('');
                    }
                );
            }else{
                alert('Completa todos los campos, por favor.');
            }
        });
    },
    randomizeArray: (array) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    },
    flechaClick: (flecha, sabor = 0) => {
        let esteTransform, esteHeight, topAnimation = .8, estevelocidad = 50;
        let masmenos = flecha == 'izq' ? 1 : -1;
        let menosmas = flecha == 'izq' ? -1 : 1;
        let bajasube = flecha == 'izq' ? 'bajar_anim' : 'subir_anim';
        let subebaja = flecha == 'izq' ? 'subir_anim' : 'bajar_anim';
        let keySize = Object.keys(sobres).length;
        let tamano = flecha == 'izq' ? 1 : keySize;
        let tamano2 = flecha == 'izq' ? (keySize) : -1;
        position = sabor === 0 ? position : sabor;

        $(".frutas_home").each(function (index, element) {
            var este = $(this);
            esteTransform = parseInt(este.css('top'));
            esteHeight = este.outerHeight();
            (function(esteTransform){
                setTimeout( () => {
                    este.css('top',(esteTransform+((esteHeight*topAnimation)*masmenos))+'px');
                    este.css('opacity', 0);
                }, estevelocidad*index);
            })(esteTransform);
        });
        $(".receta_home_cont").addClass(bajasube);
        $(".sobre_cont").addClass(subebaja);
        $("body, html").css("overflow", "hidden");
        setTimeout( () => {
            position = (position == (tamano-1)) ? tamano2 : position;
            if(flecha == 'izq'){position--;}else{position++;}
            let sobresKeys = sobres[randomKeys[position]];
            $(".fondo_madera").css("background-image", "url("+site_url+"/img/fondos/"+randomKeys[position]+"-izq.jpg)");
            $(".plasta_circular").css("background-image", "url("+site_url+"/img/fondos/"+randomKeys[position]+"-der.png)");
            $("html, body").css("overflow", "hidden");
            $(".sobre_sabor_nombre").html("TANG "+sobresKeys.nombre);
            $(".sobre_home").attr("src", site_url+"/img/sobres/"+randomKeys[position]+".jpg");
            $(".frase_img").attr("src", site_url+"/img/frases/"+randomKeys[position]+".png");
            $(".frutas_home").remove();
            let frutasKeys = frutas[randomKeys[position]];
            frutasKeys.frutas_pos.forEach(function(item, index){
                $(".fondo_madera .derecho").append('<img src="'+site_url+"/img/frutas/"+randomKeys[position]+'-'+(index+1)+'.png" class="frutas_home" style="top:'+item[1]+'%; left:'+item[0]+'%; transform: translate('+frutasKeys.frutas_transform[index][0]+'%, '+frutasKeys.frutas_transform[index][1]+'%);opacity: 0">');
            });
            $(".receta_home_cont, .sobre_cont").css("transition", "all 0ms ease-in-out");
            $(".receta_home_cont").addClass(subebaja);
            $(".sobre_cont").addClass(bajasube);
            setTimeout( () => {
                $(".receta_home_cont").removeClass(bajasube);
                $(".sobre_cont").removeClass(subebaja);
                app.textoCurveado();
            },30 );
        },410 );
        setTimeout( () => {
            $(".receta_home_cont, .sobre_cont").css("transition", "all 400ms ease-in-out");
            $(".receta_home_cont").removeClass(subebaja);
            $(".sobre_cont").removeClass(bajasube);
            $(".frutas_home").each(function (index, element) {
                var este = $(this);
                esteTransform = parseInt(este.css('top'));
                esteHeight = este.outerHeight();
                $(".frutas_home").css("transition", "all 0ms ease-in-out");
                este.css('top',esteTransform+(esteHeight*topAnimation)*menosmas+'px');
                (function(esteTransform){
                    setTimeout( () => {
                        este.css("transition", "all 400ms ease-in-out");
                        este.css('top', esteTransform+'px');
                        este.css('opacity', 1);
                    }, estevelocidad*index);
                })(esteTransform);
            });
        },500 );
    },
    textoCurveado: () => {
        const circleType = new CircleType(document.getElementById('nombre'));
        circleType.dir(-1).radius(384);
    },
    videoEnds: () => {
        let duracionVideo1 = 2000;
        videoFlag = false;
        setTimeout(() => {
            $(".boton_video").fadeIn( 500, function () {
                $(this).click(function () {
                    $(".boton_video").fadeOut(300, function() {$(".boton_video").remove()});
                    $("#video-tang").attr('src', 'video/video2.mp4');
                    $("#video-tang-mobile").attr('src', 'video/video2_mobile.mp4');
                    $("#video-tang, #video-tang-mobile").get(0).play();
                    let min_tiempo = 1500, max_tiempo = 3800;
                    let tiempo =  parseInt(Math.random() * (max_tiempo - min_tiempo) + min_tiempo);
                    setTimeout(() => {
                        $("#video-tang, #video-tang-mobile").get(0).pause();
                        $(".video_cont").fadeOut(600);
                    }, tiempo);
                });
            });
        }, duracionVideo1);
    }
}