// cookieUtils.js

import Cookies from 'js-cookie';

// Function to get the JWT token from the 'user' cookie
export function getJwtTokenFromCookie() {
  // Read the 'user' cookie
  const userCookie = Cookies.get('user');

  if (userCookie) {
    // Parse the JSON string from the cookie
    const userData = JSON.parse(userCookie);

    // Access the JWT token
    return userData.jwtToken;
  }
  return false
}

// Function to get the JWT token from the 'user' cookie
export function getUserNameFromCookie() {
  // Read the 'user' cookie
  const userCookie = Cookies.get('user');

  if (userCookie) {
    // Parse the JSON string from the cookie
    const userData = JSON.parse(userCookie);

    // Access the JWT token
    return userData.username;
  }
  return false
}
