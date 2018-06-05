module.exports = function errors(err, req, resp, next) {
  console.log('----------');
    let {status = 500, message = 'Server Error'} = err;
    if (!err) {
        next();
    } else {
       return resp.status(status)
            .json({
                message
            })
    }
}
