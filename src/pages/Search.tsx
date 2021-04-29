import debounce from "awesome-debounce-promise";
import React, { ChangeEvent, FormEvent, useEffect } from "react";
import { useAsync } from "react-async-hook";
import useConstant from "use-constant";
import { StringParam, useQueryParam } from "use-query-params";
import Concept from "../components/Concept";
import Error from "../components/Error";
import Header from "../components/Header";
import Loading from "../components/Loading";
import { defaultBranch, hosts } from "../config";
import {
  fetchBranches,
  fetchIntendedSites,
  fetchConcepts,
  IConceptResult,
} from "../store";

type SearchProps = {
  scope: string;
};

const useSearch = () => {
  // Handle the input text state
  const [query, setQuery] = useQueryParam("q", StringParam);
  const [host, setHost] = useQueryParam("h", StringParam);
  const [branch, setBranch] = useQueryParam("b", StringParam);
  const [intendedSite, setIntendedSite] = useQueryParam("is", StringParam);

  // Debounce the original search async function
  const debouncedSearch = useConstant(() => debounce(fetchConcepts, 500));

  const searchRequest = useAsync(async () => {
    if (host && branch && query) {
      return debouncedSearch(host, branch, query || "");
    }
    return ({} as any) as Readonly<IConceptResult>;
  }, [query, branch, intendedSite]); // Ensure a new request is made everytime the text changes (even if it's debounced)

  // Return everything needed for the hook consumer
  return {
    host,
    branch,
    query,

    intendedSite,
    searchRequest,
    setBranch,
    setHost,
    setQuery,
    setIntendedSite,
  };
};

const Search = ({ scope }: SearchProps) => {
  const {
    query,
    setQuery,
    host,
    branch,
    setBranch,
    setHost,
    intendedSite,
    setIntendedSite,
    searchRequest,
  } = useSearch();

  const branchRequest = useAsync(fetchBranches, [host || hosts[0]]);

  useEffect(() => {
    if (branchRequest.result && !branch) {
      const { path } =
        branchRequest.result.find((b) => b.path === defaultBranch) || {};
      if (path) {
        setBranch(path);
      }
    }
  }, [branch, branchRequest, setBranch]);

  const intededSiteRequest = useAsync(fetchIntendedSites, [
    host || hosts[0],
    branch || defaultBranch,
  ]);

  useEffect(() => {
    if (intededSiteRequest.result && !intendedSite) {
      const { conceptId } =
        intededSiteRequest.result.items.find((is) => is.conceptId === "666") ||
        {};
      if (conceptId) {
        setIntendedSite(conceptId);
      }
    }
  }, [intendedSite, intededSiteRequest, setIntendedSite]);

  useEffect(() => {
    if (!host) {
      setHost(hosts[0]);
    }
  }, [host, setHost]);

  const handleFormSubmit = (event: FormEvent) => {
    event.preventDefault();
  };

  const handleHostChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setHost(event.target.value);
  };
  const handleBranchChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setBranch(event.target.value);
  };

  const handleIntendedSiteChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setIntendedSite(event.target.value);
  };

  const handleQueryChange = (event: ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const branches = branchRequest.result || [];
  //const intendedSites = intededSiteRequest.result || [];
  const { items = [] } = searchRequest.result || {};

  return (
    <div className="container">
      <Header scope={scope} />
      <div className="row mb-5">
        <div className="col-9 col-md-10">
          {branchRequest.error && <Error>{branchRequest.error.message}</Error>}
          {!branchRequest.loading && !branchRequest.error && (
            <form onSubmit={handleFormSubmit}>
              <div className="form-row">
                {!scope && (
                  <>
                    <div className="col-12">
                      <div className="form-group">
                        <label htmlFor="host">Host</label>
                        <select
                          id="host"
                          className="form-control"
                          value={host}
                          onChange={handleHostChange}
                        >
                          {hosts.map((hostname) => (
                            <option value={hostname} key={hostname}>
                              {hostname}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="col-md-12">
                      <div className="form-group">
                        <label htmlFor="branch">Branch</label>
                        <select
                          id="branch"
                          className="form-control"
                          onChange={handleBranchChange}
                        >
                          {branches.map(({ path }) => (
                            <option value={path} key={path}>
                              {path}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </>
                )}
                <div className="row">
                  <div className="col-md-8">
                    <div className="form-group">
                      <label htmlFor="query">Substans</label>
                      <input
                        id="query"
                        className="form-control"
                        type="text"
                        value={query}
                        autoComplete="off"
                        onChange={handleQueryChange}
                      />
                      <section aria-labelledby="results">
                        <ul className="list-group">
                          {items.map(
                            ({
                              concept: {
                                conceptId,
                                fsn: { term: fullySpecifiedName },
                                pt: { term: preferredTerm },
                              },
                            }) => (
                              <li
                                key={conceptId}
                                className="list-group-item mb-2"
                              >
                                <Concept
                                  host={host || hosts[0]}
                                  branch={branch || ""}
                                  preferredTerm={preferredTerm}
                                  fullySpecifiedName={fullySpecifiedName}
                                  conceptId={conceptId}
                                  scope={scope}
                                />
                              </li>
                            ),
                          )}
                        </ul>
                      </section>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="form-group">
                      <label htmlFor="Frigivelse">Frigivelse</label>
                      <input />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-4">
                    <div className="form-group">
                      <label htmlFor="admMetode">Adm. metode</label>
                      <input />
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="form-group">
                      <label htmlFor="intendedSite">Intended site:</label>
                      <select
                        id="intendedSite"
                        className="form-control"
                        onChange={handleIntendedSiteChange}
                      >
                        {intededSiteRequest.result &&
                          intededSiteRequest.result.items.map(
                            ({ pt, conceptId }) => (
                              <option value={conceptId} key={pt.term}>
                                {pt.term}
                              </option>
                            ),
                          )}
                      </select>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="form-group">
                      <label htmlFor="form">Form</label>
                      <select id="form" className="form-control">
                        <option>Form 1</option>
                        <option>Form 2</option>
                        <option>Form 3</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              <input type="submit" value="Søk etter legemiddel" />
            </form>
          )}
        </div>
        <div className="col-3 col-md-2">
          <div className="d-flex h-100 align-items-center justify-content-center">
            {searchRequest.loading && <Loading />}
          </div>
        </div>
        <div className="row">
          <div className="col-3 col-md-8">
            {searchRequest.error && (
              <Error>{searchRequest.error.message}</Error>
            )}
          </div>
        </div>
        <div className="row">
          <div className="col-3 col-md-8">
            <h2>Resultat</h2>
          </div>
          <table>
            <tbody>
              <tr>
                <td>ConceptId Intended site</td>
                <td>{intendedSite}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Search;
