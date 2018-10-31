var request = require("request");
var secrets = require("./secrets");
var fs = require("fs");
var repoOwner = process.argv[2];
var repoName = process.argv[3];

/* setting up HTTP requests with URL and Headers */
function getRepoContributors(repoOwner, repoName, cb) {
  var options = {
    url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
    headers: {
      'User-Agent': 'request',
      'Authorization': 'GITHUB_TOKEN'
    }
  };

/* format data as a readable format using JSON.parse */

  request(options, function(err, res, body) {
    cb(err, JSON.parse(body));
  })
}

  /* Download image file from parsed URL data to a specified path */
  function downloadImageByURL(url, filePath) {
    request.get(url)
      .on('error', function (err) {
        throw err;
      })
      .on('response', function (response) {
        console.log('Response Status Message: ', `${response.statusCode}, ${response.statusMessage}`);
        console.log('Downloading Image...');
      })
      .on('end', function () {
        console.log('Download Complete');
      })
      .pipe(fs.createWriteStream('./' + filePath));
  };


// console.log(avatarURL)


// Run code
getRepoContributors(repoOwner, repoName, function(err, result) {
  if (!repoOwner || !repoName) {
    console.log(`error: ${err}`);
  }
  for (var i = 0; i < result.length; i++) {
    var avatarURL = "";
    avatarURL = result[i].avatar_url;
    downloadImageByURL(avatarURL, `./avatar${result[i].login}.jpg`)
  }
})
console.log("done");
// downloadImageByURL("https://api.github.com/repos/jquery/jquery/contributors", "avatars/");