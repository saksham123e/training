function Projects() {
  const projects = [
    {
      id: 1,
      title: "Reporting Dashboard",
      description: "Dashboard with filters, CSV export, search, and polished UI.",
    },
    {
      id: 2,
      title: "CSV Import Framework",
      description: "Reusable CSV import system with validation and history.",
    },
    {
      id: 3,
      title: "React Practice Website",
      description: "Practice project for components, props, state, and events.",
    },
  ];

  return (
    <section>
      <h2>Projects</h2>

      {projects.map((project) => (
        <div key={project.id}>
          <h3>{project.title}</h3>
          <p>{project.description}</p>
          <button>View Project</button>
          <hr />
        </div>
      ))}
    </section>
  );
}

export default Projects;