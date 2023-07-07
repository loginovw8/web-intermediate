const axios = require('axios');

test('data message is hello world', async () => {
    const response = await axios.get('http://localhost:3000/');
    expect(response.status).toBe(200);
    expect(response.data.message).toBe('Hello, World!');
});
