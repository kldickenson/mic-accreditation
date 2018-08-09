<div class="wrap">
    <h2>Add Local User</h2>
    <form method="post" action="">
        <? wp_nonce_field( 'umich-mauth', 'umich_mauth_adduser_nonce' ); ?>
        <input type="hidden" name="createaction" value="local" />

        <table class="form-table">
            <tr valign="top">
                <th scope="row"><label for="user_login">Username</label></th>
                <td><input type="text" id="user_login" name="user_login" value="<?=$default['user_login'];?>" placeholder="Enter users username" class="regular-text" /></td>
            </tr>
            <tr valign="top">
                <th scope="row"><label for="email">Email</label></th>
                <td><input type="text" id="email" name="email" value="<?=$default['email'];?>" placeholder="Enter users email" class="regular-text" /></td>
            </tr>
            <tr valign="top">
                <th scope="row"><label for="first_name">First Name</label></th>
                <td><input type="text" id="first_name" name="first_name" value="<?=$default['first_name'];?>" placeholder="Enter users first name" class="regular-text" /></td>
            </tr>
            <tr valign="top">
                <th scope="row"><label for="last_name">Last Name</label></th>
                <td><input type="text" id="last_name" name="last_name" value="<?=$default['last_name'];?>" placeholder="Enter users last name" class="regular-text" /></td>
            </tr>
            <? if( !is_network_admin() ): ?>
            <tr valign="top">
                <th scope="row"><label for="role">Role</label></th>
                <td>
                    <select id="role" name="role">
                        <? global $wp_roles; ?>
                        <? foreach( $wp_roles->role_names as $role => $name ): ?>
                        <option value="<?=$role;?>"<?=( $role == $default['role'] ? ' selected="selected"' : null);?>><?=$name;?></option>
                        <? endforeach; ?>
                    </select>
                </td>
            </tr>
            <? endif; ?>
            <tr valign="top">
                <th scope="row">Skip Confirmation Email</th>
                <td>
                    <input type="checkbox" name="noconfirmation" id="noconfirmation" value="1" <?=($default['noconfirm'] ? 'checked="checked"' : null);?>>
                    <label for="noconfirmation">Add the user without sending an email that requires their confirmation.</label>
                </td>
            </tr>
        </table>

        <? submit_button( 'Add User' ); ?>
    </form>
</div>
