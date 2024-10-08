import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Paper from "@mui/material/Paper";
import axios from "axios";
import { useEffect, useState } from "react";
import Draggable from "react-draggable";
import ContentDialogBody from "../ContentDialogBody/ContentDialogBody";
import ContentDialogFooter from "../ContentDialogFooter/ContentDialogFooter";
import DialogTitleComp from "../ContentDialogTitle/ContentDialogTitle";
import moment from "moment";

function PaperComponent(props) {
  return (
    <Draggable
      handle="#draggable-dialog-title"
      cancel={'[class*="MuiDialogContent-root"]'}
    >
      <Paper {...props} />
    </Draggable>
  );
}

const ContentDialog = (props) => {
  const { open, handleClose, id, media_type, openYoutubeVideo, contents, openProduct } = props;
  const [content, setContent] = useState(contents);

  // useEffect(() => {
  //   const fetchContentData = async () => {
  //     const { data } = await axios.get(
  //       `https://api.themoviedb.org/3/${media_type}/${id}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
  //     );
  //     setContent(data);
  //     // console.log(data);
  //   };

  //   fetchContentData();
  // }, [media_type, id]);
  console.log(content, 111)

  return (
    <div>
      <Dialog
      
        open={open}
        onClose={handleClose}
        PaperComponent={PaperComponent}
        aria-labelledby="draggable-dialog-title"
        component="span"
      >
        <DialogTitle id="draggable-dialog-title" component="span">
          {content && (
            <DialogTitleComp
              contentName={content.name || content.title}
              date={content.first_air_date || moment(content.release_date).format("DD-MM-Y") || "-----"}
              vote_average={content.ratings}
            />
          )}
        </DialogTitle>
        <DialogContent>
          <DialogContentText component="span">
            {content && (
              <ContentDialogBody
                // tagline={content.tagline || "no tagline was given"}
                content={content}
                poster={content.photo}
                contentName={content.name || content.title}
                description={content.movie_details || "no description was given"}
                actor_name={content.actor_name}
              />
            )}
          </DialogContentText>
        </DialogContent>
        <DialogActions
          component="span"
          sx={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "row",
          }}
        >
          {content && (
            <ContentDialogFooter
              openYoutubeVideo={openYoutubeVideo}
              openProduct={openProduct}
              handleClose={handleClose}
              openContentHomepage={content.homepage}
              media_type={media_type}
            />
          )}
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ContentDialog;
