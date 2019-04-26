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
            this.getJSON('recetas', 'sobres', 0);
        }
        this.colores_home();
        this.flechas_home();
        this.getInterior();
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
        });
    },
    getJSON: function(file, file2, pos){
        $.getJSON(site_url+file+".json", function(json) {
            $(".colores_cont").html("");
            var laskeys = Object.keys(json[file]);
            console.log(laskeys);
            var first = laskeys[pos];
            for (var h=0; h < laskeys.length; h++){
                $(".colores_cont").append('<div class="colores_item" data-pos="'+h+'" style="background-color:'+json[file][laskeys[h]].color+'"></div>');
            }
            $.getJSON(site_url+file2+".json", function(json2) {
                var laskeys2 = Object.keys(json2[file2]);
                for (var i=0; i < laskeys2.length; i++){
                    if(first == laskeys2[i]){
                        var nombres = json[file][first].nombre.split(" ");
                        var media = Math.floor(nombres.length/2);
                        var nomb = "", nomb2 = "";
                        for(var k=0; k<media; k++)
                             nomb = nomb + nombres[k] + " ";
                        for(var j=media; j<nombres.length; j++)
                             nomb2 = nomb2 + nombres[j] + " ";
                        var elnombre = nomb+"<br><span>"+nomb2+"</span>";
                        $(".derecho .plasta_circular").css('background-color', json[file][first].color);
                        $(".receta_home_nombre").html(elnombre);
                        $(".receta_home_img").attr("src", json[file][first].home_img_url);
                        $(".sobre_home").attr("src", json2[file2][laskeys2[i]].img_url);
                        $(".receta_home_img_a").attr("href", json[file][first].link);
                        $(".sobre_home_a").attr("href", json2[file2][laskeys2[i]].link);
                    }
                }
            });
        });
    },
    colores_home: function(){
        var este = this;
        $(document).on("click", ".colores_item", function(){
            pos = $(this).data('pos');
            este.getJSON("recetas", "sobres", pos);
        });
    },
    flechas_home: function(){
        var este = this;
        $(document).on("click", ".home_flecha_cont", function(){
            if($(this).hasClass('izquierda')){
                pos = (pos == 0) ? 21 : pos;
                este.getJSON("recetas", "sobres", (pos-1));
                pos--;
            }else{
                pos = (pos == 20) ? -1 : pos;
                este.getJSON("recetas", "sobres", (pos+1));
                pos++;
            }
        });
    },
    getInterior: function(){
        var url = window.location.href;
        var indicador = url.indexOf('?');
        var indicador2 = url.indexOf('=');
        if(indicador > -1){
            var getvar = url.substring(indicador + 1);
            var file = getvar.split("=")[0];
            console.log(file);
            var key = url.substring(indicador2 + 1);
            $.getJSON(site_url+file+".json", function(json) {
                var jsonItem = json[file][key];
                $(".derecho .plasta_circular").css("background-color", jsonItem.color);
                if(file == 'recetas'){
                    $(".receta_interior_cont").css("background-image", jsonItem.img_url);
                }
            });
        }
    },
    pruebas: function(){
        //alert("Width: "+$(window).width());
        //alert("Height: "+$(window).height());
    }
}