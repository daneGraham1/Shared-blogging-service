const SQL = require("sql-template-strings");
const dbPromise = require("./database.js");


/**
 * Gets the given post.
 * 
 * @param {number} id the post's id
 */
async function retrievePostById(id) {
  const db = await dbPromise;

  return await db.get(SQL`select * from posts where id = ${id}`);
};

/**
 * Inserts the given post into the database. Then, reads the ID which the database auto-assigned, and adds it
 * to the post.
 * 
 * @param postDetails the post details to insert
 */
 async function createPost(postDetails) {
  const db = await dbPromise;

  const newPost = await db.run(SQL`
      insert into posts (datTime, title, content, userId) values(datetime('now'), 
      ${postDetails.title}, ${postDetails.content}, ${postDetails.userId})`);

  // Get the auto-generated ID value, and assign it back to the postDetails object.
  newPost.id = newPost.lastID;
};

/**
 * Updates the given post in the database
 * 
 * @param postDetails the post to update
 */
 async function updatePost(postDetails) {
  const db = await dbPromise;

  await db.run(SQL`
      update posts
      set datTime = datetime('now'), title = ${postDetails.title}, content = ${postDetails.content}, 
      userId = ${postDetails.userId}
      where id = ${postDetails.id}`);
      
}

/**
 * Deletes the post with the given id from the database.
 * 
 * @param {number} id the post's id
 */
async function deletePost(id, userId) {
  const db = await dbPromise;

  await db.run(SQL`
      delete from posts
      where id = ${id}
      and userId = ${userId}`);
}

/**
 * Gets all posts from the database.
 */
async function retrieveAllPosts() {
  const db = await dbPromise;

  const allPosts = await db.all(SQL`select p.id as postId, p.title as title, p.datTime as datTime, p.content as content, 
  u.fname as fname, u.lname as lname from posts p, users u
  where p.userId = u.id
    order by datTime desc`);
  for (const i in allPosts) {
    allPosts[i].datTime = allPosts[i].datTime.substring(0, 10);
  }
  return allPosts;
};

/**
 * Gets the posts authored by the current user from the database.
 * If there is no such user, undefined will be returned.
 * 
 * @param {number} userId the id of the user who authored the posts
 */
async function retrievePostsFromUsername(userId) {
  const db = await dbPromise;

  const result = await db.all(SQL`select p.id, p.title, p.datTime, p.content 
    from posts p, users u
    where u.id = p.userId
    and p.UserId = ${userId}
    order by datTime desc`);
  for (const i in result) {
    result[i].datTime = result[i].datTime.substring(0, 10);
  }
  return result;
}

/**
 * Gets all comments
 */
async function retrieveAllComments() {
  const db = await dbPromise;

  const result = await db.all(SQL`select c.postId, u.fname, u.lname, c.datTime, c.comment 
    from posts p,
    comments c,
    users u
    where p.id = c.postId
    and c.userId = u.id`);
    for (const i in result) {
      result[i].datTime = result[i].datTime.substring(0,10);
       }
    return result;
}

/**
 * Inserts the given comment into the database. Then, reads the ID which the database auto-assigned, and adds it
 * to the post.
 */
async function createComment(postId, userId, comment) {
  const db = await dbPromise;

  const newComment = await db.run(SQL`
      insert into comments (postId, userId, datTime, comment) values(${postId}, ${userId}, datetime('now'), ${comment})`);

  // Get the auto-generated ID value, and assign it back to the postDetails object.
  newComment.id = newComment.lastID;
}


// Export functions.
module.exports = {
  createPost,
  updatePost,
  deletePost,
  retrieveAllPosts,
  retrievePostsFromUsername,
  retrieveAllComments,
  createComment,
  retrievePostById

};