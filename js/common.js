$(document).ready(function(){

    $(".phone").mask("+ 7 ( 999 ) 999 99 99?");

    /*popup*/
        $('.popup-with-move-anim').magnificPopup({
            type: 'inline',
            autoFocusLast: false,
            fixedContentPos: false,
            fixedBgPos: false,

            overflowY: 'auto',

            closeBtnInside: true,
            preloader: false,
            
            midClick: true,
            removalDelay: 300,
            mainClass: 'my-mfp-slide-bottom'
        });
    /*popup*/

    /*ajax send*/
    function az_validateEmail(email2) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email2);
    }
    function cleanTnakns(form){
        $('input[type="text"]').removeClass("error-input");
        $("input[type=text], textarea").val("");
        $(form).parents('.popup-first').hide().next('.popup-thanks').show();
    }

    $('*:not(input[name="tel"])').mousedown(function() { 
        $('input[type="text"], textarea').removeClass("error-input");
    });

    $('.az-send').submit(function(){
        var uname = $(this).find('input[name="uname"]');
        var tel = $(this).find('input[name="tel"]');
        var empty = false;
        var az_this = $(this);
        reg_tel = /^((8|\+ 7 )[\- ]?)?(\( ?\d{3} \) ?[\- ]?)?[\d\- ]{7,13}$/
        if (!reg_tel.test(tel.val())){
            empty = true;
        }
        if(uname.val() == ''){
            uname.addClass("error-input");
            uname.focus();
        }else if (empty == true){
            tel.addClass("error-input");
            tel.focus();
        }else{
            var form_data = $(this).serialize()+'&url='+location.href;
            $.ajax({
                type: "POST", 
                url: "/sender.php", 
                data: form_data,
                success: function(data) {
                    data2 = eval('('+data+')');
                    if(data2.result){
                        yaCounter42534779.reachGoal('actionzayavka');
                        $('input[type="text"]').removeClass("error-input");
                        $("input[type=text], textarea").val("");
                        az_this.parents('.popup-first').hide().next('.popup-thanks').show();
                    }else{
                    }
                }
            });
        }
        return false;
    });
    $('.az-send2').submit(function(){
        var email = $(this).find('input[name="email"]');
        var uname = $(this).find('input[name="uname"]');
        var text = $(this).find('textarea');
        var empty = false;
        var az_this = $(this);
        if (!az_validateEmail(email.val())){
            empty = true;
        }
        if(uname.val() == ''){
            uname.addClass("error-input");
            uname.focus();
        }else if(empty == true){
            email.addClass("error-input");
            email.focus();
        }else if(text.val() == ''){
            text.addClass("error-input");
            text.focus();
        }else{
            var form_data = $(this).serialize()+'&url='+location.href;
            $.ajax({
                type: "POST", 
                url: "/sender.php", 
                data: form_data,
                success: function(data) {
                    data2 = eval('('+data+')');
                    if(data2.result){
                        yaCounter42534779.reachGoal('actionzayavka');
                        $('#az-thanks').trigger('click');
                    }else{
                    }
                }
            });
        }
        return false;
    });
    /*ajax send*/

    // $(window).scroll(function(){
    //     if($(window).scrollTop()>100){
    //         $('.header-inner').addClass('az-mob-menu-fix');
    //     }else{
    //         $('.header-inner').removeClass('az-mob-menu-fix');
    //     }
    //     if($(window).scrollTop()>200){
    //         $('.header-inner').addClass('az-mob-menu-fix2');
    //     }else{
    //         $('.header-inner').removeClass('az-mob-menu-fix2');
    //     }
    // });

    
    $(".menu").on("click","a", function (event) {
        event.preventDefault();
        var id  = $(this).attr('href'),
            top = $(id).offset().top;
        $('body,html').animate({scrollTop: top}, 1500);
        return false;
    });

    $(".toggle-mnu").click(function() {
        $(this).toggleClass("on");
        $('.menu').toggleClass("on");
        return false;
    });

    $(window).scroll(function(){
        var tax = $('#tax').offset().top;
        var tax_table = $('.tax-table').offset().top;
        if(($(window).scrollTop() > tax && $(window).scrollTop() < (tax + $('.tax').height()))||($('body').scrollTop() > tax && $('body').scrollTop() < (tax + $('.tax').height()))){
            $('.table-left-right').css("top", $(this).scrollTop() - tax);
        }
        if(window.matchMedia( "(max-width: 1200px)" ).matches){
            if(($(window).scrollTop() > tax_table && $(window).scrollTop() < (tax_table + $('.tax-table').height()-100))||($('body').scrollTop() > tax_table && $('body').scrollTop() < (tax_table + $('.tax-table').height()-100))){
                $('.tax-table tr:first-child').addClass("abs");
                $('.tax-table tr:first-child').css("top", $(this).scrollTop() - tax - 35);
                $(".tax-subtitle").css("margin-bottom", "83px");
            }else{
                $('.tax-table tr:first-child').removeClass("abs");
                $(".tax-subtitle").css("margin-bottom", "0");
            }
        }
        $(".toggle-mnu").removeClass("on");
        $('.menu').removeClass("on");
    });

    var th_visible = 0;
    var th_active = 1;
    $(".tax-table tr:first-child th").each(function(i){
        if($(this).is(":visible")){
            th_visible++;
        }
    });
    $(window).resize(function(){
        th_visible = 0;
        $(".tax-table tr:first-child th").each(function(i){
            if($(this).is(":visible")){
                th_visible++;
            }

        });
        $(".tax-table tr:first-child th, .tax-table tr td").removeAttr("style");
    });

    $(".table-left").click(function(){
        if(th_active>1){
            $(".tax-table tr").each(function(){
                $(this).find("td").eq(th_active-1).show();
                $(this).find("th").eq(th_active-1).show();
                $(this).find("td").eq(th_active+th_visible-2).hide();
                $(this).find("th").eq(th_active+th_visible-2).hide();
            });
            th_active--;
        }
        return false;
    });
    $(".table-right").click(function(){
        if((th_active+th_visible-1)<$(".tax-table tr:first-child th").length){
            
            $(".tax-table tr").each(function(){
                $(this).find("td").eq(th_active).hide();
                $(this).find("th").eq(th_active).hide();
                $(this).find("td").eq(th_active+th_visible-1).show();
                $(this).find("th").eq(th_active+th_visible-1).show();
            });
            th_active++;
        }
        return false;
    });

});


