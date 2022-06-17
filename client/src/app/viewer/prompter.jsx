import React from 'react';
import axios from 'axios';

function usePrompter({ url }) {
  const [loading, setLoading] = React.useState(false);
  const [data, setData] = React.useState(null);
  const [error, setError] = React.useState([]);

  React.useEffect(() => {
    setLoading(true);

    axios.get(url)
      .then(res => {
        setData(res.data);
      })
      .catch(err => setError([err]))
      .finally(() => {
        setLoading(false);
      });

  }, [url]);

  return [loading, data, error];
}

export default usePrompter;