import { uploadToIPFS } from '@/BackendFunc/IPFS/uploadTIPFS'
import { provisionAbi } from '@/Web3Related/dataProvisionAbi'
import { Button, Stack, TextField, Typography } from '@mui/material'
import { useWeb3Modal } from '@web3modal/wagmi/react'
import { useState } from 'react'
import { useAccount, useWriteContract } from 'wagmi'

function AddModel ({ setSelectedProvisionType } : { setSelectedProvisionType: (provisionType: string) => void}) {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')
  const [ipfsLoading, setIpfsLoading] = useState(false)

  const { data: hash, writeContract, isPending } = useWriteContract()
  const account = useAccount()
  const { open, close } = useWeb3Modal()

  const uploadOnIPFS = async () => {
    // upload model file to IPFS

    const metadata = {
      name: '#2',
      description: 'The number 2.',
      image: '1.jpg',
      attributes: [
        {
          id: 'hash',
          price: 440,
          author: '',
          datatype: '',
          liscence: '',
          metadata: {
            quantity: 44,
            storageUrl: 777,
            size: 88,
            date: '',
          },
        },
      ],
    }

    setIpfsLoading(true)
    const ipfsHash = (await uploadToIPFS(JSON.stringify(metadata))).IpfsHash
    setIpfsLoading(false)

    writeContract({
      address: `0x${import.meta.env.VITE_CONTRACT_ADDRESS_DATAPROVISION.replace('0x', '')}`,
      abi: provisionAbi,
      functionName: 'addModel',
      args: [
        'a63ce59680c94bf19c153e1c14921f55744e7c28cdc5c04045485e2d',
        BigInt(0),
        account?.address,
        '',
        '',
        ipfsHash,
      ],
    })
  }

  return (
    <Stack
      gap={2}
    >
      <Typography variant='h2'>Add Model</Typography>
      <TextField
        label='Name'
        variant='outlined'
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <TextField
        label='Description'
        variant='outlined'
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <TextField
        label='Price'
        variant='outlined'
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
      <TextField
        variant='outlined'
        label='Model File'
        type='file'
      />

      <Button
        variant='contained'
        onClick={() => {
          uploadOnIPFS()
        }}
      >Upload model
      </Button>
      {ipfsLoading && <Typography>Uploading to IPFS...</Typography>}

    </Stack>
  )
}

export default AddModel
