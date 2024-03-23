const axios = require('axios')
const FormData = require('form-data')
const fs = require('fs')
require("dotenv").config();

const JWT = process.env.PINATA_API_KEY

 async function main() {

    const metadata = JSON.parse(fs.readFileSync("metadata/metadata.json", "utf8"));
    const formData = new FormData();
    for (const item of metadata) {
      const src = `metadata/${item.image}`; //image file à la fois
      const file = fs.createReadStream(src)
      formData.append('file', file, {filepath: `${item.image}`}); //filepath
    }

      const res = await axios.post("https://api.pinata.cloud/pinning/pinFileToIPFS", formData, {
        maxBodyLength: "Infinity",
        headers: {
          'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
          'Authorization': `Bearer ${JWT}`
        }
      });

      const ipfsBaseImageURI = `https://ipfs.io/ipfs/${res.data.IpfsHash}`;

      //Upload the metadata to IPFS
      const jsonFromData = new FormData();
      for (const [i, item] of metadata.entries()) { //image file à la fois
        item.image = `${ipfsBaseImageURI}${item.image}`;
        const file = Buffer.from(JSON.stringify(item));
        jsonFromData.append("file", file, {filepath: `json/${i}.json`});
      }

      //Upload the json to IPFS
      const responseJson = await axios.post("https://api.pinata.cloud/pinning/pinFileToIPFS", jsonFromData, {
        maxBodyLength: Infinity,
        headers: {
            "Content-Type": `multipart/form-data; boundary=${jsonFromData.getBoundary()}`,
            'Authorization': `Bearer ${JWT}`
        },
    });

    const ipfsBaseJsonURI = `https://ipfs.io/ipfs/${responseJson.data.IpfsHash}/`;

    // Save the base URI
    fs.writeFileSync("metadata/storage.json", JSON.stringify({ baseURI: ipfsBaseJsonURI }));


}


main()
.then(() => process.exit(0))
.catch((error) => {
  console.error(error);
  process.exit(1);
})

