import { useState } from "react";

function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  return (
    <section>
      <h2>Contact Form</h2>

      <input
        type="text"
        placeholder="Enter Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <br />
      <br />

      <input
        type="email"
        placeholder="Enter Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <br />
      <br />

      <textarea
        placeholder="Enter Message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      ></textarea>

      <br />
      <br />

      <button>Submit</button>

      <hr />

      <h3>Live Preview</h3>

      <p>Name : {name}</p>

      <p>Email : {email}</p>

      <p>Message : {message}</p>
    </section>
  );
}

export default ContactForm;