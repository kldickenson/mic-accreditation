(function() {
    tinymce.PluginManager.add('foundation_icons', function( editor, url ) {
        editor.addButton( 'foundation_icons', {
            title: fp_foundation_assistant_localized_script.icon_font,
            type: 'menubutton',
            icon: 'icon fp-icon-02',
            menu: [

                {
                    text: fp_foundation_assistant_localized_script.fi_address_book,
                    icon: 'icon fi-address-book',
                    onclick: function() {
                        editor.insertContent("&nbsp;<i class='fi-address-book'><!-- icon --></i>&nbsp;");
                    }
                },
                {
                    text: fp_foundation_assistant_localized_script.fi_alert,
                    icon: 'icon fi-alert',
                    onclick: function() {
                        editor.insertContent("&nbsp;<i class='fi-alert'><!-- icon --></i>&nbsp;");
                    }
                },
                {
                    text: fp_foundation_assistant_localized_script.fi_align_justify,
                    icon: 'icon fi-align-justify',
                    onclick: function() {
                        editor.insertContent("&nbsp;<i class='fi-align-justify'><!-- icon --></i>&nbsp;");
                    }
                },
                {
                    text: fp_foundation_assistant_localized_script.fi_align_left,
                    icon: 'icon fi-align-left',
                    onclick: function() {
                        editor.insertContent("&nbsp;<i class='fi-align-left'><!-- icon --></i>&nbsp;");
                    }
                },
                {
                    text: fp_foundation_assistant_localized_script.fi_align_right,
                    icon: 'icon fi-align-right',
                    onclick: function() {
                        editor.insertContent("&nbsp;<i class='fi-align-right'><!-- icon --></i>&nbsp;");
                    }
                },
                {
                    text: fp_foundation_assistant_localized_script.fi_anchor,
                    icon: 'icon fi-anchor',
                    onclick: function() {
                        editor.insertContent("&nbsp;<i class='fi-anchor'><!-- icon --></i>&nbsp;");
                    }
                },
                {
                    text: fp_foundation_assistant_localized_script.fi_annotate,
                    icon: 'icon fi-annotate',
                    onclick: function() {
                        editor.insertContent("&nbsp;<i class='fi-annotate'><!-- icon --></i>&nbsp;");
                    }
                },
                {
                    text: fp_foundation_assistant_localized_script.fi_archive,
                    icon: 'icon fi-archive',
                    onclick: function() {
                        editor.insertContent("&nbsp;<i class='fi-archive'><!-- icon --></i>&nbsp;");
                    }
                },
                {
                    text: fp_foundation_assistant_localized_script.fi_arrow_down,
                    icon: 'icon fi-arrow-down',
                    onclick: function() {
                        editor.insertContent("&nbsp;<i class='fi-arrow-down'><!-- icon --></i>&nbsp;");
                    }
                },
                {
                    text: fp_foundation_assistant_localized_script.fi_arrow_left,
                    icon: 'icon fi-arrow-left',
                    onclick: function() {
                        editor.insertContent("&nbsp;<i class='fi-arrow-left'><!-- icon --></i>&nbsp;");
                    }
                },
                {
                    text: fp_foundation_assistant_localized_script.fi_arrow_right,
                    icon: 'icon fi-arrow-right',
                    onclick: function() {
                        editor.insertContent("&nbsp;<i class='fi-arrow-right'><!-- icon --></i>&nbsp;");
                    }
                },
                {
                    text: fp_foundation_assistant_localized_script.fi_arrow_up,
                    icon: 'icon fi-arrow-up',
                    onclick: function() {
                        editor.insertContent("&nbsp;<i class='fi-arrow-up'><!-- icon --></i>&nbsp;");
                    }
                },
                {
                    text: fp_foundation_assistant_localized_script.fi_arrows_compress,
                    icon: 'icon fi-arrows-compress',
                    onclick: function() {
                        editor.insertContent("&nbsp;<i class='fi-arrows-compress'><!-- icon --></i>&nbsp;");
                    }
                },
                {
                    text: fp_foundation_assistant_localized_script.fi_arrows_expand,
                    icon: 'icon fi-arrows-expand',
                    onclick: function() {
                        editor.insertContent("&nbsp;<i class='fi-arrows-expand'><!-- icon --></i>&nbsp;");
                    }
                },
                {
                    text: fp_foundation_assistant_localized_script.fi_arrows_in,
                    icon: 'icon fi-arrows-in',
                    onclick: function() {
                        editor.insertContent("&nbsp;<i class='fi-arrows-in'><!-- icon --></i>&nbsp;");
                    }
                },
                {
                    text: fp_foundation_assistant_localized_script.fi_arrows_out,
                    icon: 'icon fi-arrows-out',
                    onclick: function() {
                        editor.insertContent("&nbsp;<i class='fi-arrows-out'><!-- icon --></i>&nbsp;");
                    }
                },
                {
                    text: fp_foundation_assistant_localized_script.fi_asl,
                    icon: 'icon fi-asl',
                    onclick: function() {
                        editor.insertContent("&nbsp;<i class='fi-asl'><!-- icon --></i>&nbsp;");
                    }
                },
                {
                    text: fp_foundation_assistant_localized_script.fi_asterisk,
                    icon: 'icon fi-asterisk',
                    onclick: function() {
                        editor.insertContent("&nbsp;<i class='fi-asterisk'><!-- icon --></i>&nbsp;");
                    }
                },
                {
                    text: fp_foundation_assistant_localized_script.fi_at_sign,
                    icon: 'icon fi-at-sign',
                    onclick: function() {
                        editor.insertContent("&nbsp;<i class='fi-at-sign'><!-- icon --></i>&nbsp;");
                    }
                },
                {
                    text: fp_foundation_assistant_localized_script.fi_battery_full,
                    icon: 'icon fi-battery-full',
                    onclick: function() {
                        editor.insertContent("&nbsp;<i class='fi-battery-full'><!-- icon --></i>&nbsp;");
                    }
                },
                {
                    text: fp_foundation_assistant_localized_script.fi_battery_half,
                    icon: 'icon fi-battery-half',
                    onclick: function() {
                        editor.insertContent("&nbsp;<i class='fi-battery-half'><!-- icon --></i>&nbsp;");
                    }
                },
                {
                    text: fp_foundation_assistant_localized_script.fi_battery_empty,
                    icon: 'icon fi-battery-empty',
                    onclick: function() {
                        editor.insertContent("&nbsp;<i class='fi-battery-empty'><!-- icon --></i>&nbsp;");
                    }
                },
                {
                    text: fp_foundation_assistant_localized_script.fi_bitcoin_circle,
                    icon: 'icon fi-bitcoin-circle',
                    onclick: function() {
                        editor.insertContent("&nbsp;<i class='fi-bitcoin-circle'><!-- icon --></i>&nbsp;");
                    }
                },  
                 {
                    text: fp_foundation_assistant_localized_script.fi_bitcoin,
                    icon: 'icon fi-bitcoin',
                    onclick: function() {
                        editor.insertContent("&nbsp;<i class='fi-bitcoin'><!-- icon --></i>&nbsp;");
                    }
                },
                 {
                    text: fp_foundation_assistant_localized_script.fi_blind,
                    icon: 'icon fi-blind',
                    onclick: function() {
                        editor.insertContent("&nbsp;<i class='fi-blind'><!-- icon --></i>&nbsp;");
                    }
                },
                 {
                    text: fp_foundation_assistant_localized_script.fi_bluetooth,
                    icon: 'icon fi-bluetooth',
                    onclick: function() {
                        editor.insertContent("&nbsp;<i class='fi-bluetooth'><!-- icon --></i>&nbsp;");
                    }
                },
                 {
                    text: fp_foundation_assistant_localized_script.fi_bold,
                    icon: 'icon fi-bold',
                    onclick: function() {
                        editor.insertContent("&nbsp;<i class='fi-bold'><!-- icon --></i>&nbsp;");
                    }
                },              
                {
                    text: fp_foundation_assistant_localized_script.fi_book_bookmark,
                    icon: 'icon fi-book-bookmark',
                    onclick: function() {
                        editor.insertContent("&nbsp;<i class='fi-book-bookmark'><!-- icon --></i>&nbsp;");
                    }
                },
                {
                    text: fp_foundation_assistant_localized_script.fi_book,
                    icon: 'icon fi-book',
                    onclick: function() {
                        editor.insertContent("&nbsp;<i class='fi-book'><!-- icon --></i>&nbsp;");
                    }
                },
                {
                    text: fp_foundation_assistant_localized_script.fi_bookmark,
                    icon: 'icon fi-bookmark',
                    onclick: function() {
                        editor.insertContent("&nbsp;<i class='fi-bookmark'><!-- icon --></i>&nbsp;");
                    }
                },
                {
                    text: fp_foundation_assistant_localized_script.fi_braille,
                    icon: 'icon fi-braille',
                    onclick: function() {
                        editor.insertContent("&nbsp;<i class='fi-braille'><!-- icon --></i>&nbsp;");
                    }
                },{
                    text: fp_foundation_assistant_localized_script.fi_burst_new,
                    icon: 'icon fi-burst-new',
                    onclick: function() {
                        editor.insertContent("&nbsp;<i class='fi-burst-new'><!-- icon --></i>&nbsp;");
                    }
                },{
                    text: fp_foundation_assistant_localized_script.fi_burst_sale,
                    icon: 'icon fi-burst-sale',
                    onclick: function() {
                        editor.insertContent("&nbsp;<i class='fi-burst-sale'><!-- icon --></i>&nbsp;");
                    }
                },{
                    text: fp_foundation_assistant_localized_script.fi_burst,
                    icon: 'icon fi-burst',
                    onclick: function() {
                        editor.insertContent("&nbsp;<i class='fi-burst'><!-- icon --></i>&nbsp;");
                    }
                },{
                    text: fp_foundation_assistant_localized_script.fi_calendar,
                    icon: 'icon fi-calendar',
                    onclick: function() {
                        editor.insertContent("&nbsp;<i class='fi-calendar'><!-- icon --></i>&nbsp;");
                    }
                },{
                    text: fp_foundation_assistant_localized_script.fi_camera,
                    icon: 'icon fi-camera',
                    onclick: function() {
                        editor.insertContent("&nbsp;<i class='fi-camera'><!-- icon --></i>&nbsp;");
                    }
                },{
                    text: fp_foundation_assistant_localized_script.fi_check,
                    icon: 'icon fi-check',
                    onclick: function() {
                        editor.insertContent("&nbsp;<i class='fi-check'><!-- icon --></i>&nbsp;");
                    }
                },{
                    text: fp_foundation_assistant_localized_script.fi_checkbox,
                    icon: 'icon fi-checkbox',
                    onclick: function() {
                        editor.insertContent("&nbsp;<i class='fi-checkbox'><!-- icon --></i>&nbsp;");
                    }
                },{
                    text: fp_foundation_assistant_localized_script.fi_clipboard_notes,
                    icon: 'icon fi-clipboard-notes',
                    onclick: function() {
                        editor.insertContent("&nbsp;<i class='fi-clipboard-notes'><!-- icon --></i>&nbsp;");
                    }
                },{
                    text: fp_foundation_assistant_localized_script.fi_clipboard_pencil,
                    icon: 'icon fi-clipboard-pencil',
                    onclick: function() {
                        editor.insertContent("&nbsp;<i class='fi-clipboard-pencil'><!-- icon --></i>&nbsp;");
                    }
                },{
                    text: fp_foundation_assistant_localized_script.fi_clipboard,
                    icon: 'icon fi-clipboard',
                    onclick: function() {
                        editor.insertContent("&nbsp;<i class='fi-clipboard'><!-- icon --></i>&nbsp;");
                    }
                },{
                    text: fp_foundation_assistant_localized_script.fi_clock,
                    icon: 'icon fi-clock',
                    onclick: function() {
                        editor.insertContent("&nbsp;<i class='fi-clock'><!-- icon --></i>&nbsp;");
                    }
                },{
                    text: fp_foundation_assistant_localized_script.fi_closed_caption,
                    icon: 'icon fi-closed-caption',
                    onclick: function() {
                        editor.insertContent("&nbsp;<i class='fi-closed-caption'><!-- icon --></i>&nbsp;");
                    }
                },{
                    text: fp_foundation_assistant_localized_script.fi_cloud,
                    icon: 'icon fi-cloud',
                    onclick: function() {
                        editor.insertContent("&nbsp;<i class='fi-cloud'><!-- icon --></i>&nbsp;");
                    }
                },{
                    text: fp_foundation_assistant_localized_script.fi_comment_minus,
                    icon: 'icon fi-comment-minus',
                    onclick: function() {
                        editor.insertContent("&nbsp;<i class='fi-comment-minus'><!-- icon --></i>&nbsp;");
                    }
                },{
                    text: fp_foundation_assistant_localized_script.fi_comment_quotes,
                    icon: 'icon fi-comment-quotes',
                    onclick: function() {
                        editor.insertContent("&nbsp;<i class='fi-comment-quotes'><!-- icon --></i>&nbsp;");
                    }
                },{
                    text: fp_foundation_assistant_localized_script.fi_comment_video,
                    icon: 'icon fi-comment-video',
                    onclick: function() {
                        editor.insertContent("&nbsp;<i class='fi-comment-video'><!-- icon --></i>&nbsp;");
                    }
                },{
                    text: fp_foundation_assistant_localized_script.fi_comment,
                    icon: 'icon fi-comment',
                    onclick: function() {
                        editor.insertContent("&nbsp;<i class='fi-comment'><!-- icon --></i>&nbsp;");
                    }
                },{
                    text: fp_foundation_assistant_localized_script.fi_comments,
                    icon: 'icon fi-comments',
                    onclick: function() {
                        editor.insertContent("&nbsp;<i class='fi-comments'><!-- icon --></i>&nbsp;");
                    }
                },{
                    text: fp_foundation_assistant_localized_script.fi_compass,
                    icon: 'icon fi-compass',
                    onclick: function() {
                        editor.insertContent("&nbsp;<i class='fi-compass'><!-- icon --></i>&nbsp;");
                    }
                },{
                    text: fp_foundation_assistant_localized_script.fi_contrast,
                    icon: 'icon fi-contrast',
                    onclick: function() {
                        editor.insertContent("&nbsp;<i class='fi-contrast'><!-- icon --></i>&nbsp;");
                    }
                },{
                    text: fp_foundation_assistant_localized_script.fi_credit_card,
                    icon: 'icon fi-credit-card',
                    onclick: function() {
                        editor.insertContent("&nbsp;<i class='fi-credit-card'><!-- icon --></i>&nbsp;");
                    }
                },{
                    text: fp_foundation_assistant_localized_script.fi_crop,
                    icon: 'icon fi-crop',
                    onclick: function() {
                        editor.insertContent("&nbsp;<i class='fi-crop'><!-- icon --></i>&nbsp;");
                    }
                },{
                    text: fp_foundation_assistant_localized_script.fi_crown,
                    icon: 'icon fi-crown',
                    onclick: function() {
                        editor.insertContent("&nbsp;<i class='fi-crown'><!-- icon --></i>&nbsp;");
                    }
                },{
                    text: fp_foundation_assistant_localized_script.fi_css3,
                    icon: 'icon fi-css3',
                    onclick: function() {
                        editor.insertContent("&nbsp;<i class='fi-css3'><!-- icon --></i>&nbsp;");
                    }
                },{
                    text: fp_foundation_assistant_localized_script.fi_database,
                    icon: 'icon fi-database',
                    onclick: function() {
                        editor.insertContent("&nbsp;<i class='fi-database'><!-- icon --></i>&nbsp;");
                    }
                },{
                    text: fp_foundation_assistant_localized_script.fi_die_five,
                    icon: 'icon fi-die-five',
                    onclick: function() {
                        editor.insertContent("&nbsp;<i class='fi-die-five'><!-- icon --></i>&nbsp;");
                    }
                },{
                    text: fp_foundation_assistant_localized_script.fi_die_four,
                    icon: 'icon fi-die-four',
                    onclick: function() {
                        editor.insertContent("&nbsp;<i class='fi-die-four'><!-- icon --></i>&nbsp;");
                    }
                },{
                    text: fp_foundation_assistant_localized_script.fi_die_one,
                    icon: 'icon fi-die-one',
                    onclick: function() {
                        editor.insertContent("&nbsp;<i class='fi-die-one'><!-- icon --></i>&nbsp;");
                    }
                },{
                    text: fp_foundation_assistant_localized_script.fi_die_six,
                    icon: 'icon fi-die-six',
                    onclick: function() {
                        editor.insertContent("&nbsp;<i class='fi-die-six'><!-- icon --></i>&nbsp;");
                    }
                },{
                    text: fp_foundation_assistant_localized_script.fi_die_three,
                    icon: 'icon fi-die-three',
                    onclick: function() {
                        editor.insertContent("&nbsp;<i class='fi-die-three'><!-- icon --></i>&nbsp;");
                    }
                },{
                    text: fp_foundation_assistant_localized_script.fi_die_two,
                    icon: 'icon fi-die-two',
                    onclick: function() {
                        editor.insertContent("&nbsp;<i class='fi-die-two'><!-- icon --></i>&nbsp;");
                    }
                },{
                    text: fp_foundation_assistant_localized_script.fi_dislike,
                    icon: 'icon fi-dislike',
                    onclick: function() {
                        editor.insertContent("&nbsp;<i class='fi-dislike'><!-- icon --></i>&nbsp;");
                    }
                },{
                    text: fp_foundation_assistant_localized_script.fi_dollar_bill,
                    icon: 'icon fi-dollar-bill',
                    onclick: function() {
                        editor.insertContent("&nbsp;<i class='fi-dollar-bill'><!-- icon --></i>&nbsp;");
                    }
                },{
                    text: fp_foundation_assistant_localized_script.fi_dollar,
                    icon: 'icon fi-dollar',
                    onclick: function() {
                        editor.insertContent("&nbsp;<i class='fi-dollar'><!-- icon --></i>&nbsp;");
                    }
                },{
                    text: fp_foundation_assistant_localized_script.fi_download,
                    icon: 'icon fi-download',
                    onclick: function() {
                        editor.insertContent("&nbsp;<i class='fi-download'><!-- icon --></i>&nbsp;");
                    }
                },{
                    text: fp_foundation_assistant_localized_script.fi_eject,
                    icon: 'icon fi-eject',
                    onclick: function() {
                        editor.insertContent("&nbsp;<i class='fi-eject'><!-- icon --></i>&nbsp;");
                    }
                },{
                    text: fp_foundation_assistant_localized_script.fi_elevator,
                    icon: 'icon fi-elevator',
                    onclick: function() {
                        editor.insertContent("&nbsp;<i class='fi-elevator'><!-- icon --></i>&nbsp;");
                    }
                },{
                    text: fp_foundation_assistant_localized_script.fi_euro,
                    icon: 'icon fi-euro',
                    onclick: function() {
                        editor.insertContent("&nbsp;<i class='fi-euro'><!-- icon --></i>&nbsp;");
                    }
                },{
                    text: fp_foundation_assistant_localized_script.fi_eye,
                    icon: 'icon fi-eye',
                    onclick: function() {
                        editor.insertContent("&nbsp;<i class='fi-eye'><!-- icon --></i>&nbsp;");
                    }
                },{
                    text: fp_foundation_assistant_localized_script.fi_fast_forward,
                    icon: 'icon fi-fast-forward',
                    onclick: function() {
                        editor.insertContent("&nbsp;<i class='fi-fast-forward'><!-- icon --></i>&nbsp;");
                    }
                },{
                    text: fp_foundation_assistant_localized_script.fi_female_symbol,
                    icon: 'icon fi-female-symbol',
                    onclick: function() {
                        editor.insertContent("&nbsp;<i class='fi-female-symbol'><!-- icon --></i>&nbsp;");
                    }
                },{
                    text: fp_foundation_assistant_localized_script.fi_female,
                    icon: 'icon fi-female',
                    onclick: function() {
                        editor.insertContent("&nbsp;<i class='fi-female'><!-- icon --></i>&nbsp;");
                    }
                },{
                    text: fp_foundation_assistant_localized_script.fi_filter,
                    icon: 'icon fi-filter',
                    onclick: function() {
                        editor.insertContent("&nbsp;<i class='fi-filter'><!-- icon --></i>&nbsp;");
                    }
                },{
                    text: fp_foundation_assistant_localized_script.fi_first_aid,
                    icon: 'icon fi-first-aid',
                    onclick: function() {
                        editor.insertContent("&nbsp;<i class='fi-first-aid'><!-- icon --></i>&nbsp;");
                    }
                },{
                    text: fp_foundation_assistant_localized_script.fi_flag,
                    icon: 'icon fi-flag',
                    onclick: function() {
                        editor.insertContent("&nbsp;<i class='fi-flag'><!-- icon --></i>&nbsp;");
                    }
                },{
                    text: fp_foundation_assistant_localized_script.fi_folder_add,
                    icon: 'icon fi-folder-add',
                    onclick: function() {
                        editor.insertContent("&nbsp;<i class='fi-folder-add'><!-- icon --></i>&nbsp;");
                    }
                },{
                    text: fp_foundation_assistant_localized_script.fi_folder_lock,
                    icon: 'icon fi-folder-lock',
                    onclick: function() {
                        editor.insertContent("&nbsp;<i class='fi-folder-lock'><!-- icon --></i>&nbsp;");
                    }
                },{
                    text: fp_foundation_assistant_localized_script.fi_folder,
                    icon: 'icon fi-folder',
                    onclick: function() {
                        editor.insertContent("&nbsp;<i class='fi-folder'><!-- icon --></i>&nbsp;");
                    }
                },{
                    text: fp_foundation_assistant_localized_script.fi_foot,
                    icon: 'icon fi-foot',
                    onclick: function() {
                        editor.insertContent("&nbsp;<i class='fi-foot'><!-- icon --></i>&nbsp;");
                    }
                },{
                    text: fp_foundation_assistant_localized_script.fi_foundation,
                    icon: 'icon fi-foundation',
                    onclick: function() {
                        editor.insertContent("&nbsp;<i class='fi-foundation'><!-- icon --></i>&nbsp;");
                    }
                },{
                    text: fp_foundation_assistant_localized_script.fi_graph_bar,
                    icon: 'icon fi-graph-bar',
                    onclick: function() {
                        editor.insertContent("&nbsp;<i class='fi-graph-bar'><!-- icon --></i>&nbsp;");
                    }
                },{
                    text: fp_foundation_assistant_localized_script.fi_graph_horizontal,
                    icon: 'icon fi-graph-horizontal',
                    onclick: function() {
                        editor.insertContent("&nbsp;<i class='fi-graph-horizontal'><!-- icon --></i>&nbsp;");
                    }
                },{
                    text: fp_foundation_assistant_localized_script.fi_graph_pie,
                    icon: 'icon fi-graph-pie',
                    onclick: function() {
                        editor.insertContent("&nbsp;<i class='fi-graph-pie'><!-- icon --></i>&nbsp;");
                    }
                },{
                    text: fp_foundation_assistant_localized_script.fi_graph_trend,
                    icon: 'icon fi-graph-trend',
                    onclick: function() {
                        editor.insertContent("&nbsp;<i class='fi-graph-trend'><!-- icon --></i>&nbsp;");
                    }
                },{
                    text: fp_foundation_assistant_localized_script.fi_guide_dog,
                    icon: 'icon fi-guide-dog',
                    onclick: function() {
                        editor.insertContent("&nbsp;<i class='fi-guide-dog'><!-- icon --></i>&nbsp;");
                    }
                },{
                    text: fp_foundation_assistant_localized_script.fi_hearing_aid,
                    icon: 'icon fi-hearing-aid',
                    onclick: function() {
                        editor.insertContent("&nbsp;<i class='fi-hearing-aid'><!-- icon --></i>&nbsp;");
                    }
                },{
                    text: fp_foundation_assistant_localized_script.fi_heart,
                    icon: 'icon fi-heart',
                    onclick: function() {
                        editor.insertContent("&nbsp;<i class='fi-heart'><!-- icon --></i>&nbsp;");
                    }
                },{
                    text: fp_foundation_assistant_localized_script.fi_home,
                    icon: 'icon fi-home',
                    onclick: function() {
                        editor.insertContent("&nbsp;<i class='fi-home'><!-- icon --></i>&nbsp;");
                    }
                },{
                    text: fp_foundation_assistant_localized_script.fi_html5,
                    icon: 'icon fi-html5',
                    onclick: function() {
                        editor.insertContent("&nbsp;<i class='fi-html5'><!-- icon --></i>&nbsp;");
                    }
                },{
                    text: fp_foundation_assistant_localized_script.fi_indent_less,
                    icon: 'icon fi-indent-less',
                    onclick: function() {
                        editor.insertContent("&nbsp;<i class='fi-indent-less'><!-- icon --></i>&nbsp;");
                    }
                },{
                    text: fp_foundation_assistant_localized_script.fi_indent_more,
                    icon: 'icon fi-indent-more',
                    onclick: function() {
                        editor.insertContent("&nbsp;<i class='fi-indent-more'><!-- icon --></i>&nbsp;");
                    }
                },{
                    text: fp_foundation_assistant_localized_script.fi_info,
                    icon: 'icon fi-info',
                    onclick: function() {
                        editor.insertContent("&nbsp;<i class='fi-info'><!-- icon --></i>&nbsp;");
                    }
                },{
                    text: fp_foundation_assistant_localized_script.fi_italic,
                    icon: 'icon fi-italic',
                    onclick: function() {
                        editor.insertContent("&nbsp;<i class='fi-italic'><!-- icon --></i>&nbsp;");
                    }
                },{
                    text: fp_foundation_assistant_localized_script.fi_key,
                    icon: 'icon fi-key',
                    onclick: function() {
                        editor.insertContent("&nbsp;<i class='fi-key'><!-- icon --></i>&nbsp;");
                    }
                },{
                    text: fp_foundation_assistant_localized_script.fi_laptop,
                    icon: 'icon fi-laptop',
                    onclick: function() {
                        editor.insertContent("&nbsp;<i class='fi-laptop'><!-- icon --></i>&nbsp;");
                    }
                },{
                    text: fp_foundation_assistant_localized_script.fi_layout,
                    icon: 'icon fi-layout',
                    onclick: function() {
                        editor.insertContent("&nbsp;<i class='fi-layout'><!-- icon --></i>&nbsp;");
                    }
                },{
                    text: fp_foundation_assistant_localized_script.fi_lightbulb,
                    icon: 'icon fi-lightbulb',
                    onclick: function() {
                        editor.insertContent("&nbsp;<i class='fi-lightbulb'><!-- icon --></i>&nbsp;");
                    }
                },{
                    text: fp_foundation_assistant_localized_script.fi_like,
                    icon: 'icon fi-like',
                    onclick: function() {
                        editor.insertContent("&nbsp;<i class='fi-like'><!-- icon --></i>&nbsp;");
                    }
                },{
                    text: fp_foundation_assistant_localized_script.fi_link,
                    icon: 'icon fi-link',
                    onclick: function() {
                        editor.insertContent("&nbsp;<i class='fi-link'><!-- icon --></i>&nbsp;");
                    }
                },{
                    text: fp_foundation_assistant_localized_script.fi_list_bullet,
                    icon: 'icon fi-list-bullet',
                    onclick: function() {
                        editor.insertContent("&nbsp;<i class='fi-list-bullet'><!-- icon --></i>&nbsp;");
                    }
                },{
                    text: fp_foundation_assistant_localized_script.fi_list_number,
                    icon: 'icon fi-list-number',
                    onclick: function() {
                        editor.insertContent("&nbsp;<i class='fi-list-number'><!-- icon --></i>&nbsp;");
                    }
                },{
                    text: fp_foundation_assistant_localized_script.fi_list_thumbnails,
                    icon: 'icon fi-list-thumbnails',
                    onclick: function() {
                        editor.insertContent("&nbsp;<i class='fi-list-thumbnails'><!-- icon --></i>&nbsp;");
                    }
                },{
                    text: fp_foundation_assistant_localized_script.fi_list,
                    icon: 'icon fi-list',
                    onclick: function() {
                        editor.insertContent("&nbsp;<i class='fi-list'><!-- icon --></i>&nbsp;");
                    }
                },{
                    text: fp_foundation_assistant_localized_script.fi_lock,
                    icon: 'icon fi-lock',
                    onclick: function() {
                        editor.insertContent("&nbsp;<i class='fi-lock'><!-- icon --></i>&nbsp;");
                    }
                },{
                    text: fp_foundation_assistant_localized_script.fi_loop,
                    icon: 'icon fi-loop',
                    onclick: function() {
                        editor.insertContent("&nbsp;<i class='fi-loop'><!-- icon --></i>&nbsp;");
                    }
                },{
                    text: fp_foundation_assistant_localized_script.fi_magnifying_glass,
                    icon: 'icon fi-magnifying-glass',
                    onclick: function() {
                        editor.insertContent("&nbsp;<i class='fi-magnifying-glass'><!-- icon --></i>&nbsp;");
                    }
                },{
                    text: fp_foundation_assistant_localized_script.fi_mail,
                    icon: 'icon fi-mail',
                    onclick: function() {
                        editor.insertContent("&nbsp;<i class='fi-mail'><!-- icon --></i>&nbsp;");
                    }
                },{
                    text: fp_foundation_assistant_localized_script.fi_male_female,
                    icon: 'icon fi-male-female',
                    onclick: function() {
                        editor.insertContent("&nbsp;<i class='fi-male-female'><!-- icon --></i>&nbsp;");
                    }
                },{
                    text: fp_foundation_assistant_localized_script.fi_male_symbol,
                    icon: 'icon fi-male-symbol',
                    onclick: function() {
                        editor.insertContent("&nbsp;<i class='fi-male-symbol'><!-- icon --></i>&nbsp;");
                    }
                },{
                    text: fp_foundation_assistant_localized_script.fi_male,
                    icon: 'icon fi-male',
                    onclick: function() {
                        editor.insertContent("&nbsp;<i class='fi-male'><!-- icon --></i>&nbsp;");
                    }
                },{
                    text: fp_foundation_assistant_localized_script.fi_map,
                    icon: 'icon fi-map',
                    onclick: function() {
                        editor.insertContent("&nbsp;<i class='fi-map'><!-- icon --></i>&nbsp;");
                    }
                },{
                    text: fp_foundation_assistant_localized_script.fi_marker,
                    icon: 'icon fi-marker',
                    onclick: function() {
                        editor.insertContent("&nbsp;<i class='fi-marker'><!-- icon --></i>&nbsp;");
                    }
                },{
                    text: fp_foundation_assistant_localized_script.fi_megaphone,
                    icon: 'icon fi-megaphone',
                    onclick: function() {
                        editor.insertContent("&nbsp;<i class='fi-megaphone'><!-- icon --></i>&nbsp;");
                    }
                },{
                    text: fp_foundation_assistant_localized_script.fi_microphone,
                    icon: 'icon fi-microphone',
                    onclick: function() {
                        editor.insertContent("&nbsp;<i class='fi-microphone'><!-- icon --></i>&nbsp;");
                    }
                },{
                    text: fp_foundation_assistant_localized_script.fi_minus_circle,
                    icon: 'icon fi-minus-circle',
                    onclick: function() {
                        editor.insertContent("&nbsp;<i class='fi-minus-circle'><!-- icon --></i>&nbsp;");
                    }
                },{
                    text: fp_foundation_assistant_localized_script.fi_minus,
                    icon: 'icon fi-minus',
                    onclick: function() {
                        editor.insertContent("&nbsp;<i class='fi-minus'><!-- icon --></i>&nbsp;");
                    }
                },{
                    text: fp_foundation_assistant_localized_script.fi_mobile_signal,
                    icon: 'icon fi-mobile-signal',
                    onclick: function() {
                        editor.insertContent("&nbsp;<i class='fi-mobile-signal'><!-- icon --></i>&nbsp;");
                    }
                },{
                    text: fp_foundation_assistant_localized_script.fi_mobile,
                    icon: 'icon fi-mobile',
                    onclick: function() {
                        editor.insertContent("&nbsp;<i class='fi-mobile'><!-- icon --></i>&nbsp;");
                    }
                },{
                    text: fp_foundation_assistant_localized_script.fi_monitor,
                    icon: 'icon fi-monitor',
                    onclick: function() {
                        editor.insertContent("&nbsp;<i class='fi-monitor'><!-- icon --></i>&nbsp;");
                    }
                },{
                    text: fp_foundation_assistant_localized_script.fi_mountains,
                    icon: 'icon fi-mountains',
                    onclick: function() {
                        editor.insertContent("&nbsp;<i class='fi-mountains'><!-- icon --></i>&nbsp;");
                    }
                },{
                    text: fp_foundation_assistant_localized_script.fi_music,
                    icon: 'icon fi-music',
                    onclick: function() {
                        editor.insertContent("&nbsp;<i class='fi-music'><!-- icon --></i>&nbsp;");
                    }
                },{
                    text: fp_foundation_assistant_localized_script.fi_next,
                    icon: 'icon fi-next',
                    onclick: function() {
                        editor.insertContent("&nbsp;<i class='fi-next'><!-- icon --></i>&nbsp;");
                    }
                },{
                    text: fp_foundation_assistant_localized_script.fi_no_dogs,
                    icon: 'icon fi-no-dogs',
                    onclick: function() {
                        editor.insertContent("&nbsp;<i class='fi-no-dogs'><!-- icon --></i>&nbsp;");
                    }
                },{
                    text: fp_foundation_assistant_localized_script.fi_no_smoking,
                    icon: 'icon fi-no-smoking',
                    onclick: function() {
                        editor.insertContent("&nbsp;<i class='fi-no-smoking'><!-- icon --></i>&nbsp;");
                    }
                },{
                    text: fp_foundation_assistant_localized_script.fi_page_add,
                    icon: 'icon fi-page-add',
                    onclick: function() {
                        editor.insertContent("&nbsp;<i class='fi-page-add'><!-- icon --></i>&nbsp;");
                    }
                },{
                    text: fp_foundation_assistant_localized_script.fi_page_copy,
                    icon: 'icon fi-page-copy',
                    onclick: function() {
                        editor.insertContent("&nbsp;<i class='fi-page-copy'><!-- icon --></i>&nbsp;");
                    }
                },{
                    text: fp_foundation_assistant_localized_script.fi_page_csv,
                    icon: 'icon fi-page-csv',
                    onclick: function() {
                        editor.insertContent("&nbsp;<i class='fi-page-csv'><!-- icon --></i>&nbsp;");
                    }
                },{
                    text: fp_foundation_assistant_localized_script.fi_page_delete,
                    icon: 'icon fi-page-delete',
                    onclick: function() {
                        editor.insertContent("&nbsp;<i class='fi-page-delete'><!-- icon --></i>&nbsp;");
                    }
                },{
                    text: fp_foundation_assistant_localized_script.fi_page_doc,
                    icon: 'icon fi-page-doc',
                    onclick: function() {
                        editor.insertContent("&nbsp;<i class='fi-page-doc'><!-- icon --></i>&nbsp;");
                    }
                },{
                    text: fp_foundation_assistant_localized_script.fi_page_edit,
                    icon: 'icon fi-page-edit',
                    onclick: function() {
                        editor.insertContent("&nbsp;<i class='fi-page-edit'><!-- icon --></i>&nbsp;");
                    }
                },{
                    text: fp_foundation_assistant_localized_script.fi_page_export_csv,
                    icon: 'icon fi-page-export-csv',
                    onclick: function() {
                        editor.insertContent("&nbsp;<i class='fi-page-export-csv'><!-- icon --></i>&nbsp;");
                    }
                },{
                    text: fp_foundation_assistant_localized_script.fi_page_export_doc,
                    icon: 'icon fi-page-export-doc',
                    onclick: function() {
                        editor.insertContent("&nbsp;<i class='fi-page-export-doc'><!-- icon --></i>&nbsp;");
                    }
                },{
                    text: fp_foundation_assistant_localized_script.fi_page_export_pdf,
                    icon: 'icon fi-page-export-pdf',
                    onclick: function() {
                        editor.insertContent("&nbsp;<i class='fi-page-export-pdf'><!-- icon --></i>&nbsp;");
                    }
                },{
                    text: fp_foundation_assistant_localized_script.fi_page_export,
                    icon: 'icon fi-page-export',
                    onclick: function() {
                        editor.insertContent("&nbsp;<i class='fi-page-export'><!-- icon --></i>&nbsp;");
                    }
                },{
                    text: fp_foundation_assistant_localized_script.fi_page_filled,
                    icon: 'icon fi-page-filled',
                    onclick: function() {
                        editor.insertContent("&nbsp;<i class='fi-page-filled'><!-- icon --></i>&nbsp;");
                    }
                },{
                    text: fp_foundation_assistant_localized_script.fi_page_multiple,
                    icon: 'icon fi-page-multiple',
                    onclick: function() {
                        editor.insertContent("&nbsp;<i class='fi-page-multiple'><!-- icon --></i>&nbsp;");
                    }
                },{
                    text: fp_foundation_assistant_localized_script.fi_page_pdf,
                    icon: 'icon fi-page-pdf',
                    onclick: function() {
                        editor.insertContent("&nbsp;<i class='fi-page-pdf'><!-- icon --></i>&nbsp;");
                    }
                },{
                    text: fp_foundation_assistant_localized_script.fi_page_remove,
                    icon: 'icon fi-page-remove',
                    onclick: function() {
                        editor.insertContent("&nbsp;<i class='fi-page-remove'><!-- icon --></i>&nbsp;");
                    }
                },{
                    text: fp_foundation_assistant_localized_script.fi_page_search,
                    icon: 'icon fi-page-search',
                    onclick: function() {
                        editor.insertContent("&nbsp;<i class='fi-page-search'><!-- icon --></i>&nbsp;");
                    }
                },{
                    text: fp_foundation_assistant_localized_script.fi_page,
                    icon: 'icon fi-page',
                    onclick: function() {
                        editor.insertContent("&nbsp;<i class='fi-page'><!-- icon --></i>&nbsp;");
                    }
                },{
                    text: fp_foundation_assistant_localized_script.fi_paint_bucket,
                    icon: 'icon fi-paint-bucket',
                    onclick: function() {
                        editor.insertContent("&nbsp;<i class='fi-paint-bucket'><!-- icon --></i>&nbsp;");
                    }
                },{
                    text: fp_foundation_assistant_localized_script.fi_paperclip,
                    icon: 'icon fi-paperclip',
                    onclick: function() {
                        editor.insertContent("&nbsp;<i class='fi-paperclip'><!-- icon --></i>&nbsp;");
                    }
                },{
                    text: fp_foundation_assistant_localized_script.fi_pause,
                    icon: 'icon fi-pause',
                    onclick: function() {
                        editor.insertContent("&nbsp;<i class='fi-pause'><!-- icon --></i>&nbsp;");
                    }
                },{
                    text: fp_foundation_assistant_localized_script.fi_paw,
                    icon: 'icon fi-paw',
                    onclick: function() {
                        editor.insertContent("&nbsp;<i class='fi-paw'><!-- icon --></i>&nbsp;");
                    }
                },{
                    text: fp_foundation_assistant_localized_script.fi_paypal,
                    icon: 'icon fi-paypal',
                    onclick: function() {
                        editor.insertContent("&nbsp;<i class='fi-paypal'><!-- icon --></i>&nbsp;");
                    }
                },{
                    text: fp_foundation_assistant_localized_script.fi_pencil,
                    icon: 'icon fi-pencil',
                    onclick: function() {
                        editor.insertContent("&nbsp;<i class='fi-pencil'><!-- icon --></i>&nbsp;");
                    }
                },{
                    text: fp_foundation_assistant_localized_script.fi_photo,
                    icon: 'icon fi-photo',
                    onclick: function() {
                        editor.insertContent("&nbsp;<i class='fi-photo'><!-- icon --></i>&nbsp;");
                    }
                },{
                    text: fp_foundation_assistant_localized_script.fi_play_circle,
                    icon: 'icon fi-play-circle',
                    onclick: function() {
                        editor.insertContent("&nbsp;<i class='fi-play-circle'><!-- icon --></i>&nbsp;");
                    }
                },{
                    text: fp_foundation_assistant_localized_script.fi_play_video,
                    icon: 'icon fi-play-video',
                    onclick: function() {
                        editor.insertContent("&nbsp;<i class='fi-play-video'><!-- icon --></i>&nbsp;");
                    }
                },{
                    text: fp_foundation_assistant_localized_script.fi_play,
                    icon: 'icon fi-play',
                    onclick: function() {
                        editor.insertContent("&nbsp;<i class='fi-play'><!-- icon --></i>&nbsp;");
                    }
                },{
                    text: fp_foundation_assistant_localized_script.fi_plus,
                    icon: 'icon fi-plus',
                    onclick: function() {
                        editor.insertContent("&nbsp;<i class='fi-plus'><!-- icon --></i>&nbsp;");
                    }
                },{
                    text: fp_foundation_assistant_localized_script.fi_pound,
                    icon: 'icon fi-pound',
                    onclick: function() {
                        editor.insertContent("&nbsp;<i class='fi-pound'><!-- icon --></i>&nbsp;");
                    }
                },{
                    text: fp_foundation_assistant_localized_script.fi_power,
                    icon: 'icon fi-power',
                    onclick: function() {
                        editor.insertContent("&nbsp;<i class='fi-power'><!-- icon --></i>&nbsp;");
                    }
                },{
                    text: fp_foundation_assistant_localized_script.fi_previous,
                    icon: 'icon fi-previous',
                    onclick: function() {
                        editor.insertContent("&nbsp;<i class='fi-previous'><!-- icon --></i>&nbsp;");
                    }
                },{
                    text: fp_foundation_assistant_localized_script.fi_price_tag,
                    icon: 'icon fi-price-tag',
                    onclick: function() {
                        editor.insertContent("&nbsp;<i class='fi-price-tag'><!-- icon --></i>&nbsp;");
                    }
                },{
                    text: fp_foundation_assistant_localized_script.fi_pricetag_multiple,
                    icon: 'icon fi-pricetag-multiple',
                    onclick: function() {
                        editor.insertContent("&nbsp;<i class='fi-pricetag-multiple'><!-- icon --></i>&nbsp;");
                    }
                },{
                    text: fp_foundation_assistant_localized_script.fi_print,
                    icon: 'icon fi-print',
                    onclick: function() {
                        editor.insertContent("&nbsp;<i class='fi-print'><!-- icon --></i>&nbsp;");
                    }
                },{
                    text: fp_foundation_assistant_localized_script.fi_prohibited,
                    icon: 'icon fi-prohibited',
                    onclick: function() {
                        editor.insertContent("&nbsp;<i class='fi-prohibited'><!-- icon --></i>&nbsp;");
                    }
                },{
                    text: fp_foundation_assistant_localized_script.fi_projection_screen,
                    icon: 'icon fi-projection-screen',
                    onclick: function() {
                        editor.insertContent("&nbsp;<i class='fi-projection-screen'><!-- icon --></i>&nbsp;");
                    }
                },{
                    text: fp_foundation_assistant_localized_script.fi_puzzle,
                    icon: 'icon fi-puzzle',
                    onclick: function() {
                        editor.insertContent("&nbsp;<i class='fi-puzzle'><!-- icon --></i>&nbsp;");
                    }
                },{
                    text: fp_foundation_assistant_localized_script.fi_record,
                    icon: 'icon fi-record',
                    onclick: function() {
                        editor.insertContent("&nbsp;<i class='fi-record'><!-- icon --></i>&nbsp;");
                    }
                },{
                    text: fp_foundation_assistant_localized_script.fi_refresh,
                    icon: 'icon fi-refresh',
                    onclick: function() {
                        editor.insertContent("&nbsp;<i class='fi-refresh'><!-- icon --></i>&nbsp;");
                    }
                },{
                    text: fp_foundation_assistant_localized_script.fi_results_demo,
                    icon: 'icon fi-results-demographics',
                    onclick: function() {
                        editor.insertContent("&nbsp;<i class='fi-results-demographics'><!-- icon --></i>&nbsp;");
                    }
                },{
                    text: fp_foundation_assistant_localized_script.fi_results,
                    icon: 'icon fi-results',
                    onclick: function() {
                        editor.insertContent("&nbsp;<i class='fi-results'><!-- icon --></i>&nbsp;");
                    }
                },{
                    text: fp_foundation_assistant_localized_script.fi_rewind_ten,
                    icon: 'icon fi-rewind-ten',
                    onclick: function() {
                        editor.insertContent("&nbsp;<i class='fi-rewind-ten'><!-- icon --></i>&nbsp;");
                    }
                },{
                    text: fp_foundation_assistant_localized_script.fi_rewind,
                    icon: 'icon fi-rewind',
                    onclick: function() {
                        editor.insertContent("&nbsp;<i class='fi-rewind'><!-- icon --></i>&nbsp;");
                    }
                },{
                    text: fp_foundation_assistant_localized_script.fi_rss,
                    icon: 'icon fi-rss',
                    onclick: function() {
                        editor.insertContent("&nbsp;<i class='fi-rss'><!-- icon --></i>&nbsp;");
                    }
                },{
                    text: fp_foundation_assistant_localized_script.fi_safety_cone,
                    icon: 'icon fi-safety-cone',
                    onclick: function() {
                        editor.insertContent("&nbsp;<i class='fi-safety-cone'><!-- icon --></i>&nbsp;");
                    }
                },{
                    text: fp_foundation_assistant_localized_script.fi_save,
                    icon: 'icon fi-save',
                    onclick: function() {
                        editor.insertContent("&nbsp;<i class='fi-save'><!-- icon --></i>&nbsp;");
                    }
                },{
                    text: fp_foundation_assistant_localized_script.fi_share,
                    icon: 'icon fi-share',
                    onclick: function() {
                        editor.insertContent("&nbsp;<i class='fi-share'><!-- icon --></i>&nbsp;");
                    }
                },{
                    text: fp_foundation_assistant_localized_script.fi_sheriff_badge,
                    icon: 'icon fi-sheriff-badge',
                    onclick: function() {
                        editor.insertContent("&nbsp;<i class='fi-sheriff-badge'><!-- icon --></i>&nbsp;");
                    }
                },{
                    text: fp_foundation_assistant_localized_script.fi_shield,
                    icon: 'icon fi-shield',
                    onclick: function() {
                        editor.insertContent("&nbsp;<i class='fi-shield'><!-- icon --></i>&nbsp;");
                    }
                },{
                    text: fp_foundation_assistant_localized_script.fi_shopping_bag,
                    icon: 'icon fi-shopping-bag',
                    onclick: function() {
                        editor.insertContent("&nbsp;<i class='fi-shopping-bag'><!-- icon --></i>&nbsp;");
                    }
                },{
                    text: fp_foundation_assistant_localized_script.fi_shopping_cart,
                    icon: 'icon fi-shopping-cart',
                    onclick: function() {
                        editor.insertContent("&nbsp;<i class='fi-shopping-cart'><!-- icon --></i>&nbsp;");
                    }
                },{
                    text: fp_foundation_assistant_localized_script.fi_shuffle,
                    icon: 'icon fi-shuffle',
                    onclick: function() {
                        editor.insertContent("&nbsp;<i class='fi-shuffle'><!-- icon --></i>&nbsp;");
                    }
                },{
                    text: fp_foundation_assistant_localized_script.fi_skull,
                    icon: 'icon fi-skull',
                    onclick: function() {
                        editor.insertContent("&nbsp;<i class='fi-skull'><!-- icon --></i>&nbsp;");
                    }
                },{
                    text: fp_foundation_assistant_localized_script.fi_social_500px,
                    icon: 'icon fi-social-500px',
                    onclick: function() {
                        editor.insertContent("&nbsp;<i class='fi-social-500px'><!-- icon --></i>&nbsp;");
                    }
                },{
                    text: fp_foundation_assistant_localized_script.fi_social_adobe,
                    icon: 'icon fi-social-adobe',
                    onclick: function() {
                        editor.insertContent("&nbsp;<i class='fi-social-adobe'><!-- icon --></i>&nbsp;");
                    }
                },{
                    text: fp_foundation_assistant_localized_script.fi_social_amazon,
                    icon: 'icon fi-social-amazon',
                    onclick: function() {
                        editor.insertContent("&nbsp;<i class='fi-social-amazon'><!-- icon --></i>&nbsp;");
                    }
                },{
                    text: fp_foundation_assistant_localized_script.fi_social_android,
                    icon: 'icon fi-social-android',
                    onclick: function() {
                        editor.insertContent("&nbsp;<i class='fi-social-android'><!-- icon --></i>&nbsp;");
                    }
                },{
                    text: fp_foundation_assistant_localized_script.fi_social_apple,
                    icon: 'icon fi-social-apple',
                    onclick: function() {
                        editor.insertContent("&nbsp;<i class='fi-social-apple'><!-- icon --></i>&nbsp;");
                    }
                },{
                    text: fp_foundation_assistant_localized_script.fi_social_behance,
                    icon: 'icon fi-social-behance',
                    onclick: function() {
                        editor.insertContent("&nbsp;<i class='fi-social-behance'><!-- icon --></i>&nbsp;");
                    }
                },{
                    text: fp_foundation_assistant_localized_script.fi_social_bing,
                    icon: 'icon fi-social-bing',
                    onclick: function() {
                        editor.insertContent("&nbsp;<i class='fi-social-bing'><!-- icon --></i>&nbsp;");
                    }
                },{
                    text: fp_foundation_assistant_localized_script.fi_social_blogger,
                    icon: 'icon fi-social-blogger',
                    onclick: function() {
                        editor.insertContent("&nbsp;<i class='fi-social-blogger'><!-- icon --></i>&nbsp;");
                    }
                },{
                    text: fp_foundation_assistant_localized_script.fi_social_delicious,
                    icon: 'icon fi-social-delicious',
                    onclick: function() {
                        editor.insertContent("&nbsp;<i class='fi-social-delicious'><!-- icon --></i>&nbsp;");
                    }
                },{
                    text: fp_foundation_assistant_localized_script.fi_social_designer,
                    icon: 'icon fi-social-designer-news',
                    onclick: function() {
                        editor.insertContent("&nbsp;<i class='fi-social-designer-news'><!-- icon --></i>&nbsp;");
                    }
                },{
                    text: fp_foundation_assistant_localized_script.fi_social_deviant_art,
                    icon: 'icon fi-social-deviant-art',
                    onclick: function() {
                        editor.insertContent("&nbsp;<i class='fi-social-deviant-art'><!-- icon --></i>&nbsp;");
                    }
                },{
                    text: fp_foundation_assistant_localized_script.fi_social_digg,
                    icon: 'icon fi-social-digg',
                    onclick: function() {
                        editor.insertContent("&nbsp;<i class='fi-social-digg'><!-- icon --></i>&nbsp;");
                    }
                },{
                    text: fp_foundation_assistant_localized_script.fi_social_dribbble,
                    icon: 'icon fi-social-dribbble',
                    onclick: function() {
                        editor.insertContent("&nbsp;<i class='fi-social-dribbble'><!-- icon --></i>&nbsp;");
                    }
                },{
                    text: fp_foundation_assistant_localized_script.fi_social_drive,
                    icon: 'icon fi-social-drive',
                    onclick: function() {
                        editor.insertContent("&nbsp;<i class='fi-social-drive'><!-- icon --></i>&nbsp;");
                    }
                },{
                    text: fp_foundation_assistant_localized_script.fi_social_dropbox,
                    icon: 'icon fi-social-dropbox',
                    onclick: function() {
                        editor.insertContent("&nbsp;<i class='fi-social-dropbox'><!-- icon --></i>&nbsp;");
                    }
                },{
                    text: fp_foundation_assistant_localized_script.fi_social_evernote,
                    icon: 'icon fi-social-evernote',
                    onclick: function() {
                        editor.insertContent("&nbsp;<i class='fi-social-evernote'><!-- icon --></i>&nbsp;");
                    }
                },{
                    text: fp_foundation_assistant_localized_script.fi_social_facebook,
                    icon: 'icon fi-social-facebook',
                    onclick: function() {
                        editor.insertContent("&nbsp;<i class='fi-social-facebook'><!-- icon --></i>&nbsp;");
                    }
                },{
                    text: fp_foundation_assistant_localized_script.fi_social_flickr,
                    icon: 'icon fi-social-flickr',
                    onclick: function() {
                        editor.insertContent("&nbsp;<i class='fi-social-flickr'><!-- icon --></i>&nbsp;");
                    }
                },{
                    text: fp_foundation_assistant_localized_script.fi_social_forrst,
                    icon: 'icon fi-social-forrst',
                    onclick: function() {
                        editor.insertContent("&nbsp;<i class='fi-social-forrst'><!-- icon --></i>&nbsp;");
                    }
                },{
                    text: fp_foundation_assistant_localized_script.fi_social_foursquare,
                    icon: 'icon fi-social-foursquare',
                    onclick: function() {
                        editor.insertContent("&nbsp;<i class='fi-social-foursquare'><!-- icon --></i>&nbsp;");
                    }
                },{
                    text: fp_foundation_assistant_localized_script.fi_social_game_center,
                    icon: 'icon fi-social-game-center',
                    onclick: function() {
                        editor.insertContent("&nbsp;<i class='fi-social-game-center'><!-- icon --></i>&nbsp;");
                    }
                },{
                    text: fp_foundation_assistant_localized_script.fi_social_github,
                    icon: 'icon fi-social-github',
                    onclick: function() {
                        editor.insertContent("&nbsp;<i class='fi-social-github'><!-- icon --></i>&nbsp;");
                    }
                },{
                    text: fp_foundation_assistant_localized_script.fi_social_google_plus,
                    icon: 'icon fi-social-google-plus',
                    onclick: function() {
                        editor.insertContent("&nbsp;<i class='fi-social-google-plus'><!-- icon --></i>&nbsp;");
                    }
                },{
                    text: fp_foundation_assistant_localized_script.fi_social_hacker_news,
                    icon: 'icon fi-social-hacker-news',
                    onclick: function() {
                        editor.insertContent("&nbsp;<i class='fi-social-hacker-news'><!-- icon --></i>&nbsp;");
                    }
                },{
                    text: fp_foundation_assistant_localized_script.fi_social_hi5,
                    icon: 'icon fi-social-hi5',
                    onclick: function() {
                        editor.insertContent("&nbsp;<i class='fi-social-hi5'><!-- icon --></i>&nbsp;");
                    }
                },{
                    text: fp_foundation_assistant_localized_script.fi_social_instagram,
                    icon: 'icon fi-social-instagram',
                    onclick: function() {
                        editor.insertContent("&nbsp;<i class='fi-social-instagram'><!-- icon --></i>&nbsp;");
                    }
                },{
                    text: fp_foundation_assistant_localized_script.fi_social_joomla,
                    icon: 'icon fi-social-joomla',
                    onclick: function() {
                        editor.insertContent("&nbsp;<i class='fi-social-joomla'><!-- icon --></i>&nbsp;");
                    }
                },{
                    text: fp_foundation_assistant_localized_script.fi_social_lastfm,
                    icon: 'icon fi-social-lastfm',
                    onclick: function() {
                        editor.insertContent("&nbsp;<i class='fi-social-lastfm'><!-- icon --></i>&nbsp;");
                    }
                },{
                    text: fp_foundation_assistant_localized_script.fi_social_linkedin,
                    icon: 'icon fi-social-linkedin',
                    onclick: function() {
                        editor.insertContent("&nbsp;<i class='fi-social-linkedin'><!-- icon --></i>&nbsp;");
                    }
                },{
                    text: fp_foundation_assistant_localized_script.fi_social_medium,
                    icon: 'icon fi-social-medium',
                    onclick: function() {
                        editor.insertContent("&nbsp;<i class='fi-social-medium'><!-- icon --></i>&nbsp;");
                    }
                },{
                    text: fp_foundation_assistant_localized_script.fi_social_myspace,
                    icon: 'icon fi-social-myspace',
                    onclick: function() {
                        editor.insertContent("&nbsp;<i class='fi-social-myspace'><!-- icon --></i>&nbsp;");
                    }
                },{
                    text: fp_foundation_assistant_localized_script.fi_social_orkut,
                    icon: 'icon fi-social-orkut',
                    onclick: function() {
                        editor.insertContent("&nbsp;<i class='fi-social-orkut'><!-- icon --></i>&nbsp;");
                    }
                },{
                    text: fp_foundation_assistant_localized_script.fi_social_path,
                    icon: 'icon fi-social-path',
                    onclick: function() {
                        editor.insertContent("&nbsp;<i class='fi-social-path'><!-- icon --></i>&nbsp;");
                    }
                },{
                    text: fp_foundation_assistant_localized_script.fi_social_picasa,
                    icon: 'icon fi-social-picasa',
                    onclick: function() {
                        editor.insertContent("&nbsp;<i class='fi-social-picasa'><!-- icon --></i>&nbsp;");
                    }
                },{
                    text: fp_foundation_assistant_localized_script.fi_social_pinterest,
                    icon: 'icon fi-social-pinterest',
                    onclick: function() {
                        editor.insertContent("&nbsp;<i class='fi-social-pinterest'><!-- icon --></i>&nbsp;");
                    }
                },{
                    text: fp_foundation_assistant_localized_script.fi_social_rdio,
                    icon: 'icon fi-social-rdio',
                    onclick: function() {
                        editor.insertContent("&nbsp;<i class='fi-social-rdio'><!-- icon --></i>&nbsp;");
                    }
                },{
                    text: fp_foundation_assistant_localized_script.fi_social_reddit,
                    icon: 'icon fi-social-reddit',
                    onclick: function() {
                        editor.insertContent("&nbsp;<i class='fi-social-reddit'><!-- icon --></i>&nbsp;");
                    }
                },{
                    text: fp_foundation_assistant_localized_script.fi_social_skillshare,
                    icon: 'icon fi-social-skillshare',
                    onclick: function() {
                        editor.insertContent("&nbsp;<i class='fi-social-skillshare'><!-- icon --></i>&nbsp;");
                    }
                },{
                    text: fp_foundation_assistant_localized_script.fi_social_skype,
                    icon: 'icon fi-social-skype',
                    onclick: function() {
                        editor.insertContent("&nbsp;<i class='fi-social-skype'><!-- icon --></i>&nbsp;");
                    }
                },{
                    text: fp_foundation_assistant_localized_script.fi_social_smashing,
                    icon: 'icon fi-social-smashing-mag',
                    onclick: function() {
                        editor.insertContent("&nbsp;<i class='fi-social-smashing-mag'><!-- icon --></i>&nbsp;");
                    }
                },{
                    text: fp_foundation_assistant_localized_script.fi_social_snapchat,
                    icon: 'icon fi-social-snapchat',
                    onclick: function() {
                        editor.insertContent("&nbsp;<i class='fi-social-snapchat'><!-- icon --></i>&nbsp;");
                    }
                },{
                    text: fp_foundation_assistant_localized_script.fi_social_spotify,
                    icon: 'icon fi-social-spotify',
                    onclick: function() {
                        editor.insertContent("&nbsp;<i class='fi-social-spotify'><!-- icon --></i>&nbsp;");
                    }
                },{
                    text: fp_foundation_assistant_localized_script.fi_social_squidoo,
                    icon: 'icon fi-social-squidoo',
                    onclick: function() {
                        editor.insertContent("&nbsp;<i class='fi-social-squidoo'><!-- icon --></i>&nbsp;");
                    }
                },{
                    text: fp_foundation_assistant_localized_script.fi_social_stack_over,
                    icon: 'icon fi-social-stack-overflow',
                    onclick: function() {
                        editor.insertContent("&nbsp;<i class='fi-social-stack-overflow'><!-- icon --></i>&nbsp;");
                    }
                },{
                    text: fp_foundation_assistant_localized_script.fi_social_steam,
                    icon: 'icon fi-social-steam',
                    onclick: function() {
                        editor.insertContent("&nbsp;<i class='fi-social-steam'><!-- icon --></i>&nbsp;");
                    }
                },{
                    text: fp_foundation_assistant_localized_script.fi_social_stumbleupon,
                    icon: 'icon fi-social-stumbleupon',
                    onclick: function() {
                        editor.insertContent("&nbsp;<i class='fi-social-stumbleupon'><!-- icon --></i>&nbsp;");
                    }
                },{
                    text: fp_foundation_assistant_localized_script.fi_social_treehouse,
                    icon: 'icon fi-social-treehouse',
                    onclick: function() {
                        editor.insertContent("&nbsp;<i class='fi-social-treehouse'><!-- icon --></i>&nbsp;");
                    }
                },{
                    text: fp_foundation_assistant_localized_script.fi_social_tumblr,
                    icon: 'icon fi-social-tumblr',
                    onclick: function() {
                        editor.insertContent("&nbsp;<i class='fi-social-tumblr'><!-- icon --></i>&nbsp;");
                    }
                },{
                    text: fp_foundation_assistant_localized_script.fi_social_twitter,
                    icon: 'icon fi-social-twitter',
                    onclick: function() {
                        editor.insertContent("&nbsp;<i class='fi-social-twitter'><!-- icon --></i>&nbsp;");
                    }
                },{
                    text: fp_foundation_assistant_localized_script.fi_social_vimeo,
                    icon: 'icon fi-social-vimeo',
                    onclick: function() {
                        editor.insertContent("&nbsp;<i class='fi-social-vimeo'><!-- icon --></i>&nbsp;");
                    }
                },{
                    text: fp_foundation_assistant_localized_script.fi_social_windows,
                    icon: 'icon fi-social-windows',
                    onclick: function() {
                        editor.insertContent("&nbsp;<i class='fi-social-windows'><!-- icon --></i>&nbsp;");
                    }
                },{
                    text: fp_foundation_assistant_localized_script.fi_social_xbox,
                    icon: 'icon fi-social-xbox',
                    onclick: function() {
                        editor.insertContent("&nbsp;<i class='fi-social-xbox'><!-- icon --></i>&nbsp;");
                    }
                },{
                    text: fp_foundation_assistant_localized_script.fi_social_yahoo,
                    icon: 'icon fi-social-yahoo',
                    onclick: function() {
                        editor.insertContent("&nbsp;<i class='fi-social-yahoo'><!-- icon --></i>&nbsp;");
                    }
                },{
                    text: fp_foundation_assistant_localized_script.fi_social_yelp,
                    icon: 'icon fi-social-yelp',
                    onclick: function() {
                        editor.insertContent("&nbsp;<i class='fi-social-yelp'><!-- icon --></i>&nbsp;");
                    }
                },{
                    text: fp_foundation_assistant_localized_script.fi_social_youtube,
                    icon: 'icon fi-social-youtube',
                    onclick: function() {
                        editor.insertContent("&nbsp;<i class='fi-social-youtube'><!-- icon --></i>&nbsp;");
                    }
                },{
                    text: fp_foundation_assistant_localized_script.fi_social_zerply,
                    icon: 'icon fi-social-zerply',
                    onclick: function() {
                        editor.insertContent("&nbsp;<i class='fi-social-zerply'><!-- icon --></i>&nbsp;");
                    }
                },{
                    text: fp_foundation_assistant_localized_script.fi_social_zurb,
                    icon: 'icon fi-social-zurb',
                    onclick: function() {
                        editor.insertContent("&nbsp;<i class='fi-social-zurb'><!-- icon --></i>&nbsp;");
                    }
                },{
                    text: fp_foundation_assistant_localized_script.fi_sound,
                    icon: 'icon fi-sound',
                    onclick: function() {
                        editor.insertContent("&nbsp;<i class='fi-sound'><!-- icon --></i>&nbsp;");
                    }
                },{
                    text: fp_foundation_assistant_localized_script.fi_star,
                    icon: 'icon fi-star',
                    onclick: function() {
                        editor.insertContent("&nbsp;<i class='fi-star'><!-- icon --></i>&nbsp;");
                    }
                },{
                    text: fp_foundation_assistant_localized_script.fi_stop,
                    icon: 'icon fi-stop',
                    onclick: function() {
                        editor.insertContent("&nbsp;<i class='fi-stop'><!-- icon --></i>&nbsp;");
                    }
                },{
                    text: fp_foundation_assistant_localized_script.fi_strikethrough,
                    icon: 'icon fi-strikethrough',
                    onclick: function() {
                        editor.insertContent("&nbsp;<i class='fi-strikethrough'><!-- icon --></i>&nbsp;");
                    }
                },{
                    text: fp_foundation_assistant_localized_script.fi_subscript,
                    icon: 'icon fi-subscript',
                    onclick: function() {
                        editor.insertContent("&nbsp;<i class='fi-subscript'><!-- icon --></i>&nbsp;");
                    }
                },{
                    text: fp_foundation_assistant_localized_script.fi_superscript,
                    icon: 'icon fi-superscript',
                    onclick: function() {
                        editor.insertContent("&nbsp;<i class='fi-superscript'><!-- icon --></i>&nbsp;");
                    }
                },{
                    text: fp_foundation_assistant_localized_script.fi_tablet_landscape,
                    icon: 'icon fi-tablet-landscape',
                    onclick: function() {
                        editor.insertContent("&nbsp;<i class='fi-tablet-landscape'><!-- icon --></i>&nbsp;");
                    }
                },{
                    text: fp_foundation_assistant_localized_script.fi_tablet_portrait,
                    icon: 'icon fi-tablet-portrait',
                    onclick: function() {
                        editor.insertContent("&nbsp;<i class='fi-tablet-portrait'><!-- icon --></i>&nbsp;");
                    }
                },{
                    text: fp_foundation_assistant_localized_script.fi_target_two,
                    icon: 'icon fi-target-two',
                    onclick: function() {
                        editor.insertContent("&nbsp;<i class='fi-target-two'><!-- icon --></i>&nbsp;");
                    }
                },{
                    text: fp_foundation_assistant_localized_script.fi_target,
                    icon: 'icon fi-target',
                    onclick: function() {
                        editor.insertContent("&nbsp;<i class='fi-target'><!-- icon --></i>&nbsp;");
                    }
                },{
                    text: fp_foundation_assistant_localized_script.fi_telephone_access,
                    icon: 'icon fi-telephone-accessible',
                    onclick: function() {
                        editor.insertContent("&nbsp;<i class='fi-telephone-accessible'><!-- icon --></i>&nbsp;");
                    }
                },{
                    text: fp_foundation_assistant_localized_script.fi_telephone,
                    icon: 'icon fi-telephone',
                    onclick: function() {
                        editor.insertContent("&nbsp;<i class='fi-telephone'><!-- icon --></i>&nbsp;");
                    }
                },{
                    text: fp_foundation_assistant_localized_script.fi_text_color,
                    icon: 'icon fi-text-color',
                    onclick: function() {
                        editor.insertContent("&nbsp;<i class='fi-text-color'><!-- icon --></i>&nbsp;");
                    }
                },{
                    text: fp_foundation_assistant_localized_script.fi_thumbnails,
                    icon: 'icon fi-thumbnails',
                    onclick: function() {
                        editor.insertContent("&nbsp;<i class='fi-thumbnails'><!-- icon --></i>&nbsp;");
                    }
                },{
                    text: fp_foundation_assistant_localized_script.fi_ticket,
                    icon: 'icon fi-ticket',
                    onclick: function() {
                        editor.insertContent("&nbsp;<i class='fi-ticket'><!-- icon --></i>&nbsp;");
                    }
                },{
                    text: fp_foundation_assistant_localized_script.fi_torso_business,
                    icon: 'icon fi-torso-business',
                    onclick: function() {
                        editor.insertContent("&nbsp;<i class='fi-torso-business'><!-- icon --></i>&nbsp;");
                    }
                },{
                    text: fp_foundation_assistant_localized_script.fi_torso_female,
                    icon: 'icon fi-torso-female',
                    onclick: function() {
                        editor.insertContent("&nbsp;<i class='fi-torso-female'><!-- icon --></i>&nbsp;");
                    }
                },{
                    text: fp_foundation_assistant_localized_script.fi_torso,
                    icon: 'icon fi-torso',
                    onclick: function() {
                        editor.insertContent("&nbsp;<i class='fi-torso'><!-- icon --></i>&nbsp;");
                    }
                },{
                    text: fp_foundation_assistant_localized_script.fi_torsos_all_female,
                    icon: 'icon fi-torsos-all-female',
                    onclick: function() {
                        editor.insertContent("&nbsp;<i class='fi-torsos-all-female'><!-- icon --></i>&nbsp;");
                    }
                },{
                    text: fp_foundation_assistant_localized_script.fi_torsos_all,
                    icon: 'icon fi-torsos-all',
                    onclick: function() {
                        editor.insertContent("&nbsp;<i class='fi-torsos-all'><!-- icon --></i>&nbsp;");
                    }
                },{
                    text: fp_foundation_assistant_localized_script.fi_torsos_female_male,
                    icon: 'icon fi-torsos-female-male',
                    onclick: function() {
                        editor.insertContent("&nbsp;<i class='fi-torsos-female-male'><!-- icon --></i>&nbsp;");
                    }
                },{
                    text: fp_foundation_assistant_localized_script.fi_torsos_male_female,
                    icon: 'icon fi-torsos-male-female',
                    onclick: function() {
                        editor.insertContent("&nbsp;<i class='fi-torsos-male-female'><!-- icon --></i>&nbsp;");
                    }
                },{
                    text: fp_foundation_assistant_localized_script.fi_torsos,
                    icon: 'icon fi-torsos',
                    onclick: function() {
                        editor.insertContent("&nbsp;<i class='fi-torsos'><!-- icon --></i>&nbsp;");
                    }
                },{
                    text: fp_foundation_assistant_localized_script.fi_trash,
                    icon: 'icon fi-trash',
                    onclick: function() {
                        editor.insertContent("&nbsp;<i class='fi-trash'><!-- icon --></i>&nbsp;");
                    }
                },{
                    text: fp_foundation_assistant_localized_script.fi_trees,
                    icon: 'icon fi-trees',
                    onclick: function() {
                        editor.insertContent("&nbsp;<i class='fi-trees'><!-- icon --></i>&nbsp;");
                    }
                },{
                    text: fp_foundation_assistant_localized_script.fi_trophy,
                    icon: 'icon fi-trophy',
                    onclick: function() {
                        editor.insertContent("&nbsp;<i class='fi-trophy'><!-- icon --></i>&nbsp;");
                    }
                },{
                    text: fp_foundation_assistant_localized_script.fi_underline,
                    icon: 'icon fi-underline',
                    onclick: function() {
                        editor.insertContent("&nbsp;<i class='fi-underline'><!-- icon --></i>&nbsp;");
                    }
                },{
                    text: fp_foundation_assistant_localized_script.fi_universal_access,
                    icon: 'icon fi-universal-access',
                    onclick: function() {
                        editor.insertContent("&nbsp;<i class='fi-universal-access'><!-- icon --></i>&nbsp;");
                    }
                },{
                    text: fp_foundation_assistant_localized_script.fi_unlink,
                    icon: 'icon fi-unlink',
                    onclick: function() {
                        editor.insertContent("&nbsp;<i class='fi-unlink'><!-- icon --></i>&nbsp;");
                    }
                },{
                    text: fp_foundation_assistant_localized_script.fi_unlock,
                    icon: 'icon fi-unlock',
                    onclick: function() {
                        editor.insertContent("&nbsp;<i class='fi-unlock'><!-- icon --></i>&nbsp;");
                    }
                },{
                    text: fp_foundation_assistant_localized_script.fi_upload_cloud,
                    icon: 'icon fi-upload-cloud',
                    onclick: function() {
                        editor.insertContent("&nbsp;<i class='fi-upload-cloud'><!-- icon --></i>&nbsp;");
                    }
                },{
                    text: fp_foundation_assistant_localized_script.fi_upload,
                    icon: 'icon fi-upload',
                    onclick: function() {
                        editor.insertContent("&nbsp;<i class='fi-upload'><!-- icon --></i>&nbsp;");
                    }
                },{
                    text: fp_foundation_assistant_localized_script.fi_usb,
                    icon: 'icon fi-usb',
                    onclick: function() {
                        editor.insertContent("&nbsp;<i class='fi-usb'><!-- icon --></i>&nbsp;");
                    }
                },{
                    text: fp_foundation_assistant_localized_script.fi_video,
                    icon: 'icon fi-video',
                    onclick: function() {
                        editor.insertContent("&nbsp;<i class='fi-video'><!-- icon --></i>&nbsp;");
                    }
                },{
                    text: fp_foundation_assistant_localized_script.fi_volume_none,
                    icon: 'icon fi-volume-none',
                    onclick: function() {
                        editor.insertContent("&nbsp;<i class='fi-volume-none'><!-- icon --></i>&nbsp;");
                    }
                },{
                    text: fp_foundation_assistant_localized_script.fi_volume_strike,
                    icon: 'icon fi-volume-strike',
                    onclick: function() {
                        editor.insertContent("&nbsp;<i class='fi-volume-strike'><!-- icon --></i>&nbsp;");
                    }
                },{
                    text: fp_foundation_assistant_localized_script.fi_volume,
                    icon: 'icon fi-volume',
                    onclick: function() {
                        editor.insertContent("&nbsp;<i class='fi-volume'><!-- icon --></i>&nbsp;");
                    }
                },{
                    text: fp_foundation_assistant_localized_script.fi_web,
                    icon: 'icon fi-web',
                    onclick: function() {
                        editor.insertContent("&nbsp;<i class='fi-web'><!-- icon --></i>&nbsp;");
                    }
                },{
                    text: fp_foundation_assistant_localized_script.fi_wheelchair,
                    icon: 'icon fi-wheelchair',
                    onclick: function() {
                        editor.insertContent("&nbsp;<i class='fi-wheelchair'><!-- icon --></i>&nbsp;");
                    }
                },{
                    text: fp_foundation_assistant_localized_script.fi_widget,
                    icon: 'icon fi-widget',
                    onclick: function() {
                        editor.insertContent("&nbsp;<i class='fi-widget'><!-- icon --></i>&nbsp;");
                    }
                },{
                    text: fp_foundation_assistant_localized_script.fi_wrench,
                    icon: 'icon fi-wrench',
                    onclick: function() {
                        editor.insertContent("&nbsp;<i class='fi-wrench'><!-- icon --></i>&nbsp;");
                    }
                },{
                    text: fp_foundation_assistant_localized_script.fi_x_circle,
                    icon: 'icon fi-x-circle',
                    onclick: function() {
                        editor.insertContent("&nbsp;<i class='fi-x-circle'><!-- icon --></i>&nbsp;");
                    }
                },{
                    text: fp_foundation_assistant_localized_script.fi_x,
                    icon: 'icon fi-x',
                    onclick: function() {
                        editor.insertContent("&nbsp;<i class='fi-x'><!-- icon --></i>&nbsp;");
                    }
                },{
                    text: fp_foundation_assistant_localized_script.fi_yen,
                    icon: 'icon fi-yen',
                    onclick: function() {
                        editor.insertContent("&nbsp;<i class='fi-yen'><!-- icon --></i>&nbsp;");
                    }
                },{
                    text: fp_foundation_assistant_localized_script.fi_zoom_in,
                    icon: 'icon fi-zoom-in',
                    onclick: function() {
                        editor.insertContent("&nbsp;<i class='fi-zoom-in'><!-- icon --></i>&nbsp;");
                    }
                },{
                    text: fp_foundation_assistant_localized_script.fi_zoom_out,
                    icon: 'icon fi-zoom-out',
                    onclick: function() {
                        editor.insertContent("&nbsp;<i class='fi-zoom-out'><!-- icon --></i>&nbsp;");
                    }
                },

           ]
        });
    });
})();   