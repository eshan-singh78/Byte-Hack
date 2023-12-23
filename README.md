Byte-Hack: CTF Demo Prototype
Byte-Hack is a Capture The Flag (CTF) demo prototype, designed and developed to provide an immersive experience for both organizers and users. The project focuses on utilizing Express.js for the backend and server-side rendering with EJS for the frontend.

Technologies Used
Backend: Express.js
Frontend: Server-side rendering with EJS
Usage
To run this project locally, follow these steps:

Clone this repository to your local machine.
Ensure you have Node.js and npm installed.
Navigate to the project directory in your terminal.
Install the project dependencies using the command: npm install.
Open the app.js file in the project's root directory.
Change the MongoDB connection link to localhost.
javascript
Copy code
mongoose.connect('mongodb://localhost:your_db_name_here', { useNewUrlParser: true, useUnifiedTopology: true });
Modify the verification link domain name from https://byte-hack.onrender.com/ to localhost.
Save the changes in the app.js file.
Start the application using the command: npm start.
Access the application locally by visiting http://localhost:your_port_number_here in your web browser.
Demo
To view a live demo of this project, visit Byte-Hack Demo.

Feel free to explore the functionalities and features provided in this demo prototype!
