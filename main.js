
//format endpoint
/*
  count
  ?order
    ASC
    DESC
  ?orderby
    date
    title
  post type
  category
  tag
  grid size
    ?per_page= rowcount * colcount
  ?search=title%20text%20only
  ?filter[s]=content%20text%20only
*/

let categoriesData = ''
let tagsData = ''

//custom get posts
function ajaxRequest(rest_api_endpoint, data_type){
  let ourRequest = new XMLHttpRequest();
  ourRequest.open('GET', bmkbmData.siteURL + rest_api_endpoint);
  ourRequest.onload = function() {
    if (ourRequest.status >= 200 && ourRequest.status < 400) {
      var data = JSON.parse(ourRequest.responseText);
      switch(data_type) {
        case 'posts':
          createHTML(data)
          break;
        case 'categories':
          categoriesData = data;
          console.log('categories initialized')
          console.log(categoriesData);
          break;
        case 'tags':
          tagsData = data;
          console.log('tags initialized')
          console.log(tagsData);
          break;
        default:
          console.log('invalid type')
      }

      window.data_var = data;
    } else {
      console.log("We connected to the server, but it returned an error.");
    }
  };

  ourRequest.onerror = function() {
    console.log("Connection error");
  };

  ourRequest.send();
}

console.log('init');
ajaxRequest('/wp-json/wp/v2/categories', 'categories');
ajaxRequest('/wp-json/wp/v2/tags', 'tags');



//ajax stuff
const portfolioPostsBtn = document.getElementById("portfolio-posts-btn");
const portfolioPostsContainer = document.getElementById("portfolio-posts-container");

if(portfolioPostsBtn){
  portfolioPostsBtn.addEventListener("click",function(){
    ajaxRequest('/wp-json/wp/v2/posts?_embed', 'posts');
  });
}

function createHTML(postsData){
  let ourHTMLString = '';
  for(let i = 0; i < postsData.length; i++){
    //3 col per row
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
          <div class="tags">
            <?php $posttags = get_the_tags();
            if ($posttags) {
              foreach($posttags as $tag) {
                echo '<a href="'.$tag->slug.'">'.$tag->name.'</a>';
              }
            } ?>
          </div>
        </div>
      </div>
    </article>`
    if(i%3 == 2 || i == postsData.length-1){
      ourHTMLString += `</div>`
    }
  }

  portfolioPostsContainer.innerHTML = ourHTMLString;
}
