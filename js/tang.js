$(document).ready(function () {
    app.init();
});

var app = {
    init: function(){
        this.menu();
        this.pruebas();
    },
    menu: function(){
        $(document).on('click', ".hamburger_cont", function (e) {
            var este = $(this);
            var hamburger = este.find(".hamburger");
            console.log(hamburger);
            $(hamburger).toggleClass("is-active");
        });
    },
    pruebas: function(){
        //alert($(window).height());
    }
}