
/***** Orbit Carousel - Foundation 3 *****/

jQuery(document).ready(function(){
   jQuery('.orbit').each(function(){
       var id = this.id;
       jQuery('#'+id).orbit({ fluid: '16x9' });
  });
});

