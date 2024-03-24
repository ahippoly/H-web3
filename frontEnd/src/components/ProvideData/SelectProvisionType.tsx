import { Box, Button, Stack, Typography } from '@mui/material'

function SelectProvisionType ({ setSelectedProvisionType } : { setSelectedProvisionType: (provisionType: string) => void}) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        gap: 10,
        transform: 'translateY(-20px)',
      }}
    >
      <Typography variant='h2'>What do you want to provide</Typography>
      <Stack direction='row' gap={2} sx={{ justifySelf: 'self-end' }}>
        <Button onClick={() => { setSelectedProvisionType('model') }} size='large' variant='contained'>AI Model</Button>
        <Button onClick={() => { setSelectedProvisionType('dataset') }} size='large' variant='contained'>Dataset</Button>
      </Stack>
    </Box>
  )
}

export default SelectProvisionType
