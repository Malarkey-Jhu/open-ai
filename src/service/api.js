
export const fetchOpenAI = (prompt = "") => {
  return fetch('https://api.openai.com/v1/engines/text-davinci-001/completions', {
      method: 'POST',
      headers: {
        "Content-Type": 'application/json',
        Authorization: `Bearer ${process.env.REACT_APP_APIKEY}`,
      },
      body: JSON.stringify({
        "prompt": prompt,
        "temperature": 0.3,
        "max_tokens": 100,
        "top_p": 1.0,
        "frequency_penalty": 0.0,
        "presence_penalty": 0.0
      })
    }
  )
}