function removeJsonPrefix(input: string) {
    if (input.startsWith("json ")) {
        return input.slice(5); // Remove "json " (4 characters + space)
    }
    return input;
}