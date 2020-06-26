<?php
if ($_POST['op'] == 'Save') {
  // Code here would save the new shipping address back to the database, or to the session variables.
  $name = $_POST['first-name'] .' '. $_POST['last-name'];
  print('<p id="shipping-name"><a href="edit-shipping.html">'. $name .'</a></p>');
}
else {
  $shipping = array();
  $shipping['first-name'] = 'Ford';
  $shipping['last-name'] = 'Prefect';
  $shipping['address'] = '52 Rodeo Drive';
  $shipping['city'] = 'Beverly Hills';
  $shipping['state'] = 'CA';
  $shipping['zip'] = '90210';
  $shipping['message'] = 'Enjoy these great books! You\'ll love the cliff-hangers!';
  ?>
    <form action="shipping.php" method="post" accept-charset="utf-8">
      <ol>
        <li><label for="first-name">First name:</label><input type="text" name="first-name" value="<?php print $shipping['first-name']; ?>" id="first-name" /></li>
        <li><label for="last-name">Last name:</label><input type="text" name="last-name" value="<?php print $shipping['last-name']; ?>" id="last-name" /></li>
        <li><label for="address">Address:</label><input type="text" name="address" value="<?php print $shipping['address']; ?>" id="address" /></li>
        <li><label for="city">City:</label><input type="text" name="city" value="<?php print $shipping['city']; ?>" id="city" /></li>
        <li><label for="state">State:</label><input type="text" name="state" value="<?php print $shipping['state']; ?>" id="state" /></li>
        <li><label for="zip">ZIP:</label><input type="text" name="zip" value="<?php print $shipping['zip']; ?>" id="zip" /></li>
        <li><label for="message">Gift message:</label><textarea name="message" id="message"><?php print $shipping['message']; ?></textarea></li>
      </ol>
      <input type="submit" name="op" value="Save" />
    </form>
  <?php
}
