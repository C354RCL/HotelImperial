module.exports = (req, res, next) => {
    return res.status(400).send({code : 404, message : 'url not found'});
}