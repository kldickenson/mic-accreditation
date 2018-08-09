<style type="text/css">
    #mauth-login-button {
        margin: 20px auto 0 auto;
        width: 320px;
        text-align: center;
    }
    #mauth-login-button .button {
        float: none;
        padding-left: 40px;
        background-color: #00274c;
        background-image: url(<?=plugins_url( 'assets/block-m-t.png', UMICHMAUTH_PATH. 'umich-mauth.php' );?>);
        background-repeat: no-repeat;
        background-position: left center;
        background-size: contain;
        border-color: #00274c;
        text-shadow: none;
        box-shadow: none;
    }
    #mauth-login-button .button:hover {
        background-color: #1e4b75;
    }
</style>
<div id="mauth-login-button">
    <a href="<?=$ssoAuthURL;?>" class="button button-primary button-large">Login with U-M Weblogin</a>
</div>
