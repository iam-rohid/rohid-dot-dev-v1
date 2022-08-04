import PageHeader from "@src/components/PageHeader";
import { sanityClient } from "@src/lib/sanityClient";
import { useMutation } from "@tanstack/react-query";
import React, { useCallback } from "react";
import { useForm } from "react-hook-form";

type ContactFormType = {
  name: string;
  email: string;
  message: string;
};

const sendContactAsync = async (value: ContactFormType) => {
  return sanityClient.create({
    _type: "contact",
    ...value,
  });
};
const ContactPage = () => {
  const contactForm = useForm<ContactFormType>();
  const mutation = useMutation((variables: ContactFormType) =>
    sendContactAsync(variables)
  );

  const handleSubmit = useCallback(
    async (value: ContactFormType) => {
      mutation.mutate(value);
    },
    [mutation]
  );

  return (
    <div className="mx-auto my-16 max-w-xl px-4">
      <PageHeader title="Contact Me" />
      <div>
        {mutation.isSuccess ? (
          <div className="prose prose-lg text-center dark:prose-invert">
            <h2>Thank you for contacting me 😊</h2>
            <p>I will reach out to you as soon as possible.</p>
          </div>
        ) : (
          <form onSubmit={contactForm.handleSubmit(handleSubmit)}>
            <div className="mb-4">
              <input
                type="text"
                placeholder="Your name"
                {...contactForm.register("name", {
                  required: "Name is required",
                })}
                className="block w-full rounded-md bg-gray-100 px-4 py-2 outline-none ring-blue-500 focus:ring-2 dark:bg-gray-800"
              />

              {contactForm.formState.errors.name && (
                <p className="mt-1 text-sm text-red-500">
                  {contactForm.formState.errors.name.message}
                </p>
              )}
            </div>
            <div className="mb-4">
              <input
                type="email"
                placeholder="Your email"
                {...contactForm.register("email", {
                  required: "Email is Required",
                })}
                className="block w-full rounded-md bg-gray-100 px-4 py-2 outline-none ring-blue-500 focus:ring-2 dark:bg-gray-800"
              />

              {contactForm.formState.errors.email && (
                <p className="mt-1 text-sm text-red-500">
                  {contactForm.formState.errors.email.message}
                </p>
              )}
            </div>
            <div className="mb-4">
              <textarea
                placeholder="Your message"
                {...contactForm.register("message", {
                  required: "Message is required",
                })}
                className="block w-full rounded-md bg-gray-100 px-4 py-4 outline-none ring-blue-500 focus:ring-2 dark:bg-gray-800"
              />
              {contactForm.formState.errors.message && (
                <p className="mt-1 text-sm text-red-500">
                  {contactForm.formState.errors.message.message}
                </p>
              )}
            </div>
            <button
              type="submit"
              className="mt-4 h-10 w-full rounded-md bg-blue-500 px-4 font-medium text-white hover:bg-blue-600 dark:text-white"
            >
              {mutation.isLoading ? "Submitting..." : "Submit"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ContactPage;
