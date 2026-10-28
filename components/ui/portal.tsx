"use client";

import { useSyncExternalStore } from "react";
import { createPortal } from "react-dom";

const subscribe = () => () => {};

/**
 * Desenha o conteúdo diretamente no <body>, para que janelas "fixed"
 * fiquem sempre centradas no ecrã, independentemente dos elementos pai.
 */
export function Portal({ children }: { children: React.ReactNode }) {
  const mounted = useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );
  return mounted ? createPortal(children, document.body) : null;
}
