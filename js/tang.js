$(document).ready(function () {
    app.init();
});
let position = 0;
const site_url = '/tangMexico/';
let primeraVes = true;
let primerCarga = true;
let sobres, frutas;
const app = {
    init: () => {
        app.menu();
        app.masboton();
        app.getTheJSON(0);
        app.colores_home();
        app.flechas_home();
        $(".frutas_home").remove();
    },
    menu: () => {
        $(document).on('click', ".hamburger_cont", function (e) {
            var este = $(this);
            var hamburger = este.find(".hamburger");
            if(!hamburger.hasClass('is-active')){
                $(".menu_cont, .logo, .logo_2").addClass("madera_move");
                setTimeout( () => {
                    $(".madera").each(function (i) {
                        var maderaSelec = $(this);
                        setTimeout( () => {maderaSelec.addClass("madera_move");}, i*120);
                    });
                    setTimeout( () => {$(".menu_botones").addClass("madera_move");}, 500);
                }, 20);
            }else{
                $(".menu_botones").removeClass("madera_move");
                $(".madera").each(function (i) {
                    var maderaSelec = $(this);
                    setTimeout( () => {maderaSelec.removeClass("madera_move");}, i*120);
                });
                setTimeout( () => {$(".menu_cont").removeClass("madera_move");}, 700);
                setTimeout( () => {$(".logo, .logo_2").removeClass("madera_move");}, 200);
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
        var laskeys, randomKeys;
        //Obtenemos el primer Json
        $.getJSON(site_url+"sobres.json", function(json) {
            sobres = json;
            //Reseteamos el menu de colores
            $(".colores_cont").html("");
            //Obtenemos un Array con los keys del objeto JSON y obtenemos los colores de cada botón
            laskeys = Object.keys(sobres);
            randomKeys = app.randomizeArray(laskeys);
            let sobresKeys = sobres[randomKeys[0]];
            $(".colores_cont").append('<div class="colores_item" style="background-color:'+sobresKeys.color+'"></div>');
            $(".fondo_madera").css("background-image", "url("+site_url+"/img/fondos/"+randomKeys[0]+"-izq.jpg)");
            $(".plasta_circular").css("background-image", "url("+site_url+"/img/fondos/"+randomKeys[0]+"-der.png)");
            $("html, body").css("overflow", "hidden");
            //Pone imagenes y textos en el home
            //$(".derecho .plasta_circular").css('background-image', 'url('+site_url+'/img/fondos/'+randomKeys[0]+'-der.jpg)');
            $(".sobre_sabor_nombre").html("TANG "+sobresKeys.nombre);
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
        var este = this;
        $(document).on("click", ".colores_item", function(){
            pos = $(this).data('pos');
            //Se añaden clases que animan la plasta y el sobre
            $(".plasta_circular").addClass('bounce-scale');
            $(".izquierdo .sobre_cont").addClass("rotate-scale");
            setTimeout( () => {
                //Se manda llamar la función que cambia los elementos con base en el JSON
                este.getTheJSON("recetas", "sobres", pos);
            }, 250);
            setTimeout( () => {
                //Se regresan a su estado original los elementos quitando las clases o añadiendo nuevas para mejorar la animación
                $(".plasta_circular").addClass('bounce-scale2');
                $(".izquierdo .sobre_cont").removeClass("rotate-scale");
                setTimeout( () => {
                    // Se quitan todas las clases para reiniciar las animaciones
                    $(".plasta_circular").removeClass('bounce-scale');
                    $(".plasta_circular").removeClass('bounce-scale2');
                }, 510);
            }, 800);
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
    flechaClick: (flecha) => {
        let esteTransform, esteHeight, topAnimation = .8, estevelocidad = 50;
        let masmenos = flecha == 'izq' ? 1 : -1;
        let menosmas = flecha == 'izq' ? -1 : 1;
        let bajasube = flecha == 'izq' ? 'bajar_anim' : 'subir_anim';
        let subebaja = flecha == 'izq' ? 'subir_anim' : 'bajar_anim';
        let keySize = Object.keys(sobres).length;
        let tamano = flecha == 'izq' ? 0 : keySize;
        let tamano2 = flecha == 'izq' ? (keySize+1) : -1;

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
            position = (position == tamano) ? tamano2 : position;
            if(flecha == 'izq'){position--;}else{position++;}
            $(".receta_home_cont, .sobre_cont").css("transition", "all 0ms ease-in-out");
            $(".receta_home_cont").addClass(subebaja);
            $(".sobre_cont").addClass(bajasube);
            setTimeout( () => {
                $(".receta_home_cont").removeClass(bajasube);
                $(".sobre_cont").removeClass(subebaja);
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
                este.css('top',(esteTransform+(((esteHeight*topAnimation)*menosmas)+(esteHeight*menosmas)))+'px');
                (function(esteTransform){
                    setTimeout( () => {
                        este.css("transition", "all 400ms ease-in-out");
                        este.css('top',(esteTransform+(esteHeight*topAnimation*menosmas))+'px');
                        este.css('opacity', 1);
                    }, estevelocidad*index);
                })(esteTransform);
            });
        },500 );
    }
}