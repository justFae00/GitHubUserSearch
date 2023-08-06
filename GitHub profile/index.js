const toggle = document.getElementById("toggle");
const inputContainer = document.getElementById("input-container");
const inputBox = document.getElementById("input-box");
const resultContainer = document.getElementById("result-container");
const latestRepos = document.getElementById("latest-repos");
const repo1 = document.getElementById("repo1");
const repo2 = document.getElementById("repo2");
const repo3 = document.getElementById("repo3");
const repo4 = document.getElementById("repo4");
const repo5 = document.getElementById("repo5");
const followers = document.getElementById("followers");
const followings = document.getElementById("followings");
const repos = document.getElementById("repos");
const userName = document.getElementById("username");
const Name = document.getElementById("name");
const avatar = document.getElementById("avatar");
const loader = document.getElementById("loader");

const apiUrl = "https://api.github.com/users/";

//By entering input, loading gif is shown. Clear previous data if needed and run GetAPI()
inputBox.addEventListener("keypress", function (e) {
  if (e.key === "Enter" && inputBox.value != "") {
    loader.style.visibility = "visible";
    if (document.getElementById("avatar")) {
      hideElements();
    }
    getAPI();
  }
});

async function getAPI() {
  const response = await fetch(apiUrl + inputBox.value);
  const data = await response.json();

  //Check if input is valid
  if (data.message === "Not Found") {
    hideElements();
    loader.style.visibility = "hidden";
    Name.innerHTML = "No such user exists!";
  } else {
    showElements(); //Set detaild to visible

    userName.innerHTML = data.login;
    userName.href = data.html_url;
    followers.innerHTML = data.followers + " followers";
    followers.href = data.followers_url;
    followers.target = "_blank";
    followings.innerHTML = data.following + " following";
    followings.href = data.following_url;
    followings.target = "_blank";
    repos.innerHTML = data.public_repos + " repos";
    repos.href = data.repos_url;
    repos.target = "_blank";
    Name.innerHTML = data.name;
    avatar.src = data.avatar_url;
    avatar.alt = "avatar";

    //Fetch details about repos
    const repoResponse = await fetch(apiUrl + inputBox.value + "/repos");
    const repoData = await repoResponse.json();

    //Add top 6 repos of the user
    for (let index = 1; index < 6; index++) {
      let temp = "repo" + index;
      const tempRepo = document.getElementById(temp);
      tempRepo.innerHTML = repoData[index].name;
      tempRepo.href = repoData[index].html_url;
      tempRepo.target = "_blank";
    }
  }
}

//Set data to visible
function showElements() {
  loader.style.visibility = "hidden";

  for (let index = 1; index < 6; index++) {
    let temp = "repo" + index;
    document.getElementById(temp).style.visibility = "visible";
  }

  document.getElementById("avatar").style.visibility = "visible";
}

//Set data to invisble
function hideElements() {
  for (let index = 1; index < 6; index++) {
    let temp = "repo" + index;
    document.getElementById(temp).innerHTML = "";
    document.getElementById(temp).style.visibility = "hidden";
  }

  document.getElementById("avatar").src = "";
  document.getElementById("avatar").style.visibility = "hidden";
}

//Toggle theme
toggle.addEventListener("change", function () {
  if (this.checked) {
    setTimeout(function () {
      turnDark();
    }, 200);
  } else {
    setTimeout(function () {
      turnLight();
    }, 200);
  }
});

//Color schemes are based on GitHub's

function turnDark() {
  const links = document.querySelectorAll("a");
  links.forEach((link) => {
    link.style.color = "white";
  });

  document.body.style.backgroundColor = "#010409";
  document.body.style.color = "#E6EDF3";
  inputBox.style.backgroundColor = "#010409";
  inputBox.style.color = "white";
  resultContainer.style.backgroundColor = "#0D1117";
  resultContainer.style.borderColor = "#30363D";
  inputContainer.style.borderColor = "#30363D";

  for (let index = 1; index < 6; index++) {
    let temp = "repo" + index;
    const tempRepo = document.getElementById(temp);
    tempRepo.style.backgroundColor = "#121D2F";
    tempRepo.style.color = "#2F81F7";
  }
}

function turnLight() {
  const links = document.querySelectorAll("a");
  links.forEach((link) => {
    link.style.color = "black";
  });

  document.body.style.backgroundColor = "#f6f8fa";
  document.body.style.color = "black";
  inputBox.style.backgroundColor = "#f6f8fa";
  inputBox.style.color = "black";
  resultContainer.style.backgroundColor = "white";
  resultContainer.style.borderColor = "#d8dee4";
  inputContainer.style.borderColor = "#d8dee4";

  for (let index = 1; index < 6; index++) {
    let temp = "repo" + index;
    const tempRepo = document.getElementById(temp);
    tempRepo.style.backgroundColor = "#ddf4ff";
    tempRepo.style.color = "#0969da";
  }
}
