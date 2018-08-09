<?php
/*
Template Name: Kitchen Sink
*/
get_header( 'accredit' ); ?>


<?php /* Start loop */ ?>
<?php while ( have_posts() ) : the_post(); ?>
    <?php get_template_part( 'template-parts/featured-image' ); ?>
    <div class="main-container">
        <div class="main-grid">
            <header class="kitchen-sink-header">
                <h1 class="entry-title"><?php the_title(); ?></h1><hr>
                <p class="lead">This page includes every single element so that we can make sure things work together smoothly.</p><hr>
            </header>

            <!-- Main wrapper for the components in the kitchen-sink -->
            <div id="components" class="kitchen-sink-components">
                <article <?php post_class() ?> id="post-<?php the_ID(); ?>">

                    <!-- Accordion -->
                    <h2 id="accordion" class="docs-heading" data-magellan-target="accordion"><a href="#accordion"></a>Accordion</h2>
                    <ul class="accordion" data-accordion role="tablist" data-multi-expand="true">
                        <li class="accordion-item" data-accordion-item>
                            <!-- The tab title needs role="tab", an href, a unique ID, and aria-controls. -->
                            <a href="#" class="accordion-title">Accordion 1</a>
                            <!-- The content pane needs an ID that matches the above href, role="tabpanel", data-tab-content, and aria-labelledby. -->
                            <div class="accordion-content" data-tab-content>
                                Panel 1. Lorem ipsum dolor
                            </div>
                        </li>
                        <li class="accordion-item" data-accordion-item>
                            <!-- The tab title needs role="tab", an href, a unique ID, and aria-controls. -->
                            <a href="#" class="accordion-title">Accordion 2</a>
                            <!-- The content pane needs an ID that matches the above href, role="tabpanel", data-tab-content, and aria-labelledby. -->
                            <div class="accordion-content" data-tab-content>
                                Panel 2. Lorem ipsum dolor
                            </div>
                        </li>
                        <li class="accordion-item" data-accordion-item>
                            <!-- The tab title needs role="tab", an href, a unique ID, and aria-controls. -->
                            <a href="#" class="accordion-title">Accordion 3</a>
                            <!-- The content pane needs an ID that matches the above href, role="tabpanel", data-tab-content, and aria-labelledby. -->
                            <div class="accordion-content" data-tab-content>
                                Panel 3. Lorem ipsum dolor
                            </div>
                        </li>
                    </ul>
                    <hr>

                    <!-- Button -->
                    <h2 id="button" class="docs-heading" data-magellan-target="button"><a href="#button"></a>Button</h2>
                        <a class="button primary" href="#">Primary</a>
                        <a class="button secondary" href="#">Secondary</a>
                        <a class="button success" href="#">Success</a>
                        <a class="button alert" href="#">Alert</a>
                        <a class="button warning" href="#">Warning</a>

                        <br />
                        <!-- Buttons (actions) -->
                        <button type="button" class="success button">Save</button>
                        <button type="button" class="alert button">Delete</button>

                        <br />
                        <a class="tiny button" href="#">So Tiny</a>
                        <a class="small button" href="#">So Small</a>
                        <a class="button" href="#">So Basic</a>
                        <a class="large button" href="#">So Large</a>
                        <a class="expanded button" href="#">Such Expand</a>

                        <div class="button-group">
                            <a class="button">One</a>
                            <a class="button">Two</a>
                            <a class="button">Three</a>
                        </div>
                    <hr>

                    <!-- Callout -->
                    <h2 id="callout" class="docs-heading" data-magellan-target="callout"><a href="#callout"></a>Callout</h2>
                        <div class="callout">
                            <h5>Goal Setting</h5>
                            <p>There are about 2 ½ million people with multiple sclerosis, or “MS”, in the world today.  When people think of MS, they often think first of movement problems, like poor balance or difficulty walking or using one’s hands.</p>
                            <a href="#">Read more about goal setting »</a>
                        </div>
                    <hr>

                    <!-- Cards -->
                    <h2 id="cards" class="docs-heading" data-magellan-target="cards"><a href="#cards"></a>Cards</h2>

                    <div class="cards-container">

                        <div class="card">
                            <img src="https://placeimg.com/300/200/arch">
                            <div class="card-content">
                                <h4>Dreams feel real</h4>
                                <p>I'm going to improvise. Listen, there's something you should know about me... about inception.</p>
                                <small>Last updated 1 minute ago</small>
                            </div>
                        </div>

                        <div class="card">
                            <img src="https://placeimg.com/300/200/nature">
                            <div class="card-content">
                                <h4>Menus</h4>
                                <p>Cards play nicely with menus too! Give them a try.</p>
                                <ul class="menu simple">
                                    <li><a href="#">One</a></li>
                                    <li><a href="#">Two</a></li>
                                    <li><a href="#">Three</a></li>
                                </ul>
                            </div>
                        </div>

                        <div class="card">
                            <div class="card-divider">
                                <p>Featured</p>
                            </div>
                            <div class="card-content">
                                <h4>Your title here!</h4>
                                <p>An idea is like a virus, resilient, highly contagious. The smallest seed of an idea can grow. It can grow to define or destroy you.</p>
                            </div>
                        </div>

                        <div class="card">
                            <img src="https://placeimg.com/300/200/people">
                            <div class="card-content">
                                <h4>Buttons!</h4>
                                <p>Who doesn't love a good button? Buttons work in all of their forms too.</p>
                                <a class="button" href="#">I'm a button</a>
                            </div>
                        </div>

                        <div class="card">
                            <img src="https://placeimg.com/300/200/tech">
                            <div class="card-content">
                                <h4>And button groups...</h4>
                                <p>Button groups also work great!</p>
                                <div class="button-group">
                                    <a class="button">One</a>
                                    <a class="button">Two</a>
                                </div>
                            </div>
                        </div>

                        <div class="card text-center">
                            <div class="card-divider">
                                <p>Centered</p>
                            </div>
                            <img src="https://placeimg.com/300/200/animals">
                            <div class="card-content">
                                <p>The utility classes like .text-center work great too.</p>
                                <a class="button" href="#">Click me</a>
                            </div>
                        </div>
                    </div>
                    <hr>

                    <!-- Flex Video -->
                    <h2 id="flex-video" class="docs-heading" data-magellan-target="flex-video"><a href="#flex-video"></a>Flex Video</h2>
                    <div class="flex-video">
                        <iframe width="420" height="315" src="https://www.youtube.com/embed/V9gkYw35Vws" frameborder="0" allowfullscreen></iframe>
                    </div>
                    <hr>


                    <!-- Pagination -->
                    <h2 id="pagination" class="docs-heading" data-magellan-target="pagination"><a href="#pagination"></a>Pagination</h2>
                    <ul class="pagination" role="navigation" aria-label="Pagination">
                        <li class="disabled">Previous <span class="show-for-sr">page</span></li>
                        <li class="current"><span class="show-for-sr">You're on page</span> 1</li>
                        <li><a href="#" aria-label="Page 2">2</a></li>
                        <li><a href="#" aria-label="Page 3">3</a></li>
                        <li><a href="#" aria-label="Page 4">4</a></li>
                        <li class="ellipsis" aria-hidden="true"></li>
                        <li><a href="#" aria-label="Page 12">12</a></li>
                        <li><a href="#" aria-label="Page 13">13</a></li>
                        <li><a href="#" aria-label="Next page">Next <span class="show-for-sr">page</span></a></li>
                    </ul>
                    <hr>

                    <!-- Reveal -->
                    <h2 id="reveal" class="docs-heading" data-magellan-target="reveal"><a href="#reveal"></a>Reveal</h2>
                    <p><a data-open="exampleModal1">Click me for a basic modal</a></p>
                    <p><a data-toggle="exampleModal8">Click me for a full-screen modal</a></p>

                        <!-- Basic modal -->
                    <div class="reveal" id="exampleModal1" data-reveal>
                        <h2>This is a basic modal</h2>
                        <p class="lead">Using hipster ipsum for dummy text</p>
                        <p>Stumptown direct trade swag hella iPhone post-ironic. Before they sold out blog twee, quinoa forage pour-over microdosing deep v keffiyeh fanny pack. Occupy polaroid tilde, bitters vegan man bun gentrify meggings.</p>
                        <button class="close-button" data-close aria-label="Close reveal" type="button">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>

                    <!-- Full screen modal -->
                    <div class="full reveal" id="exampleModal8" data-reveal>
                        <h2>Full screen modal</h2>
                        <img src="https://placeimg.com/800/600/arch" alt="Intropsective Cage">
                        <button class="close-button" data-close aria-label="Close reveal" type="button">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <hr>



                    <!-- Table -->
                    <h2 id="table" class="docs-heading" data-magellan-target="table"><a href="#table"></a>Table</h2>
                    <table>
                        <thead>
                            <tr>
                                <th width="200">Table Header</th>
                                <th>Table Header</th>
                                <th width="150">Table Header</th>
                                <th width="150">Table Header</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Content Goes Here</td>
                                <td>This is longer content Donec id elit non mi porta gravida at eget metus.</td>
                                <td>Content Goes Here</td>
                                <td>Content Goes Here</td>
                            </tr>
                            <tr>
                                <td>Content Goes Here</td>
                                <td>This is longer Content Goes Here Donec id elit non mi porta gravida at eget metus.</td>
                                <td>Content Goes Here</td>
                                <td>Content Goes Here</td>
                            </tr>
                            <tr>
                                <td>Content Goes Here</td>
                                <td>This is longer Content Goes Here Donec id elit non mi porta gravida at eget metus.</td>
                                <td>Content Goes Here</td>
                                <td>Content Goes Here</td>
                            </tr>
                        </tbody>
                    </table>
                    <hr>


                    <!-- Tooltip -->
                    <h2 id="tooltip" class="docs-heading" data-magellan-target="tooltip"><a href="#tooltip"></a>Tooltip</h2>
                    <p>The <span data-tooltip aria-haspopup="true" class="has-tip" data-disable-hover='false' tabindex=1 title="Fancy word for a beetle.">scarabaeus</span> hung quite clear of any branches, and, if allowed to fall, would have fallen at our feet. Legrand immediately took the scythe, and cleared with it a circular space, three or four yards in diameter, just beneath the insect, and, having accomplished this, ordered Jupiter to let go the string and come down from the tree.</p>
                    <hr>

                    <div id="gutenberg-content" class="entry-content">
                        <?php the_content(); ?>
                    </div>

                </article>
            </div>

            <!-- On this page - sidebar nav container -->
            <nav id="kitchen-sink-nav" class="kitchen-sink-nav" data-sticky-container>
                <div class="docs-toc" data-sticky="sidebar" data-anchor="components">
                    <ul class="vertical menu docs-sub-menu" data-magellan>
                        <li class="docs-menu-title">On this page:</li>
                        <li><a href="#accordion">Accordion</a></li>
                        <li><a href="#button">Button</a></li>
                        <li><a href="#callout">Callouts</a></li>
                        <li><a href="#cards">Cards</a></li>
                        <li><a href="#flex-video">Flex Video</a></li>
                        <li><a href="#pagination">Pagination</a></li>
                        <li><a href="#reveal">Reveal</a></li>
                        <li><a href="#table">Table</a></li>
                        <li><a href="#tooltip">Tooltip</a></li>
                        <li><a href="#tooltip">Gutenberg Content</a></li>
                    </ul>
                </div>
            </nav>

        </div><!-- Close main-grid -->
    </div><!-- Close main-container -->
<?php endwhile; ?>
<?php get_footer( 'accredit' );
