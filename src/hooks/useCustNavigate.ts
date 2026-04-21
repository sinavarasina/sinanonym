// cust is custom
import { useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export const useCustNavigate = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navigateTo = useCallback(
    (targetPath: string, onSamePage?: () => void) => {
      if (location.pathname === targetPath) {
        onSamePage?.();
        return;
      }
      navigate(targetPath);
    },
    [navigate, location.pathname],
  );

  const goBack = useCallback(
    (fallbackPath = "/home") => {
      const hasHistory = window.history.state && window.history.state.idx > 0;
      if (hasHistory) {
        navigate(-1);
      } else {
        navigate(fallbackPath, { replace: true });
      }
    },
    [navigate],
  );

  return { navigateTo, goBack };
};
