const FormData = require("form-data");
const axios = require("axios");
const dotenv = require("dotenv");
const fs = require("fs");
dotenv.config();

async function main() {
    // Initialize pinata
    const PINATA_API_KEY = process.env.PINATA_API_KEY;
    const PINATA_API_SECRET = process.env.PINATA_API_SECRET;

    // Load in the metadata
    const metadata = JSON.parse(fs.readFileSync("metadata/metadata.json", "utf8"));
    const imgFormData = new FormData();
    for (const item of metadata) {
        const filePath = `metadata/images/${item.image}`;
        const file = fs.createReadStream(filePath);
        imgFormData.append("file", file, { filepath: `images/${item.image}` });
    }

    // Upload the images to IPFS
    const responseImg = await axios.post("https://api.pinata.cloud/pinning/pinFileToIPFS", imgFormData, {
        maxBodyLength: Infinity,
        headers: {
            "Content-Type": `multipart/form-data; boundary=${imgFormData.getBoundary()}`,
            pinata_api_key: PINATA_API_KEY,
            pinata_secret_api_key: PINATA_API_SECRET,
        },
    });
    const ipfsBaseImageURI = `https://ipfs.io/ipfs/${responseImg.data.IpfsHash}/`;

    // Upload the metadata to IPFS
    const jsonFormData = new FormData();
    for (const [i, item] of metadata.entries()) {
        item.image = `${ipfsBaseImageURI}${item.image}`;
        const file = Buffer.from(JSON.stringify(item));
        jsonFormData.append("file", file, { filepath: `json/${i}.json` });
    }

    // Upload the JSON to IPFS
    const responseJson = await axios.post("https://api.pinata.cloud/pinning/pinFileToIPFS", jsonFormData, {
        maxBodyLength: Infinity,
        headers: {
            "Content-Type": `multipart/form-data; boundary=${jsonFormData.getBoundary()}`,
            pinata_api_key: PINATA_API_KEY,
            pinata_secret_api_key: PINATA_API_SECRET,
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
    });

/**
 * const axios = require('axios')
const FormData = require('form-data')
const fs = require('fs')
const JWT = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiI5MGI1MjNkMi1mODA4LTRlYmYtYjhmYS1iNTg2MThmYzA5MTkiLCJlbWFpbCI6ImFuZmFsLmJvdXJvdWluYTFAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsInBpbl9wb2xpY3kiOnsicmVnaW9ucyI6W3siaWQiOiJGUkExIiwiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjF9LHsiaWQiOiJOWUMxIiwiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjF9XSwidmVyc2lvbiI6MX0sIm1mYV9lbmFibGVkIjpmYWxzZSwic3RhdHVzIjoiQUNUSVZFIn0sImF1dGhlbnRpY2F0aW9uVHlwZSI6InNjb3BlZEtleSIsInNjb3BlZEtleUtleSI6IjRhZmM3YzFhZTI3ZWY4NzNjM2U0Iiwic2NvcGVkS2V5U2VjcmV0IjoiNTZmZDhkMzVjYTI5Mzk4NWVjYWZmMDMxNmFmZTZlNWU3YzA1NTA5MThjZTk3MDA3ZjUxNWEzNTQ3YWI5ZjY1MyIsImlhdCI6MTcxMTIxODA0OX0.gkzsb3le8Y2xvwbK9tn6SY_9KcOg2IlXhzLzTDvP6Jw

const pinFileToIPFS = async () => {
    const formData = new FormData();
    const src = "path/to/file.png";
    
    const file = fs.createReadStream(src)
    formData.append('file', file)
    
    const pinataMetadata = JSON.stringify({
      name: 'File name',
    });
    formData.append('pinataMetadata', pinataMetadata);
    
    const pinataOptions = JSON.stringify({
      cidVersion: 0,
    })
    formData.append('pinataOptions', pinataOptions);

    try{
      const res = await axios.post("https://api.pinata.cloud/pinning/pinFileToIPFS", formData, {
        maxBodyLength: "Infinity",
        headers: {
          'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
          'Authorization': `Bearer ${JWT}`
        }
      });
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
}
pinFileToIPFS()

 */