import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';

$("#search").submit((event) => {
  event.preventDefault();
  const searchTerm = $("#searchTerm").val();
  $("#searchTerm").val("");

  let request = new XMLHttpRequest();
  const url = `http://api.giphy.com/v1/stickers/searchq?=${searchTerm}&api_key=${process.env.API_KEY}`;
  request.onreadystatechange = function() {
    if (this.readyState === 4 && this.status === 200) {
      const response = JSON.parse(this.responseText);
      outputGifs(response);
    }
  };
  request.open("GET", url, true);
  request.send();
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

  let request = new XMLHttpRequest();
  const url = `http://api.giphy.com/v1/gifs/trending?&api_key=${process.env.API_KEY}`;
  request.onreadystatechange = function() {
    if (this.readyState === 4 && this.status === 200) {
      const response = JSON.parse(this.responseText);
      outputGifs(response);
    }
  };
  request.open("GET", url, true);
  request.send();  
});

$("#randomSearch").click(() => {

  let request = new XMLHttpRequest();
  const url = `http://api.giphy.com/v1/gifs/random?&api_key=${process.env.API_KEY}`;
  request.onreadystatechange = function() {
    if (this.readyState === 4 && this.status === 200) {
      const response = JSON.parse(this.responseText);
      outputGifs(response);
    }
  };
  request.open("GET", url, true);
  request.send();
});
