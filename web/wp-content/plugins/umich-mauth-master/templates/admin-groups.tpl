<h3>Group Permissions</h3>
<p>Use the following to automatically set a users permissions based on group membership in mcommunity.  If a users is a member of multiple groups defined then it will give them the highest level of access permitted.</p>

<table class="widefat" style="width: auto;">
    <tr>
        <th>Active</th>
        <th>Group Name</th>
        <th>Wordpress Role</th>
        <th>Auto-Create User</th>
    </tr>
    <? $rows = count( $mauthGroups ) + 1; ?>
    <? for( $i = 0; $i < $rows; $i++ ): ?>
    <? $group = array_merge(
        array(
            'active'     => 0,
            'group'      => null,
            'role'       => '',
            'autocreate' => ''
        ),
        isset( $mauthGroups[ $i ] ) ? $mauthGroups[ $i ] : array()
    );?>
    <tr>
        <td>
            <input type="hidden" name="umich_mauth_groups[<?=$i;?>][active]" value="0" />
            <input type="checkbox" name="umich_mauth_groups[<?=$i;?>][active]" value="1"<?=( $group['active'] ? ' checked="checked"' : null);?> />
        </td>
        <td>
            <input type="text" name="umich_mauth_groups[<?=$i;?>][group]" value="<?=$group['group'];?>" placeholder="MCommunity Group Name" class="regular-text" />
        </td>
        <td>
            <select name="umich_mauth_groups[<?=$i;?>][role]">
                <? foreach( $roles as $key => $role ): ?>
                <option value="<?=$key;?>"<?=($group['role'] == $key ? ' selected="selected"' : null);?>><?=$role;?></option>
                <? endforeach;?>
            </select>
        </td>
        <td>
            <input type="radio" id="umich_mauth--<?=$i;?>--autocreate-1" name="umich_mauth_groups[<?=$i;?>][autocreate]" value="1"<?=( $group['autocreate'] === 1 ? ' checked="checked"' : null);?> />
            <label for="umich_mauth--autocreate-1">Yes</label>

            <input type="radio" id="umich_mauth--<?=$i;?>--autocreate-0" name="umich_mauth_groups[<?=$i;?>][autocreate]" value="0"<?=( $group['autocreate'] === 0 ? ' checked="checked"' : null);?> />
            <label for="umich_mauth--autocreate-2">No</label>
        </td>
    </tr>
    <? endfor; ?>
</table>
<p><em>To delete a row just delete the group name text for that row.</em></p>
