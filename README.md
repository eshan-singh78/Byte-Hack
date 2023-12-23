# Byte-Hack: CTF Demo Prototype

Byte-Hack is a Capture The Flag (CTF) demo prototype, designed and developed to provide an immersive experience for both organizers and users. The project focuses on utilizing Express.js for the backend and server-side rendering with EJS for the frontend.

## Technologies Used

- **Backend:** Express.js
- **Frontend:** Server-side rendering with EJS

## Usage

To run this project locally, follow these steps:

1. Clone this repository to your local machine.
2. Ensure you have Node.js and npm installed.
3. Navigate to the project directory in your terminal.
4. Install the project dependencies using the command: `npm install`.
5. Open the `app.js` file in the project's root directory.
6. Change the MongoDB connection link to `localhost`.
   ```javascript
   mongoose.connect('mongodb+srv://byte-hack-user:bytehackdb-es@bytehack-db-es.ybloyrv.mongodb.net/bytehacktestdb-1?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
   ```
7. Modify the verification link domain name from `https://byte-hack.onrender.com/` to `localhost`.
8. Save the changes in the `app.js` file.
9. Start the application using the command: `npm start`.
10. Access the application locally by visiting `http://localhost:your_port_number_here` in your web browser.

## Demo

To view a live demo of this project, visit [Byte-Hack Demo](https://byte-hack.onrender.com/).

Feel free to explore the functionalities and features provided in this demo prototype!

---
