var request = require("request");
var secrets = require("./secrets");

//setting up HTTP requests
function getRepoContributors(repoOwner, repoName, cb) {
  var options = {
    url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
    headers: {
      'User-Agent': 'request',
      'Authorization': 'GITHUB_TOKEN'
    }
  };

  //format data and extract avatar_url
  var avatarURL = [];
  request(options, function(err, res, body) {
    cb(err, body);
    var targetBody = JSON.parse(body);
    console.log(targetBody);
    targetBody.forEach(function (element) {
      avatarURL.push(element.avatar_url);
    });
    console.log(avatarURL);
  });
}

//Test code
getRepoContributors("jquery", "jquery", function(err, result) {
  console.log("Errors:", err);
  console.log("Result:", result);
});

