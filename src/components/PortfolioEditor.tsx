"use client";

import { useSession } from "next-auth/react";
// import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

import SectionEditor from "./SectionEditor";
import styles from "@/components/Portfolio.module.css";
import { PortfolioType } from "@/app/lib/types";
import { getPortfolio } from "@/app/lib/data";

export default function PortfolioEditor({ id }: { id: number }) {
  "use client";

  const session = useSession();
  //Get the portfolio specified by id

  const [portfolio, setPortfolio] = useState<PortfolioType | null>(null);
  console.log("FUnction level");
  useEffect(() => {
    getPortfolio(id)
      .then((response) => response)
      .then((result) => {
        console.log("Why is the never done?" + result);
        setPortfolio(result);
      });
  }, [id]);

  console.log("PORTFOLIO LOADED?");
  console.dir(portfolio);

  return (
    <div className={styles.portfolio}>
      <h2>{session.data?.user?.name}&apos;s Portfolio </h2>
      {portfolio?.sections.map((section) => (
        <SectionEditor key={section.id} section={section} />
      ))}
      <button>Add New Section</button>
    </div>
  );
}
