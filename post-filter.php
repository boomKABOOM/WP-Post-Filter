<?php
/**
 * Plugin Name: bmKBM Post Filter
 * Description: An elegant solution to filter and display posts simply
 * Version: 1.0
 * Author: BoomKABOOM Studio
 * Author URI: http://www.boomkaboom.com
 */

function bmkbm_filter( $bmkbm_args ) {

  echo '<div class="row">';
    echo '<div class="col-2">';

    echo '<strong>Select Category</strong><br>';
    echo '<select class="" name="selected-category" id="cat">';
    echo '<option value="">None</option>';
    $postcats = get_categories();
    if ($postcats) {
      foreach($postcats as $cat) {
        echo '<option value="'.$cat->term_id.'">'.$cat->name.'</option>';
      }
    }
    echo '</select>';

    echo '<br><strong>Select Tags</strong><br>';
    $posttags = get_tags();
    if ($posttags) {
      foreach($posttags as $tag) {
        echo '<label><input type="checkbox" name="selected-tags" value="'.$tag->term_id.'"> '.$tag->name.'</label>';
      }
    }

    echo '</div>';
  echo '</div>';

  echo <<< INITFIELDS

  <div class="row">
    <div class="col-2">
      <button type="button" class="bmkbm-btn" id="load-posts-btn" name="button">load posts</button>
    </div>
    <div class="col">
      <div id="active-endpoint" class="code">...</div>
    </div>
  </div>

  <div class="bmkbm-content">
    <div id="loaded-posts-container"></div>
    <div class="loading inactive" id="loading">
      <div></div><div></div><div></div>
    </div>
  </div>

INITFIELDS;
}
add_shortcode( 'bmkbm-filter', 'bmkbm_filter' );

// Register style + js
add_action( 'wp_enqueue_scripts', 'register_plugin' );
function register_plugin() {
  //styles
	wp_register_style( 'bmkbm-filter', plugins_url( 'WP-Post-Filter/css/styles.css' ) );
	wp_enqueue_style( 'bmkbm-filter' );

  //add ajax script to footer
  wp_enqueue_script('main_js', plugin_dir_url(__FILE__) . 'main.js', '', '', true);
  wp_localize_script('main_js', 'bmkbmData', array(
    'siteURL' => get_site_url()
  ));
}

?>
