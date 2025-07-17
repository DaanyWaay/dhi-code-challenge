import { DeckGL } from "@deck.gl/react";
import { type MapViewState } from "deck.gl";
import { useState } from "react";
import { emitter } from "../../../../common/emitter";
import { useLayers } from "../../store/layers";

export const MapView = () => {
  const layers = useLayers((store) => store.layers);
  const [viewState, setViewState] = useState<MapViewState>({
    longitude: -122.39,
    latitude: 37.78,
    zoom: 12,
  });

  return (
    <DeckGL
      initialViewState={viewState}
      controller
      onViewStateChange={({ viewState }) => {
        // @ts-expect-error code taken from official documentation, but TS is claiming the type is wrong
        return setViewState(viewState);
      }}
      layers={layers}
      style={{ position: "relative" }}
      onClick={(info) => {
        if (info.coordinate) {
          emitter.emit("mapClick", info.coordinate);
        }
      }}
    />
  );
};
