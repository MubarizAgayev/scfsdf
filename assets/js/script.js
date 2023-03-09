$(document).ready(function () {
    // $("#nav-area-up .nav-up-drowdowns .dropdown2 button").click(function () {
    //     $("#nav-area-up .nav-up-drowdowns .dropdown2 .dropdown-menu").fadeToggle(100)
    // })
    // $("#nav-area-up .nav-up-drowdowns .dropdown1 button").click(function () {
    //     $("#nav-area-up .nav-up-drowdowns .dropdown1 .dropdown-menu").fadeToggle(100)
    // })


    let listNavUpLeftDropDownLi = $("#nav-area-up .nav-up-drowdowns .dropdown1 .dropdown-menu li a span");
    listNavUpLeftDropDownLi.each(function () {
        $(this).click(function () {
            $("#nav-area-up .nav-up-drowdowns .dropdown1 button span").text($(this).text());
        })
    })


    let listNavUpRightDropDownLi = $("#nav-area-up .nav-up-drowdowns .dropdown2 .dropdown-menu li")

    listNavUpRightDropDownLi.each(function () {
        $(this).click(function () {
            $("#nav-area-up .nav-up-drowdowns .dropdown2 button span").text($(this).children().children().eq(1).text())

            $("#nav-area-up .nav-up-drowdowns .dropdown2 button img").attr("src", $(this).children().children().eq(0).attr("src"))
        })
    })

    $("#nav-area-down .navigation .pages-common .item").children().eq(4).click(function () {
        $("#nav-area-down .navigation .pages-common .item .dropdown-menu").fadeToggle(100)
    })




    $("#nav-area-mid .services .cart-logo").click(function () {
        $("#nav-area-mid .services .basket-modal").removeClass("d-none")
        $("#nav-area-mid .services .basket-modal").fadeToggle(100)
    })

    $('.slick_slide').slick({
        dots: true,
        autoplay: true,
        autoplaySpeed: 5000
    });



    $('.multiple-items').slick({
        infinite: true,
        slidesToShow: 5,
        slidesToScroll: 1,
        prevArrow: `<i class="fa-solid fa-angle-left left">`,
        nextArrow: `<i class="fa-solid fa-angle-right right">`,
    });

    $('.content-items').slick({
        dots: true,
        draggable:false
    });




    $("#products .tabs ul li").each(function () {
        $(this).click(function () {
            if ($(this).attr("data-id") == 3) {
                $(this).prev().css("background-color", "white")
                $(this).prev().prev().css("background-color", "white")
                $(this).prev().css("color", "gray")
                $(this).prev().prev().css("color", "gray")
                $(this).css("background-color", "lightgray")
                $(this).css("color", "black")
                $("#products .slick-dots").children().eq(2).children().eq(0).click()
                if ($("#products .tabs .line .underline").css("transform", "translateX(0px)")) {
                    $("#products .tabs .line .underline").css("transform", "translateX(405px)")
                }
                else {
                    $("#products .tabs .line .underline").css("transform", "translateX(180px)")
                }
            }
            if ($(this).attr("data-id") == 2) {
                $(this).prev().css("background-color", "white")
                $(this).next().css("background-color", "white")
                $(this).prev().css("color", "gray")
                $(this).next().css("color", "gray")
                $(this).css("background-color", "lightgray")
                $(this).css("color", "black")
                $("#products .slick-dots").children().eq(1).children().eq(0).click()
                if ($("#products .tabs .line .underline").css("transform", "translateX(0px)")) {
                    $("#products .tabs .line .underline").css("transform", "translateX(203px)")
                }
                else {
                    $("#products .tabs .line .underline").css("transform", "translateX(-180px)")
                }
            }
            if ($(this).attr("data-id") == 1) {
                $(this).next().css("background-color", "white")
                $(this).next().next().css("background-color", "white")
                $(this).next().css("color", "gray")
                $(this).next().next().css("color", "gray")
                $(this).css("background-color", "lightgray")
                $(this).css("color", "black")
                $("#products .slick-dots").children().eq(0).children().eq(0).click()
                $("#products .tabs .line .underline").css("transform", "translateX(0px)")
            }
        })
    })



    $("#products .card .eye").each(function () {
        $(this).click(function () {
            $("#products .btn-open").click();
            $(".modal-main .product-img").children().eq(0).attr("src", $(this).parent().prev().children().eq(0).attr("src"))
            $(".modal-main .product-content").children().eq(0).text($(this).parent().children().eq(1).text());
            $(".modal-main .product-content").children().eq(3).children().eq(1).text($(this).prev().prev().prev().children().eq(1).text());
        })
    })
    $(".product-content .bottom .input .plus").each(function () {
        $(this).click(function () {
            let num = $(this).prev().text()
            num++;
            console.log(num);
            $(this).prev().text(num);
            console.log($(this).prev().text());
        })
    })

    $(".product-content .bottom .input .minus").each(function () {
        $(this).click(function () {
            let num = $(this).next().text()
            num--;
            console.log(num);
            $(this).next().text(num)
            console.log($(this).next().text());
        })
    })

    $(".modal-content .close-icon").click(function () {
        $(".modal-content .btn-close").click()
    })



















    let products = [];

    if (localStorage.getItem("basket") != null) {
        products = JSON.parse(localStorage.getItem("basket"));
    }


    $("#products .content .card button").each(function () {
        $(this).click(function (e) {
            e.preventDefault();
            let productImg = $(this).parent().prev().children().eq(0).attr("src");
            let productName = $(this).prev().prev().prev().text();
            let productİd = parseInt($(this).parent().parent().attr("data-id"));
            let productPrize = parseInt($(this).prev().children().eq(1).text());
            let productTotalPrize = parseInt($(this).prev().children().eq(1).text());

            let existProduct = products.find(m => m.id == productİd);
            if (existProduct != undefined) {
                existProduct.count += 1;
                existProduct.totalPrize = productPrize * existProduct.count;
            }
            else {
                products.push({
                    id: productİd,
                    name: productName,
                    img: productImg,
                    count: 1,
                    prize: productPrize,
                    totalPrize: productTotalPrize
                })
            }

            localStorage.setItem("basket", JSON.stringify(products));

            getBasketCount($(products));
            getBasketPrize($(products));
            basketModal($(products))
            getModalTittleAndCount($(products))
        })
    })




    function getBasketCount(arr) {
        let sum = 0;
        for (const item of arr) {
            sum += item.count;
        }
        let cardSup = $("#nav-area-mid .cart-logo sup");
        cardSup.text(sum)

    }
    function getBasketPrize(arr) {
        let sum = 0;
        for (const item of arr) {
            sum += item.totalPrize;
        }
        let cardSub = $("#nav-area-mid .cart-logo .prize")
        cardSub.text(sum)
    }
    getBasketCount($(products));
    getBasketPrize($(products));
    getModalTittleAndCount();


    let listUl = document.querySelector("#nav-area-mid .basket-modal .basket-main ul")

    basketModal(products)
    function basketModal(arr) {
        $("#nav-area-mid .basket-modal .basket-main ul li").remove();
        if (arr.length != 0) {
            for (const item of arr) {
                $("#nav-area-mid .basket-modal .basket-main .note").addClass("d-none")
                $("#nav-area-mid .basket-modal .basket-main").css("padding-top", "10px")
                $("#nav-area-mid .basket-modal .basket-main").css("padding-bottom", "0px")
                $("#nav-area-mid .basket-modal").css("height", "400px")
                $("#nav-area-mid .basket-modal .last-part span").removeClass("d-none")
                $("#nav-area-mid .basket-modal .line2").removeClass("d-none")
                listUl.innerHTML += `<li data-id="${item.id}">
                <h5>${item.name}</h5>
                <i class="fa-solid fa-trash" data-id="${item.id}"></i>
                <span class="count">${item.count}</span>
                <span class="mid">X</span>
                <span class="prize">${item.prize}</span>
                </li>`
            }
            deleteIcons($("#nav-area-mid .basket-modal .basket-main ul li i"))
            getBasketCount($(products));
            getBasketPrize($(products));
        }
        getBasketCount($(products));
        getBasketPrize($(products));
    }






    function getModalTittleAndCount() {
        let sum = 0;
        let total = 0;
        for (const product of products) {
            sum += product.count
            total += product.totalPrize
        }
        $("#nav-area-mid .basket-modal .basket-up .count").text(sum)
        $("#nav-area-mid .basket-modal .last-part .prize").text(total)
    }



    function deleteProduct(id) {
        products = products.filter(m => m.id != id)
        localStorage.setItem("basket", JSON.stringify(products))
    }

    let icons = $("#nav-area-mid .basket-modal .basket-main ul li i");
    deleteIcons(icons);
    function deleteIcons(icons) {
        icons.each(function () {
            $(this).click(function () {
                let id = parseInt($(this).attr("data-id"))
                deleteProduct(id)
                $(this).parent().remove();
                if (products.length == 0) {
                    localStorage.removeItem("basket")
                    $("#nav-area-mid .basket-modal .last-part span").addClass("d-none")
                    $("#nav-area-mid .basket-modal .line2").addClass("d-none")
                    $("#nav-area-mid .basket-modal .basket-main .note").removeClass("d-none")
                    $("#nav-area-mid .basket-modal").css("height", "180px")
                    $("#nav-area-mid .basket-modal .basket-main").css("padding-top", "40px")
                }
                getModalTittleAndCount();
                getBasketCount($(products));
                getBasketPrize($(products));
            })
        })
    }








    let wishList = []

    if (localStorage.getItem("wishlist") != null) {
        wishList = JSON.parse(localStorage.getItem("wishlist"));
    }

    $("#products .content .card .heart").each(function () {
        $(this).click(function (e) {
            e.preventDefault();
            let wishProductImg = $(this).parent().prev().children().eq(0).attr("src");
            let wishProductName = $(this).prev().prev().prev().prev().text();
            let wishProductİd = parseInt($(this).parent().parent().attr("data-id"));
            let wishProductPrize = parseInt($(this).prev().prev().children().eq(1).text());


            let wishExistProduct = wishList.find(m => m.id == wishProductİd);
            let filteredWishList = wishList.filter(m=>m.id != wishProductİd);
            if (wishExistProduct == undefined) {
                $(this).removeClass("fa-regular fa-heart")
                $(this).addClass("fa-solid fa-heart")
                $(this).css("color","red")
                wishList.push({
                    id: wishProductİd,
                    name: wishProductName,
                    img: wishProductImg,
                    prize: wishProductPrize,
                })
                localStorage.setItem("wishlist", JSON.stringify(wishList));
            }
            else{
                $(this).removeClass("fa-solid fa-heart")
                $(this).addClass("fa-regular fa-heart")
                $(this).css("color","black")
                wishList = filteredWishList;
                if(wishList.length != 0){
                    localStorage.setItem("wishlist", JSON.stringify(wishList));
                }
                else{
                    localStorage.removeItem("wishlist")
                }
            }
        })
    })


    $("#products .content .card .heart").each(function(){
        let wishId = $(this).parent().parent().attr("data-id") ;
        if(wishList.find(m=>m.id == wishId)){
            $(this).removeClass("fa-regular fa-heart")
            $(this).addClass("fa-solid fa-heart")
            $(this).css("color","red")
        } 
        else{
            $(this).removeClass("fa-solid fa-heart")
            $(this).addClass("fa-regular fa-heart")
            $(this).css("color","black")
        }
    })




    let productDetail = []
    $("#products .content .card img").each(function(){
        $(this).click(function(){
            let producDetailtImg = $(this).attr("src")
            productDetail.pop();
            productDetail.push({
                img:producDetailtImg,
            })

            localStorage.setItem("product-detail",JSON.stringify(productDetail))
        })
    })

})











