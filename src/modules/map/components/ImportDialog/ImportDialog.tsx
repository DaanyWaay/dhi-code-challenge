import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import { GeoJsonLayer } from "deck.gl";
import type { GeoJSON } from "geojson";
import { useCallback, useState } from "react";
import { useLayers } from "../../store/layers";

const layerId = "GeoJsonLayer";

// ToDo: move to utils
const fetchGeoJSON = async (url: string) => {
  try {
    const result = await fetch(url);
    const json = await result.json();
    return json;
  } catch (error) {
    // ToDo: add error handling, ideally use ReactQuery for fetching and caching
    console.log(error);
    alert("Failed to fetch");
  }
};

// ToDo: move to utils
const createGeoJSONLayer = (geoJSON: GeoJSON) => {
  const layer = new GeoJsonLayer({
    id: layerId,
    // ToDo: Alternatively data can be URL
    data: geoJSON,

    stroked: false,
    filled: true,
    pointType: "circle+text",
    pickable: true,

    getFillColor: [160, 160, 180, 200],

    getLineWidth: 20,
    getPointRadius: 4,
    getTextSize: 12,
  });
  return layer;
};

interface DialogProps {
  open: boolean;
  handleClose: () => void;
}

export const ImportDialog = ({ open, handleClose }: DialogProps) => {
  const addLayer = useLayers((store) => store.addLayer);
  const removeLayer = useLayers((store) => store.removeLayer);

  // Some GeoJSONs do not render correctly, like https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson
  const [url, setUrl] = useState<string>(
    "https://raw.githubusercontent.com/visgl/deck.gl-data/master/website/bart.geo.json"
  );

  const onSuccess = useCallback(
    (geoJSON: GeoJSON) => {
      handleClose();
      removeLayer(layerId);
      const layer = createGeoJSONLayer(geoJSON);
      addLayer(layer);
    },
    [addLayer, handleClose, removeLayer]
  );

  const onError = useCallback(() => {
    // ToDo: use some fancy MUI component
    return;
  }, []);

  const onImportClick = useCallback(async () => {
    if (url) {
      const result = await fetchGeoJSON(url);
      if (!result) {
        onError();
        return;
      }
      onSuccess(result);
    }
  }, [onError, onSuccess, url]);

  const onInput = useCallback((value: string) => {
    setUrl(value);
  }, []);

  return (
    <Dialog onClose={handleClose} open={open}>
      <div className="tw-m-4 tw-w-96">
        <DialogTitle>Import GeoJSON</DialogTitle>
        <TextField
          required
          id="outlined-required"
          label="GeoJSON URL"
          className="tw-w-full"
          value={url}
          onChange={(e) => {
            onInput(e.target.value);
          }}
        />
        <div className="tw-gap-4 tw-flex tw-justify-end tw-pt-4">
          <Button onClick={handleClose} variant="outlined">
            Cancel
          </Button>
          <Button onClick={onImportClick} variant="contained" disabled={!url}>
            Import
          </Button>
        </div>
      </div>
    </Dialog>
  );
};
