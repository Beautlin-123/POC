import React, { useState } from 'react';


const Rating = ({ onChange }) => {
  const [rating, setRating] = useState(3); // Set default rating to 3

  const handleClick = (value) => {
    setRating(value);
    onChange(value);
  };

  return (
    <div className="rating">
      {[...Array(5)].map((_, index) => {
        const ratingValue = index + 1;
        return (
          <span
            key={index}
            onClick={() => handleClick(ratingValue)}
            style={{ color: ratingValue <= rating ? 'yellow' : 'grey', cursor: 'pointer' }}
          >
            &#9733;
          </span>
        );
      })}
    </div>
  );
};

export default Rating;
