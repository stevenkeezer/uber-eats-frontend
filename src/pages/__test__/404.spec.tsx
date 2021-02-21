import React from 'react';

import { HelmetProvider } from 'react-helmet-async';
import { render, waitFor } from '../../test-utils';
import { BrowserRouter as Router } from 'react-router-dom';
import { NotFound } from '../404';

describe('<NotFound />', () => {
  it('renders Ok', async () => {
    render(<NotFound />);
    await waitFor(() => {
      expect(document.title).toBe('Not Found | Uber Eats');
    });
  });
});
