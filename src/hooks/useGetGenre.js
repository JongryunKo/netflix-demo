import { useQuery } from "@tanstack/react-query";
import api from "../utils/api"

const fetchGetGenre=()=>{
    return api.get(`/genre/movie/list?language=ko`)
}

export const useGetGenreQuery = () => {
    return useQuery({
        queryKey: ['movie-genre'],
        queryFn: fetchGetGenre,
        select:(result) =>result.data.genres,
        staleTime:300000 //5분
    })
}