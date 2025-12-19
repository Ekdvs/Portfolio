import type { Project } from "../types";


export const projects: Project[] = [
  {
    id: 1,
    title: "Online Shopping Web App",
    tech: "MERN Stack | Socket.io | Stripe",
    description: "Full-stack e-commerce platform with real-time notifications, JWT authentication, secure Stripe payments, and order tracking. Frontend deployed on Vercel, backend on Render with MongoDB Atlas.",
    image: ["/image.png","/image.png2","/image.png"],
    liveLink: "https://online-shopping-site-frontend.vercel.app/",
    githubLink: "https://github.com/Ekdvs",
    category: "fullstack"
  },
  {
    id: 2,
    title: "Weather Forecast Web App",
    tech: "React, TypeScript, OpenWeather API",
    description: "Real-time weather application with city search, 5-day forecast carousel, hourly weather cards, React Query caching, and fully responsive design. Deployed on Netlify.",
    image: ["/images/projects/weather-app.jpg"],
    liveLink: "https://ekdvs-wearther-apps.netlify.app/",
    githubLink: "https://github.com/Ekdvs",
    category: "web"
  },
  {
    id: 3,
    title: "The Ceylon Traveler",
    tech: "React, Spring Boot, MongoDB",
    description: "Comprehensive travel planning platform with package booking, tour guides, secure payment gateway integration, and complete user account management system.",
    image: ["/images/projects/ceylon-traveler.jpg"],
    liveLink: "https://ceylon-travelernetlifyapp.vercel.app/",
    githubLink: "https://github.com/Ekdvs",
    category: "fullstack"
  },
  {
    id: 4,
    title: "Wedding Planning - Emerald Weddings",
    tech: "PHP, MySQL, PHPMailer",
    description: "Complete wedding planning solution with user registration, booking management, automated email notifications via PHPMailer, and admin dashboard built with PHP & MySQL.",
    image: ["/images/projects/wedding-planner.jpg"],
    liveLink: "https://weddingplaning.rf.gd/",
    githubLink: "https://github.com/Ekdvs",
    category: "web"
  },
  {
    id: 5,
    title: "Rent-a-Car Service Management",
    tech: "C#, SQL Server, Windows Forms",
    description: "Desktop application for vehicle rental management with customer tracking, vehicle inventory, rental returns processing, and comprehensive billing system.",
    image: ["/images/projects/rent-car.jpg"],
    liveLink: "#",
    githubLink: "https://github.com/Ekdvs",
    category: "fullstack"
  },
  {
    id: 6,
    title: "Online Flower Selling",
    tech: "HTML, CSS, JavaScript, PHP",
    description: "E-commerce platform for flower shop with product listings, shopping cart functionality, order management, and basic admin panel using PHP and MySQL.",
    image: ["/images/projects/flower-shop.jpg"],
    liveLink: "#",
    githubLink: "https://github.com/Ekdvs",
    category: "web"
  }
];