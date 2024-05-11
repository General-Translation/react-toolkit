'use client'

import { useEffect, useState } from "react";
import { useI18NContext } from "./I18NProvider";

const I18N = ({ children }) => {

  const { getI18N } = useI18NContext();

  const [I18NChildren, setI18NChildren] = useState(null)
  
  useEffect(() => {
    getI18N(children).then(result => setI18NChildren(result));
  }, [children]);

  return (
    <>
      {I18NChildren ? I18NChildren : <></>}
    </>
  )
}

export default I18N;