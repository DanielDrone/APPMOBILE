export const fetchUserLocation = async () => {
    // ip-api.com is free for non-commercial use and doesn't require a key for basic usage
    // Note: It uses HTTP, which might cause mixed content warnings on HTTPS sites.
    const response = await fetch('http://ip-api.com/json/');
    if (!response.ok) {
        throw new Error('No se pudo obtener la ubicación del usuario');
    }
    return response.json();
};
