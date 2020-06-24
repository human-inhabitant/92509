<!DOCTYPE html>

<html lang="en">
  <head>
    <meta charset="utf-8">
    <link rel="stylesheet" href="../assets/css/cookbook.css">
    <link rel="stylesheet" href="../assets/css/forms.css">
    <link rel="stylesheet" href="../assets/css/rotators.css">
    <link rel="stylesheet" href="../assets/css/tables.css">
    <title></title>
  </head>
  <body>
    <div id="wrapper">
      <div id="branding">
        <h1>Learning jQuery</h1>
      </div>
      <div id="container">
        <div id="content">
          <h2>Search Results</h2>
          <p>Search results for: <?php print $_GET['search-text']; ?></p>
            <ul>
            <li>Lorem ipsum dolor</li>
            <li>Lorem ipsum dolor</li>
            <li>Lorem ipsum dolor</li>
            <li>Lorem ipsum dolor</li>
            <li>Lorem ipsum dolor</li>
            <li>Lorem ipsum dolor</li>
            <li>Lorem ipsum dolor</li>
          </ul>
          </div> <!-- end content -->
      </div> <!-- end container -->
      <div id="primary-nav">
        <ul>
          <li><a href="../authors/">Authors</a></li>
          <li><a href="../books/">Books</a></li>
          <li><a href="../news/">News</a></li>
          <li><a href="../contact/">Contact</a></li>
        </ul>
      </div>
      <div id="secondary-nav">
        <h3><a href="../cart/">Your Cart</a></h3>
        <ul>
          <li>Lorem ipsum dolor</li>
          <li>Lorem ipsum dolor</li>
          <li>Lorem ipsum dolor</li>
          <li>Lorem ipsum dolor</li>
          <li>Lorem ipsum dolor</li>
          <li>Lorem ipsum dolor</li>
          <li>Lorem ipsum dolor</li>
        </ul>
      </div>
      <div id="sidebar">
        <h2>Sidebar</h2>
        <form id="search" action="../search/index.php" method="get" accept-charset="utf-8">
          <label for="search-text">search the site</label>
          <input type="text" name="search-text" id="search-text" />
        </form>
        <p>
          Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Nam adipiscing, risus quis fringilla venenatis, diam
          nisi adipiscing magna, sit amet rutrum risus nunc sit amet odio. Praesent ullamcorper. Donec sit amet ipsum.
          Nam consequat rhoncus lacus. Pellentesque libero erat, elementum a, mattis in, molestie id, magna. Integer sed
          libero vitae lacus elementum egestas. Nullam massa magna, gravida sed, porta vel, ultricies at, purus. Maecenas
          turpis. Vivamus ante risus, eleifend sed, scelerisque at, lacinia vitae, nunc. Vestibulum ut arcu. Cras ut magna.
          Pellentesque eleifend commodo est. Sed vitae odio eget ipsum tristique hendrerit. Cras elementum turpis ut sapien.
          Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Ut sed erat at velit
          bibendum varius. Sed venenatis sagittis lectus. Cras ligula felis, ultrices et, imperdiet et, laoreet sed, odio.
          Morbi nunc tellus, hendrerit in, aliquet eget, rutrum a, magna. Nunc nunc.
        </p>
      </div> <!-- end sidebar -->
      <div id="footer">
        This is the footer.
      </div>
    </div> <!-- end wrapper -->

    <script src="../../../assets/js/jquery-1.3.2.min.js"></script>
    <script src="../assets/js/cookbook.js"></script>
    <script src="../assets/js/forms.js"></script>
    <script src="../assets/js/rotators.js"></script>
    <script src="../assets/js/tables.js"></script>
  </body>
</html>