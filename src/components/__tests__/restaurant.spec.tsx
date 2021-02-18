import { render } from '@testing-library/react';
import React from 'react';
import { Restaurant } from '../../components/restaurant';
import { BrowserRouter as Router } from 'react-router-dom';

describe('<Restaurant />', () => {
  it('Renders OK with props', () => {
    const restaurantProps = {
      id: '1',
      name: 'name',
      categoryName: 'categoryName',
      coverImg: 'lala',
    };
    const { debug, getByText, container } = render(
      <Router>
        <Restaurant {...restaurantProps} />
      </Router>,
    );
    getByText(restaurantProps.name);
    getByText(restaurantProps.categoryName);
    expect(container.firstChild).toHaveAttribute(
      'href',
      `/restaurants/${restaurantProps.id}`,
    );
    debug();
  });
});
