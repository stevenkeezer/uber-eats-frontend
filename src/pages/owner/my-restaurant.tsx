import { gql, useQuery } from '@apollo/client';
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useParams } from 'react-router-dom';
import { Dish } from '../../components/dish';
import {
  VictoryBar,
  VictoryChart,
  VictoryAxis,
  VictoryVoronoiContainer,
  VictoryLine,
  VictoryLabel,
  VictoryTooltip,
  VictoryTheme,
} from 'victory';
import {
  DISH_FRAGMENT,
  ORDERS_FRAGMENT,
  RESTAURANT_FRAGMENT,
} from '../../fragments';
import {
  myRestaurant,
  myRestaurantVariables,
} from '../../__generated__/myRestaurant';

export const MY_RESTAURANT_QUERY = gql`
  query myRestaurant($input: MyRestaurantInput!) {
    myRestaurant(input: $input) {
      ok
      error
      restaurant {
        ...RestaurantParts
        menu {
          ...DishParts
        }
        orders {
          ...OrderParts
        }
      }
    }
  }
  ${RESTAURANT_FRAGMENT}
  ${DISH_FRAGMENT}
  ${ORDERS_FRAGMENT}
`;

interface IParams {
  id: string;
}

export const MyRestaurant = () => {
  const { id } = useParams<IParams>();
  const { data } = useQuery<myRestaurant, myRestaurantVariables>(
    MY_RESTAURANT_QUERY,
    {
      variables: {
        input: { id: +id },
      },
    },
  );
  console.log(data);
  return (
    <div>
      <Helmet>
        <title>
          {data?.myRestaurant.restaurant?.name || 'Loading...'} | Nuber Eats
        </title>
        <script src="https://cdn.paddle.com/paddle/paddle.js"></script>
      </Helmet>
      <div className="checkout-container"></div>
      <div
        className="  bg-gray-700  py-28 bg-center bg-cover"
        style={{
          backgroundImage: `url(${data?.myRestaurant.restaurant?.coverImg})`,
        }}
      ></div>
      <div className="px-10 mt-10">
        <h2 className="text-4xl font-medium mb-10">
          {data?.myRestaurant.restaurant?.name || 'Loading...'}
        </h2>
        <Link
          to={`/restaurants/${id}/add-dish`}
          className=" mr-8 text-white bg-gray-800 py-3 px-10"
        >
          Add Dish &rarr;
        </Link>
        <span
          //   onClick={triggerPaddle}
          className=" cursor-pointer text-white bg-lime-700 py-3 px-10"
        >
          Buy Promotion &rarr;
        </span>
      </div>
      <div>
        {data?.myRestaurant.restaurant?.menu.length === 0 ? (
          <h4 className="text-lg pb-4">No dishes yet.</h4>
        ) : (
          <div className="grid mt-16 md:grid-cols-3 gap-x-5 gap-y-10 px-10">
            {data?.myRestaurant.restaurant?.menu.map((dish) => (
              <Dish
                name={dish.name}
                description={dish.description}
                price={dish.price}
              />
            ))}
          </div>
        )}
        <div className="mt-10">
          <div className="max-w-screen-xl mb-10 w-full mx-auto">
            {data?.myRestaurant.restaurant?.orders.length !== 0 && (
              <>
                <h4 className="text-center text-2xl font-medium">Sales</h4>
                <VictoryChart
                  height={500}
                  theme={VictoryTheme.material}
                  width={window.innerWidth}
                  domainPadding={50}
                  containerComponent={<VictoryVoronoiContainer />}
                >
                  <VictoryLine
                    labels={({ datum }) => `$${datum.y}`}
                    labelComponent={
                      <VictoryTooltip
                        style={{ fontSize: 18 } as any}
                        renderInPortal
                        dy={-20}
                      />
                    }
                    data={data?.myRestaurant.restaurant?.orders.map(
                      (order) => ({
                        x: order.createdAt,
                        y: order.total,
                      }),
                    )}
                    interpolation="natural"
                    style={{
                      data: {
                        strokeWidth: 5,
                      },
                    }}
                  />
                  <VictoryAxis
                    tickLabelComponent={<VictoryLabel renderInPortal />}
                    style={{
                      tickLabels: {
                        fontSize: 20,
                      } as any,
                    }}
                    tickFormat={(tick) => new Date(tick).toLocaleDateString()}
                  />
                </VictoryChart>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
