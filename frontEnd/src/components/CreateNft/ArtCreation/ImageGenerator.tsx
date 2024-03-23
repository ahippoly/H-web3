import { fetchImageGenerator } from '@/functions/frontend/fetch_image_generator'
import Brush from '@mui/icons-material/Brush'
import { Box, Fab, FormControl, Input, InputBase, InputLabel, Paper, Stack, TextField, Typography } from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2' // Grid version 2
import { useState } from 'react'

function ImageGenerator (props: {
  selectedModel: ModelAI,
  selectedDataset: DatasetAI,
  prompt: string,
  setPrompt: (prompt: string) => void
  description: string,
  setDescription: (description: string) => void
  generatedImage: string,
  setGeneratedImage: (image: string) => void
}) {
  const [loadingGeneration, setLoadingGeneration] = useState(false)

  const generateImage = () => {
    fetchImageGenerator(props.prompt).then((imageInfo) => {
      props.setGeneratedImage(imageInfo.imageUrl)
      props.setDescription(imageInfo.imageDescription)
    })
  }

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
              value={props.prompt}
              onChange={(e) => { props.setPrompt(e.target.value) }}
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
                rows={5}
                value={props.description}
                onChange={(e) => { props.setDescription(e.target.value) }}
              />
              {/* </Box> */}
            </Stack>
          </Stack>
        </Grid>
        <Grid
          xs={4}
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Stack
            className='bordered'
            direction='column'
            justifyContent='center'
            position='relative'
            sx={{ width: '100%', maxWidth: '400px', aspectRatio: 1 }}
          >
            <Typography
              sx={{
                position: 'absolute',
                alignSelf: 'center',
                display: props.generatedImage ? 'none' : 'block',
              }}
              variant='h6'
              align='center'
            >Generated image goes here
            </Typography>
            <img
              src={props.generatedImage || 'https://via.placeholder.com/300'}
              alt=''
              width='100%'
            />
          </Stack>
        </Grid>
      </Grid>
      <Fab
        variant='extended'
        size='medium'
        color='primary'
        sx={{ width: 'fit-content', alignSelf: 'center' }}
        onClick={() => { generateImage() }}
      >
        Generate
        <Brush sx={{ ml: 1 }} />
      </Fab>
    </Stack>

  )
}

export default ImageGenerator
