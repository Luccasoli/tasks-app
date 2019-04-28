module.exports = app => {
    app.post('/signup', app.api.users.save)
}