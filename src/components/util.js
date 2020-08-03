export const getDataFromBackend = async (url) => {
    const response = await fetch(url);
    if(response.status !== 200) return new Error("Server error occurred");
    else return await response.json();
};
