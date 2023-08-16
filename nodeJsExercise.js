const rootApiUrl = "https://jsonplaceholder.typicode.com";
const postsApiUrl = rootApiUrl + "/posts";
const commentsApiUrl = rootApiUrl + "/comments";
const usersApiUrl = rootApiUrl + "/users";

const getData = async (resource, url = rootApiUrl) => {
  try {
    const response = await fetch(url + resource);
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error("Something happened with url: " + apiUrl);
  }
};
const getPost = async (postId) => {
  try {
    const getpostById = getData(`${postsApiUrl}/${postId}`);
    const getCommentsOfPostId = getData(`${postsApiUrl}/${postId}/comments`);
    const [post, comments] = await Promise.all([
      getpostById,
      getCommentsOfPostId,
    ]);

    const { userId, id, title, body } = post;
    return {
      userId,
      id,
      title,
      body,
      comments: comments.map((item) => ({
        postId: item.postId,
        id: item.id,
        name: item.name,
        email: item.email,
        body: item.body,
      })),
    };
  } catch (error) {}
};

(async () => {
  // get all users, posts and comments
  const [users, posts, comments] = await Promise.all([
    getData(usersApiUrl),
    getData(postsApiUrl),
    getData(commentsApiUrl),
  ]);

  //  3

  const result = users.map((item, index) => {
    const { id, name, username, email } = item;
    return {
      id,
      name,
      username,
      email,
      comments: posts.filter((it, idx) => item.id === it.userId),
      posts: comments.filter((it, idx) => item.email === it.email),
    };
  });
  // console.log(result);
  //4. filter only users with more than 3 comments
  const usersWithMoreThan3Comments = result.filter((item) => item.comments > 3);

  // console.log(usersWithMoreThan3Comments);

  //5. Reformat the data with the count of comments and posts

  const reformatData = result.map((item, index) => {
    const { comments, posts, ...another } = item;
    return {
      ...another,
      commentsCount: comments.length,
      postsCount: posts.length,
    };
  });
  // console.log(reformatData);

  //6. Who is the user with the most comments/posts
  const userWithMostComments = reformatData.reduce((prev, curr) =>
    prev.commentsCount > curr.commentsCount ? prev : curr
  );
  const userWithMostPosts = reformatData.reduce((prev, curr) =>
    prev.postsCount > curr.postsCount ? prev : curr
  );
  // console.log(userWithMostComments, userWithMostPosts);

  //7. sort the list of users by the postsCount value descending
  const sortedArray = reformatData.sort(
    (it1, it2) => it2.postsCount - it1.postsCount
  );
  // console.log(sortedArray);
  //   8. Get the post with ID of 1 via API request, at the same time get comments for post ID of 1 via another API request. Merge the post data with format:
  console.log(await getPost(2));
})();
