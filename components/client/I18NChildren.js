'use client'

import { useEffect, useState } from "react";
import { useI18NContext } from "./I18NProvider";

const I18NChildren = ({ children }) => {

  const { getI18N } = useI18NContext();

  const [I18N, setI18N] = useState(null)
  
  useEffect(() => {
    getI18N(children).then(result => setI18N(result));
  }, [children]);

  return (
    <>
      {I18N ? I18N : <></>}
    </>
  )
}

export default I18NChildren;