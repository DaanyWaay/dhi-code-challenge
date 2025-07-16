import { TileLayer } from "@deck.gl/geo-layers";
import { BitmapLayer } from "@deck.gl/layers";
import { DeckGL } from "@deck.gl/react";
import type { MapViewState } from "deck.gl";
import { useState } from "react";

export const MapView = () => {
  const [viewState, setViewState] = useState<MapViewState>({
    longitude: -122.4,
    latitude: 37.8,
    zoom: 4,
  });

  const layer = new TileLayer({
    id: "TileLayer",
    data: "https://c.tile.openstreetmap.org/{z}/{x}/{y}.png",
    maxZoom: 19,
    minZoom: 0,

    renderSubLayers: (props) => {
      const { boundingBox } = props.tile;

      return new BitmapLayer(props, {
        data: undefined,
        image: props.data,
        bounds: [
          boundingBox[0][0],
          boundingBox[0][1],
          boundingBox[1][0],
          boundingBox[1][1],
        ],
      });
    },
    pickable: true,
  });

  return (
    <DeckGL
      initialViewState={viewState}
      controller
      onViewStateChange={({ viewState }) => {
        // @ts-expect-error code taken from official documentation, but TS is claiming the type is wrong
        return setViewState(viewState);
      }}
      layers={[layer]}
      style={{ position: "relative" }}
    />
  );
};
