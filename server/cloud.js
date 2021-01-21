const cloudinary = require("cloudinary").v2;
const config = require("config");

cloudinary.config({ 
    cloud_name: 'dmqwdeeva', 
    api_key: '629549453168697', 
    api_secret: '-_s6zRApbGmLHY-TYQZIq5vvoiU' 
  });
module.exports = {cloudinary};