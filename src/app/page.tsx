import { Report } from "@/components/Pages/Report";
import { URL_VALUES } from "@/libs/constants/url";
import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: { canonical: URL_VALUES.REPORT },
};

export default function Page() {
  return (
    <>
      <Report />
    </>
  );
}
