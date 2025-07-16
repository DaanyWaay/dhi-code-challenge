import { Outlet, useParams } from "react-router";
import { PageContent } from "../../../common/components";

export const TestPage = () => {
  return (
    <PageContent>
      Test Page
      <Outlet />
    </PageContent>
  );
};

export const TestPageDetails = () => {
  const { testid } = useParams();

  return <>Test Page Details {testid}</>;
};
