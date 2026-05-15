import UploadIcon from "@mui/icons-material/FileUpload";
import AnnotationIcon from "@mui/icons-material/ViewList";
import { BottomNavigation, BottomNavigationAction } from "@mui/material";
import React from "react";

interface BottomNavigationProps {
  canToggleAnnotations: boolean;
  onUpload: () => void;
  showAnnotations: boolean;
  toggleAnnotations: () => void;
}

const BottomNavigationComponent: React.FC<BottomNavigationProps> = ({
  canToggleAnnotations,
  onUpload,
  showAnnotations,
  toggleAnnotations,
}) => {
  return (
    <BottomNavigation
      showLabels
      sx={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        borderTop: "1px solid #e5e7eb",
        zIndex: 50,
      }}
    >
      <BottomNavigationAction
        label="Upload"
        icon={<UploadIcon />}
        onClick={onUpload}
      />
      <BottomNavigationAction
        disabled={!canToggleAnnotations}
        label={showAnnotations ? "Hide Pinyin" : "Show Pinyin"}
        icon={<AnnotationIcon />}
        onClick={toggleAnnotations}
      />
    </BottomNavigation>
  );
};

export default BottomNavigationComponent;
