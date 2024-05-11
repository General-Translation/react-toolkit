'use client'

import { useEffect, useState } from "react";
import { useI18NContext } from "./I18NProvider";

const I18N = ({ children }) => {

  const { translationRequired, getI18N } = useI18NContext();

  const [I18NChildren, setI18NChildren] = useState(null)
  
  useEffect(() => {
    if (translationRequired) {
      setI18NChildren(getI18N(children));
    } 
  }, [translationRequired, children]);

  return (
    <>
      {
        translationRequired 
        ?
        I18NChildren ? I18NChildren : <></>
        :
        children
      }
    </>
  )
}

export default I18N;