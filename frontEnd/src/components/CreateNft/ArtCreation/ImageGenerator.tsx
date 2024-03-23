import Brush from '@mui/icons-material/Brush'
import { Box, Fab, FormControl, Input, InputBase, InputLabel, Paper, Stack, TextField, Typography } from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2' // Grid version 2

function ImageGenerator (props: {selectedModel: ModelAI, selectedDataset: DatasetAI}) {
  return (
    <Stack flexGrow={1} justifyContent='center' minHeight={0}>
      <Grid container gap={2} p={3} flexGrow={1} justifyContent='center' minHeight={0}>
        <Grid xs={4}>
          <Stack gap={2} height='100%' direction='column'>
            <TextField
              label='Prompt'
              multiline
              placeholder='Make your prompt here ! e.g: a portrait of leonardo picasso, gradient, realistic'
              variant='outlined'
            />
            <Stack sx={{ height: 'auto', flexGrow: '1', borderRadius: '4px', border: 'solid 1px rgb(175, 175, 175)', p: 1 }} gap={2}>
              <Typography variant='h6' align='center'>Summary</Typography>

              <Stack direction='row' gap={1} alignItems='baseline'>
                <Typography variant='h6'>Model :</Typography>
                <Typography variant='body2'>{props.selectedModel.name}</Typography>
              </Stack>
              <Stack direction='row' gap={1} alignItems='baseline'>
                <Typography variant='h6'>Dataset :</Typography>
                <Typography variant='body2'>{props.selectedDataset.name}</Typography>
              </Stack>

              {/* <Box sx={{ justifySelf: 'flex-end' }}> */}
              <TextField
                sx={{ }}
                label='Description'
                placeholder='Make a short description about your NFT'
                variant='outlined'
                multiline
                rows={4}
              />
              {/* </Box> */}
            </Stack>
          </Stack>
        </Grid>
        <Grid xs={4}>
          <Box>
            <img className='bordered' src='https://via.placeholder.com/300' alt='placeholder' width='100%' />
          </Box>
        </Grid>
      </Grid>
      <Fab variant='extended' size='medium' color='primary' sx={{ width: 'fit-content', alignSelf: 'center' }}>
        Generate
        <Brush sx={{ ml: 1 }} />
      </Fab>
    </Stack>

  )
}

export default ImageGenerator
