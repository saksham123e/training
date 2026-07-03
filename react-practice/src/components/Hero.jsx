function Hero({ name, role, description }) {
  return (
    <section>
      <h1>Hello, I'm {name}</h1>
      <h3>{role}</h3>
      <p>{description}</p>
      <button>Contact Me</button>
    </section>
  );
}

export default Hero;