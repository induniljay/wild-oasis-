import { useEffect, useRef } from "react";

function useDetectOutside(handler, listenCapturing = true) {
  const ref = useRef();

  useEffect(function () {
    function handleClick(e) {
      if (ref.current && !ref.current?.contains(e.target)) {
        handler?.();
      }
    }

    document.addEventListener("click", handleClick, listenCapturing);

    return () =>
      document.removeEventListener("click", handleClick, listenCapturing);
  }, []);

  return { ref };
}

export default useDetectOutside;
