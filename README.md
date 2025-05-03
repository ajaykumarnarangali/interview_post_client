# Client-side for post blog

This is the client-side application for post blog, built with React and Tailwind CSS.

## Requirements

- **Node.js** (version 14 or above recommended)
- **npm** or **yarn** (for managing packages)

 ## Installation

 Clone the repository:  git clone <repository-url>

 Install the necessary dependencies: npm install

 configuration is added under the server section:

 export default defineConfig({
 
  plugins: [react()],
  
  server: {
  
    proxy: {
    
      '/api': {
      
        target: 'http://localhost:3000' // your server url 
        
      }
      
    }
    
  }
})
  start the server : npm run dev
