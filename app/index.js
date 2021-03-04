/**
 * Application entry point
 */

// Load application styles
import 'scss/_index.scss';

// ================================
// START YOUR APP HERE
// ================================
document.addEventListener("DOMContentLoaded", (event) => {
    // (function(){
    //   fetch("https://www.googleapis.com/books/v1/volumes?q=test&maxResults=35&key=AIzaSyChEQ2KtOfFTqeRpVG0XJrFUu9I99Ba6DQ")
    //   .then(response=>response.json())
    //   .then(data=>console.log(data));
    // })()
    (function(){
      document.getElementById("keyword").addEventListener("keyup",
      function(event){
        if(event.keyCode===13){
          let searchString=document.getElementById("keyword").value;
          if(searchString){
            fetchBookList(searchString)
          }
        }
      })

      function fetchBookList(searchString){
        fetch(`https://www.googleapis.com/books/v1/volumes?q=${searchString}&maxResults=35&key=AIzaSyChEQ2KtOfFTqeRpVG0XJrFUu9I99Ba6DQ`)
        .then(response=>response.json())
        .then(data=>{
          console.log(data);
          let bookListHTML=renderBookList(data);
          document.getElementById("book-list").innerHTML=bookListHTML;
        });
      }

      function renderBookList(data){
        let bookListHTML="";
          if(data.items && data.items.length){
            data.items.forEach(book => {
              bookListHTML+=`
              <div class="col-lg-3 col-md-6 col-sm-12 book-display">
              <div class="image">
                <img src="${book.volumeInfo.imageLinks && book.volumeInfo.imageLinks.thumbnail}" alt="${book.volumeInfo.title}" />
              </div>
              <div class="info">
                <div>
                  <span> Authors: ${book.volumeInfo.authors}</span>
                </div>
                <span>
                  Title: ${book.volumeInfo.title}
                </span>
              </div>
              <div class="details">
                <p><a target="_blank" class="previewLink" href="${book.volumeInfo.previewLink}">Preview</a></p>
              </div>
            </div>`
            ; 
            });
          }
        return bookListHTML;
      }

    })();

  })