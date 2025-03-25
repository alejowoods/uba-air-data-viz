export default defineEventHandler(async(event) => { 
    const query = getQuery(event); // Query params

    const { station, date_from, date_to, time_from, time_to, index, lang } = query;

    if(!station || !date_from || !date_to) { // es un error? es data_to || data_from
        return {
            error: 'Missing required query parameters: station, date_from, or date_to.'
        } 
    }

    const apiUrl = `https://www.umweltbundesamt.de/api/air_data/v2/airquality/json?station=${station}&date_from=${date_from}&date_to=${date_to}&time_from=${time_from || 9}&time_to=${time_to || 9}&index=${index || 'code'}&lang=${lang || 'de'}`

    try {
        const response = await fetch(apiUrl);
        if(!response.ok) {
            throw new Error(`External API error: ${response.status}`)
        }

        const data = await response.json();
        return data;

    } catch (error: any) {
        return {
            error: error.message || 'Unknown error occurred while fetching air data.'
        }
    }

});