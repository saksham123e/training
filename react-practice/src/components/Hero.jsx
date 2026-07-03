function Hero(props) {
  return (
    <section>
      <h1>Hello, I'm {props.name}</h1>

      <h3>{props.role}</h3>

      <p>{props.description}</p>

      <button>Contact Me</button>
    </section>
  );
}

export default Hero;