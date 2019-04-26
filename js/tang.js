$(document).ready(function () {
    app.init();
});

var app = {
    init: function(){
        this.menu();
        this.pruebas();
        this.masboton();
        this.getJSON('recetas', 'sobres', 0);
        this.colores_home();
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
        $.getJSON(file+".json", function(json) {
            $(".colores_cont").html("");
            var laskeys = Object.keys(json[file]);
            var first = laskeys[pos];
            for (var h=0; h < laskeys.length; h++){
                $(".colores_cont").append('<div class="colores_item" data-pos="'+h+'" style="background-color:'+json[file][laskeys[h]].color+'"></div>');
            }
            $.getJSON(file2+".json", function(json2) {
                var laskeys2 = Object.keys(json2[file2]);
                for (var i=0; i < laskeys2.length; i++){
                    if(first == laskeys2[i]){
                        var nombres = json[file][first].nombre.split(" ");
                        var media = Math.floor(nombres.length/2);
                        var nomb = "";
                        var nomb2 = "";
                        for(var k=0; k<media; k++){
                             nomb = nomb + nombres[k] + " ";
                        }
                        for(var j=media; j<nombres.length; j++){
                             nomb2 = nomb2 + nombres[j] + " ";
                        }
                        var elnombre = nomb+"<br><span>"+nomb2+"</span>";
                        $(".derecho .plasta_circular").css('background-color', json[file][first].color);
                        $(".receta_home_nombre").html(elnombre);
                        $(".receta_home_img").attr("src", json[file][first].img_url);
                        $(".sobre_home").attr("src", json2[file2][laskeys2[i]].img_url);
                        // console.log(json[file][first].img_url);
                        // console.log(json2[file2][laskeys2[i]].img_url);
                    }
                }
            });
        });
    },
    colores_home: function(){
        var este = this;
        $(document).on("click", ".colores_item", function(){
            var pos = $(this).data('pos');
            este.getJSON("recetas", "sobres", pos);
        });
    },
    pruebas: function(){
        //alert("Width: "+$(window).width());
        //alert("Height: "+$(window).height());
    }
}