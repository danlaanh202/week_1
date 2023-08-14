const apiUrl = [
  "https://jsonplaceholder.typicode.com/users",
  "https://jsonplaceholder.typicode.com/posts",
  "https://jsonplaceholder.typicode.com/comments",
];

const getData = async (apiUrl) => {
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error("Something happened with url: " + apiUrl);
  }
};
const getPost = async (postId) => {
  try {
    const getpostById = fetch(
      `https://jsonplaceholder.typicode.com/posts/${postId}`
    );
    const getCommentsOfPostId = fetch(
      `https://jsonplaceholder.typicode.com/posts/${postId}/comments`
    );
    const [post, comments] = await Promise.all([
      getpostById,
      getCommentsOfPostId,
    ]).then((data) => Promise.all(data.map((r) => r.json())));

    return {
      userId: post.userId,
      id: post.id,
      title: post.title,
      body: post.body,
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
    getData(apiUrl[0]),
    getData(apiUrl[1]),
    getData(apiUrl[2]),
  ]);

  //  3
  const result = users.map((item, index) => {
    let tempPosts = posts.filter((it, idx) => item.id === it.userId);
    let tempComments = comments.filter((it, idx) => item.email === it.email);
    return {
      id: item.id,
      name: item.name,
      username: item.username,
      email: item.email,
      comments: tempComments,
      posts: tempPosts,
    };
  });
  console.log(result);
  //4. filter only users with more than 3 comments
  const usersWithMoreThan3Comments = result.filter((item) => item.comments > 3);

  console.log(usersWithMoreThan3Comments);

  //5. Reformat the data with the count of comments and posts
  const reformatData = result.map((item, index) => {
    item.commentsCount = item.comments.length;
    item.postsCount = item.posts.length;
    delete item.comments;
    delete item.posts;
    return item;
  });

  //6. Who is the user with the most comments/posts
  let [userWithMostComments, userWithMostPosts] = [
    reformatData[0],
    reformatData[0],
  ];

  reformatData.forEach((item, index) => {
    if (item.commentsCount > userWithMostComments.commentsCount)
      userWithMostComments = item;
    if (item.postsCount > userWithMostPosts.postsCount)
      userWithMostPosts = item;
  });
  console.log(userWithMostComments, userWithMostPosts);

  //7. sort the list of users by the postsCount value descending
  const sortedArray = reformatData.sort(
    (it1, it2) => it2.postsCount - it1.postsCount
  );
  console.log(sortedArray);
  //   8. Get the post with ID of 1 via API request, at the same time get comments for post ID of 1 via another API request. Merge the post data with format:
  console.log(await getPost(2));
})();
