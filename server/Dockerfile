# Step 1: Use an official light Node.js runtime environment
FROM node:20-alpine

# Step 2: Set the working directory inside the container
WORKDIR /app

# Step 3: Copy package configuration files first (highly optimized for layer caching)
COPY package*.json ./

# Step 4: Install only production dependencies (skips devDependencies like nodemon and kill-port)
RUN npm install

# Step 5: Copy the remaining source files (like your index.js) into the container
COPY . .

# Step 6: Expose the port your Express app uses internally
EXPOSE 5000

# Explicitly use node to launch index.js directly to avoid npm script resolution bugs
CMD ["node", "index.js"]



