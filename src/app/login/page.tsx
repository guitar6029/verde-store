"use client";

import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { login } from "./actions";
import FormButton from "@/components/Buttons/FormButton";
import Link from "next/link";
import { z } from "zod";
import { FormSchema } from "@/schemas/Form/schema";

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
      const { success, error } = await login(formData);
      if (success) {
        toast.success("Login successful!");
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
          Email
        </label>
        <input
          id="email"
          type="email"
          required
          className="text-2xl font-semibold rounded-lg p-5 border-2 border-gray-300"
          {...register("email")}
        />

        <label htmlFor="password" className="text-2xl font-semibold">
          Password
        </label>
        <input
          id="password"
          type="password"
          required
          className="text-2xl font-semibold rounded-lg p-5 border-2 border-gray-300"
          {...register("password")}
        />

        <FormButton
          type="submit"
          loading={isSubmitting} // Directly controlled by react-hook-form's state
          defaultTextState="Login"
          loadingTextState="Logging in..."
        />

        <hr />
        <div className="flex flex-col md:flex-row gap-2 md:items-center">
          <span className="text-2xl">Don&apos;t have an account?</span>
          <Link href={"/register"} className="text-2xl underline">
            Sign up
          </Link>
        </div>
      </form>
    </div>
  );
}
