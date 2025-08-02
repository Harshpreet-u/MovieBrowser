import { useParams } from "react-router-dom";


export default function GenrePage() {
    // const {id} = useParams();
    // console.log("navigation id", id);
    // const { state } = useLocation(); 

    // const movie = state?.movie;
    // // console.log("movie object", movie);
    // const genreNames = state?.genreNames;
    // //console.log("genre name = ", genreMap);
    // // const genreNames = getGenreNames(movie.genre_ids, genreMap);
    // console.log(genreNames);
    // // const genreNamesArray = genreNames.split(",");
    // // console.log(genreNamesArray);

    // return(
    //     <div>
    //         <h1>  Movies of the genre {genreNames.join(", ")} will be displayed on this page</h1>
    //     </div>
    // )
    const { genreName } = useParams();
    //console.log(genreName); // This gives you only the clicked genre like "Fantasy"

  return (
    <h3>
      Movies of the {genreName} genre will be displayed on this page
    </h3>
  );
}