$('#use_demo').click(function() {
    createWebsite("1Kh0PdjsbfRR6AEWTEBaxtp8jClJKrblvtT7cLTsIi_Q");
    $(".url-input").remove();
})

$('#spreadsheet-url').keypress(function(e) {
    if (e.which == 13) {
        var id = $('#spreadsheet-url').val();
        if (id == "") {
            createWebsite("1Kh0PdjsbfRR6AEWTEBaxtp8jClJKrblvtT7cLTsIi_Q");
        } else {
            createWebsite(id);
        }
        $(".url-input").remove();
    }
});

function createWebsite(id) {

    var URL = "https://spreadsheets.google.com/feeds/list/" + id + "/od6/public/values?alt=json"

    $.getJSON(URL, function(data) {

        var results = data.feed.entry;
        var webpage_title = data.feed.title.$t;

        $(".page-header").html("<h1>" + webpage_title + " <small>" + "" + "</small></h1>");
        $("title").html(webpage_title);

        $.each(results, function(key, result) {

            var title = result.gsx$title.$t;
            var title_id = title.toLowerCase().replace(/[^a-zA-Z0-9 ]/g, '').replace(/[ ]/g, "_");
            var content = micromarkdown.parse(result.gsx$content.$t);
            var content_snippet = content.replace(/[^a-zA-Z0-9.,!? ]/g, '').substring(0, 125);

            var post_card = `<div class="panel panel-default" name=` + title_id + ` id=` + title_id + `>
                            <div class="panel-heading">
                              <h3 class="panel-title">` + title + `</h3>
                            </div>
                            <div class="panel-body">
                              ` + content + `
                            </div>
                          </div>`

            var menu_item = `
            <a href="#` + title_id + `" class="list-group-item">
              <h4 class="list-group-item-heading">` + title + `</h4>
              <p class="list-group-item-text">` + content_snippet + ` [...]</p>
            </a>
          `;

            $(".menu_div").append(menu_item)
            $(".content_div").append(post_card)
        });


    })
}
