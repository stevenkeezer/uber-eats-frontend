import { gql, useQuery } from '@apollo/client';
import { url } from 'inspector';
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useForm } from 'react-hook-form';
import { Link, useHistory } from 'react-router-dom';
import { Restaurant } from '../../components/restaurant';
import { CATEGORY_FRAGMENT, RESTAURANT_FRAGMENT } from '../../fragments';
import {
  restaurantsPageQuery,
  restaurantsPageQueryVariables,
} from '../../__generated__/restaurantsPageQuery';

const RESTAURANTS_QUERY = gql`
  query restaurantsPageQuery($input: RestaurantsInput!) {
    allCategories {
      ok
      error
      categories {
        ...CategoryParts
      }
    }
    restaurants(input: $input) {
      ok
      error
      totalPages
      totalResults
      results {
        ...RestaurantParts
      }
    }
  }
  ${RESTAURANT_FRAGMENT}
  ${CATEGORY_FRAGMENT}
`;

interface IFormProps {
  searchTerm: string;
}

export const Restaurants = () => {
  const [page, setPage] = useState(1);
  const { data, loading, error } = useQuery<
    restaurantsPageQuery,
    restaurantsPageQueryVariables
  >(RESTAURANTS_QUERY, {
    variables: {
      input: {
        page,
      },
    },
  });
  const onNextPageClick = () => setPage((current) => current + 1);
  const onPrevPageClick = () => setPage((current) => current - 1);
  const { register, handleSubmit, getValues } = useForm<IFormProps>();
  const history = useHistory();
  const onSearchSubmit = () => {
    const { searchTerm } = getValues();
    history.push({
      pathname: '/search',
      search: `?term=${searchTerm}`,
    });
  };
  return (
    <div>
      <Helmet>
        <title>Order Food Online | Food Delivery</title>
      </Helmet>
      <form
        onSubmit={handleSubmit(onSearchSubmit)}
        className="bg-gray-800 w-full py-32 flex items-center justify-center"
      >
        <input
          ref={register({ required: true, min: 3 })}
          className="input w-3/4 md:w-3/12 border-0"
          name="searchTerm"
          type="Search"
          placeholder="Search Restaurants..."
        />
      </form>
      {!loading && (
        <div className="xl:px-10 px-4 mx-auto pb-20 mt-8">
          <div className="flex justify-around max-w-xs mx-auto">
            {data?.allCategories.categories?.map((category) => (
              <Link key={category.id} to={`/category/${category.slug}`}>
                <div className="flex flex-col items-center group cursor-pointer">
                  <div
                    className="w-16 h-16 bg-cover group-hover:bg-gray-100 rounded-full justify-center"
                    style={{ backgroundImage: `url(${category.coverImg})` }}
                  ></div>
                  <span className="text-sm font-bold mt-1">
                    {category.name}
                  </span>
                </div>
              </Link>
            ))}
          </div>
          <div className="grid mt-10 sm:grid-cols-3 gap-x-5 gap-y-10">
            {data?.restaurants.results?.map((restaurant) => (
              <Restaurant
                key={restaurant.id}
                id={restaurant.id + ''}
                coverImg={restaurant.coverImg}
                name={restaurant.name}
                categoryName={restaurant.category?.name}
              />
            ))}
          </div>
          <div className="flex justify-center items-center mt-10">
            {page > 1 && (
              <button
                onClick={onPrevPageClick}
                className="focus:outline-none font-medium text-2xl"
              >
                &larr;
              </button>
            )}
            <span className="mx-5">
              Page {page} of {data?.restaurants.totalPages}
            </span>
            {page !== data?.restaurants.totalPages && (
              <button
                onClick={onNextPageClick}
                className="focus:outline-none font-medium text-2xl"
              >
                &rarr;
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
