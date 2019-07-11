<?php
/**
 * Plugin Name: bmKBM Post Filter
 * Description: An elegant solution to filter and display posts simply
 * Version: 1.0
 * Author: BoomKABOOM Studio
 * Author URI: http://www.boomkaboom.com
 */

function bmkbm_filter( $bmkbm_args ) {

//   $bmkbm_args = array(
//     'posts_per_page'   => 50,
//     'orderby'          => 'title',
//     'order'            => 'DESC',
//     // 'tag'           => 'featured',
//     // 'tag__not_in'      => 3, //id of tag 'featured'
//     // 'category' 	  => 12, //id of businesses
//     // 'category__not_in' 	  => 12, //id of businesses
//     // 'post_type'        => 'post',
//
//   );
//
//   global $post;
//   $myposts = get_posts( $bmkbm_args );
//   $i = 0;
//   $len = count($myposts);
//
//   foreach ( $myposts as $post ) : setup_postdata( $post );
//     $postTitle = get_the_title();
//     $postPermalink = get_the_permalink();
//     echo <<< POSTITEM
//     <div style="border:margin:1em; max-width:350px; display:inline-block;">
//       <div class="post--med">
//         <div class="content">
//           <a href="$postPermalink" class="title">
//             <h3>$postTitle</h3>
//           </a>
//         </div>
//       </div>
//     </div>
// POSTITEM;
//
//   $index++;
//   endforeach;
//
//   wp_reset_postdata();

  echo <<< BUTTONS
  <button type="button" id="portfolio-posts-btn" name="button">load posts</button>
  <div id="portfolio-posts-container"></div>
BUTTONS;

}
add_shortcode( 'bmkbm-filter', 'bmkbm_filter' );

//add ajax script to footer
wp_enqueue_script('main_js', plugin_dir_url(__FILE__) . 'main.js', '', '', true);
wp_localize_script('main_js', 'bmkbmData', array(
  'siteURL' => get_site_url()
));

?>
