var
  express = require('express'),
  app = express(),
  Poet = require('poet');

var poet = Poet(app, {
  posts: './_posts/',
  postsPerPage: 5,
  metaFormat: 'json'
});

poet.init().then(function () {
  // initialized
});

app.set('view engine', 'jade');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));
app.use(app.router);
app.use( notFoundFn );

app.get('/', function (req, res) { 
  res.render('index');
});

app.get('/about', function (req, res) {
  res.render('about', {
    title: 'About'
  });
});


app.get('/contact', function (req, res) {
  res.render('contact', {
    title: 'Contact'
  });
});


app.get('/blog', function (req, res) {
  res.render('blog', {
    title: 'Blog'
  });
});

function notFoundFn ( req, res ) {
  if ( req.accepts( 'html' )) {
    res.status( 404 );
    res.render( '404', { url: req.url });
    return;
  }
}

var port = process.env.PORT || 8080;
app.listen(port, function() {
  console.log("Listening on " + port);
});
