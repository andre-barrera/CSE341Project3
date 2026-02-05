const mongodb = require('../data/database');

const createUser = async (profile) => {
  const user = {
    githubId: profile.id,
    username: profile.username,
    displayName: profile.displayName || profile.username
  };

  await mongodb
    .getDatabase()
    .db('cseproject03')
    .collection('users')
    .updateOne(
      { githubId: user.githubId },
      { $set: user },
      { upsert: true }
    );
};

module.exports = { createUser };
