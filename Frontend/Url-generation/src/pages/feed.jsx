import { useState, useEffect } from 'react'
import { getPosts } from '../api'

const Feed = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await getPosts()
        setPosts(data.posts)
      } catch (requestError) {
        setError(requestError.message)
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return (
    <section className="feed">
        <div className="page-heading">
          <h1>Latest posts</h1>
          <p>Fresh moments shared by the community.</p>
        </div>

        {isLoading && <p className="feed-status">Loading posts...</p>}
        {error && <p className="feed-status feed-error">{error}</p>}
        {!isLoading && !error && posts.length === 0 && (
          <p className="feed-status">No posts have been shared yet.</p>
        )}

        {!isLoading && !error && posts.map((post) => (
            <article key={post._id} className="post">
                <img src={post.image} alt={post.caption} loading="lazy" />
                <p>{post.caption}</p>
            </article>
        ))}
    </section>
  )
}

export default Feed
