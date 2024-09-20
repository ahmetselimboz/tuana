"use client";
import { useEffect, useRef } from "react";
import { Provider } from "react-redux";
import { makeStore } from "../../lib/redux/store";
import { useAppSelector } from "@/lib/redux/hooks";

export default function StoreProvider({ children }) {
  const storeRef = useRef();

  if (!storeRef.current) {
    storeRef.current = makeStore();
  }

  return <Provider store={storeRef.current}>{children}</Provider>;
}
