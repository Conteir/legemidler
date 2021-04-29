import React from "react";
import { useAsync } from "react-async-hook";
import { fetchCodeSystems } from "../store";
import Loading from "./Loading";
import Synonym from "./Synonym";

type ConceptProps = {
  host: string;
  branch: string;
  preferredTerm: string;
  fullySpecifiedName: string;
  conceptId: string;
  scope: string;
};

const Concept = ({
  host,
  branch,
  preferredTerm,
  fullySpecifiedName,
  conceptId,
  scope,
}: ConceptProps) => {
  const request = useAsync(fetchCodeSystems, [host, conceptId]);

  return (
    <div className="d-md-flex justify-content-between">
      <div>
        <p>{preferredTerm}</p>
        <Synonym
          host={host}
          branch={branch}
          conceptId={conceptId}
          preferredTerm={preferredTerm}
        />
      </div>
      <dl className="mb-md-0 ml-md-5">
        <dd className="mb-md-0">{conceptId}</dd>
      </dl>
      {request.loading && <Loading />}
    </div>
  );
};

export default Concept;
