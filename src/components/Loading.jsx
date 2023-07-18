import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const Loading = (params) => {
  return <Skeleton {...params} />;
};

export default Loading;
