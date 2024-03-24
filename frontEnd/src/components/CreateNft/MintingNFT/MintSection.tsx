import FileUploadOutlined from '@mui/icons-material/FileUploadOutlined'
import { useWriteContract, useWaitForTransactionReceipt, useAccount } from 'wagmi'
import { Alert, Box, CircularProgress, Fab, Link, Snackbar, Stack, Typography } from '@mui/material'
import { contractAbi } from '@/Web3Related/abi'
import CheckIcon from '@mui/icons-material/Check'
import { useWeb3Modal } from '@web3modal/wagmi/react'

function MintSection (props: {
    generatedImage: string,
}) {
  const { data: hash, writeContract, isPending } = useWriteContract()
  const account = useAccount()
  const { open, close } = useWeb3Modal()

  const mintNft = async () => {
    console.log('🚀 ~ mintNft ~ account:', account)
    if (!account || !account.isConnected) {
      open({ view: 'Connect' })
    }
    writeContract({
      address: `0x${import.meta.env.VITE_CONTRACT_ADDRESS_ART_GENERATION.replace('0x', '')}`,
      abi: contractAbi,
      functionName: 'store',
      args: [BigInt(456)],
    })
  }

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
  useWaitForTransactionReceipt({
    hash,
  })

  const isLoading = isConfirming || isPending

  return (
    <Stack gap={2}>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isConfirmed}
        autoHideDuration={6000}
      >
        <Alert
          severity='success'
          variant='filled'
          sx={{ width: '100%' }}
        >
          <Link href={`https://testnet-explorer.etherlink.com/tx/${hash}`} color='text.primary'>tx hash : {hash}</Link>
        </Alert>
      </Snackbar>
      <Typography variant='h4' align='center'>Well done, you've successfully created your masterpiece</Typography>
      <Typography variant='h6' align='center'>Now, let's mint it</Typography>
      <img src={props.generatedImage} alt='placeholder' style={{ maxWidth: 300, alignSelf: 'center' }} />
      <Fab
        disabled={isLoading}
        onClick={mintNft}
        variant='extended'
        size='medium'
        color={isConfirmed ? 'success' : 'primary'}
        sx={{ width: 'fit-content', alignSelf: 'center', zIndex: 1 }}
      >
        <CircularProgress size={24} sx={{ display: isLoading ? 'block' : 'none', position: 'absolute' }} />

        <Stack
          direction='row'
          sx={{ visibility: isLoading || isConfirmed ? 'hidden' : '' }}
        >
          Mint
          <FileUploadOutlined sx={{ ml: 1 }} />
        </Stack>
        <CheckIcon sx={{ ml: 1, display: isConfirmed ? 'block' : 'none', position: 'absolute' }} />
      </Fab>

    </Stack>

  )
}

export default MintSection
