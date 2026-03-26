const experience = [
  {
    company: 'Finova Technologies',
    role: 'Backend Engineer',
    duration: 'Jan 2024 – Present',
    type: 'Full-time',
    descriptions: [
      'Designed and shipped a high-throughput transaction processing service in Go, handling 500K+ events/day with P99 latency under 50ms',
      'Reduced API response times by 60% through strategic Redis caching, query optimization, and connection pooling',
      'Led migration of 3 legacy Python services to a unified FastAPI architecture, improving maintainability and cutting error rates by 35%',
      'Implemented async job queue using Celery + Redis, decoupling heavy workloads from the request lifecycle',
    ],
    techStack: ['Go', 'Python', 'FastAPI', 'PostgreSQL', 'Redis', 'Docker', 'AWS', 'Celery'],
  },
  {
    company: 'DevSpark Labs',
    role: 'Junior Backend Developer',
    duration: 'Jun 2023 – Dec 2023',
    type: 'Full-time',
    descriptions: [
      'Built REST APIs for a B2B SaaS product using Express.js and MongoDB, serving 50+ enterprise clients',
      'Designed database schemas and wrote complex aggregation pipelines reducing reporting query times by 45%',
      'Integrated third-party payment providers (Stripe, PayPal) with idempotent webhook handlers',
      'Containerized the entire dev environment with Docker Compose, cutting new developer onboarding time in half',
    ],
    techStack: ['Node.js', 'Express.js', 'MongoDB', 'Docker', 'Stripe API', 'JWT', 'AWS S3'],
  },
];

export default experience;
