
export interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
  type: 'Full-time' | 'Part-time' | 'Contract' | 'Remote';
  salary: string;
  posted: string;
  description: string;
  requirements: string[];
  responsibilities: string[];
  logoUrl: string;
  // We're going to use a default value in the component rather than changing this interface and related data
  // experience?: string;  
}

export const jobs: Job[] = [
  {
    id: 1,
    title: "Frontend React Developer",
    company: "TechCorp Inc.",
    location: "San Francisco, CA",
    type: "Full-time",
    salary: "$90,000 - $120,000",
    posted: "2 days ago",
    description: "We are looking for an experienced Frontend Developer with strong React skills to join our growing team. You will be responsible for developing and implementing user interface components using React.js concepts and workflows.",
    requirements: [
      "3+ years of experience with React.js",
      "Strong proficiency in JavaScript, HTML, and CSS",
      "Experience with responsive design",
      "Familiarity with RESTful APIs and modern front-end build pipelines"
    ],
    responsibilities: [
      "Develop new user-facing features using React.js",
      "Build reusable components and libraries for future use",
      "Optimize components for maximum performance across devices and browsers",
      "Collaborate with the design team to implement visual elements"
    ],
    logoUrl: "https://via.placeholder.com/150?text=TechCorp"
  },
  {
    id: 2,
    title: "Python Backend Developer",
    company: "DataSoft Solutions",
    location: "Remote",
    type: "Remote",
    salary: "$100,000 - $130,000",
    posted: "1 week ago",
    description: "Join our backend team to develop and maintain server-side applications using Python. You will work with databases, APIs, and collaborate with frontend developers to create seamless user experiences.",
    requirements: [
      "4+ years of experience with Python",
      "Knowledge of Flask or Django",
      "Experience with SQL databases",
      "Understanding of server-side templating languages"
    ],
    responsibilities: [
      "Design and implement low-latency, high-availability applications",
      "Implement security and data protection measures",
      "Integrate data storage solutions",
      "Create and maintain documentation"
    ],
    logoUrl: "https://via.placeholder.com/150?text=DataSoft"
  },
  {
    id: 3,
    title: "Full Stack Developer",
    company: "Innovate Labs",
    location: "New York, NY",
    type: "Full-time",
    salary: "$110,000 - $140,000",
    posted: "3 days ago",
    description: "We are seeking a Full Stack Developer to join our dynamic team. The ideal candidate should have experience with both frontend and backend technologies, with a strong focus on React.js and Python.",
    requirements: [
      "5+ years of experience in full-stack development",
      "Proficient in React.js, JavaScript, HTML, CSS",
      "Experience with Python, preferably Flask or Django",
      "Knowledge of database design and optimization"
    ],
    responsibilities: [
      "Develop and maintain web applications from front to back",
      "Collaborate with cross-functional teams",
      "Optimize applications for speed and scalability",
      "Implement responsive design principles"
    ],
    logoUrl: "https://via.placeholder.com/150?text=InnovateLabs"
  },
  {
    id: 4,
    title: "UX/UI Designer",
    company: "Creative Minds",
    location: "Austin, TX",
    type: "Contract",
    salary: "$85,000 - $100,000",
    posted: "1 day ago",
    description: "We're looking for a talented UX/UI Designer to create amazing user experiences. The ideal candidate should have a strong portfolio demonstrating their ability to create intuitive and visually appealing interfaces.",
    requirements: [
      "3+ years of experience in UX/UI design",
      "Proficiency in design tools such as Figma or Adobe XD",
      "Understanding of user research and usability principles",
      "Knowledge of HTML and CSS"
    ],
    responsibilities: [
      "Create wireframes, prototypes, and high-fidelity mockups",
      "Conduct user research and usability testing",
      "Collaborate with developers to implement designs",
      "Stay up-to-date with design trends and best practices"
    ],
    logoUrl: "https://via.placeholder.com/150?text=CreativeMinds"
  },
  {
    id: 5,
    title: "DevOps Engineer",
    company: "CloudTech Solutions",
    location: "Seattle, WA",
    type: "Full-time",
    salary: "$120,000 - $150,000",
    posted: "5 days ago",
    description: "Join our DevOps team to help build and maintain our cloud infrastructure. You will work with cutting-edge technologies to ensure our systems are reliable, scalable, and secure.",
    requirements: [
      "4+ years of experience in DevOps",
      "Strong knowledge of AWS or Azure",
      "Experience with CI/CD pipelines",
      "Familiarity with containerization technologies like Docker"
    ],
    responsibilities: [
      "Design and implement cloud infrastructure",
      "Automate deployment processes",
      "Monitor system performance and security",
      "Troubleshoot and resolve infrastructure issues"
    ],
    logoUrl: "https://via.placeholder.com/150?text=CloudTech"
  },
  {
    id: 6,
    title: "Data Scientist",
    company: "Analytics Pro",
    location: "Chicago, IL",
    type: "Full-time",
    salary: "$115,000 - $145,000",
    posted: "1 week ago",
    description: "We are looking for a Data Scientist to help us extract insights from our data. You will work with large datasets to solve complex problems and communicate findings to stakeholders.",
    requirements: [
      "Master's degree in Data Science, Statistics, or related field",
      "Experience with Python and data analysis libraries",
      "Knowledge of machine learning algorithms",
      "Strong statistical background"
    ],
    responsibilities: [
      "Analyze complex datasets to extract actionable insights",
      "Develop and implement machine learning models",
      "Create data visualizations to communicate findings",
      "Collaborate with cross-functional teams to implement solutions"
    ],
    logoUrl: "https://via.placeholder.com/150?text=AnalyticsPro"
  }
];
