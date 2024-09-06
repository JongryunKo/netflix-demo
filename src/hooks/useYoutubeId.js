import { useQuery } from "@tanstack/react-query";
import api from "../utils/api"

const fetchYoutubeId=({id})=>{
    return api.get(`/movie/${id}?append_to_response=videos`)
}

export const useYoutubeIdQuery = ({id}) => {
    return useQuery({
        queryKey: ['movie-youtubeid'],
        queryFn: ()=>fetchYoutubeId({id}),
        select:(result) =>result.data.videos.results[0]
    })
}