import imageUrl from "@src/lib/imageUrl";
import { IAbout } from "@src/models";
import Image from "next/image";
import React from "react";

const AboutMe = (props: { data: IAbout }) => {
  const { data } = props;
  return (
    <section className="my-48">
      <div className="flex flex-col-reverse items-center gap-16 md:flex-row">
        <div className="flex flex-1 flex-col items-center text-center md:items-start md:text-left">
          <h1 className="mb-1 text-4xl font-black">{data.title}</h1>
          <p className="mb-3 text-lg">{data.subTitle}</p>
          <p className="text-gray-600 dark:text-gray-300">{data.description}</p>
          <a
            href="#"
            className="mt-8 flex h-12 w-fit items-center justify-center rounded-md bg-gray-900 px-8 text-lg font-medium text-gray-50 dark:bg-gray-50 dark:text-gray-900"
          >
            Contact Me
          </a>
        </div>
        <div className="relative h-48 w-48 overflow-hidden rounded-full">
          <Image
            src={imageUrl(data.avatar).width(192).height(192).url()}
            alt="Rohid"
            layout="fill"
            objectFit="cover"
          />
        </div>
      </div>
    </section>
  );
};

export default AboutMe;
