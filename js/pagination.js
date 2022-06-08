var current_page = 1;
var records_per_page = 2;

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

const arrlen = Array.from({length: 10}, () => Math.floor(Math.random() * 19500));
// var objJson = [
//     { adName: "AdName 1"},
//     { adName: "AdName 2"},
//     { adName: "AdName 3"},
//     { adName: "AdName 4"},
//     { adName: "AdName 5"},
//     { adName: "AdName 6"},
//     { adName: "AdName 7"},
//     { adName: "AdName 8"},
//     { adName: "AdName 9"},
//     { adName: "AdName 10"}
// ]; // Can be obtained from another source, such as your objJson variable

function prevPage() {
    if (current_page > 1) {
        current_page--;
        changePage(current_page);
    }
}

function nextPage() {
    if (current_page < numPages()) {
        current_page++;
        changePage(current_page);
    }
}

function changePage(page) {
    var btn_next = document.getElementById("btn_next");
    var btn_prev = document.getElementById("btn_prev");
    var listing_table = document.getElementById("listingTable");
    var page_span = document.getElementById("page");

    // Validate page
    if (page < 1) page = 1;
    if (page > numPages()) page = numPages();

    listing_table.innerHTML = "";

    for (var i = (page - 1) * records_per_page; i < (page * records_per_page); i++) {
        listing_table.innerHTML += "<div class='card text-dark bg-light'>            <div class='card-header'><i class='fa fa-dice'></i> " + objJson[i].listed_in + " </div>            <div class='card-body row'>                <div class='col-md-2'>                    "+ getOTT(objJson[i].network)+"               </div>                <div class='col-md-4'>                    <h5 class='card-title'> " + objJson[i].title + " (" + objJson[i].release_year + ") </h5><small class='text-muted'> " + objJson[i].type + "</small><br>                    <small>                        <i class='fa fa-hourglass'></i>" + objJson[i].duration + "</small> <br>                    <i class='fa fa-map-pin'></i> " + objJson[i].country + "</small> <br>                    <i class='fa fa-users'></i> " + objJson[i].cast + "</small> <br><small><i class='fa fa-user'></i> " + objJson[i].director + "</small>                </div>                <div class='col-md-6'>                    <p class='card-text'>" + objJson[i].description + "</p>                </div></div>        </div><br>"
    }
    page_span.innerHTML = page;

    if (page == 1) {
        btn_prev.style.visibility = "hidden";
    } else {
        btn_prev.style.visibility = "visible";
    }

    if (page == numPages()) {
        btn_next.style.visibility = "hidden";
    } else {
        btn_next.style.visibility = "visible";
    }
}

function numPages() {
    return Math.ceil(objJson.length / records_per_page);
}

window.onload = function () {
    changePage(1);
};