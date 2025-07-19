# Learn Four - Online Programming Learning Platform 🚀

Welcome to **Learn Four**, an online platform designed to help learners master programming languages through coding challenges and dedicated courses. Whether you're just starting out or looking to deepen your knowledge, Learn Four offers an interactive space for users to learn, share, and grow together! 💡

## 🛠️ Technologies Used

- **Frontend**:  
  - **Next.js** for server-side rendering and React framework  
  - **Shadcn** for component library  
  - **Tailwind CSS** for utility-first styling  
  - **Jotai** for state management  

- **Backend**:  
  - **Convex** for handling data processing and database management  

- **Code Editing and Execution**:  
  - **Monaco Editor** for a powerful, customizable code editor  
  - **Novel (Tiptap)** for text editing experience  
  - **Tldraw** for interactive whiteboard  

- **Realtime Features**:  
  - **YJS** (LiveBlock) for collaborative real-time interactions  

- **Code Execution**:  
  - **Judge0** for executing code in multiple languages (Java, C#, C++, Python, JavaScript)  

- **File and Image Storage**:  
  - **Vercel Blob** for file and image storage  

- **Authentication**:  
  - **Clerk** for OAuth2 authentication  

## 👥 User Roles

There are three user groups in **Learn Four**:

- **Users** (Learners):  
  Users who participate in programming challenges and courses to improve their coding skills.

- **Admins** (Admin & Super Admin):  
  Admins manage the platform and are responsible for creating challenges and courses.  
  Super Admins have additional permissions to manage Users and Admins.

## 🚀 Setup Instructions

To run the platform locally, follow the steps below:

### 🛠️ Requirements

- **Docker** is required on your machine (or use an Ubuntu 22.04 virtual machine) for optimal **Judge0** operation.
  
### 🔧 Setup Instructions

1. **Initialize the Server**  
   Follow the instructions in the `README` file located in the `server-execute-code` folder to set up the server.

2. **Install Dependencies**  
   Run the following command to install the necessary packages:
   ```bash
   npm install
