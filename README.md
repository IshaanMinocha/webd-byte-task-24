# WebDev Byte Recruitment Task Demo '24

Live Link: [webd-byte-task-24.onrender.com](https://webd-byte-task-24.onrender.com)

## Task:

Build a system that restricts access to a page using a private route. Only users subscribed to B.Y.T.E.'s YouTube channel at YouTube or following the GitHub account at GitHub can access it.

 - Create a private route to check subscription/follow status.
 - Display user-friendly messages for unauthorized access.
 - Ensure accurate and consistent verification logic.
 - Prevent URL manipulation to bypass restrictions.

Deploy the subscription verification system for public access, allowing any user to verify their subscription or follow status and access the private route.

 - Deploy on platforms like Netlify, Vercel, Render, or Cloudflare.
 - Ensure scalability and performance for handling multiple users.
 - Securely handle user data and authentication.
 - Prevent unauthorized access post-deployment.


### Process Flow

1. go to website and then on private page (public page will be accessible by default)
2. click on appropriate buttons to check if user is subscribed to youtube channel and following github account
3. if not both of above requirements met then button will stay disabled
3. after both steps done and verified diabled button will be accessible and user can view private page
4. if anyone tries to access /private directly they will be thrown to /unauthorized
5. thankyou