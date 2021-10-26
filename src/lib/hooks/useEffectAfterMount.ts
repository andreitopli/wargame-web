/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect} from 'react';

export function useEffectAfterMount(cb: Function, dependencies: any[]) {
  const justMounted = React.useRef(true)
  useEffect(() => {
    if (!justMounted.current) {
      return cb()
    }
    justMounted.current = false
  }, dependencies)
}