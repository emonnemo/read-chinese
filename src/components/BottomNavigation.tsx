import UploadIcon from "@mui/icons-material/FileUpload";
import AnnotationIcon from "@mui/icons-material/ViewList";
import TextDecreaseIcon from "@mui/icons-material/TextDecrease";
import TextIncreaseIcon from "@mui/icons-material/TextIncrease";
import { BottomNavigation, BottomNavigationAction } from "@mui/material";
import React from "react";

interface BottomNavigationProps {
  decreaseTextSize: () => void;
  increaseTextSize: () => void;
  isHavingAnyData: boolean;
  onUpload: () => void;
  showAnnotations: boolean;
  toggleAnnotations: () => void;
}

const BottomNavigationComponent: React.FC<BottomNavigationProps> = ({
  decreaseTextSize,
  increaseTextSize,
  isHavingAnyData,
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
        disabled={!isHavingAnyData}
        label={showAnnotations ? "Hide Pinyin" : "Show Pinyin"}
        icon={<AnnotationIcon />}
        onClick={toggleAnnotations}
      />
      <BottomNavigationAction
        disabled={!isHavingAnyData}
        label="Bigger"
        icon={<TextIncreaseIcon />}
        onClick={increaseTextSize}
      />
      <BottomNavigationAction
        disabled={!isHavingAnyData}
        label="Smaller"
        icon={<TextDecreaseIcon />}
        onClick={decreaseTextSize}
      />
    </BottomNavigation>
  );
};

export default BottomNavigationComponent;
