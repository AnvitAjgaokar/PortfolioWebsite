const projects = {
  // Set to false to hide the Professional tab entirely — no code change required.
  showProfessional: false,

  personal: [

    {
      name: 'Be-Park',
      description:
        'A pre-booking and parking management platform built to address the real friction of unorganised parking at large venues. Users reserve a spot before arrival; the Django backend manages availability, bookings, and state, while the Flutter mobile app serves as the client interface. Separate frontend and backend repositories.',
      techStack: ['Flutter', 'Django', 'Python'],
      liveUrl: null,
      githubUrl: 'https://github.com/AnvitAjgaokar/Be-Park-Backend',
      highlight: 'Built to solve real chaos',
    },

    {
      name: 'KT Document RAG',
      description:
        'A Retrieval-Augmented Generation pipeline built as a hobby and deliberate learning exercise. Indexes Knowledge Transfer documents and enables natural language querying over them — built end-to-end in Python to understand embeddings, vector retrieval, and LLM orchestration from first principles rather than abstracted APIs.',
      techStack: ['Python', 'RAG'],
      liveUrl: null,
      githubUrl: 'https://github.com/AnvitAjgaokar/KT-RAG',
      highlight: 'Deep-dive into RAG internals',
    },

    {
      name: 'Blog Platform Backend',
      description:
        'Production-grade REST API for a full-featured blog platform, built with enterprise concerns from the ground up. Implements configurable filter-level encryption, centralised global exception handling, JWT-based authentication, and a clean layered architecture — designed to the same standards expected of a commercial deployment.',
      techStack: ['Java', 'Spring Boot', 'PostgreSQL', 'JWT'],
      liveUrl: null,
      githubUrl: 'https://github.com/AnvitAjgaokar/BlogSite-Backend',
      highlight: 'Enterprise-grade from day one',
    },

    {
      name: 'GRE Vocab',
      description:
        'A React flashcard app built for a friend prepping for the GRE. Covers vocabulary through spaced-repetition-style cards and built-in tests. Fully frontend — all word data lives in JSON files, no backend required.',
      techStack: ['React', 'JSON'],
      liveUrl: null,
      githubUrl: 'https://github.com/AnvitAjgaokar/GreVocab',
      highlight: 'Built for a friend',
    },
    {
      name: 'Rust Application Server',
      description:
        'A ground-up HTTP application server written in Rust, built to demystify how enterprise application servers like Weblogic handle request lifecycles, thread management, and WAR/JAR deployments — driven by first-hand production experience with Java EE.',
      techStack: ['Rust'],
      liveUrl: null,
      githubUrl: 'https://github.com/AnvitAjgaokar/RustApplicationServer/tree/first-iteration',
      highlight: 'Built to understand the internals',
    },
    {
      name: 'Load Balancer Simulator',
      description:
        'An interactive simulator that models real-world load balancing behaviour across multiple server nodes. Supports configurable algorithms (Round Robin, Least Connections, etc.), allowing users to observe how traffic distribution and server load evolve under different strategies.',
      techStack: ['React', 'JavaScript'],
      liveUrl: null,
      githubUrl: 'https://github.com/AnvitAjgaokar/Load-Balancer-Simulator',
      highlight: 'Visual systems learning tool',
    },
    {
      name: 'Dimension Explorer',
      description:
        'A Python-based 3D engine built out of curiosity in physics — renders and visualizes higher-dimensional geometry in real time. Implements projection math from scratch to map 3D (and beyond) coordinate spaces onto a 2D viewport.',
      techStack: ['Python', 'NumPy', 'Pygame'],
      liveUrl: null,
      githubUrl: 'https://github.com/AnvitAjgaokar/Dimension-Exploere',
      highlight: 'Physics curiosity project',
    },
    {
      name: 'Roboroamer',
      description:
        'An Arduino Uno-based rover with real-time collision detection via ultrasonic sensors. The differentiating choice: rather than relying on any off-the-shelf controller, a purpose-built Flutter application was developed from scratch to stream directional commands to the car — full hardware-software integration with no third-party control software in the loop.',
      techStack: ['Flutter', 'Arduino', 'C++'],
      liveUrl: null,
      githubUrl: 'https://github.com/AnvitAjgaokar/Roboroamer3',
      highlight: 'Zero off-the-shelf software',
    },



  ],
  professional: [
    {
      name: 'Transaction Event Service',
      description:
        'Core financial event processing microservice at Finova Technologies. Ingests, validates, and routes 500K+ daily transaction events with exactly-once delivery guarantees and a full audit trail.',
      techStack: ['Go', 'PostgreSQL', 'Redis', 'Kafka', 'Docker', 'AWS'],
      impact: 'Handles $2M+ in daily transaction volume with 99.98% uptime',
      highlight: '60% latency reduction',
    },
    {
      name: 'Analytics Data Pipeline',
      description:
        'Batch + streaming ETL pipeline aggregating product usage metrics from 15+ microservices into a centralized analytics warehouse. Powers the executive dashboard and client-facing reports.',
      techStack: ['Python', 'Celery', 'PostgreSQL', 'AWS S3', 'AWS Lambda', 'Pandas'],
      impact: 'Reduced report generation time from 45 minutes to under 3 minutes',
      highlight: '93% time reduction',
    },
  ],
};

export default projects;
