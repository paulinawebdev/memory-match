$(document).ready(initializeApp);

function initializeApp() {
    populateCards();

    $(".card").on("click", function() {
        var card_click = $(this);
        cardClicked(card_click);
    });

    $("#reset-btn").on("click", function() {
        resetStats();
    });

    $("#close-popup").on("click", function() {
        $(".popup").removeClass("show");
    });

    $("#tryagain-btn").on("click", function() {
        tryAgainClick();
    });

    popupStan();
    displayStats();
}

var imgArrayMain = ["batman-1.jpg", "batman-2.jpg","captainamerica-1.jpg", "captainamerica-2.jpg", "flash-1.jpg", "flash-2.jpg", "harleyquinn-1.jpg", "harleyquinn-2.jpg", "hulk-1.jpg", "hulk-2.jpg", "ironman-1.jpg", "ironman-2.jpg", "spiderman-1.jpg", "spiderman-2.jpg", "superman-1.jpg", "superman-2.jpg", "venom-1.jpg", "venom-2.jpg"];
var imgArrayPop = ["batman-1.jpg", "batman-2.jpg","captainamerica-1.jpg", "captainamerica-2.jpg", "flash-1.jpg", "flash-2.jpg", "harleyquinn-1.jpg", "harleyquinn-2.jpg", "hulk-1.jpg", "hulk-2.jpg", "ironman-1.jpg", "ironman-2.jpg", "spiderman-1.jpg", "spiderman-2.jpg", "superman-1.jpg", "superman-2.jpg", "venom-1.jpg", "venom-2.jpg"];

var first_card_clicked = null;
var second_card_clicked = null;
var total_possible_matches = (imgArrayMain.length / 2);
var matches = 0;
var attempts = 0;
var accuracy = 0;
var games_played = 0;

var first_card_src;
var second_card_src;

var attempts_val;
var matches_val;
var accuracy_val;
var games_val;


function populateCards() {
    var card_max_cols = 6; // should be divisible by 18
    var game_area = $("#game-area");

    for (var col_count = 0; col_count < card_max_cols; col_count++) {

        var card_col = $("<div>").addClass("card-col");

        game_area.append(card_col);

        for (var card_count = 0; card_count < Math.ceil(imgArrayMain.length / card_max_cols); card_count++ ) {

            var random_index = Math.floor(Math.random() * imgArrayPop.length)
            var random_card = imgArrayPop[random_index];

            imgArrayPop.splice(random_index, 1);

            var card_container = $("<div class='card'>");
            var card_inside = $("<div class='card-inside'>");
            var card_img_back = $("<img>").attr("src", "img/card-back1.jpg");
            var card_img_front = $("<img>").attr("src", "img/" + random_card);
            var card_front = $("<div class='card-front'>").append(card_img_front);
            var card_back = $("<div class='card-back'>").append(card_img_back);
    
            card_container.append(card_inside);
            card_inside.append(card_front, card_back);
            card_col.append(card_container);

        }

    }
}

function cardClicked(card_click) {
    var card_img = card_click.find("img");
    var card_src = $(card_img[0]).attr("src");
    
    card_src = card_src.split("/");
    card_src = card_src[1].split("-");
    card_src = card_src[0];

    if ($(card_click).attr('class') === "card reveal") {
        return;
    }

    if (first_card_clicked === null) {

        first_card_src = card_src;
        first_card_clicked = card_click;

        $(first_card_clicked).addClass("reveal");


    } else if (second_card_clicked === null) {
        
        second_card_src = card_src;
        second_card_clicked = card_click;

        $(second_card_clicked).addClass("reveal");

        attempts++;

        displayStats();

        if (first_card_src === second_card_src) {

            matches++;

            displayStats();

            var first_card_click_inside = $(first_card_clicked).find(".card-inside");
            var second_card_click_inside = $(second_card_clicked).find(".card-inside");

            first_card_click_inside.addClass("match").find(".card-front, .card-back").addClass("no-shadow");
            second_card_click_inside.addClass("match").find(".card-front, .card-back").addClass("no-shadow");

            first_card_clicked = null;
            second_card_clicked = null;

            if (matches === total_possible_matches) {
                setTimeout(function(){
                    winningDisplay()
                }, 500)
            }
            return;
        } else {
            setTimeout(function(){
                $(first_card_clicked).removeClass("reveal");
                $(second_card_clicked).removeClass("reveal");

                first_card_clicked = null;
                second_card_clicked = null;
            }, 1000)
        }

    }
}

function displayStats() {
    attempts_val = $(".attempts .value");
    matches_val = $(".matches .value");
    accuracy_val = $(".accuracy .value");
    games_val = $(".games-played .value");

    accuracy = (matches / attempts) * 100;

    if (isNaN(accuracy)) {
        accuracy = 0;
    }

    if (accuracy < 30) {
        $("#popup-submsg").text("But that took a lot of tries...");
    } else {
        $("#popup-submsg").text("You're pretty good...");
    }

    attempts_val.text(attempts);
    matches_val.text(matches);
    accuracy_val.text(accuracy.toFixed(0) + "%");
    games_val.text(games_played);
}

function resetStats() {
    games_played++;

    accuracy = 0;
    matches = 0;
    attempts = 0;

    $("#reset-btn").off();

    $(".stanlee-popup").remove();
    $(".card").removeClass("reveal");
    $(".card-inside").removeClass("match winning");

    imgArrayMain = ["batman-1.jpg", "batman-2.jpg","captainamerica-1.jpg", "captainamerica-2.jpg", "flash-1.jpg", "flash-2.jpg", "harleyquinn-1.jpg", "harleyquinn-2.jpg", "hulk-1.jpg", "hulk-2.jpg", "ironman-1.jpg", "ironman-2.jpg", "spiderman-1.jpg", "spiderman-2.jpg", "superman-1.jpg", "superman-2.jpg", "venom-1.jpg", "venom-2.jpg"];
    imgArrayPop = ["batman-1.jpg", "batman-2.jpg","captainamerica-1.jpg", "captainamerica-2.jpg", "flash-1.jpg", "flash-2.jpg", "harleyquinn-1.jpg", "harleyquinn-2.jpg", "hulk-1.jpg", "hulk-2.jpg", "ironman-1.jpg", "ironman-2.jpg", "spiderman-1.jpg", "spiderman-2.jpg", "superman-1.jpg", "superman-2.jpg", "venom-1.jpg", "venom-2.jpg"];

    first_card_src = null;
    second_card_src = null;

    $(".card-col").remove();
    initializeApp()

}


function winningDisplay() {
    $(".card-inside").addClass("winning");
    $(".winning-popup.popup").addClass("show");
}

function tryAgainClick() {
    $(".winning-popup.popup").removeClass("show");
    resetStats()
}

function popupStan() {

    var stanlee_popup = $(".stanlee-popup");

    setInterval(function(){ 
        var randomX = Math.random() * 90;
        stanlee_popup.css({"opacity" : 1, "left": randomX + "%", "height": "50px", "width": "50px"});

        setTimeout(function() {
            stanlee_popup.css({"opacity": 0, "height": "0", "width": "0"});
        }, 1000);
    }, 3000);

    stanlee_popup.on("click", stanGivesHint);

}

function stanGivesHint() {
    playGameSound()

    $(".card").addClass("stanhint");

    setTimeout(function() {
        $(".card").removeClass("stanhint");
    }, 1100);
}

function playGameSound() {
    var gameSound = new Audio('sound/retro-game-sound.flac');
    gameSound.volume = .2;
    gameSound.play();
}