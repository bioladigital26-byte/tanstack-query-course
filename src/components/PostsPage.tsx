import {
  useQuery,
} from "@tanstack/react-query";
import { api } from "../api/api";
import { Link } from "react-router";

type Post = {
  id: string;
  title: string;
};

function getPosts() {
  return api.get<Post[]>("/posts", {}).then((res) => res.data);
}

// const ServerPageInNextJs = () => {
//   const posts = await getPosts();

//   return <PostsPage initialPosts={posts} />
// }

function PostsList() {
   // {id, title} - краткая инфа о посте для списка
  const {
    data: posts,
  } = useQuery({
    queryKey: ["posts"],
    queryFn: getPosts,
    retry: false,
    staleTime: 1000 * 60 * 5,
    // initialData: initialPosts,
    // placeholderData: [
    //   { id: 1, title: "####" },
    //   { id: 2, title: "#######" },
    //   { id: 3, title: "####" },
    // ],
    // placeholderData: ()
    // refetchInterval: 1000,
  });

  // const cancelRequest = () => {
  //   queryClient.cancelQueries({ queryKey: ["posts"] });
  // };

  // const invalidatePosts = () => {
  //   queryClient.invalidateQueries({ queryKey: ["posts"] }); // Помечает данные как устаревшие (stale) + необязательно запускает запрос
  //   // queryClient.refetchQueries({ queryKey: ["posts"] });
  //   // queryClient.resetQueries({ queryKey: ["posts"] });
  // };

  // const refetchPosts = () => {
  //   queryClient.refetchQueries({ queryKey: ["posts"] }); // Запускает запрос немедленно
  // };

  // const resetQueries = () => {
  //   // Например при logout из системы
  //   queryClient.resetQueries({ queryKey: ["posts"] }); // Удаляет данные из кеша
  // };

  return (
    <div className="flex flex-col gap-4">
      {/* <h1>notificationsCount = {notifications?.notificationsCount}</h1> */}
      {/* <button
        className="border border-gray-300 rounded-md p-2"
        onClick={cancelRequest}
      >
        INVALIDATE
      </button>
      {isFetching && <div>isFetching...</div>}
      {isLoading && <div>isLoading...</div>}
      {isPending && <div>isPending...</div>} */}
      {posts?.map((post) => (
        <Link key={post.id} to={`/posts/${post.id}`}>
          {post.id}.{post.title}
        </Link>
      ))}
    </div>
  );
}

export const PostsPage = () => {
  return (
    <div className="flex flex-col gap-4">
      <PostsList />
    </div>
  );
};
