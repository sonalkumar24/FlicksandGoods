import Badge from "@mui/material/Badge";
import { useState } from "react";
import { unavailable } from "../../config/config";
import ContentDialog from "../ContentDialog/ContentDialog";
import YoutubeVideo from "../YoutubeVideo/YoutubeVideo";
import Product from "../Products/Products";
import Styles from "./SingleContent.module.css";
import { BaseURL } from "../../global";
import moment from "moment";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";

const SingleContent = (props) => {
  const { content } = props;
  const { _id, name, photo, video, release_date, ratings, media_type } = content
  const date = moment(release_date).format('D-M-Y')

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isYoutubeDialogOpen, setIsYoutubeDialogOpen] = useState(false);
  const [isProductDialogOpen, setIsProductDialogOpen] = useState(false);

  let nav = useNavigate()
  const ClickOpenDialog = () => {
    let token = localStorage.getItem('token')
    if (token) {

      setIsDialogOpen(true);
    }
    else {
      toast("Please Login to see more details")
      nav('/login')
    }
  };
  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };
  const handleYoutubeCloseDialog = () => {
    setIsYoutubeDialogOpen(false);
  };
  const handleProductCloseDialog = () => {
    setIsProductDialogOpen(false);
  };
  const openYoutubeVideo = () => {
    setIsDialogOpen(false);
    setIsYoutubeDialogOpen(true);
    // console.log(youtubeURL);
  };
  const openProduct = () => {
    setIsDialogOpen(false);
    setIsProductDialogOpen(true);
    // console.log(youtubeURL);
  };

  // useEffect(() => {
  //   const fetchContentVideo = async () => {
  //     const { data } = await axios.get(
  //       `https://api.themoviedb.org/3/${media_type}/${id}/videos?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
  //     );
  //     setYoutubeURL(data.results[0]?.key);
  //   };

  //   fetchContentVideo();
  // }, [media_type, id]);
  return (
    <>
      <div className={Styles.post} onClick={() => ClickOpenDialog()}>
        <Badge
          badgeContent={ratings}
          color={ratings > 7.5 ? "primary" : "warning"}
        ></Badge>
        <img
          className={Styles.image}
          style={{ height: "200px", width: "100%" }}
          src={photo ? `${BaseURL}/api/photo/${photo}` : unavailable}
          alt={name}
        />
        <b className={Styles.title}>{name}</b>
        <span className={Styles.typeAndDate}>
          {media_type === "TV Series" ? "TV Series" : "Movie"}
          <span className={Styles.typeAndDate}>{date}</span>
        </span>
      </div>
      <ContentDialog
        contents={content}
        open={isDialogOpen}
        handleClose={handleCloseDialog}
        id={_id}
        media_type={media_type}
        openYoutubeVideo={openYoutubeVideo}
        openProduct={openProduct}
      />
      {isYoutubeDialogOpen && (
        <YoutubeVideo
          open={isYoutubeDialogOpen}
          handleClose={handleYoutubeCloseDialog}
          youtubeURL={video}
        />
      )}
      {isProductDialogOpen && (
        <Product
          id={_id}
          open={isProductDialogOpen}
          handleClose={handleProductCloseDialog}
        />
      )}
    </>
  );
};

export default SingleContent;
