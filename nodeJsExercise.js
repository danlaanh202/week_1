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
    //todo : sao mình không viết hàm getData ở trên để có thể sử dụng ở chỗ này luôn em nhỉ ?
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

    //todo: chỗ này mình có thể xử dụng phần operator có viết trong docs training để nó ngắn gọn và tường minh hơn nhé
    // fix:
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
    getData(apiUrl[0]),
    getData(apiUrl[1]),
    getData(apiUrl[2]),
  ]);

  //  3
  //todo : có thể viết thế này cho ngắn và dê hiểu hơn nhé . Tham khảo nhé .
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
  //todo: thay vì làm thế này thử làm theo spread/rest operator xem oke hơn không nhé ?
  // fixed
  const reformatData = result.map((item, index) => {
    const { comments, posts, ...another } = item;
    return {
      ...another,
      commentsCount: comments.length,
      postsCount: posts.length,
    };
  });
  console.log(reformatData);
  //todo bài này có cách này viết ngắn hơn và hạn chế dùng forEach đc không ?
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
  // console.log(await getPost(2));
})();
