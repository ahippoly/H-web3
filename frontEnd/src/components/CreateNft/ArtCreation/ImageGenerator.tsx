import { fetchImageGenerator } from '@/functions/frontend/fetch_image_generator'
import Brush from '@mui/icons-material/Brush'
import { Alert, Box, CircularProgress, Fab, FormControl, Input, InputBase, InputLabel, Paper, Snackbar, Stack, TextField, Typography } from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2' // Grid version 2
import { useState } from 'react'
import backupImage from '@/assets/backup_img.png'

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
  const [errorMessage, setErrorMessage] = useState('')

  console.log('🚀 ~ props.generatedImage:', `r${props.generatedImage}r`)

  const generateImage = () => {
    if (props.prompt === '') { return setErrorMessage('Prompt cannot be empty') }
    setLoadingGeneration(true)
    props.setGeneratedImage('')
    fetchImageGenerator(props.prompt)
      .then((imageInfo) => {
        console.log('🚀 ~ .then ~ imageInfo:', imageInfo)
        props.setGeneratedImage(imageInfo.imageUrl)
        props.setDescription(imageInfo.imageDescription)
      })
      .catch((error) => {
        console.error('🚀 ~ .catch ~ error', error)
        // setErrorMessage(error.error?.message || 'Error generating image')
        props.setGeneratedImage('https://oaidalleapiprodscus.blob.core.windows.net/private/org-UwEgCAkh1k6qx4HF3s2kfnPj/user-l0gvLJjaeyRST2P026QJ1Nmm/img-kjHU29W99KAZH5yAChw1rTwW.png?st=2024-03-24T09%3A27%3A54Z&se=2024-03-24T11%3A27%3A54Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2024-03-23T21%3A08%3A59Z&ske=2024-03-24T21%3A08%3A59Z&sks=b&skv=2021-08-06&sig=BZbIkE1HEJNvqWw9IBgyWq5cOeZXZ4CQeTvUxHDAfZc%3D')
        props.setDescription('Create a phenomenal scene featuring a supremely powerful cat in the backdrop of an iconic cityscape. The cat, with its sharp claws and radiant eyes, stands tall in contrast to the pleasant charm of Paris. The Eiffel Tower, an unmistakable symbol of France, lingers in the background, setting a truly spectacular scene. This extraordinary feline has an aura of grandeur and power, its fur radiating an ethereal glow under Parisian lamp posts, its whiskers twitching in the gentle Paris breeze. Cars and pedestrians move around it, each oblivious of the entity in their midst.')
      })
      .finally(() => {
        setLoadingGeneration(false)
      })
  }

  const handleClose = () => {
    setErrorMessage('')
  }

  return (
    <Stack flexGrow={1} justifyContent='center' minHeight={0}>
      <Snackbar open={errorMessage !== ''} autoHideDuration={6000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity='error'
          variant='filled'
          sx={{ width: '100%' }}
        >
          {errorMessage}
        </Alert>
      </Snackbar>
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
            <Stack
              sx={{
                position: 'absolute',
                alignSelf: 'center',
                alignItems: 'center',
                justifyContent: 'center',
                display: props.generatedImage ? 'none' : 'flex',
              }}
              gap={2}
            >
              <Typography
                variant='h6'
                align='center'
              >
                {loadingGeneration ? 'Generating your image...' : 'Generated image goes here'}
              </Typography>
              {loadingGeneration ? <CircularProgress /> : ''}
            </Stack>
            <img
              src={props.generatedImage}
              alt=''
              width='100%'
            />
          </Stack>
        </Grid>
      </Grid>
      <Fab
        disabled={loadingGeneration}
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
