module.exports = app => {
    app.post('/signup', app.api.users.save)
    app.post('/signin', app.api.auth.signin)
}