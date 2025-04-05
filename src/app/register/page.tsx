"use client";
import { useRouter } from "next/navigation";
import { signup } from "./actions";
import Link from "next/link";
import { FormSchema } from "@/schemas/Form/schema";
import { toast } from "react-toastify";
import FormButton from "@/components/Buttons/FormButton";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

export default function LoginPage() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    getValues,
    formState: { isSubmitting },
  } = useForm();

  const onSubmit: SubmitHandler<FieldValues> = async () => {
    const data = getValues();
    const formData = new FormData();
    Object.entries(data as z.infer<typeof FormSchema>).forEach(([key, value]) =>
      formData.append(key, value)
    );

    try {
      const { success, error } = await signup(formData);
      if (success) {
        toast.success(
          "Registration successful! Please check your email to verify your account."
        );
        router.push("/");
      } else {
        toast.error(error || "Login failed. Please try again.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-5 w-2/4"
      >
        <label htmlFor="email" className="text-2xl font-semibold">
          Email:
        </label>
        <input
          id="email"
          type="email"
          maxLength={50}
          required
          className="text-2xl font-semibold rounded-lg p-5 border-2 border-gray-300"
          {...register("email")}
        />

        <label htmlFor="password" className="text-2xl font-semibold">
          Password:
        </label>
        <input
          id="password"
          type="password"
          minLength={8}
          required
          className="text-2xl font-semibold rounded-lg p-5 border-2 border-gray-300"
          {...register("password")}
        />
        <FormButton
          type="submit"
          loading={isSubmitting} // Directly controlled by react-hook-form's state
          defaultTextState="Register"
          loadingTextState="Registering..."
        />
        <hr />
        <div className="flex flex-col md:flex-row md:items-center gap-5">
          <span className="text-2xl">Already have an account?</span>
          <Link href="/login" className="text-2xl underline">
            Login
          </Link>
        </div>
      </form>
    </div>
  );
}
