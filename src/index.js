import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';

$("#search").submit((event) => {
  event.preventDefault();
  const searchTerm = $("#searchTerm").val();
  $("#searchTerm").val("");

  let promise = new Promise(function(resolve, reject) {
    let request = new XMLHttpRequest();
    // const url = `https://api.giphy.com/v1/gifs/search?api_key=${process.env.API_KEY}&q=${searchTerm}&limit=25`;
    const url = `https://api.giphy.com/v1/gifs/search?q=${searchTerm}&api_key=${process.env.API_KEY}`;
    request.onload = function() {
      if (this.status === 200) {
        resolve(request.response);
      } else {
        reject(request.response);
      }
    };
    request.open("GET", url, true);
    request.send();
  });

  promise.then(function(response) {
    const output = JSON.parse(response);
    outputGifs(output);
  }, function() {
    $('#outputs').text("You Fudged Up");
  });
});

function outputGifs(response) {
  let htmlString = "";
  if (Array.isArray(response.data)) {
    for (let i = 0; i < response.data.length; i++) {
      const imgUrl = response.data[i].images.original.url;
      htmlString = htmlString.concat(`<img src="${imgUrl}">`);
    }
  } else {
    const imgUrl = response.data.images.original.url;
    htmlString = `<img src=${imgUrl}">`;
  }
  $("#outputs").html(htmlString);
}

$("#trendSearch").click(() => {
  let promise = new Promise(function(resolve, reject){
    let request = new XMLHttpRequest();
    const url = `http://api.giphy.com/v1/gifs/trending?&api_key=${process.env.API_KEY}`;
    request.onload = function() {
      if (this.status === 200) {
        resolve(request.response);
      } else{
        reject(request.response);
      }
    };  
    request.open("GET", url, true);
    request.send();  
  });
    
  promise.then(function(response) {
    const output = JSON.parse(response);
    outputGifs(output);
  }, function(){
    $('#outputs').text("You Fudged Up");
  });
});

$("#randomSearch").click(() => {
  let promise = new Promise(function(resolve, reject){
    let request = new XMLHttpRequest();
    const url = `http://api.giphy.com/v1/gifs/random?&api_key=${process.env.API_KEY}`;
    request.onload = function() {
      if (this.status === 200) {
        resolve(request.response);
      } else{
        reject(request.response);
      }
    };    
    request.open("GET", url, true);
    request.send();
  });
  
  promise.then(function(response){
    const output = JSON.parse(response);
    outputGifs(output);
  }, function(){
    $('#outputs').text("You Fudged Up");
  });
});