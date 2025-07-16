import { PolygonLayer } from "deck.gl";
import { useCallback, useEffect } from "react";
import { useShallow } from "zustand/shallow";
import { emitter } from "../../../common/emitter";
import { useCurrentAction } from "../store/currentAction";
import { useLayers } from "../store/layers";

export const useMapMenuActions = () => {
  const [currentAction, setCurrentAction] = useCurrentAction(
    useShallow((store) => [store.action, store.setAction])
  );
  const addLayer = useLayers((store) => store.addLayer);
  const removeLayer = useLayers((store) => store.removeLayer);

  useEffect(() => {
    const handler = (coords) => {
      console.log("Received map click:", coords);
    };

    emitter.on("mapClick", handler);

    return () => {
      emitter.off("mapClick", handler); // cleanup
    };
  }, []);

  const onDrawPolygonClick = useCallback(() => {
    const layerId = "PolygonLayer";
    if (currentAction === "DRAW_POLYGON") {
      setCurrentAction(undefined);
      removeLayer(layerId);
    } else {
      setCurrentAction("DRAW_POLYGON");
      const layer = new PolygonLayer({
        id: layerId,
        data: [
          {
            zipcode: 94107,
            population: 26599,
            area: 6.11,
            contour: [
              [-122.4011597, 37.7820243],
              [-122.3967052, 37.7855421],
              [-122.3943984, 37.7837017],
              [-122.3934371, 37.7844591],
              [-122.3928696, 37.7847828],
              [-122.3921188, 37.7842053],
              [-122.3920329, 37.7841684],
              [-122.3915991, 37.7838227],
              [-122.3908567, 37.7844106],
              [-122.3883069, 37.7823852],
            ],
          },
        ],

        getPolygon: (d) => d.contour,
        getFillColor: () => [60, 140, 0],
        getLineColor: [255, 255, 255],
        getLineWidth: 20,
        lineWidthMinPixels: 1,
        pickable: true,
        onClick: (info, event) => console.log("Clicked layer:", info, event),
      });
      addLayer(layer);
    }
  }, [currentAction, setCurrentAction, addLayer]);

  return { onDrawPolygonClick };
};
