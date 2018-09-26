export default {
    API_URI: process.env.NODE_ENV === 'production'
    ? 'https://dogecodes-chat-api.herokuapp.com/v1'
    : 'http://localhost:8000/v1'
};