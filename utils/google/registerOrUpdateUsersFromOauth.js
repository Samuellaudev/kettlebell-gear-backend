/**
 * Creating new users from OAuth data
 */
import User from '../../models/userModel.js';
import { v4 as uuid } from 'uuid';

const registerOrUpdateUsersFromOauth = async ({ oauthUserInfo }) => {
  try {
    const {
      id: googleId,
      email,
      name,
      verified_email: isVerified
    } = oauthUserInfo;
    let user = await User.findOne({ email });
  
    if (user) { 
      user.isVerified = true;
      user.verificationString = '';
      user = await user.save();
    } else {
      user = await User.create({
        name,
        email,
        isVerified,
        password: uuid(),
      });
    }
  
    return user;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export default registerOrUpdateUsersFromOauth;