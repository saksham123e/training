import { useState } from "react";

function LoginStatus() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <section>
      <h2>Conditional Rendering Practice</h2>

      {isLoggedIn ? (
        <p>Welcome Saksham! You are logged in.</p>
      ) : (
        <p>Please login first.</p>
      )}

      <button onClick={() => setIsLoggedIn(!isLoggedIn)}>
        {isLoggedIn ? "Logout" : "Login"}
      </button>
    </section>
  );
}

export default LoginStatus;