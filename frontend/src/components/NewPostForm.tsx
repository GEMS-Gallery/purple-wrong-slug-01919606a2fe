import React, { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';

interface NewPostFormProps {
  onSubmit: (title: string, body: string, author: string) => void;
}

const NewPostForm: React.FC<NewPostFormProps> = ({ onSubmit }) => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [author, setAuthor] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(title, body, author);
    setTitle('');
    setBody('');
    setAuthor('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <Box display="flex" flexDirection="column" gap={2} mb={4}>
        <TextField
          label="Title"
          variant="outlined"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <TextField
          label="Body"
          variant="outlined"
          multiline
          rows={4}
          value={body}
          onChange={(e) => setBody(e.target.value)}
          required
        />
        <TextField
          label="Author"
          variant="outlined"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          required
        />
        <Button type="submit" variant="contained" color="primary">
          Submit Post
        </Button>
      </Box>
    </form>
  );
};

export default NewPostForm;
