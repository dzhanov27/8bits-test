export const fetchData = async <T>(url: string): Promise<T> => {
  const baseUrl = process.env.REACT_APP_BASE_URL
  console.log(baseUrl)
  const response = await fetch(`${baseUrl}${url}`);
  if (!response.ok) {
    throw new Error(`Error fetching data. ${response.statusText}`);
  }
  return response.json();
};
