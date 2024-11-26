function parseRawToJson(rawData: string) {
    try {
        // Step 1: Clean up the raw string
        const cleanedData = rawData.replace(/\\n/g, "") // Remove \n
            .replace(/\\"/g, '"') // Replace escaped quotes with regular quotes
            .trim();             // Remove any leading or trailing whitespace

        // Step 2: Parse the cleaned string into JSON
        const jsonData = JSON.parse(cleanedData);
        return jsonData; // Return the parsed JSON object
    } catch (error) {
        console.error("Failed to parse JSON:", error);
        return null;
    }
}

