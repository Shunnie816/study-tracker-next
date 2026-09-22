import { Posts } from "@/components/Pages/Posts";
import { URL_VALUES } from "@/libs/constants/url";
import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: { canonical: URL_VALUES.POSTS },
};

export default function Page() {
  return (
    <>
      <Posts />
    </>
  );
}
