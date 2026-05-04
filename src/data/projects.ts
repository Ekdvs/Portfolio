import type { Project } from "../types";

export const projects: Project[] = [
  {
  id: 1,
  title: "Ticket Booking System (MyTickets)",
  tech: "React | TypeScript | Spring Boot | MongoDB | JWT | PayHere | Docker",
  description: "Full-stack event ticket booking platform with multi-role dashboards (User, Organizer, Admin), secure JWT & Google OAuth authentication, PayHere payment integration, QR-based ticket validation, PDF ticket generation, and real-time notifications. Deployed frontend on Vercel and backend on Render with MongoDB Atlas and Cloudinary storage.",
  image: ["ticket1.png","ticket2.png","ticket3.png","ticket4.png"],
  liveLink: "https://project-qt6jb.vercel.app/",
  githubLink: [
    "https://github.com/Ekdvs/My-Ticket-BOOKING",
    "https://github.com/Ekdvs/ticketing-system-backend"
  ],
  category: "fullstack"
},
  {
    id: 2,
    title: "Online Shopping Web App",
    tech: "MERN Stack | Socket.io | Stripe",
    description: "Full-stack e-commerce platform with real-time notifications, JWT authentication, secure Stripe payments, and order tracking. Frontend deployed on Vercel, backend on Render with MongoDB Atlas.",
    image: ["se1.png","se2.png","se3.png","se4.png"],
    liveLink: "https://online-shopping-frontend-zeta.vercel.app/",
    githubLink: ["https://github.com/Ekdvs/online-shopping-site-frontend","https://github.com/Ekdvs/online-shoping-site-backend"],
    category: "fullstack"
  },
  {
    id: 3,
    title: "Online computer shop Web ",
    tech: "MERN Stack | Socket.io | payHere",
    description: "Full-stack e-commerce platform with real-time notifications, JWT authentication, secure payhere payments, and order tracking.",
    image: ["cs1.png","cs2.png","cs3.png","cs4.png"],
    liveLink: "https://computer.ekdvs.xyz/",
    githubLink: ["https://github.com/Ekdvs/i-computers-frontend","https://github.com/Ekdvs/i-computers-backend"],
    category: "fullstack"
  },
  {
    id: 4,
    title: "Weather Forecast Web App",
    tech: "React | TypeScript | OpenWeather API",
    description: "Real-time weather app with city search, forecasts, caching, and responsive UI.",
    image: ["wa1.png","wa2.png","wa3.png"],
    liveLink: "https://wearther-app-three.vercel.app/",
    githubLink: "https://github.com/Ekdvs/wearther-app",
    category: "web"
  },
  {
    id: 5,
    title: "The Ceylon Traveler",
    tech: "React | Spring Boot | MongoDB",
    description: "Travel planning platform with booking, guides, payments, and account management.",
    image: ["t1.png","t2.png","t3.png"],
    liveLink: "https://ceylon-travelernetlifyapp.vercel.app/",
    githubLink: ["https://github.com/Ekdvs/Tour-Reservation-frontend","https://github.com/Ekdvs/online-travel-planning"],
    category: "fullstack"
  },
  {
    id: 6,
    title: "travel experience providers",
    tech: "Next.js | MERN Stack | TypeScript",
    description: "Platform for publishing and discovering local travel experiences.",
    image: ["te1.png","te2.png","te3.png","te4.png","te5.png"],
    liveLink: "https://travel-experience-platform.vercel.app",
    githubLink: "https://github.com/Ekdvs/travel-experience-platform",
    category: "fullstack"
  },
  {
    id: 7,
    title: "Notes App",
    tech: "React | MERN Stack | TypeScript",
    description: "Collaborative notes app with CRUD, search, pinning, and role-based access.",
    image: ["n1.png","n2.png","n3.png","n4.png","n5.png","n6.png"],
    liveLink: "",
    githubLink: "https://github.com/Ekdvs/Collaborative-Note-Taking-Web-App.git",
    category: "fullstack"
  },
  {
    id: 8,
    title: "TaskFlow Manager",
    tech: "Next.js | Spring Boot | MySQL | JWT",
    description: "Task management system with authentication and role-based access.",
    image: ["nt1.png","nt2.png","nt3.png","nt4.png","nt5.png"],
    liveLink: "",
    githubLink: "https://github.com/Ekdvs/TaskManager.git",
    category: "fullstack"
  },

  
  {
    id: 9,
    title: "Product Manager",
    tech: "Next.js | Tailwind CSS | TypeScript | Local Storage | Zod | Framer Motion",
    description: "A clean and responsive product management app with full CRUD functionality using localStorage. Includes search, dark mode, validation, and smooth UI animations.",
    image: ["pm1.png","pm2.png","pm3.png","pm4.png"],
    liveLink: "",
    githubLink: "https://github.com/Ekdvs/product-management",
    category: "web"
  },

 
  {
    id: 10,
    title: "FeedPulse - AI Feedback Platform",
    tech: "Next.js | Express | MongoDB | Google Gemini | Docker | TypeScript",
    description: "Full-stack AI-powered feedback management system where users submit feedback and Google Gemini automatically analyzes sentiment, priority, categories, and summaries. Includes JWT-auth admin dashboard, analytics charts, and Dockerized deployment.",
    image: ["fp1.png","fp2.png","fp3.png","fp4.png","fp5.png"],
    liveLink: "",
    githubLink: "https://github.com/Ekdvs/feedpulse",
    category: "fullstack"
  },

  {
    id: 11,
    title: "Wedding Planning - Emerald Weddings",
    tech: "PHP | MySQL | PHPMailer",
    description: "Wedding planning system with booking, email notifications, and admin dashboard.",
    image: ["w1.png","w2.png","w3.png","w4.png"],
    liveLink: "https://weddingplaning.rf.gd/",
    githubLink: "https://github.com/Ekdvs/Emerald-Weddings",
    category: "web"
  },
  {
    id: 12,
    title: "Rent-a-Car Service Management",
    tech: "C# | SQL Server | Windows Forms",
    description: "Desktop system for vehicle rental, inventory, and billing.",
    image: ["c1.png"],
    liveLink: "#",
    githubLink: "https://github.com/Ekdvs",
    category: "fullstack"
  },
  {
    id: 13,
    title: "Online Flower Selling",
    tech: "HTML | CSS | JavaScript | PHP",
    description: "Flower shop platform with cart and order management.",
    image: ["f1.png"],
    liveLink: "#",
    githubLink: "https://github.com/Ekdvs/lilylane",
    category: "web"
  },
  {
    id: 14,
    title: "Library Management System",
    tech: "C# | SQL Server | Windows Forms",
    description: "Library system with inventory and user tracking.",
    image: ["l1.png"],
    liveLink: "#",
    githubLink: "https://github.com/Ekdvs/Library-Management-System",
    category: "fullstack"
  }
];