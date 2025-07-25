# Learn Four - Online Programming Learning Platform 🚀

Welcome to **Learn Four**, an online platform designed to help learners master programming languages through coding challenges and dedicated courses. Whether you're just starting out or looking to deepen your knowledge, Learn Four offers an interactive space for users to learn, share, and grow together! 💡

<p align="center">
  <img src="/public/homepage.png" alt="Learn Four Homepage" style="width:100%; max-width:1000px;" />
</p>

<div align="center">
  <b>Explore, learn, and grow with interactive coding challenges and courses!</b>
</div>

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
- **Node.js version 22 or higher** is required.

### 🔧 Setup Instructions

1. **Initialize the Server**  
   Follow the instructions in the `README` file located in the `server-execute-code` folder to set up the server.

2. **Install Dependencies**  
   Run the following command to install the necessary packages:
    ```bash
    npm install
    ```
## 3. 🔑 Environment Variables

Before starting the application, make sure you have prepared all the necessary keys as outlined in the `.env.example` file. The application will not work without these keys.

**Note**: Ensure that the keys 
- **BLOB_READ_WRITE_TOKEN**: Token for Vercel Blob storage access.
- **CLERK_ISSUER_DOMAIN_CONVEX**: Clerk OAuth2 configuration.
- **CLERK_WEBHOOK_SECRET**: Clerk Webhook Secret for webhook security.
- **LIVEBLOCKS_SECRET_KEY**: Key for accessing Liveblocks API.

are added to the environment variables in **Convex** for proper integration.


## 4. 🚀 Start the Application

Once all dependencies are installed and environment variables are configured, you can start the application by running one of the following commands in the terminal:

```bash
npm run dev
# OR
pnpm dev
```
This will start the **Learn Four** application locally on your machine. You can visit the platform at [http://localhost:3000](http://localhost:3000) to begin using it.

## 5. 🖥️ Option to Run Code Using Judge0 Locally or via Rapid API

You have the option to run code either using **Judge0** locally or using **Rapid API** for a more up-to-date environment. 

- **Judge0 Locally**: If you choose to run the code locally, you'll be using older versions of programming language environments. This is done by running **Judge0** on your local machine.
  
- **Rapid API**: If you prefer to use a more modern, updated environment for programming languages, you can switch to **Rapid API**. Rapid offers more up-to-date language environments, which may be more suitable for certain cases.

To use **Rapid API**, you will need the following keys:
  - **RAPIDAPI_HOST**: The host for the Rapid API.
  - **RAPIDAPI_KEY**: Your personal key for accessing Rapid API services.

### Steps for Integration:
- The default environment in this project is set to run code locally using Judge0. However, you can change this to use Rapid by following these steps:
  - In the two files responsible for executing code (`executeCodeAtom`), you need to modify the function `runBatchedCode` (which runs locally) and switch it to `runBatchedCodeWithJudge0` (which runs using Rapid).

This will allow you to choose the environment that best suits your needs for code execution.

## 🤝 Support

If you have any contributions or questions, feel free to reach out to me via my social media channels:

- **Facebook**: [Duy Huynh](https://www.facebook.com/huynh.nhut.duy.249)
- **Instagram**: [@duynhut](https://www.instagram.com/duynhut.366/)

I am happy to assist you with any inquiries or feedback you may have! 😊

---

## 🙏 Thank You!

Thank you for checking out my project! I appreciate your time and interest in **Learn Four**. Let's continue to grow and build a vibrant learning community together! 🚀

