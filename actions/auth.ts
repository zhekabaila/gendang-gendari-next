"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const saveToken = (token: string, remember?: boolean) => {
  return new Promise((resolve) => {
    cookies().set({
      name: "token",
      value: token,
      httpOnly: true,
      maxAge: remember ? 60 * 60 * 24 * 7 : undefined,
    });

    resolve("Successfully saved");
  });
};

export const removeToken = () => {
  cookies().delete("token");

  redirect("/login");
};
