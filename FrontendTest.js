const axios = require('axios');

const testFrontend = async () => {
  try {
    const response = await axios.get('http://localhost:3000');
    console.log('Successfully loaded frontend:', response.data);
  } catch (error) {
    console.error('Error loading frontend:', error.message);
  }
};

testFrontend();
