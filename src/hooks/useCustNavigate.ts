// cust is custom

import { useNavigate, useLocation } from "react-router-dom";

export const useCustNavigate = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navigateTo = (targetPath: string, onSamePage?: () => void) => {
    if (location.pathname === targetPath) {
      if (onSamePage) {
        onSamePage();
      }
      return;
    }
    navigate(targetPath);
  };

  const goBack = (fallbackPath: string = "/home") => {
    const hasHistory = window.history.state && window.history.state.idx > 0;

    if (hasHistory) {
      navigate(-1);
    } else {
      navigate(fallbackPath, { replace: true });
    }
  };

  return { navigateTo, goBack };
};
