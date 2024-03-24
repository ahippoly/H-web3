import { Box, Button, Stack, Typography } from '@mui/material'

function ProvideData () {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        gap: 10,
        transform: 'translateY(-70px)',
      }}
    >
      <Typography variant='h2'>What do you want to provide</Typography>
      <Stack direction='row' gap={2} sx={{ justifySelf: 'self-end' }}>
        <Button size='large' variant='contained'>AI Model</Button>
        <Button size='large' variant='contained'>Dataset</Button>
      </Stack>
    </Box>
  )
}

export default ProvideData
