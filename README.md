# simple-full-stack-to-do-list

## How to Run the Frontend and Backend Applications Locally

### Prerequisites

- Ensure you have Node.js and npm installed on your machine.

### Running the Backend Application

1. **Navigate to the Backend Directory:**

   ```sh
   cd ./be
   ```

2. **Install Dependencies:**

   ```sh
   npm install
   ```

3. **Build the Backend Server:**

   ```sh
   npm run build
   ```

4. **Start the Backend Server:**

   ```sh
   npm start
   ```

   The backend application should now be running on `http://localhost:3001`.

### Running the Frontend Application

1. **Navigate to the Frontend Directory:**

   ```sh
   cd ./fe
   ```

2. **Install Dependencies:**

   ```sh
   npm install
   ```

3. **Start the Frontend Server:**

   ```sh
   npm start
   ```

   The frontend application should now be running on `http://localhost:3000`.

### Additional Notes

- Ensure that both the frontend and backend servers are running simultaneously for the application to function correctly.
- You may need to configure environment variables or settings files as required by your specific application setup.

### Developer Notes

- Both FE & BE have hot reload, look at the 'package.json' for the scripts to use to do this.
