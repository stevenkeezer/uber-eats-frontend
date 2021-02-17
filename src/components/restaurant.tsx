import React from 'react';
import { Link } from 'react-router-dom';

interface IRestaurantProps {
  id: string;
  coverImg: string;
  name: string;
  categoryName?: string;
}

export const Restaurant: React.FC<IRestaurantProps> = ({
  id,
  coverImg,
  name,
  categoryName,
}) => (
  <Link to={`/restaurants/${id}`}>
    <div className="flex flex-col cursor-pointer">
      <div
        style={{ backgroundImage: `url(${coverImg})` }}
        className="py-24 bg-cover bg-center mb-3"
      ></div>
      <h3 className="text-xl font-medium">{name}</h3>
      <span className="bmt-3 py-2 text-xss bg-opacity-50 border-gray-200">
        {categoryName}
      </span>
    </div>
  </Link>
);
