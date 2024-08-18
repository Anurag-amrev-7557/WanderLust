module.exports = (fn) => {
    return (err, req, res, next) => {
        fn(req, res, next).catch(next);
    };
};