import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useForm } from "react-hook-form";
import { z } from "zod";

const signUpSchema = z
  .object({
    email: z.string().email(),
    password: z
      .string()
      .min(10, "Password must be at least 10 characters long"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "password do not match",
    path: ["confirmPassword"],
  });

type TSignUpSchema = z.infer<typeof signUpSchema>;

const FormWithReactHookFormAndZod = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<TSignUpSchema>({
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit = async (data: TSignUpSchema) => {
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
        <input {...register("email")} type="email" placeholder="Email" />
        {errors.email && <p>{`${errors.email.message}`}</p>}

        <input
          {...register("password")}
          type="password"
          placeholder="Password"
        />
        {errors.password && <p>{`${errors.password.message}`}</p>}

        <input
          {...register("confirmPassword")}
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

export default FormWithReactHookFormAndZod;
