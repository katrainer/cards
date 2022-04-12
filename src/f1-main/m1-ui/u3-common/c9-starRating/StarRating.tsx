import React, {FC, useState} from 'react';
import s from './StarRating.module.css'
import {FaStar} from 'react-icons/fa'

type PropsType = {
    rating: number
    callback?: (rating: number)=> void
}

export const StarRating: FC<PropsType> = ({rating, callback}) => {
    const [hover, setHover] = useState<number>(0)
    return (
        <div>
            {[...Array(5)].map((star, i) => {
                const ratingValue = i + 1
                return (
                    <label key={i}>
                        <input
                            type={"radio"}
                            name={'rating'}
                            value={ratingValue}
                            onClick={() => {
                                callback && callback(ratingValue)
                            }}

                        />
                        <FaStar
                            className={s.star}
                            color={ratingValue <= (hover || rating) ? '#21268F' : '#D7D8EF'}
                            onMouseEnter={() => setHover(ratingValue)}
                            onMouseLeave={() => setHover(0)}
                        />
                    </label>
                )
            })}

        </div>
    );
};
