module.exports = function(app) {
    // Redirecting any request to the index
    app.get('*', (request, response, next) => {
        if (request.url !== '/') {
            response.redirect('/');
        }

        next();
    });

    // Serving the home page
    app.get('/', (request, response) => {
        response.render('index');
    });
}
