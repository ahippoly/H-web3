import FileUploadOutlined from '@mui/icons-material/FileUploadOutlined'
import { Fab, Stack, Typography } from '@mui/material'

function MintSection () {
  return (
    <Stack gap={2}>
      <Typography variant='h4' align='center'>Well done, you've successfully created your masterpiece</Typography>
      <Typography variant='h6' align='center'>Now, let's mint it</Typography>
      <img src='https://via.placeholder.com/300' alt='placeholder' style={{ maxWidth: 256, alignSelf: 'center' }} />
      <Fab
        variant='extended'
        size='medium'
        color='primary'
        sx={{ width: 'fit-content', alignSelf: 'center' }}
      >
        Mint
        <FileUploadOutlined sx={{ ml: 1 }} />
      </Fab>

    </Stack>

  )
}

export default MintSection
