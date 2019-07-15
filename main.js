
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

const wprest_route = '/wp-json/wp/v2/';
let categoriesData, tagsData
getData('categories');
getData('tags');
let activeEndpoint = 'posts?_embed&per_page=3';

function returnData(theData){
  return theData;
  console.log('theData = '+theData);
}

//ajax request
function getData(wprest_endpoint){
  let ourRequest = new XMLHttpRequest();
  let data = '';
  ourRequest.open('GET', bmkbmData.siteURL + wprest_route + wprest_endpoint);
  ourRequest.onload = function() {
    if (ourRequest.status >= 200 && ourRequest.status < 400) {
      data = JSON.parse(ourRequest.responseText);
      returnData(data);
      console.log('onload');
      switch (wprest_endpoint){
        case 'tags':
          tagsData = data;
          break;
        case 'categories':
          categoriesData = data;
          break;
        default:
          createHTML(data);
      }
    } else {
      console.log("We connected to the server, but it returned an error.");
    }
  }

  ourRequest.onerror = function() {
    console.log("Connection error");
  };

  ourRequest.send();
}




//ajax stuff
const loadPostsBtn = document.getElementById("load-posts-btn");
const loadedPostsContainer = document.getElementById("loaded-posts-container");
const loadingAnim = document.getElementById("loading");
const activeEndpointVal = document.getElementById("active-endpoint");

let tagInput = document.getElementsByName("selected-tags");
let catInput = document.getElementsByName("selected-category")[0].value;
// const orderInput = document.getElementsByName("order-input")[0].value;
// const orderbyInput = document.getElementsByName("orderby-input")[0].value;

if(loadPostsBtn){
  loadPostsBtn.addEventListener("click",function(){
    loadingAnim.classList.add('active');
    getData(activeEndpoint);
    console.log(categoriesData);
    console.log(tagsData);
  });
  updateActiveEndpint();
}

console.log('test'+tagInput);
// tagInput.addEventListener("change", updateActiveEndpint);
// catInput.addEventListener("change", updateActiveEndpint);

function updateActiveEndpint(){
  console.log(tagInput);
  activeEndpointVal.innerHTML = wprest_route+activeEndpoint;
}

function createHTML(postsData){
  let ourHTMLString = '';
  for(let i = 0; i < postsData.length; i++){
    //3 col per row
    if(i%3 == 0){
      ourHTMLString += `<div class="row unspace">`
    }

    ourHTMLString +=`<div class="col">
      <div class="card--med">
        <a href="`+ postsData[i].link +`" class="image">
          <img src="`+ postsData[i]._embedded['wp:featuredmedia']['0'].source_url +`" alt="">
        </a>
        <div class="content">
          <a href="`+ postsData[i].link +`" class="title">
            <h3>`+ postsData[i].title.rendered +`</h3>
          </a>
          <div class="tags">`
          let tags = postsData[i].tags;
          //loop through tag ids
          for(let i = 0; i < tags.length; i++){
            //loop through tagData to match ids and print details
            for(let ii = 0; ii < tagsData.length; ii++){
              if(tagsData[ii].id == tags[i]){
                ourHTMLString += `<a href="`+ tagsData[ii].link +`">`+ tagsData[ii].name +`</a>`
              }
            }
          }
          ourHTMLString +=`
            <?php $posttags = get_the_tags();
            if ($posttags) {
              foreach($posttags as $tag) {
                echo ';
              }
            } ?>
          </div>
        </div>
      </div>
    </div>`
    if(i%3 == 2 || i == postsData.length-1){
      ourHTMLString += `</div>`
    }
  }
  loadedPostsContainer.innerHTML = ourHTMLString;
  loadingAnim.classList.remove('active');
}
