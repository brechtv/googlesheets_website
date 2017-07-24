# Generate a website from a GSheet
Generates a website entirely from a Google Spreadsheet, see it in action and check the documentation **[here](https://rawgit.com/brechtv/googlesheets_website/master/index.html)**!

## Howto

1. Create a new Google spreadsheet , create two columns, called title and content
2. For each post, add in your content
3. Publish the spreadsheet to the web
4. Get the spreadsheet ID (this is not the ID generated in the Public URL but the ID on the spreadsheet itself).
* e.g.: `https://docs.google.com/spreadsheets/u/0/d/[YOUR-SPREADSHEET-ID-HERE]/edit`
5. Use the spreadsheet ID in the call below

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

The JSON call will get the first sheet in the spreadsheet, the sheet title functions as the site name.
