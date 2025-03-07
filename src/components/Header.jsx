/* eslint-disable react/prop-types */
import { Button, Divider, Slider, Stack, Switch, ToggleButtonGroup, Tooltip, Typography } from "@mui/joy";
import { FaBorderAll, FaEraser, FaPencilAlt } from "react-icons/fa";
import { SLIDER_MARKS } from "../constants/config";

export default function Header({
  gridSize,
  setGridSize,
  isErasing,
  setIsErasing,
  resizeGrid,
  isVisualizing,
  visualizeAlgorithm,
  setAlgorithm,
  algorithm,
  clearGrid,
}) {
  // Remove usePathfinder hook since we're now receiving props

  function handleGridResize(newSize) {
    setGridSize(newSize);
    resizeGrid(newSize);
  }

  return (
    <Stack
      direction={{ xs: "column", md: "row" }}
      justifyContent="center"
      alignItems={{ xs: "stretch", md: "center" }}
      spacing={{ xs: 2, md: 6 }}
      sx={{
        width: "100%",
        px: { xs: 1, md: 2 },
        py: 2.5,
        maxWidth: "1200px",
        mx: "auto",
      }}
    >
      <Stack sx={{ width: { xs: "100%", md: 200 } }} justifyContent="center" alignItems="center">
        <Typography startDecorator={<FaBorderAll />}>
          Grid Size [{gridSize}&times;{gridSize}]
        </Typography>
        <Slider
          sx={{ maxWidth: 300 }}
          valueLabelDisplay="auto"
          defaultValue={20}
          value={gridSize}
          step={10}
          min={20}
          max={100}
          marks={SLIDER_MARKS}
          onChange={(_, newSize) => handleGridResize(newSize)}
        />
      </Stack>
      <Divider orientation="vertical" sx={{ display: { xs: "none", md: "block" } }} />
      <Divider orientation="horizontal" sx={{ display: { xs: "block", md: "none" } }} />
      <Stack
        direction={{ xs: "row", md: "column" }}
        justifyContent="center"
        alignItems="center"
        spacing={{ xs: 2, md: 2 }}
        sx={{ width: { xs: "100%", md: "auto" } }}
      >
        <Tooltip title="Tip: Hold Shift to erase quickly">
          <Switch
            variant="solid"
            startDecorator={<FaPencilAlt />}
            endDecorator={<FaEraser />}
            onChange={() => setIsErasing((prev) => !prev)}
            checked={isErasing}
          />
        </Tooltip>
        <Button variant="plain" color="danger" onClick={clearGrid}>
          Clear All Obstacles
        </Button>
      </Stack>
      <Divider orientation="vertical" sx={{ display: { xs: "none", md: "block" } }} />
      <Divider orientation="horizontal" sx={{ display: { xs: "block", md: "none" } }} />
      <Stack direction="column" gap={1} sx={{ width: { xs: "100%", md: "auto" } }} alignItems="center">
        <ToggleButtonGroup
          value={algorithm}
          onChange={(_, value) => value && setAlgorithm(value)}
          disabled={isVisualizing}
          size="sm"
        >
          <Button value="dijkstra">Dijkstra&apos;s</Button>
          <Button value="aStar">A*</Button>
        </ToggleButtonGroup>
        <Button variant="plain" color="primary" size="sm" disabled={isVisualizing} onClick={visualizeAlgorithm}>
          {isVisualizing ? "Visualizing..." : "Visualize"}
        </Button>
      </Stack>
    </Stack>
  );
}
