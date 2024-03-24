export const uploadToIPFS = async (jsonInput: string) : Promise<{IpfsHash: string}> => {
  try {
    const file = new File([jsonInput], 'filename.json', { type: 'application/json' })

    const formData = new FormData()
    formData.append('file', file)
    const metadata = JSON.stringify({
      name: 'File name',
    })
    formData.append('pinataMetadata', metadata)

    const options = JSON.stringify({
      cidVersion: 0,
    })
    formData.append('pinataOptions', options)

    const res = await fetch(
      'https://api.pinata.cloud/pinning/pinFileToIPFS',
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_PINATA_JWT}`,
        },
        body: formData,
      },
    )
    const resData = await res.json()
    console.log(resData)
    return resData
  } catch (error) {
    console.log(error)
  }
  return { IpfsHash: '' }
}
