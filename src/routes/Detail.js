import { getMouseEventOptions } from "@testing-library/user-event/dist/utils";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";


function Detail() {
    const [loading, setLoading] = useState(true);
    const [movie, setMovie] = useState([]);
    const { id } = useParams();
    const getMovie = async () => {
        const json = await (
            await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)
        ).json();
        setMovie(json.data.movie)
        console.log(movie);
    };
    useEffect(() => {
        getMovie();
    }, []);
    return (<div>

        <nav>
            <ul>
                <li>
                    <Link to={`/`}>{`Home`}</Link>
                </li>
            </ul>
        </nav>
        <h1>Detail</h1>
        <p>{movie.id}</p>
    </div>)
}
export default Detail;

//로딩설정 
//무비 정보 가져오기
//네비바 만들어서 홈이나 about 페이지 같은거 넣기 메뉴에