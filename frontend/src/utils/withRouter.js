import { useParams } from "react-router-dom";

export function withRouter(Component) {
  return function (props) {
    const params = useParams();
    return <Component {...props} params={params} />;
  };
}
