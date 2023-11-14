
const requireOption = require('../requireOption');
/**
 * Betölti egyetlen csokit id alapján.
 */
module.exports = function(objectrepository) {
    const CsokiModel = requireOption(objectrepository, 'CsokiModel');

    return function(req, res, next) {
        CsokiModel.findOne(
            {
                _id: req.params.csokiid
            },
            (err, csoki) => {
                if (err || !csoki) {
                    return next(err);
                }

                res.locals.csoki = csoki;
                return next();
            }
        );
    };
};