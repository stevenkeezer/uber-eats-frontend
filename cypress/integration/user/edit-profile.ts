import { use } from 'chai';

describe('Edit Profile', () => {
  const user = cy;
  beforeEach(() => {
    //@ts-ignore
    user.login('kd@test.com', '12345');
  });
  it('can go to /edit-profile using the header', () => {
    user.get('a[href="/edit-profile"]').click();
    user.wait(2000);
    user.title().should('eq', 'Edit Profile | Uber Eats');
  });
  it('can change email', () => {
    user.intercept('POST', 'http://localhost:4000/graphql', (req) => {
      if (req.body.oprtationName === 'editProfile') {
        // @ts-ignore
        req.body?.variables?.input?.email = 'kd@test.com';
      }
    });
    user.visit('/edit-profile');
    user.findByPlaceholderText(/email/i).clear().type('kd@test.com');
    user.findByRole('button').click();
  });
});
