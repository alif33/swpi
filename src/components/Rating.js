import ReactStars from "react-rating-stars-component"
import { AiFillStar } from "react-icons/ai"
import { useEffect, useState } from "react"
import axios from "axios"

const Rating = ({ title, date })=>{
    const [rating, setRating] = useState()
    const apiKey = "b9a5e69d"

    useEffect(()=>{
        axios.get(`http://www.omdbapi.com/?apikey=${apiKey}&t=${title}&y=${date}`)
        .then(function (response) {
          const data = response.data;
          const rate = data?.Ratings[0]?.Value
          if (rate) {
            const real_rate = rate.split("/")[0]
            setRating(parseFloat(real_rate))
          }
        })
        .catch(function (error) {
          console.error('An error occurred:', error);
        });
    }, [])

    return(
        <>
            { rating && <ReactStars
                count={10}
                size={24}
                isHalf={true}
                edit={false}
                value={rating}
                emptyIcon={<AiFillStar size={14}/>}
                halfIcon={<AiFillStar size={14}/>}
                filledIcon={<AiFillStar size={14} color="#FFD800"/>}
                activeColor="#ffd700"
            />}
        </>
        
    )
}
export default Rating