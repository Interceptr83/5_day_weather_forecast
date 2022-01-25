let searchEl = document.getElementById("searchFld");
let submitEl = document.getElementById("searchBut");

$(document).ready(function () {
        $('#currentTime').text(moment().format('MMMM Do YYYY, h:mm a'));

function citySearch(){
        const content = document.getElementById("content");
        content.removeAttribute("class", "hidden");
};

        submitEl.onclick = citySearch;
});