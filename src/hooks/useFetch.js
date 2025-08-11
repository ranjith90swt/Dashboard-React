import React, { useCallback, useEffect, useState } from 'react'

const useFetch = (url) => {
  const [data, setData] = useState()
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null)

  const fetchData = useCallback(async () => {
    if(!url) return;

    setLoading(true);
    setError(null);

    fetch(url)
    .then((res)=>{
        if(!res.ok){
         throw new Error(`Http error ${res.status}`)
        }

        return res.json();
    })
    .then((json)=>{
        setData(json);
        setLoading(false)
    })
    .catch((err)=>{
        setError(err);
        setLoading(false)
    })


  }, [url]);

  useEffect(()=>{

   fetchData();
      

  },[fetchData])

  return {data, loading, error, refetch:fetchData};

}

export default useFetch