/*import React from "react";

import "./Loading.css";

const Loading = () => (
  <div className="spinner-border loading text-secondary" role="status">
    <span className="sr-only">Loading...</span>
  </div>
);

export default Loading;
*/

import classnames from "classnames";
import React from "react";
//import { useTranslation } from "react-i18next";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./Loading.css";

export enum LoadingSize {
  Small,
  Medium,
  Large,
}

interface LoadingProps {
  size?: LoadingSize;
}

const Loading: React.FunctionComponent<LoadingProps> = ({
  size = LoadingSize.Medium,
}) => {
  //const { t } = useTranslation();

  const loadingClassNameList = classnames(
    "spinner-border",
    "text-secondary",
   
  );

  return (
    <div className={loadingClassNameList} role="status">
    </div>
  );
};

export default Loading;