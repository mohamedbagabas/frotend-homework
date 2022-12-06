import { Flex,VStack, Text, Heading,Input,Divider,Button,useToast,HStack } from '@chakra-ui/react';
  import { useEffect, useState } from 'react';
  import Logout from '../components/Logout';
  
  const BlogsPage = () => {
    const [blogs, setBlogs] = useState<string[]>([]);
    const [title, setTitle] = useState('');
    const [message, setMessage] = useState('');
    const toast = useToast();
    const fetchBlogs = async () => {
      const request = await fetch('/api/v1/blog', {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      });
      const data = await request.json();
      setBlogs(data);
    };
    const addNewBlog = async () => {
      try {
        if (!title) {
          return;
        }
  
        const request = await fetch('/api/v1/blog', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + localStorage.getItem('token'),
          },
          body: JSON.stringify({ title,message }),
        });
  
        const data = await request.json();
  
        if (request.status !== 201) {
          toast({
            title: data.message,
            status: 'error',
            duration: 3000,
            position: 'top',
          });
          return;
        }
        fetchBlogs();
        setTitle('');
        setMessage('');
      } catch (error) {
        console.log(error);
        toast({
          title: 'Server Error !',
          status: 'error',
          duration: 3000,
          position: 'top',
        });
      }
    };
    useEffect(() => {
      fetchBlogs();
    }, []);
  
    const deleteBlog = async (id: string) => {
      try {
        const request = await fetch(`/api/v1/blog/${id}`, {
          method: 'DELETE',
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token'),
          },
        });
  
        const data = await request.json();
  
        if (request.status !== 200) {
          toast({
            title: data.message,
            status: 'error',
            duration: 3000,
            position: 'top',
          });
          return;
        }
        toast({
          title: data.message,
          status: 'success',
          duration: 3000,
          position: 'top',
        });
        fetchBlogs();
      } catch (error) {
        console.log(error);
        toast({
          title: 'Server Error !',
          status: 'error',
          duration: 3000,
          position: 'top',
        });
      }
    };
  
    return (
      <Flex justifyContent='center' alignItems='center' height='100vh'>
        <VStack spacing='3rem'>
          <Heading>Blogs List !</Heading>
          <VStack border='1px' padding='10' width='20rem' borderRadius='0.2rem'>
            {blogs.map((blog: any) => (
              <HStack
                overflow='auto'
                width='100%'
                key={blog.id}
                border='1px'
                padding='3'
                justifyContent='space-between'
                borderRadius='0.5rem'
              >
                <Text fontSize='1rem'>{blog.title}</Text>
                <Text fontSize='1rem'>{blog.message}</Text>
                <Button
                  onClick={() => deleteBlog(blog.id)}
                  backgroundColor='red.400'
                >
                  Delete
                </Button>
              </HStack>
            ))}
  
            <VStack spacing='1rem' mt='2rem !important'>
              <Divider color='white' backgroundColor='white' />
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder='Add new Title Blog'
              />
              <Input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder='Add new Message'
              />
              <Button onClick={addNewBlog} width='100%'>
                Add Blog
              </Button>
            </VStack>
          </VStack>
          <Logout />
        </VStack>
      </Flex>
    );
  };
  
  export default BlogsPage;