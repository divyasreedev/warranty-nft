const uploadMetadata = async (metadata) => {
    console.log('Uploading metadata');
    let response = await fetch(`https://api.jsonbin.io/v3/b/`, { 
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        'X-Master-Key': process.env.JSON_BIN_KEY,
        'X-Bin-Private': false,
        },
        body: JSON.stringify(metadata)
    });
    response = await response.json();
    console.log(response);
    return response.metadata.id;
}

module.exports = uploadMetadata;