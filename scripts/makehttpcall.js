

async function makeHttpPostRequest(url, data) {
  try {
    const response = await axios.post(url, data);
    return response.data;
  } catch (error) {
    console.error('Error making HTTP POST request:', error);
    throw error;
  }
}
