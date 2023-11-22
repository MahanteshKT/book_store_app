import { useContext, useState } from "react";

import { FaCheckSquare, FaSquare, FaSquareFull, FaStar } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { uiAction } from "../../store/ui-slice/ui-slice";
import { AddReviewApi } from "../../services/fetch-apis";
import Button from "../../components/UI/Button/Button";
import { reviewAction } from "../../store/review-slice/review-slice";

const colors = {
  orange: "#FFBA5A",
  grey: "#a9a9a9",
};

// Rating
// commentDescription
// user_id
// userName
// bookTitle
// book_id

function AddReview(props) {
  const [isRecommend, setisRecommend] = useState(false);
  const { user, token } = useSelector((state) => state.user);
  const [text, setText] = useState();
  const [currentValue, setCurrentValue] = useState(0);
  const [hoverValue, setHoverValue] = useState(undefined);
  const stars = Array(5).fill(0);
  const dispatch = useDispatch();

  const handleClick = (value) => {
    setCurrentValue(value);
  };

  const handleMouseOver = (newHoverValue) => {
    setHoverValue(newHoverValue);
  };

  const handleMouseLeave = () => {
    setHoverValue(undefined);
  };
  const onSubmitHandler = (e) => {
    e.preventDefault();
    console.log("adas", text, currentValue);
    const data = {
      Rating: currentValue,
      commentDescription: text,
      user_id: user._id,
      userName: `${user.firstName} ${user.lastName}`,
      bookTitle: props.bookTitle,
      book_id: props.id,
      recommend: isRecommend,
    };
    console.log(data);
    dispatch(uiAction.loadingHandler(true));

    AddReviewApi(token, props.id, data)
      .then((data) => {
        console.log(data.comment, "addreview api call");
        dispatch(reviewAction.AddRecentReview({ review: { ...data.comment } }));
        dispatch(
          uiAction.addMessage({
            title: "success",
            status: 200,
            message: "Thanks for Review",
          })
        );
      })
      .catch((err) => {
        dispatch(
          uiAction.addMessage({
            title: "error",
            status: err.status || 400,
            message: err.message,
          })
        );
      })
      .finally(() => {
        dispatch(uiAction.loadingHandler(false));
      });
  };

  return (
    <div style={styles.container}>
      <h2> Add Book Rating </h2>
      <div style={styles.stars}>
        {stars.map((_, index) => {
          return (
            <FaStar
              key={index}
              size={24}
              onClick={() => handleClick(index + 1)}
              onMouseOver={() => handleMouseOver(index + 1)}
              onMouseLeave={handleMouseLeave}
              color={
                (hoverValue || currentValue) > index
                  ? colors.orange
                  : colors.grey
              }
              style={{
                marginRight: 10,
                cursor: "pointer",
              }}
            />
          );
        })}
      </div>
      <textarea
        placeholder="What's your experience?"
        style={styles.textarea}
        value={text}
        onChange={(e) => {
          e.preventDefault();
          setText(e.target.value);
        }}
      />
      <Button
        onClick={(e) => {
          e.preventDefault();
          setisRecommend(!isRecommend);
        }}
        className={`w-[95%] md:w-1/2 mb-4 bg-orange-200 ${
          isRecommend
            ? "hover:bg-green-400"
            : "hover:bg-orange-200 hover:text-black"
        } `}
      >
        {!isRecommend ? (
          `Recommend`
        ) : (
          <span className="text-center flex flex-row justify-center items-center gap-4">
            <FaCheckSquare className="bg-green-400 text-2xl round-lg" />{" "}
            Recommended
          </span>
        )}
      </Button>

      <button onClick={onSubmitHandler} style={styles.button}>
        Submit
      </button>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  stars: {
    display: "flex",
    flexDirection: "row",
  },
  textarea: {
    border: "1px solid #a9a9a9",
    borderRadius: 5,
    padding: 10,
    margin: "20px 0",
    minHeight: 100,
    width: 300,
  },
  button: {
    border: "1px solid #a9a9a9",
    borderRadius: 5,
    width: 300,
    padding: 10,
  },
};

export default AddReview;
