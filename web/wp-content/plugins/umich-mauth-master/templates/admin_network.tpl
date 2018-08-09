<div class="wrap">
    <h2>U-M: M-Authentication</h2>
    <form method="post" action="settings.php?page=<?=$_GET['page'];?>">
        <?php settings_errors(); ?>

        <? wp_nonce_field( 'umich-mauth', 'umich_mauth_nonce' ); ?>

        <? include __DIR__ . DIRECTORY_SEPARATOR .'admin-options.tpl'; ?>

        <? submit_button(); ?>
    </form>
</div>
