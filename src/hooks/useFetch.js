import React, { useEffect, useState } from 'react'

const useFetch = (url) => {
  const [data, setData] = useState()
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null)


  useEffect(()=>{

    if(!url) return;

    setLoading(true);
    setError(null);

    fetch(url).then((res)=>{
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


      

  },[url])

  return {data, loading, error};

}

export default useFetch