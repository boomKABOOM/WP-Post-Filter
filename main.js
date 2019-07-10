//ajax stuff
const portfolioPostsBtn = document.getElementById("portfolio-posts-btn");
const portfolioPostsContainer = document.getElementById("portfolio-posts-container");

if(portfolioPostsBtn){
  portfolioPostsBtn.addEventListener("click",function(){
    var ourRequest = new XMLHttpRequest();
    ourRequest.open('GET', 'http://localhost:8888/wp-json/wp/v2/posts?_embed');
    ourRequest.onload = function() {
      if (ourRequest.status >= 200 && ourRequest.status < 400) {
        var data = JSON.parse(ourRequest.responseText);
        createHTML(data);
      } else {
        console.log("We connected to the server, but it returned an error.");
      }
    };

    ourRequest.onerror = function() {
      console.log("Connection error");
    };

    ourRequest.send();
  });
}

function createHTML(postsData){
  let ourHTMLString = '';
  for(let i = 0; i < postsData.length; i++){
    console.log(i%3);
    if(i%3 == 0){
      ourHTMLString += `<div class="row unspace">`
    }
    ourHTMLString +=`<article class="col">
      <div class="post--med">
        <a href="`+ postsData[i].link +`" class="image">
          <img src="`+ postsData[i]._embedded['wp:featuredmedia']['0'].source_url +`" alt="">
        </a>
        <div class="content">
          <a href="`+ postsData[i].link +`" class="title">
            <h3>`+ postsData[i].title.rendered +`</h3>
          </a>
          
        </div>
      </div>
    </article>`
    if(i%3 == 0 || i == postsData.length-1){
      ourHTMLString += `</div>`
    }
  }

  portfolioPostsContainer.innerHTML = ourHTMLString;
}
