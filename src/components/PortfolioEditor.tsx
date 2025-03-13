"use client";

import { useSession } from "next-auth/react";
// import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

import SectionEditor from "./SectionEditor";
import styles from "@/components/Portfolio.module.css";
// import { PortfolioType} from "@/app/lib/types";
import { Portfolio } from "@prisma/client";
import { getPortfolio, getSectionIds, updatePortfolio } from "@/app/lib/data";

export default function PortfolioEditor({ id }: { id: number }) {
  "use client";

  const session = useSession();
  //Get the portfolio specified by id

  const [portfolio, setPortfolio] = useState<Portfolio | null>(null);
  useEffect(() => {
    getPortfolio(id)
      .then((response) => response)
      .then((result) => {
        // console.log("Why is this never done?" + result);
        setPortfolio(result);
        changeDescription(result?.description || "");
      });
  }, [id]);

  const [sectionList, setSectionList] = useState<number[] | null>(null);
  useEffect(() => {
    getSectionIds(id)
      .then((response) => response)
      .then((portfolio) => setSectionList(portfolio));
  }, [id]);

  const [description, changeDescription] = useState<string>(
    portfolio?.description || ""
  );

  return (
    <div className={styles.portfolio}>
      <form
        id={`portfolio-${portfolio?.id}`}
        action={(formData) => {
          console.log("Form submit");
          const formatedData = {
            id: id,
            description: (formData.get("description") as string) || "",
          };
          console.log("description" + formatedData.description);
          updatePortfolio(formatedData);
        }}
      ></form>
      <h2>{session.data?.user?.name}&apos;s Portfolio </h2>
      <label>Description</label>
      <input
        type="text"
        name="description"
        form={`portfolio-${portfolio?.id}`}
        value={description}
        onChange={(event) => {
          changeDescription(event.currentTarget.value);
        }}
      ></input>
      {sectionList?.map((sectionId) => (
        <SectionEditor key={sectionId} sectionId={sectionId} />
      ))}
      <button>Add New Section</button>
      <button type="submit" form={`portfolio-${portfolio?.id}`}>
        Save Portfolio
      </button>
    </div>
  );
}
