
let bookDom = document.querySelector(".book img")
let bookshelves = document.querySelectorAll(".bookshelves img")

let books = loadBooks()
let book = getRandomBook()
bookDom.src = book.src
bookDom.name = book.type

let score = 0
let scoreText = document.querySelector('h3')
scoreText.innerHTML = "books sorted: " + score

let gameOver = false
let gameOverBox = document.querySelector(".gameOver")


 // get the player's current points from localStorage
 let points = localStorage.getItem('points') ? parseInt(localStorage.getItem('points')) : 0;
 document.getElementById("sortingGame").style.display = "none";

 
    
 function startSorting() {
    document.getElementById("postsorting").style.display = "none";
    document.getElementById("sortingdone").style.display = "none";
    document.getElementById("sortingGame").style.display = "block";
    document.getElementById("librarianintro").style.display = "none";
    document.getElementById("librarian").style.display = "none";
   

}



bookshelves.forEach(shelf=>{
    shelf.addEventListener("dragover",dragBookOverShelf)
    shelf.addEventListener("drop",dropBook)
})


function dragBookOverShelf(event){
    if(gameOver){
        return
    }
    event.preventDefault();
}

function dropBook(event){
    event.preventDefault();
    shelf = event.target
    if(bookDom.name == shelf.name){
        book = getRandomBook()
        bookDom.src = book.src
        bookDom.name = book.type
        timer = 6
        score += 1
        scoreText.innerHTML = "Books sorted: " + score
    }
}

function getRandomBook(){
    let randomIndex = Math.floor(Math.random() * books.length)
    return books[randomIndex]
}

function loadBooks(){ // this is where you configure the file paths for the book pngs
    let books = []
    for(let i = 1 ; i <= 3;i++){
        books.push({
            type:'romance',
            src: `img/books/romance/${i}.png`
        })
        books.push({
            type:'magic', // NOTE: this is the mystery section. i don't remember why i named it magic and i'm not bothered to change it rn lol
            src: `img/books/magic/${i}.png`
        })
        books.push({
            type:'nonfiction',
            src: `img/books/nonfiction/${i}.png`
        })
        books.push({
            type:'scifi',
            src: `img/books/scifi/${i}.png`
        })
        books.push({
            type:'fantasy',
            src: `img/books/fantasy/${i}.png`
        })
        books.push({
            type:'action',
            src: `img/books/action/${i}.png`
        })
    }
    return books
}

function endSorting(){

        // calculate points based on books sorted
        let additionalPoints = Math.floor(score /10); // 1 point for every 10 books sorted
        points += additionalPoints; // update total points

        if (score > 10){ // if player has reached threshold of 10 books to get paid
            document.getElementById("postsorting").innerHTML =  `<p>"Let's see... you managed to sort ` + score + ` books. Nice work there! I'll give you ` + additionalPoints + ` gems for your hard work.</p> <p> You've got a total of `+ points + ` now! I hope you'll stop by again, we've always got work for you."</p>`
            // store the updated points in localStorage
            localStorage.setItem('points', points);

        } else if (score > 10 && score != 0){ // if player has sorted books but not over 10
            document.getElementById("postsorting").innerHTML =  `<p>"Let's see... you managed to sort ` + score + ` books. Not quite enough books for a paycheck though... A shame. Thank you for your service, though~~"</p>`
        
        } else if (score == 0) { // if player has not sorted any books
            document.getElementById("postsorting").innerHTML =  `<p>"Eh? You got nothing done? ... Well, I can't say I blame you. It's not like I want to do this work either. Come back if you change your mind, god knows I won't be sorting these."</p>`
           
        }
    
    document.getElementById("sortingGame").style.display = "none";
    document.getElementById("librarian").style.display = "block";
    document.getElementById("postsorting").style.display = "block";
    document.getElementById("sortingdone").style.display = "block";
}

function talk() {

    var phrases = [ // these are the phrases that are seen when you press the talk button
      {
      text: "It's such a wonderful day for some light reading. What's your favorite novel? I'm currently enjoying some of William Blake's works.",
      },        
      {
        text: "I'll let you in on a secret... I don't actually do anything around here. I pass the time smoking and reading in the back room.",
      },  
      {
        text: "Oh, how I love books. It's just the busywork around here that bores me half to death. One's mind cannot flourish under circumstances like these...",
      },  
      {
        text: "My dear sister left me in charge of this library. I figured it'd be fun at first, but...",
      }, 
      {
        text: "Hm? What? I shouldn't be smoking indoors, let alone near books? Watch it, greenhorn. I'm very experienced with minding my pipe. ... Nicotine addict? Shut your mouth.",
      },  
      {
        text: "Ah, there's really nothing better than lounging around in a pile of soft pillows with a brand new novel and some sweet liquor... I can't wait for the weekend.",
      },  
      ,
      ];
    
    
       
    var chat = phrases[Math.floor(Math.random() * phrases.length)];
    
    document.getElementById("textbox").innerHTML =
       '<p>"' + chat.text + '"<p>'
    
    }

function resetSprite(){
    
    document.getElementById("librarian").src = 'img/librarian.png';
}

function poke() {
    
    if (document.getElementById("librarian").getAttribute('src')=='img/librarian.png')
    {
        document.getElementById("librarian").src = 'img/librarian alt.png';
        librariandialog();
    }    else {
      librariandialog();
    }

}


function librariandialog() {

var phrases = [ // these are the phrases the librarian can utter when you poke him instead
  {
  text: "Do you mind? i'm quite tired, you know.",
  },        
  {
    text: "It's quite daring of you to poke at people randomly.",
  },  
  {
    text: "Take me out to dinner first, will you?",
  },  
  {
    text: "Don't you have things to do?",
  }, 
  {
    text: "Watch it, i've got a lit pipe here.",
  },  
  {
    text: "Time is money, friend.",
  },  
  ,
  ];


   
var chat = phrases[Math.floor(Math.random() * phrases.length)];

document.getElementById("textbox").innerHTML =
   '<p>"' + chat.text + '"<p>'

}

