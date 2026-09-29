import { useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "../api/api";
import { useParams } from "react-router";

type Post = {
  id: number;
  title: string;
};

function getPostById(id: string) {
  return api.get<Post>(`/posts/${id}`).then((res) => res.data);
}

// {id, title, description, comments, views, ..etc} - полная инфа о посте для деталей
export const PostDetails = () => {
  const { id } = useParams();
  const queryClient = useQueryClient();

  const { data: post } = useQuery({
    queryKey: ["post", id],
    queryFn: () => getPostById(id ?? ""),
    placeholderData: () => {
      const posts = queryClient.getQueryData<Post[]>(["posts"]);
      const foundPost = posts?.find((post: Post) => post.id === Number(id));
      return foundPost;
    },
  });

  return (
    <div>
      {post?.id}.{post?.title}
      {post && (
        <div>
          description: Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Eius laboriosam ipsam placeat officiis aliquam ut expedita in officia
          itaque! Eligendi laudantium id fugiat corrupti quos alias excepturi
          iste, modi magni? Rem nesciunt ducimus aliquam deleniti earum dolores
          eveniet quidem modi ipsam sed magni amet nemo, libero provident porro
          nisi deserunt unde eligendi numquam fugiat! Tenetur quaerat ipsam
          velit suscipit magnam. Mollitia quis quibusdam consequatur repellendus
          accusamus soluta facilis temporibus beatae minus aperiam, error illo
          molestias at earum minima recusandae repellat architecto sunt fuga?
          Voluptate ratione illo necessitatibus nesciunt unde odio? Distinctio
          id delectus, error maiores aperiam eum optio nihil at molestiae
          voluptate quam assumenda unde ipsam architecto nam quis tenetur sunt.
          Id ab officiis magnam iure debitis qui modi unde! Dolore cumque quam
          ducimus labore? Unde fuga necessitatibus labore architecto sint! Ex
          magnam libero temporibus omnis soluta exercitationem laborum, maxime
          similique eaque asperiores saepe non eius consequuntur.
          Exercitationem, ipsa maxime!
        </div>
      )}
    </div>
  );
};
