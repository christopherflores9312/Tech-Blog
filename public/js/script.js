// Example JavaScript code for your blog site

// Function to handle form submission for creating a new post
const handlePostFormSubmit = async (event) => {
    event.preventDefault();
  
    // Get form values
    const title = document.querySelector('#title').value.trim();
    const content = document.querySelector('#content').value.trim();
  
    // Create a new post object
    const newPost = {
      title,
      content,
    };
  
    try {
      // Send a POST request to create a new post
      const response = await fetch('/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newPost),
      });
  
      if (response.ok) {
        // Reload the page to see the new post
        document.location.reload();
      } else {
        // Handle the error case
        console.error('Failed to create a new post.');
      }
    } catch (err) {
      console.error(err);
    }
  };
  
  // Attach an event listener to the form submit event
  document.querySelector('#post-form').addEventListener('submit', handlePostFormSubmit);
  