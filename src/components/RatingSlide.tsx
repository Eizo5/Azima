import { RatingType } from "../data/types";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";

import "swiper/css";
import "swiper/swiper-bundle.css";

import "../Styles/rating.css";
import { formatDate, formatDateTwo } from "../data/helpers";
type RatingSlideProps = {
  rating: RatingType | null;
};

const RatingSlide = ({ rating }: RatingSlideProps) => {
  console.log(rating, "ratinginside");
  return (
    <div className="rating-slide">
      <div className="stars-image">
        <img src={rating?.profile_image} alt="stars" className="rating-image" />
        <Box
          sx={{
            "& > legend": { mt: 2 },
            "& .MuiRating-icon": {
              fontSize: "2.5rem",
              marginLeft: "0.5rem",
            },
          }}
        >
          <Rating name="read-only" value={rating?.star} readOnly />
        </Box>
      </div>
      <p>
        <span className="rating-username"> {rating?.username}</span>{" "}
        <span className="rating-date"> {formatDateTwo(rating?.rate_date)}</span>
      </p>
      <p className="user-comment">
        {" "}
        I'm commenting rn from this user machine hello world. I need to write
        more so im doing more writing. I'm commenting rn from this user machine
      </p>
    </div>
  );
};

export default RatingSlide;
