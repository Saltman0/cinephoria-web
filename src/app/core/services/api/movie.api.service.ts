import {Injectable} from "@angular/core";
import {Router} from "@angular/router";
import {GetMoviesGql} from "../../graphql/get-movies.gql";
import {GetMoviesSettingsGql} from "../../graphql/get-movies-settings.gql";
import {MovieFactory} from "../../factories/movie.factory";
import {CategoryModel} from "../../models/category.model";
import {MovieModel} from "../../models/movie.model";
import {ShowtimeModel} from "../../models/showtime.model";
import {environment} from "../../../../environments/environment";

@Injectable({
    providedIn: 'root'
})
export class MovieApiService {
    constructor(
        private readonly router: Router,
        private readonly getMoviesGQL: GetMoviesGql,
        private readonly getMoviesSettingsGQL: GetMoviesSettingsGql,
        private readonly movieFactory: MovieFactory
    ) {}

    public async getCategories(): Promise<CategoryModel[]> {
        const response: Response = await fetch(environment.MOVIE_API_URL + `category`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });

        if (!response.ok) {
            throw new Error(response.status.toString());
        }

        return response.json();
    }

    public async getMovies(): Promise<MovieModel[]> {
        const response: Response = await fetch(environment.MOVIE_API_URL + `movie`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });

        if (!response.ok) {
            throw new Error(response.status.toString());
        }

        return response.json();
    }

    public async getMoviesGql(
        categoryId: number|null,
        startDate: Date|null,
        endDate: Date|null,
        cinemaId: number|null
    ): Promise<MovieModel[]> {
        let movies: MovieModel[] = [];

        let result = await this.getMoviesGQL.watch(
            {categoryId: categoryId, startDate: startDate?.toString(), endDate: endDate?.toString(), cinemaId: cinemaId}
        ).result();

        result.data.movies.forEach((movie: MovieModel): void => {

            const showtimes: ShowtimeModel[] = movie.showtimes.filter(
                (showtime: ShowtimeModel): boolean => showtime.hall !== null
            );

            if (showtimes.length > 0) {
                movies.push(
                    this.movieFactory.create(
                        movie.id,
                        movie.favorite,
                        movie.title,
                        movie.description,
                        movie.imageURL,
                        movie.minimumAge,
                        showtimes,
                        movie.ratings,
                        movie.category
                    )
                );
            }

        });

        return movies;
    }

    /**
     * Return the last movies from the cinema
     * @param limit
     */
    public async getLastMovies(limit: number): Promise<MovieModel[]> {
        const response: Response = await fetch(environment.MOVIE_API_URL + `movie/last-movies?limit=${encodeURIComponent(limit)}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });

        if (!response.ok) {
            throw new Error(response.status.toString());
        }

        return response.json();
    }

    /**
     * Return the favorite movies from the cinema
     * @param limit
     */
    public async getFavoriteMovies(limit: number): Promise<MovieModel[]> {
        const response: Response = await fetch(environment.MOVIE_API_URL + `movie/favorite-movies?limit=${encodeURIComponent(limit)}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });

        if (!response.ok) {
            throw new Error(response.status.toString());
        }

        return response.json();
    }

    public async getMoviesWithShowtimes(): Promise<MovieModel[]> {
        let moviesWithShowtimes: MovieModel[] = [];

        let result = await this.getMoviesSettingsGQL.watch(
            {},
            {fetchPolicy: "no-cache"}
        ).result();

        result.data.movies.forEach((movie: MovieModel): void => {

            moviesWithShowtimes.push(
                this.movieFactory.create(movie.id,
                    movie.favorite,
                    movie.title,
                    movie.description,
                    movie.imageURL,
                    movie.minimumAge,
                    movie.showtimes,
                    movie.ratings,
                    movie.category
                )
            );

        });

        return moviesWithShowtimes;
    }

    public async createMovie(
        token: string,
        title: string,
        description: string,
        minimumAge: number | null,
        favorite: boolean,
        imageURL: string,
        categoryId: number
    ): Promise<any> {
        const response: Response = await fetch(environment.MOVIE_API_URL + "movie", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({
                "title": title,
                "description": description,
                "minimumAge": minimumAge,
                "favorite": favorite,
                "imageURL": imageURL,
                "categoryId": categoryId
            })
        });

        if (!response.ok) {
            if (response.status === 401) {
                this.router.navigate(['/login']);
            }
            throw new Error(response.status.toString());
        }

        return response.json();
    }

    public async updateMovie(
        token: string,
        movieId: number,
        title: string,
        description: string,
        minimumAge: number | null,
        favorite: boolean,
        imageURL: string,
        categoryId: number
    ): Promise<any> {
        const response: Response = await fetch(environment.MOVIE_API_URL + `movie/${encodeURIComponent(movieId)}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({
                "title": title,
                "description": description,
                "minimumAge": minimumAge,
                "favorite": favorite,
                "imageURL": imageURL,
                "categoryId": categoryId
            })
        });

        if (!response.ok) {
            throw new Error(response.status.toString());
        }

        return response.json();
    }

    public async deleteMovie(token: string, movieId: number) {
        const response: Response = await fetch(environment.MOVIE_API_URL + `movie/${encodeURIComponent(movieId)}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        });

        if (!response.ok) {
            throw new Error(response.status.toString());
        }

        return response.json();
    }

    public async createRating(
        token: string,
        number: number,
        description: string,
        validated: boolean,
        movieId: number,
        userId: number
    ): Promise<any> {
        const response: Response = await fetch(environment.MOVIE_API_URL + "rating", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({
                "number": number,
                "description": description,
                "validated": validated,
                "movieId": movieId,
                "userId": userId
            })
        });

        if (!response.ok) {
            if (response.status === 401) {
                this.router.navigate(['/login']);
            }
            throw new Error(response.status.toString());
        }

        return response.json();
    }
}