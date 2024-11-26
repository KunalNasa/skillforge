export function parseRawToJson(rawData: string) {
    try {
        console.log("Raw data before cleanup:", rawData);

        // Step 1: Clean up the raw string
        const cleanedData = rawData.replace(/```json\s*/g, "") // Remove Markdown-style prefix
            .replace(/```/g, "")                              // Remove trailing ```
            .replace(/\n/g, "")                               // Remove newlines
            .replace(/\\\"/g, '"')                            // Fix escaped quotes
            .trim();

        console.log("Cleaned data:", cleanedData);

        // Step 2: Parse the cleaned string into JSON
        const jsonData = JSON.parse(cleanedData);
        return jsonData;
    } catch (error) {
        console.error("Failed to parse JSON:", error);
        return null;
    }
}