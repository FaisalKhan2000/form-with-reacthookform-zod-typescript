import axios from "axios";
import { FieldValues, useForm } from "react-hook-form";

const FormWithReactHookForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    getValues,
  } = useForm();

  const onSubmit = async (data: FieldValues) => {
    try {
      await axios.post("http://localhost:5100/api/v1/auth/register", data);
      alert("Registration successful!");
      reset();
    } catch (error) {
      console.error("Registration failed:", error);
      alert("Registration failed. Please try again.");
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit(onSubmit)} className="form">
        <input
          {...register("email", { required: "Email is required" })}
          type="email"
          placeholder="Email"
        />
        {errors.email && <p>{`${errors.email.message}`}</p>}

        <input
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 10,
              message: "Password must be at least 10 characters long",
            },
          })}
          type="password"
          placeholder="Password"
        />
        {errors.password && <p>{`${errors.password.message}`}</p>}

        <input
          {...register("confirmPassword", {
            required: "Confirm password is required",
            validate: (value) =>
              value === getValues("password") || "Passwords do not match",
          })}
          type="password"
          placeholder="Confirm Password"
        />
        {errors.confirmPassword && <p>{`${errors.confirmPassword.message}`}</p>}

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

export default FormWithReactHookForm;
