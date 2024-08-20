exports.validation = (required_fields, data) => {
    const error = [];

    for (let i of required_fields) {
        if (!data[i]) {
            error.push(`${i} is required`)
        }
    }

    return error;
}