window.onload = function () {
    var names = sessionStorage.getItem("names")
    DisplayNames(names);
    GenerateFlakes(50);
    $('.container-fluid').fadeOut(0).delay(1000).fadeIn(1800);
    $('#back').fadeOut(0).delay(2250).fadeIn(1000);
    $('.entry').animate({top: '90px'}, 2200);
    $('.p-card').animate({top: '118px'}, 2170);
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

function DisplayNames(names) {
    var nameArray = names.split(',');
    var nameObj = [];
    var exclusions = [];
    let marginTop = 0;
    let counter = 0;
    let noCol = 6;

    nameArray = ArrayShuffle(nameArray);

    // processing
    for (let i = 0; i < nameArray.length; i++)
    {
        nameObj.push({
            name: nameArray[i],
            targetName: "",
            picked: false
        });
    }

    // assigning targets
    for (let i = 0; i < nameObj.length - 1; i++)
    {
        nameObj[i].targetName = nameObj[i + 1].name;
    }

    nameObj[nameObj.length - 1].targetName = nameObj[0].name;

    // displaying
    for (let i = 0; i < nameObj.length; i++)
    {
        if (i % noCol == 0 && i != 0)
        {
            marginTop += 60;
        }
        $('#row1').append('<div class="col-' + 12 / noCol + '" style="top:' + marginTop + 'px;"><p class="p-card">'
         + `${nameObj[i].name} -> ${nameObj[i].targetName}` + '</p></div>');
    }
    $('.col-' + 12 / noCol).append('<div class="entry"></div>');
}

function GetRandInt(min, max) {
    return Math.floor(Math.random() * Math.floor(max) + min);
}

function ArrayShuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--)
    {
        let n = GetRandInt(0, i + 1);
        let temp = arr[n];
        arr[n] = arr[i];
        arr[i] = temp;
    }
    return arr;
}
