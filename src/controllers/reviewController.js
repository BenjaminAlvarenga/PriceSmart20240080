const reviewController = {};

import reviewModel from "../models/reviews.js";

reviewController.getReviews = async (req, res) => {
  const reviews = await reviewModel.find();
  res.json(reviews);
};

reviewController.postReview = async (req, res) => {
  const { idEmployee, idProduct, rating, comment } = req.body;

  const newReview = reviewModel({
    idEmployee,
    idProduct,
    rating,
    comment,
  });

  await newReview.save();

  res.json({ message: "Review saved" });
};

reviewController.putReview = async (req, res) => {
  const { idEmployee, idProduct, rating, comment } = req.body;

  await reviewModel.findByIdAndUpdate(req.params.id, {
    idEmployee,
    idProduct,
    rating,
    comment,
  },{
    new: true
  });

  res.json({message:"Review updated"})
};

reviewController.deleteReview = async (req, res) => {
  await reviewModel.findByIdAndDelete(req.params.id);
  res.json({ message: "Review deleted" });
};

export default reviewController;