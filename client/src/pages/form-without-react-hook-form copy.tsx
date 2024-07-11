import axios from "axios";
import { FormEvent, useState } from "react";

const FormWithoutReactHookForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (password !== confirmPassword) {
      setErrors(["Password and confirm password must match"]);
      setIsSubmitting(false);
      return;
    }

    try {
      setErrors([]);
      await axios.post("http://localhost:5100/api/v1/auth/register", {
        email,
        password,
        confirmPassword,
      });

      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setIsSubmitting(false);
      alert("Registration successful!");
    } catch (error) {
      console.error("Registration failed:", error);
      setIsSubmitting(false);
      alert("Registration failed. Please try again.");
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} className="form">
        {errors.length > 0 && (
          <ul>
            {errors.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        )}
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          type="email"
          placeholder="Email"
        />
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          type="password"
          placeholder="Password"
        />
        <input
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          type="password"
          placeholder="Confirm Password"
        />
        <button
          disabled={isSubmitting}
          type="submit"
          className={isSubmitting ? "submitting" : ""}
        >
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default FormWithoutReactHookForm;
