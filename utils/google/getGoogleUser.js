/**
 * Loading user info from Google 
 */

import axios from 'axios';
import oauthClient from './oauthClient.js';

const getAccessAndBearerTokenUrl = ({ accessToken }) => `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${ accessToken }`;

const getGoogleUser = async ({ code }) => {
  const { tokens } = await oauthClient.getToken(code);
  const response = await axios.get(
    getAccessAndBearerTokenUrl({ accessToken: tokens.access_token }),
    { headers: { 'Authorization': `Bearer ${tokens.id_token}`}}
  );

  return response.data;
}

export default getGoogleUser;