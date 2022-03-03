$(document).ready(function() {

    $.getJSON("data/scores.json", function(json) {
        var scores = json;
        for (let i = 0; i < scores.length; i++) {
            $("#high_score tr:last").after(
                `<tr><td class="td_left"> ${scores[i]["date"]} </td>
                <td class="td_right"> ${scores[i]["duration"]} </td></tr>`
            );
        }
    });

});
