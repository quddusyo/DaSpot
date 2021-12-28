const { spotSchema, reviewSchema } = require('./schemas');
const ExpressError = require('./utils/ExpressError');
const Spot = require('./models/spot');
const Review = require('./models/review');

// validating user login middleware
module.exports.isLoggedIn = (req, res, next) => {
    if(!req.isAuthenticated()){
        //store the url they are requesting
        req.session.returnTo = req.originalUrl
        req.flash('error', 'You must be signed in!');
        return res.redirect('/login');
    }
    next();
}

// validating new spot middleware
module.exports.validateSpot = (req, res, next) => {
    const { error } = spotSchema.validate(req.body);
    if (error){
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400)
    } else {
        next();
    }
}

// validating spot author middleware
module.exports.isAuthor = async(req, res, next) => {
    const { id } = req.params;
    const spot = await Spot.findById(id);
    if (!spot.author.equals(req.user._id)) {
        req.flash('error', 'You do not have permission to do that!');
        return res.redirect(`/spots/${id}`);
    }
    next();
}

// validating review author middleware
module.exports.isReviewAuthor = async(req, res, next) => {
    const { id, reviewId } = req.params;
    const review = await Review.findById(reviewId);
    if (!review.author.equals(req.user._id)) {
        req.flash('error', 'You do not have permission to do that!');
        return res.redirect(`/spots/${id}`);
    }
    next();
}

// validating review middleware
module.exports.validateReview = (req, res, next) => {
    const { error } = reviewSchema.validate(req.body);
    if (error){
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400)
    } else {
        next();
    }
}