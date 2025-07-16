import { BitmapLayer, TileLayer, type Layer } from "deck.gl";
import { create } from "zustand";

interface LayersState {
  layers: Array<Layer>;
}

interface LayersActions {
  addLayer: (layer: Layer) => void;
  removeLayer: (layerId: string) => void;
}

export const useLayers = create<LayersState & LayersActions>((set, get) => ({
  layers: [
    new TileLayer({
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
    }),
  ],
  addLayer: (layer) => set({ layers: [...get().layers, layer] }),
  removeLayer: (layerId: string) => {
    set({
      layers: get().layers.filter((layer) => layer.id !== layerId),
    });
  },
}));
