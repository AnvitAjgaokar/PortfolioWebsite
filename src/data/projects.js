const projects = {
  personal: [

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
      githubUrl: 'https://github.com/AnvitAjgaokar/RustApplicationServer',
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
