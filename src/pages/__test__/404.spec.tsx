import React from 'react';

import { HelmetProvider } from 'react-helmet-async';
import { render, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { NotFound } from '../404';

describe('<NotFound />', () => {
  it('renders Ok', async () => {
    render(
      <HelmetProvider>
        <Router>
          <NotFound />
        </Router>
      </HelmetProvider>,
    );
    await waitFor(() => {
      expect(document.title).toBe('Not Found | Uber Eats');
    });
  });
});
