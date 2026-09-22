import { Register } from "@/components/Pages/Register";
import { URL_VALUES } from "@/libs/constants/url";
import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: { canonical: URL_VALUES.REGISTER },
};

export default function Page() {
  return (
    <>
      <Register />
    </>
  );
}
