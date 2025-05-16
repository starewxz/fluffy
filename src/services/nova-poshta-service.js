
import axios from "axios";

const NOVA_POSHTA_URL = "https://fluffy-server-pi.vercel.app/api/novaposhta";


export const novaPoshtaRequest = async (methodName, query) => {
    try {
        const response = await axios.post(NOVA_POSHTA_URL, {
            methodName,
            query,
        }, {
            headers: {
                "Content-Type": "application/json",
            },
        });

        return response.data;
    } catch (error) {
        console.error(`Nova Poshta API error (${methodName}):`, error);
        throw error;
    }
};
