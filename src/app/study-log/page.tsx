import { StudyLog } from "@/components/Pages/Studylog/containers";
import { URL_VALUES } from "@/libs/constants/url";
import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: { canonical: URL_VALUES.STUDYLOG },
};

export default function Page() {
  return (
    <>
      <StudyLog />
    </>
  );
}
