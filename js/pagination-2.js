const arrlen = Array.from({length: 10}, () => Math.floor(Math.random() * 19500));
ott_logo = ''
function getOTT(name) {
    if (name == 'Netflix') {
        ott_logo += "<i class='fa fa-amazon fa-3x text-primary'></i>"
    } else if (name = 'Prime') {
        ott_logo += "<i class='fa fa-film fa-3x text-primary'></i>"
    } else if (name = 'Disney+Hotstar') {
        ott_logo += "<i class='fa fa-plus fa-3x text-primary'></i>"
    }
    return ott_logo;
}

htmlop = ''
for(i=0;i<arrlen.length;i++){
    htmlop += "<div class='card text-dark bg-light'>            <div class='card-header'><i class='fa fa-dice'></i> " + objJson[arrlen[i]].listed_in + " </div>            <div class='card-body row'>                <div class='col-md-2'>                    "+ objJson[arrlen[i]].network+"               </div>                <div class='col-md-4'>                    <h5 class='card-title'> " + objJson[arrlen[i]].title + " (" + objJson[arrlen[i]].release_year + ") </h5><small class='text-muted'> " + objJson[arrlen[i]].type + "</small><br>                    <small>                        <i class='fa fa-hourglass'></i>" + objJson[arrlen[i]].duration + "</small> <br>                    <i class='fa fa-map-pin'></i> " + objJson[arrlen[i]].country + "</small> <br>                    <i class='fa fa-users'></i> " + objJson[arrlen[i]].cast + "</small> <br><small><i class='fa fa-user'></i> " + objJson[arrlen[i]].director + "</small>                </div>                <div class='col-md-6'>                    <p class='card-text'>" + objJson[arrlen[i]].description + "</p>                </div></div>        </div><br>"
}

document.getElementById("listingTable").innerHTML = htmlop;