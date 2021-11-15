import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';

$("#search").submit((event) => {
  event.preventDefault();
  const searchTerm = $("#searchTerm").val();
  $("#searchTerm").val("");

  let request = new XMLHttpRequest();
  const url = `http://api.giphy.com/v1/stickers/search?q=${searchTerm}&api_key=${process.env.API_KEY}`;
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
  const imgUrl = response.data[0].images.original.url;
  $("#outputs").html(`<img src="${imgUrl}">`);
}