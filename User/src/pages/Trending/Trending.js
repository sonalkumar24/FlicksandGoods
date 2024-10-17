import axios from "axios";
import { useState, useEffect } from "react";
import SingleContent from "../../components/SingleContent/SingleContent";
import Style from "./Trending.module.css";
import { BaseURL } from "../../global";
import { Chip } from "@mui/material";

const Trending = () => {
  const [contents, setContents] = useState([]);
  const [forFilter, setForFilter] = useState([]);
  const [genres, setGenres] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchTrending = async () => {
      await axios.get(`${BaseURL}/api/trailers/get/movies`)
        .then((res) => {
          console.log(res)
          setContents(res?.data?.trailers);
          setForFilter(res?.data?.trailers);
          setGenres(res?.data?.genres);
        })
        .catch((err) => {
          console.log(err)
        })
    };
    fetchTrending();
  }, [page]);

  const clickOnGenresArray = (fid) => {
    if (fid === "all") {
      setContents(forFilter)
    }
    else {
      let filter = forFilter.filter((item) => item?.genres_id?._id === fid)
      console.log(filter)
      setContents(filter)
    }
  }

  return (
    <div>
      <h1  className="pageHeading">Movies</h1>

      {/* <PageNumber setPage={setPage} pageNumber={page} numberOfPages={10} /> */}
      {/* <PageComponent /> */}

      <div className={Style.genres}>
        <Chip
          // key={genre.id}
          label={"All"}
          sx={{ background: "linear-gradient(45deg, #f29200 30%, #ffcc80 90%)",
            margin: "3px",
            color: "#ffffff",
            transition: "all 0.3s ease-in-out",
            '&:hover': {
              background: "linear-gradient(45deg, #ff8c00 30%, #ff5733 90%)", // Attractive gradient on hover
              color: "#ffffff",
              boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)", // Optional: adds a shadow effect
              transform: "scale(1.05)", // Optional: slightly scales up the chip
            }, }}
          clickable
          onClick={() => clickOnGenresArray("all")}
        />
        {genres.map((item) => (
          <Chip
            // key={genre.id}
            label={item.name}
            sx={{ background: "linear-gradient(45deg, #f29200 30%, #ffcc80 90%)",
              margin: "3px",
              color: "#ffffff",
              transition: "all 0.3s ease-in-out",
              '&:hover': {
                background: "linear-gradient(45deg, #ff8c00 30%, #ff5733 90%)", // Attractive gradient on hover
                color: "#ffffff",
                boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)", // Optional: adds a shadow effect
                transform: "scale(1.05)", // Optional: slightly scales up the chip
              },}}
            clickable
            onClick={() => clickOnGenresArray(item._id)}
          />
        ))}

      </div>

      <div className={Style.trending}>
        {contents.length > 0 ?
          contents.map((content) => (
            <SingleContent
              key={content?._id}
              content={content}
            />
          )) :
          <p style={{ marginTop: "100px" }}>No Trailers</p>}
      </div>
      {/* <PageNumber setPage={setPage} pageNumber={page} numberOfPages={10} /> */}
    </div>
  );
};

export default Trending;
