# Messiah House Nonprofit Project

## Overview

Messiah House is a nonprofit organization dedicated to supporting individuals in need through various community-driven services. This project focuses on building a web presence that effectively communicates the organization's mission, services, and opportunities for involvement.

## My Contributions

As part of my internship as a recent graduate, I contributed to the following areas:

- **Wireframe Design:** Developed the structural layout of the website, ensuring a user-friendly experience and clear navigation. Styled the wireframe using **Canva**.
- **Homepage Development:** Implemented key sections to introduce Messiah House and engage visitors.
  - **Hero Section:** A welcoming banner with a compelling message.
  - **Mission Statement:** Clearly outlines the nonprofit’s purpose and values.
  - **Services Section:** Highlights the core programs and support provided by Messiah House.
  - **Get Involved Section:** Encourages user engagement with clear calls to action for volunteering and donations.

## Technologies Used

- **Next.js** and **React.js** for front-end development
- **Tailwind CSS**, **Custom CSS and Resets**, and **DaisyUI** for styling
- **Canva** for wireframe design

## Next Steps

- Expanding the website with additional pages such as an **About Us**, **Impact Stories**, and **Contact Page**.
- Enhancing accessibility and responsiveness for a seamless user experience across all devices.
- Integrating a donation platform for secure online contributions.
- Improving SEO and performance optimization.

## Reflections & Learnings

This project provided valuable hands-on experience in:

- Structuring and designing nonprofit websites to maximize engagement.
- Implementing clear and compelling calls to action.
- Enhancing collaboration and communication in a professional setting.

## Acknowledgments

A big thank you to the Messiah House team for the opportunity to contribute to this meaningful initiative. Special appreciation to my mentors and peers for their guidance and support throughout the project.

---

_This README serves as documentation of my work and contributions to the Messiah House nonprofit website as part of my internship experience._

## Getting Started

First, clone project and install dependencies:

```bash
git clone <your-github-url>
npm install
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

# Messiah House Community Development Corporation (MHCDC) - Part 2

## Overview

This phase of the Messiah House Community Development Corporation (MHCDC) project focused on completing the remaining public pages, implementing key components, and enhancing the footer functionality. The updates included:

- Completing the **About**, **Gallery**, **Events**, **Services**, and **Volunteer** pages.
- Developing and integrating the **VolunteerForm**, **ContactForm**, **JoinAProgram**, and **GalleryDisplay** components.
- Enhancing the **Footer** component to dynamically display services and handle hash navigation for seamless in-page scrolling.

## Implemented Pages

### 1. About Page (`about.js`)

- Displays the mission and vision of MHCDC.
- Includes sections for the **Founder**, **Mission Statement**, and **Meet the Developer**.
- Integrates the **ContactForm** component.
- Uses the `GetInvolvedCTA` component to encourage participation.

### 2. Events Page (`events.js`)

- Features an embedded Google Calendar displaying upcoming events.
- Utilizes the `Header` component to provide an introduction to the events section.

### 3. Gallery Page (`gallery.js`)

- Showcases community images through the **GalleryDisplay** component.
- Uses Tailwind CSS styling to enhance the presentation.

### 4. Services Page (`service.js`)

- Details various programs and initiatives offered by MHCDC.
- Implements the `Programs` component for structured service categories.
- Uses `JoinProgramCTA` and `GetInvolvedCTA` to encourage engagement.
- Implements smooth scrolling for section navigation using hash-based routing in Next.js.

### 5. Volunteer Page (`volunteer.js`)

- Provides a volunteer signup form through the `VolunteerForm` component.
- Styled for user-friendly engagement.

## Component Enhancements

### 1. Footer Component (`footer.jsx`)

- Dynamically fetches services from the API (`/api/services`) and lists them.
- Implements **hash navigation handling** for smooth scrolling when clicking service links.
- Displays company details, contact information, and social links.

## Key Features

- **Dynamic Footer:** Fetches service categories and enables smooth in-page navigation.
- **Hash Navigation Handling:** Ensures users are smoothly scrolled to the relevant section when navigating within a page.
- **Modular Components:** Encourages code reusability and separation of concerns.
- **Google Calendar Integration:** Provides an easy way for users to stay informed about upcoming events.
- **Responsive Design:** Ensures accessibility across different devices and screen sizes.
- **Optimized Performance:** Enhanced image handling and caching strategies for better user experience.

## Next Steps

- Implement authentication-based access for administrative content.
- Further optimize performance and accessibility.
- Improve SEO for better visibility and search ranking.

# Messiah House Community Development Corporation (MHCDC) - Part 3

## Overview

In this phase of the MHCDC project, we focused on implementing authentication and creating a secure admin portal for managing various aspects of the non-profit organization. This involved integrating Firebase Authentication, setting up an authentication context, and implementing protected routes for admins and employees.

## Features Implemented

- **Firebase Authentication**: Secure login and authentication system.
- **Admin & Employee Portal**: Restricted-access portal for managing blogs, programs, and volunteers.
- **Authentication Context (AuthProvider)**: Centralized authentication state management.
- **Protected Routes**: Restricts access to authenticated users.
- **Admin Dashboard**: Home page for logged-in users with role-based access.
- **Blog Management**: Admin interface for creating and managing blog content.
- **Program Management**: Admin interface to oversee program signups.
- **Volunteer Management**: View and manage volunteer signups.

---

## Firebase Authentication Setup

To handle user authentication, Firebase Authentication was integrated into the project. Below are the steps for setting up Firebase authentication:

### 1. Configure Firebase

- Create a Firebase project in the [Firebase Console](https://console.firebase.google.com/).
- Enable **Email/Password Authentication** in the Firebase Authentication settings.
- Retrieve Firebase configuration credentials from the Firebase Console and add them to the `.env.local` file:

  ```env
  NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
  NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
  NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
  NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
  NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
  NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
  NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your_measurement_id
  ```

### 2. Initialize Firebase in `config/firebase.js`

```javascript
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;
```

### 3. Create Authentication Context (`context/AuthProvider.js`)

```javascript
import { auth } from "@/config/firebase";
import { onAuthStateChanged, signOut, getIdToken } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        try {
          const token = await getIdToken(currentUser, true);
          localStorage.setItem("token", token);
          setUser(currentUser);
        } catch (error) {
          console.error("Token refresh error: ", error);
          handleLogout(false);
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    localStorage.removeItem("token");
    setUser(null);
    router.push("/login");
  };

  return (
    <AuthContext.Provider value={{ user, loading, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
```

### 4. Implement Protected Routes (`components/ProtectedRoute.js`)

```javascript
import { useAuth } from "@/context/AuthProvider";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.replace("/login");
      } else {
        setAuthChecked(true);
      }
    }
  }, [user, loading, router]);

  if (loading || !authChecked) {
    return (
      <p className="text-center text-2xl font-semibold text-info">
        Checking authentication...
      </p>
    );
  }

  return <>{children}</>;
}
```

---

## Admin Portal Pages

### \*\*1. Admin Dashboard (`/portal/index.js`)

- Displays a welcome message and navigation options for admins and employees.
- Role-based access for adding events and registering users.

### \*\*2. Blog Management (`/portal/blogs.js`)

- Allows admins to create and manage blog content.
- Uses `BlogSection` component for blog operations.

### \*\*3. Program Management (`/portal/programs.js`)

- Lists all programs and signups.
- Uses `ProgramsTable` for data display.

### \*\*4. Volunteer Management (`/portal/volunteers.js`)

- Displays volunteer signups.
- Uses `VolunteerTable` component for data management.

---

This marks a significant step in building a secure and efficient portal for the MHCDC organization. 🚀

# Messiah House Project - Final Phase

## Overview

The final phase of the Messiah House project involved integrating a custom Express backend deployed on Render, utilizing Firestore for data storage and Firebase Authentication for secure user management. Additionally, email notifications were implemented using Resend via a Next.js API route. This document details the key steps taken in this phase.

---

## 1. Backend Integration

The Express backend was deployed on Render and connected to Firestore for data storage. Firebase Authentication was used to manage user authentication.

### `.env` Configuration Example:

```env
NEXT_PUBLIC_BACKEND_URL=https://your-backend-api.com
NEXT_PUBLIC_RESEND_API_KEY=your-resend-api-key
CLIENT_EMAIL=your-email@example.com
```

### Fetching Data in the Frontend

- The `VolunteerTable` and `ProgramsTable` components fetch data from the Express backend using the `NEXT_PUBLIC_BACKEND_URL` variable.
- Authentication tokens stored in `localStorage` are included in request headers to ensure secure API access.
- Error handling and loading states were implemented for a smooth user experience.

Example Fetch Request:

```javascript
const response = await fetch(`${BACKENDURL}/api/volunteers`, {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  },
});
```

---

## 2. Email Notifications via Resend

### Setup:

- Resend was configured to send notifications when users submit **contact**, **volunteer**, or **program** forms.
- The Next.js API route (`/api/program.js`) handles Resend email notifications.

### Example Resend Email Logic in Next.js API Handler:

```javascript
import { Resend } from "resend";

const resend = new Resend(process.env.NEXT_PUBLIC_RESEND_API_KEY);
const clientEmail = process.env.CLIENT_EMAIL;

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { name, email, program } = req.body;

  if (!name || !email || !program) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const emailHTML = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #ddd; border-radius: 10px;">
      <div style="background-color: #007bff; color: #fff; padding: 20px; text-align: center;">
        <h2 style="margin: 0;">📝 New Program Signup</h2>
      </div>
      <div style="padding: 20px;">
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Program:</strong> ${program}</p>
      </div>
    </div>`;

  try {
    const emailResponse = await resend.emails.send({
      from: "Acme <onboarding@resend.dev>",
      to: clientEmail,
      subject: "New Program Signup Notification",
      html: emailHTML,
    });

    return res
      .status(200)
      .json({ message: "Signup notification sent", emailResponse });
  } catch (error) {
    console.error("Error sending email:", error);
    return res.status(500).json({ error: "Failed to send notification" });
  }
}
```

---

## 3. Implementing Table Components

Tables were created to manage and display:

- Volunteer signups (`VolunteerTable`)
- Program applications (`ProgramsTable`)

### Features:

✅ Filtering by status (Active, Pending, Approved, Rejected, etc.)  
✅ Sorting by name, email, phone, and program  
✅ Dropdown for updating statuses dynamically  
✅ Interactive UI built using Tailwind CSS & DaisyUI

Example Status Update Function:

```javascript
const updateStatus = async (id, newStatus) => {
  try {
    const response = await fetch(`${BACKENDURL}/api/volunteers/${id}/status`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ status: newStatus }),
    });
    if (!response.ok) throw new Error("Failed to update status");
  } catch (error) {
    console.error("Error updating status:", error);
  }
};
```

---

## 4. Finalizing the Project

### ✅ Deployment

- The frontend was deployed using **Vercel**.
- The Express backend was hosted on **Render**.
- Environment variables were configured for production.

### ✅ Debugging & Testing

- API routes were tested using **Postman**.
- UI elements were checked for **responsiveness and accessibility**.
- Edge cases (e.g., incorrect API responses, form validation errors) were handled.

### ✅ Design Fixes

- Consistent UI styling was ensured using **DaisyUI themes**.
- Mobile responsiveness was improved.

---

## Conclusion

This final phase successfully integrated a custom Express backend hosted on Render, added email notifications using a Next.js API route, built structured tables, and deployed the project. The Messiah House portal is now fully functional for managing volunteer and program signups efficiently.
