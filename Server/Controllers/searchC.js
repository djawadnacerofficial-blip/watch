import {searchMovies} from '../Services/tmdbService.js';
import { getPostBymovieM } from '../Models/postsM.js';
import { userBYname } from "../Models/usersM.js"

export async function search(req, res) {
    const {query} = req.query

    try {

        const moviesResualt = await searchMovies(query)

        const postsR = await getPostBymovieM(query)

        const usersR = await userBYname(query)


        const moviesR = moviesResualt.results.map(movie => ({
            id: movie.id,
            title: movie.title,
            poster: movie.poster_path,
            overview: movie.overview,
            rating: movie.vote_average,
            releaseDate: movie.release_date,
        }));


        res.status(200).json({moviesR, postsR, usersR})

    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Failed to fetch from TMDB' })

    }
}

// search using TMDB API: movies
// search in users: username? tags?
// search in popsts: tags?