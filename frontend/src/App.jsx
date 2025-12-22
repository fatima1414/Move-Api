import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Api from "./Api";
import ImageList from "./ImageList";
import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
  const { register, handleSubmit, reset } = useForm();
  const [movieList, setMovieList] = useState([]);
  const [editId, setEditId] = useState("");

  useEffect(() => { fetchMovies(); }, []);

  const fetchMovies = async () => {
    const res = await Api.get("/movie");
    setMovieList(res.data.records);
  };

  const Add = async (data) => {
    const formData = new FormData();

    Object.keys(data).forEach((key) => {
      if (key !== "movie_image") formData.append(key, data[key]);
    });

    for (let img of data.movie_image || []) {
      formData.append("movie_image", img);
    }

    editId
      ? await Api.patch(`/movie?id=${editId}`, formData)
      : await Api.post("/movie", formData);

    reset();
    setEditId("");
    fetchMovies();
  };

  const editMovie = (m) => {
    setEditId(m._id);
    reset(m);
  };

  const deleteMovie = async (id) => {
    await Api.delete(`/movie/${id}`);
    fetchMovies();
  };

  return (
    <div className="container my-5">
      <form onSubmit={handleSubmit(Add)} className="card p-4 shadow">
        <input {...register("category")} placeholder="Category" className="form-control mb-2"/>
        <input {...register("title")} placeholder="Title" className="form-control mb-2"/>
        <input {...register("director")} placeholder="Director" className="form-control mb-2"/>
        <input {...register("language")} placeholder="Language" className="form-control mb-2"/>
        <input {...register("releaseYear")} type="number" placeholder="Release Year" className="form-control mb-2"/>
        <input {...register("rating")} type="number" step="0.1" placeholder="Rating" className="form-control mb-2"/>
        <textarea {...register("description")} placeholder="Description" className="form-control mb-2"/>
        <input type="file" {...register("movie_image")} multiple className="form-control mb-3"/>

        <button className="btn btn-success">
          {editId ? "Update Movie" : "Add Movie"}
        </button>
      </form>

      <table className="table mt-5">
        <thead>
          <tr>
            <th>Title</th>
            <th>Director</th>
            <th>Rating</th>
            <th>Images</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {movieList.map((m) => (
            <tr key={m._id}>
              <td>{m.title}</td>
              <td>{m.director}</td>
              <td>{m.rating}</td>
              <ImageList images={m.movie_image} />
              <td>
                <button onClick={() => editMovie(m)} className="btn btn-warning btn-sm me-2">Edit</button>
                <button onClick={() => deleteMovie(m._id)} className="btn btn-danger btn-sm">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default App;
