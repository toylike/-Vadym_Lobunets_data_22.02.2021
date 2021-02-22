// Main JS module
// objectFitImages polyfill
import objectFitImages from "object-fit-images";

$(function() {
  objectFitImages();
});

      
let gallery = document.querySelector(".main_gallery_cards");

gallery.addEventListener('click', event => {

  let target = event.target;

  if (target.closest('.card') && target.className != 'card_star fa-star fas' && target.className != 'card_star far fa-star'&& target.className != 'card_star fas fa-star' && target.className != 'card_star fa-star far') {
    showPopup(target)
    
  }if(target.closest('.card') && target.className === 'card_star fa-star fas' || target.closest('.card') && target.className === 'card_star far fa-star' || target.closest('.card') && target.className === 'card_star fas fa-star' || target.closest('.card') && target.className === 'card_star fa-star far'){
    checkClick(target)
  }

});


function checkClick(target){
    let card

    if(target.closest('.card').classList.contains('film_active')){
      target.closest('.card').classList.remove('film_active');
      target.classList.remove('fas');
      target.classList.add('far');
      card = target.closest('.card');
      removeFilm(card)
    }else{
      target.closest('.card').classList.add('film_active');
      card = target.closest('.card');
      target.classList.remove('far');
      target.classList.add('fas');


      setTimeout(() => cancelFilm());



      addFilm(card);
    }
}

function addFilm(card){

  let picture = card.querySelector('.card_img img').src;
  let name = card.querySelector('.card_content--title').innerHTML;
  let id = card.getAttribute('id');

  localStorage[`${id}`] = JSON.stringify({name: `${name}`, picture : `${picture}`});

  let object = JSON.parse(localStorage[`${id}`]);
  createBlock(object, id)

  setTimeout(() => numFilm());
  
}


function cancelFilm(){
  let cancelButts = document.querySelectorAll('.article_card_deleted');
        for(let cancelButt of cancelButts){
          let cancel_card = cancelButt.closest('.article_card');
          cancelButt.addEventListener('click', function(){
            cancel_card.remove()
  
            let cancel_id = cancel_card.getAttribute('id');

            delete localStorage[cancel_id];

            let cancel_stars = document.querySelectorAll('.card');
            
            setTimeout(() => numFilm());

            for(let cancel_star of cancel_stars){
              if(cancel_star.getAttribute('id') === cancel_id){
                cancel_star.classList.remove('film_active');
                let aaa = cancel_star.querySelector('.card_star');

                aaa.classList.remove('fas');
                aaa.classList.add('far');
              }
            }
  
          })

          
        }
}

function removeFilm(card){
  let r_id = card.getAttribute('id');

  let article_cards = document.querySelectorAll('.article_card');

  for(let article_card of article_cards){
    if(article_card.getAttribute('id') === r_id){
      article_card.remove()
    }
  }
  delete localStorage[r_id]

  setTimeout(() => numFilm());
}

function numFilm(){

  let article_cards = document.querySelectorAll('.article_card');

  article_cards.forEach(function(item, i){
    let numFilm = item.querySelector('.article_card_num').innerHTML = i+1;
    
    });
  

}

let favorite = document.querySelector('.main_sidebar_article')

function createBlock(object, id){

    let c_pic;
    let c_name;

    for(let elem in object){
        if(elem == 'name'){
          c_name = object[elem];
        }else{
          c_pic = object[elem];
        }
    }

      favorite.insertAdjacentHTML('afterbegin', `<div class="article_card" id=${id}>
      <div class="article_card_img"><img src=${c_pic}></div>
      <div class="article_card_num"></div>
      <div class="article_card_name"><h4>${c_name}</h4></div>
      <span class="article_card_deleted"><img src="img/svg/cancel.svg"></span>
      </div>`);

}

function createAllBlock(){

  for(let key in localStorage) {
    if (!localStorage.hasOwnProperty(key)) {
      continue; 
    }
      let obj = JSON.parse(localStorage.getItem(key));
      let pic;
      let f_name;

      for(let elem in obj){
          if(elem == 'name'){
            f_name = obj[elem];
          }else{
            pic = obj[elem];
          }
      }

      favorite.insertAdjacentHTML('afterbegin', `<div class="article_card" id=${key}>
      <div class="article_card_img"><img src=${pic}></div>
      <div class="article_card_num"></div>
      <div class="article_card_name"><h4>${f_name}</h4></div>
      <span class="article_card_deleted"><img src="img/svg/cancel.svg"></span>
      </div>`);

      setTimeout(() => numFilm());
  }

  setTimeout(() => cancelFilm());

  setTimeout(() => addClassForCard());

}

function addClassForCard(){

  let article_cards = document.querySelectorAll('.article_card');
  let cards = document.querySelectorAll('.card');

      for(let card of cards){
        let iD = card.getAttribute('id');
        for(let article_card of article_cards){
          let iD_fav = article_card.getAttribute('id');
          if(iD_fav == iD){
                card.classList.add('film_active');
                let aaa = card.querySelector('.card_star');

                aaa.classList.remove('far');
                aaa.classList.add('fas');
          }
        }
  
      }
}

function showPopup(target){

  let body = document.querySelector(".body");

  let popup_img = target.closest('.card_wrapp').querySelector('.data_img').src
  let popup_title = target.closest('.card_wrapp').querySelector('.data_title').innerHTML
  let popup_description = target.closest('.card_wrapp').querySelector('.data_description').innerHTML
  let popup_director = target.closest('.card_wrapp').querySelector('.data_director').innerHTML
  let popup_year = target.closest('.card_wrapp').querySelector('.data_year').innerHTML


  let arr_stars_tag = target.closest('.card_wrapp').querySelectorAll('.data_stars');
  let arr_star = []

  for(let elem of arr_stars_tag){
    arr_star.push(elem.innerHTML)
  }

  let popup_stars = arr_star.join(', ');


  let arr_genres_tag = target.closest('.card_wrapp').querySelectorAll('.data_genres');
  let arr_genres = []

  for(let item of arr_genres_tag){
    arr_genres.push(item.innerHTML)
  }

  body.insertAdjacentHTML('afterbegin', `<div class="wrapp_popup">
      <div class="popup">
        <div class="popup_img--wrapp">
          <div class="popup_img">
             <img src=${popup_img}>
          </div>
          <div class="popup_year">
             <p>${popup_year}</p>
          </div>
          <div class="popup_info">
          </div>
        </div>
        <div class="popup_text">
          <h2>${popup_title}</h2>
          <p class="popup_text--description">${popup_description}</p>
          <p class="popup_text--director">Director: ${popup_director}</p>
          <div class"popup_text--starring">
            <p>Starring: ${popup_stars}</p>
          </div>
        </div>
        <div class="popup_closed">
          <div class="popup_closed--img">
            <img src="img/svg/cancel.svg">
          </div>
        </div>
      </div>
      </div>`);

      setTimeout(function(){
        let info = document.querySelector('.popup_info');


        for(let arr_genre of arr_genres){
          info.insertAdjacentHTML('afterbegin', `<p class="popup_info_card">
          ${arr_genre}
              </p>`);
        }
      });

      let close_popup = document.querySelector('.popup_closed--img');

      close_popup.addEventListener('click', function(){
        this.closest('.wrapp_popup').remove()
      })
}

window.onload = createAllBlock;


