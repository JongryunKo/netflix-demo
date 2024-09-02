import { useQuery } from "@tanstack/react-query";
import api from "../utils/api"

const fetchUpcomingrMovies=()=>{
    return api.get(`/movie/upcoming`)
}

export const useUpcomingMoviesQuery = () => {
    return useQuery({
        queryKey: ['movie-upcoming'],
        queryFn: fetchUpcomingrMovies,
        select:(result) =>result.data
    })
}