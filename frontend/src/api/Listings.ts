export const getListings = async () => {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/api/listings`);
  return await res.json();
};
