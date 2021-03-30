const index = async (req, res) => {
    res.render('index', { title: 'tree', userCard: req.session.userCard, loggedIn: true})
}


module.exports = {
    index
}
