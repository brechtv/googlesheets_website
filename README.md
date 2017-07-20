# Generate a website from a GSheet
Generates a website entirely from a Google Spreadsheet

```
var URL = "https://spreadsheets.google.com/feeds/list/" + id + "/od6/public/values?alt=json"

$.getJSON(URL, function(data) {
    var results = data.feed.entry;

    $.each( results, function(i, result) {
        var title = result.gsx$title.$t;
        var content = micromarkdown.parse(result.gsx$content.$t);
      });
})
```
