# Use the official Node.js 20 image as the base image
FROM node:20

# Set the maintainer label with the author's name and email
LABEL maintainer="Nicolas Biermez <he201993@students.ephec.be>"

# Create a new user named 'infolab' with user ID 1001 and set the shell to /bin/sh
# The -m option creates a home directory for the user
RUN useradd -ms /bin/sh -u 1001 infolab

# Switch to the newly created user 'infolab' to avoid running as root
USER infolab

# Set the working directory to /infolab within the container
WORKDIR /infolab

# Install dependencies:
# Copy the package.json and package-lock.json files into the working directory
# and change their ownership to the 'infolab' user and group
COPY --chown=infolab:infolab package.json package-lock.json ./

# Run npm install to install dependencies listed in package.json
RUN npm install

# Copy all source files from the local context into the container's working directory
# and change ownership to the 'infolab' user and group
COPY --chown=infolab:infolab . /infolab

# Expose port 3000 for the application, allowing external access to this port
EXPOSE 3000

# Command to run the development server using npm
# The application will start by running the 'dev' script defined in package.json
CMD ["npm", "run", "dev"]
