window.onload = function () {
    $('#submit').click(function () {
        let sanitizedNames = Sanitize($('#input-form1').val());
        if (sanitizedNames !== "")
        {
            window.location = "gift-results.html";
            sessionStorage.setItem("names", sanitizedNames);
        }
    });
    GenerateFlakes(50);
    $('.sub-container').fadeOut(0).delay(1000).fadeIn(2000);
}

function GenerateFlakes(numberOfFlakes)
{
    for (let i = 0; i < numberOfFlakes; i++)
    {
        Flake("flake" + i, GetRandInt(5, 95), GetRandInt(-15, -40));
    }
}

function Flake(flakeId, flakeXPos, flakeYPos = 0) {
    flakeTypes = [ 'flake-small', 'flake-small', 'flake-small',
                   'flake-medium', 'flake-medium', 'flake-large']; // higher chance for medium and small flakes

    let rand = GetRandInt(0, flakeTypes.length);
    let flakeType = flakeTypes[rand];
    let speed = {
        "flake-small": GetRandInt(3000, 5000),
        "flake-medium": GetRandInt(6000, 8000),
        "flake-large": GetRandInt(10000, 11000)
    };

    $('body').prepend('<img id="' + flakeId + '" class="' + flakeType + '" style="left: ' + flakeXPos + 'vw; top: ' + flakeYPos + 'vw;" src="images/flake1.png">');
    let flake = $("#" + flakeId);
    flake.animate({
        top: "110vh",
        left: flakeXPos / 1.33 + "vw",
        opacity: 0.7
    }, speed[flakeType], function () {
        $.when(flake.remove()).then(function () {
            Flake(flakeId, GetRandInt(5, 95), GetRandInt(-5, -40));
        });
    });
}

function GetRandInt(min, max) {
    return Math.floor(Math.random() * Math.floor(max) + min);
}
function Sanitize(str){
    str = str.replace(/[^a-z0-9áéíóúñü \.,_-]/gim,"");
    return str.trim();
}
