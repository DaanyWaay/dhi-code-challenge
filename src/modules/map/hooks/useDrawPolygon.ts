import { PolygonLayer } from "deck.gl";
import { useCallback, useEffect, useState } from "react";
import { useShallow } from "zustand/shallow";
import { emitter } from "../../../common/emitter";
import { useCurrentAction } from "../store/currentAction";
import { useLayers } from "../store/layers";

const layerId = "PolygonLayer";

const createLayer = (contour: Array<number[]>) => {
  return new PolygonLayer({
    id: layerId,
    data: [
      {
        zipcode: 94107,
        population: 26599,
        area: 6.11,
        contour,
      },
    ],

    getPolygon: (d) => d.contour,
    getFillColor: () => [60, 140, 0],
    getLineColor: [255, 255, 255],
    getLineWidth: 20,
    lineWidthMinPixels: 1,
  });
};

export const useDrawPolygon = () => {
  const [coords, setCoords] = useState<Array<number[]>>([]);
  const [currentAction, setCurrentAction] = useCurrentAction(
    useShallow((store) => [store.action, store.setAction])
  );
  const addLayer = useLayers((store) => store.addLayer);
  const removeLayer = useLayers((store) => store.removeLayer);

  const isActive = currentAction === "DRAW_POLYGON";

  const onDrawPolygonClick = useCallback(() => {
    if (currentAction === "DRAW_POLYGON") {
      setCurrentAction(undefined);
      setCoords([]);
    } else {
      setCurrentAction("DRAW_POLYGON");
    }
  }, [currentAction, setCurrentAction]);

  useEffect(() => {
    const handler = (clickCoords: number[]) => {
      setCoords((prev) => {
        return [...prev, clickCoords];
      });
    };

    if (isActive) {
      emitter.on("mapClick", handler);
    }

    return () => {
      emitter.off("mapClick", handler); // cleanup
    };
  }, [isActive]);

  useEffect(() => {
    if (isActive) {
      const layer = createLayer(coords);
      addLayer(layer);
      return () => {
        removeLayer(layerId);
      };
    }
  }, [coords, addLayer, isActive, removeLayer]);

  return {
    onDrawPolygonClick,
    isActive,
  };
};
