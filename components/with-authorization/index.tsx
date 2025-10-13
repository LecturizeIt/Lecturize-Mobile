import { PropsWithChildren } from "react";

const WithAuthorization = ({ isAuthorized, children }: PropsWithChildren<{ isAuthorized: boolean }>) => {
  if (!isAuthorized) return null;

  return (
    <>
      {children}
    </>
  )
}

export default WithAuthorization;
