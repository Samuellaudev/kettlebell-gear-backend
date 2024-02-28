import asyncHandler from '../middleware/asyncHandler.js';
import generateToken from '../utils/generateToken.js';
import getGoogleOauthUrl from '../utils/google/getGoogleOauthUrl.js'
import getGoogleUser from '../utils/google/getGoogleUser.js';
import registerOrUpdateUsersFromOauth from '../utils/google/registerOrUpdateUsersFromOauth.js';

/**
 * @desc   Retrieve google oauth url
 * @route  GET /api/google/auth/url
 * @access Public
 */
const googleOauthUrl = asyncHandler(async (req, res) => {
  const url = getGoogleOauthUrl();
  res.status(200).json({ url });
})

/**
 * @desc   Retrieve google oauth url
 * @route  POST /api/google/auth/callback
 * @access Public
 */
const googleOauthCallback = asyncHandler(async (req, res) => {
  const { code } = req.body;
  const oauthUserInfo = await getGoogleUser({ code });
  const updatedUser = await registerOrUpdateUsersFromOauth({ oauthUserInfo });
  
  if (updatedUser) {
    generateToken(res, updatedUser._id, updatedUser.isVerified);

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      isVerified: updatedUser.isVerified,
    });
  }  else {
    res.status(400);
    throw new Error('Invalid user data');
  }
})

export {
  googleOauthUrl,
  googleOauthCallback
}