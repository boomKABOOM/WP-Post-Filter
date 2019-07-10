<div class="row unspace">
  <article class="col">
    <div class="post--med">
      <a href="<?php the_permalink(); ?>" class="image">
        <img src="<?php the_post_thumbnail_url('large'); ?>" alt="">
      </a>
      <div class="content">
        <a href="<?php the_permalink(); ?>" class="title">
          <h3>
            <?php echo create_excerpt(the_title()); ?>
          </h3>
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
  </article>
</div>
