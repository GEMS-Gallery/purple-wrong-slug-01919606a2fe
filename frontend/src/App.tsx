import React, { useState, useEffect } from 'react';
import { Container, Typography, Button, CircularProgress, Box } from '@mui/material';
import { styled } from '@mui/system';
import PostList from './components/PostList';
import NewPostForm from './components/NewPostForm';
import { backend } from 'declarations/backend';

const HeroSection = styled('div')(({ theme }) => ({
  backgroundImage: 'url(https://images.unsplash.com/photo-1639773759819-591538caea6f?ixid=M3w2MzIxNTd8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MjQ3OTg5MjZ8&ixlib=rb-4.0.3)',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  color: 'white',
  padding: theme.spacing(8, 0, 6),
  marginBottom: theme.spacing(4),
}));

interface Post {
  id: bigint;
  title: string;
  body: string;
  author: string;
  timestamp: bigint;
}

function App() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [showNewPostForm, setShowNewPostForm] = useState(false);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const fetchedPosts = await backend.getPosts();
      setPosts(fetchedPosts);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching posts:', error);
      setLoading(false);
    }
  };

  const handleNewPost = async (title: string, body: string, author: string) => {
    try {
      setLoading(true);
      await backend.createPost(title, body, author);
      await fetchPosts();
      setShowNewPostForm(false);
    } catch (error) {
      console.error('Error creating new post:', error);
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="lg">
      <HeroSection>
        <Typography variant="h2" align="center" gutterBottom>
          Crypto Blog
        </Typography>
        <Typography variant="h5" align="center" paragraph>
          Explore the latest in cryptocurrency and blockchain technology
        </Typography>
      </HeroSection>

      <Box display="flex" justifyContent="center" mb={4}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => setShowNewPostForm(!showNewPostForm)}
        >
          {showNewPostForm ? 'Cancel' : 'New Post'}
        </Button>
      </Box>

      {showNewPostForm && (
        <NewPostForm onSubmit={handleNewPost} />
      )}

      {loading ? (
        <Box display="flex" justifyContent="center">
          <CircularProgress />
        </Box>
      ) : (
        <PostList posts={posts} />
      )}
    </Container>
  );
}

export default App;
