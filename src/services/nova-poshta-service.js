// src/services/novaPoshtaService.js
import axios from "axios";

const NOVA_POSHTA_URL = "https://fluffy-server-pi.vercel.app/api/novaposhta";

const apiCall = async (methodName, query) => {
    try {
        const response = await axios.post(NOVA_POSHTA_URL, {
            methodName,
            query,
        });
        return response.data;
    } catch (error) {
        console.error(`Nova Poshta API error (${methodName}):`, error);
        throw error;
    }
};

export const getCities = async (searchString) => {
    if (!searchString || searchString.trim().length < 1) return [];

    const result = await apiCall("getCities", { FindByString: searchString });
    if (result.success && result.data) return result.data;

    console.warn("Failed to fetch cities", result);
    return [];
};

export const getDepartments = async (cityRef) => {
    if (!cityRef) return [];

    const result = await apiCall("getWarehouses", { CityRef: cityRef });
    if (result.success && result.data) return result.data;

    console.warn("Failed to fetch departments", result);
    return [];
};
