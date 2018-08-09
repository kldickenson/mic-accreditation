<table class="form-table">
    <tr valign="top">
        <th scope="row">M-Authentication:</th>
        <td>
            <input type="radio" id="umich_mauth_options--mauth-1" name="umich_mauth_options[mauth]" value="1"<?=($mauthOptions['mauth'] == 1 ? ' checked="checked"' : null);?> />
            <label for="umich_mauth_options--mauth-1">Enabled</label>

            <input type="radio" id="umich_mauth_options--mauth-2" name="umich_mauth_options[mauth]" value="0"<?=($mauthOptions['mauth'] == 0 ? ' checked="checked"' : null);?> />
            <label for="umich_mauth_options--mauth-2">Disabled</label>

            <br/>
            Enables/Disabled U-M: M-Authentication plugin.
        </td>
    </tr>
    <tr valign="top">
        <th scope="row">Wordpress Authentication:</th>
        <td>
            <input type="radio" id="umich_mauth_options--wpauth-1" name="umich_mauth_options[wpauth]" value="1"<?=($mauthOptions['wpauth'] == 1 ? ' checked="checked"' : null);?> />
            <label for="umich_mauth_options--wpauth-1">Yes</label>

            <input type="radio" id="umich_mauth_options--wpauth-2" name="umich_mauth_options[wpauth]" value="0"<?=($mauthOptions['wpauth'] == 0 ? ' checked="checked"' : null);?> />
            <label for="umich_mauth_options--wpauth-2">No</label>

            <br/>
            If M-Authentication fails, use wordpress local account authentication.  Allows local user/password creation and usage.
        </td>
    </tr>
    <tr valign="top">
        <th scope="row">Auto-Create Wordpress Accounts:</th>
        <td>
            <input type="radio" id="umich_mauth_options--autocreate-1" name="umich_mauth_options[autocreate]" value="1"<?=($mauthOptions['autocreate'] == 1 ? ' checked="checked"' : null);?> />
            <label for="umich_mauth_options--autocreate-1">Yes</label>

            <input type="radio" id="umich_mauth_options--autocreate-2" name="umich_mauth_options[autocreate]" value="0"<?=($mauthOptions['autocreate'] == 0 ? ' checked="checked"' : null);?> />
            <label for="umich_mauth_options--autocreate-2">No</label>

            <br/>
            Create wordpress account if one does not exist already.
        </td>
    </tr>
</table>
