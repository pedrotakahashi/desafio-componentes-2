import { useEffect, useState } from "react";
import { IContentProps } from "../Interfaces/IContentProps";
import { IGenreResponseProps } from "../Interfaces/IGenreResponseProps";
import { IMovieProps } from "../Interfaces/IMovieProps";
import { ISideBarProps } from "../Interfaces/ISideBarProps";
import { api } from "../services/api";
import { Button } from "./Button";


export function SideBar({selectedGenreId, handleClickButton}: ISideBarProps) {
  const [genres, setGenres] = useState<IGenreResponseProps[]>([]);
  
  
  useEffect(() => {
    api.get<IGenreResponseProps[]>('genres').then(response => {
      setGenres(response.data);
    });
  }, []);

  return(
    <>
      <nav className="sidebar">
      <span>Watch<p>Me</p></span>
      <div className="buttons-container">
        {genres.map(genre => (
          <Button
            key={String(genre.id)}
            title={genre.title}
            iconName={genre.name}
            onClick={() => handleClickButton(genre.id)}
            selected={selectedGenreId === genre.id}
          />
        ))}
      </div>
    </nav>     
  </>
  )
}