import { render, screen } from '@testing-library/react';
import App from './App';

// test('renders learn react link', () => {
//   render(<App />);
//   const linkElement = screen.getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });


// /*
import {getAccessToken} from "./utils/API/AuthAPI";
import {getUser} from "./utils/API/UserAPI";
const user = {username: "levi", password: "12345"};
let userData = {}
test('renders user', () => {

  getAccessToken(user.username, user.password).then(() => {
    getUser().then((data) => {
      console.log("user data", data);
      userData = data;
    });
  });

  expect(userData).not.toBeUndefined();
  expect(userData.username).toBe(user.username);

  //TODO: more tests for user data and other functionalities. like communitiees
  // take community[0] and use the id to query in the next fetch to be tested (select community)
// trigger all endpoints as such
// at the end, localStroage.clear();
})
//  */
