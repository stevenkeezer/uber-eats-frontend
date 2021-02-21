import React, { useEffect } from 'react';

import { Login, LOGIN_MUTATION } from '../login';
import { ApolloProvider } from '@apollo/client';
import { createMockClient, MockApolloClient } from 'mock-apollo-client';
import userEvent from '@testing-library/user-event';
import { render, RenderResult, waitFor } from '../../test-utils';
import { CreateAccount } from '../create-account';

describe('<CreateAccount />', () => {
  let mockedClient: MockApolloClient;
  let renderResult: RenderResult;
  beforeEach(async () => {
    it('renders ok', async () => {
      await waitFor(() => {
        const mockedClient = createMockClient();
        render(
          <ApolloProvider client={mockedClient}>
            <CreateAccount />
          </ApolloProvider>,
        );
      });
    });
    it('renders Ok', async () => {
      await waitFor(() =>
        expect(document.title).toBe('Create Account | Uber eats'),
      );
    });
  });
});
