let scores = []
scores.push({"date":"2021/01/17", "duration":"3:41"});
scores.push({"date":"2021/01/21", "duration":"4:01"});
scores.push({"date":"2021/02/01", "duration":"2:52"});
scores.push({"date":"2021/02/17", "duration":"3:08"});
scores.push({"date":"2021/03/02", "duration":"2:51"});

$(document).ready(function() {

    for (let i = 0; i < scores.length; i++) {
        $("#high_score tr:last").after(
            `<tr><td class="td_left"> ${scores[i]["date"]} </td>
            <td class="td_right"> ${scores[i]["duration"]} </td></tr>`
        );
    }

});
