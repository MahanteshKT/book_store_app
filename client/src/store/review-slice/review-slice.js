import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  reviews: null,
  totalReviews: null,
  AverageRating: null,
  totalStarRating: null,
  recomended: {
    totalRecomend: 0,
    percentage: 0,
  },
  ratingList: [
    {
      rating: 0,
      percentage: 0,
    },
    {
      rating: 1,
      percentage: 0,
    },
    {
      rating: 2,
      percentage: 0,
    },
    {
      rating: 3,
      percentage: 0,
    },
    {
      rating: 4,
      percentage: 0,
    },
    {
      rating: 5,
      percentage: 0,
    },
  ],
};

const reviewSlice = createSlice({
  name: "reviewSlice",
  initialState,
  reducers: {
    setReviews: (state, action) => {
      state.reviews = action.payload;
      let AverageRating = 0;
      let totalStarRating = 0;
      let recomended = 0;
      let recomendedPer = 0;
      let rateArray = [0, 0, 0, 0, 0, 0];
      state.reviews.forEach((each) => {
        let singleAverage = +each.Rating / state.reviews.length;
        AverageRating = AverageRating + singleAverage;
        totalStarRating = totalStarRating + Number(each.Rating);
        if (each.recommend) {
          recomended += 1;
        }
        rateArray[+each.Rating] += 1;
      });
      console.log(rateArray);
      rateArray.forEach((each, index) => {
        state.ratingList[+index].percentage = Math.floor(
          (+each / state.reviews.length) * 100
        );
      });

      console.log(state.ratingList[2]);
      recomendedPer = ((recomended / state.reviews.length) * 100).toFixed(1);

      state.AverageRating = Number(AverageRating).toFixed(1);
      state.totalReviews = Number(state.reviews.length);
      state.totalStarRating = Number(totalStarRating);
      state.recomended = {
        totalRecomend: recomended,
        percentage: recomendedPer,
      };
    },
    removeAllReviews: (state) => {
      state = { ...initialState };
    },
    AddRecentReview: (state, action) => {
      console.log(action.payload.review);
      state.reviews.unshift({ ...action.payload.review });
      let AverageRating = 0;
      let totalStarRating = 0;
      let recomended = 0;
      let recomendedPer = 0;
      let rateArray = [0, 0, 0, 0, 0, 0];
      state.reviews.forEach((each) => {
        let singleAverage = +each.Rating / state.reviews.length;
        AverageRating = AverageRating + singleAverage;
        totalStarRating = totalStarRating + Number(each.Rating);
        if (each.recommend) {
          recomended += 1;
        }
        rateArray[+each.Rating] += 1;
      });
      console.log(rateArray);
      rateArray.forEach((each, index) => {
        state.ratingList[+index].percentage = Math.floor(
          (+each / state.reviews.length) * 100
        );
      });

      console.log(state.ratingList[2]);
      recomendedPer = ((recomended / state.reviews.length) * 100).toFixed(1);
      state.totalReviews = Number(state.reviews.length);
      state.totalStarRating = Number(totalStarRating);
      state.recomended = {
        totalRecomend: recomended,
        percentage: recomendedPer,
      };
    },
  },
});

export let reviewAction = reviewSlice.actions;
export default reviewSlice.reducer;
