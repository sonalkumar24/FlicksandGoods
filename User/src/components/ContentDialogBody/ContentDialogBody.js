import React, { useEffect, useState } from "react";
import { img_500, unavailableLandscape } from "../../config/config";
import { BaseURL } from "../../global";
import Styles from "./ContentDialogBody.module.css";
import axios from "axios";

const ContentDialogBody = (props) => {
  const { tagline, poster, contentName, description, content,actor_name } = props;
  const [reviews, setReviews] = useState([]);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await axios.get(`${BaseURL}/review/get/${content._id}`);
        setReviews(res?.data?.reviews || []);
      } catch (err) {
        console.log(err);
      }
    };
    fetchReviews();
  }, [content._id]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) {
      console.log("User is not authenticated");
      return;
    }

    try {
      const res = await axios.post(
        `${BaseURL}/review/insert/${content._id}`,
        { message: newComment },
        { headers: { "auth-token": token } }
      );
      setReviews([res.data.review, ...reviews]);
      setNewComment("");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <div className={Styles.tagline}>{tagline && <i>{tagline}</i>}</div>
      <div>
        <img
        style={{height:"400px",width:"100%"}}
          className={Styles.poster_image}
          src={poster ? `${BaseURL}/photo/${poster}` : unavailableLandscape}
          alt={contentName}
        />
        <div className={Styles.description}>
          <span>{description}</span>
        </div><br/>

        <div className={Styles.actor_name}>
          <span> <b>Stars:</b> {actor_name}</span>
        </div>

        <div className={Styles.commentSection}>
          <h3>Reviews</h3>
          <form onSubmit={handleCommentSubmit}>
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Add a review"
              rows="4"
              className={Styles.commentInput}
            ></textarea>
            <button type="submit" className={Styles.commentButton}>
              Submit
            </button>
          </form>
          <div className={Styles.commentsList}>
            {reviews.map((review, index) => (
              <div key={index} className={Styles.comment}>
                <div className={Styles.commentUser}>
                  @{review?.user_id?.name}
                </div>
                {review.message}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentDialogBody;
