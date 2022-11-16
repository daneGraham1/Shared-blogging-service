const SQL = require("sql-template-strings");
const dbPromise = require("./database.js");

/**
 * Inserts the given user into the database. Then, reads the ID which the database auto-assigned, and adds it
 * to the user.
 * 
 * @param user the user to insert
 */
async function createUser(user){
  const db = await dbPromise;
 
  const result = await db.run(SQL`
      insert into users (username, password, fname, lname, doB, description, avatar) values (${user.username}, ${user.password}, 
        ${user.fname}, ${user.lname}, ${user.doB}, ${user.description}, ${user.avatar})`);

  // Get the auto-generated ID value, and assign it back to the user object.
  user.id = result.lastID;
};


/**
 * Gets the user with the given id from the database.
 * If there is no such user, undefined will be returned.
 * 
 * @param {number} id the id of the user to get.
 * @returns {object} user 
 */
async function retrieveUserById(id){
  const db = await dbPromise;

  const user = await db.get(SQL`
      select * from users
      where id = ${id}`);

  return user;
};


/**
 * Gets the user with the given username and password from the database.
 * If there is no such user, undefined will be returned.
 * 
 * @param {string} username the user's username
 * @param {string} hashedpassword the user's password
 */
async function retrieveUserWithCredentials(username, hashedPassword){
  const db = await dbPromise;

  /* plaintext password in db */
  const user = await db.get(SQL`
      select * from users
      where username = ${username} and password = ${hashedPassword}`);
 return user;
  };


/**
 * Gets the user with the given authToken from the database.
 * If there is no such user, undefined will be returned.
 * 
 * @param {string} authToken the user's authentication token
 */
async function retrieveUserWithAuthToken(authToken) {
  const db = await dbPromise;
  const user = await db.get(SQL`
      select * from users
      where authToken = ${authToken}`);
  // console.log({ user });
  return user;
};


async function updateUserAuthToken(username, authToken){
  const db = await dbPromise;
  await db.run(SQL`update users 
  set authToken = ${authToken} 
  where username = ${username}`);
};


/**
 * Gets an array of all users from the database.
 */
async function retrieveAllUsers() {
  const db = await dbPromise;
  const users = await db.all(SQL`select * from users`);
  return users;
};


/**
 * Updates the given user in the database, not including auth token
 *  @param user the user to update
 */
async function updateUser(user) {
  const db = await dbPromise;
  await db.run(SQL`
      update users
      set username = ${user.username}, password = ${user.password}, fname = ${user.fname},
          lname = ${user.lname}, doB = ${user.doB}, description = ${user.description}, avatar = ${user.avatar}
      where id = ${user.id}`);
};


/**
 * Updates the aithToken for the given username in the database
 *  @param username the user to update
 */
async function updateUserAuthToken(username, authToken){
  const db = await dbPromise;
  await db.run(SQL`update users 
  set authToken = ${authToken} 
  where username = ${username}`);
};


/**
 * Deletes the user with the given id from the database.
 * 
 * @param {number} id the user's id
 */
async function deleteUser(id) {
  const db = await dbPromise;
  await db.run(SQL`
      delete from users
      where id = ${id}`);
};


/**
 * Retrieve a user's id given their username
 * 
 * @param {string} username the user's username 
 */
async function retrieveIdFromUsername(username) {
  const db = await dbPromise;
  const user = await db.get(SQL`
      select * from users
      where username = ${username}`);
  return user.id;
};


/**
 * Retrieve avatar (name and filepath)
 *  * @param {number} avatarID the avatar ID
 */
async function retrieveAvatarFromId(avatarID) {
  const db = await dbPromise;
  const avatar = await db.get(SQL`select * from avatars
   where id = ${avatarID}`);
  return avatar;
};


/**
 * Retrieve avatar name and filepath
 *  * @param {string} avatarName the avatar name
 * @returns {object} avatar the avatar object (id, name, filePath)
 */
 async function retrieveAvatarFromName(avatarName) {
  const db = await dbPromise;
  const avatar = await db.get(SQL`select * from avatars
   where name = ${avatarName}`);
    return avatar;
};


/**
 * Retrieve avatar ID
 *  @param {string} avatarName the avatar name
 * @returns {number} avatarID the avatar ID
 */ 


async function getAvatarId(avatarName){
  const db = await dbPromise;
  const avatarID = await db.get(SQL`select id from avatars where name = ${avatarName} `);
return avatarID;
};


/**
 * Retrieve all avatars
 * @returns {object} all avatars for populating create account form
 */
 async function retrieveAllAvatars() {
  const db = await dbPromise;

  const allAvatars = await db.all(SQL`select * from avatars`);
  return allAvatars;
};


/**
 * When using hashed & salted passwords in the db, retrieve said password to compare
 * against the user's plaintext input
 * @param {string} username the username for login
 * @returns {string} storedPwd the hashed & salted password 
 */
async function retrieveUserPassword(username) {
  const db = await dbPromise;
      const storedPwd = await db.get(SQL`select password from users where username = ${username}`);
  return storedPwd;
  };


// Export functions.
module.exports = {
  createUser,
  retrieveUserById,
  retrieveUserWithCredentials,
  retrieveUserWithAuthToken,
  retrieveAllUsers,
  updateUser,
  updateUserAuthToken,
  deleteUser,
  retrieveIdFromUsername,
  retrieveAvatarFromId,
  retrieveAvatarFromName,
  getAvatarId,
  retrieveAllAvatars,
  retrieveUserPassword
};