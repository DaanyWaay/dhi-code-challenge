import { PageContent } from "../../../common/components";
import { MapOptions, MapView } from "../components";

export const MapPage = () => {
  return (
    <PageContent className="tw-p-0">
      <MapView />
      <MapOptions />
    </PageContent>
  );
};
