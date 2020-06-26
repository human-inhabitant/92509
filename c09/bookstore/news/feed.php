<?php
  header('Content-Type: text/xml');
  print $feed = file_get_contents('https://blog.jquery.com/feed/');