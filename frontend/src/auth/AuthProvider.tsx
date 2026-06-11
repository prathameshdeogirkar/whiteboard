import { useEffect, useState } from "react";
import keycloak from "./keycloak";

type Props = {
  children: React.ReactNode;
};

const AuthProvider = ({ children }: Props) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    keycloak
      .init({
        onLoad: "check-sso",
        checkLoginIframe: false,
      })
      .then(() => {
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="vh-100 d-flex justify-content-center align-items-center">
        <h3>Loading...</h3>
      </div>
    );
  }

  return <>{children}</>;
};

export default AuthProvider;
