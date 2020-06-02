'use strict';

function getRepos() {
    let username = $('#usernameInput').val();
    fetch(`https://api.github.com/users/${username}/repos`)
        .then(response => response.json())
        .then(responseJson => displayResults(responseJson))
        .catch(error => alert('Something went wrong. Try again later.'));
}

function displayResults(responseJson) {
    console.log(responseJson);
    if (responseJson.length == 0) {
        alert('There are no repos for this username, try again!');
        return;
    }
    $('.results').html('Results');
    for (let i =0; i < responseJson.length; i++){
        let repoName = responseJson[i].name;
        let repoUrl = responseJson[i].html_url;
        $('.results').append(`<ul><li>Repo name: ${repoName}</li><li>Repo URL: <a target='_blank' href='${repoUrl}'>${repoUrl}</a></li><ul>`);
    }
}

function watchForm() {
    $('form').submit(event => {
      event.preventDefault();
      getRepos();
    });
}

$(function() {
    console.log('App loaded! Waiting for submit!');
    watchForm();
});
  