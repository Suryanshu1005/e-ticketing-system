## Available Scripts

To run the project:
Backend:
### nodemon index.js

frontend:
### PORT=3001 npm start

Remember to update the .env.local file to .env and use the correct values for each env (backend and frontend).

### Functionalities
- Register a new user.
- Login with the registered user.
- Create a new event.
- Browse through the event list.
- View Event Details.
- Book event tickets.
- Already booked seats are disabled (User can not book same seats).
- Multi-Steps ticket booking system.
- JWT based authentication.
- Logout functionality.

### Scope for Improvement
- Better UI.
- Add an option for user profiles so user can update their data.
- Instead of using local storage to store the token we can use a cookie.
- We can implement a comprehensive barcode facility which will contain complete information about the ticket booked by a user for an event.
- Payment Gateway.
