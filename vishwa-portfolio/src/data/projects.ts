import type { Project } from "../types";


export const projects: Project[] = [
  {
    id: 1,
    title: "Online Shopping Web App",
    tech: "MERN Stack | Socket.io | Stripe",
    description: "Full-stack e-commerce platform with real-time notifications, JWT authentication, secure Stripe payments, and order tracking. Frontend deployed on Vercel, backend on Render with MongoDB Atlas.",
    image: ["/se1.png","/se2.png","/se3.png","/se4.png"],
    liveLink: "https://online-shopping-frontend-zeta.vercel.app/",
    githubLink: ["https://github.com/Ekdvs/online-shopping-site-frontend","https://github.com/Ekdvs/online-shoping-site-backend"],
    category: "fullstack"
  },
  {
    id: 2,
    title: "Online computer shop Web ",
    tech: "MERN Stack | Socket.io | payHere",
    description: "Full-stack e-commerce platform with real-time notifications, JWT authentication, secure payhere payments, and order tracking. Frontend deployed on Vercel, backend on Render with MongoDB Atlas.",
    image: ["/de.png","/de.png2","/de.png"],
    liveLink: "#",
    githubLink: ["https://github.com/Ekdvs/i-computers-frontend","https://github.com/Ekdvs/i-computers-backend"],
    category: "fullstack"
  },
  {
    id: 3,
    title: "Weather Forecast Web App",
    tech: "React | TypeScript | OpenWeather API",
    description: "Real-time weather application with city search, 5-day forecast carousel, hourly weather cards, React Query caching, and fully responsive design. Deployed on Netlify.",
    image: ["/wa1.png","/wa2.png","/wa3.png"],
    liveLink: "https://wearther-app-three.vercel.app/",
    githubLink: "https://github.com/Ekdvs/wearther-app",
    category: "web"
  },
  {
    id: 4,
    title: "The Ceylon Traveler",
    tech: "React | Spring Boot | MongoDB",
    description: "Comprehensive travel planning platform with package booking, tour guides, secure payment gateway integration, and complete user account management system.",
    image: ["/t1.png","/t2.png","/t3.png"],
    liveLink: "https://ceylon-travelernetlifyapp.vercel.app/",
    githubLink: ["https://github.com/Ekdvs/Tour-Reservation-frontend","https://github.com/Ekdvs/online-travel-planning"],
    category: "fullstack"
  },
  {
    id: 5,
    title: "Wedding Planning - Emerald Weddings",
    tech: "PHP | MySQL | PHPMailer",
    description: "Complete wedding planning solution with user registration, booking management, automated email notifications via PHPMailer, and admin dashboard built with PHP & MySQL.",
    image: ["/w1.png","/w2.png","/w3.png","/w4.png"],
    liveLink: "https://weddingplaning.rf.gd/",
    githubLink: "https://github.com/Ekdvs/Emerald-Weddings",
    category: "web"
  },
  {
    id: 6,
    title: "Rent-a-Car Service Management",
    tech: "C# | SQL Server | Windows Forms",
    description: "Desktop application for vehicle rental management with customer tracking, vehicle inventory, rental returns processing, and comprehensive billing system.",
    image: ["/c1.png"],
    liveLink: "#",
    githubLink: "https://github.com/Ekdvs",
    category: "fullstack"
  },
  {
    id: 7,
    title: "Online Flower Selling",
    tech: "HTML | CSS | JavaScript | PHP",
    description: "E-commerce platform for flower shop with product listings, shopping cart functionality, order management, and basic admin panel using PHP and MySQL.",
    image: ["f1.png"],
    liveLink: "#",
    githubLink: "https://github.com/Ekdvs/lilylane",
    category: "web"
  },
  {
    id: 8,
    title: "Libary Management Service Management",
    tech: "C# | SQL Server |  Windows Forms",
    description: "Desktop application for vehicle rental management with customer tracking, vehicle inventory, rental returns processing, and comprehensive billing system.",
    image: ["l1.png"],
    liveLink: "#",
    githubLink: "https://github.com/Ekdvs/Library-Management-System",
    category: "fullstack"
  },
];