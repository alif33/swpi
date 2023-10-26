import { useEffect, useState } from "react"
import axios from "axios"
import { romanize } from "./Formattor"

function App() {
  const [movies, setMovies] = useState([])
  const [info, setInfo] = useState([])
  const [active, setActive] = useState()
  const apiKey = 'b9a5e69d'

  useEffect(()=>{
    axios.get('https://swapi.dev/api/films/?format=json')
      .then(function (response) {
        const data = response.data
        setMovies(data.results)
      })
      .catch(function (error) {
        console.error('An error occurred:', error)
      })
  }, [])


const fetchInfo = __d__ =>{
  axios.get(`http://www.omdbapi.com/?apikey=${apiKey}&t=${__d__.title}&y=${__d__.date}`)
  .then(function (response) {
    const data = response.data;
    console.log(data);
    setInfo(data)
  })
  .catch(function (error) {
    console.error('An error occurred:', error);
  });
}

  const handleActive = item =>{
    setActive(item)
    fetchInfo(fetchInfo)
  }

  console.log(movies);
  return (
    <div className="">
      <div className="h-14 bg-slate-200 px-7 py-2">
        <div className="grid grid-cols-12 gap-5">
          <div className="col-span-2">
            <select className="w-full h-10">
              <option>Time</option>
              <option>Cost</option>
            </select>
          </div>
          <div className="col-span-10">
            <input 
              className="w-full h-10 pl-7"
              placeholder="Type to search"
            />
          </div>
        </div>
      </div>
      <div className="h-screen grid grid-cols-2">
        <div className="border-r">
          <ul>
              { movies.map((item, index)=><li key={index} className="border-b">
                <span 
                  className={`flex justify-between pl-7 pr-3 py-3 cursor-pointer ${item.title === active?.title && "bg-slate-200"}`}
                  onClick={()=>handleActive(item)}
                >
                  <span className="flex gap-7">
                    <h5>EPISODE {item.episode_id}</h5> 
                    <h3 className="">EPISODE {romanize(item.episode_id)} - {item.title}</h3>
                  </span>
                  <h5>{item.release_date}</h5>
                </span>
            </li>)}
          </ul>
        </div>
        <div className="border-l pt-4 pl-3">
          <h2 className="text-2xl">EPISODE {romanize(active?.episode_id)} - {active? active.title: "The Empire Strikes Back"}</h2>
          <div className="flex gap-3 my-3">
            {
              info.Poster && <img
                height={200}
                width={250}
                src={info.Poster}
              />
            }
            
            <p>{active?.opening_crawl}</p>
          </div>
          <h3>Directed by: {active? active.director: "Irvin Kershner"}</h3>
        </div>
      </div>
    </div>
  );
}

export default App;

