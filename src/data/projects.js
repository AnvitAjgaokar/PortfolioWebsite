const projects = {
  personal: [
    {
      name: 'Nexus CLI',
      description:
        'A developer productivity CLI tool written in Go that scaffolds backend projects with opinionated defaults — generates folder structures, Dockerfiles, Makefiles, and CI/CD templates in seconds.',
      techStack: ['Go', 'Cobra', 'Docker', 'GitHub Actions'],
      liveUrl: null,
      githubUrl: '#',
      highlight: '500+ GitHub stars',
    },
    {
      name: 'FastAPI Boilerplate',
      description:
        'Production-ready FastAPI starter with JWT auth, async PostgreSQL, Redis caching, Celery task queue, Docker Compose, and a comprehensive test suite. Used as the base for 3+ production apps.',
      techStack: ['Python', 'FastAPI', 'PostgreSQL', 'Redis', 'Docker', 'Pytest'],
      liveUrl: null,
      githubUrl: '#',
      highlight: '1.2K+ GitHub forks',
    },
    {
      name: 'Beacon Bot',
      description:
        'A Discord bot with an internal REST API that tracks developer activity, coding streaks, and sends personalized daily digests. Actively managing 3 communities with 2,000+ combined members.',
      techStack: ['Python', 'Discord.py', 'FastAPI', 'MongoDB', 'Redis'],
      liveUrl: '#',
      githubUrl: '#',
      highlight: '2,000+ active users',
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
