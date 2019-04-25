$(document).ready(function () {
    app.init();
});

var app = {
    init: function(){
        this.menu();
        this.pruebas();
        this.masboton();
        this.getJSON('sobres', 0);
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
    getJSON: function(file, pos){
        var este = this;
        $.getJSON(file+".json", function(json) {
            var laskeys = Object.keys(json[file]);
            var first = laskeys[pos];
            este.tieJSON(first, "recetas");
        });
    },
    tieJSON: function(first, file2){
        var este = this;
        $.getJSON(file2+".json", function(json) {
            var laskeys2 = Object.keys(json[file2]);
            for (var i=0; i < laskeys2.length; i++){
                if(first == laskeys2[i]){
                    console.log(first, laskeys2[i]);
                }
            }
        });
    },
    pruebas: function(){
        //alert("Width: "+$(window).width());
        //alert("Height: "+$(window).height());
    }
}